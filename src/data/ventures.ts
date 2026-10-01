// ─────────────────────────────────────────────────────────────
// Ventures portfolio. Every venture card, venture page header, llms.txt entry and
// schema.org item is generated from this file.
// To rename a venture (e.g. once a standalone brand is registered), change `name` only.
// ─────────────────────────────────────────────────────────────

export type Status = 'Operating' | 'In Development' | 'Proposed' | 'Research' | 'Partnership Opportunity';

export type Category = 'Trusted & Open AI' | 'Physical Intelligence' | 'Industry Ventures';

export type Venture = {
  slug: string;
  name: string;
  short: string;
  category: Category;
  builtOn: string; // which part of the group it builds on
  industries: string[];
  status: Status;
  capabilities: string[];
  tech: string[];
  relation: string; // relationship to DNY infrastructure
  featured?: boolean;
  body?: string; // legacy/long-form body file in src/legacy (defaults to slug)
};

export const STATUS_DEFS: Record<Status, string> = {
  Operating: 'Live with customers or users.',
  'In Development': 'Being designed, built or validated; not yet generally available.',
  Proposed: 'Defined concept awaiting partners, approvals or funding.',
  Research: 'Exploratory research or technical investigation.',
  'Partnership Opportunity': 'Open to a partner to lead or co-develop.',
};

export const CATEGORY_DEFS: Record<Category, string> = {
  'Trusted & Open AI': 'Ventures that productise the group’s trusted, open AI infrastructure.',
  'Physical Intelligence': 'Ventures that bring trusted AI to drones, robots and physical operations.',
  'Industry Ventures': 'Industry businesses that apply the infrastructure in a specific market.',
};

// Core ventures — shown in navigation, cards and venture pages.
export const VENTURES: Venture[] = [
  {
    slug: 'trusted-ai-open-source-platform',
    name: 'Australian Trusted AI Open Source Platform',
    short:
      'An open-core AI platform — model-agnostic, security-isolated and private-deployment capable — paired with an application discovery engine that turns verified news into audited open-source application directions.',
    category: 'Trusted & Open AI',
    builtOn: 'Trusted & Open AI Infrastructure',
    industries: ['Enterprise', 'Government', 'Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Open-core platform', 'Skills & workflows', 'Agent-as-a-service', 'Application discovery engine', 'Audit trail'],
    tech: ['Open models', 'AI agents', 'Trusted data'],
    relation:
      'The platform is the product form of the group’s Trusted & Open AI Infrastructure; every application direction is recorded with its sources, reasoning and decisions.',
    featured: true,
  },
  {
    slug: 'trusted-data-oracle',
    name: 'Australian Trusted Data Oracle DAO',
    short:
      'A not-for-profit, rights-verified data service giving AI agents reliable access to Australian pricing, index and trade data — every figure traceable to its source, governed by an oracle council.',
    category: 'Trusted & Open AI',
    builtOn: 'Trusted Data, Identity & Verification Foundation',
    industries: ['Cross-border Trade', 'Agriculture', 'Enterprise'],
    status: 'In Development',
    capabilities: ['Multi-source verification', 'Cryptographic proof of origin', 'Data APIs for agents', 'Public accountability'],
    tech: ['Trusted data', 'APIs'],
    relation: 'A public-interest data service built directly on the group’s trusted data and verification foundation.',
    body: 'australia-ai-oracle',
  },
  {
    slug: 'dny-aerial-systems',
    name: 'DNY Aerial Systems',
    short:
      'Commercial drone systems for government, infrastructure and enterprise — aircraft and component supply, Australian systems integration and lifecycle support.',
    category: 'Physical Intelligence',
    builtOn: 'Physical Intelligence — Air',
    industries: ['Built Environment', 'Infrastructure & Utilities', 'Enterprise'],
    status: 'In Development',
    capabilities: ['Aerial inspection', 'Mapping & survey', 'Industrial data capture', 'Systems integration', 'Lifecycle support'],
    tech: ['Drones', 'Computer vision', 'Edge AI'],
    relation:
      'Inspection and sensor data flows into trusted data records; computer vision and AI agents produce analysis and reports; device identity, mission permissions and key decisions are recorded for audit.',
    featured: true,
  },
  {
    slug: 'dny-robotic-systems',
    name: 'DNY Robotic Systems',
    short:
      'Embodied and autonomous systems for Australian industrial, logistics and service environments — including the Robotics Experience & Innovation Centre for demonstration, validation and market entry.',
    category: 'Physical Intelligence',
    builtOn: 'Physical Intelligence — Embodied',
    industries: ['Logistics & Warehousing', 'Enterprise', 'Hospitality & Care'],
    status: 'In Development',
    capabilities: ['Embodied AI', 'Autonomous navigation', 'Human–robot collaboration', 'Experience & Innovation Centre', 'Market entry for global robotics'],
    tech: ['Robotics', 'Edge AI', 'AI agents'],
    relation:
      'Robots connect through the physical intelligence layer: models and agents decide, robots act, and every action is bound to an identity, a permission and an audit record.',
    featured: true,
  },
  {
    slug: 'robotic-logistics-warehouse',
    name: 'AI Robotic Logistics Warehouse',
    short:
      'A robotics-driven fulfilment warehouse for cross-border small-goods e-commerce — WMS, OMS and TMS with AI vision quality checks and robotics-assisted picking.',
    category: 'Physical Intelligence',
    builtOn: 'Physical Intelligence — Industrial',
    industries: ['Logistics & Warehousing', 'Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Robotics-assisted picking', 'AI vision quality checks', 'WMS / OMS / TMS', 'Fulfilment-as-a-Service'],
    tech: ['Robotics', 'Computer vision', 'AI agents'],
    relation: 'Combines warehouse robotics and vision with enterprise integration and agents; operational data is governed as trusted records.',
  },
  {
    slug: 'ai-trade-services',
    name: 'AI Trade Services Platform',
    short:
      'AI agents for import and export businesses — content, quoting, customer service, translation and trade data — across Australia, New Zealand, ASEAN and Oceania.',
    category: 'Industry Ventures',
    builtOn: 'Trusted & Open AI Infrastructure',
    industries: ['Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Cross-border marketing content', 'Quoting & customer service', 'Translation', 'Trade data & insight'],
    tech: ['AI agents', 'Open models'],
    relation: 'Runs trade agents on the open model layer, with product, document and trade records kept verifiable.',
  },
  {
    slug: 'building-supply',
    name: 'DNY Building Supply',
    short:
      'A building-materials and supply-chain business connecting suppliers, manufacturers, builders and trade partners, with a showroom and warehouse in Sydney.',
    category: 'Industry Ventures',
    builtOn: 'Industry deployment — Built Environment',
    industries: ['Built Environment', 'Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Full-category building materials', 'Showroom & warehouse', 'Supply-chain coordination', 'Product data'],
    tech: ['Trusted data'],
    relation: 'Product records, certifications and test reports feed the group’s open built-environment data model.',
  },
  {
    slug: 'facadia',
    name: 'Facadia',
    short:
      'AI facade intelligence for residential property — a photo of a home’s exterior returns a materials report and a budget estimate instead of a manual quantity take-off.',
    category: 'Industry Ventures',
    builtOn: 'Industry deployment — Built Environment',
    industries: ['Built Environment', 'Property'],
    status: 'In Development',
    capabilities: ['AI photo analysis', 'Materials identification', 'Budget estimation', 'Privacy by design'],
    tech: ['Computer vision', 'Trusted data'],
    relation: 'Estimates draw on verified product and standards data, so every figure can be traced to its sources.',
  },
  {
    slug: 'auralio',
    name: 'Auralio',
    short:
      'AI room restyling — upload one photo of a room and receive a professionally restyled interior concept with category-level “shop this look” suggestions.',
    category: 'Industry Ventures',
    builtOn: 'Industry deployment — Built Environment',
    industries: ['Property', 'Built Environment', 'Retail'],
    status: 'In Development',
    capabilities: ['Room validation', 'Room reset', 'Style-consistent restyling', 'Shop-this-look links'],
    tech: ['Computer vision', 'Open models'],
    relation: 'Uses a model-agnostic AI layer with provider adapters and privacy-first image handling, consistent with the group’s open, vendor-neutral approach.',
  },
];

// Archived initiatives — listed once, without their own pages.
export const ARCHIVED = [
  { name: 'DNY HR Hub', line: 'Professional exchange, industry visits and business delegations.' },
  { name: 'DNY AI Media Hub', line: 'AI-assisted media production for cross-border sellers.' },
  { name: 'Australia AI Agent Marketplace', line: 'An industry-specialised marketplace for evaluated AI agents.' },
  { name: 'Livestock Data Rights Platform', line: 'Verifiable credentials for livestock export records.' },
];

export const CATEGORIES: Category[] = ['Trusted & Open AI', 'Physical Intelligence', 'Industry Ventures'];

export const getVenture = (slug: string) => {
  const v = VENTURES.find((x) => x.slug === slug);
  if (!v) throw new Error(`Unknown venture: ${slug}`);
  return v;
};
