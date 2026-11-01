# 新增 Venture：DNY Cultural Heritage Exchange 交付报告

日期：2026-11-01 · 实施：Hermes · 依据：`docs/hermes/2026-11-01-venture-cultural-heritage-exchange.md`（v3，Max 已确认）
状态：**已上线**

## 1. 提交与线上

- 代码：`ea2eb66`（条目、页面、FAQ、入口、同步），`f0a1db0` 与 `ad7a184`（不盈利区块的样式与字号）
- 文档与 OG：本次提交
- 线上：`/ventures/cultural-heritage-exchange` 返回 200

## 2. venture 条目与数量

`ventures.ts` 按第 2 节逐字加入，排在 Evsider 之后，`category: 'Industry Ventures'`、`status: 'In Development'`。

数量走 `VENTURE_COUNT_WORD`，现在是 **eleven**：

- `/facts`：`eleven focused ventures`
- `/llms.txt`：`Number of ventures: 11`
- `/ventures.json`：11 条，最后一条是 `cultural-heritage-exchange`

写死 "ten" 的地方查过：全站没有 "ten ventures" 之类的表述，唯一出现 ten 的是 OPC 页 "Teams of up to about ten people"，指团队人数，与 venture 数量无关。

`architecture.ts`：Level 4 的列举里加了 `Cultural Heritage Exchange`，摘要句改为 "from drones and robotics to trade, building materials, EV accessories and cultural heritage"。

## 3. Venture 页面

正文按第 3 节逐字写入 `src/legacy/cultural-heritage-exchange.html`，标题由 `ventures.ts` 的 name 生成，Base 自动补 `| DNY Cross Border Group`，与第 3 节要求的 Title 一致；meta.json 只加了 hero 用的 lead（取自 3.1 第一句，未改写）。

页面顺序：Overview → No profit from the base work → Whose heritage（三张卡）→ What we help with / Who it is for（双栏）→ How a project moves（六步）→ How we work / Boundaries + Status → 现有的 "Help build DNY Cultural Heritage Exchange" 区块（第 3.9 节的 OPC/FDE 内容即此区块）。

**不盈利区块**用 `sep-box` 加金色左边框与淡金底，正文字号 15px、颜色 `#EEF4FF`（对深绿底对比度约 8:1）；"不是注册慈善机构"那行单独成段，上方有金色分隔线，13.5px 白色、opacity .92，桌面与手机都清楚可读（截图见下）。

第 3.8 节的 Boundaries 用 13.5px 次级列表放在 Status 之前。

按钮：主按钮文字沿用 "Partner with DNY"，链接到 `/contact?type=partnership&venture=cultural-heritage-exchange`；次按钮沿用现有 Join 入口。

## 4. FAQ

第 4 节两条逐字加入。**说明一处结构差异：**`faqs.ts` 里没有共享的 `ventures` 组，venture 页面是按 slug 取组（`FAQS[v.slug]`）。因此新建了 `cultural-heritage-exchange` 组，两条问答在该 venture 页与 `/faq` 同时出现，页面自带 FAQPage 结构化数据。如果 Claude 要的是全站共享的 ventures 组，我可以改，但那会影响 `/ventures` 列表页的 FAQ 结构。

## 5. 入口与预选

- Open Needs（`/opc-fde#needs`）：卡片由 `VENTURES` 自动生成，已出现，工作方向取自 capabilities。
- 申请表（`/opc-fde/join`）：Venture of interest 下拉自动含该项；新增脚本支持 `?venture=` 预选（实测选到 `cultural-heritage-exchange`）。
- 联系表单（`/contact`）：interest 选项自动含 "Venture: DNY Cultural Heritage Exchange"，现有脚本已支持 `?venture=`，实测预选成功。
- 另外把 venture 页 hero 的主按钮统一加上 `&venture={slug}`，任何 venture 页点 Partner with DNY 都会带上对应 venture（不只这一个）。

`/industries`：Future Verticals 加了 "Culture and creative industries: living heritage and traditional craft reaching new audiences" 卡片；该区块原本不支持链接，我加了一行 "Related venture: DNY Cultural Heritage Exchange" 指到本页。

## 6. 同步

`/facts`（数量 + 列表）、`llms.txt` + `llms-full.txt`（ventures 段自动，加 "Number of ventures: 11"）、`ventures.json`（11 条）、Markdown 孪生页（9,550 字节）、sitemap（自动收录）、OG 图。

OG 图另外补了 5 张无人机页面缺失的（`physical-intelligence--drones*`），之前那批页面引用的是不存在的图片。

## 7. 硬性规则核查

| 规则 | 结果 |
|---|---|
| 文案逐字照搬 | 第 3、4 节文字未改动，仅加小标题（Overview / Three kinds of heritage 等）与顺排版 |
| 不用 non-profit / not-for-profit | 新页面 0 处 |
| 不点名国家、项目、人名、机构 | 新页面 0 处（Australia and New Zealand 指自身基地，第 3.1 节原文即有） |
| 不放文化作品图片、不用原住民风格装饰 | 页面无任何图片与装饰图形，只有排版与品牌色 |
| 内部管理办法不进仓库 | 未提交任何内部文件 |
| 破折号 | 新页面 0 个 |
| 术语 | 使用 First Nations / Aboriginal and Torres Strait Islander 口径，未出现 Aborigines 或 native |
| `npm run check:links` | 通过：77 pages, 0 problem(s) |

## 8. 需要 Claude 看两件事

1. **FAQ 分组**：如上，我把两条放在按 slug 的组里，而不是新建共享 `ventures` 组。要共享组请说一声。
2. **顺带发现（不在本任务范围，未改）**：`Australian Trusted Data Oracle DAO` 的现有简介写的是 "A not-for-profit, rights-verified data service…"。按这份 v3 的第 1 节逻辑，Pty Ltd 运营的项目自称 non-profit 有同样的误导性陈述风险。我没有动它，因为那是另一个 venture 的既定文案，需要你和 Max 决定要不要按同样原则改写。

## 9. 截图

`docs/hermes/2026-11-01-cultural-heritage/screenshots/`

- `venture-desktop.jpg` 桌面整页（含不盈利区块与身份说明那行小字）
- `venture-mobile.jpg` 手机 390px（横向溢出 0）
- `ventures-list-desktop.jpg` `/ventures` 列表中的新卡片
