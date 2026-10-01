// Post-build QA: internal links + anchors, banned strings, non-English characters, one H1 per page.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(DIST);

const resolve = (u) => {
  if (u === '/') return join(DIST, 'index.html');
  for (const c of [join(DIST, u + '.html'), join(DIST, u, 'index.html'), join(DIST, u)]) if (existsSync(c) && statSync(c).isFile()) return c;
  return null;
};
const ids = new Map();
const getIds = (f) => { if (!ids.has(f)) ids.set(f, new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))); return ids.get(f); };

let errors = 0;
const err = (m) => { errors++; console.log('✗', m); };
for (const f of files) {
  const rel = f.replace(DIST, '/');
  const html = readFileSync(f, 'utf8');
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    if (href.startsWith('/assets/') || href.startsWith('/sitemap')) continue;
    const [pathq, hash] = href.split('#');
    const path = pathq.split('?')[0] || rel.replace(/\.html$/, '');
    const target = href.startsWith('#') ? f : resolve(path);
    if (!target) { err(`${rel}: broken link ${href}`); continue; }
    if (hash && !getIds(target).has(hash)) err(`${rel}: missing anchor ${href}`);
  }
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '');
  if (/AIHL/.test(html)) err(`${rel}: contains AIHL`);
  const cjk = html.match(/[　-〿぀-ヿ㐀-䶿一-鿿가-힯＀-￯]/g);
  if (cjk) err(`${rel}: non-English characters ${[...new Set(cjk)].join('')}`);
  const h1 = (text.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(`${rel}: ${h1} <h1> elements`);
  if (!/<link rel="canonical"/.test(html) && !rel.includes('404')) err(`${rel}: no canonical`);
}
console.log(`${files.length} pages checked, ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
