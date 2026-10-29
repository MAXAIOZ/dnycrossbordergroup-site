# MAINTAINER — dnycrossbordergroup.com

本文件写给在 VPS3_SYD 上维护本站的 Hermes。改站前先读完，别凭猜测动代码。

## 一、这是什么

DNY Cross Border Group 集团官网。**Astro 7 静态站 → GitHub → Cloudflare Pages 自动构建部署**（不是 Vercel，也不是自托管 nginx）。
仓库本地副本：`/root/sites/dnycrossbordergroup-site/`（VPS3）；上游：`git@github.com:MAXAIOZ/dnycrossbordergroup-site.git`，主分支 `main`。

现状基线（2026-10-26 在 VPS3 实测）：
- `npm install` + `npm run build` 通过：**70 个页面**，构建约 2 秒，同时生成 69 个 Markdown 孪生页
- 工作树干净，HEAD = `4b19f80`（Turn off particle background, bust asset cache, simplify product cards）
- 域名 `dnycrossbordergroup.com` 解析在 Cloudflare，NS = connie/yahir.ns.cloudflare.com

## 二、部署链路（关键）

```
改代码 → git push origin main → Cloudflare Pages 自动构建 → 上线
```

Cloudflare Pages 构建设置（必须与仓库一致，不要改）：
| 项 | 值 |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 取自仓库 `.node-version`（22） |

**Cloudflare Pages + Cloudflare DNS 可以用橙色云代理**（同账号，证书由 Pages 自己签）——这一点和 Vercel 不同，不要照着 Vercel 的经验把记录改成灰云。

## 三、内容改哪里（改数据，不改页面）

| 内容 | 文件 |
|---|---|
| 导航、页脚、联系方式、表单端点、分析 token | `src/data/site.ts` |
| 旗下项目（名称/状态/层级/行业/能力/关系） | `src/data/ventures.ts` |
| 五层集团架构、层级、Physical AI 闭环、信任模型 | `src/data/architecture.ts` |
| 行业与「行业×能力」矩阵 | `src/data/industries.ts` |
| 子页（Physical Intelligence / AI Infrastructure / Industries / OPC + FDE） | `src/data/topics.ts` |
| FAQ（带 FAQPage schema） | `src/data/faqs.ts` |
| 术语表 | `src/data/glossary.ts` |
| 从旧站迁来的长正文 | `src/legacy/*.html` |

新增一个项目：往 `VENTURES` 加一个对象即可，卡片、筛选、项目页、sitemap、ItemList schema 会自动更新。
状态词只能取：`Operating` / `In Development` / `Proposed` / `Research` / `Partnership Opportunity`。

## 四、改完必做的检查（不做不算完成）

```bash
npm run build          # 必须 0 error
npm run check:links    # 链接/锚点/单 H1/无中文/无 "AIHL"
python3 scripts/generate-og.py   # 改了标题或项目名时，重生成 OG 图
```

## 五、铁律

1. **全站英文**。`check:links` 会因为出现任何中日韩字符而失败 —— 这是设计，不许绕过。
2. 品牌色：深绿 `#04201A`、金 `#EF9F27`、青绿 `#5DCAA5`。
3. 不要改 `.node-version`（Pages 用 22），不要改 Cloudflare Pages 的构建命令与输出目录。
4. 不要动 `functions/api/admin/*` 的后端逻辑：它依赖 Cloudflare Pages 的绑定 `env.DB`（D1）与 `env.FILES`（R2），本地跑不起来是正常的，不代表坏了。
5. 联系表单走 FormSubmit（`https://formsubmit.co/ajax/info@dnycrossbordergroup.com`），投递到 info@ 邮箱；首次投递需要点一次激活邮件。
6. 分析 token 在 `src/data/site.ts`，当前为空 = 关闭；未经指示不要填。
7. 推送前先 `git fetch` 核对 `origin/main`，本地落后或远程被改过就先问，不要盲推。
8. 上线后要自己验证：`curl -sI https://dnycrossbordergroup.com` 返回 200，且改动的那一页能取到新内容。

## 六、当前缺口（推不上去的原因）

VPS3 上还没有 GitHub 写入凭证，`git push` 会失败。需要一个 deploy key 或细粒度 PAT，拿到后：

```bash
git clone git@github.com:MAXAIOZ/dnycrossbordergroup-site.git /root/sites/site-git
# 或把现有目录接回上游
cd /root/sites/dnycrossbordergroup-site && git remote add origin <repo> && git fetch
```

## 七、目录结构

```
src/components/   GroupStack, PIFlow, VentureCard/Grid, IndustryMatrix, TrustDiagram, FAQ, CTABand, TopicPage
src/data/         全部内容数据（见上表）
src/layouts/      Base.astro（head、SEO、schema、导航、页脚）
src/pages/        路由（干净 URL，如 /physical-intelligence/drones）
public/           assets/ styles.css·group.css·main.js·fx.js·group.js；og/ 社交图；_redirects、_headers、robots.txt
_legacy-static/   旧的手写 HTML 站，仅存档，不部署
```
