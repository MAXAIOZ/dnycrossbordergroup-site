# 新增 Venture：DNY Cultural Heritage Exchange（给 Hermes）

日期：2026-11-01（同日修订为 v3）· 设计：Claude · 实施：Hermes · 状态：**待 Max 确认后开工**

> **v3 修订：**对照澳洲法律法规逐句检查了公开文案（对照表见第 1.1 节），改了这几处：
> - "按成本收费"写成可以核验的定义（第三方费用不加价，DNY 人工按成本计算并事先报价，另加适用的 GST）。
> - 新增署名原则（对应《版权法》的作者署名权）。
> - 绝对化的承诺改成"我们不做什么"的写法。
> - 边界条款里加了"不提供移民建议"。

> **v2 修订（Max 的意见）**
> - 不局限于"双向交流"：任何需要帮助推广的非遗和传统文化都可以，不限来源地和目的地。
> - 不写任何会带来法律责任或敏感的内容，因此去掉了"从中国项目开始"，也去掉了 DNY 对守法合规作出保证的说法。
> - 明确"基础阶段不盈利，形成文创产品等商业收入后才启动收益分配"。
> - 注意：网站上**不用 "non-profit" 或 "not-for-profit" 这两个词**，原因见第 1 节。

## 0. 来源和边界
- 依据：Max 的内部文件《DNY OPC & FDE 非遗与文化出海专项项目池管理办法 V1.0》，加上 Max 的补充意见。
- **内部文件不要放进仓库。**网站只用第 3 节的公开文案。
- 本期只新增 venture 页面、卡片和两条 FAQ，不新增表单和后端。

## 1. "非盈利"的写法
- 在澳洲，"non-profit" 或 "not-for-profit" 指的是一种法律身份：组织章程禁止向股东分配利润，通常还要在澳洲慈善和非营利组织委员会（ACNC）注册。
- 这个 venture 由 DNY Cross Border Group Pty Ltd 运营，而 Pty Ltd 是营利公司，后续还会有收益分配。直接写 "non-profit" 可能被认定为误导性陈述（《澳大利亚消费者法》第 18 条），也会让人误以为可以捐款或享有免税。
- **所以网站写事实，不写身份：**
  - 基础阶段 DNY 不取利润，费用按实际成本收取。
  - 形成商业收入后，按单独的书面协议分配收益。
  - 同时写明这个 venture 不是注册慈善机构，不接受捐款。
- 如果以后确实要做成法律意义上的非盈利组织，需要另设实体（例如担保有限公司），并在 ACNC 注册。届时再改文案。

## 2. 在网站上的位置
加在 `ventures.ts` 的 Industry Ventures 分类下，排在 Evsider 之后：

```ts
{
  slug: 'cultural-heritage-exchange',
  name: 'DNY Cultural Heritage Exchange',
  short: 'A cross-border venture that helps living cultural heritage and traditional craft, from anywhere, reach new audiences around the world. DNY takes no profit from the base work; revenue sharing starts only if a project later earns commercial income.',
  category: 'Industry Ventures',
  builtOn: 'Industry deployment: Cross-border Trade',
  industries: ['Cross-border Trade'],
  status: 'In Development',
  capabilities: ['Documentation and translation', 'Digital presentation', 'Exhibitions and events', 'Partners and channels'],
  tech: ['Trusted data', 'AI agents'],
  relation: 'Provenance, rights and permission records are kept as trusted data. OPC members connect venues, partners and channels; FDE members build digital exhibitions, multilingual content and agent tools.',
}
```

- **venture 数量从 10 变成 11。**用 `VENTURE_COUNT_*` 的地方会自动更新。另外：
  - 检查有没有把 "ten" 写死的地方。
  - `architecture.ts` 第 22 行列举的业务里加上 "cultural heritage"。
- **入口：**
  - Open Needs 出现这张 venture 卡片。
  - 申请表的 "Venture of interest" 和联系表单的 interest 选项都能选到它，`?venture=cultural-heritage-exchange` 可以预先选中。
- **`/industries`：**在 Future Verticals 里加 "Culture and creative industries" 并链接到本页。现有数据结构不支持的话跳过，在汇报里说明。

## 3. Venture 页面正文（`src/legacy/cultural-heritage-exchange.html` 加 meta.json）

- **Title：**DNY Cultural Heritage Exchange | DNY Cross Border Group
- **Description：**Helping living cultural heritage and traditional craft from anywhere reach new audiences. No profit from the base work; revenue sharing only if a project later earns commercial income.

### 3.1 Overview
DNY Cultural Heritage Exchange is a cross-border venture for living cultural heritage: traditional crafts, skills, performing arts, food traditions and local cultures that deserve a wider audience. Any heritage that needs help to be seen and understood can be considered, wherever it comes from and wherever its audience is. Australia and New Zealand are our base.

Every project starts with the same questions: who holds this heritage, who holds the rights, and what have they agreed to.

### 3.2 No profit from the base work（用醒目的 `sep-box` 样式，放在 Overview 之后）
In the base stage, DNY takes no profit. Documentation, translation, digital content, exhibitions and logistics are budgeted in advance and charged at cost. If a project later earns commercial income, for example from cultural products, licensing or ticketed events, revenue sharing is agreed in a separate written agreement with the heritage holders and partners involved.

小字：DNY Cultural Heritage Exchange is a venture of DNY Cross Border Group Pty Ltd. It is not a registered charity and does not seek donations.

### 3.3 Whose heritage（三张卡片）
- **Heritage from around the world：**Traditional crafts, skills, performing arts and local cultures from any country.
- **First Nations cultures：**Only led by, or in partnership with, First Nations communities and organisations, under their cultural protocols and with their free, prior and informed consent. DNY does not create, commission or sell work in a First Nations style.
- **Community traditions：**The heritage carried by multicultural communities in Australia and New Zealand.

### 3.4 What we help with
- **Documentation and translation：**Records, stories and materials prepared in the languages an audience needs.
- **Digital presentation：**Digital exhibitions, websites, multilingual content and AI agents.
- **Exhibitions and events：**Showcases with venues, festivals and institutions.
- **Partners and channels：**Introductions to institutions, retailers and licensing partners.
- **Cultural products and licensing：**Only at the commercial stage, under a separate written agreement.

### 3.5 Who it is for（三列）
- **Heritage holders and makers：**Craft makers, performers, cultural organisations and communities looking for a credible route to new audiences.
- **Venues and institutions：**Galleries, museums, libraries, festivals, councils and universities looking for well-documented cultural programmes.
- **Retailers and licensing partners：**Cultural products and licensed designs with clear provenance.

### 3.6 How a project moves（六步，用现有 steps 样式）
1. **Candidate.** Basic materials are collected. It is not yet a project.
2. **Rights and consent.** The holder's identity, cultural standing and permissions are reviewed.
3. **Project plan.** Audience, budget, partners and delivery are agreed.
4. **Showcase.** An exhibition, event or digital presentation with real audiences.
5. **Commercial.** Products, licensing or channel sales, only under a separate written agreement.
6. **Long term.** Stable partners and repeatable programmes.

### 3.7 How we work（列表）
- **Rights and consent first.** We work only with material its holders have documented permission to share, for the country, channel, purpose and term involved.
- **Claims we can verify.** Titles such as a heritage listing or a recognised inheritor are used only with verifiable evidence.
- **Described as made.** Products say who made them, where and how.
- **Some knowledge stays private.** Sacred, secret or restricted cultural knowledge is never published.
- **Culture, not politics.** Projects present culture. They are not used to promote any government, political position or religious belief.

### 3.8 Boundaries（小字列表，放在 Status 之前）
- Heritage holders and project partners are responsible for the rights and permissions they grant and for the accuracy of the information they provide.
- Each exhibition, import or sale is subject to the laws of the places involved.
- No project, community, artist, institution or product is named on this site until rights, consent and claims are verified.
- DNY does not provide legal, tax or migration advice.

### 3.9 How OPC + FDE members help
- **OPC：**Venues, festivals, institutions, retail and licensing partners, and audience development.
- **FDE：**Digital exhibitions, multilingual content, AI agents, websites and provenance records.

沿用现有的 "Help build DNY Cultural Heritage Exchange" 区块。

### 3.10 Status
DNY Cultural Heritage Exchange is in development. The first projects are under review. Nothing on this page is an offer of securities, a commitment to supply or a request for donations.

**按钮：**主按钮 "Partner with DNY" → `/contact?type=partnership&venture=cultural-heritage-exchange`；次按钮沿用 venture 页现有的 Join 入口。不新增按钮文字。

## 4. FAQ（ventures 组新增两条）
- **Q：**Is DNY Cultural Heritage Exchange a charity?
  **A：**No. It is a venture of DNY Cross Border Group Pty Ltd and does not seek donations. DNY takes no profit from the base work of a project. Revenue sharing applies only if a project later earns commercial income, under a separate written agreement.
- **Q：**Does DNY work with First Nations cultures?
  **A：**Only led by, or in partnership with, First Nations communities and organisations, under their cultural protocols and with their free, prior and informed consent. DNY does not create, commission or sell work in a First Nations style.

## 5. 图片和文案规则
- 本期不放任何文化作品、手工艺品或人物的照片。
- 不用原住民风格的图案、点画、纹样或配色，也不用任何可辨认的他国文化符号作装饰。
- 不使用破折号 "—"。
- **不写：**
  - "non-profit"、"not-for-profit"、"donate"、"donation"（第 3.2 节和 FAQ 里否定式的 "does not seek donations" 除外）
  - 国家级、省级、官方、政府支持、UNESCO 认定之类的说法
  - 任何具体国家作为重点或起点
  - 任何具体项目、人名、社区名或机构名
  - 任何政治或宗教内容
- **术语：**用 "First Nations"、"Aboriginal and Torres Strait Islander"，不用 "Aborigines"、"native"。

## 6. 同步
- `llms.txt`、`llms-full.txt`、`ventures.json`、Markdown 孪生页、sitemap、OG 图。
- `/facts` 里的 venture 数量和列表。
- FAQ 结构化数据。

## 7. 验收
- [ ] `/ventures/cultural-heritage-exchange` 返回 200；卡片出现在 `/ventures` 的 Industry Ventures 分类和 Open Needs 里；venture 数量显示为 Eleven/eleven。
- [ ] 申请表和联系表单都能通过 `?venture=cultural-heritage-exchange` 预先选中。
- [ ] 正文和 FAQ 与第 3、4 节逐字一致；第 5 节列出的说法一个都没有。
- [ ] 第 3.2 节的不盈利说明和"不是注册慈善机构"那行小字在页面上清楚可见。
- [ ] 没有文化作品图片，也没有原住民风格的装饰。
- [ ] `npm run check:links` 通过。
- [ ] 汇报附上桌面和手机的页面截图，以及 `/ventures` 列表截图。
