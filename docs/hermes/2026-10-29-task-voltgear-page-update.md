# 任务：升级 /ventures/ev-accessories（DNY VoltGear）页面

日期：2026-10-29 · 下达：Claude（Max 要求）· 执行：Hermes · 状态：待实施
依据：`docs/hermes/2026-10-29-voltgear-ev-research.md`（澳洲热销 EV 车型与配件研究，2026-10-29）

---

## 1. 目的

现在的页面车型表停留在 2023–2025 年的畅销车。2026 年 1–9 月纯电销量前十里有 6 款不在表上，表上又有几款已经卖不动。这次升级做四件事：

1. 车型表按 2026 年真实销量重排，分三层
2. 新增「Why now」市场数据区块（带日期和来源）
3. 产品卡按需求优先级重排，补「脚垫+后备箱垫套装」，改写几条文案
4. Trade & Fleet 区块补上经销商交车包、novated lease、二手整备三个渠道

**只改内容，不改组件、样式和路由。**

## 2. 要改的文件

| 文件 | 改什么 |
|---|---|
| `src/legacy/ev-accessories.html` | 整段替换为第 4 节的 HTML |
| `src/data/faqs.ts` 的 `'ev-accessories'` | 按第 5 节更新两条答案 |
| `src/data/ventures.ts` 的 `ev-accessories` 对象 | 只改 `capabilities`（第 6 节），其他字段不动 |

名称、slug、标题不变，**不需要**重新生成 OG 图。

## 3. 硬规则（这一页特有）

1. **页面不写任何价格。** 研究里的定价区间是推断值，零售店也没开；价格只留在内部文档。
2. **不点名任何竞品**（Tesery、3D MAXpider、Ironman 等一律不出现）。
3. **不写 Model Y L。** 澳洲是否在售没有核实。
4. 车名只用于说明适配：产品名写成 `for BYD Shark 6`，不要写成 `BYD Shark 6 Mat` 这类把车企品牌当产品名的写法。免责声明保留原文。
5. 项目状态仍是 In Development。「本地现货」「新车型优先」这类说法一律写成计划（planned / designed to），不写成已经做到。
6. 全站英文，第 4 节的英文照抄。

## 4. `src/legacy/ev-accessories.html` 替换内容

> 保留 `{{name}}` 占位符。class 全部沿用现有样式，无新增 class。

```html
<section class="section" id="project">
<div class="container">

<div class="deal-metrics" style="margin-bottom:48px;">
<div class="deal-metric"><span class="k">Sector</span><span class="v">EV Accessories</span></div>
<div class="deal-metric"><span class="k">Target Market</span><span class="v">Australia, then New Zealand</span></div>
<div class="deal-metric"><span class="k">Model</span><span class="v gold">B2C Retail + B2B Trade</span></div>
</div>

<div class="grid-2">
<div class="panel reveal">
<h3>Overview</h3>
<p>{{name}} is the group’s electric-vehicle accessories business. It designs and supplies fitted interior and cargo accessories for the EVs Australians are buying now — cut for the exact make, model and year, for Australian-delivered right-hand-drive vehicles.</p>
<p>It runs as two channels on one data set: a retail store for EV owners and a trade channel for dealers, leasing providers, fleets, detailers and OEM/ODM partners. Both share the same product, vehicle-fitment and order records, with separate pricing and customer journeys.</p>
</div>
<div class="panel reveal reveal-delay-1">
<h3>What sets it apart</h3>
<ul class="check-list">
<li>New models first — fitment is planned for new EVs as they reach Australian showrooms, not years later</li>
<li>Built for Australian heat — heat-stable TPE rather than XPE foam, and clip-in roof shades rather than suction cups</li>
<li>Model-specific fit — every fitted product is listed against a named make, model and year, including mid-cycle updates</li>
<li>Planned Australian stock — prices in AUD including GST, with full Australian Consumer Law rights</li>
<li>Supply through the OPC + FDE network — manufacturing, OEM/ODM and small-batch custom production</li>
</ul>
</div>
</div>

<div class="section-head reveal" style="margin-top:56px; margin-bottom:28px;">
<span class="kicker">Why Now</span>
<h3 style="font-size:24px;margin-top:4px;">Australia’s EV market changed in 2026</h3>
</div>
<div class="grid-3">
<div class="card reveal"><h3>18.9%</h3><p>Battery-electric share of new-vehicle sales in Australia, January–September 2026 — with a record 24.9% in August.</p></div>
<div class="card reveal reveal-delay-1"><h3>+54.6%</h3><p>Growth in used EV sales in the first half of 2026, while the overall used-car market fell 6.6%.</p></div>
<div class="card reveal reveal-delay-2"><h3>6 of the top 10</h3><p>Of the ten best-selling battery EVs in January–September 2026, six were new to the market since 2025 — most of them with little fitted-accessory supply in Australia.</p></div>
</div>
<p class="src-note reveal" style="margin-top:12px;">Sources: FCAI VFACTS and Electric Vehicle Council data as reported by CarExpert (October 2026) and CleanTechnica (8 October 2026); AADA / AutoGrab used-vehicle data as reported by NRMA (July 2026).</p>

<div class="section-head reveal" style="margin-top:56px; margin-bottom:28px;">
<span class="kicker">Launch Range</span>
<h3 style="font-size:24px;margin-top:4px;">Non-electrical interior and cargo accessories</h3>
</div>
<div class="grid-3">
<div class="card reveal"><h3>Floor Mat + Boot Liner Set</h3><p>Matching 3D all-weather mats and boot liner, made to be bought together and fitted in minutes.</p></div>
<div class="card reveal reveal-delay-1"><h3>3D All-Weather Floor Mats</h3><p>Laser-measured, heat-stable TPE mats with raised edges that hold red dust, sand and mud.</p></div>
<div class="card reveal reveal-delay-2"><h3>Glass Roof Sunshade</h3><p>Clip-in mesh frame that cuts heat and glare through panoramic glass roofs — no suction cups to drop off in summer.</p></div>
<div class="card reveal"><h3>Magnetic Side-Window Sunshades</h3><p>Full-set mesh shades that snap to the door frames and stay on with windows down.</p></div>
<div class="card reveal reveal-delay-1"><h3>Ute Tub Mat for BYD Shark 6</h3><p>Heavy-duty mat that stops loads sliding and protects the tub from day one.</p></div>
<div class="card reveal reveal-delay-2"><h3>Boot Cargo Liner</h3><p>Deep-tray boot liner that keeps groceries, gear and dogs off the carpet.</p></div>
<div class="card reveal"><h3>Frunk Liner</h3><p>Fitted front-trunk tray for cables, wet gear and takeaway — for models with a usable front trunk.</p></div>
<div class="card reveal reveal-delay-1"><h3>Centre Console Organiser</h3><p>Drop-in divider tray that turns the deep console bin into usable storage.</p></div>
<div class="card reveal reveal-delay-2"><h3>Seat-Back Kick Protectors</h3><p>Keeps little shoes and dog paws off the back of the front seats.</p></div>
<div class="card reveal"><h3>Pet Rear-Seat Hammock</h3><p>Waterproof, scratch-resistant cover that turns the back seat into a dog zone.</p></div>
<div class="card reveal reveal-delay-1"><h3>Personalised Stitched Mats</h3><p>Diamond-quilted mats in your choice of base, stitching and embroidered initials.</p></div>
</div>

<div class="section-head reveal" style="margin-top:56px; margin-bottom:28px;">
<span class="kicker">Planned Vehicle Coverage</span>
<h3 style="font-size:24px;margin-top:4px;">Built around what Australians are buying in 2026</h3>
</div>
<div class="reveal" style="overflow-x:auto;">
<table class="htable">
<thead><tr><th scope="col">Stage</th><th scope="col">Make</th><th scope="col">Model</th><th scope="col">Years</th></tr></thead>
<tbody>
<tr><th scope="row">Launch</th><td>Tesla</td><td>Model Y</td><td>2025+ (Juniper); 2022–2025 (pre-Juniper)</td></tr>
<tr><th scope="row">Launch</th><td>BYD</td><td>Sealion 7</td><td>2025+</td></tr>
<tr><th scope="row">Launch</th><td>Geely</td><td>EX5</td><td>2025+</td></tr>
<tr><th scope="row">Launch</th><td>Zeekr</td><td>7X</td><td>2025+</td></tr>
<tr><th scope="row">Launch</th><td>Jaecoo</td><td>J5 EV</td><td>2026+</td></tr>
<tr><th scope="row">Launch</th><td>BYD</td><td>Shark 6 (PHEV ute)</td><td>2025+</td></tr>
<tr><th scope="row">Extended</th><td>Tesla</td><td>Model 3</td><td>2024+ (Highland); 2019–2023</td></tr>
<tr><th scope="row">Extended</th><td>BYD</td><td>Atto 2</td><td>2025+</td></tr>
<tr><th scope="row">Extended</th><td>BYD</td><td>Sealion 6 (PHEV)</td><td>2024+</td></tr>
<tr><th scope="row">Extended</th><td>BYD</td><td>Sealion 8 (PHEV)</td><td>2026+</td></tr>
<tr><th scope="row">Extended</th><td>Geely</td><td>EX2</td><td>2026+</td></tr>
<tr><th scope="row">Extended</th><td>Kia</td><td>EV3</td><td>2025+</td></tr>
<tr><th scope="row">Extended</th><td>Kia</td><td>EV5</td><td>2024+</td></tr>
<tr><th scope="row">Extended</th><td>BYD</td><td>Atto 3</td><td>2022+</td></tr>
<tr><th scope="row">Extended</th><td>MG</td><td>MG4 and MG4 Urban</td><td>2023+</td></tr>
<tr><th scope="row">Extended</th><td>XPENG</td><td>G6</td><td>2024+</td></tr>
<tr><th scope="row">On request</th><td>BYD</td><td>Seal, Dolphin, Atto 1</td><td>Ask us</td></tr>
<tr><th scope="row">On request</th><td>Hyundai</td><td>IONIQ 5</td><td>Ask us</td></tr>
<tr><th scope="row">On request</th><td>Polestar</td><td>Polestar 2</td><td>Ask us</td></tr>
<tr><th scope="row">On request</th><td>Mitsubishi</td><td>Outlander PHEV</td><td>Ask us</td></tr>
</tbody>
</table>
</div>
<p class="src-note reveal" style="margin-top:12px;">Launch: first fitment in the launch range. Extended: added after launch. On request: made to order for trade and fleet customers. New models are added as they reach Australian showrooms.</p>
<p class="src-note reveal" style="margin-top:4px;">Australian-delivered right-hand-drive vehicles only. Coverage varies by product. Vehicle names are used only to describe fit; {{name}} is not affiliated with or endorsed by any vehicle manufacturer.</p>

<div class="section-head reveal" style="margin-top:56px; margin-bottom:28px;">
<span class="kicker">Product Roadmap</span>
<h3 style="font-size:24px;margin-top:4px;">Released in stages, compliance first</h3>
</div>
<div class="grid-3">
<div class="card reveal"><h3>Class A — Non-electrical</h3><p>Floor mats, liners, sunshades, organisers and seat protection. This is the launch range.</p></div>
<div class="card reveal reveal-delay-1"><h3>Class B — Electronic accessories</h3><p>Portable chargers, Type 2 cables and V2L adapters first. Released only after supplier registration and RCM marking under Australia’s Electrical Equipment Safety System.</p></div>
<div class="card reveal reveal-delay-2"><h3>Class C — Lithium-battery products</h3><p>Under assessment. Introduced only after battery testing, transport and insurance requirements are confirmed.</p></div>
</div>

<div class="section-head reveal" style="margin-top:56px; margin-bottom:28px;">
<span class="kicker">Trade &amp; Fleet</span>
<h3 style="font-size:24px;margin-top:4px;">For dealers, leasing providers, fleets and OEM/ODM partners</h3>
</div>
<ul class="check-list">
<li>Dealer delivery packs — mats, boot liner and tub mat fitted before handover</li>
<li>Novated lease and salary-packaging providers — accessory packs added to the lease</li>
<li>Used-car reconditioners — replacement mats and liners for returning lease vehicles</li>
<li>Fleet and rideshare packs, with tiered volume pricing and business accounts</li>
<li>Private label, co-branded packaging and OEM / ODM development — new vehicles, materials and colours</li>
</ul>
<div class="hero-actions" style="margin-top:28px;align-items:center;">
<a href="/contact?type=trade&amp;venture=ev-accessories" class="btn btn-primary">Trade &amp; Fleet Enquiry</a>
<span class="opp-chip">Retail store — coming soon</span>
</div>

<div class="opp-tags" style="margin-top:32px;">
<span class="opp-chip">New models first</span>
<span class="opp-chip">Built for Australian heat</span>
<span class="opp-chip">Model-specific fit</span>
<span class="opp-chip">B2C + B2B</span>
</div>

</div>
</section>
```

### 4.1 上线前必须核实的年份（不确定就写 `2025+` / `2026+` 的保守值，不要编）
- Geely EX5、Jaecoo J5 EV、Geely EX2、BYD Atto 2、Sealion 8、Kia EV3 在澳洲**首批交付的年份**。查车企澳洲官网或 CarExpert/Drive 的上市报道。和表里写的不一致就改，并在回报里列出来。
- BYD Shark 6 澳洲首批交付是 2024 年底还是 2025 年，确认后统一。

### 4.2 OEM/ODM 那条去掉了 "logos"
原文 "new vehicles, materials, colours and logos" 改成了 "new vehicles, materials and colours"，避免被理解成可以给产品加车企车标。这是有意的，不要改回去。

## 5. `src/data/faqs.ts` 更新

`Which vehicles do ${EV_BRAND} products fit?` 的答案改为：

```
'Planned launch fitment covers Australian-delivered right-hand-drive Tesla Model Y (2025+ Juniper and 2022–2025), BYD Sealion 7, Geely EX5, Zeekr 7X, Jaecoo J5 EV and the BYD Shark 6 ute. Tesla Model 3, BYD Atto 2, Atto 3, Sealion 6 and Sealion 8, Geely EX2, Kia EV3 and EV5, MG4 and MG4 Urban, and XPENG G6 follow after launch. Other models, including BYD Seal, Dolphin and Atto 1, Hyundai IONIQ 5, Polestar 2 and Mitsubishi Outlander PHEV, are available on request for trade and fleet customers. Coverage varies by product.'
```

`What is in the launch range?` 的答案改为：

```
'A floor mat and boot liner set, 3D all-weather TPE floor mats, glass roof sunshades, magnetic side-window sunshades, a ute tub mat for the BYD Shark 6, boot cargo liners, frunk liners for models with a usable front trunk, centre console organisers, seat-back kick protectors, a pet rear-seat hammock and personalised stitched mats. All launch products are non-electrical.'
```

其余三条不动。第 4 条（wholesale）可选：在 "Trade and fleet enquiries" 后补 "including dealer delivery packs and novated lease accessory packs"。

## 6. `src/data/ventures.ts`

`capabilities` 改为：

```ts
capabilities: ['New-model fitment', 'Heat-stable materials', 'B2C retail + B2B trade', 'Australian Consumer Law support'],
```

其他字段不动。

## 7. 检查（按 MAINTAINER.md 第四节）

```bash
npm run build          # 0 error
npm run check:links    # 无中文、单 H1、链接全通
```

另外人工核对：
- `dist/ventures/ev-accessories.md` 里车型表 20 行都在，且没有出现 "Model Y L"、任何 `A$`/`$` 价格、任何竞品名
- 手机宽度下车型表能横向滚动（沿用 `overflow-x:auto`）

推送前先 `git fetch`，`origin/main` 有新提交就先 rebase 或先问。上线后 `curl` 线上页面，确认能取到 "Planned Vehicle Coverage"。

## 8. 回报

写到 `docs/hermes/2026-10-29-hermes-report-voltgear-update.md`，包括：
- commit hash，以及上线验证结果
- 第 4.1 节年份核实的结果：哪些改了、依据的链接
- 有没有偏离本文件的地方，偏离的原因

## 9. 不在本任务范围
- 不开零售店，不加价格，不加产品图
- 不改 `ai-text.ts`、OG 图、导航
- 内部定价建议见研究文档第「首发产品优先级与AUD定价」节，仅供 Max 决策用
