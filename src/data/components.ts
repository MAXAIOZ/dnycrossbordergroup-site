// Drone & Robotics Components — public catalogue helpers.
// Only products with publication_status === 'published' are ever exported to pages,
// search, sitemap, llms.txt or the enquiry allowlist. Drafts stay in the JSON only.
import data from './components-catalogue.json';
import kstImages from './kst-images.json';

export type Application = 'drone' | 'robotics';
export type Product = {
  id: string;
  slug: string;
  application: Application;
  category: string;
  name: string;
  description: string;
  send: string[];
  limits: string[];
  // Extra paragraph shown on the product page, for review and eligibility wording.
  note?: string;
  keywords: string[];
  brand?: string;
  series?: string;
  models?: string[];
  publication_status: 'published' | 'draft';
};
export type Category = { id: string; application: Application; name: string; summary: string };

export const CATEGORIES = data.categories as Category[];
export const PRODUCTS = (data.products as Product[]).filter((p) => p.publication_status === 'published');
export const STATUS = data.statusDefinitions;
export const SCOPE = data.scope;
export const BRANDS = data.brands as Record<string, { name: string; owner: string; note: string }>;

export const byApp = (a: Application) => PRODUCTS.filter((p) => p.application === a);
export const catsFor = (a: Application) => CATEGORIES.filter((c) => c.application === a);
export const category = (id: string) => CATEGORIES.find((c) => c.id === id)!;
export const APP_LABEL: Record<Application, string> = { drone: 'Drone Components', robotics: 'Robotics Components' };
export const APP_PATH: Record<Application, string> = { drone: '/components/drones', robotics: '/components/robotics' };

// Minimal public record used by the browser basket (no internal fields).
export const PUBLIC_INDEX = PRODUCTS.map((p) => ({ id: p.id, name: p.name, slug: p.slug, app: p.application }));

// Product images (KST, used with permission; extracted from KST's Feb 2025 product spec).
const IMG = (slug: string) => `/assets/img/kst/${slug}.webp`;
const THUMB = (slug: string) => `/assets/img/kst/sm/${slug}.webp`;
export const modelImage = (model: string, small = false): string | null => {
  const s = (kstImages.images as Record<string, string>)[model];
  return s ? (small ? THUMB(s) : IMG(s)) : null;
};
export const seriesImage = (p: Product, small = false): string | null => {
  const s = (kstImages.series as Record<string, string>)[p.id];
  return s ? (small ? THUMB(s) : IMG(s)) : null;
};
export const IMAGE_CREDIT = 'Product images: KST, used with permission.';

// schema.org ItemList of product types for a catalogue page.
export const itemListSchema = (name: string, items: Product[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `https://dnycrossbordergroup.com/components/products/${p.slug}` })),
});

// Services offered on /components. Also used as the work areas on the
// Drone & Robotics Components card in Open Needs, so the copy lives once.
export const SERVICES = [
  { k: 'Component Sourcing', d: 'Tell us the model, generation and part number. We source the matching part and confirm it with you before quoting.' },
  { k: 'Bulk Supply Enquiries', d: 'Quantities for fleets, service teams and resellers, quoted per enquiry.' },
  { k: 'Compatibility Review', d: 'We check the part against the exact model, generation and part number you provide before any quote.' },
  { k: 'Custom Module Enquiries', d: 'Brackets, mounts and mechanical parts made to your drawing or sample, assessed case by case.' },
];

export const COMPONENTS_LEAD =
  'Explore components for drones, industrial robots and commercial autonomous systems. Submit your model, part number and quantity for sourcing and quotation.';

export const COMPONENTS_CTA = {
  drones: { label: 'Browse Drone Components', href: '/components/drones' },
  robotics: { label: 'Explore Robotics Components', href: '/components/robotics' },
  quote: { label: 'Request a Quote', href: '/components/enquiry' },
};
