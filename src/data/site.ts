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
  lastUpdated: '2026-11-01',
  // IndexNow key — the matching key file is public/fc7fd0c2dde75c0336dc49f152b48547.txt
  indexNowKey: 'fc7fd0c2dde75c0336dc49f152b48547',
  // Cloudflare Web Analytics token (Cloudflare dashboard → Analytics → Web Analytics). Leave empty to disable.
  cfAnalyticsToken: 'a4e0537038b645c8b3f5977ee4815fb9',
  // Form endpoint: a Cloudflare Pages Function that sends the enquiry through the company
  // Gmail account (see functions/api/enquiry.js and server/mail.js). No third-party form
  // service sits in the path, so an outside outage cannot swallow an enquiry.
  formEndpoint: '/api/enquiry',
};

export type NavChild = { label: string; href: string; desc?: string; group?: string };
export type NavGroup = { title: string; href?: string };
export type NavItem = {
  label: string;
  href: string;
  shortLabel?: string;
  // Extra path prefixes that count as this section (e.g. Parts & Components under Physical SI).
  match?: string[];
  // Dropdown layout: group headings in order, each holding its children.
  groups?: NavGroup[];
  children?: NavChild[];
};

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
    label: 'Physical Super Intelligence (SI)',
    // No shortLabel: with six top-level items the full name fits from 1141px up.
    href: '/physical-intelligence',
    // Parts & Components sits under Physical SI in the navigation, but keeps its own URLs.
    match: ['/physical-intelligence', '/components'],
    groups: [{ title: 'Physical SI' }, { title: 'Parts & Components', href: '/components' }],
    children: [
      { label: 'Overview', href: '/physical-intelligence', desc: 'Trusted AI for drones, robots and edge systems', group: 'Physical SI' },
      { label: 'Drones', href: '/physical-intelligence/drones', desc: 'Construction, agriculture and inspection', group: 'Physical SI' },
      { label: 'Robotics', href: '/physical-intelligence/robotics', desc: 'Embodied Intelligence', group: 'Physical SI' },
      { label: 'Drone Components', href: '/components/drones', desc: 'Propellers, airframe parts, mounts, cases, KST servos', group: 'Parts & Components' },
      { label: 'Robotics Components', href: '/components/robotics', desc: 'Cleaning, warehouse, gripper parts and KST servos', group: 'Parts & Components' },
      { label: 'Request a Quote', href: '/components/enquiry', desc: 'Model, part number and quantity', group: 'Parts & Components' },
    ],
  },
  {
    label: 'OPC + FDE',
    href: '/opc-fde',
    children: [
      { label: 'Overview', href: '/opc-fde', desc: 'Deliver real projects in Australia and New Zealand' },
      { label: 'Your local partner', href: '/opc-fde#local', desc: 'What DNY does on the ground' },
      { label: 'Open Needs', href: '/opc-fde#needs', desc: 'Work across the DNY group' },
      { label: 'Membership', href: '/opc-fde#membership', desc: 'Community, Professional and Premier' },
      { label: 'Partners', href: '/opc-fde#partners', desc: 'Co-deliver with DNY' },
      { label: 'Join for Free', href: '/opc-fde/join', desc: 'Apply to the Alliance' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Ventures', href: '/ventures' },
];

// Country list shared by the components enquiry form and the Alliance application.
export const COUNTRIES = ['Australia', 'New Zealand', 'Singapore', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'Japan', 'South Korea', 'Hong Kong', 'Taiwan', 'China', 'India', 'United Kingdom', 'Ireland', 'Germany', 'France', 'Netherlands', 'United States', 'Canada', 'United Arab Emirates', 'Other'];

// The only three calls to action used across the site.
export const CTA = {
  brief: { label: 'Request the Group Brief', href: '/contact?type=investment' },
  partner: { label: 'Partner with DNY', href: '/contact?type=partnership' },
  contact: { label: 'Contact us', href: '/contact' },
};

// Form enquiry types (brief §19: every form is tagged by type)
export const ENQUIRY_TYPES = [
  { value: 'enterprise', label: 'Enterprise: deploy AI or Physical Super Intelligence' },
  { value: 'partnership', label: 'Partnership: technology, channel or industry' },
  { value: 'investment', label: 'Investment: group or venture materials' },
  { value: 'developer', label: 'Developer: APIs, integration, open source' },
  { value: 'visit', label: 'Visit: meet the team in Sydney' },
  { value: 'trade', label: 'Trade & fleet: EV accessories for dealers, detailers and fleets' },
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
      { label: 'Physical Super Intelligence (SI)', href: '/physical-intelligence' },
    ],
  },
  {
    title: 'Deployment',
    links: [
      { label: 'Parts & Components', href: '/components' },
      { label: 'OPC + FDE', href: '/opc-fde' },
      { label: 'Industries', href: '/industries' },
      { label: 'Ventures', href: '/ventures' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];
