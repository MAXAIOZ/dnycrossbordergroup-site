# 无人机整机询价：网站部分交付报告

日期：2026-11-01 · 实施：Hermes · 依据：`docs/hermes/2026-11-01-drone-aircraft-enquiries.md`（设计：Claude，Max 已确认）
状态：**已上线**

## 1. 上线位置与提交

- 站点：dnycrossbordergroup.com（Cloudflare Pages，push main 自动构建）
- 提交：`cd678ba`（页面、后端、文案、检查脚本）＋ 本报告与截图的文档提交
- 部署验证：新路由全部 200，旧路由不变

| 路由 | 状态 |
|---|---|
| `/physical-intelligence/drones` | 200，改造为主入口 |
| `/physical-intelligence/drones/construction` | 200 |
| `/physical-intelligence/drones/agriculture` | 200 |
| `/physical-intelligence/drones/inspection` | 200 |
| `/physical-intelligence/drones/enquiry` | 200 |
| `/ventures/dny-aerial-systems` | 200 |
| `/components`、`/components/drones`、两个产品页、`/facts`、`/faq`、`/privacy` | 200 |

面包屑：Home › Physical SI › Drones › Construction Drones（三个行业页和询价页都是四级）。导航里 Drones 一行说明改为 "Construction, agriculture and inspection"，一级导航和下拉结构未动。

## 2. 主入口与行业页

主入口按第 4.1 节重写：新 Title / Description / Badge / H1 / Lead，主次按钮为 Request an Aircraft Quote 与 Browse Drone Components；区块顺序是四个方向卡片（可点）→ 三步流程 → 范围说明 → Future Direction（无按钮）；bounds 换成第 4.1 节的四条；"Parts for drones" 区块保留；底部 CTA 换成 "Tell us what you need to fly"。删掉了 "DNY is not a drone company"、"From flight to verified report"、"What Air Intelligence covers"、旧主按钮和旧底部 CTA。

三个行业页共用同一套结构（H1、Lead、Typical applications、What to include、范围说明、按钮），按钮带 `?application=construction|agriculture|inspection`，进入表单后应用类型已预选（实测 `Agriculture` 自动选中）。

范围说明只用一份常量（`src/data/drone-industries.ts` 的 `SCOPE_NOTE`），主入口、三个行业页、询价页、llms 都从这里取，不存在四份文案各自漂移的可能。

## 3. 整机询价

新端点 `POST /api/aircraft-enquiries`，与零部件共用 D1、编号、通知邮件和 `/admin`：

- 编号前缀 `DNY-A-`，与零部件 `DNY-Q-` 区分
- 记录写 `enquiries.kind = 'aircraft'`，整机字段进新表 `enquiry_aircraft`（首次访问自动建表，`kind` 列用可重复执行的 ALTER 迁移，重复列错误被吞掉）
- 通知邮件标题 `[Aircraft] New enquiry …`，正文按整机字段排列，Reply-To 是申请人
- 校验全在服务端：buying_as 必须是 Business/Individual，Business 必须有 organisation，application 必须是四个值之一，role 必须是四个值之一，quantity 1 到 9999；tank 字段只在 Agriculture 时保留，其它情况服务器直接丢弃，前端隐藏字段改不了任何状态
- 限流和附件限制与零部件一致（同 IP 十分钟 5 次，5 个文件 × 5 MB，magic bytes 检查）

首轮字段按第 5 节实现，共 21 个控件。Buying as 选 Business 才出现 Organisation；Application 选 Agriculture 才出现 Tank or hopper capacity；Marketing 单独勾选、默认不勾。不收集证件、地址和交易链资料。

实测（生产站真实提交）：

- 提交成功，页面显示 `We have received your enquiry DNY-A-261031-D6SY5F.` 加第 5 节确认文字
- info@ 收到 `[Aircraft] New enquiry DNY-A-261031-D6SY5F`，正文含 Buying as（Business (DNY Test Organisation)）、Application、Model or requirement、Configuration and payload、Quantity、Operating environment、Endurance、Tank、Intended use、Country of use、Buyer role、Notes
- `/api/aircraft-enquiries` 的 GET 返回 404（与本项目 `/api/enquiries` 一致，只有 POST 存在），POST 缺字段时返回字段级错误

**`/admin` 需要 Cloudflare Access，我没有登录态，因此"后台能看到并区分整机与零件"这一条只验证到代码与数据层**：列表 SQL 已带 `e.kind`，页面新增 Type 列（Aircraft / Parts），详情页在 `kind === 'aircraft'` 时渲染整机字段表而不是 Lines 表；通知邮件本身是从 D1 读回该行才发出的，说明记录已落库。请 Max 打开 `/admin/enquiries` 点一下确认。

## 4. 文案与页面同步

- `/components` 导语换成第 6 节文字，链到无人机主入口；全站 "no complete drones" / "do not sell complete drones" 清零（源码、`llms.txt`、`llms-full.txt`、`catalogue.json` 的 scope、FAQ、openapi 描述都改过）
- 桨叶页和 FZ 页各加一段"报价前说明"（`note` 字段，页面渲染成 Before a quote 提示块）
- DNY Aerial Systems：short / capabilities / relation 按第 7 节改写，状态仍是 In Development，另加 `statusNote: 'Aircraft enquiries open'`，卡片和详情页都显示这个标签；项目页换成 Overview（原样）、What we handle now、Not offered、Future direction（原三步区块移到这里，措辞改为 would，注明 Planned, not offered today）、保留 Status 段落、加 Request an Aircraft Quote 按钮
- FAQ：`Does DNY sell complete drones?` 换成第 8 节答案并移除旧否定句；新增 `Does DNY provide surveying, inspection or spraying services?`；`Can every listed component be exported?` 放进零部件组；`What is DNY Aerial Systems?` 改成新 Overview。FAQPage 结构化数据由同一份数据生成
- `/facts`：venture 摘要随数据更新，日期 2026-11-01
- 首页与 `/physical-intelligence` 总览的配件区块改为同时提到整机和零部件；Physical SI 子层卡片从 "Air Intelligence / 自主巡检测绘" 改为 "Drones / Construction, Agriculture and Inspection"，不再暗示 DNY 做巡检
- `/privacy`：新增 Aircraft enquiries 一类信息，并加一句"For complete aircraft, a manufacturer or exporter may need details of the buyer, end user, country of use and intended use before supply is confirmed… We ask for these details when preparing a formal quote and share them only with your agreement."

全站扫描：没有任何页面暗示 DNY 提供飞行、测绘、巡检、喷洒、培训、维护或集成服务；"inspection operations" 的所有出现都在否定句里，"systems integration services" 只出现在 Not offered 列表。

## 5. KST：我的建议与做法（需要 Max 确认一句）

现状：没有正式合作关系，但网站列了 15 个 KST 系列和型号。我的处理是**不下架，但把关系描述降级为"询价制、非关联"**：

- 品牌说明从 "DNY sources KST servos through its working relationship with the manufacturer" 改为 "DNY is not affiliated with, endorsed by or an authorised distributor of KST unless a quote states so. Listings are invitations to enquire."
- 主入口的配件卡片不再点 KST 名字（改成"...and servos"），品牌名只出现在零部件页和产品页，属于指明商品的合理使用
- FZ 页新增段落：按型号、配置、用途审核，报价前核对厂家文件和出口分类

理由：整站模式是"列清单、询价、审核后书面报价"，下架会让一个合法采购品类凭空消失、也会打断现有链接；但"有工作关系"这句话在无合作协议时不能留。如果 Max 更希望彻底下架，一条命令就能把 KST 相关产品转成 `publication_status: draft`（页面、搜索、sitemap、询价白名单会同时消失）。

隐私政策按 Max 要求没有指明任何国家的制造商或出口商，只写 "a manufacturer or exporter"。

## 6. 防止回退

`check-links.mjs` 新增禁用短语检查（不区分大小写）：`do not sell complete drones`、`no complete drones`、`casa approved`、`unrestricted export`、`authorised distributor`、`approved in australia`。KST 品牌说明那句 "unless a quote states so" 用它自己的 `data-ban-ok` 豁免，不放开全局。新按钮（Request an Aircraft Quote、Browse Drone Components、Explore Drones、Submit Aircraft Enquiry、Back to Drones）已进白名单。

`npm run build` 通过，`npm run check:links` 输出 `76 pages checked, 0 problem(s)`。

## 7. 验收对照（第 10 节）

| 项 | 结果 |
|---|---|
| 新网址 200、旧网址不变 | 通过（见第 1 节表） |
| 面包屑与导航高亮 | 通过，四级面包屑；Drones 说明文字已改 |
| 各页对业务范围说法一致 | 通过，范围说明单一来源 |
| 不暗示提供飞行/测绘/巡检/喷洒/培训/维护/集成 | 通过，全站扫描仅剩否定句 |
| 无型号、库存、价格、交期，无第 9 节禁用词 | 通过，禁用词检查进构建 |
| 整机表单预选、条件字段、提交编号与确认文字 | 通过（实测 DNY-A-261031-D6SY5F） |
| 通知邮件 `[Aircraft]` | 通过 |
| `/admin` 区分整机与零件 | 代码与数据层已就绪，**需 Max 打开页面点一次确认** |
| 零部件表单、产品页、询价篮不受影响 | 通过：`/api/enquiries` 仍在（字段校验正常返回），产品页与 catalogue 全 200，37 个产品全部 published |
| 桨叶页与 FZ 页段落 | 通过 |
| 仓库无供应商资料/审核结论/最终用户资料 | 通过：本次只加公开文案、类型定义和接口字段，未引入任何型号库、供应商名或审核记录 |
| 390px 表单可用 | 通过，单列、无横向溢出（溢出值 0），提交按钮可达 |
| `npm run check:links` | 通过 |
| 汇报附截图 | 见 `docs/hermes/2026-11-01-drones/screenshots/`：主入口、行业页、询价页（桌面与手机）、项目页 |

## 8. 留给 Max / Claude 的三件小事

1. `/admin/enquiries` 点一次，确认整机与零件能看到并区分（我没有 Access 登录态）。
2. KST 是否维持"列清单＋非关联声明"，还是彻底下架。
3. 编号日期取的是 UTC，澳洲时间上午 9 点前生成的编号会是前一天；如果希望编号按悉尼日期，我改一行即可。
