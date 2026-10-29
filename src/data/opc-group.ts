// ─────────────────────────────────────────────────────────────
// Open Needs cards for the first release (design doc §17.2).
//
// The cards are DNY's own work, not external tenders: one card per core
// venture, plus one for Drone & Robotics Components. Everything is derived
// from existing sources — `ventures.ts` and the components copy — so nothing
// is re-written, invented or maintained twice. No tasks, budgets or timelines.
// ─────────────────────────────────────────────────────────────
import { VENTURES, CATEGORIES, type Category, type Status } from './ventures';
import { SERVICES, COMPONENTS_LEAD } from './components';

export type GroupNeedCard = {
  key: string; // venture slug, or 'components'
  name: string;
  short: string;
  status: Status;
  workAreas: string[];
  href: string;
  category: Category;
  isComponents?: boolean;
};

export const COMPONENTS_CARD: GroupNeedCard = {
  key: 'components',
  name: 'Drone & Robotics Components',
  short: COMPONENTS_LEAD,
  status: 'In Development',
  workAreas: SERVICES.map((s) => s.k),
  href: '/components',
  category: 'Physical Intelligence',
  isComponents: true,
};

const ventureCard = (v: (typeof VENTURES)[number]): GroupNeedCard => ({
  key: v.slug,
  name: v.name,
  short: v.short,
  status: v.status,
  workAreas: v.capabilities,
  href: `/ventures/${v.slug}`,
  category: v.category,
});

/** Ventures in category order, with Components after Physical Intelligence. */
export const GROUP_CARDS: GroupNeedCard[] = CATEGORIES.flatMap((cat) => {
  const cards = VENTURES.filter((v) => v.category === cat).map(ventureCard);
  return cat === 'Physical Intelligence' ? [...cards, COMPONENTS_CARD] : cards;
});

/** Options for the "Venture of interest" field on the join form. */
export const VENTURE_OPTIONS = [
  ...VENTURES.map((v) => ({ value: v.slug, label: v.name })),
  { value: 'components', label: 'Drone & Robotics Components' },
];
