# 任务：给 /ventures/ev-accessories 加图片（第二轮）

日期：2026-10-29 · 下达：Claude（Max 要求）· 执行：Hermes · 状态：待实施
前置：`2026-10-29-task-voltgear-page-update.md`（已上线，commit 914fd37）

---

## 1. 目的

页面现在全是文字卡片，看起来空。这一轮加两组图：

- **A. 使用场景图（2 张，Pexels 免费图）**：放在 "What sets it apart" 下面，讲澳洲的红土、高温，以及后座的宠物。
- **B. 制造合作方作品（4 张，来自合作方公司简介）**：新增一个 "Manufacturing Partner" 区块，展示合作方的开发能力。

**产品卡片（Launch Range）这一轮不加图。** 我们还没有自己的样品照片，不能拿别人的产品冒充 VoltGear 的产品。

## 2. 图片来源和授权（Max 已确认）

| 组 | 来源 | 授权 |
|---|---|---|
| A | Pexels | Pexels License：可免费商用，不要求署名；不得暗示图中人物或品牌为我们背书 |
| B | 制造合作方的公司简介（2026-09） | 合作方已同意 DNY 在网站上使用 |

**筛选规则（已经做完，你不用重做）：** 产品上带任何商标的图一律不用。公司简介里大部分图带理想汽车（Li）或问界（AITO）的标志，有些拍到第三方品牌的包装，还有些带水印，这些都已排除。**不要自己从简介里另外补图。**

## 3. 文件

### 3.1 B 组：已放进仓库，直接用

目录：`public/assets/img/ventures/ev-accessories/`

| 文件 | 尺寸 | 用途 |
|---|---|---|
| `partner-design-process.jpg` / `-800.jpg` | 1600×916 / 800×458 | 设计过程拼贴 |
| `boot-underfloor-tray.jpg` / `-800.jpg` | 1600×901 / 800×451 | 后备箱下沉储物盒（产品渲染） |
| `boot-underfloor-tray-installed.jpg` | 607×809 | 储物盒装车效果 |
| `boot-underfloor-tray-fitting.jpg` | 652×869 | 储物盒安装示意 |
| `boot-side-storage-panel.jpg` / `-800.jpg` | 996×1231 / 800×989 | 后备箱侧边皮质收纳板 |

`-installed` 和 `-fitting` 原图不到 800 宽，所以 `-800` 版本和原图是同一张。这一轮只用到下面第 4 节引用的文件，其余留着备用。

### 3.2 A 组：在 VPS 上下载

```bash
cd public/assets/img/ventures/ev-accessories
curl -fL -o conditions-outback.jpg     "https://images.pexels.com/photos/32915493/pexels-photo-32915493.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -fL -o conditions-outback-800.jpg "https://images.pexels.com/photos/32915493/pexels-photo-32915493.jpeg?auto=compress&cs=tinysrgb&w=800"
curl -fL -o conditions-dog.jpg         "https://images.pexels.com/photos/1471984/pexels-photo-1471984.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -fL -o conditions-dog-800.jpg     "https://images.pexels.com/photos/1471984/pexels-photo-1471984.jpeg?auto=compress&cs=tinysrgb&w=800"
python3 -c "from PIL import Image;import glob;[print(f,Image.open(f).size) for f in sorted(glob.glob('conditions-*.jpg'))]"
```

- 下载后用实际尺寸填第 4 节 `<img>` 的 `width` 和 `height`。
- 有任何一张下载失败，就把对应的 `<figure>` 整个去掉再上线，并在回报里说明。**不要换成别的图。**
- 两张图的内容：
  - `conditions-outback`：澳洲内陆红土路，远处有一辆越野车，看不到车标（摄影 Mark Direen）
  - `conditions-dog`：车里一只杰克罗素犬，探头靠在前座椅背上（摄影 freestocks.org）

### 3.3 新建 `public/assets/img/ventures/ev-accessories/CREDITS.md`

仓库是开源的。这个文件说明图片不随仓库的开源许可证一起授权：

```markdown
# Image credits — /ventures/ev-accessories

These images are not covered by the repository's open-source licence.

- conditions-outback*.jpg — Photo by Mark Direen, Pexels (https://www.pexels.com/photo/32915493/). Pexels License.
- conditions-dog*.jpg — Photo by freestocks.org, Pexels (https://www.pexels.com/photo/1471984/). Pexels License.
- partner-*.jpg, boot-*.jpg — Supplied by DNY's manufacturing partner and used with permission. All rights reserved by the owner. Do not reuse.
```

## 4. 改 `src/legacy/ev-accessories.html`

### 4.1 A 组：插在 "What sets it apart" 那个 `grid-2` 结束的 `</div>` 之后、"Why Now" 的 `section-head` 之前

```html
<div class="grid-2" style="margin-top:32px;">
<figure class="reveal" style="margin:0;">
<img src="/assets/img/ventures/ev-accessories/conditions-outback-800.jpg" srcset="/assets/img/ventures/ev-accessories/conditions-outback-800.jpg 800w, /assets/img/ventures/ev-accessories/conditions-outback.jpg 1600w" sizes="(max-width: 768px) 100vw, 50vw" alt="Red dirt track through the Australian outback" width="W" height="H" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;border-radius:12px;">
<figcaption class="src-note" style="margin-top:8px;">Red dust, sand and summer heat — the conditions the range is designed for.</figcaption>
</figure>
<figure class="reveal reveal-delay-1" style="margin:0;">
<img src="/assets/img/ventures/ev-accessories/conditions-dog-800.jpg" srcset="/assets/img/ventures/ev-accessories/conditions-dog-800.jpg 800w, /assets/img/ventures/ev-accessories/conditions-dog.jpg 1600w" sizes="(max-width: 768px) 100vw, 50vw" alt="Dog looking out from behind a car seat" width="W" height="H" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;border-radius:12px;">
<figcaption class="src-note" style="margin-top:8px;">Dogs and kids in the back seat — covered by kick protectors and the pet hammock.</figcaption>
</figure>
</div>
```

### 4.2 B 组：新区块，插在 "Planned Vehicle Coverage" 的两行 `src-note` 之后、"Product Roadmap" 的 `section-head` 之前

```html
<div class="section-head reveal" style="margin-top:56px; margin-bottom:28px;">
<span class="kicker">Manufacturing Partner</span>
<h3 style="font-size:24px;margin-top:4px;">Designed and produced with an experienced OEM/ODM partner</h3>
</div>
<p class="reveal" style="max-width:760px;">{{name}} products are developed with a manufacturing partner that already designs, tools, validates and delivers fitted interior accessories for vehicle-maker programmes — from user research and sketching through to vehicle-grade materials, fit testing and volume production.</p>
<div class="grid-3" style="margin-top:28px;">
<figure class="reveal" style="margin:0;">
<img src="/assets/img/ventures/ev-accessories/partner-design-process-800.jpg" alt="Product design sketches and research boards" width="800" height="458" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:12px;">
<figcaption class="src-note" style="margin-top:8px;">Research and design</figcaption>
</figure>
<figure class="reveal reveal-delay-1" style="margin:0;">
<img src="/assets/img/ventures/ev-accessories/boot-underfloor-tray-800.jpg" alt="Fitted under-floor boot storage tray" width="800" height="451" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:12px;background:#F2F2F0;">
<figcaption class="src-note" style="margin-top:8px;">Fitted moulded parts</figcaption>
</figure>
<figure class="reveal reveal-delay-2" style="margin:0;">
<img src="/assets/img/ventures/ev-accessories/boot-underfloor-tray-installed.jpg" alt="Under-floor tray installed in a boot" width="607" height="809" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:12px;">
<figcaption class="src-note" style="margin-top:8px;">Fit-tested in the vehicle</figcaption>
</figure>
<figure class="reveal" style="margin:0;">
<img src="/assets/img/ventures/ev-accessories/boot-side-storage-panel-800.jpg" alt="Stitched leather boot side storage panel" width="800" height="989" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:12px;">
<figcaption class="src-note" style="margin-top:8px;">Stitched and trimmed parts</figcaption>
</figure>
</div>
<p class="src-note reveal" style="margin-top:12px;">Examples of the partner’s accessory development work, shown for illustration. They are not {{name}} products and are not made for the vehicles listed above.</p>
```

第 4 张卡片会单独排到第二行，这是有意的，不用补第 5 张凑满。

## 5. 不许做的事
- 不在 Launch Range 产品卡里加图
- 不写合作方名称，不提它服务过哪些车企
- 不用公司简介里本文件没列出的图，不自己另外找网图
- 不改全局 CSS（这一轮只用内联样式）

## 6. 检查
```bash
npm run build && npm run check:links
```
另外人工核对：
- 线上页面 6 张图都返回 200（`curl -sI` 逐张检查）
- 375px 宽度下图片不溢出，`figcaption` 正常显示
- `dist/ventures/ev-accessories.md` 里没有出现 "Li Auto"、"AITO" 等车企名（应该本来就没有；不要单独搜 "Li"，会误中 "Liner"）
- 单个 H1 不变；新增的 h3 只有 "Designed and produced with an experienced OEM/ODM partner"

## 7. 回报
写到 `docs/hermes/2026-10-29-hermes-report-voltgear-images.md`：commit hash、两张 Pexels 图的实际尺寸、线上验证结果、有没有偏离本文件及原因。
