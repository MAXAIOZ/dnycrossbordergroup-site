import { json, STATUSES } from '../../../../server/db.js';
// GET /api/admin/enquiries?status=&q=&offset=
export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  const status = u.searchParams.get('status') || '';
  const q = (u.searchParams.get('q') || '').trim().slice(0, 100);
  const offset = Math.max(0, parseInt(u.searchParams.get('offset') || '0', 10) || 0);
  const where = [], args = [];
  if (status && STATUSES.includes(status)) { where.push('e.status = ?'); args.push(status); }
  if (q) { where.push('(e.ref LIKE ? OR e.name LIKE ? OR e.email LIKE ? OR e.company LIKE ?)'); args.push(...Array(4).fill(`%${q}%`)); }
  const sql = `SELECT e.id, e.ref, e.kind, e.created_at, e.status, e.owner, e.name, e.email, e.company, e.country, e.notify_status,
      (SELECT COUNT(*) FROM enquiry_items i WHERE i.enquiry_id = e.id) AS items
    FROM enquiries e ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY e.created_at DESC LIMIT 50 OFFSET ?`;
  const rows = (await env.DB.prepare(sql).bind(...args, offset).all()).results;
  const counts = (await env.DB.prepare('SELECT status, COUNT(*) AS n FROM enquiries GROUP BY status').all()).results;
  return json({ rows, counts, statuses: STATUSES, offset });
}
