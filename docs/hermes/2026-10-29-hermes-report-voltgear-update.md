# /ventures/ev-accessories 升级 · 实施回报

日期：2026-10-29 · 执行：Hermes · 依据：`docs/hermes/2026-10-29-task-voltgear-page-update.md`
提交：**914fd37**（代码 + 两份文档）· 线上：https://dnycrossbordergroup.com/ventures/ev-accessories（HTTP 200）

## 1. 做了什么

| 文件 | 结果 |
|---|---|
| `src/legacy/ev-accessories.html` | 整段替换为任务书第 4 节 HTML，`{{name}}` 占位符保留，class 全部沿用，无新增 class |
| `src/data/faqs.ts` | 第 2 条（适配车型）、第 3 条（首发范围）按第 5 节改写；第 4 条按可选项补了 dealer delivery packs / novated lease 措辞，第 1、5 条未动 |
| `src/data/ventures.ts` | 仅 `capabilities` 改为 `['New-model fitment', 'Heat-stable materials', 'B2C retail + B2B trade', 'Australian Consumer Law support']`，其他字段未动 |

构建：`npm run build` 71 页通过；`npm run check:links` 72 页 0 问题。

## 2. 硬规则自查

| 规则 | 结果 |
|---|---|
| 页面无价格 | 线上 HTML 正则扫 `A$`、`$数字` 均 0 命中 |
| 不点名竞品 | Tesery / 3D MAXpider / Ironman 均 0 命中 |
| 不写 Model Y L | 0 命中 |
| 车名只用于说明适配 | 产品卡为 "Ute Tub Mat for BYD Shark 6" |
| 计划不写成已做到 | "New models first — fitment is planned"、"Planned Australian stock"、"Retail store — coming soon"，状态仍 In Development |
| OEM/ODM 无 logos | 线上为 "new vehicles, materials and colours" |
| 全站英文 | `dist/ventures/ev-accessories.md` 中文 0 行 |

车型表：`<tr>` 共 21 个（表头 1 + 车型 20）；分层为 Launch 6 / Extended 10 / On request 4，与任务书一致。

## 3. 第 4.1 节：首批交付年份核实

| 车型 | 表里写的 | 核实结果 | 依据 |
|---|---|---|---|
| Geely EX5 | 2025+ | **正确，未改**。品牌 2025-03-11 在悉尼发布，首台客户车 2025 年 3 月中交付 | geely.com 官方新闻（2025-03-10）；CarExpert Geely 品牌指南"first customer delivery took place in mid-March" |
| Jaecoo J5 EV | 2026+ | **已改为 2025+**。澳洲 2025-12-23 上市 | Wikipedia `Jaecoo J5`（Australia 段）；The Driven 2026-05-03 回顾文"December 2025 … launched its second electric vehicle" |
| Geely EX2 | 2026+ | **正确，未改**。2026-07-14 澳洲上市 | Wikipedia `Geely EX2`；WhichCar 2026-07-14；paultan 2026-07-14 |
| BYD Atto 2 | 2025+ | **正确，未改**。2025-11-13 开售 | Wikipedia `BYD Atto 2`（Oceania 段）；CarsGuide "first arrived in Australia in 2025" |
| BYD Sealion 8 | 2026+ | **正确，未改**。2026-01 开售，2 月中进店 | RACV 2026-01-21"now on sale"；ellaslist 称 2026-02-14 进入市场 |
| Kia EV3 | 2025+ | **正确，未改**。2025-03-12 公布价格，4 月初本地媒体实测 | The Driven 2025-03-12；NRMA 2025-04-02"Kia Australia has officially launched" |
| BYD Shark 6 | 2025+ | **正确，未改**。2025-01 开始交付（订单 2024 年底开放，首批车主 2025 年 1 月提车） | carnewschina 2025-01-13；The Driven 2025-01-16 布里斯班首台交付 |
| （附带）Zeekr 7X | 2025+ | 正确。2025-08-07 澳洲上市 | zeekrlife.com 官方"launched in Australia on 7th August 2025" |

结论：只有 Jaecoo J5 EV 一处与任务书不符，已按证据改为 2025+，其余六款维持原值。

## 4. 线上验证

- `curl` 线上页 HTTP 200，"Planned Vehicle Coverage" 存在，`<tr>` 计数 21。
- 桌面 1440×900：四列表格正常，Stage 列金色标签、Make/Model/Years 对齐。
- 手机 375×812：页面横向溢出 0，车型表以卡片形式逐条堆叠（Stage 金色 / Make / Model / Years 四行），可读。

## 5. 偏离任务书的地方（2 处，1 处待你决定）

1. **Jaecoo J5 EV 由 2026+ 改为 2025+**，依据见第 3 节。属任务书第 4.1 节授权范围。
2. **手机端车型表没有横向滚动，而是堆叠成卡片。** 任务书第 7 节预期"沿用 `overflow-x:auto` 可横向滚动"，实测外层的 `overflow-x:auto` 仍在，但现有站点 CSS 在窄屏把 `.htable` 的行改成 `display:block` 堆叠，内容宽度正好等于容器宽度（327px），因此不产生滚动。这是既有样式的行为，第 4 节要求"class 全部沿用现有样式，无新增 class"，所以我没有为了制造滚动条去加 `min-width`。若你要的是四列并排在手机上横滑，需要给表格加一个最小宽度（一行内联样式即可），说一声我就改。
3. 附带说明：生成的 `dist/ventures/ev-accessories.md` 里表格单元格被拆成独立段落（转换器的既有行为，旧页面同样如此），所以核对车型 20 行时是用 Launch 6 / Extended 10 / On request 4 计数确认的，不是按表格行数。

## 6. 环境问题（与本次内容无关，已修复）

本机 `npm run build` 起初报 `Cannot find native binding … @rolldown/binding-wasm32-wasi`（npm 可选依赖的老问题），重跑 `npm install` 后构建恢复正常；`package-lock.json` 无改动，仓库干净。VPS3 与 Cloudflare Pages 的构建未受影响。

## 7. 未做（按任务书第 9 节）

未开零售店、未加价格与产品图、未改 `ai-text.ts`、OG 图与导航。核价与选品建议仍只在研究文档里，供 Max 决策。
