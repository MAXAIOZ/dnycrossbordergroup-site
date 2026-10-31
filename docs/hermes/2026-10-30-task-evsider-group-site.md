# 任务：集团站 EV 页面改名为 Evsider，并精简为简介页

日期：2026-10-30 · 下达：Claude（Max 已确认方向）· 执行：Hermes · 状态：待实施
关联：Evsider 品牌站设计 `~/Documents/DNY/website/Evsider/evsider-site/EVSIDER_SITE_DESIGN_V1.md`

**顺序要求：先上线 evsider.com v1，再做本任务。** 否则集团站会链接到一个还是临时落地页的网站。

---

## 1. Max 已确认的方向
- 对外品牌统一改为 **Evsider by DNY**，`VoltGear` 全站作废
- 集团站 `/ventures/ev-accessories` **只保留简介，链接到 evsider.com**；详细内容（车型表、产品卡、合作方区块）只放在 evsider.com，避免两个网站内容重复、分走搜索排名
- slug 保持 `ev-accessories` 不变（避免旧链接失效）

## 2. 改名

| 文件 | 改动 |
|---|---|
| `src/data/ventures.ts` | `EV_BRAND = 'Evsider by DNY'`。`short` 改为：`Fitted accessories for Australian EVs, supplied to dealers, fleets and retailers under the Evsider brand.` |
| `src/data/faqs.ts` | `'ev-accessories'` 组按第 4 节替换 |
| `src/lib/ai-text.ts` | 那一行里 `/ventures/ev-accessories` 的描述改为 `fitted EV accessories for Australian trade buyers, now at https://evsider.com` |

改完全仓库搜一遍 `VoltGear`，确认只剩 `docs/` 里的历史文档。标题变了，所以要跑 `python3 scripts/generate-og.py` 重新生成 OG 图。

## 3. `src/legacy/ev-accessories.html` 整段替换

保留 `{{name}}` 占位。原来的 Why Now、Launch Range、Planned Vehicle Coverage、Manufacturing Partner、Trade & Fleet 区块全部删掉。**图片文件留在仓库里不删**，evsider 站要从这里复制。

```html
<section class="section" id="project">
<div class="container">

<div class="deal-metrics" style="margin-bottom:48px;">
<div class="deal-metric"><span class="k">Sector</span><span class="v">EV Accessories</span></div>
<div class="deal-metric"><span class="k">Target Market</span><span class="v">Australia, then New Zealand</span></div>
<div class="deal-metric"><span class="k">Model</span><span class="v gold">B2B Trade Supply</span></div>
</div>

<div class="grid-2">
<div class="panel reveal">
<h3>Overview</h3>
<p>{{name}} is the group’s electric-vehicle accessories business. It designs fitted floor mats, liners, sunshades and cabin accessories for the electric and plug-in hybrid vehicles sold in Australia, and supplies them to new-car dealers, fleet and novated lease providers, reconditioners and retailers.</p>
<p>The range, vehicle fitment and trade registration live on the brand site, evsider.com.</p>
</div>
<div class="panel reveal reveal-delay-1">
<h3>At a glance</h3>
<ul class="check-list">
<li>Eleven non-electrical accessory categories in the launch range</li>
<li>Fitment planned for 20 models sold in Australia</li>
<li>Delivery packs, volume tiers and private label for trade partners</li>
<li>Developed and made with an experienced manufacturing partner</li>
</ul>
</div>
</div>

<div class="hero-actions" style="margin-top:32px;align-items:center;">
<a href="https://evsider.com" class="btn btn-primary">Visit evsider.com</a>
<a href="https://evsider.com/trade#register" class="btn btn-secondary">Become a stockist</a>
</div>

</div>
</section>
```

- `Visit evsider.com` 和 `Become a stockist` 两个按钮文字加进 `scripts/check-links.mjs` 的 `allowed` 白名单
- 两个外链不加 `rel="nofollow"`（同一集团的网站，要把权重传过去）
- 这一页的 canonical 保持指向集团站自己（内容已经和 evsider.com 不重复）

## 4. FAQ 替换（`'ev-accessories'` 组，全部照抄）

```ts
'ev-accessories': {
  title: `${EV_BRAND} EV accessories`,
  items: [
    {
      q: `What is ${EV_BRAND}?`,
      a: `${EV_BRAND} is DNY Cross Border Group’s electric-vehicle accessories business, currently in development. It supplies fitted floor mats, liners, sunshades and cabin accessories for Australian EV models to dealers, fleets, reconditioners and retailers. Full details are at https://evsider.com.`,
    },
    {
      q: 'Where can trade buyers see the range and vehicle fitment?',
      a: 'On https://evsider.com, which lists the eleven product categories, fitment for 20 models and the trade registration form.',
    },
  ],
},
```

## 5. 不许做的事
- 不删 `public/assets/img/ventures/ev-accessories/` 里的图片
- 不改 slug，不加跳转
- 访客可见文案不出现 `—`

## 6. 检查
```bash
npm run build && npm run check:links
grep -rn "VoltGear" src public   # 应该没有输出
```
- 线上 `/ventures/ev-accessories` 返回 200，两个按钮都指向 evsider.com 且能打开
- `/ventures` 列表页、首页、`llms.txt` 里这个项目的名字都已经变成 Evsider by DNY
- OG 图已重新生成

## 7. 回报
写到 `docs/hermes/2026-10-30-hermes-report-evsider-group-site.md`：commit hash 和线上验证结果。
