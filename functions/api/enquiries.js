// POST /api/enquiries — saves a parts enquiry, then notifies the business inbox.
// The enquiry is stored before any notification is attempted; the reference is only
// returned once the database write has succeeded.
import catalogue from '../../src/data/components-catalogue.json';
import { ensureSchema, now, json } from '../../server/db.js';
import { sendNotification } from '../../server/notify.js';

const PUBLISHED = new Map(catalogue.products.filter((p) => p.publication_status === 'published').map((p) => [p.id, p]));
const MAX_FILES = 5, MAX_FILE = 5 * 1024 * 1024, MAX_ITEMS = 50;
const TYPES = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', pdf: 'application/pdf',
};
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;

function magicOk(bytes, ext) {
  const b = new Uint8Array(bytes.slice(0, 12));
  if (ext === 'jpg' || ext === 'jpeg') return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  if (ext === 'png') return b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
  if (ext === 'webp') return String.fromCharCode(...b.slice(0, 4)) === 'RIFF' && String.fromCharCode(...b.slice(8, 12)) === 'WEBP';
  if (ext === 'pdf') return String.fromCharCode(...b.slice(0, 4)) === '%PDF';
  return false;
}

function makeRef() {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rnd = crypto.getRandomValues(new Uint8Array(6));
  return `DNY-Q-${ymd}-${Array.from(rnd, (x) => alphabet[x % alphabet.length]).join('')}`;
}

async function hashIp(ip) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`dny-enquiry:${ip}`));
  return Array.from(new Uint8Array(d)).slice(0, 12).map((x) => x.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env, waitUntil }) {
  if (!env.DB || !env.FILES) return json({ error: 'Enquiries are temporarily unavailable. Please email info@dnycrossbordergroup.com.' }, 503);
  const ct = request.headers.get('Content-Type') || '';
  if (!ct.includes('multipart/form-data')) return json({ error: 'Unsupported request.' }, 415);

  // Basic rate limit: 5 submissions per IP per 10 minutes.
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ipHash = await hashIp(ip);
  const rlKey = `rl:${ipHash}:${Math.floor(Date.now() / 600000)}`;
  const used = parseInt((await env.FILES.get(rlKey)) || '0', 10);
  if (used >= 5) return json({ error: 'Too many enquiries from this connection. Please wait a few minutes and try again.' }, 429);

  let form;
  try { form = await request.formData(); } catch { return json({ error: 'The form could not be read.' }, 400); }
  if (clean(form.get('_hp'), 10)) return json({ error: 'Rejected.' }, 400);

  const f = {
    name: clean(form.get('name'), 120), email: clean(form.get('email'), 200), country: clean(form.get('country'), 80),
    company: clean(form.get('company'), 160), phone: clean(form.get('phone'), 40), postcode: clean(form.get('postcode'), 20),
    needed_by: clean(form.get('needed_by'), 10), notes: clean(form.get('notes'), 4000),
    marketing: form.get('marketing') === 'yes' ? 1 : 0,
    source_page: clean(form.get('source_page'), 300), landing_page: clean(form.get('landing_page'), 300),
  };
  if (!f.name || !f.email || !f.country) return json({ error: 'Please enter your name, email and country or region.' }, 400);
  if (!EMAIL.test(f.email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (f.needed_by && !/^\d{4}-\d{2}-\d{2}$/.test(f.needed_by)) f.needed_by = '';

  let raw;
  try { raw = JSON.parse(String(form.get('items') || '[]')); } catch { return json({ error: 'The parts list could not be read.' }, 400); }
  if (!Array.isArray(raw) || raw.length === 0) return json({ error: 'Please add at least one part, or describe a part that is not listed.' }, 400);
  if (raw.length > MAX_ITEMS) return json({ error: `Please limit an enquiry to ${MAX_ITEMS} lines.` }, 400);

  const items = [];
  for (let i = 0; i < raw.length; i++) {
    const r = raw[i] || {};
    const pid = r.product_id ? clean(r.product_id, 20) : null;
    if (pid && !PUBLISHED.has(pid)) return json({ error: 'One or more parts in your list are not available for enquiry. Please remove them and try again.' }, 422);
    const qtyStr = clean(r.quantity, 6);
    const qty = qtyStr ? Number(qtyStr) : null;
    if (qtyStr && !(Number.isInteger(qty) && qty >= 1 && qty <= 999999)) return json({ error: `Line ${i + 1}: quantity must be a whole number of 1 or more.` }, 400);
    if (pid && qty === null) return json({ error: `Line ${i + 1}: please enter a quantity.` }, 400);
    const description = clean(r.description, 1000);
    if (!pid && !description) return json({ error: `Line ${i + 1}: please describe the part.` }, 400);
    items.push({ pid, name: pid ? PUBLISHED.get(pid).name : null, model: clean(r.model, 160), part: clean(r.part_number, 120), qty, description });
  }

  const files = form.getAll('files').filter((x) => x && typeof x === 'object' && x.size > 0);
  if (files.length > MAX_FILES) return json({ error: `Please attach no more than ${MAX_FILES} files.` }, 400);
  const prepared = [];
  for (const file of files) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!TYPES[ext]) return json({ error: `${clean(file.name, 80)} is not a JPG, PNG, WebP or PDF file.` }, 400);
    if (file.size > MAX_FILE) return json({ error: `${clean(file.name, 80)} is larger than 5 MB.` }, 400);
    const buf = await file.arrayBuffer();
    if (!magicOk(buf, ext)) return json({ error: `${clean(file.name, 80)} does not appear to be a valid ${ext.toUpperCase()} file.` }, 400);
    prepared.push({ id: crypto.randomUUID(), name: clean(file.name, 160).replace(/[\\/]/g, '_'), type: TYPES[ext], size: file.size, buf });
  }

  try {
    await ensureSchema(env);
    const ts = now();
    // Files first (an orphaned file is harmless); then the enquiry, its lines and attachment
    // records in one transactional batch, so an enquiry is never saved half-way.
    for (const p of prepared) await env.FILES.put(`att:${p.id}`, p.buf, { metadata: { name: p.name, type: p.type } });
    let ref = null, enquiryId = null;
    for (let attempt = 0; attempt < 5 && !enquiryId; attempt++) {
      ref = makeRef();
      const idOf = '(SELECT id FROM enquiries WHERE ref = ?)';
      const stmts = [
        env.DB.prepare(
          `INSERT INTO enquiries (ref, created_at, updated_at, name, email, country, company, phone, postcode, needed_by, notes, marketing, source_page, landing_page, ip_hash)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(ref, ts, ts, f.name, f.email, f.country, f.company, f.phone, f.postcode, f.needed_by, f.notes, f.marketing, f.source_page, f.landing_page, ipHash),
        ...items.map((it) =>
          env.DB.prepare(`INSERT INTO enquiry_items (enquiry_id, product_id, product_name, model, part_number, quantity, description) VALUES (${idOf}, ?, ?, ?, ?, ?, ?)`)
            .bind(ref, it.pid, it.name, it.model, it.part, it.qty, it.description)),
        ...prepared.map((p) =>
          env.DB.prepare(`INSERT INTO enquiry_attachments (id, enquiry_id, filename, content_type, size, created_at) VALUES (?, ${idOf}, ?, ?, ?, ?)`)
            .bind(p.id, ref, p.name, p.type, p.size, ts)),
      ];
      try {
        await env.DB.batch(stmts);
        enquiryId = (await env.DB.prepare('SELECT id FROM enquiries WHERE ref = ?').bind(ref).first()).id;
      } catch (err) {
        if (!String(err).includes('UNIQUE')) throw err;
      }
    }
    if (!enquiryId) throw new Error('Could not allocate a reference');
    await env.FILES.put(rlKey, String(used + 1), { expirationTtl: 900 });

    const origin = new URL(request.url).origin;
    waitUntil(sendNotification(env, enquiryId, origin).catch(() => {}));
    return json({ reference: ref }, 201);
  } catch (err) {
    console.error('enquiry save failed', err);
    return json({ error: 'Your enquiry could not be saved. Please try again, or email info@dnycrossbordergroup.com.' }, 500);
  }
}

