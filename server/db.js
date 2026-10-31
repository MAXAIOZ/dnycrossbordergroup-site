// D1 schema — created on first use (idempotent). Binding: env.DB (D1), env.FILES (KV).
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New',
    owner TEXT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    company TEXT, phone TEXT, postcode TEXT, needed_by TEXT, notes TEXT,
    marketing INTEGER NOT NULL DEFAULT 0,
    source_page TEXT, landing_page TEXT, ip_hash TEXT,
    notify_status TEXT NOT NULL DEFAULT 'pending',
    notify_error TEXT, notified_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS enquiry_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enquiry_id INTEGER NOT NULL REFERENCES enquiries(id),
    product_id TEXT, product_name TEXT, model TEXT, part_number TEXT, quantity INTEGER, description TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS enquiry_attachments (
    id TEXT PRIMARY KEY,
    enquiry_id INTEGER NOT NULL REFERENCES enquiries(id),
    filename TEXT NOT NULL, content_type TEXT NOT NULL, size INTEGER NOT NULL, created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS enquiry_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enquiry_id INTEGER NOT NULL REFERENCES enquiries(id),
    author TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS enquiry_aircraft (
    enquiry_id INTEGER PRIMARY KEY REFERENCES enquiries(id),
    buying_as TEXT, organisation TEXT, application TEXT, model_requirement TEXT,
    configuration TEXT, quantity INTEGER, operating_environment TEXT, endurance TEXT,
    tank_capacity TEXT, intended_use TEXT, country_of_use TEXT, role TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS idx_enq_status ON enquiries(status, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_items_enq ON enquiry_items(enquiry_id)`,
];
let ready = false;
export async function ensureSchema(env) {
  if (ready) return;
  if (!env.DB) throw new Error('Database binding DB is not configured.');
  await env.DB.batch(SCHEMA.map((s) => env.DB.prepare(s)));
  // Columns added after the first production deployment. SQLite has no ADD COLUMN IF NOT EXISTS,
  // so a duplicate-column error is expected on every run after the first and is ignored.
  for (const sql of ['ALTER TABLE enquiries ADD COLUMN kind TEXT NOT NULL DEFAULT \'parts\'']) {
    try {
      await env.DB.prepare(sql).run();
    } catch (err) {
      if (!/duplicate column|already exists/i.test(String(err))) throw err;
    }
  }
  ready = true;
}
export const STATUSES = ['New', 'Reviewing', 'Awaiting Information', 'Quoted', 'Closed'];
export const now = () => new Date().toISOString();
export const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', ...extra } });
