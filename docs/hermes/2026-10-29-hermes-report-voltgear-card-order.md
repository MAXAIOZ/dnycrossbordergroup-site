# /ventures/ev-accessories 产品卡重排 · 实施回报（第四轮）

日期：2026-10-29 · 执行：Hermes · 依据：`docs/hermes/2026-10-29-task-voltgear-card-order.md`
提交：**2135bc6** · 线上：https://dnycrossbordergroup.com/ventures/ev-accessories（HTTP 200）

## 1. 改动范围

| 文件 | 改动 |
|---|---|
| `src/legacy/ev-accessories.html` | Launch Range 的 11 个卡片整块重排，按新位置重写 `reveal-delay-*`；卡内 `<img>`、`<h3>`、`<p>` 逐字未动 |
| `src/data/faqs.ts` | `What is in the launch range?` 的答案按同序替换（照抄文档第 4 节） |

未改动：产品区说明句、Launch Range 以外任何区块、卡片文字与图片、卡片数量。`git diff --stat` 只有这两个文件，24 行改动（13 增 13 删）。

## 2. 线上验证（部署后实测）

页面拉取后按 DOM 顺序解析，11 张卡全部就位：

| 位置 | class | 卡片 | 图片 |
|---|---|---|---|
| 1 | card reveal | Floor Mat + Boot Liner Set | product-set.jpg |
| 2 | card reveal reveal-delay-1 | 3D All-Weather Floor Mats | product-floor-mats.jpg |
| 3 | card reveal reveal-delay-2 | Boot Cargo Liner | product-boot-liner.jpg |
| 4 | card reveal | Glass Roof Sunshade | product-glass-roof.jpg |
| 5 | card reveal reveal-delay-1 | Magnetic Side-Window Sunshades | product-sunshade.jpg |
| 6 | card reveal reveal-delay-2 | Pet Rear-Seat Hammock | product-pet-hammock.jpg |
| 7 | card reveal | Seat-Back Kick Protectors | product-kick.jpg |
| 8 | card reveal reveal-delay-1 | Centre Console Organiser | product-console.jpg |
| 9 | card reveal reveal-delay-2 | Frunk Liner | boot-underfloor-tray-800.jpg |
| 10 | card reveal | Ute Tub Mat for BYD Shark 6 | product-ute-tub.jpg |
| 11 | card reveal reveal-delay-1 | Personalised Stitched Mats | product-stitched.jpg |

- **每行内容**（1440px，三列网格实测）：第 1 行 Set / Floor Mats / Boot Cargo Liner；第 2 行 Glass Roof / Side-Window / Pet Hammock；第 3 行 Kick Protectors / Console Organiser / Frunk Liner；第 4 行 Ute Tub Mat / Stitched Mats。正好对应文档第 2 节说的四个主题。
- **图与标题一一对应**：11 张卡的 `img src` 与 `<h3>` 配对全部核对，无错位；Frunk Liner 仍用合作方 `boot-underfloor-tray-800.jpg`。
- **延迟分配**：位置 1/4/7/10 为 `card reveal`，2/5/8/11 为 `reveal-delay-1`，3/6/9 为 `reveal-delay-2`，与文档第 3 节一致。
- **FAQ**：线上答案依次为 floor mat and boot liner set → 3D TPE floor mats → boot cargo liners → glass roof sunshades → side-window sunshades → pet rear-seat hammock → kick protectors → console organisers → frunk liners → ute tub mat for the BYD Shark 6 → personalised stitched mats，与卡片顺序一致。
- `dist/ventures/ev-accessories.md` 的 `###` 小节顺序与线上一致（第 89–149 行依次排列 11 个标题）。
- `npm run build` 71 页通过；`npm run check:links` 72 页 0 问题。
- 页面横向溢出 0（1440×1000）。

## 3. 偏离

无。卡片内容、class 之外的属性、图片与说明文字均未改动；没有新增或删除卡片。
