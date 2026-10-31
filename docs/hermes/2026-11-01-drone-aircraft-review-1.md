# 无人机整机询价验收（第 1 轮）（给 Hermes）

日期：2026-11-01 · 审核：Claude · 对应提交：cd678ba、3804eae · 状态：**基本通过，另有 2 处 P1 和 2 处 P2 需要修**

## 1. 已核对通过（线上实测）
- **路由：**新路由和相关旧路由共 18 个，全部返回 200。破折号 0 个，禁用短语 0 个。我另外查了 "working relationship"、"drone programme"、"verified report"、"in stock"，都没有出现。
- **主入口：**结构和设计一致；Future Direction 区块没有按钮；bounds 为新的四条。
- **代码：**范围说明做成单一常量、整机字段单独建表、服务端校验、`DNY-A-` 编号前缀，这些做法都很好。
- **KST：**同意你的处理。保留清单，加上非关联声明，主入口不点品牌名。**不转 draft**：draft 在公开的 GitHub 仓库里同样可见，转 draft 并不能真正隐藏。
- **隐私政策：**只写 "a manufacturer or exporter"，同意。

## 2. 需要修改

**P1-1：条件字段一直显示（表单 bug）**
- **现状：**
  - Organisation（`company`）和 Tank or hopper capacity（`tank_capacity`）所在的 `.form-group` 已经带了 `hidden` 属性，但 `.form-group { display: flex }` 覆盖了 `hidden`，两个字段始终可见。
  - 结果是：选 Individual 也会看到带 \* 的 Organisation；选 Construction 也会看到容量字段。你的桌面截图里也是这样。
- **修改：**
  - 全局加 `[hidden] { display: none !important; }`，或者针对 `.form-group[hidden]` 处理。
  - 检查零部件表单和 OPC 申请表有没有同样的问题。
  - 隐藏时，字段同时设为 `disabled`，或者确保不提交。
- **验收：**
  - Buying as 为空或选 Individual 时，看不到 Organisation；选 Business 后出现，并且是必填。
  - 只有选 Agriculture 才出现容量字段。
  - 桌面和手机都要测。

**P1-2：FZ 页副标题把产品和无人机用途绑在一起**
- **现状：**`/components/products/kst-fz-series-servos` 的副标题是 "Servos KST lists for unmanned systems."。FZ 是内部重点复核的系列，公开页面不应主动强调无人机用途。
- **修改：**改为 "KST's FZ series servos, listed by model."，`catalogue.json` 和 `llms.txt` 里对应的描述同步修改。
- 另外，把其他 KST 系列描述里直接写 "unmanned" 或 "UAV" 的地方一并换成中性说法（例如 "for aircraft control surfaces" 可以保留）。

**P2-1：询价表单行距为 0**
- **现状：**上一行输入框底边到下一行标签顶部的实测距离为 0px（`.form-row` 之间没有间距），标签几乎贴在上一行的输入框上。
- **修改：**`.form-row` 之间加 16–18px 间距，和零部件询价页的视觉保持一致。

**P2-2：编号日期改用悉尼时间**
- 同意你的建议，编号里的日期改为按 Australia/Sydney 生成。
- 已经生成的编号不改。

## 3. 测试数据
- 生产站的测试单 DNY-A-261031-D6SY5F 留在 D1 里。请在汇报里说明能否在 `/admin` 里标记为测试或删除；由 Max 操作。
- 以后在生产站做测试，Name 一律用 "TEST"，Organisation 用 "DNY Test Organisation"，方便识别。

## 4. 验收
- [ ] P1-1：Organisation 和容量字段的显示、隐藏都正确，隐藏时不提交。零部件表单和 OPC 申请表已经检查。
- [ ] P1-2：FZ 页副标题已改；全站 KST 描述里没有 "unmanned" 或 "UAV"。
- [ ] P2-1：表单行距 ≥ 16px，桌面和手机都附截图。
- [ ] P2-2：新生成的编号使用悉尼日期。
- [ ] `npm run check:links` 通过。
