// Outbound mail for the website.
//
// Mail is sent from the company's own Google Workspace mailbox (info@) through the Gmail API,
// so the site does not depend on a third-party form service. Credentials are Cloudflare Pages
// environment variables of type "secret" — GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET,
// GMAIL_REFRESH_TOKEN — and never appear in the repository. Optional: MAIL_FROM, MAIL_TO.
//
// Nothing here accepts an arbitrary recipient: callers pass a reply-to address and a body, and
// the From/To are fixed to the company addresses in these variables.

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

export const FALLBACK_TO = 'info@dnycrossbordergroup.com';
export const FALLBACK_FROM = `DNY website <${FALLBACK_TO}>`;

export function mailConfigured(env) {
  return Boolean(env.GMAIL_CLIENT_ID && env.GMAIL_CLIENT_SECRET && env.GMAIL_REFRESH_TOKEN);
}

function b64url(bytes) {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// RFC 2047 for non-ASCII subjects and display names; ASCII passes through untouched.
function header(value) {
  const text = String(value || '').replace(/[\r\n]+/g, ' ');
  if (/^[\x20-\x7E]*$/.test(text)) return text;
  return `=?UTF-8?B?${b64url(new TextEncoder().encode(text))}?=`;
}

// Address fields must not be able to smuggle extra headers.
function address(value) {
  return String(value || '').replace(/[\r\n<>]/g, '').trim();
}

function buildMessage({ from, to, replyTo, subject, text }) {
  const lines = [
    `From: ${from}`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${header(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
  ];
  // A blank line separates headers from the body; CRLF is required by RFC 5322.
  return `${lines.join('\r\n')}\r\n\r\n${String(text || '').replace(/\r?\n/g, '\r\n')}`;
}

async function getAccessToken(env) {
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GMAIL_CLIENT_ID,
      client_secret: env.GMAIL_CLIENT_SECRET,
      refresh_token: env.GMAIL_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok || !body.access_token) {
    throw new Error(`Gmail token request failed: ${body.error || r.status}`);
  }
  return body.access_token;
}

/**
 * Send a plain-text mail from the company mailbox.
 * @param {object} env        Pages environment (holds the Gmail credentials)
 * @param {object} message    { to?, replyTo?, subject, text }
 * @returns {Promise<{id: string}>}
 */
export async function sendMail(env, { to, replyTo, subject, text }) {
  if (!mailConfigured(env)) throw new Error('Gmail credentials are not configured');
  const from = env.MAIL_FROM || FALLBACK_FROM;
  const dest = address(to || env.MAIL_TO || FALLBACK_TO);
  const raw = buildMessage({ from, to: dest, replyTo: replyTo ? address(replyTo) : '', subject, text });
  const accessToken = await getAccessToken(env);
  const r = await fetch(SEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw: b64url(new TextEncoder().encode(raw)) }),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok || !body.id) {
    const detail = body.error?.message || `HTTP ${r.status}`;
    throw new Error(`Gmail send failed: ${detail}`);
  }
  return { id: body.id };
}
