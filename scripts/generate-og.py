"""Generate one 1200x630 Open Graph image per page into public/og/.
Run after `npm run build`:  python3 scripts/generate-og.py   (requires: pip install playwright)
"""
import re, html, pathlib, asyncio, base64
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST, OUT = ROOT / 'dist', ROOT / 'public' / 'og'
OUT.mkdir(parents=True, exist_ok=True)
logo = base64.b64encode((ROOT / 'public/assets/img/logo.svg').read_bytes()).decode()

TPL = '''<html><head><style>
*{margin:0;box-sizing:border-box} body{width:1200px;height:630px;font-family:Inter,"DejaVu Sans",sans-serif;color:#EEF4FF;
background:radial-gradient(900px 500px at 85% 10%,rgba(239,159,39,.22),transparent 60%),radial-gradient(700px 500px at 0% 100%,rgba(93,202,165,.18),transparent 60%),#04201A;
padding:70px 80px;display:flex;flex-direction:column;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px}
.k{position:relative;font-size:22px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#EF9F27}
h1{position:relative;font-size:{fs}px;line-height:1.08;font-weight:800;letter-spacing:-.02em;margin-top:22px;max-width:1000px}
.foot{position:relative;margin-top:auto;display:flex;align-items:center;justify-content:space-between}
.foot img{height:54px}.foot span{font-size:22px;color:#A0B4C8}
.bar{position:absolute;left:0;right:0;bottom:0;height:8px;background:linear-gradient(90deg,#EF9F27,#5DCAA5)}
</style></head><body><div class="grid"></div><div class="k">{kicker}</div><h1>{title}</h1>
<div class="foot"><img src="data:image/svg+xml;base64,{logo}"><span>dnycrossbordergroup.com</span></div><div class="bar"></div></body></html>'''

def pages():
    for f in sorted(DIST.rglob('*.html')):
        rel = f.relative_to(DIST).as_posix()
        if rel == '404.html': continue
        path = '/' if rel == 'index.html' else '/' + rel[:-5]
        src = f.read_text()
        t = re.search(r'<title>(.*?)</title>', src, re.S).group(1)
        t = html.unescape(t).split(' | DNY Cross Border Group')[0]
        if path == '/': t = 'Trusted Open AI. Connected to the Physical World.'
        badge = re.search(r'class="hero-badge"[^>]*>.*?</span>(.*?)</div>', src, re.S)
        kicker = html.unescape(re.sub('<[^>]+>', '', badge.group(1))).strip() if badge else 'DNY Cross Border Group'
        slug = 'home' if path == '/' else path[1:].replace('/', '--')
        yield slug, kicker, t

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1200, 'height': 630})
        n = 0
        for slug, kicker, title in pages():
            fs = 72 if len(title) < 40 else 60 if len(title) < 70 else 50
            doc = TPL.replace('{kicker}', html.escape(kicker)).replace('{title}', html.escape(title)).replace('{logo}', logo).replace('{fs}', str(fs))
            await pg.set_content(doc)
            await pg.screenshot(path=str(OUT / f'{slug}.jpg'), type='jpeg', quality=86)
            n += 1
        await b.close()
        print(f'{n} OG images written to {OUT}')

asyncio.run(main())
