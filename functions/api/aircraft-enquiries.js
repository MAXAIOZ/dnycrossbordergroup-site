// POST /api/aircraft-enquiries — aircraft enquiry for construction, agriculture and inspection.
//
// Same storage, reference discipline, rate limit, attachments and admin flow as /api/enquiries, with
// kind = 'aircraft' and its own reference series (DNY-A-...). The endpoint never quotes, never takes
// payment and never records end-user identity documents: those are collected by hand before a formal
// quote, outside the website.
import { ensureSchema, now, json } from '../../server/db.js';
import { sendNotification } from '../../server/notify.js';

const MAX_FILES = 5, MAX_FILE = 5 * 1024 * 1024;
const TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', pdf: 'application/pdf' };
const APPLICATIONS = ['Construction', 'Agriculture', 'Inspection', 'Other'];
const ROLES = ['End user', 'Reseller', 'Integrator', 'Other'];
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
  // Reference dates follow Sydney, so a morning enquiry is dated the day the buyer sent it.
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', year: '2-digit', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = (t) => parts.find((x) => x.type === t).value;
  const ymd = `${part('year')}${part('month')}${part('day')}`;
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rnd = crypto.getRandomValues(new Uint8Array(6));
  return `DNY-A-${ymd}-${Array.from(rnd, (x) => alphabet[x % alphabet.length]).join('')}`;
}

async function hashIp(ip) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`dny-aircraft:${ip}`));
  return Array.from(new Uint8Array(d)).slice(0, 12).map((x) => x.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env, waitUntil }) {
  if (!env.DB || !env.FILES) return json({ error: 'Enquiries are temporarily unavailable. Please email info@dnycrossbordergroup.com.' }, 503);
  const ct = request.headers.get('Content-Type') || '';
  if (!ct.includes('multipart/form-data')) return json({ error: 'Send the enquiry as a form submission.' }, 415);

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ipHash = await hashIp(ip);
  const rlKey = `rl:air:${ipHash}:${Math.floor(Date.now() / 600000)}`;
  const used = parseInt((await env.FILES.get(rlKey)) || '0', 10);
  if (used >= 5) return json({ error: 'Too many enquiries from this connection. Please wait a few minutes and try again.' }, 429);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'The form could not be read.' }, 400);
  }
  const get = (k) => form.get(k);
  if (clean(get('_hp'), 10)) return json({ error: 'Rejected.' }, 400);

  const f = {
    name: clean(get('name'), 120),
    email: clean(get('email'), 200),
    buying_as: clean(get('buying_as'), 20),
    company: clean(get('company'), 160),
    country: clean(get('country'), 80),
    postcode: clean(get('postcode'), 40),
    application: clean(get('application'), 30),
    quantity: clean(get('quantity'), 4),
    model_requirement: clean(get('model_requirement'), 1000),
    configuration: clean(get('configuration'), 500),
    operating_environment: clean(get('operating_environment'), 300),
    endurance: clean(get('endurance'), 200),
    tank_capacity: clean(get('tank_capacity'), 120),
    intended_use: clean(get('intended_use'), 400),
    country_of_use: clean(get('country_of_use'), 80),
    role: clean(get('role'), 20),
    needed_by: clean(get('needed_by'), 10),
    notes: clean(get('notes'), 4000),
    marketing: get('marketing') === 'yes' ? 1 : 0,
    source_page: clean(get('source_page'), 300),
    landing_page: clean(get('landing_page'), 300),
  };

  if (!f.name || !f.email || !f.country) return json({ error: 'Please enter your name, email and country.' }, 400);
  if (!EMAIL.test(f.email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (!['Business', 'Individual'].includes(f.buying_as)) return json({ error: 'Please say whether you are buying as a business or an individual.' }, 400);
  if (f.buying_as === 'Business' && !f.company) return json({ error: 'Please add your organisation.' }, 400);
  if (!APPLICATIONS.includes(f.application)) return json({ error: 'Please choose an application.' }, 400);
  if (!ROLES.includes(f.role)) return json({ error: 'Please choose your role.' }, 400);
  if (!f.model_requirement) return json({ error: 'Please add a model or describe what the aircraft needs to do.' }, 400);
  if (!f.intended_use) return json({ error: 'Please describe the intended use.' }, 400);
  if (!f.country_of_use) return json({ error: 'Please choose the country of use.' }, 400);
  if (!f.postcode) return json({ error: 'Please add a delivery region or postcode.' }, 400);
  const qty = Number(f.quantity);
  if (!(Number.isInteger(qty) && qty >= 1 && qty <= 9999)) return json({ error: 'Quantity must be a whole number of 1 or more.' }, 400);
  if (f.needed_by && !/^\d{4}-\d{2}-\d{2}$/.test(f.needed_by)) f.needed_by = '';
  // The tank field only appears for agriculture; anything else is dropped rather than stored.
  if (f.application !== 'Agriculture') f.tank_capacity = '';

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
    for (const p of prepared) await env.FILES.put(`att:${p.id}`, p.buf, { metadata: { name: p.name, type: p.type } });
    let ref = null, enquiryId = null;
    for (let attempt = 0; attempt < 5 && !enquiryId; attempt++) {
      ref = makeRef();
      const idOf = '(SELECT id FROM enquiries WHERE ref = ?)';
      const stmts = [
        env.DB.prepare(
          `INSERT INTO enquiries (ref, kind, created_at, updated_at, name, email, country, company, postcode, needed_by, notes, marketing, source_page, landing_page, ip_hash)
           VALUES (?, 'aircraft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(ref, ts, ts, f.name, f.email, f.country, f.buying_as === 'Business' ? f.company : null, f.postcode, f.needed_by, f.notes, f.marketing, f.source_page, f.landing_page, ipHash),
        env.DB.prepare(
          `INSERT INTO enquiry_aircraft (enquiry_id, buying_as, organisation, application, model_requirement, configuration, quantity, operating_environment, endurance, tank_capacity, intended_use, country_of_use, role)
           VALUES (${idOf}, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(ref, f.buying_as, f.buying_as === 'Business' ? f.company : '', f.application, f.model_requirement, f.configuration, qty, f.operating_environment, f.endurance, f.tank_capacity, f.intended_use, f.country_of_use, f.role),
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
    console.error('aircraft enquiry save failed', err);
    return json({ error: 'Your enquiry could not be saved. Please try again, or email info@dnycrossbordergroup.com.' }, 500);
  }
}
