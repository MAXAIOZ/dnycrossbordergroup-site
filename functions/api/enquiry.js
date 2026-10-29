// POST /api/enquiry — contact enquiries and Alliance applications.
//
// The form fields are rendered into a plain-text mail and sent from the company Gmail account
// (server/mail.js). There is no third-party form service in the path, so a provider outage
// cannot swallow an enquiry.
//
// Both the recipient and the sender are fixed in configuration; the only caller-supplied
// address is Reply-To, which is validated as an email address and stripped of newlines.
import { sendMail, mailConfigured } from '../../server/mail.js';

const MAX_BODY = 64 * 1024;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const clean = (v, max = 400) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .trim()
    .slice(0, max);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const TIERS = ['Community', 'Professional', 'Premier'];

async function rateLimited(env, request) {
  if (!env.FILES) return false;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`dny-form:${ip}`));
  const key = `rl:form:${Array.from(new Uint8Array(digest)).slice(0, 10).map((b) => b.toString(16).padStart(2, '0')).join('')}:${Math.floor(Date.now() / 600000)}`;
  const used = parseInt((await env.FILES.get(key)) || '0', 10);
  if (used >= 6) return true;
  await env.FILES.put(key, String(used + 1), { expirationTtl: 900 });
  return false;
}

function membershipSubject(f) {
  const venture = f.venture && !/^not sure/i.test(f.venture) ? ` — ${f.venture}` : '';
  return `[DNY OPC] Membership application — ${f.tier} — ${f.name}${venture}`;
}

function membershipBody(f, meta) {
  return [
    'New Alliance application from the website.',
    '',
    `Tier: ${f.tier}`,
    `Venture of interest: ${f.venture || '—'}`,
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Country: ${f.country || '—'}`,
    `Joining as: ${f.joining_as || '—'}`,
    `Organisation: ${f.organisation || '—'}`,
    `Website or profile: ${f.profile_url || '—'}`,
    `Capabilities: ${f.capabilities || '—'}`,
    `Partner track: ${f.partner_track || 'No'}`,
    `Working-hours overlap: ${f.overlap || '—'}`,
    `Can contract with Australian clients: ${f.contracting || '—'}`,
    `Need reference: ${f.need || '—'}`,
    `Marketing opt-in: ${f.marketing_opt_in || 'No'}`,
    '',
    'Notes:',
    f.message || '—',
    '',
    '—',
    `Source: ${f.source_page || '—'}`,
    `IP country: ${meta.country || '—'}`,
    `Received: ${new Date().toISOString()}`,
    `Reply directly to this message to answer ${f.name}.`,
  ].join('\n');
}

function contactSubject(f) {
  const type = f.enquiry_type || 'general';
  const label = type.charAt(0).toUpperCase() + type.slice(1);
  return `[DNY website] ${label} enquiry — ${f.name}`;
}

function contactBody(f, meta) {
  return [
    'New enquiry from the website.',
    '',
    `Type: ${f.enquiry_type || 'general'}`,
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Organisation: ${f.organisation || '—'}`,
    `Interest: ${f.interest || '—'}`,
    '',
    'Message:',
    f.message || '—',
    '',
    '—',
    `Source page: ${f.source_page || '—'}`,
    `Landing page: ${f.landing_page || '—'}`,
    `Referrer: ${f.referrer || '—'}`,
    `UTM: ${[f.utm_source, f.utm_medium, f.utm_campaign].filter(Boolean).join(' / ') || '—'}`,
    `IP country: ${meta.country || '—'}`,
    `Received: ${new Date().toISOString()}`,
  ].join('\n');
}

export async function onRequestPost({ request, env }) {
  const ct = request.headers.get('Content-Type') || '';
  if (!ct.includes('application/json')) return json({ success: false, message: 'Send application/json.' }, 415);
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY) return json({ success: false, message: 'Request too large.' }, 413);
  if (!mailConfigured(env)) {
    return json({ success: false, message: 'The form is temporarily unavailable. Please email info@dnycrossbordergroup.com.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: 'The form could not be read.' }, 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ success: false, message: 'The form could not be read.' }, 400);

  // Honeypot: the visible form never fills these, bots do.
  if (clean(body._honey, 10) || clean(body._hp, 10)) return json({ success: false, message: 'Rejected.' }, 400);

  if (await rateLimited(env, request)) {
    return json({ success: false, message: 'Too many submissions from this connection. Please try again in a few minutes, or email info@dnycrossbordergroup.com.' }, 429);
  }

  const kind = body.kind === 'membership' ? 'membership' : 'contact';
  const f = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    country: clean(body.country, 80),
    organisation: clean(body.organisation, 160),
    message: clean(body.message, 6000),
  };
  if (!f.name || !f.email) return json({ success: false, message: 'Please enter your name and email address.' }, 400);
  if (!EMAIL.test(f.email)) return json({ success: false, message: 'Please enter a valid email address.' }, 400);

  const meta = {
    country: (request.cf && request.cf.country) || '',
  };

  let subject, text;
  if (kind === 'membership') {
    f.tier = clean(body.tier, 20);
    if (!TIERS.includes(f.tier)) return json({ success: false, message: 'Please choose a membership tier.' }, 400);
    f.venture = clean(body.venture, 80);
    f.joining_as = clean(body.joining_as, 80);
    f.profile_url = clean(body.profile_url, 300);
    f.capabilities = clean(body.capabilities, 400);
    f.partner_track = clean(body.partner_track, 10);
    f.overlap = clean(body.overlap, 80);
    f.contracting = clean(body.contracting, 120);
    f.need = clean(body.need, 40);
    f.marketing_opt_in = clean(body.marketing_opt_in, 10);
    f.source_page = clean(body.source_page, 300);
    if (!f.capabilities) return json({ success: false, message: 'Please choose at least one capability.' }, 400);
    subject = membershipSubject(f);
    text = membershipBody(f, meta);
  } else {
    f.enquiry_type = clean(body.enquiry_type, 40) || 'general';
    f.interest = clean(body.interest, 120);
    f.source_page = clean(body.source_page, 300);
    f.landing_page = clean(body.landing_page, 300);
    f.referrer = clean(body.referrer, 300);
    f.utm_source = clean(body.utm_source, 100);
    f.utm_medium = clean(body.utm_medium, 100);
    f.utm_campaign = clean(body.utm_campaign, 100);
    if (!f.message) return json({ success: false, message: 'Please write a message.' }, 400);
    subject = contactSubject(f);
    text = contactBody(f, meta);
  }

  try {
    await sendMail(env, { replyTo: f.email, subject, text });
    return json({ success: true });
  } catch (err) {
    console.error('enquiry mail failed', err);
    return json({ success: false, message: 'The form could not be sent. Please email info@dnycrossbordergroup.com.' }, 502);
  }
}
