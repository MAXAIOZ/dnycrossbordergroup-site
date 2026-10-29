# 汇报：/opc-fde 按第 16、17 节重做完成（已上线）

日期：2026-10-29 · 执行：Hermes · 提交：**bcaa2ff**（代码）＋ **21d96e8**（设计文档同步）
线上：https://dnycrossbordergroup.com/opc-fde ｜ 构建 71 页 ｜ `check:links` 72 页 0 问题

## 一、这一版做了什么

| 设计文档要求 | 实现 |
|---|---|
| §16.2 页面顺序 | 依序：Hero → Why Australia and New Zealand → How the Alliance works → Your local partner → Two ways to work with a client → Open Needs → Membership → Partners → The FDE model → OPC Hubs → Who can join → FAQ → 结尾 CTA |
| §16 远程交付口径 | 全站改为「会员远程交付、DNY 做本地伙伴」；页面无 work rights / visa / relocate / on-site work 字样（已 grep 校验） |
| §17.2 Open Needs 首发 | 11 张卡：10 个核心 venture ＋ Drone & Robotics Components，按 Trusted & Open AI → Physical Intelligence（Components 插在其后）→ Industry Ventures 排列 |
| §17.2 数据来源 | 全部取自 `ventures.ts`（name / status / short / capabilities）与 `/components` 现有服务文案；未编写任何任务、预算、时间表 |
| §17.3 签约说明 | 4.2c 两张卡下方已加 "For work on DNY's own ventures, you contract with DNY directly." |
| §17.4 入会表单 | 新增 Venture of interest 字段（10 venture ＋ Components ＋ Not sure yet），按 `?venture=` 预选；邮件主题带 venture |
| §17.5 全站入口 | 10 个 venture 页在 FAQ 前均有 "Help build {name}" 区块；`/components` 服务区下方有入会文字链接 |
| §15.1 两类徽标 | `Need` 类型已含 `source` / `sourceKind` / `buyerType`；因外部需求暂不发布，前端当前只渲染集团卡（无 Public 徽标出现） |
| §15.2 供应商名录 | 6 条名录不进看板，仍只在本地候选表 |
| §15.6 minTier | 集团卡全部指向免费 Community 申请路径 |
| §17.6 opc-needs.ts | 已建立，`NEEDS` 为空数组；详情页模板 `/opc-fde/needs/[id]` 就位但当前不生成页面 |
| §4.11 SEO | title / description 照文档；schema：Organization（parentOrganization → DNY）＋ 3 个 DefinedTerm ＋ FAQPage；未用 JobPosting |

## 二、第 14 节验收标准逐条

| 验收项 | 结果 |
|---|---|
| `/opc-fde` 按第 4 节顺序呈现全部区块 | **通过**（13 块，锚点 `#why #how #local #contracting #needs #membership #partners #fde #hubs #who` 全部存在） |
| `NEEDS` 为空时不出现空列表或占位 | **通过**，改为集团 11 卡（按 §17.2 取代原「行业卡片」写法） |
| 临时测试需求：卡片、详情页、带参跳转、sitemap、llms 正确，测完删除 | **通过**。实测生成 `/opc-fde/needs/N-2026-001`（含 Markdown 孪生页）、卡片按钮带 `?need=N-2026-001&tier=community`、进入 `sitemap-0.xml`、进入 `llms-full.txt` 与 `llms.txt`；随后已删除并重新构建，`dist` 中无残留 |
| `/opc-fde/join` 参数预选 | **通过**。`?tier=premier&venture=facadia` 实测：档位选中 premier、venture 选中 facadia、Partner track 自动显示；切回非 Premier 自动隐藏并清空 |
| 提交后 info@ 收到主题正确的邮件 | **待 Max 实测一次**（我没提交真实表单，避免伪造申请）。主题格式：`[DNY OPC] Membership application — Premier — {姓名} — facadia` |
| 全站无 "Office + AI Agents" | **通过**，`grep -rn "Office + AI Agents" src` 零结果 |
| 导航下拉、锚点可用 | **通过，但有一处偏差**：下拉为 **6 项**（Overview / Your local partner / Open Needs / Membership / Partners / Join for Free）。第 3 节写 5 项，第 16.2 节要求增加 "Your local partner"，以后者为准 |
| `npm run build`、`check:links` 通过 | **通过**：71 页 / 72 页 0 问题 |
| 新页面有 H1、Markdown 孪生页、OG 图 | **通过**：`/opc-fde`、`/opc-fde/join` 各 1 个 H1、有 og:image、有 .md 孪生页 |
| 移动端 375px 无横向溢出 | **通过**：375×812 实测 `scrollWidth - clientWidth = 0`（首页与申请表均如此） |
| 表单可只用键盘完成 | **结构上通过**：全部为原生 input / select / textarea ＋ label 绑定，无自定义控件、无 tabindex 陷阱；未做逐键人工走查 |
| 隐私政策已补充并更新生效日期 | **通过**：第 2 节加 Alliance applications，第 4 节加「评估会员与合伙人申请并匹配需求」，生效日期 29 October 2026 |
| 11.1、11.2 公开说明全部上页面且与文档一致 | **通过**（5 段会员说明＋合伙人说明逐句照贴，已 grep 校验关键句） |

## 三、第 17.7 节验收标准

| 验收项 | 结果 |
|---|---|
| 显示 11 张卡（10 venture ＋ Components），内容来自现有文案 | **通过**，卡片标题与顺序已逐张核对 |
| 每张卡的 Express Interest 带 venture 进申请表 | **通过**，11 个 `?venture=` 值全部生成 |
| 每个 venture 页有 "Help build …"，`/components` 有入会链接 | **通过**，10 个 venture 页各 1 处，components 页 1 处 |
| 页面无任何外部招标需求 | **通过** |

## 四、需要你知道的几处判断

1. **会员权益在卡片上是条目化的**：第 11.1 节是表格，页面改成了三张等高卡＋项目符号，文字与表格一致（"Everything in Community" 这种继承行保留原文），没有新增承诺。
2. **申请表字段比第 7 节多一个** "Venture of interest"（第 17.4 节要求），少了「工作签证/到岗」类问题（第 16 节取消），换成第 16 节口径的「工作时区重叠」与「能否直接与澳洲客户签约」。
3. **`llms.txt` 增加了 Open Needs 一节**：有开放需求时列出标题与详情链接；当前为空，只保留入口。`llms-full.txt` 同时列出集团卡与开放需求。
4. **`SITE.lastUpdated` 改为 2026-10-29**，因为站点事实（OPC 定义、联盟结构）变了。
5. **未做**：`/opc-fde/membership-terms` 页面（第 11.5 节内部要求，需律师文本）；付费流程未接；需求详情页当前无内容可放。

## 五、下一步

1. 等 Max 在页面上真实提交一次申请表，确认 info@ 收到的主题与字段完整。
2. 需要发布外部需求时，按第 15.1／16.3 节规则从本地候选池录入 `src/data/opc-needs.ts` 即可，页面与 feed 自动生成。
3. 若第 11 节文案有法律修订，直接改设计文档，我按文档同步。

— Hermes（DNY 网站维护）
