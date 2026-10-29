# /opc-fde 页面重做：ANZ OPC + FDE Alliance（设计）

日期：2026-10-29 · 设计：Claude · 实施：Hermes · 状态：**2026-10-29 已按远程交付模式校准（第 16 节）；需求看板首发改为 DNY 集团自身需求（第 17 节）**

---

## 1. 决策（Max，2026-10-29）

| 项 | 决定 |
|---|---|
| 页面定位 | 从"概念介绍"改为**招募和对接页**：DNY 把**澳洲、新西兰的真实需求**和**全球想在澳新跨境落地的 OPC、FDE**（个人、企业、组织）连接起来。以澳洲的实际需求引流，不限于中国出海企业 |
| OPC 的含义 | **One Person Company（一人公司）**：一个人或极小团队，借助 AI agent 做到大公司的产出。悉尼、奥克兰的实体空间改称 **OPC Hub** |
| 会员（连接需求） | 三档：**Community（免费）/ Professional / Premier**。Professional、Premier 年费"申请后告知"，页面不写金额 |
| 合伙人（一起完成需求） | 三档：**Delivery Partner / Lead Partner / Principal Partner**。**只有 Premier 会员可以申请成为合伙人** |
| 收入 | 只写 "co-deliver and share project revenue under a project agreement"，**不写比例** |
| 需求来源 | **只由 DNY 整理发布**，不开放外部提交。客户名称在匹配前不公开 |
| 节点 | 保持 **Sydney first, Auckland next** |
| 联系方式 | 不放微信。全站英文 |
| **FDE 的含义**（校准） | **把自己的方案「前置部署」到澳新市场的创业者**：forward 指进入新市场，**不是到客户现场**。人在海外，远程交付 |
| **交付模式**（校准） | **远程交付为主**。DNY 是会员在澳洲的本地伙伴：需要时由 DNY 签约，在悉尼时间对接客户，统筹交付 |
| **签约**（校准） | **按项目定**：要求澳洲供应商的（如政府招标）由 DNY 做总包、会员做分包；其他客户可以由会员直接签约 |
| **现场需求**（校准） | **首批不发布现场需求** |
| **会员来源**（校准） | 目前没有会员，从零开始招募；面向全球（包括中国、东南亚和其他地区），页面不点名任何国家 |

## 2. 现状问题（为什么要改）
- 只讲概念（Space/Agents/Market/Talent、FDE 五步），读者看不出"我能得到什么、怎么加入"
- 没有专门的转化入口，只有通用的 Partner/Brief 按钮
- 会员制度只有一句话；合伙人制度完全没有
- OPC 定义（Office + AI Agents）和实际业务（一人公司）不一致

## 3. 信息架构

| 路径 | 内容 | 新/改 |
|---|---|---|
| `/opc-fde` | 主页面（第 4 节） | 改 |
| `/opc-fde/needs/[id]` | 单个需求详情页（第 6 节） | 新 |
| `/opc-fde/join` | 入会申请表（第 7 节） | 新 |

**导航**：顶层 "OPC + FDE" 改为带下拉菜单：
- Overview → `/opc-fde`
- Open Needs → `/opc-fde#needs`
- Membership → `/opc-fde#membership`
- Partners → `/opc-fde#partners`
- Join for Free → `/opc-fde/join`

页脚 "Deployment" 栏的 OPC + FDE 链接不变。

**新按钮文字**（加入 `scripts/check-links.mjs` 白名单）：`Join for Free`、`See Open Needs`、`Apply for Professional`、`Apply for Premier`、`Express Interest`、`Back to Open Needs`、`Submit Application`

## 4. 主页面 `/opc-fde` 结构与文案（英文照用）

### 4.1 Hero
- Badge：`ANZ OPC + FDE Alliance`
- **H1**：Deliver real projects in Australia and New Zealand
- **Lead**：The ANZ OPC + FDE Alliance connects real needs from Australian and New Zealand organisations with one-person companies and Forward Deployed Entrepreneurs around the world. You deliver from wherever you are; DNY is your local partner in Sydney — contracting where a client needs it, meeting clients in local business hours and keeping delivery on track.
- 按钮：**Join for Free**（→ `/opc-fde/join?tier=community`）· **See Open Needs**（→ `#needs`）
- Definition 区块（保留现有组件），三条：
  - **OPC — One Person Company**: A business run by one person or a very small team that uses AI agents to deliver at the scale of a much larger firm.
  - **FDE — Forward Deployed Entrepreneur**: A founder who deploys a proven product or service into the Australian and New Zealand market from wherever they are, with DNY as the local partner.
  - **OPC Hub**: DNY's local base in Australia or New Zealand, where DNY meets clients, hosts demonstrations and represents members in person.

### 4.2 How the Alliance works（`#how`，四步横排，沿用 `.layers` 样式）
1. **Curate** — DNY sources and verifies real needs from organisations in Australia and New Zealand.
2. **Match** — Members see open needs and express interest; DNY shortlists the best fit.
3. **Deploy** — Members deliver remotely on DNY infrastructure; DNY handles local contracting where needed, client meetings and delivery oversight.
4. **Grow** — Solutions that repeat become sector practices, or are incubated as new ventures.

### 4.2a Why Australia and New Zealand（`#why`，三张卡片）
- **Work in real time with Asia** — Australian and New Zealand business hours overlap with much of Asia, so remote teams can work with clients in real time.
- **An early market for AI** — 12% of Australian businesses used AI in 2024–25 (Australian Bureau of Statistics). Many organisations are still looking for practical solutions.（数据沿用网站已有的、带出处的统计，出处写在卡片下方小字）
- **Stable, English-speaking markets** — Clear procurement rules and English as the working language.

### 4.2b Your local partner（`#local`）
- H2：Your local partner in Australia
- Lead：You deliver from where you are. DNY gives you the local presence Australian and New Zealand clients expect.
- 四张卡片：
  - **Contracting** — Where a client needs an Australian contracting party, DNY can contract as prime and engage you as a subcontractor, project by project.
  - **Client contact** — DNY meets clients in local business hours and keeps them informed between your delivery cycles.
  - **Procurement steps** — DNY coordinates the supplier registration and paperwork a client's procurement process requires.
  - **Delivery oversight** — DNY tracks milestones and quality, so the client deals with one accountable team.
- 小字：What DNY provides on each project is set out in the project agreement. DNY does not provide legal, tax or immigration advice.

### 4.2c Two ways to work with a client（`#contracting`）
两张卡片：
- **Through DNY** — DNY is the contracting party and you deliver as a subcontractor. Typical for government tenders and clients that require an Australian supplier.
- **Direct** — You contract with the client directly; DNY introduces and supports. Typical for companies that already work with overseas suppliers.
- 小字：The model for each need is shown on its card and agreed before work starts.

### 4.3 Open Needs（`#needs`）
> **2026-10-29 更新：本节第一版由第 17 节取代。** 首发只展示 DNY 集团自己的需求，不发布外部招标。以下原文保留，作为以后发布外部需求时的参考。

- H2：Open Needs
- Lead（2026-10-29 修订，见第 15 节）：Real needs from organisations in Australia and New Zealand. Direct needs are collected and verified by DNY; public opportunities are selected and checked by DNY from official tender and challenge listings.
- **有已发布需求时**：卡片网格（数据见第 5 节），每张卡片显示：标题、Sector、Location、Delivery（Remote / Remote + DNY local support）、Contracting（Through DNY / Direct or through DNY）、Type（Pilot / Project / Ongoing）、Skills（最多 4 个标签）、Status、Posted 日期，按钮 "Express Interest"（→ 详情页）
- 列表默认只显示 `Open` 和 `Matching` 状态；`Closed` 不显示
- **没有已发布需求时**（数据为空）：不显示空列表或"即将上线"之类的占位，改为显示**需求来源的行业**，文案：
  > DNY sources needs across these sectors. Join for free to receive the Open Needs digest as new needs are published.

  行业卡片：Built environment · Logistics and warehousing · Cross-border trade · Enterprise and professional services · Drones and robotics deployment（各自链接到 `/industries` 对应锚点或相关页面）。下方放按钮 "Join for Free"
- 页面底部小字：Needs are curated by DNY. We do not publish client names, budgets or contract terms on this website.

### 4.4 Membership（`#membership`）
- H2：Membership: get connected to real demand
- Lead：Members get access to verified needs and the people who can help deliver them. Start free; upgrade when you want deeper access.
- 三张卡片（权益见第 11 节），每张卡片底部：
  - Community：价格 **Free** · 按钮 **Join for Free**
  - Professional：价格 **Annual fee on application** · 按钮 **Apply for Professional**
  - Premier：价格 **Annual fee on application** · 按钮 **Apply for Premier** · 角标 "Eligible for partnership"
- 卡片下方的公开说明：见第 11.1 节（替换第一版的那一句小字）

### 4.5 Partners（`#partners`，深色区块）
- H2：Partnership: deliver the work together
- Lead：Partners co-deliver projects with DNY and share project revenue under a project agreement. Partnership is open to Premier members only.
- 三个阶梯（横向三列或竖向阶梯，权益见第 11 节）：Delivery Partner → Lead Partner → Principal Partner
- "How to become a partner"（三步）：
  1. Hold Premier membership.
  2. Apply and complete a capability and reference review.
  3. Sign a partner agreement before taking on client work.
- 放第 11.2 节的合伙人公开说明，然后是这一句小字：You do not need to be in Australia or New Zealand. Partners deliver remotely; DNY provides the local presence.

### 4.6 The FDE model（`#fde`）
- H2：How an FDE deploys into Australia and New Zealand
- Lead：An FDE takes a proven product or service into a new market — from wherever they are, with DNY as the local partner.
- 五步（替换原来的 Embed / Shape / Prove / Deploy / Scale）：
  1. **Understand** — Work with DNY to understand the client's problem, standards and constraints.
  2. **Adapt** — Fit your product or service to the local market: integration, documentation and pricing.
  3. **Prove** — Run a pilot remotely, with DNY handling local meetings and client communication.
  4. **Deploy** — Move to production with monitoring and support across time zones.
  5. **Scale or spin out** — Extend to more clients, or incubate a repeatable solution as a new venture.
- 保留现有一句：When a solution repeats across customers, it is incubated inside the network and can become an independent venture on DNY infrastructure.（链接 `/ventures`）

### 4.7 OPC Hubs（`#hubs`）
两张卡片：
- **Sydney** · 状态徽标 `In Development` · "The first OPC Hub, alongside DNY's headquarters: where DNY meets clients, hosts demonstrations and represents members in person."
- **Auckland** · 状态徽标 `In Development` · "The next hub, extending the network's local presence to New Zealand."

下方一句：You don't need to be in Australia or New Zealand. Members deliver remotely; hubs give the network a local presence.

**不写具体地址**，等场地确定后再另行设计。

### 4.8 Who can join（`#who`）
三列：
- **Individuals** — Solo founders, consultants, engineers and specialists running their own one-person company.
- **Small companies** — Teams of up to about ten people with a capability Australian and New Zealand organisations need.
- **Organisations** — Associations, incubators, universities and service providers that support OPCs and FDEs.

下方一句：Members can be based anywhere in the world. All Alliance activity is conducted in English.

### 4.9 FAQ
替换现有 `opcfde` 组（`src/data/faqs.ts`），新问答见第 9 节。

### 4.10 结尾 CTA
CTABand：标题 "Join the network that delivers"，主按钮 **Join for Free**，次按钮 **Partner with DNY**（现有 CTA）

### 4.11 SEO
- `title`：ANZ OPC + FDE Alliance — Deliver Real Projects in Australia and New Zealand
- `description`：Join the ANZ OPC + FDE Alliance: one-person companies and Forward Deployed Entrepreneurs worldwide connected to real, verified needs from Australian and New Zealand organisations. Free to join.
- Schema：Organization（`name: ANZ OPC + FDE Alliance`，`parentOrganization` 指向 DNY）+ 三个 DefinedTerm（OPC、FDE、OPC Hub）+ FAQPage + 有需求时加 ItemList
- **不要**用 JobPosting schema（需求不是招聘职位）

## 5. 需求数据（DNY 整理，Hermes 录入）

文件：`src/data/opc-needs.ts`。新增需求时只改这个文件，页面自动生成。

```ts
export type Need = {
  id: string;            // 'N-2026-001'，按年份顺序编号，永不复用
  title: string;         // 英文，≤ 80 字符，不含客户名称
  sector: 'Built environment' | 'Logistics and warehousing' | 'Cross-border trade'
        | 'Enterprise and professional services' | 'Drones and robotics' | 'Other';
  location: string;      // 需求方所在城市 + 州，如 'Sydney, NSW'
  delivery: 'Remote' | 'Remote + DNY local support'; // 首批不发布需要会员到现场的需求
  contracting: 'Through DNY' | 'Direct or through DNY';
  type: 'Pilot' | 'Project' | 'Ongoing';
  summary: string;       // 公开摘要，2–4 句，不含客户名称、预算、合同条款
  skills: string[];      // 3–8 个
  minTier: 'Community' | 'Professional' | 'Premier'; // 谁能表达兴趣
  status: 'Open' | 'Matching' | 'Closed';
  posted: string;        // 'YYYY-MM-DD'
  closes?: string;       // 可选截止日期
};
export const NEEDS: Need[] = [];   // 初始为空；Max 提供真实需求后由 Hermes 录入
```

**规则**：
- **只录入 Max 提供的真实需求**。Hermes 不得自行编写、示例化或虚构需求
- 超过 `closes` 日期的需求自动视为 `Closed`
- 需求同步进入 `llms.txt`、`llms-full.txt`、sitemap（只收录 Open 和 Matching 的详情页）

## 6. 需求详情页 `/opc-fde/needs/[id]`

- 面包屑：OPC + FDE › Open Needs › {title}
- H1：{title}
- 信息块：Sector / Location / Engagement / Type / Status / Posted / Closes
- "About this need"：summary
- "Skills needed"：标签
- "Who can express interest"：`minTier` 及以上会员。文案：Open to {minTier} members and above. Not a member yet? Joining is free.
- 主按钮 **Express Interest** → `/opc-fde/join?need={id}&tier={minTier}`（申请表自动带上需求编号）
- 次按钮 **Back to Open Needs**
- 小字：The full brief, including the client's name, is shared with shortlisted members under a confidentiality agreement.
- Closed 状态的页面保留（避免死链），顶部显示 "This need is closed."，不显示 Express Interest，`noindex`

## 7. 入会申请页 `/opc-fde/join`

- H1：Join the ANZ OPC + FDE Alliance
- Lead：Tell us who you are and what you do. Community membership is free; we review every application and reply within five business days.
- **表单字段**：
  - Full name *
  - Email *
  - Country *（下拉，复用现有国家列表）
  - You are joining as *：Individual / Small company / Organisation
  - Company or organisation name（选 Individual 时可空）
  - Website or LinkedIn URL *
  - Capabilities *（多选）：AI agents and automation · Software and data · Drones · Robotics · Built environment · Logistics · Cross-border trade · Marketing and sales · Other
  - Membership tier *：Community (free) / Professional / Premier（按 URL 参数 `tier` 预选）
  - I am interested in the Partner track（勾选框，只在选择 Premier 时显示）
  - Need reference（只读，由 URL 参数 `need` 带入，可为空）
  - Working-hours overlap with Australian business hours *：Most of the day / A few hours a day / Little or none
  - Can you contract directly with Australian clients? *：Yes, my business can invoice Australian clients / No, I would work through DNY / Not sure
  - Anything else we should know（多行，≤ 2000 字符）
  - Privacy 同意说明 + 链接 `/privacy`（沿用现有询价表单的写法）
  - Marketing opt-in 勾选框，**默认不勾**
- 提交：沿用现有联系表单机制（FormSubmit → info@），`enquiry_type: "opc-membership"`，邮件主题 `[DNY OPC] Membership application — {tier} — {name}`；带需求编号时主题加 ` — {need}`
- 成功提示：Thank you. We have received your application and will reply within five business days.
- 防垃圾：沿用现有 honeypot 和前端校验

## 8. 全站同步修改（OPC 定义统一）

以下文件里 "OPC (Office + AI Agents)" 的旧定义都要改成 One Person Company 和 OPC Hub：
- `src/data/glossary.ts`：
  - `OPC (One Person Company)`：A business run by one person or a very small team that uses AI agents to deliver at the scale of a much larger firm.
  - 新增 `OPC Hub`：DNY's local base in Australia or New Zealand, where DNY meets clients, hosts demonstrations and represents Alliance members in person.
  - `FDE (Forward Deployed Entrepreneur)`：A founder who deploys a proven product or service into the Australian and New Zealand market from wherever they are, with DNY as the local partner.
  - `ANZ OPC + FDE Alliance`：A network connecting real needs from Australian and New Zealand organisations with one-person companies and Forward Deployed Entrepreneurs worldwide, with membership and partner tracks.
- `src/data/faqs.ts`：`opcfde` 组整组替换（第 9 节）
- `src/data/architecture.ts`：第 4 层（OPC + FDE delivery network）的描述，改成 "Hubs and members — one-person companies and FDEs — matched to real demand"
- `src/lib/ai-text.ts`：llms 文本里 "OPC = Office + AI Agents…" 那段，改为新定义，并加一句会员和合伙人阶梯的说明
- `src/pages/opc-fde.astro`：schema 中的 DefinedTerm
- 其他页面如有引用，用 `grep -rn "Office + AI Agents" src` 全部找出来一并改

## 9. FAQ（`opcfde` 组，替换现有内容）

1. **What is an OPC?** — An OPC is a one-person company: a business run by one person or a very small team that uses AI agents to deliver at the scale of a much larger firm.
2. **Do I need to be in Australia or New Zealand?** — No. Members deliver remotely from anywhere. DNY provides the local presence: client meetings in local business hours, coordination of procurement steps and, where a client requires it, an Australian contracting party.
2a. **Who signs the contract with the client?** — It depends on the client. For government tenders and clients that require an Australian supplier, DNY contracts as prime and you deliver as a subcontractor. Other clients may contract with you directly. The model is shown on each need and agreed before work starts.
3. **Is membership free?** — Community membership is free. Professional and Premier memberships have an annual fee, shared on application.
4. **Where do the needs come from?** — Today, from DNY's own ventures and business lines, which are being built in Australia now. Needs from other organisations in Australia and New Zealand will be added as DNY collects and verifies them.
5. **How do partners earn?** — Partners co-deliver projects with DNY and share project revenue under a project agreement. Partnership is open to Premier members only.
6. **How does the Alliance relate to DNY?** — The Alliance is DNY's delivery network. Members and partners deliver on DNY's AI and physical-intelligence infrastructure, and solutions that repeat can be incubated as DNY ventures.

## 10. 隐私政策补充
第 2 节 "What personal information we collect" 补充：membership applications, including your capabilities, website or professional profile, membership preferences, working hours and contracting preferences。第 4 节 "Why" 补充：to assess membership and partner applications and match members to needs。生效日期更新为上线日期。

## 11. 会员与合伙人权益（英文，照用）—— 2026-10-29 按法律风险修订

> 修订原则：①对外承诺必须做得到，做不到的写清楚条件（"as available""once a hub opens"）；②DNY 不提供、也不显得在提供法律、税务、金融、保险、移民建议；③会员和合伙人是独立经营者，不能代表 DNY；④收费前必须先有书面的会员条款。

### 11.1 会员
| | **Community** — Free | **Professional** — Annual fee on application | **Premier** — Annual fee on application |
|---|---|---|---|
| 1 | A profile in the Alliance member directory, after review | Everything in Community | Everything in Professional |
| 2 | Monthly Open Needs digest (summaries) | Full briefs for eligible needs, and the ability to express interest | Priority shortlisting for larger needs |
| 3 | Online community sessions and general-information guides to working in Australia and New Zealand | Access to selected DNY AI tools, as available, under DNY's tool terms of use | A designated point of contact at DNY |
| 4 | — | Use of OPC Hub meeting and demo space when visiting, once a hub opens, subject to availability | Priority use of OPC Hub meeting and demo space when visiting, once a hub opens |
| 5 | — | Access to the Alliance directory of independent service providers | Use of the "ANZ OPC + FDE Alliance Premier Member" mark in proposals, under the Alliance brand guidelines |
| 6 | — | — | **Eligible to apply for the Partner track** |

**会员卡片下方的公开说明（替换第 4.4 节原来那一句小字，英文照用）：**
> Membership is granted after a short review against the Alliance's published criteria. All memberships are subject to the Membership Terms. We will give members at least 30 days' notice of any material change to benefits.
>
> OPC Hubs are in development. Hub benefits apply only once a hub opens; no opening date is promised.
>
> The service provider directory lists independent firms that members contact directly. DNY does not endorse, supervise or guarantee their services, does not receive referral fees from them, and is not responsible for their advice. Nothing provided through the Alliance — including guides, sessions and directory listings — is legal, tax, financial, insurance or immigration advice.
>
> Members and partners are independent businesses. They are not employees, agents or representatives of DNY and cannot commit DNY to any obligation.
>
> The ANZ OPC + FDE Alliance is operated by DNY Cross Border Group Pty Ltd.

### 11.2 合伙人（仅限 Premier 会员申请）
| | **Delivery Partner** | **Lead Partner** | **Principal Partner** |
|---|---|---|---|
| 角色 | Delivers defined work packages remotely within DNY-led projects | Leads delivery end to end with the client, remotely, with DNY handling local presence | Co-leads a sector or region practice with DNY |
| 收入 | Shares project revenue under a project agreement | Shares project revenue under a project agreement | Shares practice revenue under a partner agreement, and may be invited to co-found ventures incubated from repeat solutions, by separate agreement |
| 晋升 | Successful delivery and customer feedback | Track record as Lead Partner and DNY nomination | — |

**合伙人区块下方的公开说明（英文照用）：**
> Partner work is governed by a written partner agreement and a project agreement for each engagement, covering scope, revenue share, confidentiality, intellectual property, insurance and liability. Partners maintain insurance appropriate to their work, as set out in each project agreement.

### 11.3 和第一版相比改了什么（给 Max 看，不上网站）
| 原写法 | 改为 | 原因 |
|---|---|---|
| Member access to DNY AI infrastructure and agent tools | Access to **selected** DNY AI tools, **as available**, **under DNY's tool terms of use** | 原写法是没有限定的承诺；工具会变，也必须约束会员怎么用（尤其不能把客户个人信息随意放进来） |
| Desk days at OPC Hubs once open | ……once **a** hub opens, **subject to availability and hub rules**，并单独声明 "no opening date is promised" | Hub 还没开，付费会员如果被理解为"买到了工位"，开不了就有误导风险 |
| A named relationship manager at DNY | A **designated point of contact** at DNY | "关系经理"暗示专人、专职、固定服务水平；"指定联系人"是做得到的承诺 |
| Introductions to **vetted** service providers (legal, accounting, insurance) | Access to a **directory of independent service providers**，配完整免责声明 | 见 11.4 |
| Alliance member credentials for use in proposals | Use of the "…Premier Member" **mark**, **under brand guidelines** | 防止会员在投标中让客户误以为自己是 DNY 员工或代表 DNY |
| …can co-found ventures… | **may be invited** to co-found…, **by separate agreement** | 不能让人理解为合伙人自动获得股权 |
| market-entry guides | **general-information** guides | 写明只是一般信息，不是专业意见 |

### 11.4 引荐服务商的风险和处理（重点）
1. **背书责任**：写 "vetted"（经过审核）或 "introductions"（引荐），等于暗示 DNY 担保这些服务商的质量。会员因服务商失误受损时，可能主张 DNY 存在误导或过失。→ 改为"独立服务商名录、会员自行联系、DNY 不背书"。
2. **保险**：在澳洲，为了获得好处而推荐或安排保险产品，可能落入金融服务牌照（AFSL）的监管范围。→ 名录只列保险**经纪机构**的公开信息，DNY 不推荐具体产品、不收任何费用。
3. **转介费**：收取转介费而不披露，存在利益冲突和误导风险。→ 默认 **DNY 不收转介费**，页面上写明。以后如果要收，必须先咨询律师并对会员公开披露（保险相关的另需确认牌照问题）。
4. **法律、税务、移民建议**：在澳洲，法律服务、税务代理服务、移民建议都受执照管制。→ 指南和社群活动只提供一般信息，并统一声明；签证问题只引导会员去官方渠道（澳洲 Department of Home Affairs、Immigration New Zealand），**名录里暂不收录移民代理**。
5. **名录收录规则**：服务商须书面同意才能被收录；只登记机构名称、业务类别、官网；DNY 可以随时移除。

### 11.5 开始收费之前必须完成（内部要求）
1. **会员条款（Membership Terms）**：新页面 `/opc-fde/membership-terms`。至少写清：
   - 运营主体（DNY Cross Border Group Pty Ltd）
   - 各档权益（引用本节）、费用和付款方式
   - 期限、续费、取消和退款
   - 权益变更提前 30 天通知
   - 会员行为规范和品牌标识的使用规则
   - 需求简报的保密义务
   - 隐私（引用 `/privacy`）、责任限制、终止条件
   - 适用法律：新南威尔士州
   - 澳洲消费者法（ACL）规定的权利不能被排除，条款里要保留相应表述
   
   **条款文本须经律师审阅后上线**，上线前 Professional、Premier 只接受申请，不收费。
2. **AI 工具使用条款**：开放工具前，写清可接受用途、数据处理、保密，以及 "as is" 提供、不保证服务水平。
3. **品牌使用指南**：会员标识怎么用、不能怎么用（不能自称 DNY 员工或代表，不能用 DNY 主标识）。
4. **指定联系人的承载量**：Premier 会员的数量要和 DNY 能投入的人力匹配。达到上限时暂停接受 Premier 申请，不要降低服务承诺。

## 12. 视觉
- 沿用现有设计系统和组件：PageHero、SectionHead、tiles、layers、StatusBadge、CTABand、FAQ。不新增动效
- 会员三卡等高；Premier 卡用细金色描边强调（不用大面积金色底）
- 合伙人阶梯用深色区块，三档用左→右箭头表示晋升方向
- 移动端：卡片单列；表格改为卡片式；无横向溢出

## 13. 不要做
- **不要虚构**任何需求、会员、合伙人、客户名称、logo、评价、数字（会员数、项目数、收入）
- 不要写任何价格金额，除了 "Free"
- 不要写分成比例
- 不要出现工作签证、驻场、relocate 之类的表述（会员远程交付）；不要提供任何签证或移民建议
- 不要放微信或任何非英文文字
- 不要写 OPC Hub 的具体地址
- 不要使用 vetted、guaranteed、endorsed、relationship manager 等暗示担保或专职服务的字眼
- 在 `/opc-fde/membership-terms` 经律师审阅并上线之前，不要接入任何付款功能

## 14. 验收标准
- [ ] `/opc-fde` 按第 4 节顺序呈现全部区块和文案；`NEEDS` 为空时显示行业卡片，不出现空列表或占位文字
- [ ] 在本地临时加一条测试需求：卡片、详情页、Express Interest 带参跳转、sitemap、llms.txt 都正确；**测试完删除，不提交**
- [ ] `/opc-fde/join`：参数 `tier` 和 `need` 正确预选和带入；只有选 Premier 时才显示 Partner track；提交后 info@ 收到主题正确的邮件
- [ ] 全站 `grep -rn "Office + AI Agents" src` 无结果；术语表、FAQ、llms 文本已更新
- [ ] 导航下拉 5 项，锚点全部可用
- [ ] `npm run build`、`npm run check:links` 通过；新页面都有 H1、Markdown 孪生页、OG 图
- [ ] 移动端 375px 无横向溢出；表单可以只用键盘完成
- [ ] 隐私政策已补充并更新生效日期
- [ ] 第 11.1、11.2 节的公开说明全部上页面，文字与文档一致


## 15. 根据 Hermes 首轮调研（commit 082a751）的决定（2026-10-29，Claude）

### 15.1 需求分两类，页面如实标注
首轮 26 条全部来自公开招标和公开征集，不是 DNY 直接从客户那里拿到的需求。所以 Open Needs 看板分两类，避免把公开信息说成"DNY 核实的独家需求"：

| 类型 | 卡片徽标 | 说明 |
|---|---|---|
| `Direct` | **Direct need** | DNY 直接从需求方收集并核实；不公开需求方名称 |
| `Public` | **Public opportunity** | DNY 从官方招标或征集中挑选并核对；卡片显示需求方类型（如 "State government agency"、"Local council"），**不显示机构名称和原文链接**；DNY 在给会员的完整简报里提供官方链接，并协助组队投标和交付 |

- 4.3 节第一段小字改为：Needs are curated by DNY. Public opportunities are summarised in our own words from official notices; always rely on the official notice for requirements and deadlines.
- 摘要必须用我们自己的话写，**不得复制招标原文**。

`src/data/opc-needs.ts` 的 `Need` 类型新增字段：
```ts
source: 'Direct' | 'Public';
sourceKind?: 'Tender' | 'EOI' | 'Challenge';                    // Public 时必填
buyerType?: 'Federal agency' | 'State government agency' | 'Local council'
          | 'University' | 'Company' | 'Association';             // Public 时必填
```
官方链接、机构名称、金额**只放在 Mac 本地的候选表里**，不进仓库。

### 15.2 长期供应商名录（6 条）：不上看板
它们是资格登记，不是需求。处理方式：
- **不进 Open Needs 看板**
- 收进会员资源 **"Supplier registers worth joining"**：放在 Open Needs 月度简报里，也作为以后 Professional 会员指南的素材。本期不新增页面区块

### 15.3 截止日期过期：每天自动重建 + 前端兜底
1. **每天自动重建**：在 GitHub Actions 加一个定时工作流，每天悉尼时间 00:30 左右调用 Cloudflare Pages 的 Deploy Hook，重新构建（cron 用 UTC 表示，注意夏令时，取 13:30 UTC 即可）。Deploy Hook 的地址等同密钥，**只存在 GitHub Actions secret `CF_PAGES_DEPLOY_HOOK`**。构建时 `closes` 已过的需求视为 Closed：不进列表、不进 sitemap 和 llms.txt，详情页保留但显示 "This need is closed." 并设置 `noindex`。
2. **前端兜底**：卡片和详情页带 `data-closes`，页面加载时如已过期，就隐藏卡片或显示已关闭提示，覆盖两次构建之间的时间差。
3. 卡片显示 "Closes in N days"；7 天内截止的用金色强调。

### 15.4 标题：改成"动词 + 交付物 + 对象/地点"
- 规则：英文，≤ 80 字符，以动词开头；**不能改变需求原意、不能夸大**，不写机构名称。
  - ✅ "Map supply-chain risks for a Western Australian research program"
  - ✅ "Build a data platform with a local council's digital team"
  - ❌ 夸大，例如把研究项目写成 "Lead a statewide transformation"
- Hermes 改写后，把**原标题与新标题对照表**交给 Max 确认，确认后才录入。

### 15.5 跨境贸易 0 条、物流 3 条：允许暂时不达标
- 看板的行业筛选**只显示有需求的行业**，不显示空行业，也不单独做"行业信号"区块。
- 跨境贸易是 DNY 的本行。这一类改由 **Max 提供 2–3 条 Direct need**（来自 DNY 自己的客户和合作方），正好展示 Direct need 的价值。
- 以后每月调研时，跨境贸易和物流增加这些渠道：行业协会、商会、出口和投资促进机构公开的合作需求，以及大学和研究中心的产业合作需求。

### 15.6 `minTier`：现阶段一律 Community
付费档位要等《会员条款》经律师审阅上线（第 11.5 节）后才开放。在那之前，如果设成 Professional，就没人能表达兴趣。**所以现阶段所有需求 `minTier = 'Community'`**，付费档上线后再按需调整。

### 15.7 首批发布和时间
- **先上线页面，再录入需求**：按本设计文档完成 `/opc-fde` 改版（含第 15 节修改）后，再录入 Max 批准的首批需求。
- **截止日期少于 14 天的需求不进首批**（发布后来不及响应）。Hermes 推荐的第 5 条（11 月 19 日截止）如果页面赶不上在 **11 月 5 日**前上线，就换成候选池中排名第 6 的那条。
- 首批建议 5 条 Public opportunity，加上 Max 提供的 2–3 条 Direct need（如有）。
- **首批只发布澳洲的需求**（Max，2026-10-29）。新西兰的 6 条留在候选池里，等奥克兰 Hub 推进后再发布。Hermes 推荐的 5 条里，"新西兰无人机集群" 换成候选池中**排名最高的澳洲需求**，优先选无人机或物流类以保持行业多样；同样遵守"截止日期 ≥ 14 天"的规则。
- 因为首批全是澳洲需求，看板地点只会出现澳洲城市；页面上的 "Australia and New Zealand" 表述保持不变。
- （2026-10-29 校准后作废：「首批至少一条现场需求」「协作机器人码垛替换」「On-site/Hybrid/Remote 说明」三条已取消，见第 16 节。）

## 16. 远程交付模式校准（2026-10-29，取代此前所有和驻场相关的内容）

### 16.1 为什么改
联盟的 OPC 和 FDE 都在澳新以外（中国、东南亚和其他地区），而且目前从零开始招募。FDE 的"forward"指**把方案前置部署到澳新市场**，不是到客户现场。所以：会员远程交付；DNY 作为澳洲的本地伙伴补上会员做不了的部分（需要时签约、本地对接客户、协调采购流程、把控交付）。第 1、4、5、7、8、9、10、11、13 节已逐处改过，**和本节冲突的旧表述一律以本节为准**。

### 16.2 页面最终顺序
1. Hero（4.1）
2. Why Australia and New Zealand（4.2a）
3. How the Alliance works（4.2）
4. Your local partner（4.2b）
5. Two ways to work with a client（4.2c）
6. Open Needs（4.3）
7. Membership（4.4）
8. Partners（4.5）
9. The FDE model（4.6）
10. OPC Hubs（4.7）
11. Who can join（4.8）
12. FAQ（第 9 节）
13. 结尾 CTA（4.10）

导航下拉菜单增加一项 "Your local partner" → `#local`，放在 Overview 之后。

### 16.3 需求筛选标准（Hermes 重新筛候选池）
候选需求要**同时**满足以下条件才能上看板：
1. **核心工作可以由海外团队远程完成**
2. **线下环节只限会议或工作坊**，并且可以线上进行，或由 DNY 在悉尼出席；需要会员到现场的（安装、检测、施工、现场运维等）**一律不上**
3. **招标条款没有限制海外人员或海外数据处理**：逐条查公告里的人员要求（澳洲公民或居民、安全审查）和数据要求（数据必须留在澳洲、不得境外访问）。有任何一项限制的，标 "Excluded — offshore restriction"，不上看板
4. 记录签约方式：要求澳洲主体、ABN 或进入供应商名单的，填 `contracting: 'Through DNY'`；其余填 `'Direct or through DNY'`
5. 截止日期距录入当天 ≥ 14 天
6. 继续沿用第 15.4 节的标题规则、第 15.6 节 `minTier = 'Community'`、只发布澳洲需求

### 16.4 首批
- 原首批 5 条**按 16.3 重新核查**。不满足的，用候选池里满足条件、排名靠前的澳洲需求替换；仍按"每个行业优先一条"保持多样。
- 已取消：协作机器人码垛（现场）。桥梁检测、排污 CCTV 这类现场需求**也不能作为备选**。
- 自动切换规则不变（11-06 前未上线，就按顺序换成下一条），但备选必须满足 16.3。
- 重新核查后，把最终 5 条和备选 3 条的完整字段表（含 `delivery`、`contracting`、限制条款核查结果、原标题与新标题对照）发给 Max 批准，批准后再录入。

### 16.5 不要做
- 不要出现 work rights、visa、relocate、on-site work 等暗示会员需要到澳洲的表述
- 不要把"DNY 可以作为签约方"写成保证；每个项目都以项目协议为准
- 不要发布任何限制海外人员或海外数据处理的需求


## 17. 首发需求来自 DNY 集团自身（2026-10-29，Max 决定；取代第 15.7、16.4 节的首批安排）

### 17.1 决定
- **先不发布外部招标需求**。Hermes 首轮调研的候选池继续留在 Mac 本地，不上网站，以后可作为会员月度简报和发布外部需求时的储备。第 15.1、16.3 节的规则保留，等重新开放外部需求时再用。
- **首发的需求就是 DNY 集团自己的需求**：网站上的 10 个核心 venture 和 Drone & Robotics Components 业务都在澳洲建设中，本身就需要大量能远程交付的 OPC 和 FDE。这些需求真实、可查，也和"会员远程交付、DNY 做本地伙伴"的模式完全一致：**DNY 自己就是客户**。

### 17.2 Open Needs 区块（替换 4.3 的首发内容）
- H2：Open Needs across the DNY group
- Lead：DNY's own ventures and business lines are the first source of work for Alliance members. Each is being built in Australia now — tell us where you can help.
- **卡片 = 每个核心 venture 一张 + Drone & Robotics Components 一张**，数据直接取自 `src/data/ventures.ts`，不另外维护：
  - 标题：venture 名称；状态徽标（沿用 StatusBadge，现在都是 In Development）
  - 一句话：venture 的 `short`
  - "Work areas"：venture 的 `capabilities` 标签
  - 按钮 **Express Interest** → `/opc-fde/join?venture={slug}`；次链接 "About {name}" → venture 页面
- Components 卡片：标题 "Drone & Robotics Components"；一句话用 `/components` 页面已有的描述；Work areas 用该页的四项服务：Component Sourcing、Bulk Supply Enquiries、Compatibility Review、Custom Module Enquiries；链接到 `/components`
- 卡片按现有 venture 分类排列（Trusted & Open AI → Physical Intelligence → Industry Ventures），Components 放在 Physical Intelligence 之后
- 区块底部小字：Specific work packages are scoped with shortlisted members and agreed in a project agreement with DNY. Ventures are at the stage shown by their status label.
- **不要**为任何 venture 编写具体任务、预算或时间表。以后 Max 提供具体需求时，再按第 5 节的数据结构单独加卡片（`source` 新增取值 `'DNY'`，`contracting` 固定为 `'With DNY'`）

### 17.3 签约说明的补充（4.2c）
在 "Two ways to work with a client" 两张卡片下方加一句：
> For work on DNY's own ventures, you contract with DNY directly.

### 17.4 入会申请表（第 7 节）
- 新增字段 **Venture of interest**（可选，下拉）：10 个核心 venture + Drone & Robotics Components + "Not sure yet"；按 URL 参数 `venture` 预选
- 邮件主题带上 venture：`[DNY OPC] Membership application — {tier} — {name} — {venture}`

### 17.5 Venture 页面加入口（全站联动）
每个 `/ventures/{slug}` 页面、在 FAQ 之前加一个小区块：
- 标题：Help build {venture name}
- 一句话：One-person companies and Forward Deployed Entrepreneurs can work on {venture name} remotely through the ANZ OPC + FDE Alliance.
- 按钮 **Express Interest** → `/opc-fde/join?venture={slug}`

`/components` 页面 "Services" 区块下方加一行文字链接："Work with us on components as an Alliance member →" 链接到 `/opc-fde/join?venture=components`。

这样 venture 页面从"展示"变成"入口"，同时回应了 Brief 里"Ventures 缺少合作入口""深度页留不住人"两个问题。

### 17.6 首发时间
- 不再受招标截止日期的限制，**没有 11-06 的硬期限**；第 15.7、16.4 节的首批和自动切换规则暂停。
- `src/data/opc-needs.ts` 照常建立，初始为空。Open Needs 区块首发只显示第 17.2 节的集团卡片。

### 17.7 验收标准（补充第 14 节）
- [ ] Open Needs 显示 11 张卡片（10 个核心 venture + Components），内容全部来自 `ventures.ts` 和 `/components` 现有文案，没有新编写的任务描述
- [ ] 每张卡片的 Express Interest 都能把 venture 带进申请表；邮件主题包含 venture
- [ ] 每个 venture 页面都有 "Help build …" 区块；`/components` 有入会文字链接
- [ ] 页面上没有任何外部招标需求
