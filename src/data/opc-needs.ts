// ─────────────────────────────────────────────────────────────
// Open Needs data. One record per need; the board, the detail pages,
// sitemap and llms.txt all derive from this file.
//
// Rules (design doc §5, §15.1, §16.3, §17.6):
//   - Only needs Max has approved may be recorded here. Never invent, sample or
//     illustrate a need.
//   - `closes` in the past is treated as Closed at build time.
//   - Client names, official links and amounts stay in the local candidate
//     table on Max's Mac. They never enter this repository.
//   - The first release shows DNY's own venture cards (§17.2) instead, because
//     external tender needs are paused. This array therefore starts empty.
// ─────────────────────────────────────────────────────────────

export type Sector =
  | 'Built environment'
  | 'Logistics and warehousing'
  | 'Cross-border trade'
  | 'Enterprise and professional services'
  | 'Drones and robotics'
  | 'Other';

export type NeedStatus = 'Open' | 'Matching' | 'Closed';
export type NeedTier = 'Community' | 'Professional' | 'Premier';

export type Need = {
  id: string; // 'N-2026-001' — sequential, never reused
  title: string; // English, ≤ 80 characters, no client name
  sector: Sector;
  location: string; // city + state, e.g. 'Sydney, NSW'
  delivery: 'Remote' | 'Remote + DNY local support';
  contracting: 'Through DNY' | 'Direct or through DNY' | 'With DNY';
  type: 'Pilot' | 'Project' | 'Ongoing';
  summary: string; // 2–4 sentences, our own words
  skills: string[]; // 3–8
  minTier: NeedTier;
  status: NeedStatus;
  posted: string; // 'YYYY-MM-DD'
  closes?: string; // optional
  source: 'Direct' | 'Public' | 'DNY';
  sourceKind?: 'Tender' | 'EOI' | 'Challenge'; // required when source is 'Public'
  buyerType?: 'Federal agency' | 'State government agency' | 'Local council'
    | 'University' | 'Company' | 'Association'; // required when source is 'Public'
};

export const NEEDS: Need[] = [];

/** A need is closed once its closing date has passed, whatever the stored status says. */
export const effectiveStatus = (n: Need, now: Date = new Date()): NeedStatus => {
  if (n.status === 'Closed') return 'Closed';
  if (!n.closes) return n.status;
  const end = new Date(`${n.closes}T23:59:59`);
  return end.getTime() < now.getTime() ? 'Closed' : n.status;
};

/** Needs that may appear on the board, in the sitemap and in llms.txt. */
export const listedNeeds = (now: Date = new Date()) =>
  NEEDS.filter((n) => effectiveStatus(n, now) !== 'Closed');

export const daysUntil = (closes: string, now: Date = new Date()) =>
  Math.ceil((new Date(`${closes}T23:59:59`).getTime() - now.getTime()) / 86400000);
