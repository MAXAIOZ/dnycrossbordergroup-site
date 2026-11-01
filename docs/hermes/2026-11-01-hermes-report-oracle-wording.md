# Trusted Data Oracle：按 v3 第 1 节原则改写文案

日期：2026-11-01 · 实施：Hermes · 触发：Max 决定把同样的法律口径用到这个 venture
提交：`2454522` · 线上已验证

## 改了什么

原则与 Cultural Heritage Exchange 一致：**写事实，不写法律身份**。Pty Ltd 运营的项目自称 not-for-profit，在《澳大利亚消费者法》第 18 条下有误导性陈述风险，也会让人误以为可以捐款或享免税。

| 位置 | 原文 | 现在 |
|---|---|---|
| `ventures.ts` short | A not-for-profit, rights-verified data service giving AI agents reliable access… | A rights-verified data service giving AI agents reliable access… governed by an oracle council rather than a single commercial operator. |
| Oracle 页 Model 指标 | Not-for-profit · DAO | Oracle council · DAO-governed |
| Oracle 页 Overview 第二段 | isn't run for private profit. It's organised as a not-for-profit DAO… | operated by DNY Cross Border Group and governed by an oracle council rather than a single commercial operator. The council decides what is published, reviews incidents and publishes transparency reports. |
| Oracle 页 Governance 标题 | Run as a DAO, not a company | Governed by an oracle council |
| Oracle 页 Governance 说明 | It's structured as a not-for-profit: … not a revenue line for DNY. | Its purpose is trusted, verifiable data infrastructure… Where fees are charged, they are applied to running and maintaining the platform, as described below. |
| Oracle 页 费用段 | those fees are not distributed as profit… No private party takes a margin | those fees are applied to operating and maintaining the platform… DNY takes no margin on the data itself. |
| Oracle 页 标签 | Not-for-profit | Council oversight |
| meta.json / oracle 描述 | a not-for-profit, DAO-governed data platform | a council-governed, rights-verified data platform |
| meta.json / Alliance 描述与 lead | an independent, not-for-profit ecosystem… | an independent ecosystem… kept separate from the commercial platform |

新增一句边界说明，位置在费用段之后，小字：

> DNY Cross Border Group Pty Ltd operates this service. It is not a registered charity and does not seek donations. Nothing on this page is an offer of securities or a commitment to supply.

保留的事实：多源核验、签名与时间戳、oracle council 治理、费用用于运营与维护、透明度报告、DNY 不从数据本身取差价。这些都写成了可核验的行为描述，而不是身份或地位声明。

## 顺带处理

`meta.json` 里 Open Source AI Alliance 的 "not-for-profit ecosystem organisation" 一并去掉了。它还是 proposed 状态，改成"独立生态组织，与商业平台在法律与财务上分开"，没有新增任何未经验证的身份描述。

## 验证

- 全仓库源码、`public`、`scripts`：`not-for-profit` / `non-profit` / `nonprofit` 均为 0 处
- 线上 `/ventures/trusted-data-oracle`：正文 0 处，新边界说明存在
- `/ventures`、`/facts`、`/index`、`/llms.txt`：0 处
- `npm run build` 通过；`npm run check:links`：77 pages, 0 problem(s)
- 截图：`screenshots/oracle-desktop.jpg`

## 说明

页面上的 "DAO-governed" 保留了。它描述的是治理方式（oracle council、公开审议、透明度报告），不是澳洲法律意义上的实体形式；如果以后要把它写成实际注册的 DAO 或担保有限公司，需要按当时的实体情况再改一次。这一点与 v3 第 1 节末尾"以后真做非盈利组织需另设实体"是同一处理。
