# 无人机整机询价上线：网站部分（给 Hermes）

日期：2026-11-01 · 设计：Claude · 实施：Hermes · 状态：**待 Max 确认后开工** · 目标：11 月 7 日前上线页面

## 0. 来源和边界
- 依据：Max 的内部文件《DNY Drone Website Update Guide V1.0》（2026-11-01）。
- **该内部文件不要放进仓库。**仓库是公开的，而那份文件里有供应商审核、出口分类筛查和重点复核型号等内部信息。
- 本文档只摘出网站需要改的部分，并按现有网站架构做了调整（见第 1 节）。
- **不在本任务范围：**
  - 后台审核台账、出口分类记录、最终用户资料、权限分级和发货放行。首期由 DNY 人工处理，台账放在仓库以外的地方。
  - 伙伴平台和 Ross 的权限。
  - 具体型号页和在线付款。
- **硬性规则：**任何审核结论、供应商资料或最终用户资料都不能写进仓库，也不能进入静态构建、`catalogue.json`、`llms.txt` 或 Markdown 孪生页。
  - 注意：`components-catalogue.json` 里的 draft 产品虽然不会生成页面，但在 GitHub 上是公开可见的。

## 1. 与内部指导相比的调整

| 内部指导 | 本文档 | 原因 |
|---|---|---|
| 新建 `/drones/construction` 等 | 放在 `/physical-intelligence/drones/` 下面 | 和刚完成的导航层级一致（Physical SI › Drones），不再多出一棵无人机目录 |
| `/drones/enquiry` | `/physical-intelligence/drones/enquiry` | 同上；表单组件和后端复用零部件询价 |
| `/drones/aircraft/[slug]` 型号页 | 本期不建 | 目前没有已确认的型号 |
| 完整的五层审核状态机 | 本期不做，先用人工台账 | 指导自己允许"最低可交付版本"；网站只负责收集询价，不出现报价或付款 |
| 导航里分设 Construction、Agricultural、Inspection、Components 四个入口 | 一级导航和下拉都不加项，只改 Drones 那一行的说明文字；四个方向放在无人机主页 | 下拉菜单已经是两栏，再加会太挤 |

## 2. 路由

| 路由 | 处理 |
|---|---|
| `/physical-intelligence/drones` | 改造为无人机业务主入口（第 4.1 节） |
| `/physical-intelligence/drones/construction` | 新增（第 4.2 节） |
| `/physical-intelligence/drones/agriculture` | 新增（第 4.2 节） |
| `/physical-intelligence/drones/inspection` | 新增（第 4.2 节） |
| `/physical-intelligence/drones/enquiry` | 新增：整机询价（第 5 节） |
| `/components` 及子页面、产品页 | 网址不变，只改文案（第 6 节） |
| `/ventures/dny-aerial-systems` | 更新（第 7 节） |

- **面包屑：**Home › Physical SI › Drones › Construction Drones，其余页面同理。
- **导航：**Physical SI 下拉里 Drones 一行的说明改为 "Construction, agriculture and inspection"，其他不变。

## 3. 全部新文案的通用规则
- 不使用破折号 "—"。
- 不写任何品牌型号、库存、价格、交期或折扣。
- **禁用词：**Approved in Australia、CASA approved、Unrestricted export、Authorised distributor、in stock、available now。
- 不暗示 DNY 提供飞行演示、测绘、巡检作业、农业喷洒、培训、维护或系统集成服务。
- **图片：**可以用有授权的图库实拍照片（如 Pexels），但画面里不能出现可辨认的无人机品牌标识。来源写进 `CREDITS.md`。找不到合适的照片就不放图，不要用插画充数。
- **按钮：**新的按钮文字加进 `check-links.mjs` 的白名单，包括 "Request an Aircraft Quote"、"Browse Drone Components"，以及第 4 节用到的其他按钮。

## 4. 页面文案

### 4.1 `/physical-intelligence/drones`（无人机主入口）
- **Title：**Commercial Drones and Components | DNY Cross Border Group
- **Description：**Commercial aircraft and components for construction, agriculture and inspection. Tell us your application and we confirm availability and supply requirements before a written quote.
- **Badge：**Drones
- **H1：**Drones for Construction, Agriculture and Inspection
- **Lead：**Explore commercial aircraft and components for construction, agriculture and infrastructure inspection. Tell us your application, required configuration and delivery location. We review suitable options and confirm availability and supply requirements before issuing a written quote.
- **按钮：**主按钮 Request an Aircraft Quote → `/physical-intelligence/drones/enquiry`；次按钮 Browse Drone Components → `/components/drones`

**区块 1：四个方向的卡片**（整张卡片可以点击）

| 卡片 | 链接 | 文字 |
|---|---|---|
| Construction Drones | `/construction` | Site mapping, photogrammetry, progress imagery, roof assessment and building inspection. |
| Agricultural Drones | `/agriculture` | Crop monitoring, field mapping, spraying and spreading. |
| Inspection Drones | `/inspection` | Solar assets, utilities, pipelines, bridges and industrial facilities. |
| Drone Components | `/components/drones` | Replacement propellers, airframe parts, mounts, cases and KST servos. |

**区块 2：How enquiries work**（三步）
1. **Tell us your application.** Application, configuration, quantity and delivery location.
2. **We review.** Suitable aircraft and payloads, and the export, import and product requirements that apply.
3. **Written quote.** Price, configuration and delivery are confirmed in writing. Nothing is confirmed before then.

**区块 3：范围说明**（用现有的 `sep-box` 样式，文字照搬第 4.3 节）

**区块 4：Future Direction**（放在页面靠后位置，不设任何按钮）
- Kicker：Future Direction
- 标题：Where Physical SI fits
- 文字：Over time, DNY aims to connect aerial data to trusted records, so that what a drone captures can be verified and audited. This is a long-term direction under Physical Super Intelligence (SI). It is not a service DNY offers today.

**删除：**
- "DNY is not a drone company…" 区块
- "From flight to verified report" 区块
- "What Air Intelligence covers" 能力区块
- 主按钮 "Discuss a drone programme"
- 底部 CTA "Plan a governed drone programme"

**底部 CTA：**
- 标题：Tell us what you need to fly
- 文字：Share your application, configuration and delivery location.
- 主按钮：Request an Aircraft Quote
- 次按钮：Browse Drone Components

**bounds（页面上的说明条目）替换为：**
- Aircraft enquiries are open. Specific models, supplier arrangements and delivery terms are confirmed after review.
- DNY does not provide flight demonstrations, surveying, inspection operations or agricultural spraying services.
- Operators are responsible for the qualifications, registrations and approvals their activities require, including Civil Aviation Safety Authority (CASA) requirements.
- DNY does not manufacture aircraft.

"Parts for drones" 区块保留。

### 4.2 三个行业页（结构相同）

每页依次包含：H1、Lead、Typical applications 列表、What to include in your enquiry 列表、第 4.3 节的范围说明、按钮。

- **按钮：**Request an Aircraft Quote → `/physical-intelligence/drones/enquiry?application={construction|agriculture|inspection}`，进入表单后预先选好应用类型。
- **次链接：**Browse Drone Components

**Construction Drones**
- Title：Construction Drones | DNY Cross Border Group
- Lead：Explore aircraft and payload options for site mapping, photogrammetry, progress imagery, roof assessment and building inspection. Share your site environment, required outputs and preferred configuration so we can review suitable equipment.
- Typical applications：Site mapping and 3D models · Progress imagery · Roof and facade assessment · Building inspection
- What to include：Site environment · Required outputs (maps, models or imagery) · Preferred payload or camera · Quantity and delivery location

**Agricultural Drones**
- Title：Agricultural Drones | DNY Cross Border Group
- Lead：Explore aircraft for crop monitoring, field mapping, spraying and spreading applications. Tell us your intended use, required tank or hopper capacity and delivery location. Aircraft specifications, payloads and supply requirements are reviewed for each enquiry.
- Typical applications：Crop monitoring · Field mapping · Spraying · Spreading
- What to include：Intended use · Required tank or hopper capacity · Field size and terrain · Quantity and delivery location

**Inspection Drones**
- Title：Inspection Drones | DNY Cross Border Group
- Lead：Explore aircraft and payload options for solar assets, utilities, pipelines, bridges and industrial facilities. We review equipment options against your intended application, imaging needs and operating environment.
- Typical applications：Solar assets · Power and utilities · Pipelines · Bridges · Industrial facilities
- What to include：Asset type · Imaging needs (visual, thermal or other) · Operating environment · Quantity and delivery location

### 4.3 范围说明（三个行业页、主入口和询价页共用，逐字使用）
> DNY currently handles equipment sourcing and sales enquiries. We do not provide flight demonstrations, surveying, inspection operations or agricultural spraying services. Operators are responsible for obtaining the qualifications, registrations and approvals required for their activities.
>
> Product listings are invitations to enquire. Availability, configuration, price and delivery are confirmed in writing after review of applicable export, import and product requirements.

## 5. 整机询价 `/physical-intelligence/drones/enquiry`

- **Title：**Request an Aircraft Quote | DNY Cross Border Group
- **H1：**Request an Aircraft Quote
- **表单上方提示：**This form is for aircraft and component enquiries. Please do not use it to book flight demonstrations, surveying, inspection operations or spraying services.
- **后端：**复用零部件询价的后端（D1 记录、唯一编号、通知邮件、`/admin` 查看）。
  - 新增类型 `aircraft`，编号前缀和零部件区分开。
  - 通知邮件标题注明 `[Aircraft]`。
  - 后端校验字段，前端提交的隐藏字段不能改变任何状态。
  - 通知发送失败可以重试，不会重复建单。

**首轮字段**（\* 为必填）

| 字段 | 说明 |
|---|---|
| Name\*、Email\* | 和零部件表单相同 |
| Buying as\* | Business / Individual；选 Business 时显示 Organisation |
| Country\*、Delivery region or postcode\* | 国家列表复用 `COUNTRIES` |
| Application\* | Construction / Agriculture / Inspection / Other；可以由网址参数预先选好 |
| Model or requirement\* | 文本框：指定型号，或者描述需求 |
| Configuration and payload | 文本框 |
| Quantity\* | 数字 |
| Operating environment | 文本框 |
| Endurance preference | 文本框 |
| Tank or hopper capacity | 只在选 Agriculture 时显示 |
| Intended use\* | 文本框 |
| Country of use\* | 下拉 |
| Your role\* | End user / Reseller / Integrator / Other |
| Needed by | 日期 |
| Notes、Attachments | 和零部件表单的限制相同 |
| Marketing opt-in | 单独勾选，默认不勾 |

**不收集：**最终用户的证件、地址，以及交易链资料。这些在报价前由 DNY 人工单独收集，不经过网站。

**提交成功后显示：**We have received your enquiry {reference}. Our team will review the equipment requirements and contact you if further information is needed. This acknowledgement is not a quote, order acceptance or confirmation of export eligibility.

**不出现：**价格、付款、交期、"已合规"之类的勾选项。

**Agent 接口：**本期不通过 openapi 开放整机询价，openapi 只同步第 6 节的文字。

## 6. 零部件页面

- **`/components` 导语：**把 "We do not sell complete drones; models are used only to identify the right part." 换成：
  > This catalogue covers drone and robotics components. For complete aircraft, explore our construction, agriculture and inspection drone pages. Components are matched to the exact model and part number and quoted after review.

  "drone pages" 链接到 `/physical-intelligence/drones`。全站其他 "no complete drones are sold" 的说法同步删除，包括 `llms.txt`、`catalogue.json` 的 scope、FAQ 和 openapi 描述。
- **`/components/products/replacement-propellers`** 加一段：
  > Please provide the exact part number, material, dimensions and details of any variable-pitch mechanism. We review these specifications and applicable supply requirements before confirming a quote. Model compatibility alone does not confirm export eligibility.

  页面上如果有用"不含电气部件"之类说法当作合规依据的句子，一并删除。
- **`/components/products/kst-fz-series-servos`** 加一段：
  > FZ series enquiries are reviewed by exact model, configuration and intended use. Manufacturer documentation and export classification are checked before a supply commitment is made.
- **KST 品牌说明保持不变。**现有写法已经声明 DNY 不是授权经销商，除非报价里写明。

## 7. DNY Aerial Systems（`ventures.ts` 和 `src/legacy/dny-aerial-systems.html`）
- **short：**Commercial aircraft and components for construction, agriculture and inspection. Equipment sourcing and sales enquiries are reviewed by model, configuration and destination.
- **状态：**保持 In Development，旁边加一个标签 "Aircraft enquiries open"（新增一个 `statusNote` 字段，不要改成 Operating 或 Pilot）。
- **capabilities：**Construction drones · Agricultural drones · Inspection drones · Drone components · Supplier warranty coordination
- **relation：**Aircraft and components are sourced on a multi-vendor basis. Connecting aerial data to trusted records is a long-term direction under Physical SI, not a current service.
- **项目页正文：**
  - **Overview：**DNY Aerial Systems is the group's commercial drone business. Aircraft enquiries are open. Specific models, supplier arrangements and delivery terms are confirmed after review. Operational drone services are not currently offered.
  - **What we handle now**（替换 "Intended services"）：
    - Equipment sourcing and sales enquiries for construction, agriculture and inspection aircraft
    - Drone components and KST servos
    - Product selection, documentation, and coordination of supplier warranty under the actual seller's terms
  - **Not offered：**
    - Flight demonstrations, surveying, inspection operations or agricultural spraying
    - Training, maintenance or systems integration services
  - **Future direction：**Connecting aerial data to trusted records under Physical SI. Planned, not offered today. 原来的 "From flight to verified report" 三步区块删除，或者整体移到这个标题下面，并且不放按钮。
  - **Status 段落**保留现有措辞。
  - 加按钮 Request an Aircraft Quote。

## 8. 其他需要同步的地方
- **首页：**无人机项目卡片和配件区块的文字，改为同时提到整机和零部件；删除任何暗示提供飞行作业的说法。
- **FAQ：**
  - 替换 "Does DNY sell complete drones?"
  - 新增 "Does DNY provide surveying, inspection or spraying services?" 和 "Can every listed component be exported?"
  - 三条的答案逐字照内部指导第六节，原文如下：
    - Does DNY sell complete drones? DNY accepts enquiries for complete aircraft for construction, agriculture and inspection, alongside components. Supply is confirmed by model, configuration, destination and intended use after review.
    - Does DNY provide surveying, inspection or spraying services? No. DNY currently handles equipment sourcing and sales enquiries. We do not provide flight demonstrations, surveying, inspection operations or agricultural spraying services.
    - Can every listed component be exported? Not necessarily. A listing does not confirm export eligibility. We review the exact model, technical specifications, destination and intended use before confirming supply.
  - "What is DNY Aerial Systems?" 的答案改用第 7 节的 Overview。
  - FAQ 结构化数据同步更新。
- **`/facts`：**业务范围同步，日期改为发布日。
- **其他页面：**`/physical-intelligence` 总览、`/ventures`、`/investors`、项目卡片、底部推荐，检查有没有和新范围矛盾的说法（例如 DNY 做巡检、出报告或系统集成）。
- **隐私政策**（需 Max 确认后再上线这一段）：在收集的信息里加上整机询价字段（intended use、country of use、your role），并加一句：
  > For complete aircraft, a manufacturer or exporter may need details of the buyer, end user, country of use and intended use before supply can be confirmed. We ask for these details when preparing a formal quote and share them only with your agreement.
- **`llms.txt`、`llms-full.txt`、Markdown 孪生页、sitemap、OG 图**全部同步。

## 9. 防止回退
在 `check-links.mjs` 里加禁用短语检查（不区分大小写），出现以下任何一个就报错：
- "do not sell complete drones"
- "no complete drones"
- "CASA approved"
- "Unrestricted export"
- "Authorised distributor"
- "Approved in Australia"

例外：KST 品牌说明里的 "authorised distributor unless a quote states so" 加 `data-dash-ok` 式的白名单标记，或者只在这一处放行。

## 10. 验收标准
- [ ] 第 2 节的新网址全部返回 200，所有旧网址不变。面包屑和导航高亮正确。
- [ ] 主入口、三个行业页、询价页、项目页、FAQ、`/facts` 和 `llms.txt` 对业务范围的说法一致，没有任何页面暗示 DNY 提供飞行、测绘、巡检、喷洒、培训、维护或集成服务。
- [ ] 不出现型号、库存、价格、交期，也不出现第 9 节的禁用词。
- [ ] 整机表单：从行业页进入时应用类型已预先选好；只有选 Agriculture 才显示容量字段；提交后显示编号和第 5 节的确认文字；通知邮件标题带 `[Aircraft]`；`/admin` 能看到并区分整机和零部件询价。
- [ ] 零部件表单、产品页和询价篮功能不受影响。
- [ ] 桨叶页和 FZ 页的补充段落已上线。
- [ ] 仓库里没有新增任何供应商资料、审核结论或最终用户资料。
- [ ] 手机 390px 下表单可以正常填写和提交。
- [ ] `npm run check:links` 通过（包括破折号检查和禁用短语检查）。
- [ ] 汇报附上主入口、一个行业页、询价页（桌面和手机）和项目页的截图。
