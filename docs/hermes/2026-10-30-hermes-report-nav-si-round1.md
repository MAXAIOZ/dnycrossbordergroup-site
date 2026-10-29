# 导航调整 · 第 1 轮修改回报（P1 组标题样式、P2 按钮间距）

日期：2026-10-30 · 执行：Hermes · 对应验收文档：`2026-10-30-nav-si-review-1.md`
提交：**7fa06b9** ｜ 构建 71 页 ｜ `check:links` 72 页 0 问题

截图（随本文件进仓库，`docs/hermes/2026-10-30-nav-si/`）：
`nav-1280-after.jpg`（1280 下拉）、`nav-390-after.jpg`（390 菜单）、`parts-section-after.jpg`（Available Today 区块）

## P1：两个组标题样式不一致

**原因**：组标题在 `Parts & Components` 这一组是 `<a>`，被 `.site-nav a`（优先级 0,1,1）压过了 `.sub-group-head`（0,1,0）。

**改法**：没有用 `!important`，而是把链接版写成 `.site-nav .sub-menu a.sub-group-head`（0,3,2），属性与 `span.sub-group-head` 逐项对齐；模板在链接标题后加 `<span class="sgh-arrow">→</span>`；悬停规则 `.site-nav .sub-menu a.sub-group-head:hover` 加下划线并转为 `--gold`。

线上实测计算样式（1280px 与 390px 结果一致）：

| 组标题 | 元素 | 颜色 | 字号 | 字重 | 字距 | 内边距 | 位置 |
|---|---|---|---|---|---|---|---|
| Physical SI | `<span>` | rgb(253,189,93) | 11px | 700 | 1.32px | 8px 12px 4px | 1280 顶部 77px；390 左边 54px |
| Parts & Components | `<a>` | rgb(253,189,93) | 11px | 700 | 1.32px | 8px 12px 4px | 1280 顶部 77px；390 左边 54px |

桌面两个标题同一基线（都是 top 77px），手机两端缩进相同（left 54px），箭头随字号 11px。链接仍可点击并带键盘焦点样式。

## P2：Available Today 按钮间距

卡片底部到按钮：**36px**（要求 32–40px）。做法是把按钮外层容器的 `margin-top` 从 52px 调到 60px（页面里卡片网格自带 24px 负向偏移，实际视觉间距 = 设定值 − 24px），按钮保持居中。改动只在本页内联样式，没碰全局 CSS。

## 验收对照

| 项 | 结果 |
|---|---|
| 1280 / 390 两个组标题颜色、字号、字重、对齐一致 | ✅ 逐项实测同上表 |
| Parts & Components 带箭头、悬停有下划线、可点击 | ✅ 箭头已上；悬停规则在线上 CSS 中为 `color: var(--gold); text-decoration: underline` |
| 按钮上方间距 ≥ 32px | ✅ 36px |
| `npm run check:links` 通过 | ✅ 72 页 0 问题（含破折号检查） |
| 截图 | ✅ 三张，见文首 |
