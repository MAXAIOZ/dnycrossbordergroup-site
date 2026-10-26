# 开源仓库的密钥与隔离规范（给 Hermes）

日期：2026-10-26 · 设计：Claude · 实施：Hermes

> **执行状态（2026-10-26 更新）**：**任务 1（.gitignore 等）和任务 4（gitleaks pre-commit + CI）现在执行**，在 MCP 第一阶段开工之前完成。CI 里直接用 gitleaks 官方 Docker 镜像运行 CLI。任务 2、3、5 暂缓，等 Max 通知。

## 背景

`MAXAIOZ/dnycrossbordergroup-site` 是**公开仓库**，DNY 集团项目坚持开源。规则：**凡是进过 Git 的内容（包括历史提交）都视为已公开。** 代码和架构可以公开，密码、密钥、令牌、服务器信息和客户数据永远不能进仓库。

## 一、2026-10-26 检查结果（只读检查，未改任何文件）

| 项 | 结果 | 处理 |
|---|---|---|
| 当前跟踪文件中的密钥（sk-/ghp_/AKIA/私钥/api_key= 等模式） | 未发现 | — |
| 全部历史提交中的密钥 | 未发现 | 无需改写历史 |
| `.claude/settings.local.json` | **被提交进了公开仓库**（内容是本机路径和工具权限，不含密钥） | 见任务 1 |
| `MAINTAINER.md`（未提交） | 含 VPS 名称、服务器路径、部署凭证缺口等运维信息 | 见任务 2 |
| `.gitignore` | 已忽略 `.dev.vars`、`.wrangler/`，但没有忽略 `.env*`、密钥文件、`.claude/` | 见任务 1 |

## 二、可以公开 vs 不能公开

**可以写在代码里（设计上就是公开的）：**
- `src/data/site.ts` 里的 `indexNowKey`：必须公开在 `/<key>.txt`，IndexNow 协议要求
- `formEndpoint`（FormSubmit + info@ 邮箱）：公开地址
- `cfAnalyticsToken`：Cloudflare Web Analytics 的前端信标 token，本来就在网页里公开
- 后端函数里读取的环境变量**名称**：`ACCESS_TEAM_DOMAIN`、`ACCESS_AUD`、`NOTIFY_ENDPOINT`、`DB`、`FILES`、`ADMIN_DEV_BYPASS`

**绝不能进仓库：**
- GitHub PAT / deploy key、Cloudflare API Token、任何第三方 API Key、SSH 私钥
- `.env`、`.env.*`、`.dev.vars` 的内容，以及环境变量的**值**
- VPS 的 IP、主机名、登录用户、目录结构、SSH 配置
- D1 里的询价数据、KV 里的附件和客户个人信息（任何导出文件）
- 本机/AI 工具的本地配置：`.claude/`、`.hermes/`、编辑器的本地配置

## 三、任务（Hermes 实施）

### 任务 1：收紧 .gitignore，停止跟踪本地配置
1. 在 `.gitignore` 追加：
   ```
   # secrets & local config — never commit
   .env
   .env.*
   !.env.example
   .dev.vars*
   *.pem
   *.key
   *.p12
   id_rsa*
   .claude/
   .hermes/
   MAINTAINER.local.md
   *.secret.*
   backups/
   exports/
   ```
2. `git rm --cached .claude/settings.local.json`（只取消跟踪，不删本地文件）。不需要改写历史：该文件不含密钥。
3. 新增 `.env.example`，只列变量名、不填值，并注明每个变量在 Cloudflare Pages → Settings → Variables and Secrets 里配置：
   ```
   # Set in Cloudflare Pages (Production + Preview). Never commit real values.
   ACCESS_TEAM_DOMAIN=
   ACCESS_AUD=
   NOTIFY_ENDPOINT=
   # ADMIN_DEV_BYPASS — local development only, never set in production
   ```

### 任务 2：运维文档拆成公开版和私有版
- `MAINTAINER.md`（可提交）：只保留**通用**维护说明：构建命令、目录结构、内容改哪个数据文件、部署链路（GitHub → Cloudflare Pages）、上线后验证方法。
- `MAINTAINER.local.md`（已加入忽略，只放在 VPS 本地）：VPS 名称、服务器路径、凭证位置、"推送凭证缺口"等运维细节。
- 顺带更正：`env.FILES` 是 **Cloudflare KV**（附件 `att:<uuid>` 和限流计数），不是 R2。

### 任务 3：GitHub 推送凭证（VPS 上）
- 用**仅限本仓库**的 Fine-grained PAT（Contents: Read and write，设到期日）或**仅限本仓库**的 deploy key（勾选 write）。不要用账号级经典 PAT。
- 凭证只存在 VPS 的 `~/.ssh/` 或 git credential helper 里，权限 600。不写进仓库、MAINTAINER 文件、提交信息、日志，也不写进给 AI 的对话或提示词。
- 怀疑泄露就立即在 GitHub 撤销并重新生成。

### 任务 4：提交前自动拦截密钥
- VPS 上安装 `gitleaks`，在本地仓库加 pre-commit hook：
  ```
  gitleaks protect --staged --redact -v
  ```
  发现疑似密钥就拒绝提交。
- 每次推送前执行一次 `gitleaks detect --redact`，扫描整个仓库。

### 任务 5：Cloudflare 侧
- 有密钥性质的值一律用 Pages 的 **Secret** 类型保存（加密、不可回显）。普通配置用 Variable。
- `ADMIN_DEV_BYPASS` 永远不在 Production 或 Preview 设置；代码只在 localhost 下认它。
- 后台 `/admin/*` 与 `/api/admin/*` 的安全**只靠 Cloudflare Access**，不靠隐藏路径。代码公开不影响安全。
- Cloudflare API Token 如需给 Hermes 用：最小权限（只给 Pages 部署和本项目需要的 D1/KV），只存 VPS。

## 四、验收标准
- [ ] `git ls-files` 中不再有 `.claude/` 和任何 `.env*`（`.env.example` 除外）
- [ ] `gitleaks detect --redact` 对整个仓库输出 0 findings
- [ ] `MAINTAINER.md` 不含 VPS 名称、IP、服务器路径、凭证信息
- [ ] pre-commit hook 能拦下一个测试用的假密钥（测完删除）
- [ ] 线上站点构建和部署不受影响：`npm run build`、`npm run check:links` 通过

## 五、不要做
- 不要为此改写 Git 历史或 force push（历史中没有密钥，没必要）
- 不要把任何真实值写进 `.env.example`、文档或提交信息
- 不要删除 `indexNowKey` 文件（`public/fc7fd0c2dde75c0336dc49f152b48547.txt`），它必须公开
