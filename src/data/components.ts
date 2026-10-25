// Drone & Robotics Components — public catalogue helpers.
// Only products with publication_status === 'published' are ever exported to pages,
// search, sitemap, llms.txt or the enquiry allowlist. Drafts stay in the JSON only.
import data from './components-catalogue.json';

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

export const COMPONENTS_CTA = {
  drones: { label: 'Browse Drone Components', href: '/components/drones' },
  robotics: { label: 'Explore Robotics Components', href: '/components/robotics' },
  quote: { label: 'Request a Quote', href: '/components/enquiry' },
};
