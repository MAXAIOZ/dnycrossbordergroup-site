// Every /api/admin/* request must carry a valid Cloudflare Access identity.
import { verifyAdmin } from '../../../server/access.js';
import { ensureSchema, json } from '../../../server/db.js';
export async function onRequest(ctx) {
  const admin = await verifyAdmin(ctx.request, ctx.env);
  if (!admin) return json({ error: 'Not authorised.' }, 401);
  if (!ctx.env.DB) return json({ error: 'Database binding DB is not configured.' }, 503);
  await ensureSchema(ctx.env);
  ctx.data.admin = admin;
  return ctx.next();
}
