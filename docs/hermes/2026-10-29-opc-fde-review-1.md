# /opc-fde 上线验收 · 第 1 轮修改（给 Hermes）

日期：2026-10-29 · 验收：Claude（线上实测 https://dnycrossbordergroup.com/opc-fde，桌面 1440×900 和手机 375×812）· 实施：Hermes

## 0. 总评
文案、页面顺序、会员和合伙人条款、法律说明、远程交付口径、入会表单（字段、venture 预选、需求编号）、venture 页面的 "Help build" 入口、Components 的入会链接，都**和设计文档一致**。全站已没有 "Office + AI Agents" 旧定义，也没有 work rights、visa、vetted 等禁用词，手机端无横向溢出。做得很好。

问题集中在**版面效率**和**一处法律文案**：页面太长（桌面 13,123px，手机 23,858px）、行动按钮不在首屏、Open Needs 太靠后、卡片信息重复。

## 1. 必须修改（P1）

### 1.1 首屏看不到行动按钮
- 现状：Hero 里三个定义框把 "Join for Free / See Open Needs" 推到桌面第 1,012px、手机第 1,275px，**两种设备首屏都看不到按钮**。
- 修改：Hero 只保留 Badge、H1、Lead、两个按钮。三个定义（OPC、FDE、OPC Hub）移到 Hero 下方的**定义条**：桌面三列并排，手机纵向排列；每条只保留术语和一句定义，不再用 "IN PLAIN LANGUAGE" 标签。
- 验收：1440×900 和 375×812 两种视口下，"Join for Free" 都在首屏内。

### 1.2 H1 末行只剩一个词
- 现状：桌面上 "Deliver real projects in Australia and New" / "Zealand"，最后一行只有一个词。
- 修改：给全站 `h1, h2` 加 `text-wrap: balance`（不支持的浏览器会自动忽略，无副作用）。文案不改。

### 1.3 "Work areas" 显示了两遍
- 现状：每张 venture 卡片先用一行文字列出全部 work areas，下面又用标签重复一遍（标签只显示 4 个，和上面的文字还对不上）。
- 修改：**删除文字行（`dl.vcard-meta`），只保留标签**，显示该 venture 的全部 capabilities（最多 5 个）。

### 1.4 引用了还不存在的《会员条款》（法律问题）
- 现状：会员说明写了 "All memberships are subject to the Membership Terms"，但 `/opc-fde/membership-terms` 返回 404。页面在引用一份不存在的条款。
- 修改：会员说明的第一段改为（英文照用）：
  > Membership is granted after a short review against the Alliance's published criteria. Community membership is free. Professional and Premier are open by application; no fees are charged until the Membership Terms are published, and we will give members at least 30 days' notice of any material change to benefits.
- 入会页 `/opc-fde/join` 的说明同步修改：把 "Professional and Premier memberships carry an annual fee, which we share on application." 改为 "Professional and Premier are open by application; no fees are charged until the Membership Terms are published."
- 等条款经律师审阅上线后，再改回"subject to the Membership Terms"并加上链接（设计文档第 11.5 节）。

### 1.5 Open Needs 太靠后、页面太长
- 现状：Open Needs 在桌面第 3,925px（约第 4.4 屏）、手机第 5,580px（约第 7 屏）。整页桌面约 14.5 屏、手机约 29 屏。
- 修改页面顺序（取代设计文档第 16.2 节）：
  1. Hero（含按钮）
  2. 定义条（1.1）
  3. How the Alliance works
  4. **Open Needs across the DNY group**（提前）
  5. **Your local partner**：把原来的 "Your local partner" 和 "Two ways to work with a client" **合并成一个区块**。上面是 4 张本地支持卡片，下面一行并排两种签约方式，再加 "For work on DNY's own ventures, you contract with DNY directly." 一句
  6. Membership
  7. Partners
  8. The FDE model
  9. Why Australia and New Zealand（挪到后面）
  10. OPC Hubs
  11. Who can join
  12. FAQ
  13. 结尾 CTA
- 导航下拉的锚点同步调整：`#contracting` 合并后不再单独存在，原链接指向 `#local`。
- Venture 卡片瘦身：一句话描述最多显示 3 行（`line-clamp: 3`），完整文字在 venture 页面；卡片内只保留：分类、状态、名称、描述、标签、Express Interest 按钮、"About …" 文字链接。
- 验收：桌面整页 ≤ 10,000px，Open Needs 在 2,600px 以内；手机整页 ≤ 17,000px。

### 1.6 Components 卡片
- 现状：状态徽标写 "In Development"，描述用的是面向买家的文案（"Submit your model, part number and quantity…"），放在给会员看的卡片上不合适。
- 修改：徽标改为 **"Business line"**（不用状态徽标）；描述改为 "DNY's sourcing and quotation service for drone and robotics components."

## 2. 建议修改（P2）

### 2.1 How the Alliance works 第 1 步
现在写 "DNY sources and verifies real needs from organisations in Australia and New Zealand."，但首发需求全部来自 DNY 自己。改为：
> **Curate** — DNY sources and verifies real needs, starting with its own ventures and expanding to organisations across Australia and New Zealand.

### 2.2 会员说明的排版
会员卡片下方的 5 段说明（审核、Hub、服务商名录、独立经营者、运营主体）改成带小标题 "Membership notes" 的列表，字号与现在相同，方便快速浏览。**文字内容一字不改。**

## 3. 不要做
- 不要删减或改写第 1.4 节以外的任何法律说明
- 不要为了缩短页面而删掉 FAQ 或合伙人说明
- 不要新增动效

## 4. 验收标准
- [ ] 1440×900 和 375×812 首屏都能看到 "Join for Free"
- [ ] H1 不出现末行单词
- [ ] Venture 卡片的 Work areas 只出现一次（标签）
- [ ] 页面和入会页都不再引用不存在的《会员条款》
- [ ] 页面顺序按 1.5；"Your local partner" 和签约方式合并为一个区块；导航锚点全部可用
- [ ] 桌面整页 ≤ 10,000px、Open Needs 位于 2,600px 内；手机整页 ≤ 17,000px
- [ ] Components 卡片显示 "Business line" 和新描述
- [ ] `npm run build`、`npm run check:links` 通过；完成后附桌面和手机首屏截图汇报
