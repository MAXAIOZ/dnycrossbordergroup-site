# 导航调整 · 实施回报：Parts & Components 并入 Physical Super Intelligence (SI)

日期：2026-10-30 · 执行：Hermes · 提交：**a648f5b**（导航合并、面包屑、互链）、**c5b4be8**（全宽显示 SI 全称）、**492fe4e**（新区块按钮间距）、**6bc3a62**（llms 段落命名）
构建 71 页 ｜ `check:links` 72 页 0 问题 ｜ 全部旧网址 200

截图（随本文件进仓库，`docs/hermes/2026-10-30-nav-si/`）：
`nav-1440.jpg`、`nav-1280.jpg`、`nav-390.jpg`、`pi-parts-section.jpg`、`breadcrumb-product.jpg`

---

## 1. 导航（7 → 6）

一级：About · AI Infrastructure · Physical Super Intelligence (SI) · OPC + FDE · Industries · Ventures

`site.ts` 里 `NavChild` 新增 `group`，`NavItem` 新增 `match` 与 `groups`；组标题与组标题链接都在数据里配置，模板不写死：

```ts
match: ['/physical-intelligence', '/components'],
groups: [{ title: 'Physical SI' }, { title: 'Parts & Components', href: '/components' }],
```

下拉两栏：左 `Physical SI`（Overview / Drones / Robotics），右 `Parts & Components`（Drone Components / Robotics Components / Request a Quote），右栏组标题本身链到 `/components`。桌面 `grid-template-columns: 1fr 1fr`，手机单列上下排；每组 `role="group"` + `aria-label`，Tab 顺序左栏到右栏。

**SI 全称在 1280px 下放得下，`shortLabel` 已删除。** 实测（删掉后线上取数）：

| 视口 | 一级项 | 行数 | 导航高 | 横向溢出 | SI 显示 |
|---|---|---|---|---|---|
| 1440 | 6 | 1 | 38px | 0 | Physical Super Intelligence (SI) |
| 1280 | 6 | 1 | 38px | 0 | Physical Super Intelligence (SI) |
| 1200 | 6 | 1 | 38px | 0 | 全称 |
| 1141（桌面最窄） | 6 | 1 | 38px | 0 | 全称 |

下拉框右边界 1218px（1280 视口），不出视口。`shortLabel` 的字段与 1280–1439px 媒体查询作为备用机制留在代码里，当前无数据启用，DOM 不渲染多余 span。

## 2. 网址与高亮

`/components/*` 全部原样保留，没有任何重定向；访问 `/components`、`/components/drones`、`/components/products/{slug}` 时一级菜单 Physical Super Intelligence (SI) 为 active 态（`match` 数组判定，线上实测三个页面均通过）。

## 3. 面包屑与结构化数据

| 页面 | 页面显示 | BreadcrumbList `name` |
|---|---|---|
| `/components` | Home › Physical SI › Parts & Components | Home › **Physical Super Intelligence (SI)** › Parts & Components |
| `/components/drones` | Home › Physical SI › Parts & Components › Drone Components | 同上，第二级用全称 |
| `/components/robotics` | 同构，末级 Robotics Components | 同上 |
| `/components/enquiry` | 同构，末级 Request a Quote | 同上 |
| `/components/products/{slug}` | Home › Physical SI › Parts & Components › Drone 或 Robotics Components › 产品名 | 同上 |

实现：`Crumb` 增加可选 `schemaName`，页面显示简称、结构化数据用全称。PageHero 的 badge 未动，仍是 "Parts & Components"。JSON-LD 已抽查产品页，五级顺序、position、item 均正确。

## 4. 页面互链（第 5 节，文案逐字）

- **`/physical-intelligence`**：ventures 区块之后、FAQ 之前新增 `#parts` 区块。Kicker "Available Today"，标题 "Parts & Components for drones and robots"，导语与两张卡片文字逐字照抄，卡片分别链到 `/components/drones`、`/components/robotics`，下方居中 "Request a Quote" 按钮链 `/components/enquiry`。
- **`/physical-intelligence/drones`**：CTA 之前新增 "Parts for drones" 区块，文字与 "Browse Drone Components" 链接逐字照抄。
- **`/physical-intelligence/robotics`**：CTA 之前新增 "Parts for robots" 区块，"Browse Robotics Components" 逐字。
- **`/components`**：Hero 导语下方加 "Part of DNY's Physical Super Intelligence (SI) direction."，物理超级智能链接到 `/physical-intelligence`。

（5.2 / 5.3 的做法：`topics.ts` 的 `Topic` 加可选 `parts` 字段，`TopicPage` 在 CTA 前渲染小区块，不新增 section kind，视觉沿用现有标题与 lead 样式。）

## 5. 不改的部分

网址、`/components/catalogue.json`、产品页、询价接口、询价篮的 localStorage 键全部未动。页脚仍在 "Deployment" 一栏，链接文字 "Drone & Robotics Components" 改为 "Parts & Components"。`/ventures` 与 `/opc-fde` 的 Components 卡片未动。新文案无破折号。

## 6. llms.txt

```
## Physical Super Intelligence (SI)
### Physical SI
- Overview / Drones / Robotics
### Parts & Components
- Drone Components / Robotics Components / Request a Quote
...
## Components catalogue
- Overview (/components) + 各品类计数与产品链接
```

Parts & Components 在导航列表里只出现一次；目录与 JSON 链接的专门段落保留，标题从 "Drone & Robotics Components" 改为 "Components catalogue"，避免与导航组名重复。`ai-text.ts` 里原来 `item.href === '/components'` 的跳过逻辑已随一级菜单移除，现在只跳过 `/ventures`。Markdown 孪生页随页面内容自动生成，面包屑文本同步。

## 7. 验收对照

| 验收项 | 结果 |
|---|---|
| 一级导航 6 项、顺序正确 | ✅ |
| 1280 / 1440 不换行；说明全称是否放得下、是否删 shortLabel | ✅ 见第 1 节，全称放得下，已删 |
| 下拉两栏、两个组标题、Parts & Components 标题可点、1280 不出视口 | ✅ 右边界 1218 < 1280 |
| 手机 390 只展开一级、两组上下排列、链接可点 | ✅ 组 1 顶部 236px、组 2 顶部 399px，7 个链接 |
| `/components`、`/components/drones`、产品页 SI 高亮 | ✅ |
| 面包屑全部正确，结构化数据校验 | ✅ 字段与顺序已核，第二级用全称 |
| 第 5 节四处互链、文案逐字 | ✅ |
| 旧网址 200、无新增 404、`check:links` 通过（含破折号检查） | ✅ 11 个关键网址实测 200 |
| llms.txt 中 Parts & Components 只在 SI 下出现一次、目录段落仍在 | ✅ 见第 6 节 |
| 截图：1280 / 1440 / 390 下拉、PI 新区块、产品页面包屑 | ✅ 5 张，见文首路径 |

## 8. 一处判断，供你确认

第 7 节要求 "Components 专门段落保留"，而该段落原本的主标题是 "Drone & Robotics Components"，与新的下拉组名 "Parts & Components" 并列会让 llms.txt 里出现两个近似的一级标题。我把它改名为 "Components catalogue"（内容、链接、品类计数、产品清单全部保留），这样导航列表里的 "Parts & Components" 确实只出现一次。如果你希望保留原标题，我改回来即可。
