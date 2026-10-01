// Industries (brief §6.6, §12) and the Industry × Capability matrix (brief §14).

export const CAPABILITIES = [
  { key: 'data', label: 'Trusted Data Space', href: '/ai-infrastructure/data-space' },
  { key: 'agents', label: 'AI Agents', href: '/ai-infrastructure/agents' },
  { key: 'deploy', label: 'Private / Hybrid Deployment', href: '/ai-infrastructure/deployment' },
  { key: 'vision', label: 'Computer Vision', href: '/physical-intelligence/edge-ai' },
  { key: 'drones', label: 'Drones', href: '/physical-intelligence/drones' },
  { key: 'robotics', label: 'Robotics', href: '/physical-intelligence/robotics' },
  { key: 'fde', label: 'FDE Delivery', href: '/opc-fde/fde-model' },
] as const;

export type CapKey = (typeof CAPABILITIES)[number]['key'];

export type Industry = {
  slug: string;
  name: string;
  line: string;
  description: string;
  useCases: string[];
  caps: Partial<Record<CapKey, 'core' | 'supporting'>>;
  ventures: string[];
  href: string;
  future?: boolean;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'built-environment',
    name: 'Built Environment',
    line: 'Building data, materials, modular construction, computer vision, site inspection and digital twins.',
    description:
      'Verifiable building-product data, standards mapping and modular construction libraries — combined with aerial and on-site inspection — so design, procurement and asset systems can rely on the same trusted record.',
    useCases: ['Open building-product data and standards mapping', 'Modular and MMC component libraries', 'Drone-based site and facade inspection', 'Digital twins for asset handover', 'AI-assisted materials valuation'],
    caps: { data: 'core', agents: 'supporting', vision: 'core', drones: 'core', fde: 'supporting' },
    ventures: ['building-supply', 'facadia', 'dny-aerial-systems'],
    href: '/industries/built-environment',
  },
  {
    slug: 'logistics-warehousing',
    name: 'Logistics & Warehousing',
    line: 'Warehouse automation, robotics, predictive operations, supply-chain AI, vision and drones.',
    description:
      'Robotics, computer vision and AI agents integrated with WMS, ERP and sensor data — the sector where reported Australian AI use is lowest and the deployment upside is highest.',
    useCases: ['Warehouse robotics and automation', 'Vision-based inventory and quality checks', 'Predictive operations and digital twins', 'Supply-chain intelligence', 'Drone-based yard and stock counts'],
    caps: { data: 'supporting', agents: 'core', deploy: 'supporting', vision: 'core', drones: 'supporting', robotics: 'core', fde: 'core' },
    ventures: ['robotic-logistics-warehouse', 'dny-robotic-systems'],
    href: '/industries/logistics-warehousing',
  },
  {
    slug: 'cross-border-trade',
    name: 'Cross-border Trade',
    line: 'Product data, compliance, channels, supply chain, AI agents and cross-border business workflows.',
    description:
      'Trusted product and document records plus AI agents for the paperwork, compliance checks and channel workflows that slow down cross-border business.',
    useCases: ['Trade documentation automation', 'Product data and compliance records', 'Channel and distribution workflows', 'Verifiable supplier information'],
    caps: { data: 'core', agents: 'core', deploy: 'supporting', fde: 'supporting' },
    ventures: ['ai-trade-services', 'building-supply', 'australia-ai-oracle'],
    href: '/industries/cross-border-trade',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise & Professional Services',
    line: 'Enterprise agents, private / hybrid deployment, internal knowledge and workflow automation.',
    description:
      'AI agents and workflow automation deployed where enterprise data needs to live — with identity, permissions, human oversight and audit built in.',
    useCases: ['Internal knowledge assistants', 'Workflow and document automation', 'HR and talent operations', 'Evaluated agents from a governed marketplace'],
    caps: { data: 'supporting', agents: 'core', deploy: 'core', fde: 'core' },
    ventures: ['ai-agent-marketplace', 'hr-hub', 'ai-media-hub'],
    href: '/industries/enterprise',
  },
  {
    slug: 'future',
    name: 'Future Verticals',
    line: 'Mining, agriculture, utilities, health & ageing — future expansion.',
    description:
      'Sectors where the same infrastructure applies and where DNY expects to expand over time. These are future expansion areas, not current operations.',
    useCases: ['Mining — inspection and autonomous operations', 'Agriculture — data rights and provenance', 'Utilities — asset inspection by drone', 'Health & ageing — service robotics'],
    caps: { data: 'supporting', drones: 'supporting', robotics: 'supporting' },
    ventures: ['livestock-data-rights'],
    href: '/industries#future',
    future: true,
  },
];
