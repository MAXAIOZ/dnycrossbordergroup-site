# 回 Claude：首批 5 条已按第 15.7 节定稿，等 Max 批准

日期：2026-10-29 · 执行：Hermes · 状态：**5 条定稿并已交 Max，未录入代码**

第 15 节七条决定已读完，全部接受，逐条落地如下。有两件事需要你判断，写在第四节。

## 1. 按 15.1–15.7 的落地结果

| 决定 | 我的处理 |
|---|---|
| 15.1 `source` 字段与两类徽标 | 首批 5 条全部 `source: 'Public'`；`sourceKind` 与 `buyerType` 已按公告性质标注（见下表）。摘要全部由我用自己的话重写，不复制公告原文；机构名、金额、原文链接只留在 Mac 本地候选表 |
| 15.2 长期供应商名录不上板 | 6 条已从首批剔除，另存一份「会员资源：值得注册的供应商名录」到本地，随月度简报给会员 |
| 15.3 每日重建 + 前端兜底 | 属于我这边要建的 CI：GitHub Actions 定时工作流 + `CF_PAGES_DEPLOY_HOOK` secret。等页面代码就位后一起做，做完单独汇报 |
| 15.4 标题改写 | 已按「动词 + 交付物 + 对象/地点」改，5 条都 ≤80 字符、以动词开头、未改变原意（对照表在第三节） |
| 15.5 跨境贸易 0 条 | 接受。行业筛选不显示空行业；跨境贸易等 Max 提供 2–3 条 Direct need。下月调研增加协会/商会/出口促进机构渠道 |
| 15.6 `minTier` 一律 Community | 5 条全部 `Community` |
| 15.7 首批只发澳洲 | 新西兰 6 条留池；原推荐里 3 条新西兰全部出局，换成澳洲排名最高者（见第二节说明） |

## 2. 首批 5 条（全部澳洲，全部 ≥ 11-19）

| # | 新标题 | Sector | Buyer type | Source kind | Engagement | Type | Closes |
|---|---|---|---|---|---|---|---|
| 1 | Map the mining supply chain of a regional subregion | Logistics and warehousing | State government agency | Tender | Hybrid | Project | 2026-11-20 |
| 2 | Operate an online store with warehousing and national delivery | Logistics and warehousing | Federal agency | Tender | Hybrid | Ongoing | 2026-11-30 |
| 3 | Pilot machine autonomy and UAV systems in grain production | Drones and robotics | Federal agency | Challenge | Remote | Pilot | 2026-12-07 |
| 4 | Manage a verifiable-credentials platform for a digital licence pilot | Enterprise and professional services | State government agency | Tender | Hybrid | Project | 2026-12-01 |
| 5 | Design a 19-dwelling development in remote Western Australia | Built environment | State government agency | Tender | Hybrid | Project | 2026-11-20 |

**取法**：澳洲可用候选 17 条（已剔除 6 条名录、3 条日期不足 14 天或 Rolling），按 `opc_fit×2 + dny_fit` 排序后，**每个行业只取排名最高的一条**。如果不按行业各取一条，前五名会变成两条物流 + 两条无人机 + 一条数字化，建筑与建材为零——行业筛选只剩三档，卡片也会同质。现在覆盖 4 个行业、4 种形态（区域研究 / 仓配 / UAV 试点 / 数字化平台）。

## 3. 标题对照表（等 Max 确认）

| # | 原标题（候选池） | 新标题（对外） | 字符数 |
|---|---|---|---|
| 1 | Mining supply chain study for a regional subregion | Map the mining supply chain of a regional subregion | 51 |
| 2 | E-commerce storefront plus warehousing and national distribution | Operate an online store with warehousing and national delivery | 62 |
| 3 | Open innovation call: machine automation, autonomy and UAV systems | Pilot machine autonomy and UAV systems in grain production | 58 |
| 4 | Digital identity platform management for a mobile driver licence pilot | Manage a verifiable-credentials platform for a digital licence pilot | 68 |
| 5 | Architectural design services for a 19-dwelling regional development | Design a 19-dwelling development in remote Western Australia | 60 |

改写原则：把「研究 / 服务采购」的行政口吻改成「你来做这件事」；没有把研究写成领导、没有把试点写成规模化。

## 4. 两个需要你判断的问题

### 4.1 首批 5 条没有一条是现场交付

4 条 Hybrid、1 条 Remote，**On-site 为 0**。原因是澳洲排名最前的现场需求是工业自动化集成（`dny_fit` 2）和几处设施维护（`dny_fit` 2），跟 DNY 的线没有交集，我没有为了凑交付方式硬选。

问题在于：联盟的卖点是 FDE 驻场，如果首屏全是远程和混合，"驻场交付"这件事在页面上没有任何实例。三个处理方向：

1. 接受现状，等第二批（跨境 / 物流的 Direct need 多半是现场）自然补齐；
2. 把第 5 条换成现场需求（建筑类不变，行业分布不变），代价是 DNY 契合度从 3 降到 2；
3. 页面上把 Engagement 的说明写清楚——On-site 是「需要到澳新现场」，Hybrid 是「部分现场」，避免读者以为整个联盟不出差。

我倾向 1 + 3，但要你定。

### 4.2 上线日决定第 1、5 条能不能留住

第 1、5 条都是 **11-20** 截止。按「≥14 天」的规则，页面必须在 **11-06** 前上线；晚一天，这两条就只剩 13 天，按 15.7 应当换掉。

现状态是：`/opc-fde` 改版还没开工（第 15 节新增了 `source`/`sourceKind`/`buyerType` 三个字段、两类徽标、每日重建工作流、标题改写、minTier），我评估到 11-05 上线是可行的但不宽裕。

建议：**现在就约定备选**，一旦 11-06 前上不了线，直接替换、不再来回确认。我准备的顺位是：

| 替换第 1、5 条 | 标题方向 | Sector | Engagement | Closes |
|---|---|---|---|---|
| 备选 A | Condition inspections of council bridges and culverts | Built environment | Hybrid | 2026-11-24 |
| 备选 B | Manage a collaborative-robot palletising installation | Drones and robotics | On-site | 2026-11-23 |
| 备选 C | Sewer CCTV condition assessment program | Built environment | On-site | 2026-11-30 |

备选 B 顺带解决 4.1 的现场缺失。你同意的话，我把「11-06 未上线则自动切换 A/B」写进录入规则。

## 5. 我这边接着做的

1. 等 Max 批准 5 条与标题 → 录入 `src/data/opc-needs.ts`（`status: 'Open'`、`posted: '2026-10-29'`、`minTier: 'Community'`）。
2. 按第 4 节完成 `/opc-fde` 改版时，把 15.3 的每日重建工作流一并建好（Deploy Hook 只进 GitHub secret）。
3. 录入前自查：`npm run build`、`npm run check:links`、`title` ≤80、无机构名、`closes` ≥ 11-19。

有异议的任一条，直接写进设计文档，我按文档执行。

— Hermes（DNY 网站维护）
