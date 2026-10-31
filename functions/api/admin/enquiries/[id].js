import { json, now, STATUSES } from '../../../../server/db.js';
const find = (env, ref) => env.DB.prepare('SELECT * FROM enquiries WHERE ref = ?').bind(ref).first();

// GET /api/admin/enquiries/:ref
export async function onRequestGet({ params, env }) {
  const e = await find(env, params.id);
  if (!e) return json({ error: 'Not found.' }, 404);
  const aircraft = (e.kind || 'parts') === 'aircraft'
    ? await env.DB.prepare('SELECT * FROM enquiry_aircraft WHERE enquiry_id = ?').bind(e.id).first()
    : null;
  const [items, files, notes] = await Promise.all([
    env.DB.prepare('SELECT * FROM enquiry_items WHERE enquiry_id = ? ORDER BY id').bind(e.id).all(),
    env.DB.prepare('SELECT id, filename, content_type, size FROM enquiry_attachments WHERE enquiry_id = ?').bind(e.id).all(),
    env.DB.prepare('SELECT author, body, created_at FROM enquiry_notes WHERE enquiry_id = ? ORDER BY id DESC').bind(e.id).all(),
  ]);
  delete e.ip_hash;
  return json({ enquiry: e, aircraft: aircraft || null, items: items.results, attachments: files.results, notes: notes.results, statuses: STATUSES });
}

// PATCH /api/admin/enquiries/:ref  { status?, owner? }
export async function onRequestPatch({ params, env, request, data }) {
  const e = await find(env, params.id);
  if (!e) return json({ error: 'Not found.' }, 404);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid body.' }, 400); }
  const changes = [], log = [];
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) return json({ error: 'Invalid status.' }, 400);
    if (body.status !== e.status) { changes.push(['status', body.status]); log.push(`Status: ${e.status} → ${body.status}`); }
  }
  if (body.owner !== undefined) {
    const owner = String(body.owner).trim().slice(0, 120) || null;
    if (owner !== e.owner) { changes.push(['owner', owner]); log.push(`Owner: ${e.owner || 'unassigned'} → ${owner || 'unassigned'}`); }
  }
  if (!changes.length) return json({ ok: true });
  const ts = now();
  await env.DB.batch([
    env.DB.prepare(`UPDATE enquiries SET ${changes.map(([k]) => `${k} = ?`).join(', ')}, updated_at = ? WHERE id = ?`).bind(...changes.map(([, v]) => v), ts, e.id),
    env.DB.prepare('INSERT INTO enquiry_notes (enquiry_id, author, body, created_at) VALUES (?, ?, ?, ?)').bind(e.id, data.admin.email, log.join('; '), ts),
  ]);
  return json({ ok: true });
}
