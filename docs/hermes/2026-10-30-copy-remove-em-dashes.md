# 全站文案：去掉破折号（—）（给 Hermes）

日期：2026-10-30 · 设计：Claude · 实施：Hermes · 状态：**已批准，可以开工**

## 1. 为什么
全站英文文案大量使用破折号 "—"（em dash）。Max 本地仓库里约 290 处，线上版本更多。读起来明显像 AI 写的，削弱可信度。目标：**页面上可见的文字里不再出现 "—"**，同时不改变任何意思。

## 2. 范围
所有对外可见的文字，包括：
- `src/data/*.ts`（site、ventures、topics、industries、architecture、faqs、glossary、schema、components 等）
- `src/data/components-catalogue.json`、`src/legacy/*.html`、`src/legacy/meta.json`
- `src/pages/**/*.astro`、`src/components/**/*.astro`（包括 `/privacy`、`/opc-fde`、`/agents` 等）
- `src/lib/ai-text.ts`（llms.txt、llms-full.txt）
- `<title>`、meta description、OG 图标题（改完重新生成 OG 图）、结构化数据里的文字
- `public/` 下的静态文本文件（如 `robots.txt` 的注释）

不在范围：代码注释、`docs/`、`_legacy-static/`。

## 3. 改写规则（逐处人工判断，不要全局替换成某个符号）

| 原句类型 | 改法 | 示例 |
|---|---|---|
| 句中补充说明 "A — B — C" | 改成逗号或括号 | "DNY is your local partner in Sydney — contracting where a client needs it, meeting clients in local business hours and keeping delivery on track." → "DNY is your local partner in Sydney. We contract where a client needs it, meet clients in local business hours and keep delivery on track." |
| 前半句引出解释 "A — B" | 改成冒号，或拆成两句 | "Commercial drone systems for government, infrastructure and enterprise — aircraft and component supply…" → "Commercial drone systems for government, infrastructure and enterprise: aircraft and component supply…" |
| 术语加定义 "OPC — One Person Company — A business…" | 改成 "术语（全称）: 定义" | "OPC (One Person Company): A business run by one person…" |
| 列表 "**标题** — 说明" | 标题和说明分成两个元素（标题加粗或用小标题），不用任何连接符号；做不到时用冒号 | "Curate: DNY sources and verifies…" |
| `<title>` 里的 "页面 — 栏目 \| DNY…" | 去掉中间栏目，统一为 "{页面名} \| DNY Cross Border Group"（栏目信息已经在面包屑里） | "KST HLS Servos — Robotics Components \| DNY Cross Border Group" → "KST HLS Servos \| DNY Cross Border Group" |
| 引用、署名前的破折号 | 改成逗号或去掉 | — |

**注意：**
- **不要**把 "—" 换成 "-"、"--" 或 "–"。这三种在英文里同样显眼，还会造成新的排版错误。
- **保留** en dash "–"：只用于数字和日期范围（如 "2024–25"、"2022–2025"），这是正确用法。
- 连字符 "-" 照常用于复合词（如 "one-person"、"open-source"）。
- 只改标点和为此必须调整的几个词。**不要借机改写内容、语气或事实**；法律文字（隐私政策、会员说明、免责声明）只改标点，意思一字不变。
- 改写后读一遍，确保每句仍然通顺、没有出现一句话只剩两三个词的情况。

## 4. 防止再出现
在 `scripts/check-links.mjs` 增加一项检查：构建产物（`dist` 里的 HTML 可见文字、Markdown 孪生页、`llms.txt`、`llms-full.txt`）**出现 "—" 就报错**，让 `npm run check:links` 失败。以后不论谁写文案，都过不了这一关。

## 5. 给以后所有设计文档的约定
Claude 之后交付的英文文案不再使用 "—"。之前设计文档里如有带 "—" 的文案，实施时按第 3 节规则改写，不必再来确认。

## 6. 验收标准
- [ ] `grep -rn "—" src public --include=*.ts --include=*.astro --include=*.html --include=*.json --include=*.txt` 只剩代码注释
- [ ] `npm run check:links` 已包含破折号检查并通过
- [ ] 抽查 5 个页面（首页、/about、/opc-fde、/privacy、一个 venture 页）：没有破折号，句子通顺，意思不变
- [ ] 所有 en dash "–" 都只用于数字或日期范围
- [ ] OG 图已重新生成；`<title>` 统一为 "{页面名} | DNY Cross Border Group"
- [ ] 汇报：改动的处数、文件列表、5 个抽查页面的改前改后对比各 2 例
