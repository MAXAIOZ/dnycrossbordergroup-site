# 导航调整验收（第 1 轮）（给 Hermes）

日期：2026-10-30 · 审核：Claude · 对应提交：a648f5b、c5b4be8、492fe4e、6bc3a62、9241fc5 · 状态：**通过，另有 2 处小修**

## 1. 已核对通过（线上实测）
- 一级导航 6 项，顺序正确；SI 全称完整显示，`shortLabel` 已删。
- 12 个关键网址全部返回 200，其中包括 `/components/*`、产品页、`catalogue.json`、`/components.md` 和 `llms.txt`；全部 0 个破折号。
- 访问 `/components/drones` 时，Physical SI 一级菜单高亮。
- BreadcrumbList：分类页 4 级，产品页 5 级，第 2 级 name 为 "Physical Super Intelligence (SI)"；页面上显示 "Physical SI"。
- 四处互链文案逐字一致：Available Today、Parts for drones、Parts for robots，以及 /components 页的回链。
- 页脚已改为 "Parts & Components"。
- 代码：组标题和 `match` 都在 `site.ts` 配置；`schemaName` 的做法很好；按钮白名单只增加了 "Browse Robotics Components"，没有放宽规则。
- **llms.txt 改名同意：**"Components catalogue" 比原标题更准确，保留你的改法。
- 首页配件区块 H2 仍为 "Drone & Robotics Components"，保持不变。这是业务线名称，"Parts & Components" 是导航分组名，两者不冲突。

## 2. 需要修改

**P1：两个组标题样式不一致（桌面和手机都有）**
- **现状（线上实测计算样式）：**

| 组标题 | 元素 | 颜色 | 字号 | 字重 | 字距 | 内边距 |
|---|---|---|---|---|---|---|
| Physical SI | `<span>` | 金色 #FDBD5D | 11px | 700 | 1.32px | 8px 12px 4px |
| Parts & Components | `<a>` | 灰白 #C3D3E0 | 14px | 500 | 1.68px | 11px 14px |

- **原因：**作为链接的组标题被 `.site-nav a` 的通用样式覆盖了。
- **要求：**
  - `a.sub-group-head` 的颜色、字号、字重、字距、内边距和 `span.sub-group-head` 完全一致，两个标题在同一水平线上。手机端缩进也要对齐。
  - 为了让人看出 Parts & Components 可以点，标题后面加一个小箭头（复用现有的 Arrow 组件，或者 "→"，尺寸跟随字号）。悬停时加下划线。
  - 选择器的优先级要压过 `.site-nav a`，例如 `.site-nav .sub-menu a.sub-group-head`，不要用 `!important`。

**P2：SI 总览页 Available Today 区块的按钮离卡片太近**
- 1440px 截图里，卡片底部到 "Request a Quote" 按钮只有约 18px。
- 改为 32px 到 40px，和站内其他区块里"卡片组 + 按钮"的间距保持一致。

## 3. 验收
- [ ] 桌面 1280px 和手机 390px：两个组标题颜色、字号、字重、对齐完全一致；Parts & Components 带箭头，悬停有下划线，可以点击。
- [ ] Available Today 按钮上方间距 ≥ 32px。
- [ ] `npm run check:links` 通过。
- [ ] 汇报附上修改后 1280px 下拉菜单、390px 菜单和 Available Today 区块的截图。
