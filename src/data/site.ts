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
    'DNY Cross Border Group is an Australia-led technology and commercialisation group building trusted, open AI infrastructure and connecting it with the physical economy.',
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
      { label: 'Australia & Global', href: '/about#australia-global', desc: 'Sydney-led, globally connected' },
      { label: 'Open Source AI Alliance', href: '/alliance', desc: 'Proposed independent ecosystem body' },
    ],
  },
  {
    label: 'AI Infrastructure',
    href: '/ai-infrastructure',
    children: [
      { label: 'Overview', href: '/ai-infrastructure', desc: 'The digital intelligence layer' },
      { label: 'Trusted AI', href: '/trusted-ai', desc: 'Verifiable data, models and actions' },
      { label: 'Open Source AI', href: '/open-source-ai', desc: 'Open-source, open-weight, source-available' },
      { label: 'Trusted Data Space', href: '/ai-infrastructure/data-space', desc: 'Provenance, permission and sovereignty' },
      { label: 'AI Agents & Automation', href: '/ai-infrastructure/agents', desc: 'Governed agent workflows' },
      { label: 'Deployment & API', href: '/ai-infrastructure/deployment', desc: 'Private, hybrid and API-first' },
      { label: 'Identity & Audit', href: '/ai-infrastructure/identity-audit', desc: 'Who did what, with which authority' },
      { label: 'AI Transaction Readiness', href: '/ai-infrastructure/transactions', desc: 'Machine-to-machine settlement' },
    ],
  },
  {
    label: 'Physical Intelligence',
    href: '/physical-intelligence',
    children: [
      { label: 'Overview', href: '/physical-intelligence', desc: 'The Open Physical Intelligence Layer' },
      { label: 'Drones', href: '/physical-intelligence/drones', desc: 'Air Intelligence' },
      { label: 'Robotics', href: '/physical-intelligence/robotics', desc: 'Embodied Intelligence' },
      { label: 'Edge AI', href: '/physical-intelligence/edge-ai', desc: 'Edge Intelligence' },
      { label: 'Autonomous Systems', href: '/physical-intelligence/autonomous-systems', desc: 'Autonomous Operations' },
    ],
  },
  {
    label: 'OPC + FDE',
    href: '/opc-fde',
    children: [
      { label: 'Overview', href: '/opc-fde', desc: 'The deployment and delivery network' },
      { label: 'OPC Network', href: '/opc-fde/opc-network', desc: 'Office + AI Agents nodes' },
      { label: 'FDE Model', href: '/opc-fde/fde-model', desc: 'Forward-deployed delivery' },
      { label: 'Incubation', href: '/opc-fde#incubation', desc: 'From pilot to venture' },
      { label: 'Australia & New Zealand', href: '/opc-fde#anz', desc: 'Sydney and Auckland' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Overview', href: '/industries', desc: 'Where the infrastructure is used' },
      { label: 'Built Environment', href: '/industries/built-environment' },
      { label: 'Logistics & Warehousing', href: '/industries/logistics-warehousing' },
      { label: 'Cross-border Trade', href: '/industries/cross-border-trade' },
      { label: 'Enterprise & Professional Services', href: '/industries/enterprise' },
      { label: 'Future Verticals', href: '/industries#future' },
    ],
  },
  {
    label: 'Ventures',
    href: '/ventures',
    children: [
      { label: 'Portfolio', href: '/ventures', desc: 'All applied ventures, filterable' },
      { label: 'DNY Aerial Systems', href: '/ventures/dny-aerial-systems', desc: 'Commercial drone systems' },
      { label: 'DNY Robotic Systems', href: '/ventures/dny-robotic-systems', desc: 'Embodied and autonomous robots' },
    ],
  },
];

export const CONTACT_NAV: NavItem = {
  label: 'Contact',
  href: '/contact',
  children: [
    { label: 'Partnership', href: '/contact?type=partnership' },
    { label: 'Investment', href: '/contact?type=investment' },
    { label: 'Enterprise', href: '/contact?type=enterprise' },
    { label: 'Developer', href: '/contact?type=developer' },
    { label: 'Visit', href: '/contact?type=visit' },
  ],
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
      { label: 'Group Architecture', href: '/#architecture' },
      { label: 'Investors & Partners', href: '/investors' },
      { label: 'Careers', href: '/careers' },
      { label: 'Open Source AI Alliance', href: '/alliance' },
    ],
  },
  {
    title: 'Infrastructure',
    links: [
      { label: 'AI Infrastructure', href: '/ai-infrastructure' },
      { label: 'Trusted AI', href: '/trusted-ai' },
      { label: 'Open Source AI', href: '/open-source-ai' },
      { label: 'Physical Intelligence', href: '/physical-intelligence' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    title: 'Deployment',
    links: [
      { label: 'OPC + FDE Network', href: '/opc-fde' },
      { label: 'Industries', href: '/industries' },
      { label: 'Ventures', href: '/ventures' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];
