// Structured FAQ (brief §14, §15). Each group renders with FAQPage schema.

export type QA = { q: string; a: string };

export const FAQS: Record<string, { title: string; items: QA[] }> = {
  group: {
    title: 'About the group',
    items: [
      {
        q: 'What is DNY Cross Border Group?',
        a: 'DNY Cross Border Group is an Australia-led technology and commercialisation group, headquartered in Sydney, that builds trusted, open AI infrastructure and connects it with the physical economy through drones, robotics, edge systems and industry ventures.',
      },
      {
        q: 'Is DNY a single AI platform or a group?',
        a: 'A group. DNY is organised in layers: a group holding layer, Trusted & Open AI Infrastructure, the Open Physical Intelligence Layer, the OPC + FDE delivery network, and Applied Ventures that operate as focused businesses on that shared infrastructure.',
      },
      {
        q: 'Does DNY train its own foundation model?',
        a: 'No. DNY works at the commercialisation layer — selecting, evaluating, integrating, governing and operating suitable open and open-weight models — rather than competing to train a frontier model.',
      },
      {
        q: 'What do the project status labels mean?',
        a: 'Operating means live with customers; In Development means being designed, built or validated; Proposed means a defined concept awaiting partners, approvals or funding; Research means exploratory; Partnership Opportunity means open to a partner to lead or co-develop.',
      },
    ],
  },
  trusted: {
    title: 'Trusted AI',
    items: [
      {
        q: 'What is Trusted AI?',
        a: 'Trusted AI is AI whose data sources, model versions, permissions and actions can be verified, traced and audited. At DNY it is delivered through a Trusted Data Space and verifiable infrastructure rather than through claims of accuracy.',
      },
      {
        q: 'What is a Trusted Data Space?',
        a: 'A Trusted Data Space is a governed environment where data is shared under recorded provenance, versions, licences and permissions, so organisations can collaborate on data without giving up control of it.',
      },
      {
        q: 'Does DNY use blockchain?',
        a: 'Hashing, digital signatures, trusted timestamps and distributed ledgers are technology options for verification where they add value. They are tools inside the trust layer, not the identity of the platform.',
      },
    ],
  },
  open: {
    title: 'Open Source AI',
    items: [
      {
        q: 'What is the difference between open-source, open-weight and source-available AI?',
        a: 'Open-source AI grants the freedom to use, study, modify and share, including the preferred form for modification. Open-weight models publish weights but may restrict terms, data or modification. Source-available systems can be viewed or used only under specific conditions that may limit commercial use.',
      },
      {
        q: 'Is open-source AI always cheaper or safer?',
        a: 'No. DNY does not claim that open models are free of licensing or IP risk, or always cheaper or safer than proprietary ones. Every model is evaluated and licence-checked before production use.',
      },
      {
        q: 'Is DNY tied to one model or cloud provider?',
        a: 'No. The infrastructure is multi-model, multi-cloud and vendor-neutral by design, to avoid structural dependency on a single model, cloud or hardware supplier.',
      },
    ],
  },
  physical: {
    title: 'Physical AI',
    items: [
      {
        q: 'What is Physical AI?',
        a: 'Physical AI is artificial intelligence that perceives the real world through sensors, reasons about it, and acts through machines such as drones, robots and industrial equipment.',
      },
      {
        q: 'What is the Open Physical Intelligence Layer?',
        a: 'It is DNY’s unified connection layer between trusted AI infrastructure and real devices. It links models, agents, data governance, identity, security and audit with drones, robots, edge devices and vision systems, while staying compatible with multiple model, cloud and hardware vendors.',
      },
      {
        q: 'Is DNY a drone company or a robotics company?',
        a: 'Neither on its own. Drones and robotics are directions within the Physical Intelligence Layer. Specific drone and robotics businesses, such as DNY Aerial Systems and DNY Robotic Systems, are separate ventures that reuse the group’s infrastructure.',
      },
      {
        q: 'How are physical AI actions kept safe and accountable?',
        a: 'Every device, model and agent is bound to an identity and a set of permissions. Key decisions and actions are logged for audit, humans stay in the loop where full autonomy is inappropriate, and anomalies escalate to people.',
      },
    ],
  },
  opcfde: {
    title: 'OPC + FDE',
    items: [
      {
        q: 'What is an OPC?',
        a: 'OPC stands for Office + AI Agents: a local business node that combines a physical workspace, AI agent capabilities and market connections, so small teams can deliver like larger organisations. It is not a conventional co-working space.',
      },
      {
        q: 'What is an FDE?',
        a: 'FDE stands for Forward Deployed Entrepreneur: a delivery role that works directly on a real customer problem in the field, combining industry knowledge with DNY infrastructure to move a solution from proof of concept to deployment.',
      },
      {
        q: 'Where does the OPC + FDE network operate?',
        a: 'Sydney is the first node. Auckland is the expansion direction for the New Zealand network.',
      },
    ],
  },
  drones: {
    title: 'Commercial drones',
    items: [
      {
        q: 'What are commercial drone systems used for?',
        a: 'Commercial drone systems are used for aerial inspection, mapping and survey, environmental sensing and industrial data capture across infrastructure, construction, utilities and enterprise assets.',
      },
      {
        q: 'What is DNY Aerial Systems?',
        a: 'DNY Aerial Systems is DNY’s commercial drone venture, currently in development. It is intended to combine aircraft and component supply with Australian systems integration, contract delivery and lifecycle support, reusing the group’s trusted AI infrastructure.',
      },
    ],
  },
  robotics: {
    title: 'Embodied AI & robotics',
    items: [
      {
        q: 'What is embodied AI?',
        a: 'Embodied AI is AI that operates through a physical body — a robot — so that it can perceive its surroundings, reason about them and act within them.',
      },
      {
        q: 'What is DNY Robotic Systems?',
        a: 'DNY Robotic Systems is DNY’s embodied intelligence venture, currently in development, focused on robots for Australian industrial, logistics and service environments. Specific products are not yet announced.',
      },
    ],
  },
  agents: {
    title: 'AI agents',
    items: [
      {
        q: 'What is an AI agent?',
        a: 'An AI agent is software that uses an AI model to plan and carry out multi-step tasks — calling tools, systems or devices — rather than only answering a single prompt.',
      },
      {
        q: 'How does DNY govern AI agents?',
        a: 'Agents run under defined identities and permissions, with human oversight and escalation for decisions where full autonomy is inappropriate, and with their actions recorded for audit.',
      },
    ],
  },
};
