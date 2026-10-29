# 导航调整：Parts & Components 并入 Physical Super Intelligence (SI)（给 Hermes）

日期：2026-10-30 · 设计：Claude · 实施：Hermes · 状态：**待 Max 确认后开工**

## 1. 问题
- 顶部导航里，"Physical Super Intelligence (SI)" 和 "Parts & Components" 是两个并列的一级菜单。
- 两个菜单下面都按无人机和机器人来分（Drones 和 Drone Components，Robotics 和 Robotics Components），访客看到的就是重复。
- 一级菜单一共 7 项，加上 SI 的全称很长，1280px 宽度下只能显示简称。

## 2. 决定
- **导航合并：**Parts & Components 不再是一级菜单，改为 Physical SI 下拉菜单里的第二组。
- **网址不变：**`/components/*` 全部保留，不做重定向。
- **层级关系**通过面包屑、结构化数据和页面互链来表达，不放到孙页面网址里（例如 `/physical-intelligence/drones/components`）。原因：
  1. **配件是目前唯一在接单的业务。**访客是采购人员，放到三层以下不好找，手机上的三级菜单也很难用。
  2. **目录和询价单是统一的。**KST 舵机同时出现在无人机和机器人两类里，一张询价单也可以同时含两类配件。拆到 Drones 和 Robotics 两个父页面下面，目录和询价篮就被切开了。
  3. **`/components` 已被收录。**IndexNow、`/components/catalogue.json`、`openapi.json`、Markdown 孪生页和询价接口都用这个路径，改网址只会损失收录。
  4. **SI 页面讲的是长期方向。**配件以"今天就能提供的东西"的身份出现在 SI 下面，可以支撑可信度，但不应该把 SI 页面本身变成配件目录。

## 3. 新的顶部导航（7 项变 6 项）
About · AI Infrastructure · Physical Super Intelligence (SI) · OPC + FDE · Industries · Ventures

Physical SI 下拉菜单分两组，桌面端左右两栏，手机端上下排列：

| 组 | 链接 | 说明文字（desc） |
|---|---|---|
| **Physical SI**（组标题，不加链接） | Overview → `/physical-intelligence` | Trusted AI for drones, robots and edge systems |
| | Drones → `/physical-intelligence/drones` | Air Intelligence |
| | Robotics → `/physical-intelligence/robotics` | Embodied Intelligence |
| **Parts & Components**（组标题链接到 `/components`） | Drone Components → `/components/drones` | Propellers, airframe parts, mounts, cases, KST servos |
| | Robotics Components → `/components/robotics` | Cleaning, warehouse, gripper parts and KST servos |
| | Request a Quote → `/components/enquiry` | Model, part number and quantity |

**实现要求：**
- `NavChild` 增加可选字段 `group`。组标题和组标题的链接放在 `site.ts` 里配置，不写死在模板里。
- `NavItem` 增加可选字段 `match`（路径前缀数组）。Physical SI 设为 `['/physical-intelligence', '/components']`，访问 `/components/*` 时 Physical SI 一级菜单显示为当前栏目。
- **手机端：**仍然只有一级展开。组标题用小号大写标签，Parts & Components 标题本身可以点击；不做第三级折叠。
- **键盘和读屏：**每组用 `role="group"` 加 `aria-label`（组名）。Tab 顺序先左栏后右栏。
- **宽度：**一级菜单减到 6 项后，在 1280px 下检查 SI 全称能否完整显示且不换行。
  - 能放下：删掉 `shortLabel`，所有宽度都显示全称。
  - 放不下：保留 1280–1439px 显示 "Physical SI" 的规则。
- **下拉框位置：**两栏下拉框在 1280px 下不能超出视口右边缘。

## 4. 面包屑和结构化数据
`/components/*` 所有页面的面包屑前面加一级 Physical SI：

- `/components`：Home › Physical SI › Parts & Components
- `/components/drones`：Home › Physical SI › Parts & Components › Drone Components
- `/components/robotics`：Home › Physical SI › Parts & Components › Robotics Components
- `/components/enquiry`：Home › Physical SI › Parts & Components › Request a Quote
- `/components/products/{slug}`：Home › Physical SI › Parts & Components › {Drone 或 Robotics Components} › {产品名}

规则：
- 页面上显示简称 "Physical SI"。BreadcrumbList 结构化数据里的 name 用全称 "Physical Super Intelligence (SI)"。
- PageHero 的 badge 保持 "Parts & Components" 不变。

## 5. 页面互链（新增文案，逐字使用）

**5.1 `/physical-intelligence` 总览页**
在 ventures 区块之后、FAQ 之前，新增一个区块：
- Kicker：Available Today
- 标题：Parts & Components for drones and robots
- 导语：Physical SI is our long-term direction. Today we keep drones and robots working by sourcing the parts they need. Tell us the model and part number, and we source and quote it.
- 两张卡片：
  - **Drone Components** → `/components/drones`："Replacement propellers, airframe parts, mounts, cases and KST servos, matched to your model and part number."
  - **Robotics Components** → `/components/robotics`："Cleaning consumables, wheels and tyres, gripper parts and KST servos for commercial and industrial robots."
- 按钮：Request a Quote → `/components/enquiry`

**5.2 `/physical-intelligence/drones`**
在 CTA 之前新增一个小区块：
- 标题：Parts for drones
- 文字：Replacement propellers, airframe parts, mounts, cases and KST servos, matched to your model and part number.
- 链接：Browse Drone Components → `/components/drones`

**5.3 `/physical-intelligence/robotics`**
在 CTA 之前新增一个小区块：
- 标题：Parts for robots
- 文字：Cleaning consumables, wheels and tyres, gripper parts and KST servos for commercial and industrial robots.
- 链接：Browse Robotics Components → `/components/robotics`

**5.4 `/components` 总览页**
Hero 导语下方加一行小字：Part of DNY's [Physical Super Intelligence (SI)](/physical-intelligence) direction.

5.2 和 5.3 的实现方式（新增 section kind，或者复用现有 tiles）由你选择，视觉上和页面现有区块保持一致即可。

## 6. 不改的部分
- 所有网址，包括 `/components/*`、`/components/catalogue.json`、产品页、询价接口和询价篮的本地存储键。
- 页脚：仍放在 "Deployment" 一栏，只把链接文字从 "Drone & Robotics Components" 统一改为 "Parts & Components"。
- `/ventures` 和 `/opc-fde` 里 Components 卡片的 "Business line" 标签和文案。
- 新文案不使用破折号 "—"（遵守 2026-10-30-copy-remove-em-dashes.md 的规则）。

## 7. llms.txt 和 Markdown
- llms.txt 的导航列表跟随新结构：Parts & Components 出现在 Physical SI 下面，而且只出现一次。
- 原有的 Components 专门段落（目录、JSON 链接）保留。注意 `ai-text.ts` 第 51 行跳过 `/components` 的逻辑要相应调整，避免重复或遗漏。
- Markdown 孪生页跟随页面内容自动更新。

## 8. 验收标准
- [ ] 一级导航为 6 项，顺序同第 3 节。
- [ ] 1280px 和 1440px 下导航不换行。汇报里说明 SI 全称在 1280px 下是否放得下，以及是否删掉了 `shortLabel`。
- [ ] Physical SI 下拉框在桌面端显示两栏、两个组标题，Parts & Components 标题可以点击；1280px 下不超出视口。
- [ ] 手机端（390px）只有一级展开，两组上下排列，所有链接都能点击。
- [ ] 访问 `/components`、`/components/drones` 或任一产品页时，Physical SI 一级菜单高亮。
- [ ] 第 4 节的面包屑全部正确，BreadcrumbList 用 Google Rich Results Test 或 schema 校验通过。
- [ ] 第 5 节四处互链都已上线，文案逐字一致。
- [ ] 所有旧网址返回 200，没有新增 404。`npm run check:links` 通过（包括破折号检查）。
- [ ] llms.txt 中 Parts & Components 只在 Physical SI 下出现一次，Components 专门段落仍在。
- [ ] 汇报内容：
  - 桌面 1280px、1440px 和手机 390px 的下拉菜单截图
  - `/physical-intelligence` 新区块截图
  - 一个产品页的面包屑截图
