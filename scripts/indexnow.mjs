// Submit every URL in the built sitemap to IndexNow (Bing, Yandex, Seznam, Naver…).
// Bing's index also feeds Microsoft Copilot and ChatGPT search. Run after each deploy:
//   npm run build && npm run indexnow
import { readFileSync } from 'node:fs';
const site = 'https://dnycrossbordergroup.com';
const key = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8').match(/indexNowKey:\s*'([a-f0-9]+)'/)[1];
const xml = readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).concat([`${site}/llms.txt`, `${site}/llms-full.txt`]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status} ${res.status === 200 || res.status === 202 ? '(accepted)' : await res.text()}`);
