// Builds the plain-text / Markdown versions of the site for AI systems (llms.txt standard, llmstxt.org).
import { SITE, NAV } from '../data/site';
import { STACK, HIERARCHY, PI_LOOP, PI_SUBLAYERS, INFRA_MODULES, TRUST_PILLARS, PI_CHAIN } from '../data/architecture';
import { VENTURES, STATUS_DEFS, type Status } from '../data/ventures';
import { INDUSTRIES } from '../data/industries';
import { TOPICS } from '../data/topics';
import { FAQS } from '../data/faqs';
import { GLOSSARY } from '../data/glossary';

const U = (p: string) => new URL(p, SITE.url).href;
const strip = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

export const KEY_FACTS: [string, string][] = [
  ['Name', `${SITE.name} (also referred to as ${SITE.alternateNames.join(', ')})`],
  ['What it is', SITE.positioning],
  ['Headquarters', `${SITE.address.display} (Sydney)`],
  ['Markets', 'Australia first; New Zealand (Auckland) as the next network node; global technology partners'],
  ['Group structure', 'Group holding layer → Trusted & Open AI Infrastructure → Open Physical Intelligence Layer → OPC + FDE delivery network → Applied Ventures'],
  ['Core focus', 'Trusted AI, open-source and open-weight AI, AI agents, physical AI (commercial drones, embodied robotics, edge AI, autonomous systems), industry deployment'],
  ['Industries', 'Built environment; logistics and warehousing; cross-border trade; enterprise and professional services; future verticals (mining, agriculture, utilities, health and ageing)'],
  ['Origin', 'Began in cross-border trade and supply chain between Australia and international markets'],
  ['Core ventures', VENTURES.map((v) => v.name).join('; ')],
  ['Number of ventures', `${VENTURES.length}` + (new Set(VENTURES.map((v) => v.status)).size === 1 ? `, all currently ${VENTURES[0].status}` : '')],
  ['What DNY does not do', 'DNY does not train its own frontier foundation model, does not manufacture aircraft, and is not a co-working operator'],
  ['Delivery network', 'OPC + FDE network and the ANZ OPC + FDE Alliance — Sydney first, Auckland next'],
  ['Vendor stance', 'Multi-model, multi-cloud and multi-hardware; no dependency on a single supplier or country of origin'],
  ['Contact', `${SITE.email} · ${U('/contact')}`],
  ['Website', SITE.url],
];

export function llmsTxt(): string {
  const L: string[] = [];
  L.push(`# ${SITE.name}`, '', `> ${SITE.positioning}`, '');
  L.push(`${SITE.name} is headquartered in Barangaroo, Sydney, Australia, and grew from cross-border trade. It is organised as a group of five layers: a Trusted Data, Identity & Verification Foundation; Trusted & Open AI Infrastructure; the Open Physical Intelligence Layer (drones, robotics, edge AI, autonomous systems); the OPC + FDE delivery network; and Applied Ventures. Ventures are labelled Operating, In Development, Proposed, Research or Partnership Opportunity. Last updated ${SITE.lastUpdated}.`, '');
  L.push('## Key facts', '');
  KEY_FACTS.forEach(([k, v]) => L.push(`- ${k}: ${v}`));
  L.push('', '## Full text', '', `- [Complete site content for AI systems](${U('/llms-full.txt')}): every page's key content in one Markdown file`, `- [Company facts](${U('/facts')}): canonical facts about the group`, '');
  for (const item of NAV) {
    L.push(`## ${item.label}`, '');
    const kids = item.children ?? [{ label: item.label, href: item.href }];
    const seen = new Set<string>();
    for (const c of kids) {
      const base = c.href.split('#')[0];
      if (seen.has(c.href)) continue;
      seen.add(c.href);
      const t = TOPICS.find((x) => `/${x.section}/${x.slug}` === base);
      const v = VENTURES.find((x) => `/ventures/${x.slug}` === base);
      const desc = t?.def ?? v?.short ?? ('desc' in c ? (c as { desc?: string }).desc : '') ?? '';
      L.push(`- [${c.label}](${U(c.href)})${desc ? `: ${desc}` : ''}`);
    }
    L.push('');
  }
  L.push('## Ventures', '');
  VENTURES.forEach((v) => L.push(`- [${v.name}](${U('/ventures/' + v.slug)}): ${v.short} Status: ${v.status}.`));
  L.push('', '## Optional', '', `- [Glossary](${U('/glossary')}): plain-language definitions`, `- [FAQ](${U('/faq')})`, `- [Investors & Partners](${U('/investors')})`, `- [Careers](${U('/careers')})`, `- [Contact](${U('/contact')})`, '');
  return L.join('\n');
}

export function llmsFullTxt(): string {
  const L: string[] = [];
  const h = (n: number, t: string) => L.push('', `${'#'.repeat(n)} ${t}`, '');
  L.push(`# ${SITE.name} — complete site content`, '', `> ${SITE.positioning}`, '', `Source: ${SITE.url} · Last updated: ${SITE.lastUpdated} · Language: English (Australia)`);

  h(2, 'Key facts');
  KEY_FACTS.forEach(([k, v]) => L.push(`- **${k}:** ${v}`));

  h(2, 'Group architecture (five layers)');
  [...STACK].reverse().forEach((l) => L.push(`${l.n}. **${l.name}** — ${l.role}. ${l.summary} (${U(l.href)})`));
  h(3, 'Group hierarchy');
  HIERARCHY.forEach((x) => L.push(`- **${x.level} — ${x.name}:** ${x.role}. Scope: ${x.scope}.`));

  h(2, 'Trusted & Open AI Infrastructure');
  L.push(`Page: ${U('/ai-infrastructure')}`, '');
  INFRA_MODULES.forEach((m) => L.push(`- **${m.name}:** ${m.line} (${U(m.href)})`));
  h(3, 'Trust model');
  TRUST_PILLARS.forEach((p) => L.push(`- **${p.k}:** ${p.d}`));

  h(2, 'Open Physical Intelligence Layer');
  L.push(`Page: ${U('/physical-intelligence')}`, '', 'The Open Physical Intelligence Layer is not a drone company and not a single robotics project. It is the unified, vendor-neutral connection layer through which DNY’s trusted AI infrastructure reaches drones, robots, edge systems and real assets.', '');
  L.push(`Reference architecture: ${PI_CHAIN.join(' → ')}.`, '', 'Capability loop:');
  PI_LOOP.forEach((s, i) => L.push(`${i + 1}. **${s.k}** — ${s.d}`));
  L.push('', 'Sub-layers:');
  PI_SUBLAYERS.forEach((s) => L.push(`- **${s.name} (${s.direction}):** ${s.line} (${U(s.href)})`));
  L.push('', 'AILH is a proposed large-scale industrial deployment environment used as a physical-economy proof point. It is a separate legal and economic interest, not owned or controlled by DNY.');

  h(2, 'Topic pages');
  for (const t of TOPICS) {
    h(3, t.h1);
    L.push(`URL: ${U(`/${t.section}/${t.slug}`)}`, '', `**${t.term}:** ${t.def}`, '', t.lead, '');
    for (const b of t.blocks) {
      if (b.kind === 'trust' || b.kind === 'loop') continue;
      L.push(`**${b.title}.**${b.lead ? ' ' + b.lead : ''}`);
      b.items?.forEach((i) => L.push(`- ${i.name}: ${i.d}`));
      b.chain && L.push(`- ${b.chain.join(' → ')}`);
      b.paras?.forEach((p) => L.push(strip(p)));
      b.list?.forEach((x) => L.push(`- ${x}`));
      L.push('');
    }
    L.push('Use cases: ' + t.useCases.join('; ') + '.', '', 'Boundaries: ' + t.bounds.join(' ') );
    t.evidence && L.push('', 'Evidence: ' + t.evidence.map(strip).join(' '));
  }

  h(2, 'Industries');
  INDUSTRIES.forEach((i) => L.push(`- **${i.name}${i.future ? ' (future expansion)' : ''}:** ${i.description} Use cases: ${i.useCases.join('; ')}.`));

  h(2, 'Applied Ventures');
  L.push('Status definitions:');
  (Object.keys(STATUS_DEFS) as Status[]).forEach((s) => L.push(`- ${s}: ${STATUS_DEFS[s]}`));
  for (const v of VENTURES) {
    h(3, v.name);
    L.push(`- URL: ${U('/ventures/' + v.slug)}`, `- Status: ${v.status}`, `- Category: ${v.category}`, `- Layer: ${v.layer}`, `- Industries: ${v.industries.join(', ')}`, `- Capabilities: ${v.capabilities.join(', ')}`, `- Technology: ${v.tech.join(', ')}`, `- Summary: ${v.short}`, `- Relationship to DNY infrastructure: ${v.relation}`);
  }

  h(2, 'OPC + FDE network');
  L.push(`Page: ${U('/opc-fde')}`, '', 'OPC = Office + AI Agents: local business nodes that combine workspace, AI agent capability and market connections — not a conventional co-working space. FDE = Forward Deployed Entrepreneur: a delivery role working directly on real customer problems to take solutions from proof of concept to deployment. Sydney is the first node; Auckland is the expansion direction for New Zealand. The ANZ OPC + FDE Alliance is the membership organisation behind the network, with FDE delivery capability built into member benefits.');

  h(2, 'Frequently asked questions');
  for (const g of Object.values(FAQS)) {
    h(3, g.title);
    g.items.forEach((i) => L.push(`**Q: ${i.q}**`, `A: ${i.a}`, ''));
  }

  h(2, 'Glossary');
  GLOSSARY.forEach((g) => L.push(`- **${g.term}:** ${g.def}`));

  h(2, 'Sources for statistics used on the site');
  L.push('- 12% of Australian businesses used AI in 2024–25, up from 1% in 2021–22; 1% reported AI use in Transport, Postal & Warehousing; 6% in Construction — Australian Bureau of Statistics, Characteristics of Australian Business 2024–25.', '- 89% of organisations use some open source in their AI stack; 63% use an open model — Linux Foundation Research, 2025.', '- A$22b annual enterprise procurement behind the Buy Australian AI Partnership — Department of Industry, Science and Resources / National AI Centre, 2026.');

  h(2, 'Contact');
  L.push(`${SITE.name}, ${SITE.address.display}. Email: ${SITE.email}. Enquiries: ${U('/contact')} (enterprise, partnership, investment, developer, visit).`, '', 'Disclaimer: general information only; not an offer of securities or financial, legal or tax advice. Ventures are at the stage shown by their status label.');
  return L.join('\n') + '\n';
}
