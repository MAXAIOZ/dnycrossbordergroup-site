// The DNY Group architecture (brief §3, §6.2) and Physical Intelligence sub-layers (§4).

export type Layer = {
  n: number;
  level: string;
  name: string;
  role: string;
  summary: string;
  items: string[];
  href: string;
};

// Displayed top-down (5 → 1) on the homepage stack.
export const STACK: Layer[] = [
  {
    n: 5,
    level: 'Level 4',
    name: 'Applied Ventures & Industry Solutions',
    role: 'Independent ventures and industry projects',
    summary:
      'Focused ventures and industry projects — drones, robotics, logistics, construction, trade and media — each with its own customers and business model, built on shared group infrastructure.',
    items: ['DNY Aerial Systems', 'DNY Robotic Systems', 'Logistics & warehousing', 'Built environment', 'Trade & media'],
    href: '/ventures',
  },
  {
    n: 4,
    level: 'Level 3',
    name: 'OPC + FDE Network',
    role: 'Talent, nodes and industry delivery',
    summary:
      'Local OPC nodes (Office + AI Agents) and Forward Deployed Entrepreneurs that turn infrastructure into real industry solutions — from proof of concept to deployment.',
    items: ['OPC nodes', 'FDE delivery', 'Training', 'Incubation', 'Solution delivery'],
    href: '/opc-fde',
  },
  {
    n: 3,
    level: 'Level 2',
    name: 'Open Physical Intelligence Layer',
    role: 'Connecting AI to the physical world',
    summary:
      'The unified connection layer between trusted AI and real devices — drones, robots, edge systems, vision and sensor networks — vendor-neutral and auditable.',
    items: ['Drones', 'Robotics', 'Edge AI', 'Computer vision', 'Autonomous systems'],
    href: '/physical-intelligence',
  },
  {
    n: 2,
    level: 'Level 1',
    name: 'Trusted & Open AI Infrastructure',
    role: 'Digital intelligence infrastructure',
    summary:
      'Open models, AI agents, APIs and private or hybrid deployment — multi-model, multi-cloud and licence-aware, operated as an accountable Australian service.',
    items: ['Open models', 'AI agents', 'APIs', 'Private / hybrid', 'Transaction readiness'],
    href: '/ai-infrastructure',
  },
  {
    n: 1,
    level: 'Foundation',
    name: 'Trusted Data, Identity & Verification Foundation',
    role: 'What makes every layer verifiable',
    summary:
      'A Trusted Data Space with provenance, permissions, versioning, identity and audit — so data, models, devices and decisions can be traced and verified.',
    items: ['Data provenance', 'Identity', 'Permissions', 'Audit logs', 'Data sovereignty'],
    href: '/ai-infrastructure/data-space',
  },
];

// Group hierarchy table (brief §3, Level 0–4), labelled to match the 5-layer stack numbering.
export const HIERARCHY = [
  { level: 'Group', name: 'DNY Cross Border Group', role: 'Group strategy and holding layer', scope: 'Strategy, capital, brand, partnerships, governance and international markets' },
  { level: 'Layers 1–2', name: 'Trusted & Open AI Infrastructure', role: 'Digital intelligence infrastructure', scope: 'Trusted Data Space, open models, identity, audit, APIs, agents and transaction readiness' },
  { level: 'Layer 3', name: 'Open Physical Intelligence Layer', role: 'Physical intelligence connecting AI to the real world', scope: 'Drones, robotics, edge devices, vision systems, autonomous systems and sensor networks' },
  { level: 'Layer 4', name: 'OPC + FDE Network', role: 'Talent, node and industry delivery network', scope: 'Office + AI Agents, Forward Deployed Entrepreneurs, training, incubation and solution delivery' },
  { level: 'Layer 5', name: 'Applied Ventures & Industry Projects', role: 'Independent ventures and industry companies', scope: 'Drones, robotics, logistics and warehousing, construction, trade, media and future verticals' },
];

// Physical AI capability loop (brief §4.1)
export const PI_LOOP = [
  { k: 'Perceive', d: 'Sensors, vision and drones capture the physical environment.', t: 'Sensors · Vision · Drones' },
  { k: 'Understand', d: 'Models interpret signals against trusted, versioned data.', t: 'Models · Data' },
  { k: 'Decide', d: 'AI agents plan the next action within defined permissions.', t: 'AI Agents' },
  { k: 'Act', d: 'Robots, drones and devices execute the task.', t: 'Robots · Drones · Devices' },
  { k: 'Verify', d: 'Identity, permissions, logs and audit confirm what happened.', t: 'Identity · Logs · Audit' },
];

// Reference architecture chain (brief §8)
export const PI_CHAIN = ['Device', 'Edge', 'Trusted Data', 'Model', 'Agent', 'Action', 'Verification'];

// Physical Intelligence sub-layers (brief §4.2)
export const PI_SUBLAYERS = [
  {
    key: 'air',
    name: 'Air Intelligence',
    direction: 'Commercial Drone Systems',
    line: 'Autonomous aerial inspection, sensing, mapping and industrial data capture.',
    href: '/physical-intelligence/drones',
  },
  {
    key: 'embodied',
    name: 'Embodied Intelligence',
    direction: 'Robotics',
    line: 'Robots that perceive, reason and act in Australian industrial and service environments.',
    href: '/physical-intelligence/robotics',
  },
  {
    key: 'edge',
    name: 'Edge Intelligence',
    direction: 'Edge AI & Sensors',
    line: 'Local inference, vision, sensing and control close to the physical asset.',
    href: '/physical-intelligence/edge-ai',
  },
  {
    key: 'auto',
    name: 'Autonomous Operations',
    direction: 'Multi-device orchestration',
    line: 'AI agents coordinating drones, robots and industrial systems under governed workflows.',
    href: '/physical-intelligence/autonomous-systems',
  },
];

// AI Infrastructure modules (brief §7)
export const INFRA_MODULES = [
  { n: '01', name: 'Trusted Data Space', line: 'Data source, permission, version, authorisation, audit and data sovereignty.', href: '/ai-infrastructure/data-space' },
  { n: '02', name: 'Open Model Layer', line: 'Clear distinction between open-source, open-weight and source-available models — multi-model and licence-aware.', href: '/open-source-ai' },
  { n: '03', name: 'Deployment & Integration', line: 'APIs, private and hybrid deployment, identity and enterprise system integration.', href: '/ai-infrastructure/deployment' },
  { n: '04', name: 'AI Agents & Automation', line: 'Agent orchestration, human oversight and governed workflow execution.', href: '/ai-infrastructure/agents' },
  { n: '05', name: 'Trust, Identity & Audit', line: 'Trusted identity, action authorisation, model and data provenance, and audit.', href: '/ai-infrastructure/identity-audit' },
  { n: '06', name: 'AI Transaction Readiness', line: 'Interfaces and architecture prepared for future AI-to-AI and machine-to-machine service settlement.', href: '/ai-infrastructure/transactions' },
];

// Trust diagram (brief §14)
export const TRUST_PILLARS = [
  { k: 'Data provenance', d: 'Where data came from, when, which version, and under what licence.' },
  { k: 'Identity', d: 'Which person, agent, model or device is acting — verified, not assumed.' },
  { k: 'Permission', d: 'What that identity is authorised to read, decide or execute.' },
  { k: 'Audit', d: 'A tamper-evident record of inputs, decisions, actions and outcomes.' },
];
