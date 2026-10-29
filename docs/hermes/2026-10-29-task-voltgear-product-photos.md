# 任务：Launch Range 产品卡加实拍图（第三轮，替代插画方案）

日期：2026-10-29 · 下达：Claude（Max 要求）· 执行：Hermes · 状态：待实施
前置：`2026-10-29-task-voltgear-images.md`（第二轮）。插画任务已取消，见 `2026-10-29-task-voltgear-illustrations.md`。

---

## 1. 目的

Launch Range 的 11 张产品卡全部配上**真实照片**。来源：

- Pexels 和 Unsplash 的免费商用图（两家的授权都允许商用、不要求署名）
- 第二轮已入库的合作方图片（合作方已同意）

所有照片都由 Claude 逐张放大检查过：**看不到任何品牌标志、车标、文字商标或卡通角色**。

这些照片展示的是同类产品或使用场景，**不是 VoltGear 的成品**，所以产品区下面要加一行说明（见第 4.3 节）。

## 2. 对第二轮的一处修改

第二轮 "What sets it apart" 下面的场景图里，那张狗的图（`conditions-dog`，Pexels 1471984）**挪到 Kick Protectors 产品卡**。场景图第二张换成皮卡货斗里的狗（Pexels 11056016）：

- 文件名改为 `conditions-ute-dog.jpg` / `conditions-ute-dog-800.jpg`
- alt：`Dog resting in a ute tub on a country drive`
- figcaption：`Utes, dogs and weekend gear — covered by tub mats, liners and the pet hammock.`

如果第二轮还没上线，直接按这里改；如果已经上线，在这一轮一起改掉。

## 3. 下载（在 VPS 上执行）

```bash
cd public/assets/img/ventures/ev-accessories
P='auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
get(){ curl -fL -o "$1" "$2"; }
get product-set.jpg            "https://images.pexels.com/photos/8728409/pexels-photo-8728409.jpeg?$P"
get product-floor-mats.jpg     "https://images.pexels.com/photos/9258373/pexels-photo-9258373.jpeg?$P"
get product-glass-roof.jpg     "https://images.pexels.com/photos/14277589/pexels-photo-14277589.jpeg?$P"
get product-sunshade.jpg       "https://images.unsplash.com/photo-1689703421457-8d4f33502c64?w=800&h=600&fit=crop&q=80&fm=jpg"
get product-ute-tub.jpg        "https://images.pexels.com/photos/4895451/pexels-photo-4895451.jpeg?$P"
get product-boot-liner.jpg     "https://images.pexels.com/photos/9462680/pexels-photo-9462680.jpeg?$P"
get product-console.jpg        "https://images.pexels.com/photos/37655520/pexels-photo-37655520.jpeg?$P"
get product-kick.jpg           "https://images.pexels.com/photos/1471984/pexels-photo-1471984.jpeg?$P"
get product-pet-hammock.jpg    "https://images.pexels.com/photos/9593327/pexels-photo-9593327.jpeg?$P"
get product-stitched.jpg       "https://images.pexels.com/photos/4149333/pexels-photo-4149333.jpeg?$P"
get conditions-ute-dog.jpg     "https://images.pexels.com/photos/11056016/pexels-photo-11056016.jpeg?auto=compress&cs=tinysrgb&w=1600"
get conditions-ute-dog-800.jpg "https://images.pexels.com/photos/11056016/pexels-photo-11056016.jpeg?auto=compress&cs=tinysrgb&w=800"
python3 -c "from PIL import Image;import glob;[print(f,Image.open(f).size) for f in sorted(glob.glob('product-*.jpg')+glob.glob('conditions-*.jpg'))]"
```

- 所有 `product-*.jpg` 应该都是 800×600。尺寸不对就重新下载，**不要换成别的图**。
- 任何一张下载失败，就把对应卡片的 `<img>` 去掉，卡片保留文字，然后在回报里说明。
- Frunk Liner 卡片不用下载，直接用已入库的合作方图 `boot-underfloor-tray-800.jpg`（模压托盘的实物渲染图）。
- 第二轮的 `conditions-dog*.jpg` 如果已经下载，可以删掉，Kick 卡片用的是新下载的 `product-kick.jpg`。

## 4. 改 `src/legacy/ev-accessories.html`

### 4.1 每张产品卡

在每个 Launch Range 的 `<div class="card ...">` 里、`<h3>` **前面**插入一行：

```html
<img src="/assets/img/ventures/ev-accessories/FILE" alt="ALT" width="800" height="600" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:10px;margin:0 0 14px;">
```

| 卡片 | FILE | ALT |
|---|---|---|
| Floor Mat + Boot Liner Set | `product-set.jpg` | Gear loaded into an SUV boot |
| 3D All-Weather Floor Mats | `product-floor-mats.jpg` | Shoes resting on a rubber car floor mat |
| Glass Roof Sunshade | `product-glass-roof.jpg` | Car interior under a panoramic glass roof |
| Magnetic Side-Window Sunshades | `product-sunshade.jpg` | Reflective sunshade fitted inside a car window |
| Ute Tub Mat for BYD Shark 6 | `product-ute-tub.jpg` | Ribbed protective liner in a ute tub |
| Boot Cargo Liner | `product-boot-liner.jpg` | Shopping bag being placed in a car boot |
| Frunk Liner | `boot-underfloor-tray-800.jpg` | Fitted moulded storage tray |
| Centre Console Organiser | `product-console.jpg` | Centre console with cup holders |
| Seat-Back Kick Protectors | `product-kick.jpg` | Dog looking over the back of a front seat |
| Pet Rear-Seat Hammock | `product-pet-hammock.jpg` | Dog on a quilted rear-seat cover |
| Personalised Stitched Mats | `product-stitched.jpg` | Diamond-stitched leather upholstery |

Frunk Liner 那张原图是 800×451，`width`/`height` 写 `800` 和 `451`，`aspect-ratio:4/3` 和 `object-fit:cover` 会把它裁成统一比例。

### 4.2 卡片的 class、顺序和文字一律不动

### 4.3 产品区说明

在 Launch Range 的 `grid-3` 结束的 `</div>` 之后加一行：

```html
<p class="src-note reveal" style="margin-top:12px;">Photos show the product category and how it is used; they are not {{name}} products. Product photography will follow first production samples.</p>
```

## 5. CREDITS.md

把 `public/assets/img/ventures/ev-accessories/CREDITS.md` 整个替换为：

```markdown
# Image credits — /ventures/ev-accessories

These images are not covered by the repository's open-source licence.

Pexels (Pexels License — https://www.pexels.com/license/):
- conditions-outback*.jpg — Mark Direen — https://www.pexels.com/photo/32915493/
- conditions-ute-dog*.jpg — Guilherme Stecanella — https://www.pexels.com/photo/11056016/
- product-set.jpg — Katya Wolf — https://www.pexels.com/photo/8728409/
- product-floor-mats.jpg — Erik Mclean — https://www.pexels.com/photo/9258373/
- product-glass-roof.jpg — Garvin St. Villier — https://www.pexels.com/photo/14277589/
- product-ute-tub.jpg — Gustavo Fring — https://www.pexels.com/photo/4895451/
- product-boot-liner.jpg — Liliana Drew — https://www.pexels.com/photo/9462680/
- product-console.jpg — Raphhill .Jpg — https://www.pexels.com/photo/37655520/
- product-kick.jpg — freestocks.org — https://www.pexels.com/photo/1471984/
- product-pet-hammock.jpg — Rickie-Tom Schünemann — https://www.pexels.com/photo/9593327/
- product-stitched.jpg — Jae Park — https://www.pexels.com/photo/4149333/

Unsplash (Unsplash License — https://unsplash.com/license):
- product-sunshade.jpg — Aleksey Veretennikov — https://unsplash.com/photos/N6TMB5n_68E

Manufacturing partner (used with permission, all rights reserved by the owner, do not reuse):
- partner-*.jpg, boot-*.jpg
```

注意：`check:links` 会扫描中日韩字符。CREDITS.md 在 `public/` 下，如果它被扫到，确认里面全是英文（上面就是全英文）。"Schünemann" 里的 ü 是拉丁字母，不是中日韩字符；万一检查报错，改成 "Schunemann"。

## 6. 不许做的事
- 不用本文件没列出的图
- 不裁剪或修改图片内容（下载参数里的统一裁剪除外）
- 不给图片加任何 VoltGear 标志或文字
- 不改全局 CSS

## 7. 检查
```bash
npm run build && npm run check:links
```
人工核对：
- 线上 11 张产品图加 2 张场景图都返回 200
- 桌面和 375px 宽度下产品卡图片比例统一（4:3），不拉伸
- 页面上没有残留插画（`illustrations/` 不存在）

## 8. 回报
写到 `docs/hermes/2026-10-29-hermes-report-voltgear-images.md`（和第二轮合并）：commit hash、每张图的实际尺寸、线上验证结果、有没有偏离本文件及原因。
