import { json } from '../../../../../server/db.js';
import { sendNotification } from '../../../../../server/notify.js';
// POST /api/admin/enquiries/:ref/notify — re-send the inbox notification.
export async function onRequestPost({ params, env, request }) {
  const e = await env.DB.prepare('SELECT id FROM enquiries WHERE ref = ?').bind(params.id).first();
  if (!e) return json({ error: 'Not found.' }, 404);
  const r = await sendNotification(env, e.id, new URL(request.url).origin);
  return json(r, r.ok ? 200 : 502);
}
