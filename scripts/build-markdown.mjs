// Post-build: write a clean Markdown twin of every HTML page (dist/about.html → dist/about.md,
// dist/index.html → dist/index.md). functions/_middleware.js serves these when an AI agent
// sends `Accept: text/markdown`.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import TurndownService from 'turndown';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://dnycrossbordergroup.com';
const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
td.remove(['script', 'style', 'svg', 'form', 'button', 'select', 'noscript', 'canvas']);
td.addRule('dropHidden', { filter: (n) => n.getAttribute && (n.getAttribute('aria-hidden') === 'true' || n.classList?.contains('crumbs') || n.classList?.contains('gstack-panel') || n.classList?.contains('imatrix-mobile') || n.classList?.contains('hp-field')), replacement: () => '' });
td.addRule('strongSpace', { filter: ['strong', 'b'], replacement: (c) => (c.trim() ? `**${c.trim()}** ` : '') });
td.addRule('summaryAsHeading', { filter: 'summary', replacement: (c) => `\n\n${c.trim()}\n\n` });
td.addRule('absLinks', {
  filter: (n) => n.nodeName === 'A' && n.getAttribute('href'),
  replacement: (content, n) => {
    let href = n.getAttribute('href');
    if (href.startsWith('/')) href = SITE + href;
    const text = content.trim().replace(/\s+/g, ' ');
    const cls = n.getAttribute('class') || '';
    const sep = /\b(btn|project-link|tile|vcard-cta)\b/.test(cls) ? '\n\n' : '';
    return text ? `${sep}[${text}](${href})${sep}` : '';
  },
});

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(DIST);

let n = 0;
for (const f of files) {
  const rel = f.slice(DIST.length);
  if (rel === '404.html') continue;
  const html = readFileSync(f, 'utf8');
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  const title = (html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim();
  const desc = (html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').replace(/&amp;/g, '&').replace(/&#39;/g, "'");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? SITE;
  const body = td.turndown(main).replace(/\n{3,}/g, '\n\n').trim();
  const md = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(desc)}\nurl: ${canonical}\npublisher: DNY Cross Border Group\nlanguage: en-AU\n---\n\n${body}\n`;
  writeFileSync(f.replace(/\.html$/, '.md'), md);
  n++;
}
console.log(`Markdown twins written for ${n} pages.`);
