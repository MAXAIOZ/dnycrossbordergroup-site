# 无人机整机询价：第 1 轮验收修改

日期：2026-11-01 · 实施：Hermes · 依据：`docs/hermes/2026-11-01-drone-aircraft-review-1.md`
状态：**4 项全部修完并上线**

代码提交 `f25ad05`（已部署），本报告与截图为文档提交。

## P1-1 条件字段一直显示

原因：`styles.css` 里 `.form-group { display: flex }` 的优先级高于浏览器对 `[hidden]` 的默认样式，属性在 markup 里但视觉上没生效。

修法：

1. `styles.css` 增加全局规则 `[hidden] { display: none !important }`，让 `hidden` 属性在任何组件里都有效。
2. 询价页的 `sync()` 同时控制 `disabled`：Organisation 只在 Business 时出现并必填，Tank 只在 Agriculture 时出现，隐藏时 `disabled = true`，不会被提交。
3. 全站排查同类写法：
   - 零部件询价页（`/components/enquiry`）：没有条件字段，隐藏元素用的是自己已有的 `[hidden]` 规则，未受影响（实测 `[data-empty-note]` 正常显示，提交按钮存在）。
   - OPC 申请表（`/opc-fde/join`）：`#partner-track-wrap` 有同样的问题。全局规则修好后它默认隐藏；另外补了逻辑，非 Premier 时勾选框 `disabled` 并清空，切换档位不会把隐藏的勾选带进提交。

线上实测：

| 状态 | Organisation | Tank | company disabled | tank disabled |
|---|---|---|---|---|
| 初始（Buying as 未选，Application 未选） | display: none | display: none | true | true |
| 选 Business | display: flex，required = true | none | false | true |
| 选 Agriculture | none | display: flex | true | false |
| 提交 Individual + Construction | 未出现 | 未出现 | 邮件里 Buying as: Individual，Tank: - |

手机 390px 同样验证，横向溢出 0。

## P1-2 FZ 副标题与 KST 措辞

- 产品描述从 "Servos KST lists for unmanned systems." 改为 "KST's FZ series servos, listed by model."，产品页副标题、`catalogue.json` 同步（`llms-full.txt` 原本只列型号，不含这句描述，无需改动）。
- 全站扫 `unmanned` 和 `UAV`：源码、`dist` 的 HTML / md / txt / json 均为 0 处。其余系列描述保持中性写法。

## P2-1 表单行距

`group.css` 增加 `#aircraft-enquiry .enq-block > * + * { margin-top: 17px }`，手机 16px，只作用于整机询价页，不影响其它表单。线上实测相邻两行 `.form-row` 间距 16px（渲染取整），标签不再贴在上一行输入框底边。

## P2-2 编号改用悉尼日期

两个端点（零部件和整机）的 `makeRef()` 改用 `Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney' })` 取年月日。

验证：修改前生成的测试单是 `DNY-A-261031-D6SY5F`（UTC 日期，当时悉尼已是 11 月 1 日）；修改后同一小时内生成的是 `DNY-A-261101-4MFN87`，与悉尼日期一致。老编号不改。

## 测试数据：能否在 /admin 标记或删除

现状：**不能删除，也没有"测试"标记**。`/admin/enquiries` 现有能力是状态（New / Reviewing / Awaiting Information / Quoted / Closed）、负责人、内部备注、重发通知；没有删除接口，也没有 test 字段。

目前 D1 里有两张测试单：

| 编号 | 内容 | 建议处理 |
|---|---|---|
| `DNY-A-261031-D6SY5F` | 第 1 轮验收提交，Name 是 "Hermes Aircraft Test" | 状态改 Closed，内部备注写 TEST |
| `DNY-A-261101-4MFN87` | 本轮验证（隐藏字段 + 悉尼日期），Name 是 "TEST" | 同上 |

如果希望后台能真正区分，我可以在下一轮加两件事之一：(a) 状态里加一个 `Test`，列表按它过滤；(b) 加删除接口（软删除，保留审计行）。删除是写操作，需要 Max 明确授权我再动。

以后在生产站测试一律用 Name "TEST"、Organisation "DNY Test Organisation"，本轮已按此执行。

## 验收对照（第 4 节）

| 项 | 结果 |
|---|---|
| P1-1 显示与隐藏正确，隐藏时不提交 | 通过，桌面与手机均实测；零部件页无此问题，OPC 申请表已修 |
| P1-2 FZ 副标题已改，全站无 unmanned / UAV | 通过 |
| P2-1 行距 ≥ 16px | 通过，实测 16px |
| P2-2 新编号用悉尼日期 | 通过，DNY-A-261101-4MFN87 |
| `npm run check:links` | 通过：76 pages checked, 0 problem(s) |

## 截图

`docs/hermes/2026-11-01-drones/screenshots/`

- `fix-enquiry-default-desktop.jpg` 桌面默认态：Organisation 与 Tank 都不出现，行距正常
- `fix-enquiry-default-mobile.jpg` 手机 390px 默认态
- `fix-enquiry-conditional-desktop.jpg` 选 Business + Agriculture 后两个字段出现
- `fix-fz-subtitle-desktop.jpg` FZ 页新副标题
- 第 1 轮的 `enquiry-desktop.jpg`、`enquiry-mobile.jpg` 等保留作对照
