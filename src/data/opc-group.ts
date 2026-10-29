// ─────────────────────────────────────────────────────────────
// Open Needs cards for the first release (design doc §17.2).
//
// The cards are DNY's own work, not external tenders: one card per core
// venture, plus one for Drone & Robotics Components. Venture content is
// derived from `ventures.ts`, so nothing is re-written or maintained twice.
// No tasks, budgets or timelines.
// ─────────────────────────────────────────────────────────────
import { VENTURES, CATEGORIES, type Category, type Status } from './ventures';

export type GroupNeedCard = {
  key: string; // venture slug, or 'components'
  name: string;
  short: string;
  status: Status;
  workAreas: string[];
  href: string;
  category: Category;
  isComponents?: boolean;
  /** Shown instead of the status badge when the card is a business line, not a venture. */
  badge?: string;
};

export const COMPONENTS_CARD: GroupNeedCard = {
  key: 'components',
  name: 'Drone & Robotics Components',
  short: "DNY's sourcing and quotation service for drone and robotics components.",
  status: 'In Development',
  workAreas: ['Component Sourcing', 'Bulk Supply Enquiries', 'Compatibility Review', 'Custom Module Enquiries'],
  href: '/components',
  category: 'Physical SI',
  isComponents: true,
  badge: 'Business line',
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

/** Ventures in category order, with Components after Physical SI. */
export const GROUP_CARDS: GroupNeedCard[] = CATEGORIES.flatMap((cat) => {
  const cards = VENTURES.filter((v) => v.category === cat).map(ventureCard);
  return cat === 'Physical SI' ? [...cards, COMPONENTS_CARD] : cards;
});

/** Options for the "Venture of interest" field on the join form. */
export const VENTURE_OPTIONS = [
  ...VENTURES.map((v) => ({ value: v.slug, label: v.name })),
  { value: 'components', label: 'Drone & Robotics Components' },
];
