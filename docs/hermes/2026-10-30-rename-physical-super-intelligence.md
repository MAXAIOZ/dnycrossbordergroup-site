# 更名：Physical Intelligence → Physical Super Intelligence (SI)（给 Hermes）

日期：2026-10-30 · 决定：Max · 设计：Claude · 实施：Hermes · 状态：**已批准，可以开工**
请先完成或同时执行 `2026-10-30-copy-remove-em-dashes.md`：本次新增和改写的文案都不能出现 "—"。

## 1. 目的
- 让 GEO 里 "AI" 和 "SI（superintelligence）" 两类说法都关联到集团官网。
- 顺带避开同名问题："Physical Intelligence" 也是一家知名美国机器人 AI 公司的名字，AI 回答容易把两家混在一起。

## 2. 命名规则

| 场景 | 用法 |
|---|---|
| 顶部导航、页面 H1、页面 `<title>`、每页**第一次**出现 | **Physical Super Intelligence (SI)** |
| 同一页后续出现、徽标、面包屑、分类标签、卡片小标题 | **Physical SI** |
| 架构第 3 层 | **Open Physical SI Layer**（替换 "Open Physical Intelligence Layer"） |
| 正文里描述技术本身 | 保留 **physical AI**、**embodied AI**，不要全部替换掉。这些是行业通用词，也是 AI 关联的来源 |

## 3. 定义文案（防止被理解为夸大，英文照用）
`/physical-intelligence` 页面 Hero 的 Definition 区块，以及术语表新增条目，统一使用：

> **Physical Super Intelligence (SI)**: DNY's long-term direction for AI that works in the physical world. Drones, robots and edge systems that perceive, decide and act, and improve with every deployment. Today we build the trusted foundations; SI is where they lead, not a claim about current systems.

Hero 的 Lead 改为：
> Physical Super Intelligence (SI) is where trusted, open AI meets drones, robots and edge systems. Today, DNY builds the vendor-neutral layer that connects them: physical AI that works safely in Australian industry.

## 4. 改动清单
1. **导航**（`src/data/site.ts`）：顶层标签和页脚链接改为 "Physical Super Intelligence (SI)"；下拉菜单里的说明文字同步更新。
   - 在 **1280px** 宽度下检查导航是否换行或挤压。如果放不下，只允许缩小导航项之间的间距，或在 1280–1439px 宽度时把这一项显示为 "Physical SI"（悬停提示显示全称）。**不得**删减其他导航项。
2. **页面** `/physical-intelligence`：`title`、H1、面包屑、description、schema 全部改用新名称。
   - `title`：Physical Super Intelligence (SI) | DNY Cross Border Group
   - description：Physical Super Intelligence (SI) is DNY's direction for AI in the physical world. Today DNY builds the Open Physical SI Layer, connecting trusted, open AI to drones, robots and edge systems for Australian industry.
3. **子页面** `/physical-intelligence/drones`、`/physical-intelligence/robotics`：面包屑和栏目名改为 "Physical SI"；正文里的 "Physical Intelligence Layer" 改为 "Physical SI Layer"。
4. **架构**（`architecture.ts`）：第 3 层名称改为 "Open Physical SI Layer"；角色描述里的 "Physical intelligence" 改为 "Physical SI"。首页架构图同步。
5. **Venture 分类**（`ventures.ts` 的 `Category`）：'Physical Intelligence' → 'Physical SI'；`builtOn` 字段同步（如 "Physical SI: Air"，注意不要用 "—"）。`opc-group.ts` 等引用这个分类名的地方一并改。
6. **术语表**（`glossary.ts`）：
   - 新增 "Physical Super Intelligence (SI)"，定义用第 3 节文案
   - "Open Physical Intelligence Layer" 改为 "Open Physical SI Layer"，定义不变
   - 新增 "Physical AI"：AI that perceives and acts in the physical world through devices such as drones and robots.
7. **FAQ**（`faqs.ts`）：问题和答案里的旧名称替换；在 group 组新增一问：
   - Q：What does DNY mean by Physical Super Intelligence (SI)?
   - A：用第 3 节定义文案
8. **llms.txt / llms-full.txt**（`ai-text.ts`）：章节名和 Key facts 的 "Group structure" 同步改；Core focus 写成 "physical AI, toward Physical Super Intelligence (SI)"。
9. **结构化数据**：Organization 的 `knowsAbout` 加入 "Physical Super Intelligence"、"Physical AI"；页面 DefinedTerm 使用第 3 节定义。
10. **首页、404、legacy 页面**：所有显示 "Physical Intelligence" 的标签和链接文字。
11. **URL 保持不变**：`/physical-intelligence` 及子页面不改路径，避免外链和收录失效。
12. 重新生成受影响页面的 OG 图；构建后执行 `npm run indexnow`。

## 5. 不要做
- 不要写 "we build superintelligence""our SI system" 之类、暗示 DNY 现在已经拥有超级智能的句子
- 不要把正文里所有 "physical AI" 都改成 SI
- 不要改 URL
- 不要出现 "—"

## 6. 验收标准
- [ ] `grep -rn "Physical Intelligence" src` 只剩注释，或在说明中提到那家同名公司的地方（目前应为 0）
- [ ] 导航在 1280、1440、375 三种宽度下显示正常，不换行、不溢出
- [ ] `/physical-intelligence` 的 H1、title、Definition 都是新名称和第 3 节文案
- [ ] 术语表、FAQ、llms.txt 已更新；正文仍保留 physical AI、embodied AI
- [ ] `npm run build`、`npm run check:links` 通过；OG 图已更新；IndexNow 已提交
- [ ] 汇报附三种宽度下的导航截图
