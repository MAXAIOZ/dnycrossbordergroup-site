# /ventures/ev-accessories 加图 · 实施回报（第二、三轮合并）

日期：2026-10-29 · 执行：Hermes
依据：`2026-10-29-task-voltgear-images.md`（第二轮）、`2026-10-29-task-voltgear-product-photos.md`（第三轮）、`2026-10-29-task-voltgear-illustrations.md`（已取消）
提交：**747bb6f**（一次提交，29 个文件）· 线上：https://dnycrossbordergroup.com/ventures/ev-accessories（HTTP 200）

## 1. 做了什么

| 项 | 结果 |
|---|---|
| 场景图 2 张 | 放在 "What sets it apart" 下方，`grid-2` + `figure/figcaption`，按第三轮改为 `conditions-ute-dog` |
| Manufacturing Partner 区块 | 新增，位于车型表说明之后、Product Roadmap 之前；4 张图，第 4 张单独第二行（按文档保留） |
| Launch Range 11 张产品卡 | 每卡 `<h3>` 前插入 4:3 图片；Frunk Liner 用合作方 `boot-underfloor-tray-800.jpg`（800×451，按文档） |
| 产品区说明 | 已加："Photos show the product category and how it is used; they are not DNY VoltGear products. Product photography will follow first production samples."（`{{name}}` 运行时替换为 DNY VoltGear） |
| CREDITS.md | 用第三轮文档的完整版整个替换（Pexels 11 条 + Unsplash 1 条 + 合作方 1 条） |
| illustrations/ | 已从工作副本删除，未提交；仓库中不存在该目录 |

卡片 class、顺序、文字均未改动；没有改全局 CSS，只用文档给的内联样式；图片未做任何内容修改或加水印。

## 2. 每张图的实际尺寸

在 VPS3 上用文档给的命令下载，再用纯 stdlib 解析 JPEG SOF 得到尺寸：

| 文件 | 实际尺寸 | 用途 |
|---|---|---|
| conditions-outback.jpg / -800.jpg | 1600×1067 / 800×533 | 场景图 1（`srcset` 两档） |
| conditions-ute-dog.jpg / -800.jpg | 1600×2400 / 800×1200 | 场景图 2（原图为竖构图） |
| product-set.jpg | 800×600 | Floor Mat + Boot Liner Set |
| product-floor-mats.jpg | 800×600 | 3D All-Weather Floor Mats |
| product-glass-roof.jpg | 800×600 | Glass Roof Sunshade |
| product-sunshade.jpg | 800×600 | Magnetic Side-Window Sunshades（Unsplash） |
| product-ute-tub.jpg | 800×600 | Ute Tub Mat for BYD Shark 6 |
| product-boot-liner.jpg | 800×600 | Boot Cargo Liner |
| product-console.jpg | 800×600 | Centre Console Organiser |
| product-kick.jpg | 800×600 | Seat-Back Kick Protectors |
| product-pet-hammock.jpg | 800×600 | Pet Rear-Seat Hammock |
| product-stitched.jpg | 800×600 | Personalised Stitched Mats |
| boot-underfloor-tray-800.jpg（已入库） | 800×451 | Frunk Liner + 合作方「Fitted moulded parts」 |

14 张下载全部 HTTP 200，10 张 `product-*.jpg` 均为 800×600，无一失败，因此没有去掉任何 `<img>`。

## 3. 线上验证

| 检查 | 结果 |
|---|---|
| 18 个图片 URL（10 产品图 + 托盘图 + 4 张场景图两档 + 3 张合作方图） | 全部 **200** |
| 产品卡图片数量 | 11 张，`naturalWidth>0`，无破图 |
| 图片宽高比（1440×900 与 375×812） | 两者均为 **1.333（4:3）**，无拉伸——用计算后的 `getBoundingClientRect` 比值验证 |
| 页面横向溢出 | 1440：0；375：**0** |
| 页面 `#project` 内 `<img>` 总数 | 17（11 产品 + 2 场景 + 4 合作方） |
| 产品区说明句 | 线上存在 1 处 |
| H1 数量 | 1（未变）；新增 h3 仅 "Designed and produced with an experienced OEM/ODM partner" |
| md 副本中车企名（Li Auto / AITO） | 0 |
| `illustrations/` | 不存在 |
| `npm run build` / `npm run check:links` | 71 页构建通过 / 72 页 0 问题 |

视觉复核：桌面下场景图为 3:2 并排、产品卡图片统一 4:3、合作方 3+1 排版；375px 下场景图与产品卡单列堆叠，说明文字正常显示。

## 4. 偏离文档的地方

1. **`conditions-ute-dog` 的 `width`/`height` 写的是 1600×1067，不是源图的 1600×2400。** 源图是竖构图，而文档要求 3:2 横裁（`aspect-ratio:3/2; object-fit:cover`）。如果按源尺寸写，浏览器会先按 2:3 预留高度再被 CSS 改成 3:2，产生一次明显跳动（CLS）。写显示比例（1600×1067）让占位与最终显示一致，裁切行为仍由文档给的样式决定。裁切后主体（狗、货斗、尾门）完整落在画面内，已目视确认。
2. **`conditions-ute-dog.jpg` 的 alt 用的是第三轮文档给的 `Dog resting in a ute tub on a country drive`**，与第二轮文档里给 `conditions-dog` 的 alt 不同——按"冲突以第三轮为准"处理。
3. **图片在 VPS3 下载后 `scp` 回 Mac 仓库再提交**（文档写"在 VPS 上下载"，仓库与构建主源在 Mac）。下载命令与参数完全照抄文档，未改用其他图源。
4. 第一轮遗留的 `conditions-dog*.jpg` 本次没有下载也没有残留，Kick Protectors 用的是新下载的 `product-kick.jpg`。
5. 现场截图时页面有 `reveal` 进场动画（IntersectionObserver 触发），程序化滚动不会触发，我在浏览器里临时给元素加了 `in` 类再截图。这只发生在截图环境，仓库代码未改。

## 5. 需要你确认的一点

场景图第 2 张「ute-dog」原图含一辆皮卡的车尾（尾灯、尾门）。我逐像素看过：**没有车标、没有车型文字、没有可读的品牌标识**，尾门区域是干净的。若你仍不希望出现具体车辆，只能换图——但按文档规则我不会自行替换。
