// Sends an enquiry notification to the business inbox through the company Gmail account
// (server/mail.js). Failures are recorded on the enquiry and can be re-sent from the admin
// page; they never affect whether the enquiry itself is saved.
import { sendMail } from './mail.js';

export const NOTIFY_EMAIL = 'info@dnycrossbordergroup.com';

export async function sendNotification(env, enquiryId, origin) {
  const db = env.DB;
  const e = await db.prepare('SELECT * FROM enquiries WHERE id = ?').bind(enquiryId).first();
  if (!e) return { ok: false, error: 'Enquiry not found' };
  const items = (await db.prepare('SELECT * FROM enquiry_items WHERE enquiry_id = ? ORDER BY id').bind(enquiryId).all()).results;
  const files = (await db.prepare('SELECT filename FROM enquiry_attachments WHERE enquiry_id = ?').bind(enquiryId).all()).results;
  const lines = items.map((it, i) =>
    `${i + 1}. ${it.product_id ? `${it.product_name} [${it.product_id}]` : 'Part not listed'} | Model: ${it.model || '-'} | Part no.: ${it.part_number || '-'} | Qty: ${it.quantity ?? 'not stated'}${it.description ? ` | ${it.description}` : ''}`
  ).join('\n');
  const text = [
    'New components enquiry from the website.',
    '',
    `Reference: ${e.ref}`,
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    `Country: ${e.country || '-'}`,
    `Company: ${e.company || '-'}`,
    `Phone: ${e.phone || '-'}`,
    `Delivery postcode: ${e.postcode || '-'}`,
    `Needed by: ${e.needed_by || '-'}`,
    `Marketing opt-in: ${e.marketing ? 'Yes' : 'No'}`,
    '',
    'Items:',
    lines || '-',
    '',
    'Notes:',
    e.notes || '-',
    '',
    `Attachments: ${files.length ? `${files.length} file(s) — view in ${origin}/admin/enquiries#${e.ref}` : 'None'}`,
    '',
    '—',
    `Received: ${e.created_at}`,
    `Reply directly to this message to answer ${e.name}.`,
  ].join('\n');

  let ok = false, error = '';
  try {
    await sendMail(env, { replyTo: e.email, subject: `[DNY Components] New enquiry ${e.ref}`, text });
    ok = true;
  } catch (err) {
    error = String(err && err.message ? err.message : err).slice(0, 300);
  }
  await db.prepare('UPDATE enquiries SET notify_status = ?, notify_error = ?, notified_at = ? WHERE id = ?')
    .bind(ok ? 'sent' : 'failed', ok ? null : error, new Date().toISOString(), enquiryId).run();
  return { ok, error };
}
