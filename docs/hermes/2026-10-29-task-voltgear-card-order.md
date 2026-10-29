# 任务：调整 Launch Range 产品卡顺序（第四轮）

日期：2026-10-29 · 下达：Claude（Max 批准）· 执行：Hermes · 状态：待实施
前置：第三轮已上线（747bb6f）

---

## 1. 目的

Launch Range 是三列网格。现在卡片是按需求优先级排成一列的，导致两个问题：后备箱垫离主推套装太远，Shark 6 货斗垫这种只适合一款车的产品夹在中间。改成每一行讲一件事。

## 2. 新顺序

只改 `src/legacy/ev-accessories.html` 里 Launch Range `grid-3` 中 11 个 `<div class="card ...">` 的**先后顺序**：

| 位置 | 卡片（按 `<h3>` 文字找） |
|---|---|
| 1 | Floor Mat + Boot Liner Set |
| 2 | 3D All-Weather Floor Mats |
| 3 | Boot Cargo Liner |
| 4 | Glass Roof Sunshade |
| 5 | Magnetic Side-Window Sunshades |
| 6 | Pet Rear-Seat Hammock |
| 7 | Seat-Back Kick Protectors |
| 8 | Centre Console Organiser |
| 9 | Frunk Liner |
| 10 | Ute Tub Mat for BYD Shark 6 |
| 11 | Personalised Stitched Mats |

每行的主题：地面和货物防护 / 防晒隔热和宠物 / 车内收纳和保护 / 专车款和定制款。

## 3. 动画延迟 class 按新位置重排

每张卡整块移动，卡里的 `<img>`、`<h3>`、`<p>` 一律不动。只有 `reveal-delay-*` 要按新位置重新分配，保证每行从左到右依次出现：

| 位置 | class |
|---|---|
| 1、4、7、10 | `card reveal` |
| 2、5、8、11 | `card reveal reveal-delay-1` |
| 3、6、9 | `card reveal reveal-delay-2` |

## 4. FAQ 同步

`src/data/faqs.ts` 里 `What is in the launch range?` 的答案改成同样的顺序：

```
'A floor mat and boot liner set, 3D all-weather TPE floor mats, boot cargo liners, glass roof sunshades, magnetic side-window sunshades, a pet rear-seat hammock, seat-back kick protectors, centre console organisers, frunk liners for models with a usable front trunk, a ute tub mat for the BYD Shark 6 and personalised stitched mats. All launch products are non-electrical.'
```

## 5. 不许做的事
- 不改任何卡片的文字和图片
- 不加卡片，也不删卡片
- 不改产品区下面那行说明，以及 Launch Range 以外的任何区块

## 6. 检查
```bash
npm run build && npm run check:links
```
- 线上第一行的三张卡依次是 Set、Floor Mats、Boot Cargo Liner；最后两张是 Ute Tub Mat、Stitched Mats
- 11 张卡的图和标题一一对应，没有错位
- `dist/ventures/ev-accessories.md` 里的卡片顺序和 FAQ 顺序一致

## 7. 回报
写到 `docs/hermes/2026-10-29-hermes-report-voltgear-card-order.md`：commit hash 和线上验证结果。
