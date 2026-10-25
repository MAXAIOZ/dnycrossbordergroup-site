// Verifies the Cloudflare Access JWT on admin requests (defence in depth behind the Access policy).
// Required environment variables: ACCESS_TEAM_DOMAIN (e.g. "dny.cloudflareaccess.com") and ACCESS_AUD.
let certs = null, certsAt = 0;
const b64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=')), (c) => c.charCodeAt(0));

async function getKeys(team) {
  if (certs && Date.now() - certsAt < 3600_000) return certs;
  const r = await fetch(`https://${team}/cdn-cgi/access/certs`);
  if (!r.ok) throw new Error('Could not load Access certificates');
  certs = (await r.json()).keys || [];
  certsAt = Date.now();
  return certs;
}

export async function verifyAdmin(request, env) {
  const host = new URL(request.url).hostname;
  if (env.ADMIN_DEV_BYPASS === 'true' && (host === 'localhost' || host === '127.0.0.1')) return { email: 'dev@localhost' };
  const team = env.ACCESS_TEAM_DOMAIN, aud = env.ACCESS_AUD;
  if (!team || !aud) return null; // fail closed when not configured
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) return null;
  const [h, p, s] = token.split('.');
  if (!h || !p || !s) return null;
  try {
    const header = JSON.parse(new TextDecoder().decode(b64u(h)));
    const payload = JSON.parse(new TextDecoder().decode(b64u(p)));
    const jwk = (await getKeys(team)).find((k) => k.kid === header.kid);
    if (!jwk || header.alg !== 'RS256') return null;
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64u(s), new TextEncoder().encode(`${h}.${p}`));
    const audOk = Array.isArray(payload.aud) ? payload.aud.includes(aud) : payload.aud === aud;
    if (!valid || !audOk || (payload.exp && payload.exp * 1000 < Date.now()) || payload.iss !== `https://${team}`) return null;
    return { email: payload.email || payload.sub || 'admin' };
  } catch {
    return null;
  }
}
