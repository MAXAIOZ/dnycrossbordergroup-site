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
  blocks: Block[];
  useCases: string[];
  bounds: string[];
  evidence?: string[];
  related?: Link[];
  ventures?: string[];
  venturesTitle?: string;
  faq?: string[];
  cta: { title: string; lead?: string; primary: Link; secondary?: Link };
};

const PI = { section: 'physical-intelligence' as const, sectionName: 'Physical Intelligence' };
const AI = { section: 'ai-infrastructure' as const, sectionName: 'AI Infrastructure' };
const IND = { section: 'industries' as const, sectionName: 'Industries' };
const OPC = { section: 'opc-fde' as const, sectionName: 'OPC + FDE' };

export const TOPICS: Topic[] = [
  // ── Physical Intelligence ──────────────────────────────
  {
    ...PI,
    slug: 'drones',
    navTitle: 'Drones',
    title: 'Commercial Drones — Air Intelligence',
    description: 'Air Intelligence on the DNY Physical Intelligence Layer: commercial drone systems for autonomous aerial inspection, sensing, mapping and industrial data capture, with trusted data and audit built in.',
    badge: 'Air Intelligence',
    h1: 'Commercial drones: Air Intelligence',
    lead: 'Autonomous aerial inspection, sensing, mapping and industrial data capture — connected to trusted AI so that what a drone sees becomes verified, actionable information.',
    term: 'Commercial drone systems',
    def: 'Uncrewed aircraft, sensors and software used for inspection, mapping, sensing and industrial data capture in commercial and government operations.',
    about: ['Commercial drones', 'Aerial inspection', 'Computer vision'],
    primary: { label: 'Discuss a drone programme', href: '/contact?type=enterprise' },
    secondary: { label: 'DNY Aerial Systems', href: '/ventures/dny-aerial-systems' },
    blocks: [
      {
        kind: 'roles', kicker: 'How It Fits', title: 'DNY is not a drone company — drones are one direction of the layer',
        lead: 'The commercial drone programme is the first industry programme under Physical Intelligence. It can operate as an independent brand and company while reusing group infrastructure.',
        items: [
          { name: 'DNY Group', d: 'Strategy, platform, trusted infrastructure, ecosystem and capital.' },
          { name: 'Physical Intelligence Layer', d: 'The unified connection between devices and AI.' },
          { name: 'Drone venture', d: 'Products, services, customers, operations and revenue — DNY Aerial Systems.' },
        ],
      },
      {
        kind: 'steps', kicker: 'The Trusted Loop', title: 'From flight to verified report',
        items: [
          { name: 'Data return', d: 'Inspection, vision and sensor data flows into the Trusted Data Space with source, time and device identity.', k: 'Trusted Data Space' },
          { name: 'AI processing', d: 'Computer vision and AI agents generate analysis, tasks, reports and anomaly handling.', k: 'Vision + Agents' },
          { name: 'Trusted record', d: 'Models, data, device identity, mission permissions and key judgements are recorded for audit.', k: 'Audit' },
        ],
      },
      {
        kind: 'tiles', kicker: 'Capabilities', title: 'What Air Intelligence covers',
        items: [
          { k: 'Inspect', name: 'Aerial inspection', d: 'Infrastructure, facades, roofs, utilities and industrial assets.' },
          { k: 'Map', name: 'Mapping & survey', d: 'Photogrammetry and site models for construction and asset management.' },
          { k: 'Sense', name: 'Environmental sensing', d: 'Thermal, multispectral and environmental payloads.' },
          { k: 'Capture', name: 'Industrial data capture', d: 'Repeatable missions that feed digital twins and maintenance systems.' },
        ],
      },
    ],
    useCases: ['Infrastructure and utility asset inspection', 'Construction progress and facade inspection', 'Mapping and survey for project and asset records', 'Yard, stockpile and inventory counts', 'Emergency and environmental assessment support'],
    bounds: ['DNY Aerial Systems is In Development; no products, contracts or approvals are implied.', 'Operations will be subject to Civil Aviation Safety Authority (CASA) requirements and customer authorisations.', 'Aircraft are sourced on a multi-vendor basis; DNY does not claim to manufacture aircraft.'],
    related: [{ label: 'Edge AI & vision', href: '/physical-intelligence/edge-ai' }, { label: 'Built Environment', href: '/industries/built-environment' }],
    ventures: ['dny-aerial-systems'],
    faq: ['drones'],
    cta: { title: 'Plan a governed drone programme', lead: 'Inspection, mapping or data capture — tell us about your assets.', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner as a supplier', href: '/contact?type=partnership' } },
  },
  {
    ...PI,
    slug: 'robotics',
    navTitle: 'Robotics',
    title: 'Embodied Robotics — Embodied Intelligence',
    description: 'Embodied Intelligence on the DNY Physical Intelligence Layer: robots that perceive, reason and act in Australian industrial, logistics and service environments, governed by trusted AI.',
    badge: 'Embodied Intelligence',
    h1: 'Embodied robotics: Embodied Intelligence',
    lead: 'Robots that perceive, reason and act in Australian industrial, logistics and service environments — built on DNY’s trusted open AI and physical intelligence infrastructure.',
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
          { k: 'Venture', name: 'Robotics Experience & Innovation Centre', d: 'Demonstration, validation and market entry for advanced global robots.', href: '/ventures/robotics-experience-centre' },
          { k: 'Venture', name: 'AI Robotic Logistics Warehouse', d: 'Warehouse robotics integrated with WMS and ERP.', href: '/ventures/robotic-logistics-warehouse' },
        ],
      },
      { kind: 'loop', kicker: 'How Robots Use the Layer', title: 'Perceive, understand, decide, act, verify' },
      { kind: 'trust', kicker: 'Safety', title: 'Every action bound to identity and permission', lead: 'Robots share space with people. Permissions, logging, human oversight and escalation are designed in from the start.' },
    ],
    useCases: ['Warehouse picking, transport and inventory', 'Inspection and patrol in industrial sites', 'Service robotics in hospitality, aged care and healthcare settings', 'Demonstration and validation before Australian deployment'],
    bounds: ['DNY Robotic Systems is In Development; specific robot products are not yet announced.', 'Robots are sourced and integrated on a global, multi-vendor basis.', 'Deployments follow applicable work health and safety requirements and site risk assessments.'],
    related: [{ label: 'Autonomous Systems', href: '/physical-intelligence/autonomous-systems' }, { label: 'Logistics & Warehousing', href: '/industries/logistics-warehousing' }],
    ventures: ['dny-robotic-systems', 'robotics-experience-centre', 'robotic-logistics-warehouse'],
    faq: ['robotics'],
    cta: { title: 'Explore embodied AI for your operations', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner as a robotics provider', href: '/contact?type=partnership' } },
  },
  {
    ...PI,
    slug: 'edge-ai',
    navTitle: 'Edge AI',
    title: 'Edge AI & Computer Vision — Edge Intelligence',
    description: 'Edge Intelligence on the DNY Physical Intelligence Layer: local inference, computer vision, sensing and control close to the physical asset, with trusted data and audit.',
    badge: 'Edge Intelligence',
    h1: 'Edge AI and computer vision: Edge Intelligence',
    lead: 'Local inference, vision, sensing and control close to the physical asset — for low latency, resilience and data control.',
    term: 'Edge AI',
    def: 'Running AI inference on or near the device or asset, rather than in a distant cloud, for lower latency, resilience and data control.',
    about: ['Edge AI', 'Computer vision', 'Sensors'],
    primary: { label: 'Discuss an edge deployment', href: '/contact?type=enterprise' },
    secondary: { label: 'Physical Intelligence overview', href: '/physical-intelligence' },
    blocks: [
      {
        kind: 'tiles', kicker: 'Capabilities', title: 'What runs at the edge',
        items: [
          { k: 'Vision', name: 'Computer vision', d: 'Detection, counting, defect and safety analytics from cameras and drones.' },
          { k: 'Sense', name: 'Sensor fusion', d: 'Combining vision, thermal, lidar and IoT signals into one picture.' },
          { k: 'Infer', name: 'Local inference', d: 'Open models optimised to run on edge hardware.' },
          { k: 'Control', name: 'Device control', d: 'Closing the loop with machines, under permissions.' },
        ],
      },
      {
        kind: 'chain', kicker: 'Data Path', title: 'Edge first, trusted always',
        chain: ['Sensor', 'Edge inference', 'Local action', 'Hash & sync', 'Trusted Data Space', 'Audit'],
      },
    ],
    useCases: ['Vision-based quality and safety checks', 'Inventory and asset counting', 'On-site inference where connectivity is limited', 'Keeping sensitive video on premises'],
    bounds: ['Edge hardware is selected per site on a multi-vendor basis.', 'Model choice depends on licence review and on-device performance.'],
    related: [{ label: 'Drones', href: '/physical-intelligence/drones' }, { label: 'Trusted Data Space', href: '/ai-infrastructure/data-space' }],
    ventures: ['robotic-logistics-warehouse', 'dny-aerial-systems'],
    faq: ['physical'],
    cta: { title: 'Put intelligence next to the asset', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Developer enquiry', href: '/contact?type=developer' } },
  },
  {
    ...PI,
    slug: 'autonomous-systems',
    navTitle: 'Autonomous Systems',
    title: 'Autonomous Systems — Autonomous Operations',
    description: 'Autonomous Operations on the DNY Physical Intelligence Layer: AI agents coordinating drones, robots and industrial systems under governed workflows with human escalation.',
    badge: 'Autonomous Operations',
    h1: 'Autonomous systems: multi-device operations',
    lead: 'AI agents coordinating drones, robots and industrial systems under governed workflows — with people in control of the decisions that matter.',
    term: 'Autonomous operations',
    def: 'Multiple devices — drones, robots and industrial systems — coordinated by AI agents under governed workflows with human escalation.',
    about: ['Autonomous systems', 'AI agents', 'Orchestration'],
    primary: { label: 'Discuss autonomous operations', href: '/contact?type=enterprise' },
    secondary: { label: 'AI Agents & Automation', href: '/ai-infrastructure/agents' },
    blocks: [
      {
        kind: 'steps', kicker: 'Orchestration', title: 'How multi-device operations run',
        items: [
          { name: 'Task intake', d: 'A business event or schedule creates a task with a defined scope.', k: 'Workflow' },
          { name: 'Agent planning', d: 'An AI agent plans which devices do what, within its permissions.', k: 'Agent' },
          { name: 'Device execution', d: 'Drones, robots and systems carry out their parts through standard interfaces.', k: 'Devices' },
          { name: 'Human checkpoint', d: 'Safety-critical or unusual steps wait for human approval; anomalies escalate.', k: 'Oversight' },
          { name: 'Verified close-out', d: 'Results, evidence and decisions are written to the audit record.', k: 'Audit' },
        ],
      },
      { kind: 'trust', kicker: 'Governance', title: 'Autonomy within limits' },
    ],
    useCases: ['Coordinated drone and ground-robot inspection', 'Warehouse fleets working with WMS', 'Site monitoring with automated escalation', 'Scheduled data capture feeding digital twins'],
    bounds: ['Full autonomy is not applied where it is inappropriate or unsafe.', 'Autonomy levels are set per site and per task in agreement with the operator.'],
    related: [{ label: 'Robotics', href: '/physical-intelligence/robotics' }, { label: 'Identity & Audit', href: '/ai-infrastructure/identity-audit' }],
    ventures: ['dny-robotic-systems', 'dny-aerial-systems', 'robotic-logistics-warehouse'],
    faq: ['physical', 'agents'],
    cta: { title: 'Coordinate devices under one governed workflow', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner with DNY', href: '/contact?type=partnership' } },
  },

  // ── AI Infrastructure ─────────────────────────────────
  {
    ...AI,
    slug: 'data-space',
    navTitle: 'Trusted Data Space',
    title: 'Trusted Data Space',
    description: 'DNY’s Trusted Data Space records data source, permission, version, authorisation and audit, so organisations can share and use data with AI while keeping control and data sovereignty.',
    badge: 'Foundation',
    h1: 'Trusted Data Space: provenance, permission and sovereignty',
    lead: 'The foundation every other layer builds on: data whose source, version, licence and permissions are recorded and can be verified.',
    term: 'Trusted Data Space',
    def: 'A governed environment where data is shared under recorded provenance, versions, licences and permissions, so parties can collaborate without losing control of their data.',
    about: ['Trusted Data Space', 'Data provenance', 'Data sovereignty'],
    primary: { label: 'Talk to us about your data', href: '/contact?type=enterprise' },
    secondary: { label: 'Trusted AI', href: '/trusted-ai' },
    blocks: [
      {
        kind: 'tiles', kicker: 'What It Records', title: 'Six properties of trusted data',
        items: [
          { k: '01', name: 'Source', d: 'Who created the data and where it came from.' },
          { k: '02', name: 'Version', d: 'Which version, and its modification history.' },
          { k: '03', name: 'Permission', d: 'Who may access it, for which purpose.' },
          { k: '04', name: 'Authorisation', d: 'Whether use for AI processing or training was granted.' },
          { k: '05', name: 'Audit', d: 'Every access and model call that touched it.' },
          { k: '06', name: 'Sovereignty', d: 'Where it is stored and under which jurisdiction.' },
        ],
      },
      {
        kind: 'prose', kicker: 'How It Works', title: 'A hybrid architecture',
        paras: [
          'Original business data, documents and model materials stay in secure databases or cloud environments that meet privacy and business requirements.',
          'For critical data, a unique <strong>hash, version, timestamp, source, authorisation status</strong> and verification record are kept — enabling integrity checks and long-term traceability without moving the data itself.',
          'Hashing, digital signatures, trusted timestamps and distributed ledgers are technology options for verification, not the platform’s identity.',
        ],
      },
    ],
    useCases: ['Building-product and certification records', 'Supply-chain and trade documents', 'Device and inspection data from the physical layer', 'Grounding AI retrieval and agents in verified sources'],
    bounds: ['Customer data is not a platform asset because it is processed; ownership, processing and training permissions are defined by contract.', 'DNY does not publish companies’ commercial data — access is tiered and authorised.'],
    related: [{ label: 'Identity & Audit', href: '/ai-infrastructure/identity-audit' }, { label: 'AI Infrastructure overview', href: '/ai-infrastructure' }],
    ventures: ['australia-ai-oracle', 'livestock-data-rights', 'building-supply'],
    faq: ['trusted'],
    cta: { title: 'Make your data AI-ready and verifiable', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Developer enquiry', href: '/contact?type=developer' } },
  },
  {
    ...AI,
    slug: 'agents',
    navTitle: 'AI Agents & Automation',
    title: 'AI Agents & Automation',
    description: 'DNY deploys AI agents and workflow automation with agent orchestration, human oversight and governed execution — from enterprise workflows to coordinating physical devices.',
    badge: 'AI Agents',
    h1: 'AI agents and automation, with human oversight',
    lead: 'Agents that plan and carry out multi-step work — orchestrated, permissioned and recorded, with people in the loop where it matters.',
    term: 'AI Agent',
    def: 'Software that uses an AI model to plan and carry out multi-step tasks by calling tools, systems or devices.',
    about: ['AI agents', 'Workflow automation', 'Human oversight'],
    primary: { label: 'Discuss an agent deployment', href: '/contact?type=enterprise' },
    secondary: { label: 'AI Agent Marketplace', href: '/ventures/ai-agent-marketplace' },
    blocks: [
      {
        kind: 'tiles', kicker: 'Capabilities', title: 'From single tasks to orchestrated workflows',
        items: [
          { k: 'Orchestrate', name: 'Agent orchestration', d: 'Multiple agents and tools coordinated across a workflow.' },
          { k: 'Oversee', name: 'Human oversight', d: 'Approval, review and escalation where full autonomy is inappropriate.' },
          { k: 'Execute', name: 'Workflow execution', d: 'Integration with enterprise systems, APIs and devices.' },
          { k: 'Evaluate', name: 'Evaluation', d: 'Agents tested and licence-checked before production use.' },
        ],
      },
    ],
    useCases: ['Document and back-office automation', 'Knowledge assistants over internal data', 'Trade and procurement workflows', 'Coordinating drones and robots in the physical layer'],
    bounds: ['Agents act only within explicitly granted permissions.', 'High-impact decisions keep a human approval step.'],
    related: [{ label: 'Autonomous Systems', href: '/physical-intelligence/autonomous-systems' }, { label: 'Identity & Audit', href: '/ai-infrastructure/identity-audit' }],
    ventures: ['ai-agent-marketplace', 'hr-hub', 'ai-media-hub'],
    faq: ['agents'],
    cta: { title: 'Deploy agents you can account for', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Developer enquiry', href: '/contact?type=developer' } },
  },
  {
    ...AI,
    slug: 'deployment',
    navTitle: 'Deployment & API',
    title: 'Deployment, Integration & API',
    description: 'How DNY deploys AI: APIs, private and hybrid deployment, identity and enterprise integration — evaluated, integrated, deployed, governed and operated as one accountable service.',
    badge: 'Deployment & Integration',
    h1: 'Deployment and integration: one accountable partner',
    lead: 'API-first integration with enterprise data and systems, deployed in the cloud, privately or in hybrid environments — and operated as a managed service.',
    term: 'Private / hybrid AI deployment',
    def: 'Running AI models and agents inside an organisation’s own environment, or across its environment and the cloud, so that sensitive data stays under its control.',
    about: ['AI deployment', 'API', 'Hybrid cloud'],
    primary: { label: 'Plan a deployment', href: '/contact?type=enterprise' },
    secondary: { label: 'Developer enquiry', href: '/contact?type=developer' },
    blocks: [
      {
        kind: 'steps', kicker: 'The Operating Model', title: 'Evaluate → integrate → deploy → govern → operate', anchor: 'operating-model',
        items: [
          { name: 'Evaluate', d: 'Select suitable open models, review licences and assess capability, cost and safety before production.', k: 'Licence review' },
          { name: 'Integrate', d: 'Connect to enterprise data, APIs and tools with identity, access and clear data separation.', k: 'API-first' },
          { name: 'Deploy', d: 'Cloud, private or hybrid deployment where the data needs to live, using reference architectures.', k: 'Private / hybrid' },
          { name: 'Govern', d: 'Provenance, audit logging, human oversight and a model licence and standards register.', k: 'Auditable' },
          { name: 'Operate', d: 'Monitoring, support, incident handling and continuous improvement as a managed service.', k: 'Managed' },
        ],
      },
      {
        kind: 'list', kicker: 'Ground Rules', title: 'Data and IP, handled properly',
        list: ['Each party keeps existing IP; new data, derived results and joint work are assigned by specific agreement.', 'Customer data is not a platform asset because it is processed.', 'Escalation and review where full autonomy is inappropriate or unsafe.', 'Standardised interfaces: APIs, data dictionaries and unified identifiers.'],
      },
    ],
    useCases: ['Private AI assistants on internal knowledge', 'Integrating agents with ERP, WMS and CRM systems', 'Hybrid deployment for regulated data', 'APIs for partners and developers'],
    bounds: ['Deployment options depend on model licences and customer infrastructure.', 'Developer and API documentation is shared with partners on request.'],
    related: [{ label: 'Open Source AI', href: '/open-source-ai' }, { label: 'AI Infrastructure overview', href: '/ai-infrastructure' }],
    faq: ['open'],
    cta: { title: 'Bring AI to where your data lives', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Request API access', href: '/contact?type=developer' } },
  },
  {
    ...AI,
    slug: 'identity-audit',
    navTitle: 'Identity & Audit',
    title: 'Trust, Identity & Audit',
    description: 'Trusted identity, action authorisation, model and data provenance, and audit for people, AI agents and devices across DNY’s AI and physical intelligence infrastructure.',
    badge: 'Trust, Identity & Audit',
    h1: 'Identity and audit: who did what, on whose authority',
    lead: 'Every person, AI agent, model and device gets a verifiable identity and explicit permissions — and every significant action leaves an audit record.',
    term: 'AI audit trail',
    def: 'A tamper-evident record of which data, model, agent, device and person were involved in an AI decision or action, and under what permission.',
    about: ['Identity', 'Authorisation', 'Audit', 'Provenance'],
    primary: { label: 'Discuss governance needs', href: '/contact?type=enterprise' },
    secondary: { label: 'Trusted AI', href: '/trusted-ai' },
    blocks: [
      { kind: 'trust', kicker: 'The Trust Model', title: 'Provenance, identity, permission, audit' },
      {
        kind: 'tiles', kicker: 'Identities', title: 'What gets an identity',
        items: [
          { k: 'People', name: 'Users & approvers', d: 'Role-based access and approval rights.' },
          { k: 'Software', name: 'Models & agents', d: 'Versioned models and agents with scoped permissions.' },
          { k: 'Hardware', name: 'Devices', d: 'Drones, robots and edge devices bound to an identity.' },
          { k: 'Data', name: 'Datasets', d: 'Records with provenance, licence and version.' },
        ],
      },
    ],
    useCases: ['Demonstrating responsible AI practice to customers and regulators', 'Investigating incidents in automated operations', 'Proving which model version produced a decision', 'Authorising drone missions and robot tasks'],
    bounds: ['Audit records support accountability; they do not by themselves guarantee correctness.'],
    related: [{ label: 'Trusted Data Space', href: '/ai-infrastructure/data-space' }, { label: 'Physical Intelligence', href: '/physical-intelligence' }],
    faq: ['trusted'],
    cta: { title: 'Make AI accountable by design', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner with DNY', href: '/contact?type=partnership' } },
  },
  {
    ...AI,
    slug: 'transactions',
    navTitle: 'AI Transaction Readiness',
    title: 'AI Transaction & Payment Readiness',
    description: 'How DNY prepares interfaces and architecture for future AI-to-AI and machine-to-machine service settlement, built on trusted identity and audit.',
    badge: 'Transaction Readiness',
    h1: 'AI transaction readiness: preparing for machine-to-machine services',
    lead: 'As agents and devices start requesting services from each other, they will need to identify themselves, agree terms and settle. DNY reserves the interfaces and architecture for that future.',
    term: 'AI transaction readiness',
    def: 'Architecture and interfaces that prepare for AI agents and machines to request, verify and settle services with each other.',
    about: ['AI-to-AI transactions', 'Machine-to-machine payments'],
    primary: { label: 'Partner on transaction infrastructure', href: '/contact?type=partnership' },
    secondary: { label: 'Identity & Audit', href: '/ai-infrastructure/identity-audit' },
    blocks: [
      {
        kind: 'chain', kicker: 'Reference Flow', title: 'From request to settled, auditable service',
        chain: ['Agent identity', 'Service request', 'Permission check', 'Delivery', 'Verification', 'Settlement record'],
      },
      {
        kind: 'list', kicker: 'Design Principles', title: 'What the architecture reserves',
        list: ['Verifiable identities for agents and devices', 'Usage metering tied to audit records', 'Interfaces for compliant payment providers', 'Clear human accountability for every account'],
      },
    ],
    useCases: ['Usage-based billing for agents in a marketplace', 'Devices purchasing data or compute services', 'Settlement between partners in a data space'],
    bounds: ['This is architecture readiness, not a live payment service.', 'Any payment or digital-asset functionality would be provided through appropriately licensed partners and subject to Australian financial services, AML/CTF and consumer law.'],
    related: [{ label: 'AI Agent Marketplace', href: '/ventures/ai-agent-marketplace' }],
    ventures: ['ai-agent-marketplace'],
    cta: { title: 'Help shape machine-to-machine services', primary: { label: 'Partnership enquiry', href: '/contact?type=partnership' }, secondary: { label: 'Developer enquiry', href: '/contact?type=developer' } },
  },

  // ── Industries ────────────────────────────────────────
  {
    ...IND,
    slug: 'built-environment',
    navTitle: 'Built Environment',
    title: 'AI for the Built Environment',
    description: 'Trusted building data, materials and modular construction libraries, computer vision, drone site inspection and digital twins for Australia’s built environment.',
    badge: 'Industry',
    h1: 'Built environment: trusted data from material to asset',
    lead: 'Building data, materials, modular construction, computer vision, site inspection and digital twins — on one verifiable record.',
    term: 'Open built-environment data',
    def: 'A shared, machine-readable structure for building products, standards and project data, with tiered and authorised access that protects commercial secrecy and IP.',
    about: ['Construction technology', 'Building data', 'Digital twins'],
    primary: { label: 'Discuss a built-environment project', href: '/contact?type=enterprise' },
    secondary: { label: 'Industries overview', href: '/industries' },
    blocks: [
      {
        kind: 'tiles', kicker: 'Data Foundations', title: 'An open built-environment data model',
        lead: 'The goal is not to publish companies’ commercial data. It is an open data structure with tiered, authorised access that lets data move between enterprises, platforms and systems.',
        items: [
          { k: 'Data model', name: 'Open building data', d: 'Materials, products, manufacturers and suppliers; project types, stages, cost, schedule, procurement and lifecycle data.' },
          { k: 'Standards', name: 'Standards & indicators', d: 'Structural, fire, waterproofing, thermal, energy and acoustic indicators, mapped between Australian and international standards.' },
          { k: 'Product library', name: 'Machine-readable products', d: 'Parameters, certifications, test reports and BIM / CAD / 3D models with unified product IDs and API access.' },
          { k: 'MMC', name: 'Modular & MMC library', d: 'Standard modules and components, nodes, load parameters and assembly rules for modular and 3D-printed construction.' },
        ],
      },
      {
        kind: 'tiles', kicker: 'Physical Intelligence', title: 'From data to the site',
        items: [
          { k: 'Air', name: 'Drone inspection', d: 'Site progress, facades and roofs.', href: '/physical-intelligence/drones' },
          { k: 'Vision', name: 'Computer vision', d: 'Defect detection and quality checks.', href: '/physical-intelligence/edge-ai' },
          { k: 'Twin', name: 'Digital twins', d: 'Asset handover and operations.' },
        ],
      },
    ],
    useCases: ['AI-assisted product selection and procurement', 'Certification and compliance evidence', 'Drone-based site and facade inspection', 'Materials and facade valuation', 'Digital twins for handover'],
    bounds: ['Companies’ commercial data is shared only under authorised access.', 'Reported AI use in Australian construction is low, so pilots start with clear data foundations.'],
    evidence: ['6% of Australian construction businesses reported AI use in 2024–25 (Australian Bureau of Statistics, <em>Characteristics of Australian Business 2024–25</em>).'],
    ventures: ['building-supply', 'facadia', 'dny-aerial-systems'],
    cta: { title: 'Build on verifiable construction data', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Industry partnership', href: '/contact?type=partnership' } },
  },
  {
    ...IND,
    slug: 'logistics-warehousing',
    navTitle: 'Logistics & Warehousing',
    title: 'AI for Logistics & Warehousing',
    description: 'Warehouse automation, robotics, computer vision, predictive operations, supply-chain AI and drones for Australian logistics and warehousing, on trusted AI infrastructure.',
    badge: 'Industry',
    h1: 'Logistics and warehousing: physical AI where the gap is widest',
    lead: 'Warehouse automation, robotics, predictive operations, supply-chain AI, vision and drones — integrated with WMS, ERP and sensor data.',
    term: 'Warehouse automation',
    def: 'Using robotics, computer vision and software to move, store, pick and track goods with less manual handling and more predictable operations.',
    about: ['Warehouse automation', 'Supply-chain AI', 'Robotics'],
    primary: { label: 'Discuss a warehouse pilot', href: '/contact?type=enterprise' },
    secondary: { label: 'Robotics', href: '/physical-intelligence/robotics' },
    blocks: [
      {
        kind: 'steps', kicker: 'Delivery Model', title: 'From process mapping to scale',
        items: [
          { name: 'Process mapping', d: 'Identify high-cost, high-friction or high-risk workflows.' },
          { name: 'Data & systems assessment', d: 'Map WMS, ERP, automation, sensors, robotics and data availability.' },
          { name: 'Use-case prioritisation', d: 'Rank opportunities by value, feasibility, safety and integration complexity.' },
          { name: 'Sandbox & pilot', d: 'Test models, agents and vision or robotics components; deploy defined workflows with measurable KPIs.' },
          { name: 'Production hardening & scale', d: 'Security, monitoring, support and governance — then extend across workflows and sites.' },
        ],
      },
    ],
    useCases: ['Robotic picking and transport', 'Vision-based inventory and quality checks', 'Digital twins and predictive operations', 'Supply-chain intelligence and exception handling', 'Drone stock and yard counts'],
    bounds: ['Pilots run with defined KPIs before any scale commitment.', 'Robotics are integrated on a multi-vendor basis.'],
    evidence: ['1% of Australian businesses in Transport, Postal & Warehousing reported AI use in 2024–25 (Australian Bureau of Statistics, <em>Characteristics of Australian Business 2024–25</em>).'],
    related: [{ label: 'AILH deployment environment', href: '/physical-intelligence#ailh' }],
    ventures: ['robotic-logistics-warehouse', 'dny-robotic-systems'],
    cta: { title: 'Close the physical-AI gap in your operations', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner with DNY', href: '/contact?type=partnership' } },
  },
  {
    ...IND,
    slug: 'cross-border-trade',
    navTitle: 'Cross-border Trade',
    title: 'AI for Cross-border Trade',
    description: 'Trusted product data, compliance records, channel and supply-chain workflows and AI agents for cross-border trade between Australia and global markets.',
    badge: 'Industry',
    h1: 'Cross-border trade: verified data, automated workflows',
    lead: 'Product data, compliance, channels, supply chain and AI agents for the workflows that slow down cross-border business.',
    term: 'Trade workflow automation',
    def: 'Using AI agents and verified records to prepare, check and route the documents, data and approvals that cross-border trade requires.',
    about: ['Cross-border trade', 'Trade compliance', 'AI agents'],
    primary: { label: 'Discuss a trade workflow', href: '/contact?type=enterprise' },
    secondary: { label: 'AI Trade Services Platform', href: '/ventures/ai-trade-services' },
    blocks: [
      {
        kind: 'tiles', kicker: 'Capabilities', title: 'Where AI helps trade',
        items: [
          { k: 'Data', name: 'Product data', d: 'Specifications, certifications and origin records in a verifiable form.' },
          { k: 'Comply', name: 'Compliance checks', d: 'Agents that prepare and check documentation against requirements.' },
          { k: 'Channel', name: 'Channels & distribution', d: 'Workflow support for market entry and distribution partners.' },
          { k: 'Supply', name: 'Supply-chain visibility', d: 'Shared, permissioned records across parties.' },
        ],
      },
    ],
    useCases: ['Trade documentation preparation', 'Supplier and product verification', 'Market-entry workflows for Australian buyers', 'Building-product import compliance'],
    bounds: ['AI-prepared documents are reviewed by responsible people before submission.', 'DNY does not provide customs brokerage, legal or immigration advice.'],
    ventures: ['ai-trade-services', 'building-supply', 'australia-ai-oracle'],
    cta: { title: 'Take friction out of cross-border trade', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner with DNY', href: '/contact?type=partnership' } },
  },
  {
    ...IND,
    slug: 'enterprise',
    navTitle: 'Enterprise & Professional Services',
    title: 'AI for Enterprise & Professional Services',
    description: 'Enterprise AI agents, private and hybrid deployment, internal knowledge and workflow automation with identity, permissions, human oversight and audit.',
    badge: 'Industry',
    h1: 'Enterprise and professional services: governed agents at work',
    lead: 'Enterprise agents, private or hybrid deployment, internal knowledge and workflow automation — with governance built in.',
    term: 'Enterprise AI agent',
    def: 'An AI agent deployed inside an organisation to carry out business tasks using its internal data and systems, under that organisation’s permissions and oversight.',
    about: ['Enterprise AI', 'Workflow automation'],
    primary: { label: 'Discuss an enterprise deployment', href: '/contact?type=enterprise' },
    secondary: { label: 'AI Agents & Automation', href: '/ai-infrastructure/agents' },
    blocks: [
      {
        kind: 'tiles', kicker: 'Capabilities', title: 'What enterprises deploy',
        items: [
          { k: 'Know', name: 'Internal knowledge', d: 'Assistants grounded in verified internal sources.', href: '/ai-infrastructure/data-space' },
          { k: 'Automate', name: 'Workflow automation', d: 'Document, HR and back-office processes.', href: '/ai-infrastructure/agents' },
          { k: 'Deploy', name: 'Private / hybrid', d: 'Models running where data needs to live.', href: '/ai-infrastructure/deployment' },
        ],
      },
    ],
    useCases: ['Knowledge assistants', 'HR and talent operations', 'Media and content operations', 'Evaluated agents from a governed marketplace'],
    bounds: ['Use cases start with defined workflows and measurable outcomes.', 'DNY does not provide legal, financial or employment advice through AI tools.'],
    ventures: ['ai-agent-marketplace', 'hr-hub', 'ai-media-hub'],
    faq: ['agents'],
    cta: { title: 'Put governed agents to work', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Developer enquiry', href: '/contact?type=developer' } },
  },

  // ── OPC + FDE ─────────────────────────────────────────
  {
    ...OPC,
    slug: 'opc-network',
    navTitle: 'OPC Network',
    title: 'OPC Network — Office + AI Agents',
    description: 'OPC (Office + AI Agents) nodes combine workspace, AI agent capability and market connections so small teams can deliver like larger organisations — part of DNY’s deployment network.',
    badge: 'OPC = Office + AI Agents',
    h1: 'OPC network: local nodes powered by AI agents',
    lead: 'An OPC is a local business node where a small team, AI agents and market connections combine to deliver real projects — not a conventional co-working space.',
    term: 'OPC (Office + AI Agents)',
    def: 'A local business node that combines a workspace, AI agent capabilities and market connections so small teams can deliver like larger organisations.',
    about: ['OPC', 'AI agents', 'Entrepreneurship'],
    primary: { label: 'Join the OPC network', href: '/contact?type=partnership' },
    secondary: { label: 'FDE Model', href: '/opc-fde/fde-model' },
    blocks: [
      {
        kind: 'tiles', kicker: 'What a Node Provides', title: 'Four things in one place',
        items: [
          { k: 'Space', name: 'Local business node', d: 'A professional base and collaboration space.' },
          { k: 'Agents', name: 'AI agent capability', d: 'Access to DNY infrastructure and governed agents.' },
          { k: 'Market', name: 'Market connections', d: 'Enterprise customers, suppliers and partners.' },
          { k: 'Talent', name: 'Project talent pool', d: 'Universities, developers, founders and specialists.' },
        ],
      },
    ],
    useCases: ['Small teams delivering enterprise AI projects', 'Local presence for industry programmes', 'Testing ventures before they spin out'],
    bounds: ['Participation and membership are established through documented agreements.'],
    related: [{ label: 'OPC + FDE overview', href: '/opc-fde' }],
    faq: ['opcfde'],
    cta: { title: 'Build with the OPC network', primary: { label: 'Partnership enquiry', href: '/contact?type=partnership' }, secondary: { label: 'Visit us in Sydney', href: '/contact?type=visit' } },
  },
  {
    ...OPC,
    slug: 'fde-model',
    navTitle: 'FDE Model',
    title: 'FDE Model — Forward Deployed Entrepreneurs',
    description: 'Forward Deployed Entrepreneurs (FDE) work on real customer problems in the field, combining industry knowledge with DNY infrastructure to take solutions from proof of concept to deployment.',
    badge: 'FDE = Forward Deployed Entrepreneur',
    h1: 'The FDE model: delivery that starts with the customer’s problem',
    lead: 'Forward Deployed Entrepreneurs sit with real customers, understand real constraints, and use DNY infrastructure to deliver solutions that actually get deployed.',
    term: 'FDE (Forward Deployed Entrepreneur)',
    def: 'A delivery role that works directly on a real customer problem in the field, taking a solution from proof of concept to deployment.',
    about: ['FDE', 'Solution delivery'],
    primary: { label: 'Become an FDE partner', href: '/contact?type=partnership' },
    secondary: { label: 'OPC Network', href: '/opc-fde/opc-network' },
    blocks: [
      {
        kind: 'steps', kicker: 'How FDEs Work', title: 'From problem to deployment',
        items: [
          { name: 'Embed', d: 'Work alongside the customer to understand processes, data and constraints.', k: 'Discovery' },
          { name: 'Shape', d: 'Define a use case with measurable outcomes and a governance plan.', k: 'Scope' },
          { name: 'Prove', d: 'Build a pilot on DNY infrastructure — AI, physical devices or both.', k: 'PoC' },
          { name: 'Deploy', d: 'Harden for production with security, monitoring and support.', k: 'Production' },
          { name: 'Scale or spin out', d: 'Extend across sites, or incubate a repeatable solution as a venture.', k: 'Venture' },
        ],
      },
    ],
    useCases: ['Physical AI pilots — drones, robots, vision', 'Industry AI projects in construction, logistics and trade', 'Enterprise agent deployments'],
    bounds: ['FDE engagements are scoped and contracted per project.'],
    related: [{ label: 'OPC + FDE overview', href: '/opc-fde' }, { label: 'Industries', href: '/industries' }],
    faq: ['opcfde'],
    cta: { title: 'Take a real problem to deployment', primary: { label: 'Partnership enquiry', href: '/contact?type=partnership' }, secondary: { label: 'Enterprise enquiry', href: '/contact?type=enterprise' } },
  },
];

export const topicsFor = (section: Topic['section']) => TOPICS.filter((t) => t.section === section);
