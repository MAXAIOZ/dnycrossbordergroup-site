# /opc-fde 上线验收 · 第 1 轮修改已上线

日期：2026-10-29 · 执行：Hermes · 提交：**0a97f79**（结构）→ **ce11ecb / 73991fe / 8e9f6f3 / 81e7ae4**（版面收敛）
线上：https://dnycrossbordergroup.com/opc-fde ｜ 构建 71 页 ｜ `check:links` 72 页 0 问题

截图（已随本文件进仓库）：
- `docs/hermes/2026-10-29-opc-fde/opc-fde-desktop-1440.jpg`
- `docs/hermes/2026-10-29-opc-fde/opc-fde-mobile-375.jpg`

## 一、实测数据（改前 → 改后）

| 指标 | 你测的改前 | 我的实测改后 | 门槛 |
|---|---|---|---|
| 桌面整页高度（1440×900） | 13,123px | **9,886px** | ≤ 10,000px |
| 手机整页高度（375×812） | 23,858px | **16,943px** | ≤ 17,000px |
| Open Needs 起始位置（桌面） | 3,925px | **1,466px** | ≤ 2,600px |
| "Join for Free" 首屏位置（桌面） | 1,012px | **599px**（视口 900） | 首屏内 |
| "Join for Free" 首屏位置（手机） | 1,275px | **645px**（视口 812） | 首屏内 |
| 横向溢出（两种视口） | 无 | **0 / 0** | 0 |

## 二、第 1 节逐条

| 编号 | 要求 | 结果 |
|---|---|---|
| 1.1 | Hero 只留 Badge/H1/Lead/两按钮，三个定义移到下方定义条，桌面三列、手机纵向，不用 "IN PLAIN LANGUAGE" 标签 | **完成**。Hero 690px；定义条单独一节，桌面三列（OPC / FDE / OPC Hub，各「术语 + 一句」），手机纵向 |
| 1.2 | 全站 `h1, h2` 加 `text-wrap: balance` | **完成**。桌面 H1 两行 "Deliver real projects in / Australia and New Zealand"；手机三行，末行 "New Zealand" 两词 |
| 1.3 | 删掉 Work areas 文字行，只保留标签，最多 5 个 | **完成**。`dl.vcard-meta` 已从集团卡移除（页面内 "Work areas" 出现 0 次），标签取 `capabilities.slice(0,5)` |
| 1.4 | 删掉对不存在的《会员条款》的引用；页面与入会页同步改口 | **完成**。页面首段改为你给的英文原文；入会页改为 "Professional and Premier are open by application; no fees are charged until the Membership Terms are published."。全站已无指向 `/opc-fde/membership-terms` 的链接 |
| 1.5 | 新页面顺序；local 与 contracting 合并；导航锚点调整；卡片瘦身 | **完成**。顺序：Hero → 定义条 → How → Open Needs → Your local partner（4 卡 + 两种签约方式并排 + 直签一句）→ Membership → Partners → FDE model → Why → Hubs → Who → FAQ → CTA。`#contracting` 已不存在，全站无残留链接；卡片只留分类、徽标、名称、描述（2 行截断，未超 3 行）、标签、按钮、"About …" |
| 1.6 | Components 卡改 "Business line" 与新描述 | **完成**。徽标 `Business line`（不走状态徽标），描述 "DNY's sourcing and quotation service for drone and robotics components." |

## 三、第 2 节（P2）

| 编号 | 要求 | 结果 |
|---|---|---|
| 2.1 | How 第 1 步改为 "starting with its own ventures and expanding to organisations across Australia and New Zealand" | **完成**，文案照你给的原句 |
| 2.2 | 会员说明改成带 "Membership notes" 小标题的列表，文字一字不改 | **完成**。五段全部保留原文，改为无序列表，列表标记为小圆点 |

## 四、第 3 节「不要做」自查

- 除 1.4 外未改动任何法律说明：会员五段、合伙人说明、签证/独立经营者声明逐字未动。
- 未删 FAQ、未删合伙人说明：FAQ 仍为 7 组问答，合伙人三档与三步流程完整。
- 未新增动效，沿用的还是原有的 reveal / stagger。

## 五、怎么压到预算内的（供你判断是否过度）

没有删内容，动的是排版：

1. 区块上下内边距 104px → 桌面 50px、手机 30px（只作用于本页，用 `body.opc-fde-page` 限定，其他页面不变）。
2. 卡片区桌面从 3 列改 4 列（≥1024px），11 张卡从 4 行变 3 行。
3. 卡片内边距 26px → 20px（桌面）/ 12px（手机）；摘要桌面 2 行、手机 2 行截断（你允许的最多 3 行以内）。
4. 本页段落行高 1.7 → 1.56；手机端会员权益与说明字号各降 0.5px。
5. Hero 上下内边距收窄。

如果觉得 50px/30px 太紧，我可以回到 60px/40px 并把卡片再压一档，但那样桌面会到约 10,300px，需要你再放宽 300px 预算。

## 六、还没做 / 需要你定的

1. **提交**：0a97f79（结构）→ ce11ecb（四列与节奏）→ 73991fe（卡片与区块间距）→ 8e9f6f3（手机节奏）→ 81e7ae4（手机终版）。全部已 push，Pages 已部署，线上即最新。
2. **申请表邮件投递**仍未实测（我不提交假申请）。建议 Max 填一次真实申请，确认主题 `[DNY OPC] Membership application — Community — {姓名}`。
3. 需要新增内容（例如那 2–3 条 Direct need）时，我按第 5 节 schema 录入 `src/data/opc-needs.ts`，卡片、详情页、sitemap、llms 自动生成。

— Hermes（DNY 网站维护）
