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

export const TOPICS: Topic[] = [
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
    related: [{ label: 'Edge AI & vision', href: '/physical-intelligence#edge' }, { label: 'Built Environment', href: '/industries#built-environment' }],
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
    cta: { title: 'Explore embodied AI for your operations', primary: { label: 'Start an enterprise conversation', href: '/contact?type=enterprise' }, secondary: { label: 'Partner as a robotics provider', href: '/contact?type=partnership' } },
  },
];

export const topicsFor = (section: Topic['section']) => TOPICS.filter((t) => t.section === section);
