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
  if (rel.startsWith('/admin/')) continue;
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
  // Only the three standard calls to action may appear as buttons (careers apply links excepted).
  const allowed = new Set(['Request the Group Brief', 'Partner with DNY', 'Contact us', 'Email your application', 'Apply for this role', 'Back to all roles', 'Send enquiry', 'Go to the homepage', 'Browse Drone Components', 'Explore Robotics Components', 'Browse Robotics Components', 'Request a Quote', 'Add to Enquiry', 'Back to Components', 'Search', 'Trade & Fleet Enquiry', 'Join for Free', 'See Open Needs', 'Apply for Professional', 'Apply for Premier', 'Express Interest', 'Back to Open Needs', 'Submit Application']);
  for (const [, label] of text.matchAll(/<a[^>]*class="btn[^"]*"[^>]*>([^<]+)<\/a>/g)) {
    if (!allowed.has(label.trim().replace(/&amp;/g, '&'))) err(`${rel}: non-standard button "${label.trim()}"`);
  }
  if (/\bLayer [0-9]/.test(text) && rel !== '/index.html') err(`${rel}: layer numbering outside the homepage`);
  if (!/<link rel="canonical"/.test(html) && !rel.includes('404')) err(`${rel}: no canonical`);
}
// ---- Em dash check (design decision 2026-10-30): visible copy must not use "—".
// Exceptions: elements marked data-dash-ok, /admin/, <script>, <style>, HTML comments,
// and Markdown table cells whose only content is the dash.
const DASH = '\u2014';
const keepLines = (s) => s.replace(/[^\n]/g, '');
const stripBlocks = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/gi, keepLines)
    .replace(/<style[\s\S]*?<\/style>/gi, keepLines)
    .replace(/<!--[\s\S]*?-->/g, keepLines)
    .replace(/<(\w+)(?=[^>]*\bdata-dash-ok\b)[^>]*>[\s\S]*?<\/\1>/gi, keepLines);

function scanDashes(label, text, { markdown = false } = {}) {
  text.split('\n').forEach((line, i) => {
    if (!line.includes(DASH)) return;
    let segment = line;
    // Markdown twins flatten table cells onto their own lines, so a line made only of
    // the dash (plus pipes and spaces) is an empty table value, not copy.
    if (markdown && line.replace(/[\s|\u2014]/g, '') === '') return;
    if (markdown && line.trim().startsWith('|')) {
      // A table cell that holds nothing but the dash is an intentional empty value.
      const offending = line.split('|').filter((c) => c.includes(DASH) && c.replace(/[\s\u2014]/g, '') !== '');
      if (!offending.length) return;
      segment = offending.join('|');
    }
    const at = segment.indexOf(DASH);
    const from = Math.max(0, at - 40);
    const to = Math.min(segment.length, at + 41);
    err(`${label}: em dash at line ${i + 1}: …${segment.slice(from, to).trim()}…`);
  });
}

for (const f of files) {
  const rel = f.replace(DIST, '/');
  if (rel.startsWith('/admin/')) continue;
  scanDashes(rel, stripBlocks(readFileSync(f, 'utf8')));
}

const textFiles = [];
const walkText = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) walkText(p);
  else if (/\.(md|txt)$/.test(p)) textFiles.push(p);
});
walkText(DIST);
for (const f of textFiles) {
  const rel = f.replace(DIST, '/');
  if (rel.startsWith('/admin/') || rel.endsWith('/CREDITS.md')) continue;
  scanDashes(rel, readFileSync(f, 'utf8'), { markdown: rel.endsWith('.md') });
}

console.log(`${files.length} pages checked, ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
