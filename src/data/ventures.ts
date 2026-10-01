// ─────────────────────────────────────────────────────────────
// Applied Ventures portfolio (brief §6.7, §13, §14).
// Every venture card and venture page header is generated from this file.
// To rename a venture (e.g. once a standalone brand is registered), change `name` only.
// ─────────────────────────────────────────────────────────────

export type Status = 'Operating' | 'In Development' | 'Proposed' | 'Research' | 'Partnership Opportunity';

export type Category =
  | 'Physical Intelligence'
  | 'Trusted Data & AI Services'
  | 'Agents & Automation'
  | 'Industry Platforms';

export type Venture = {
  slug: string;
  name: string;
  short: string;
  category: Category;
  layer: string; // which DNY architecture layer it sits closest to
  industries: string[];
  status: Status;
  capabilities: string[];
  tech: string[];
  relation: string; // relationship to DNY infrastructure
  featured?: boolean;
  legacy?: string; // old URL, for redirects
};

export const STATUS_DEFS: Record<Status, string> = {
  Operating: 'Live with customers or users.',
  'In Development': 'Being designed, built or validated; not yet generally available.',
  Proposed: 'Defined concept awaiting partners, approvals or funding.',
  Research: 'Exploratory research or technical investigation.',
  'Partnership Opportunity': 'Open to a partner to lead or co-develop.',
};

export const VENTURES: Venture[] = [
  {
    slug: 'dny-aerial-systems',
    name: 'DNY Aerial Systems',
    short:
      'Commercial drone systems for government, infrastructure and enterprise — aircraft and component supply, Australian systems integration and lifecycle support.',
    category: 'Physical Intelligence',
    layer: 'Open Physical Intelligence Layer — Air Intelligence',
    industries: ['Built Environment', 'Infrastructure & Utilities', 'Enterprise'],
    status: 'In Development',
    capabilities: ['Aerial inspection', 'Mapping & survey', 'Industrial data capture', 'Systems integration', 'Lifecycle support'],
    tech: ['Drones', 'Computer vision', 'Edge AI'],
    relation:
      'Inspection, vision and sensor data flows into the Trusted Data Space; computer vision and AI agents produce analysis, tasks and reports; device identity, mission permissions and key decisions are recorded for audit.',
    featured: true,
  },
  {
    slug: 'dny-robotic-systems',
    name: 'DNY Robotic Systems',
    short:
      'Embodied and autonomous systems for Australian industrial, logistics and service environments, built on DNY’s trusted open AI and physical intelligence infrastructure.',
    category: 'Physical Intelligence',
    layer: 'Open Physical Intelligence Layer — Embodied Intelligence',
    industries: ['Logistics & Warehousing', 'Enterprise', 'Built Environment'],
    status: 'In Development',
    capabilities: ['Embodied AI', 'Autonomous navigation', 'Manipulation', 'Human–robot collaboration', 'Fleet operations'],
    tech: ['Robotics', 'Edge AI', 'AI agents'],
    relation:
      'Robots connect through the Physical Intelligence Layer: models and agents decide, robots act, and every action is bound to an identity, a permission and an audit record.',
    featured: true,
  },
  {
    slug: 'robotics-experience-centre',
    name: 'Robotics Experience & Innovation Centre',
    short:
      'A physical showcase, testing ground and Australian market-entry environment for advanced global robotics and AI hardware — demonstration, validation, B2B and education.',
    category: 'Physical Intelligence',
    layer: 'Open Physical Intelligence Layer — Embodied Intelligence',
    industries: ['Enterprise', 'Education', 'Hospitality & Care'],
    status: 'In Development',
    capabilities: ['Live robot demonstration', 'Product validation', 'Market entry for global brands', 'B2B pilots', 'STEM education'],
    tech: ['Robotics', 'Open models'],
    relation:
      'A physical validation environment where global robots and AI hardware are integrated with DNY’s open model layer and tested before Australian deployment.',
    legacy: 'project-robotics-centre',
  },
  {
    slug: 'robotic-logistics-warehouse',
    name: 'AI Robotic Logistics Warehouse',
    short:
      'A smart, robotics-driven fulfilment warehouse for cross-border small-goods e-commerce — WMS, OMS and TMS with AI vision quality checks and robotics-assisted picking.',
    category: 'Physical Intelligence',
    layer: 'Open Physical Intelligence Layer — Industrial Intelligence',
    industries: ['Logistics & Warehousing', 'Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Robotics-assisted picking', 'AI vision quality checks', 'WMS / OMS / TMS', 'Fulfilment-as-a-Service'],
    tech: ['Robotics', 'Computer vision', 'AI agents'],
    relation:
      'Combines the Physical Intelligence Layer with enterprise integration and agents; operational data is governed in the Trusted Data Space.',
    legacy: 'project-robotic-warehouse',
  },
  {
    slug: 'ai-trade-services',
    name: 'AI Trade Services Platform',
    short:
      'AI agents for import and export businesses — content, quoting, customer service, translation and trade data — for trade across Asia-Pacific, ASEAN and Oceania.',
    category: 'Industry Platforms',
    layer: 'Applied on Trusted & Open AI Infrastructure',
    industries: ['Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Cross-border marketing content', 'Quoting & customer service', 'Translation', 'Trade data & insight'],
    tech: ['AI agents', 'Open models'],
    relation: 'Runs trade agents on the open model layer, with product, document and trade records verified in the Trusted Data Space.',
    legacy: 'project-ai-trade-services',
  },
  {
    slug: 'ai-media-hub',
    name: 'DNY AI Media Hub',
    short:
      'AI-driven media operations for cross-border sellers — product video, social content, digital humans and multilingual production.',
    category: 'Agents & Automation',
    layer: 'Applied on Trusted & Open AI Infrastructure',
    industries: ['Media', 'Cross-border Trade'],
    status: 'In Development',
    capabilities: ['AI product videos', 'Social media content', 'AI digital humans', 'Multilingual content'],
    tech: ['Open models', 'AI agents'],
    relation: 'Runs media agents on the open model layer, with content provenance and approvals recorded for audit.',
    legacy: 'project-ai-media-hub',
  },
  {
    slug: 'australia-ai-oracle',
    name: 'Australia AI Oracle',
    short:
      'A not-for-profit, rights-verified data platform giving AI agents reliable access to Australian pricing, index and trade data — every figure traceable to its source.',
    category: 'Trusted Data & AI Services',
    layer: 'Trusted Data, Identity & Verification Foundation',
    industries: ['Cross-border Trade', 'Agriculture', 'Enterprise'],
    status: 'In Development',
    capabilities: ['Multi-source verification', 'Cryptographic proof of origin', 'Data APIs for agents', 'Public accountability'],
    tech: ['Trusted data', 'APIs'],
    relation: 'A public-interest data service built directly on the Trusted Data Space and its verification mechanisms.',
    legacy: 'project-ai-oracle',
  },
  {
    slug: 'ai-agent-marketplace',
    name: 'Australia AI Agent Marketplace',
    short:
      'An industry-specialised marketplace where enterprises, SMEs and government can find AI agents suited to Australian rules and workflows.',
    category: 'Agents & Automation',
    layer: 'Trusted & Open AI Infrastructure — Agents',
    industries: ['Enterprise', 'Government'],
    status: 'In Development',
    capabilities: ['Industry-specialised agents', 'Agent evaluation', 'Enterprise, SME and government channels'],
    tech: ['AI agents', 'APIs'],
    relation: 'Lists agents that pass DNY evaluation and licence review; prepared for AI-to-AI service settlement.',
    legacy: 'project-ai-agent-marketplace',
  },
  {
    slug: 'building-supply',
    name: 'DNY Building Supply',
    short:
      'A building-materials and supply-chain venture connecting suppliers, manufacturers, builders and trade partners, with a showroom and warehouse in Sydney.',
    category: 'Industry Platforms',
    layer: 'Applied on Trusted & Open AI Infrastructure',
    industries: ['Built Environment', 'Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Full-category building materials', 'Showroom & warehouse', 'Supply-chain coordination', 'Product data'],
    tech: ['Trusted data'],
    relation: 'Product records, certifications and test reports feed the open built-environment data model in the Trusted Data Space.',
    legacy: 'project-building-supply',
  },
  {
    slug: 'facadia',
    name: 'Facadia — AI Materials Valuation',
    short:
      'Residential facade intelligence — a photo of a home’s exterior returns a materials report and budget estimate instead of a manual quantity take-off.',
    category: 'Industry Platforms',
    layer: 'Applied on Trusted & Open AI Infrastructure',
    industries: ['Built Environment'],
    status: 'In Development',
    capabilities: ['AI photo analysis', 'Budget estimation', 'Privacy by design'],
    tech: ['Computer vision', 'Trusted data'],
    relation: 'Estimates draw on verified product and standards data, so every figure can be traced to its sources.',
    legacy: 'project-facadia',
  },
  {
    slug: 'hr-hub',
    name: 'DNY HR Hub',
    short:
      'A people-focused venture connecting entrepreneurs, professionals and business delegations with real cross-border projects through exchange, industry visits and networking.',
    category: 'Industry Platforms',
    layer: 'Connected to the OPC + FDE Network',
    industries: ['Enterprise', 'Cross-border Trade'],
    status: 'In Development',
    capabilities: ['Professional exchange', 'Industry visits', 'Business delegations', 'Networking'],
    tech: ['AI agents'],
    relation: 'Feeds people and projects into the OPC + FDE network; programmes use DNY agents for coordination.',
    legacy: 'project-hr-hub',
  },
  {
    slug: 'livestock-data-rights',
    name: 'Livestock Data Rights Platform',
    short:
      'Digital notary infrastructure for Australia’s livestock export industries — turning existing records into tamper-proof credentials that buyers, banks and regulators can trust.',
    category: 'Trusted Data & AI Services',
    layer: 'Trusted Data, Identity & Verification Foundation',
    industries: ['Agriculture'],
    status: 'In Development',
    capabilities: ['Show animal passport', 'Batch verification', 'Producer trust profile'],
    tech: ['Trusted data'],
    relation: 'Applies Trusted Data Space provenance and permission controls to agricultural records — an early future-vertical use case.',
    legacy: 'project-livestock',
  },
];

export const CATEGORIES: Category[] = [
  'Physical Intelligence',
  'Trusted Data & AI Services',
  'Agents & Automation',
  'Industry Platforms',
];

export const getVenture = (slug: string) => {
  const v = VENTURES.find((x) => x.slug === slug);
  if (!v) throw new Error(`Unknown venture: ${slug}`);
  return v;
};
