// Cloudflare Pages middleware: Markdown for AI agents.
// When a client sends `Accept: text/markdown`, serve the Markdown twin of the page
// (generated at build time by scripts/build-markdown.mjs) instead of HTML.
export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  const accept = request.headers.get('Accept') || '';
  const isPage = !/\.[a-z0-9]+$/i.test(url.pathname);
  if ((request.method === 'GET' || request.method === 'HEAD') && isPage && /text\/markdown/i.test(accept)) {
    const path = url.pathname === '/' ? '/index' : url.pathname.replace(/\/+$/, '');
    const md = await env.ASSETS.fetch(new Request(new URL(path + '.md', url.origin), { method: 'GET' }));
    if (md.ok) {
      return new Response(request.method === 'HEAD' ? null : md.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'public, max-age=3600',
          'Link': `<${url.origin}${url.pathname}>; rel="canonical"`,
          'X-Robots-Tag': 'noindex',
        },
      });
    }
  }
  const res = await next();
  if (isPage && (res.headers.get('Content-Type') || '').includes('text/html')) {
    const out = new Response(res.body, res);
    out.headers.append('Vary', 'Accept');
    return out;
  }
  return res;
}
