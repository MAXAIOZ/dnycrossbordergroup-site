import { json } from '../../../../server/db.js';
// GET /api/admin/attachments/:id — streams a private attachment to an authenticated admin.
export async function onRequestGet({ params, env }) {
  const meta = await env.DB.prepare('SELECT filename, content_type FROM enquiry_attachments WHERE id = ?').bind(params.id).first();
  if (!meta) return json({ error: 'Not found.' }, 404);
  const obj = await env.FILES.get(`att:${params.id}`, { type: 'stream' });
  if (!obj) return json({ error: 'File missing.' }, 404);
  return new Response(obj, {
    headers: {
      'Content-Type': meta.content_type,
      'Content-Disposition': `attachment; filename="${meta.filename.replace(/"/g, '')}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
    },
  });
}
