import { json, now } from '../../../../../server/db.js';
// POST /api/admin/enquiries/:ref/notes  { body }
export async function onRequestPost({ params, env, request, data }) {
  const e = await env.DB.prepare('SELECT id FROM enquiries WHERE ref = ?').bind(params.id).first();
  if (!e) return json({ error: 'Not found.' }, 404);
  let b;
  try { b = await request.json(); } catch { return json({ error: 'Invalid body.' }, 400); }
  const text = String(b.body || '').trim().slice(0, 4000);
  if (!text) return json({ error: 'Note is empty.' }, 400);
  const ts = now();
  await env.DB.batch([
    env.DB.prepare('INSERT INTO enquiry_notes (enquiry_id, author, body, created_at) VALUES (?, ?, ?, ?)').bind(e.id, data.admin.email, text, ts),
    env.DB.prepare('UPDATE enquiries SET updated_at = ? WHERE id = ?').bind(ts, e.id),
  ]);
  return json({ ok: true }, 201);
}
