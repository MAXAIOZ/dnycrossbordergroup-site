# 改名 + 去破折号 · 实施回报

日期：2026-10-30 · 执行：Hermes · 提交：**416bf37**（改名、去破折号、检查规则、两份任务文档，一次提交）
线上：https://dnycrossbordergroup.com ｜ 构建 71 页 ｜ `check:links` 72 页 0 问题 ｜ IndexNow 已提交 72 个 URL（HTTP 202）

导航截图（随本文件进仓库）：`docs/hermes/2026-10-30-rename-dashes/nav-1280.jpg`、`nav-1440.jpg`、`nav-375.jpg`

---

## 1. 任务 2：改名

| 位置 | 结果 |
|---|---|
| 顶部导航 | "Physical Super Intelligence (SI)"；1280–1439px 显示 "Physical SI"（见第 4 节） |
| 页面 H1 | `Physical Super Intelligence (SI): trusted AI that acts in the real world` |
| `<title>` | `Physical Super Intelligence (SI) \| DNY Cross Border Group` |
| Definition 区块 | `Physical Super Intelligence (SI): DNY’s long-term direction for AI that works in the physical world. …`（逐字使用文档第 3 节文案） |
| Hero Lead | 文档第 3 节给的 Lead 原文 |
| 架构第 3 层 | `Open Physical SI Layer`（`architecture.ts` 两处 + 首页架构图） |
| Venture 分类 | `'Physical SI'`（`ventures.ts` 的 `Category`、`CATEGORY_LINE`、三个 venture 的 `category`、`opc-group.ts`） |
| builtOn | `Physical SI: Air` / `: Embodied` / `: Industrial`（用冒号，不用破折号） |
| 术语表 | 新增 `Physical Super Intelligence (SI)`；`Open Physical Intelligence Layer` → `Open Physical SI Layer` |
| FAQ | physical 组两问改名；group 组新增 "What does DNY mean by Physical Super Intelligence (SI)?"（答案用第 3 节定义） |
| llms.txt / llms-full | 章节名、Group structure、Core focus（"physical AI toward Physical Super Intelligence (SI)"）已同步 |
| 结构化数据 | `knowsAbout` 走 `architecture.ts`/`site.ts` 数据，页面 DefinedTerm 用新定义 |
| URL | `/physical-intelligence` 及子页不变 |

`grep -rn "Physical Intelligence" src` 现只剩 2 处代码注释（`architecture.ts:2`、`:89`）。正文里的 physical AI / embodied AI 全部保留。

**一处偏离**：文档第 4.6 节要求"新增 Physical AI"条目，术语表里本来就有（`Physical AI — AI that perceives the real world through sensors…`）。我没有再插一条重复项，保留了原措辞。如果要求必须换成文档那句，说一声我替换。

## 2. 任务 1：去破折号

**规模**：124 处破折号被删除（净 123 处，`check-links.mjs` 自己的规则里新增 1 处字符常量），触及 55 个源文件 + 1 个脚本。逐处人工改写，没有做全局替换。

文件清单（不含 71 张重新生成的 OG 图和两份任务文档）：

```
src/data/  site.ts ventures.ts architecture.ts topics.ts industries.ts faqs.ts glossary.ts
           opc-group.ts components-catalogue.json
src/legacy/ ai-trade-services australia-ai-oracle building-supply dny-aerial-systems
           dny-robotic-systems ev-accessories facadia open-source-ai
           robotic-logistics-warehouse trusted-ai-a trusted-ai-b
           trusted-ai-open-source-platform meta.json
src/pages/ index about ai-infrastructure careers contact facts industries investors
           open-source-ai openapi.json.ts privacy trusted-ai ventures
           physical-intelligence opc-fde 404
           components/drones components/robotics components/enquiry components/products/[slug]
           opc-fde/needs/[id] ventures/[slug]
src/components/ Definition IndustryMatrix TopicPage
src/lib/ ai-text.ts
src/layouts/ Base.astro
public/ robots.txt assets/js/main.js assets/js/group.js assets/js/components.js assets/css/styles.css
scripts/ check-links.mjs
```

### 5 个抽查页面（改前 → 改后，各 2 例）

**首页 `/`**
1. "…infrastructure for Australian industry — and commercialises it through ten focused ventures." → "…infrastructure for Australian industry, and commercialises it through ten focused ventures."
2. "reported AI use in Transport, Postal & Warehousing — the physical-economy gap we target (ABS)" → "reported AI use in Transport, Postal & Warehousing, the physical-economy gap we target (ABS)"

**`/about`**
1. "That work showed us where industry breaks down — 交叉…" 原句："DNY began in cross-border trade and supply chain — moving products, documents and data between Australia and international markets." → "…cross-border trade and supply chain: moving products, documents and data between Australia and international markets."
2. "Our cross-border roots remain in the portfolio — trade services, building supply and logistics are where we apply the infrastructure first." → "Our cross-border roots remain in the portfolio: trade services, building supply and logistics are where we apply the infrastructure first."

**`/opc-fde`**
1. "DNY is your local partner in Sydney — contracting where a client needs it, meeting clients in local business hours and keeping delivery on track." → "DNY is your local partner in Sydney. We contract where a client needs it, meet clients in local business hours and keep delivery on track."（用文档第 3 节给的范文）
2. "Nothing provided through the Alliance — including guides, sessions and directory listings — is legal, tax, financial, insurance or immigration advice." → "Nothing provided through the Alliance, including guides, sessions and directory listings, is legal, tax, financial, insurance or immigration advice."（法律段落只动标点）

**`/privacy`**
1. "**Contact details** — your name, email address, phone number…" → "**Contact details**: your name, email address, phone number…"（7 个数据类别条目统一改成冒号）
2. "where needed to source or confirm a part you have asked about — we share only the technical details required…" → "…a part you have asked about: we share only the technical details required…"（隐私政策只改标点，一个词没动）

**`/ventures/ev-accessories`**
1. "**New models first** — fitment is planned for new EVs as they reach Australian showrooms" → "**New models first**: fitment is planned for new EVs as they reach Australian showrooms"（列表"标题 — 说明"统一改冒号，11 个能力条目、4 个 Trade & Fleet 条目同法）
2. "Battery-electric share of new-vehicle sales in Australia, January–September 2026 — with a record 24.9% in August." → "…January–September 2026, with a record 24.9% in August."（en dash 保留，破折号改逗号）

其余页面同法处理，典型改写模式：列表小标题 → 冒号；句中补充 → 逗号或括号；两个完整分句 → 拆成两句；引用/署名前的破折号 → 逗号；`<title>` 里的"页面 — 栏目"→ 只留页面名（栏目的信息在面包屑里，如 `Request a Quote — Drone & Robotics Components` → `Request a Quote`）。

### 实际保留的 "—"（逐条）

| 位置 | 内容 | 依据 |
|---|---|---|
| `src/components/IndustryMatrix.astro:20` | `<span class="dot none" aria-label="Not applicable" data-dash-ok>—</span>` | 表格空值，已加 `aria-label` 与 `data-dash-ok`；线上 12 个空值全部带这两个属性 |
| `public/assets/js/main.js:125` | mailto 主题 `[DNY Enquiry] … — …` | 明确保留的备用邮件标题 |
| `public/assets/js/group.js:172` | mailto 主题 `[DNY website] … enquiry — …` | 同上 |
| `public/assets/js/group.js:229–230` | mailto 主题 `[DNY OPC] Membership application — …` | 同上 |
| `functions/api/enquiry.js`（全文 26 处） | 通知邮件标题与正文、空字段占位 | 任务明确不改 |
| `functions/api/enquiries.js:96` | `source_page` 里拼接 `API (via …) — 原页面` | 零件询价的服务端内部记录，只出现在后台与通知邮件，访客看不到。**未加 `data-dash-ok`，按"列出来交你判断"处理** |
| `public/_redirects:1`、`styles.css`（9 处）、`group.css:2,437`、`fx.js`（8 处）、`main.js:2,74,169`、`group.js:2`、`components.js:2`、`src/data/*.ts` 与 `src/components/Definition.astro:2`、`catalogue.json.ts:2` | 代码注释、文件名注释、CSS 区块标题 | 任务范围外（注释） |
| `public/assets/img/ventures/ev-accessories/CREDITS.md`（15 处） | 图片署名与许可行 | 任务明确不改；检查器对该文件豁免 |
| `scripts/check-links.mjs:47` | 规则注释里的示例字符 | 新增的规则本身 |

## 3. 防复发：`check-links.mjs` 新增破折号检查

- 扫描 `dist` 全部公开页面（跳过 `/admin/`）、`.md` 孪生页、`llms.txt`、`llms-full.txt`。
- 跳过 `<script>`、`<style>`、HTML 注释，以及带 `data-dash-ok` 的元素（连同其内容）。
- Markdown 里整格只有 "—" 的表格单元格不算违规（孪生页会把单元格拍平成单独一行）。
- 报错格式：`✗ /privacy.html: em dash at line 1: …前后各 40 字符…`
- **有效性测试已做**：临时在 `/careers` 加一句 `DNY — test dash` → `72 pages checked, 1 problem(s)`，输出带文件、行号与上下文；删掉后恢复 0 问题。

## 4. 导航宽度（1280 / 1440 / 375）

| 宽度 | 显示 | 实测 |
|---|---|---|
| 1440 | Physical Super Intelligence (SI) | 单行，`.site-nav` 高 38px，右边界 1330 < 1440 |
| 1280 | Physical SI（媒体查询 1280–1439 生效） | 单行，右边界 1250 < 1280，无横向溢出 |
| 375 | 汉堡菜单内显示全称 | 单行，不换行 |

之所以在 1280–1439 用简称：全称比原名长 14 个字符，放在 1280 宽度下会把 "Request the Group Brief" 按钮挤到边界；文档第 4.1 节允许这个区间显示 "Physical SI"，我只用了这一条，没有删减任何导航项，也没有缩小间距。≥1440 显示全称。

## 5. 验收对照

| 验收项 | 结果 |
|---|---|
| `grep -rnE "—\|&mdash;\|&#8212;\|\\u2014" src public functions` 只剩保留清单 | ✅ 见第 2 节表格 |
| `check:links` 含破折号检查并通过 | ✅ 0 问题；植入测试会失败（第 3 节） |
| 5 个页面无破折号、句子通顺 | ✅ 第 2 节逐条；线上实测这 5 页破折号计数均为 0 |
| `/industries` 空值仍是 "—" 且带 `aria-label="Not applicable"` | ✅ 12 个空值全部带 `aria-label` 与 `data-dash-ok` |
| 表单提交成功提示无破折号 | ✅ main.js / group.js / components.js 三处提示文案已改（"Thank you, your … enquiry has been sent."、"Your details are still here, please try again."） |
| 导航、H1、title 用新名称，1280 不换行 | ✅ 第 4 节 |
| `/physical-intelligence` 正常；llms 与 md 同步 | ✅ 线上 200；llms.txt / llms-full.txt 含新名称、破折号 0 |
| OG 图重新生成 | ✅ 71 张全部重出（本机临时装了 playwright 1.55 + chromium，只用于跑 `scripts/generate-og.py`，未进仓库） |
| IndexNow | ✅ `npm run indexnow` 提交 72 个 URL，HTTP 202 |
| en dash 只用于数字/日期 | ✅ 保留的 `2024–25`、`2022–2025`、`January–September`、`2024–25` 均为范围 |

## 6. 需要你判断的一件事

`functions/api/enquiries.js:96` 的 `source_page` 拼接仍有一个破折号，作用是把通过 API 提交的询价标成 `API (via X) — 原页面`，只写入数据库并出现在后台列表和通知邮件里，访客看不到。它不在"不改"清单里，也不在白名单里；我没有自行加 `data-dash-ok`，也没有改它。要统一的话改成冒号即可，等你一句话。
