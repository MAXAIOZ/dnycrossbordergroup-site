// ─────────────────────────────────────────────────────────────
// Global site data: organisation, navigation, footer, enquiry types.
// Edit here — every page reads from this file.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'DNY Cross Border Group',
  legalName: 'DNY Cross Border Group Pty Ltd',
  url: 'https://dnycrossbordergroup.com',
  email: 'info@dnycrossbordergroup.com',
  careersEmail: 'head@dnycrossbordergroup.com',
  address: {
    street: '1 Sussex St',
    locality: 'Barangaroo',
    region: 'NSW',
    postcode: '2000',
    country: 'AU',
    display: '1 Sussex St, Barangaroo NSW 2000, Australia',
  },
  positioning:
    'DNY Cross Border Group is a Sydney-headquartered technology group that grew from cross-border trade into building trusted, open AI and physical intelligence infrastructure for Australian industry, commercialised through focused ventures.',
  shortPositioning:
    'Australia-led trusted, open AI and physical intelligence infrastructure group.',
  defaultOg: '/og/default.png',
  alternateNames: ['DNY', 'DNY Group', 'DNY Cross Border'],
  // Official profiles (LinkedIn, Crunchbase, X, GitHub…). Each one strengthens entity recognition
  // by search engines and AI assistants. Add full URLs here; they are output as schema.org sameAs.
  sameAs: [] as string[],
  // Shown as "Last updated" and used as dateModified in structured data. Bump on content changes.
  lastUpdated: '2026-10-01',
  // IndexNow key — the matching key file is public/fc7fd0c2dde75c0336dc49f152b48547.txt
  indexNowKey: 'fc7fd0c2dde75c0336dc49f152b48547',
  // Cloudflare Web Analytics token (Cloudflare dashboard → Analytics → Web Analytics). Leave empty to disable.
  cfAnalyticsToken: '',
  // Form endpoint (FormSubmit free tier). The first submission triggers a one-time
  // activation email to the inbox below; click "Activate" in that email once.
  formEndpoint: 'https://formsubmit.co/ajax/info@dnycrossbordergroup.com',
};

export type NavChild = { label: string; href: string; desc?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Group Overview', href: '/about', desc: 'Who DNY is and how the group is structured' },
      { label: 'From Cross-border to AI', href: '/about#story', desc: 'How the group evolved' },
      { label: 'Investors & Partners', href: '/investors', desc: 'For capital and institutional partners' },
      { label: 'Contact', href: '/contact', desc: 'Sydney headquarters' },
    ],
  },
  {
    label: 'AI Infrastructure',
    href: '/ai-infrastructure',
    children: [
      { label: 'Overview', href: '/ai-infrastructure', desc: 'Models, agents, deployment and data' },
      { label: 'Trusted AI', href: '/trusted-ai', desc: 'Provenance, identity, permission and audit' },
      { label: 'Open Source AI', href: '/open-source-ai', desc: 'Open-source, open-weight, source-available' },
    ],
  },
  {
    label: 'Physical Intelligence',
    href: '/physical-intelligence',
    children: [
      { label: 'Overview', href: '/physical-intelligence', desc: 'Trusted AI for drones, robots and edge systems' },
      { label: 'Drones', href: '/physical-intelligence/drones', desc: 'Air Intelligence' },
      { label: 'Robotics', href: '/physical-intelligence/robotics', desc: 'Embodied Intelligence' },
    ],
  },
  { label: 'OPC + FDE', href: '/opc-fde' },
  { label: 'Industries', href: '/industries' },
  { label: 'Ventures', href: '/ventures' },
];

// The only three calls to action used across the site.
export const CTA = {
  brief: { label: 'Request the Group Brief', href: '/contact?type=investment' },
  partner: { label: 'Partner with DNY', href: '/contact?type=partnership' },
  contact: { label: 'Contact us', href: '/contact' },
};

// Form enquiry types (brief §19: every form is tagged by type)
export const ENQUIRY_TYPES = [
  { value: 'enterprise', label: 'Enterprise — deploy AI or physical intelligence' },
  { value: 'partnership', label: 'Partnership — technology, channel or industry' },
  { value: 'investment', label: 'Investment — group or venture materials' },
  { value: 'developer', label: 'Developer — APIs, integration, open source' },
  { value: 'visit', label: 'Visit — meet the team in Sydney' },
  { value: 'general', label: 'General enquiry' },
] as const;

export const FOOTER = [
  {
    title: 'Group',
    links: [
      { label: 'Group Overview', href: '/about' },
      { label: 'Investors & Partners', href: '/investors' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { label: 'AI Infrastructure', href: '/ai-infrastructure' },
      { label: 'Trusted AI', href: '/trusted-ai' },
      { label: 'Open Source AI', href: '/open-source-ai' },
      { label: 'Physical Intelligence', href: '/physical-intelligence' },
    ],
  },
  {
    title: 'Deployment',
    links: [
      { label: 'OPC + FDE', href: '/opc-fde' },
      { label: 'Industries', href: '/industries' },
      { label: 'Ventures', href: '/ventures' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];
