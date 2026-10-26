# 按访客所在市场提示（Market awareness）设计（给 Hermes）

日期：2026-10-26 · 设计：Claude · 实施：Hermes · 状态：**已批准，可以开工**

## 决策（Max）
- 区分 3 个市场：**AU 澳洲（默认）**、**NZ 新西兰**、**INTL 其他所有国家**（含中国、美国、东南亚）
- **不强制跳转**：同一网址对所有人显示同一页面，只按市场显示提示条和少量上下文说明
- **全站保持英文**，不做中文页面

## 1. 原理
- Cloudflare 给每个请求附带访客国家代码（Pages Functions 里是 `request.cf.country`）
- 映射规则：`AU → AU`，`NZ → NZ`，其他所有国家及未知 → `INTL`
- **不存储** IP 和国家；只在本次响应里使用

## 2. 实现方式
1. 在现有 `functions/_middleware.js` 里，只对 `text/html` 响应用 `HTMLRewriter` 给 `<html>` 加属性 `data-market="AU|NZ|INTL"`。Markdown 孪生页、JSON、静态资源不处理。
   （2026-10-26 确认：服务端直出。所有 HTML 页面本来就经过这个 middleware，不会增加函数调用次数。）
2. 访客手动选择优先：页脚增加 **"Region: Australia · New Zealand · International"** 切换（`<select>`），选择存在 `localStorage['dny_market']`。页面加载时如果有手动选择，前端脚本用它覆盖 `data-market`。
3. 页面上所有按市场变化的内容都**预先渲染在 HTML 里**，用 CSS 按 `html[data-market=…]` 显示或隐藏，避免闪烁，也不需要额外请求。
4. 测试参数：`?market=NZ` / `?market=INTL` 临时覆盖（只影响本次浏览，不写存储），方便 Hermes 在 VPS（澳洲 IP）上验证。
5. 不需要 hreflang：同一个网址、同一份主体内容，只有提示条不同，**不算 cloaking**，也不影响收录。canonical 不变。
6. 数据集中放在 `src/data/markets.ts`；提示条组件 `src/components/MarketBanner.astro`，插在 `Base.astro` 的页头下方。

## 3. 各市场显示内容（英文文案，照用）

### 3.1 顶部提示条（可关闭；关闭后 30 天不再显示，记在 `localStorage['dny_market_banner_dismissed']`）
| 市场 | 文案 | 按钮 |
|---|---|---|
| AU | 不显示 | — |
| NZ | **Visiting from New Zealand?** We quote components for delivery to New Zealand, and Auckland is the next node of our OPC + FDE network. | "Request a Quote" → `/components/enquiry` ；"OPC + FDE" → `/opc-fde` |
| INTL | **Visiting from outside Australia?** DNY is headquartered in Sydney. Component enquiries from other countries are quoted case by case, and investors and partners can request our Group Brief. | "Request the Group Brief"（现有 CTA）；"Request a Quote" |

样式：沿用现有设计语言，深绿底、细金色边框，高度不超过 56px，右侧是关闭按钮（×，`aria-label="Dismiss"`）。移动端文字可换行，但不能出现横向滚动。

### 3.2 页面内上下文说明
| 页面 | AU | NZ | INTL |
|---|---|---|---|
| `/components/enquiry` 的 Country 字段 | 预选 Australia | 预选 New Zealand | 不预选 |
| `/components/enquiry` 表单上方说明 | Delivery within Australia is quoted with your order. | Delivery to New Zealand is quoted on request. | International delivery is quoted case by case. Export and import rules may apply. |
| 产品目录页（drones/robotics）底部说明 | 现有文案不变 | 同上，加一句 "We quote delivery to New Zealand." | 同上，加一句 "International enquiries are quoted case by case." |
| `/ventures/ev-accessories` 的 Trade & Fleet 区块 | 不变 | 加 "Retail launches in Australia first; New Zealand follows." | 加 "Retail is planned for Australia and New Zealand." |
| `/contact` | 不变 | 不变 | 加一句 "We reply within one Sydney business day (AEST/AEDT)." |

预选的国家访客可以随时改；预选不影响服务器端校验。

## 4. 顺带必须做：字体改为自托管（对中国等地区访客影响很大）
- 现在 `Base.astro` 从 `fonts.googleapis.com` 加载 Inter。**Google 在中国大陆无法访问**，样式表加载会长时间阻塞，页面打开很慢。部分企业网络也会拦截 Google。
- 改为自托管：Inter 的 woff2（可变字重，Latin 子集）放到 `public/assets/fonts/`，在 `styles.css` 用 `@font-face` 声明（`font-display: swap`），删除两个 preconnect 和 Google 样式表链接。
- Inter 是 SIL OFL 开源授权，可以自托管和放进公开仓库。把许可文件一起放进 `public/assets/fonts/`。
- `_headers`：`/assets/fonts/*` 长缓存 `max-age=31536000, immutable`。
- 隐私政策第 5、6 节删除 "font delivery (Google LLC)" 的描述。

## 5. 隐私政策补充
第 7 节（Cookies and browser storage）加一句：我们通过访客的 IP 地址判断大致所在国家，仅用于显示相关的配送和联系信息，**不存储**；你的地区选择和提示条关闭状态保存在浏览器本地，可随时清除。

## 6. 不要做
- 不要按国家跳转，或返回不同的主体内容（只允许第 3 节列出的提示和说明）
- 不要用国家信息拦截或限制访问
- 不要设置 cookie（用 localStorage 即可）
- 不要对爬虫做特殊处理
- 不要新增非英文文案

## 7. 验收标准
- [ ] `?market=NZ`、`?market=INTL` 分别显示对应提示条和上下文说明；默认（澳洲 IP）不显示提示条
- [ ] 页脚切换地区后刷新仍然生效；关闭提示条后 30 天内不再出现
- [ ] Markdown 孪生页、`llms.txt`、JSON 端点内容不受市场影响
- [ ] 全站不再请求 `fonts.googleapis.com` 和 `fonts.gstatic.com`（浏览器 Network 面板确认），字体显示正常
- [ ] 移动端 375px 宽度无横向溢出；提示条可用键盘关闭
- [ ] `npm run build`、`npm run check:links` 通过；隐私政策已更新
