// Structured FAQ (brief §14, §15). Each group renders with FAQPage schema.

import { VENTURE_COUNT_WORD, EV_BRAND } from './ventures';

export type QA = { q: string; a: string };

export const FAQS: Record<string, { title: string; items: QA[] }> = {
  group: {
    title: 'About the group',
    items: [
      {
        q: 'What is DNY Cross Border Group?',
        a: `DNY Cross Border Group is a Sydney-headquartered technology group that grew from cross-border trade into building trusted, open AI and physical intelligence infrastructure for Australian industry, commercialised through ${VENTURE_COUNT_WORD} focused ventures.`,
      },
      {
        q: 'Why is the group called "Cross Border"?',
        a: 'DNY began in cross-border trade and supply chain between Australia and international markets. That experience, with product data, documents and systems that could not be verified or connected, is why the group now builds trusted AI infrastructure. Cross-border trade remains one of the industries where it is applied.',
      },
      {
        q: 'Is DNY a single AI platform or a group?',
        a: `A group. DNY builds shared infrastructure (trusted, open AI and Physical Super Intelligence), delivers it through the OPC + FDE network, and commercialises it through ${VENTURE_COUNT_WORD} focused ventures that each have their own customers and business model.`,
      },
      {
        q: 'Does DNY train its own foundation model?',
        a: 'No. DNY works at the commercialisation layer: selecting, evaluating, integrating, governing and operating suitable open and open-weight models, rather than competing to train a frontier model.',
      },
      {
        q: 'What do the project status labels mean?',
        a: 'Operating means live with customers; Pilot means live and taking orders in a pilot phase; In Development means being designed, built or validated; Proposed means a defined concept awaiting partners, approvals or funding; Research means exploratory; Partnership Opportunity means open to a partner to lead or co-develop.',
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
        q: 'What is the Open Physical SI Layer?',
        a: 'It is DNY’s unified connection layer between trusted AI infrastructure and real devices. It links models, agents, data governance, identity, security and audit with drones, robots, edge devices and vision systems, while staying compatible with multiple model, cloud and hardware vendors.',
      },
      {
        q: 'Is DNY a drone company or a robotics company?',
        a: 'Neither on its own. Drones and robotics are directions within the Physical SI Layer. The specific drone and robotics businesses (DNY Aerial Systems and DNY Robotic Systems) are separate ventures that reuse the group’s infrastructure.',
      },
      {
        q: 'How are physical AI actions kept safe and accountable?',
        a: 'Every device, model and agent is bound to an identity and a set of permissions. Key decisions and actions are logged for audit, humans stay in the loop where full autonomy is inappropriate, and anomalies escalate to people.',
      },
    ],
  },
  opcfde: {
    title: 'ANZ OPC + FDE Alliance',
    items: [
      {
        q: 'What is an OPC?',
        a: 'An OPC is a one-person company: a business run by one person or a very small team that uses AI agents to deliver at the scale of a much larger firm.',
      },
      {
        q: 'Do I need to be in Australia or New Zealand?',
        a: 'No. Members deliver remotely from anywhere. DNY provides the local presence: client meetings in local business hours, coordination of procurement steps and, where a client requires it, an Australian contracting party.',
      },
      {
        q: 'Who signs the contract with the client?',
        a: 'It depends on the client. For government tenders and clients that require an Australian supplier, DNY contracts as prime and you deliver as a subcontractor. Other clients may contract with you directly. The model is shown on each need and agreed before work starts.',
      },
      {
        q: 'Is membership free?',
        a: 'Community membership is free. Professional and Premier memberships have an annual fee, shared on application.',
      },
      {
        q: 'Where do the needs come from?',
        a: "Today, from DNY's own ventures and business lines, which are being built in Australia now. Needs from other organisations in Australia and New Zealand will be added as DNY collects and verifies them.",
      },
      {
        q: 'How do partners earn?',
        a: 'Partners co-deliver projects with DNY and share project revenue under a project agreement. Partnership is open to Premier members only.',
      },
      {
        q: 'How does the Alliance relate to DNY?',
        a: "The Alliance is DNY's delivery network. Members and partners deliver on DNY's AI and physical-intelligence infrastructure, and solutions that repeat can be incubated as DNY ventures.",
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
        q: 'Does DNY sell complete drones?',
        a: 'DNY accepts enquiries for complete aircraft for construction, agriculture and inspection, alongside components. Supply is confirmed by model, configuration, destination and intended use after review.',
      },
      {
        q: 'Does DNY provide surveying, inspection or spraying services?',
        a: 'No. DNY currently handles equipment sourcing and sales enquiries. We do not provide flight demonstrations, surveying, inspection operations or agricultural spraying services.',
      },
      {
        q: 'What is DNY Aerial Systems?',
        a: 'DNY Aerial Systems is the group’s commercial drone business. Aircraft enquiries are open. Specific models, supplier arrangements and delivery terms are confirmed after review. Operational drone services are not currently offered.',
      },
    ],
  },
  robotics: {
    title: 'Embodied AI & robotics',
    items: [
      {
        q: 'What is embodied AI?',
        a: 'Embodied AI is AI that operates through a physical body (a robot), so that it can perceive its surroundings, reason about them and act within them.',
      },
      {
        q: 'What is DNY Robotic Systems?',
        a: 'DNY Robotic Systems is DNY’s embodied intelligence venture, currently in development, focused on robots for Australian industrial, logistics and service environments. It includes the Robotics Experience & Innovation Centre for demonstration, validation and market entry. Specific products are not yet announced.',
      },
    ],
  },
  agents: {
    title: 'AI agents',
    items: [
      {
        q: 'What is an AI agent?',
        a: 'An AI agent is software that uses an AI model to plan and carry out multi-step tasks by calling tools, systems or devices, rather than only answering a single prompt.',
      },
      {
        q: 'How does DNY govern AI agents?',
        a: 'Agents run under defined identities and permissions, with human oversight and escalation for decisions where full autonomy is inappropriate, and with their actions recorded for audit.',
      },
    ],
  },
  components: {
    title: 'Drone & robotics components',
    items: [
      {
        q: 'What drone and robotics components does DNY supply?',
        a: 'Passive mechanical parts for drones (propellers and fasteners, airframe parts, mechanical mounts, cases and manual tools), accessories and consumables for robots (commercial cleaning, warehouse and logistics, and industrial gripper parts), and KST servos listed by series and model. Everything is sourced and quoted on request.',
      },
      {
        q: 'Can every listed component be exported?',
        a: 'Not necessarily. A listing does not confirm export eligibility. We review the exact model, technical specifications, destination and intended use before confirming supply.',
      },
      {
        q: 'How do I get a price for a component?',
        a: 'Add product types to an enquiry at https://dnycrossbordergroup.com/components/enquiry with the equipment model, part number and quantity, or email info@dnycrossbordergroup.com. You receive an enquiry reference straight away. Fit, price, stock and lead time are confirmed in a written quote; no prices are published on the website.',
      },
      {
        q: 'Which KST servos can DNY supply, and are datasheets available?',
        a: 'Fifteen KST series are listed with their official model names: Aircraft, Wing, Micro, Mini, Standard, Ultra Giant, 4 Pole Brushless, Clubman and FZ for drones and aircraft, and HP, HA, SV, HS, HLS and Underwater for robotics. Full datasheets for every listed model are available on request from info@dnycrossbordergroup.com.',
      },
      {
        q: 'Can an AI agent submit a quote request for a buyer?',
        a: 'Yes. An agent acting with the buyer’s knowledge can send a JSON request to POST /api/enquiries, described at https://dnycrossbordergroup.com/openapi.json, using product ids from https://dnycrossbordergroup.com/components/catalogue.json. The response contains the enquiry reference; DNY replies to the buyer by email.',
      },
    ],
  },
  'ev-accessories': {
    title: `${EV_BRAND} EV accessories`,
    items: [
      {
        q: `What is ${EV_BRAND}?`,
        a: `${EV_BRAND} is DNY Cross Border Group’s electric-vehicle accessories business, now in a pilot phase and taking trade orders through its brand site at https://evsider.com. It supplies fitted floor mats, liners, sunshades and cabin accessories for specific electric and plug-in hybrid models to dealers, retailers, detailers and fleets.`,
      },
      {
        q: 'Where can trade buyers see the range and vehicle fitment?',
        a: 'On https://evsider.com, which lists the eleven product categories, fitment for 20 models and the trade enquiry form.',
      },
    ],
  },
};
