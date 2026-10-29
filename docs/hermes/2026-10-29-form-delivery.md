# 网站表单投递改为自有通道（2026-10-29）

## 起因

2026-10-29 实测入会申请表单时发现 FormSubmit 整体不可用：`formsubmit.co` 根域、`/ajax/` 端点、非 ajax 端点全部返回 Cloudflare 521（源站不可达）。从 Mac 与 VPS3 两个网络、直接调用与真实浏览器提交共 6 次，全部 521。当时站上三个表单——联系、零件询价、入会申请——都无法投递，页面只显示兜底提示。

判断：第三方免费表单单点，不在我们的控制范围，且故障无通知。按决定改为自有投递。

## 现在的链路

```
浏览器 → POST /api/enquiry（Pages Function）
        → server/mail.js 取 Gmail OAuth access token（refresh token 换）
        → gmail.googleapis.com/users/me/messages/send
        → info@dnycrossbordergroup.com 收件箱（Reply-To = 申请人邮箱）
```

- `functions/api/enquiry.js`：联系表单与入会申请共用，`kind` 区分（`contact` / `membership`）。
- `server/mail.js`：纯文本 MIME 组装 + RFC 2047 主题编码 + Gmail API 发送。
- `server/notify.js`：零件询价（`/api/enquiries`，D1 存库后通知）也改用同一条发信通道。

## 安全设计

- 发件人和收件人都在环境变量里固定，函数不接受任意收件人，不存在被当开放中继的风险。
- 唯一由调用方提供的是 `Reply-To`，按邮箱正则校验并剥掉换行与尖括号，不能注入头部。
- 蜜罐字段 `_honey` / `_hp`；同一 IP 10 分钟 6 次上限（KV `FILES` 计数）。
- 请求体上限 64 KB，字段逐个截断。
- 凭据只存在 Cloudflare Pages 的加密环境变量里：`GMAIL_CLIENT_ID`、`GMAIL_CLIENT_SECRET`、`GMAIL_REFRESH_TOKEN`，另有 `MAIL_TO`、`MAIL_FROM`。仓库里只有变量名（`.env.example`）。

## 凭据来源与轮换

凭据是 info@ 的 OAuth refresh token（项目 734465440250，scope 含 `gmail.send`），与 VPS3 `dnymail` 用的是同一份。轮换方法：重新授权拿到新 refresh token → Cloudflare Pages 环境变量改 `GMAIL_REFRESH_TOKEN` → 重新部署（改环境变量必须触发一次新部署才生效）。

## 隐私政策同步

原政策把 FormSubmit 列为「投递表单通知的邮件中转服务」，改后不再使用它。已改为「我们自己的 Google Workspace 邮箱（Google LLC）」，跨境段落也删去 FormSubmit。此处属事实更正，未改其他法律文字。

## 验收（2026-10-29 实测）

| 路径 | 结果 |
|---|---|
| `POST /api/enquiry`（membership） | `{"success":true}`；收件箱主题 `[DNY OPC] Membership application — Community — Hermes Form Test — facadia`；Reply-To 正确；正文含全部字段 |
| `POST /api/enquiry`（contact） | `{"success":true}`；主题 `[DNY website] General enquiry — Hermes Contact Test` |
| `POST /api/enquiries`（零件询价） | 返回参考号 `DNY-Q-261029-GJMDKE`；主题 `[DNY Components] New enquiry DNY-Q-261029-GJMDKE` |
| 线上入会页真实提交（Premier + venture） | 页面显示成功提示；收件箱主题 `[DNY OPC] Membership application — Premier — Browser Test — facadia` |

三条测试邮件与一条 TEST 询价记录留在 info@ 与后台，可随时删除。
