// ─────────────────────────────────────────────────────────────
// Canonical topic pages (sub-pages of each section).
// Each follows: definition → capabilities → use cases → boundaries → evidence (brief §15).
// ─────────────────────────────────────────────────────────────

type Item = { k?: string; name: string; d: string; href?: string };
type Block = {
  kind: 'tiles' | 'steps' | 'roles' | 'chain' | 'prose' | 'list' | 'trust' | 'loop';
  kicker: string;
  title: string;
  lead?: string;
  anchor?: string;
  items?: Item[];
  chain?: string[];
  paras?: string[];
  list?: string[];
};
type Link = { label: string; href: string };

export type Topic = {
  section: 'physical-intelligence' | 'ai-infrastructure' | 'industries' | 'opc-fde';
  sectionName: string;
  slug: string;
  navTitle: string;
  title: string;
  description: string;
  badge: string;
  h1: string;
  lead: string;
  term: string;
  def: string;
  about?: string[];
  primary: Link;
  secondary?: Link;
  // Buttons shown in the hero, when a topic needs different ones from the group defaults.
  heroPrimary?: Link;
  heroSecondary?: Link;
  ctaButtons?: { primary: Link; secondary?: Link };
  blocks: Block[];
  useCases: string[];
  bounds: string[];
  evidence?: string[];
  related?: Link[];
  ventures?: string[];
  venturesTitle?: string;
  faq?: string[];
  // Small block linking out to the parts catalogue that serves this topic.
  parts?: { title: string; text: string; href: string; label: string };
  cta: { title: string; lead?: string; primary: Link; secondary?: Link };
};

const PI = { section: 'physical-intelligence' as const, sectionName: 'Physical SI' };

export const TOPICS: Topic[] = [
  {
    ...PI,
    slug: 'drones',
    navTitle: 'Drones',
    title: 'Commercial Drones and Components',
    description: 'Commercial aircraft and components for construction, agriculture and inspection. Tell us your application and we confirm availability and supply requirements before a written quote.',
    badge: 'Drones',
    h1: 'Drones for Construction, Agriculture and Inspection',
    lead: 'Explore commercial aircraft and components for construction, agriculture and infrastructure inspection. Tell us your application, required configuration and delivery location. We review suitable options and confirm availability and supply requirements before issuing a written quote.',
    term: 'Commercial aircraft and components',
    def: 'Uncrewed aircraft, payloads and replacement parts used for construction, agriculture and infrastructure inspection work in commercial operations.',
    about: ['Commercial drones', 'Construction drones', 'Agricultural drones', 'Inspection drones'],
    primary: { label: 'Request an Aircraft Quote', href: '/physical-intelligence/drones/enquiry' },
    secondary: { label: 'Browse Drone Components', href: '/components/drones' },
    heroPrimary: { label: 'Request an Aircraft Quote', href: '/physical-intelligence/drones/enquiry' },
    heroSecondary: { label: 'Browse Drone Components', href: '/components/drones' },
    blocks: [
      {
        kind: 'tiles', kicker: 'Where Aircraft Are Used', title: 'Four directions',
        lead: 'Aircraft, payloads and the parts that keep them flying, for the three sectors below.',
        items: [
          { k: 'Build', name: 'Construction Drones', d: 'Site mapping, photogrammetry, progress imagery, roof assessment and building inspection.', href: '/physical-intelligence/drones/construction' },
          { k: 'Grow', name: 'Agricultural Drones', d: 'Crop monitoring, field mapping, spraying and spreading.', href: '/physical-intelligence/drones/agriculture' },
          { k: 'Inspect', name: 'Inspection Drones', d: 'Solar assets, utilities, pipelines, bridges and industrial facilities.', href: '/physical-intelligence/drones/inspection' },
          { k: 'Parts', name: 'Drone Components', d: 'Replacement propellers, airframe parts, mounts, cases and servos.', href: '/components/drones' },
        ],
      },
      {
        kind: 'steps', kicker: 'How enquiries work', title: 'Three steps, in writing',
        items: [
          { name: 'Tell us your application.', d: 'Application, configuration, quantity and delivery location.' },
          { name: 'We review.', d: 'Suitable aircraft and payloads, and the export, import and product requirements that apply.' },
          { name: 'Written quote.', d: 'Price, configuration and delivery are confirmed in writing. Nothing is confirmed before then.' },
        ],
      },
      {
        kind: 'prose', kicker: 'Scope', title: 'What this covers', paras: [
          'DNY currently handles equipment sourcing and sales enquiries. We do not provide flight demonstrations, surveying, inspection operations or agricultural spraying services. Operators are responsible for obtaining the qualifications, registrations and approvals required for their activities.',
          'Product listings are invitations to enquire. Availability, configuration, price and delivery are confirmed in writing after review of applicable export, import and product requirements.',
        ],
      },
      {
        kind: 'prose', kicker: 'Future Direction', title: 'Where Physical SI fits', paras: [
          'Over time, DNY aims to connect aerial data to trusted records, so that what a drone captures can be verified and audited. This is a long-term direction under Physical Super Intelligence (SI). It is not a service DNY offers today.',
        ],
      },
    ],
    useCases: ['Site mapping and photogrammetry', 'Progress and roof imagery', 'Crop monitoring and spraying', 'Solar, utility and industrial inspection'],
    bounds: [
      'Aircraft enquiries are open. Specific models, supplier arrangements and delivery terms are confirmed after review.',
      'DNY does not provide flight demonstrations, surveying, inspection operations or agricultural spraying services.',
      'Operators are responsible for the qualifications, registrations and approvals their activities require, including Civil Aviation Safety Authority (CASA) requirements.',
      'DNY does not manufacture aircraft.',
    ],
    related: [{ label: 'Edge AI & vision', href: '/physical-intelligence#edge' }, { label: 'Built Environment', href: '/industries#built-environment' }],
    ventures: ['dny-aerial-systems'],
    faq: ['drones'],
    parts: {
    title: 'Parts for drones',
    text: 'Replacement propellers, airframe parts, mounts, cases and servos, matched to your model and part number.',
    href: '/components/drones',
    label: 'Browse Drone Components',
  },
  ctaButtons: { primary: { label: 'Request an Aircraft Quote', href: '/physical-intelligence/drones/enquiry' }, secondary: { label: 'Browse Drone Components', href: '/components/drones' } },
  cta: { title: 'Tell us what you need to fly', lead: 'Share your application, configuration and delivery location.', primary: { label: 'Request an Aircraft Quote', href: '/physical-intelligence/drones/enquiry' }, secondary: { label: 'Browse Drone Components', href: '/components/drones' } },
  },
  {
    ...PI,
    slug: 'robotics',
    navTitle: 'Robotics',
    title: 'Embodied Robotics: Embodied Intelligence',
    description: 'Embodied Intelligence on the DNY Physical SI Layer: robots that perceive, reason and act in Australian industrial, logistics and service environments, governed by trusted AI.',
    badge: 'Embodied Intelligence',
    h1: 'Embodied robotics: Embodied Intelligence',
    lead: 'Robots that perceive, reason and act in Australian industrial, logistics and service environments, built on DNY’s trusted, open AI and Physical SI infrastructure.',
    term: 'Embodied AI',
    def: 'AI that operates through a physical body, such as a robot, so it can perceive, reason and act in its surroundings.',
    about: ['Embodied AI', 'Robotics', 'Autonomous systems'],
    primary: { label: 'Discuss a robotics pilot', href: '/contact?type=enterprise' },
    secondary: { label: 'DNY Robotic Systems', href: '/ventures/dny-robotic-systems' },
    blocks: [
      {
        kind: 'tiles', kicker: 'Directions', title: 'Embodied intelligence at DNY',
        lead: 'In this first phase DNY presents long-term positioning and development directions rather than specific products.',
        items: [
          { k: 'Venture', name: 'DNY Robotic Systems', d: 'Embodied and autonomous systems for industrial, logistics and service environments.', href: '/ventures/dny-robotic-systems' },
          { k: 'Part of DNY Robotic Systems', name: 'Robotics Experience & Innovation Centre', d: 'Demonstration, validation and market entry for advanced global robots.', href: '/ventures/dny-robotic-systems#experience-centre' },
          { k: 'Venture', name: 'AI Robotic Logistics Warehouse', d: 'Warehouse robotics integrated with WMS and ERP.', href: '/ventures/robotic-logistics-warehouse' },
        ],
      },
    ],
    useCases: ['Warehouse picking, transport and inventory', 'Inspection and patrol in industrial sites', 'Service robotics in hospitality, aged care and healthcare settings', 'Demonstration and validation before Australian deployment'],
    bounds: ['DNY Robotic Systems is In Development; specific robot products are not yet announced.', 'Robots are sourced and integrated on a global, multi-vendor basis.', 'Deployments follow applicable work health and safety requirements and site risk assessments.'],
    related: [{ label: 'Autonomous Systems', href: '/physical-intelligence#autonomous' }, { label: 'Logistics & Warehousing', href: '/industries#logistics-warehousing' }],
    ventures: ['dny-robotic-systems', 'robotic-logistics-warehouse'],
    faq: ['robotics'],
    parts: {
    title: 'Parts for robots',
    text: 'Cleaning consumables, wheels and tyres, gripper parts and KST servos for commercial and industrial robots.',
    href: '/components/robotics',
    label: 'Browse Robotics Components',
  },
  cta: { title: 'Explore embodied AI for your operations', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner as a robotics provider', href: '/contact?type=partnership' } },
  },
];

export const topicsFor = (section: Topic['section']) => TOPICS.filter((t) => t.section === section);
