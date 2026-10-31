# 任务：Evsider 状态从 In Development 改为试运营（Pilot）

日期：2026-10-31 · 下达：Claude（Max 确认：evsider.com 已上线，开始接单，进入试运营）· 执行：Hermes · 状态：待实施

两个仓库都要改，**同一天上线**，避免集团站和品牌站说法不一致：
- A. evsider.com（`/root/sites/evsider-site`）
- B. 集团站（`dnycrossbordergroup-site`）

---

## 0. 为什么用新状态 "Pilot"，不用 "Operating"

集团站对 Operating 的定义是 "live with customers"（已有客户在用）。Evsider 现在是开始接单，还在试运营，直接写 Operating 说过头了；继续写 In Development 又说少了。所以在集团站的状态体系里**新增一个状态 `Pilot`**：

- 名称：`Pilot`
- 定义：`Live and taking orders in a pilot phase while operations are proven.`

以后其他项目进入试运营也用这个状态。

---

## A. evsider.com

### A1. 首页状态行（`src/pages/index.astro` 第 38 行附近）
- 原：`In development. Trade enquiries open; first production samples to follow.`
- 改：`Pilot phase. Now taking trade orders.`
- 金色圆点保留

### A2. FAQ（`src/data/faq.ts`）
"Is the range available now?" 这一题整题替换：
- 问：`Can I order now?`
- 答：`Yes. Evsider is in its pilot phase and taking trade orders. Fitment, lead time and minimum order are confirmed in each written quote.`

结构化数据 FAQPage 跟着同步，和页面上可见的文字一字不差。

### A3. 下单流程第 2 步（`src/data/site.ts` 第 37 到 38 行）
- 标题：`Quote and samples.` 改成 `Quote.`
- 文字：改成 `We confirm fitment, lead time and minimum order, and send a written quote.`

### A4. 材料默认值（`src/data/products.ts` 第 14 行）
- `MATERIAL_DEFAULT = 'To be confirmed with first samples'` 改成 `'Confirmed in your quote'`
- 如果页面上已经不显示材料字段，也照样改，避免以后被重新用上

### A5. 图片免责句（`src/data/site.ts` 第 25 行）
- 前两句保持不变（图片是概念渲染图，不是 Evsider 产品或真实车辆的照片）
- 最后一句 `Product photography will follow first production samples.` 改成 `Product photography will be added as the range ships.`

### A6. 全站检查
全站搜索以下词，结果必须为 0（`docs/` 目录除外）：`In development`、`in development`、`first production samples`、`first in line for samples`、`Not yet`

同步重新生成：`llms.txt`、`llms-full.txt`、各页的 Markdown 副本；`Last updated` 改为 31 October 2026。

---

## B. 集团站

### B1. 新增状态 `Pilot`
- `src/data/ventures.ts` 第 7 行：
  `export type Status = 'Operating' | 'Pilot' | 'In Development' | 'Proposed' | 'Research' | 'Partnership Opportunity';`
- 同一文件的状态说明表（第 28 行附近）加一条：
  `'Pilot': 'Live and taking orders in a pilot phase while operations are proven.',`
- 全仓库搜一遍 `'In Development'` 和 `Partnership Opportunity`，把所有按状态做样式、筛选、图例、排序的地方都补上 `Pilot`
- 状态标签的颜色：用青绿 `#5DCAA5`（和 Operating 区分开；如果 Operating 已经用了青绿，Pilot 就用青绿的线框款）。具体样式你按现有组件定

### B2. 状态定义的说明文字
- `src/data/faqs.ts` 第 29 行，改为：
  `'Operating means live with customers; Pilot means live and taking orders in a pilot phase; In Development means being designed, built or validated; Proposed means a defined concept awaiting partners, approvals or funding; Research means exploratory; Partnership Opportunity means open to a partner to lead or co-develop.'`
- `src/lib/ai-text.ts` 第 39 行：`labelled Operating, In Development, Proposed, Research or Partnership Opportunity` 改为 `labelled Operating, Pilot, In Development, Proposed, Research or Partnership Opportunity`

### B3. Evsider 这一条（`src/data/ventures.ts` 里 slug 为 `ev-accessories` 的对象）
- `status: 'Pilot'`
- `short` 改为：`Fitted accessories for electric vehicles, supplied to dealers, retailers, detailers and fleets. Now taking trade orders at evsider.com.`

### B4. `src/data/faqs.ts` 里 `'ev-accessories'` 组
第一题的答案里 `currently in development` 改为 `now in a pilot phase and taking trade orders`。其他题不动。

### B5. 检查
- `/ventures` 列表页：Evsider 的卡片显示 `Pilot`，样式正常；如果有按状态筛选，`Pilot` 能筛出 Evsider
- `/ventures/ev-accessories`：状态显示 `Pilot`，悬停或说明文字显示新定义
- 首页和 `llms.txt` 里如果有按状态统计的数量，数字要对得上
- `npm run build` 和 `npm run check:links` 通过；新的状态词如果被白名单拦住，就加进白名单
- 其他项目的状态一个都不能变

---

## 回报
两个仓库各写一份：
- evsider：`docs/2026-10-31-hermes-report-pilot-status.md`
- 集团站：`docs/hermes/2026-10-31-hermes-report-pilot-status.md`

内容：commit hash、两个站点的线上截图（Evsider 首页状态行、集团站 /ventures 卡片、集团站 venture 页）、A6 和 B5 的检查结果。
