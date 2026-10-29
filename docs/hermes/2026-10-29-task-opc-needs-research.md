# 任务：收集 30 条澳新 OPC / FDE 候选需求（调研任务，不改网站）

日期：2026-10-29 · 下达：Claude（经 Max 批准）· 执行：Hermes · 期限：**5 个工作日**
关联设计：`2026-10-29-opc-fde-page-design.md`（第 5 节 需求数据结构）

---

## 1. 目的
为 `/opc-fde` 的 Open Needs 看板准备第一批需求。你交付的是**候选池**：Max 和 DNY 团队审核、核实后，从中挑 3–5 条发布。**本任务不改网站代码，不提交任何需求到 `opc-needs.ts`。**

## 2. 什么算一条合格的候选需求
必须同时满足：
1. **真实存在**：有可查证的来源（官方公告、正式招标、公开的创新挑战、企业官网发布的合作需求），或者来自 DNY 已有的客户和合作方
2. **在澳洲或新西兰**：需求方在澳新，交付地点在澳新或可以远程
3. **适合 OPC 或小团队**：一个人或小团队能完成，或者一个 FDE 带少量合伙人能完成。排除需要大型企业资质的项目，例如大型基建总包、必须进入政府长期供应商名单（panel）才能投标的项目
4. **和 DNY 能力相关**，属于以下行业之一：
   - Built environment（建筑、建材、物业）
   - Logistics and warehousing
   - Cross-border trade
   - Enterprise and professional services（AI 落地、自动化、数据、软件）
   - Drones and robotics（巡检、测绘、仓储机器人、清洁机器人等）
5. **仍然开放**：截止日期距今 **≥ 3 周**，或者是长期开放的需求

## 3. 数量和分布（目标 30 条）
- 澳洲约 24 条，新西兰约 6 条
- 每个行业至少 4 条，任何一个行业不超过 9 条
- 现场、远程、混合三种都要有
- 优先 Pilot 和 Project 类型，金额或周期适合小团队（公开了金额的，以 50 万澳元以下为主）

## 4. 去哪里找（只用公开、合法的渠道）
**A. 政府和公共机构**（以下网址以执行当天核实的官方地址为准）：
- 联邦 AusTender
- 各州招标平台：NSW buy.nsw、Victoria Tenders、QTenders、Tenders WA、SA Tenders、Tasmania、ACT、NT
- 新西兰 GETS（Government Electronic Tenders Service）
- 政府创新和挑战类项目：例如联邦 Business Research and Innovation Initiative（BRII）、NSW Small Business Innovation & Research（SBIR）、国防创新相关的公开挑战、各地市政府的智慧城市和数字化挑战
- 地方议会（council）公开招标

**B. 行业和企业**：
- 大学和研究机构公开的产业合作需求
- 行业协会的会员合作需求（物流、建筑、农业、矿业等）
- 大型企业公开的 open innovation 或供应商挑战

**C. DNY 自有渠道**：
- 只整理 **Max 提供或明确同意使用**的客户和合作方需求
- **不要**自行翻阅邮箱或客户资料

**规则**：
- 遵守各网站的使用条款和 robots 规则；需要登录才能看的内容不抓取
- **不要以 DNY 的名义联系任何机构**（不发邮件、不打电话、不在任何平台留言）。需要进一步了解时，在表格里标 "Needs contact"，由 Max 决定
- 只记录机构层面的信息；不收集个人姓名、个人邮箱、电话等个人信息，公告里的联系人信息不要抄进表格

## 5. 交付物
**存放位置：只放在 Max 的 Mac 本地，不放进公开仓库。**
`~/Documents/DNY/AI AgentsWork/OPC-needs/2026-11-opc-needs-candidates.md`
（另存一份同名 `.csv`）

**每条候选需求包含以下字段：**

| 字段 | 说明 |
|---|---|
| cand_id | C-01 … C-30 |
| source_type | `Public tender` / `Public challenge` / `Industry or corporate` / `DNY network` |
| source_url | 原始公告链接（DNY network 填 "Max"） |
| found_on | 发现日期 |
| client_name | 需求方机构名称（**仅内部用，不上网站**） |
| client_type | Government / Council / University / Company / Association |
| title_public | 拟在网站上用的英文标题，≤ 80 字符，**不含机构名称** |
| sector | 第 2 节五个行业之一 |
| location | 城市 + 州/地区，或 "Remote (AU/NZ time zones)" |
| engagement | On-site / Remote / Hybrid |
| type | Pilot / Project / Ongoing |
| summary_public | 拟发布的英文摘要，2–4 句，不含机构名称、预算和合同条款 |
| skills | 3–8 个英文技能标签 |
| closes | 截止日期（没有就填 "Rolling"） |
| value | 公开金额或规模（没有就填 "Not stated"）（仅内部用） |
| eligibility | 投标或参与门槛：ABN、保险、资质、安全审查、panel 要求等 |
| opc_fit | 1–5 分：一人公司或小团队承接的可行性，附一句理由 |
| dny_fit | 1–5 分：和 DNY 能力及基础设施的相关度，附一句理由 |
| verification | `Verified public notice` / `Needs contact` / `Provided by Max` |
| notes | 风险和疑点 |

**文件开头写一段摘要**：
- 总条数，以及按行业、澳洲/新西兰、来源类型的分布
- **推荐首批发布的 5 条**（按 opc_fit + dny_fit 总分排序），每条一句推荐理由
- 哪些渠道最有产出，建议以后每月固定检查哪些渠道

## 6. 不要做
- 不要虚构、合并改写成"看起来像"的需求，也不要用往年已经截止的需求凑数
- 不要修改网站、不要提交 `opc-needs.ts`、不要把这份文件放进 Git
- 不要以 DNY 名义联系任何机构
- 不要收集个人信息

## 7. 验收标准
- [ ] 30 条（不少于 25 条也可以交付，但要说明原因），每条字段完整
- [ ] 每条 `source_url` 都能打开，且执行当天仍然有效
- [ ] 分布符合第 3 节；所有 `closes` 都在 3 周以后，或为 Rolling
- [ ] `title_public` 和 `summary_public` 都不含机构名称
- [ ] 文件只在 Mac 本地指定路径，仓库里没有
- [ ] 摘要里有首批推荐 5 条和渠道建议

## 8. 之后的流程（供参考）
1. Max 审核候选池，选出要发布的条目；必要时由 Max 或 DNY 团队联系需求方核实
2. Max 确认后，Hermes 只把 `title_public`、`sector`、`location`、`engagement`、`type`、`summary_public`、`skills`、`closes` 等公开字段录入 `src/data/opc-needs.ts`
3. 每月重复一次本任务，保持看板更新
