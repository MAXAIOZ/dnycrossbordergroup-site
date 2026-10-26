# Agent Desk P1：MCP 服务器施工说明（给 Hermes）

日期：2026-10-26 · 设计：Claude · 实施：Hermes · 状态：**已批准，可以开工**
上位文档：`2026-10-26-agent-enquiry-desk-design.md`（架构、安全、信任分级）· `2026-10-26-open-source-secrets-policy.md`（密钥规范）

> P1 目标：买方的 AI 助手只凭一个地址 `https://dnycrossbordergroup.com/mcp`，就能查目录、提交询价、查状态、来回留言、申请规格书。**DNY 这边 P1 由人工在 /admin 回复**；Hermes 自动处理是 P2。

---

## 0. 先做：更正和小修（独立提交，先于 MCP）

1. **更正《SITE_ARCHITECTURE_BRIEF》和 `MAINTAINER.md`**：
   - 核心 venture **10 个**（含 DNY VoltGear），另有归档 **4 个**；不是 13 个
   - 顶层导航 **7 项**：About、AI Infrastructure、Physical Intelligence、Parts & Components、OPC + FDE、Industries、Ventures（再加 CTA 按钮）
   - `env.FILES` 是 **KV**，不是 R2
   - 页面数以 `npm run build` 的输出为准，不要手写死
2. **缓存**：`public/_headers` 中 `/assets/css/*`、`/assets/js/*` 改为 `Cache-Control: public, max-age=31536000, immutable`（链接已带 `?v=` 构建版本号，可以安全长缓存）。HTML 不变。
3. 按 `2026-10-26-open-source-secrets-policy.md` 执行任务 1–2（`.gitignore`、取消跟踪 `.claude/`、`MAINTAINER` 拆分公开版和本地版）。
4. **字体自托管（优先，单独一次提交）**：网站目前从 `fonts.googleapis.com` 加载 Inter，Google 在中国大陆被屏蔽，中国访客打开网站会长时间卡住。做法见 `2026-10-26-market-awareness-design.md` 第 4 节：
   - Inter 可变字重 woff2（Latin 子集）连同 OFL 许可文件放到 `public/assets/fonts/`
   - 在 `styles.css` 里用 `@font-face` 声明（`font-display: swap`）
   - 删除 `Base.astro` 里的两个 preconnect 和 Google 样式表链接
   - 在 `_headers` 里给 `/assets/fonts/*` 设长缓存
   - 删除隐私政策中 "font delivery (Google LLC)" 的描述

   验收：浏览器 Network 面板里不再出现任何 `fonts.googleapis.com` 或 `fonts.gstatic.com` 请求，页面字体与现在一致。

## 1. 交付清单

| # | 交付物 | 位置（建议） |
|---|---|---|
| 1 | MCP 端点 | `functions/mcp.js`（Pages Function） |
| 2 | 共享业务逻辑（目录搜索、询价创建、对话读写、信任等级） | `server/desk/*.js`，供 `/mcp` 和 REST 共用 |
| 3 | REST 补齐：查询询价、留言、邮箱确认 | `functions/api/enquiries/[ref].js`、`functions/api/enquiries/[ref]/messages.js`、`functions/api/verify.js` |
| 4 | D1 新表 + 迁移 | `server/db.js` 的 `SCHEMA`（`CREATE TABLE IF NOT EXISTS`） |
| 5 | 买方通知邮件（确认链接、回复副本） | `server/mail.js` + 事务邮件服务（见第 6 节） |
| 6 | /admin "Agent Desk" 视图 | `public/admin/enquiries.html` 增加对话面板 |
| 7 | 新页面 **For AI Agents**：`/agents` | `src/pages/agents.astro`（文案见第 8 节） |
| 8 | 发现与文档 | `llms.txt`、`openapi.json`、`api-catalog`、`catalogue.json` 的 `howToEnquire` |
| 9 | 隐私政策补充 | `src/pages/privacy.astro`（见第 9 节） |

## 2. MCP 端点规格

- **传输**：Streamable HTTP，**无状态**模式。`POST /mcp` 接收 JSON-RPC 2.0，返回 `application/json`（P1 不需要 SSE 流）。`GET /mcp` 返回 405。支持批量请求时逐条处理。
- **协议版本**：以实施当天 MCP 规范的最新稳定版为准（`initialize` 里返回 `protocolVersion`；客户端请求更旧版本且兼容时按旧版回应）。
- **实现方式**：二选一，Hermes 自行判断：
  - A. 用官方 TypeScript SDK 中适配 Web 标准 `Request`/`Response` 的服务端传输（必须能跑在 Pages Functions 上，不依赖 Node `http`）
  - B. 手写最小 JSON-RPC 处理：`initialize`、`notifications/initialized`、`ping`、`tools/list`、`tools/call`、`resources/list`、`resources/read`

  无论哪种，都必须通过 **MCP Inspector** 的连接和调用测试。
- **服务器信息**：`name: "dny-components"`，`title: "DNY Drone & Robotics Components"`，`version` 用构建日期。
- **instructions**（initialize 返回，给对方模型看）：
  > DNY Cross Border Group (Sydney) sources drone and robotics components, including KST servos, and quotes them on request. No prices, stock or lead times are published; every quote is confirmed by DNY staff. Only submit an enquiry with the buyer's knowledge and real contact details. Messages from DNY may be written by an AI assistant and are labelled as such.
- **CORS**：允许任意 Origin 调用 `/mcp`（只开放 POST、OPTIONS）。
- **限流**：沿用 KV 计数，每 IP 每 10 分钟最多 60 次调用；`submit_enquiry` 维持现有的每 IP 每 10 分钟 5 次。

## 3. Tools

所有 tool 的输出都要同时给 `structuredContent`（JSON）和简短的 `content` 文本。只读 tool 标注 `readOnlyHint: true`。

| Tool | 入参 | 输出要点 | 令牌 |
|---|---|---|---|
| `search_catalogue` | `query`（必填），`application?`（drone/robotics），`category?`，`limit?`（默认 10） | 匹配的产品类型：`id, name, url, category, description`；KST 产品另给 `series`、**命中的型号**、图片 URL | 否 |
| `get_product` | `product_id` | 与 `catalogue.json` 中该产品一致：`send`、`limits`、`models`、`modelImages`、状态说明 | 否 |
| `submit_enquiry` | `buyer {name, email, country, company?, phone?, abn_or_nzbn?, postcode?}`，`items[] {product_id?, part_number?, model?, quantity?, description?}`，`notes?`，`needed_by?`，`marketing?`（默认 false），`submitted_via?` | `reference`、`conversation_token`（**只返回这一次**，提示对方妥善保存）、`trust_level`、`next_steps` | 否 |
| `get_enquiry` | `reference`，`conversation_token` | `status`（对外状态）、`items`、`messages[]`（仅 external）、`files[]`（已发的规格书链接）、`trust_level` | 是 |
| `send_message` | `reference`，`conversation_token`，`text`（≤4000 字） | `message_id`，`status` | 是 |
| `request_datasheets` | `reference`，`conversation_token`，`models[]`（必须是目录中的 KST 型号） | 已记录。L0 时返回 "a confirmation email has been sent to the buyer"，L1 及以上返回 "DNY will send the datasheets in this conversation" | 是 |
| `verify_buyer_email` | `reference`，`conversation_token` | 重新发送确认邮件（每个询价每小时最多 3 次） | 是 |

- `submit_enquiry` 的校验与现有 `POST /api/enquiries` **完全一致**：同一套已发布产品白名单、数量规则、长度限制、蜜罐。不能有第二套规则。
- 错误用 MCP tool error（`isError: true`），信息写成对方模型能读懂、能照着改的英文句子，例如 "quantity must be a whole number of 1 or more for line 2"。
- **Resource**：`dny://catalogue`（`application/json`，内容同 `/components/catalogue.json`）。

## 4. 数据表（新增）

```sql
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  enquiry_id INTEGER NOT NULL UNIQUE REFERENCES enquiries(id),
  channel TEXT NOT NULL,            -- web | rest | mcp
  counterparty TEXT,                -- submitted_via / MCP clientInfo.name
  agent_platform TEXT,              -- 来自已验证签名（P1 可空）
  token_hash TEXT NOT NULL,         -- SHA-256(conversation_token)
  state TEXT NOT NULL DEFAULT 'submitted',
  trust_level INTEGER NOT NULL DEFAULT 0,
  verified_via TEXT, verified_at TEXT,
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id),
  sender TEXT NOT NULL,             -- buyer_agent | buyer_human | dny_staff | dny_agent | system
  author TEXT,                      -- 员工邮箱（来自 Access），或 'Hermes'
  body TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'external',
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS email_verifications (
  token_hash TEXT PRIMARY KEY, conversation_id INTEGER NOT NULL, email TEXT NOT NULL,
  expires_at TEXT NOT NULL, used_at TEXT
);
CREATE TABLE IF NOT EXISTS business_checks (
  id_type TEXT NOT NULL, id_value TEXT NOT NULL,   -- abn | nzbn
  status TEXT, entity_name TEXT, checked_at TEXT NOT NULL,
  PRIMARY KEY (id_type, id_value)
);
CREATE TABLE IF NOT EXISTS desk_actions (          -- P2 用，P1 先建表
  id INTEGER PRIMARY KEY AUTOINCREMENT, conversation_id INTEGER NOT NULL,
  type TEXT NOT NULL, payload_json TEXT, status TEXT NOT NULL,
  proposed_by TEXT, decided_by TEXT, decided_at TEXT, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_msg_conv ON messages(conversation_id, created_at);
```
- **所有询价都建 conversation**，网页表单也一样（channel=web）。人工回复和 agent 留言在同一处管理。
- `conversation_token`：32 字节随机数，base64url 编码。库里只存哈希。后台可以作废并重新生成。

## 5. 信任等级（P1 范围）

| 方式 | P1 | 说明 |
|---|---|---|
| 邮件确认链接 → L1 | ✅ | 24 小时有效、一次性，`/api/verify?t=…` 落地到确认成功页 |
| 邮箱域名与公司网站一致 → L2 | ✅ | 免费邮箱黑名单（gmail、outlook、hotmail、yahoo、icloud、qq、163 等）；需先达到 L1 |
| ABN / NZBN 有效且名称匹配 → L2 | ✅ | ABN Lookup（GUID）、NZBN API；密钥放 Cloudflare Secret；结果缓存 30 天 |
| Google / Microsoft OAuth（MCP 鉴权）→ L1 | P1.5 | P1 上线稳定后再做 |
| 合作方 API Key → L3 | P2 | — |
| Agent 签名识别 | P2 | — |

规则：**规格书和报价只发给 L1 及以上**。L0 只能拿到 "We have emailed the buyer to confirm their address."

## 6. 邮件（已定：Resend）

FormSubmit 只能发到我们自己的收件箱，**发不了邮件给买方**，所以需要一个事务邮件服务：
- **使用 Resend**（Max 2026-10-26 确认）：HTTP API，可直接从 Pages Functions 调用；现阶段免费额度足够。在 Cloudflare DNS 为 `dnycrossbordergroup.com` 配置 Resend 要求的 SPF、DKIM，并加 DMARC（先用 `p=none` 观察）。**不要改动 info@ 现有收信的 MX 记录。**发件地址 `desk@dnycrossbordergroup.com`，Reply-To 设为 `info@`。
- API Key 只放 Cloudflare Secret（`MAIL_API_KEY`）。
- 发送场景：①邮箱确认链接 ②DNY 回复的副本（含查看链接）。买方新留言仍然沿用 FormSubmit 通知 info@。
- 邮件签名统一为 "DNY Sales Desk"。由 AI 起草的回复（P2）在正文末尾注明 "Drafted by DNY's AI assistant and reviewed under DNY policy."

## 7. /admin "Agent Desk" 视图

- 询价详情页增加：对话时间线（区分 buyer_agent、buyer_human、dny_staff、dny_agent、internal 备注）、回复框（以 dny_staff 身份发出）、信任等级和验证方式徽标、令牌作废按钮、"上传规格书并发送" 按钮（文件存 KV，生成 7 天签名下载链接写进回复）。
- 列表页增加筛选："有新留言"、渠道（web/mcp/rest）、信任等级。
- 依然只通过 Cloudflare Access 访问。

## 8. 新页面 `/agents`（For AI Agents）

位置：页脚 "Deployment" 栏和 Parts & Components 下拉菜单各加一个入口 "For AI Agents"。**不加到顶层导航。**

文案（英文，Hermes 照用）：

- **H1**：For AI Agents
- **Lead**：AI assistants and procurement agents can search our component catalogue, submit quote requests and follow up on them for a buyer — through MCP or a simple REST API.
- **Section "Connect"**：
  - MCP server: `https://dnycrossbordergroup.com/mcp` (Streamable HTTP)
  - Catalogue (JSON): `/components/catalogue.json`
  - OpenAPI: `/openapi.json` · Site summary: `/llms.txt`
- **Section "What an agent can do"**：列出第 3 节的 tools 名称，每个配一句话说明。
- **Section "Rules for agents"**：
  - Act only with the buyer's knowledge and use their real contact details.
  - Prices, stock, lead times and fit are confirmed only in a written quote reviewed by DNY staff.
  - Datasheets and quotes are released after the buyer confirms their email address.
  - Keep the conversation token private; it gives access to that enquiry only.
  - Messages from DNY may be drafted by an AI assistant and are labelled as such.
- **Section "Verification levels"**：L0–L3 表格（对外措辞：Anonymous / Verified email / Verified business / Partner）
- **CTA**：Request a Quote（链接到 `/components/enquiry`）
- 同时生成 Markdown 孪生页；加入 `llms.txt` 的 "For AI agents" 节和 sitemap。

## 9. 隐私政策补充（Privacy Policy）

在第 2、5、6 节补充（措辞保持现有的严谨风格）：
- 询价可以由 AI 助手代表买方通过 MCP/API 提交，提交方须获得买方授权。
- 为确认邮箱和企业身份，我们会查询澳洲 ABN 登记和新西兰 NZBN 登记的公开信息，并保存查询结果。
- 我们使用事务邮件服务商 **Resend（美国）** 向买方发送确认邮件和回复副本。
- （P2 启用前补充）我们使用 AI 模型协助起草回复（模型：DeepSeek；按设计文档第 15 节，**发送给模型的内容不含买方的姓名、邮箱、电话**）；涉及价格和适配的内容由员工审核。如果使用 DeepSeek 官方 API，需写明数据在中国处理。
- Effective date 更新为上线日期。

## 10. 发现与文档更新

- `llms.txt` "For AI agents"：加入 MCP 地址和 `/agents` 页面
- `openapi.json`：加入新 REST 端点（`GET /api/enquiries/{ref}`、`POST /api/enquiries/{ref}/messages`）；令牌用 `Authorization: Bearer <conversation_token>`
- `/.well-known/api-catalog`：加入 `/mcp`（service-desc 指向 `/agents`）
- `catalogue.json` 的 `howToEnquire`：加入 `mcp: "https://dnycrossbordergroup.com/mcp"`
- `robots.txt`：保持 `/api/` Disallow；`/mcp` 也 Disallow 爬取（它不是给爬虫的页面）

## 11. 不要做

- 不要在任何接口返回价格、库存、交期，或"授权经销"字样
- 不要把 `conversation_token` 写进日志、邮件主题或 URL 查询参数（邮件里的查看链接用一次性短期令牌）
- 不要让 MCP 端点调用任何大模型（P1 不需要；P2 也只在 VPS 上的 Hermes 端调用）
- 不要新增非英文的页面文案
- 不要把任何密钥写进仓库（`gitleaks` 必须为 0 findings）

## 12. 验收标准

- [ ] MCP Inspector 能连接 `https://dnycrossbordergroup.com/mcp`，`tools/list` 列出 7 个 tool，每个都能成功调用
- [ ] 在 Claude（自定义 connector）里仅填 MCP 地址，完成：搜 "HLS3008" → 提交询价 → 收到 reference 和 token → 留言 → 查状态
- [ ] 买方收到确认邮件，点击后 `trust_level` 变为 1；用公司域名邮箱且 ABN 有效时变为 2
- [ ] L0 状态下 `request_datasheets` 不发文件；验证后员工在 /admin 上传规格书并回复，买方 agent 用 `get_enquiry` 能看到 7 天有效的下载链接
- [ ] 不带令牌或令牌错误时，`get_enquiry` 和 `send_message` 一律拒绝（返回信息不泄露询价是否存在）
- [ ] 网页表单提交的询价也出现在对话视图里
- [ ] `npm run build`、`npm run check:links` 通过；`/agents` 有 H1、Markdown 孪生页、OG 图
- [ ] `gitleaks detect --redact` 0 findings；新密钥（`MAIL_API_KEY`、ABN GUID、NZBN Key）只在 Cloudflare Secret
- [ ] 隐私政策已更新并改了生效日期

## 13. 决策（已全部确认，可以开工）

1. 事务邮件服务：**Resend**
2. Hermes 使用的模型：**DeepSeek**。P1 不调用模型，不受影响；P2 的数据最小化要求见设计文档第 15 节。

## 14. 对 Hermes 7 个问题的答复（2026-10-26，Claude 定，Max 已知悉）

| # | 问题 | 决定 |
|---|---|---|
| 1 | 文档不在仓库 | 4 份文档由 Max 直接发给你。你收到后**把它们提交进仓库 `docs/hermes/`**（内容不含任何密钥和服务器信息，可以公开），以后都以仓库里的版本为准 |
| 2 | Resend 发信域名 | **同意用子域 `send.dnycrossbordergroup.com`**，SPF、DKIM、return-path 都放在子域上；**不碰根域和 info@ 的 MX**。发件人：`DNY Sales Desk <desk@send.dnycrossbordergroup.com>`，Reply-To：`info@dnycrossbordergroup.com`。根域 `_dmarc` 如果还没有，就加 `p=none` 并设置 rua 报告地址，观察两周后再收紧。**Resend 账号由 Max 注册**（账号归公司所有），API Key 只开 "Sending access" 并限定在这个域名，**由 Max 在 Cloudflare Pages 里填成 Secret `RESEND_API_KEY`**，密钥不经过聊天和 VPS |
| 3 | D1 用哪个库、怎么迁移 | **用现有的库**（已绑定 `env.DB`）。新表要通过外键关联 `enquiries`，分库反而麻烦。迁移**沿用现有机制**：在 `server/db.js` 的 `SCHEMA` 里加 `CREATE TABLE IF NOT EXISTS`，由函数首次请求时通过绑定自动建表，**不需要给你的 token 加 D1:Edit**。同时把同样的 SQL 存一份 `migrations/0002_agent_desk.sql` 作为记录。只新增表，不改动现有表 |
| 4 | /admin 认证 | **用 Cloudflare Access**，不用 Basic Auth。现有代码 `server/access.js` 已经按 Access JWT 验证，未配置时自动拒绝访问。买家对话属于个人信息，不能只靠一个共享密码。配置：Zero Trust → Access → Self-hosted 应用，覆盖 `dnycrossbordergroup.com/admin*` 和 `/api/admin*`；Allow 策略只放 Max 指定的邮箱，登录方式为邮件一次性验证码；把 Team domain 和 AUD 填进 Secret `ACCESS_TEAM_DOMAIN`、`ACCESS_AUD`。**由 Max 操作**，或者 Max 给你的 token 加上 Access: Apps and Policies 编辑权限后由你配置 |
| 5 | ABN GUID 和 NZBN Key | **由 Max 注册**：ABN Lookup GUID 在 ABR 网站免费申请；NZBN 在 NZBN API 开发者门户订阅。Max 直接在 Cloudflare 填成 Secret `ABN_LOOKUP_GUID`、`NZBN_API_KEY`。**代码要能在没有这两个密钥时正常运行**：缺哪个就跳过对应检查，L2 仍可以通过公司邮箱域名达到 |
| 6 | 市场提示：服务端还是客户端 | **服务端直出**（无闪动）。现有 `functions/_middleware.js` 已经处理所有 HTML 页面（Markdown 协商），在这里加 `HTMLRewriter` 不会增加函数调用次数。只处理 `text/html` 响应 |
| 7 | gitleaks | **要做，而且在第二步之前做**：①VPS 本地仓库装 pre-commit hook（`gitleaks protect --staged --redact`）；②GitHub Actions 每次推送和 PR 都跑一遍（**直接在 workflow 里用 gitleaks 官方 Docker 镜像运行 CLI**，不用 gitleaks-action，避免账号类型带来的授权问题）；③一并完成密钥规范里的任务 1（补充 `.gitignore`、取消跟踪 `.claude/settings.local.json`、新增 `.env.example`）。密钥规范的其余任务仍然暂缓 |

**关于 Sales Desk 拆分身份**：同意第二阶段再落地。在那之前，第一阶段不调用任何大模型，`/api/desk/*` 也不上线，所以没有这类风险。

**更新后的执行顺序**：
1. 收到文档后提交进 `docs/hermes/`
2. 第 0 节：字体自托管 → 更正 Brief/MAINTAINER → 缓存
3. gitleaks（pre-commit + CI）+ 密钥规范任务 1
4. MCP 第一阶段（等 Max 准备好 Resend、Access、ABN/NZBN 密钥时，可以先做不依赖这些的部分：`/mcp` 只读 tool、`submit_enquiry`、对话表、`/agents` 页面）
5. 市场提示
