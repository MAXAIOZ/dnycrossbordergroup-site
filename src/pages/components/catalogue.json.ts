// Machine-readable catalogue for AI agents and integrations: /components/catalogue.json
// Published products only — the same allowlist the enquiry API enforces. No prices or stock.
import type { APIRoute } from 'astro';
import data from '../../data/components-catalogue.json';
import { PRODUCTS, CATEGORIES, BRANDS, APP_PATH } from '../../data/components';
import { SITE } from '../../data/site';

export const GET: APIRoute = () => {
  const U = (p: string) => `${SITE.url}${p}`;
  const body = {
    name: 'DNY Drone & Robotics Components catalogue',
    publisher: { name: SITE.legalName, url: SITE.url, email: SITE.email },
    version: data.version,
    url: U('/components'),
    scope: data.scope,
    pricing: 'No prices, stock or lead times are published. Every line is quoted on request.',
    howToEnquire: {
      page: U('/components/enquiry'),
      api: { method: 'POST', url: U('/api/enquiries'), contentType: 'application/json', spec: U('/openapi.json') },
      email: SITE.email,
      note: 'Use a product id from this file, the equipment model or part number, and a quantity. A unique enquiry reference is returned when the enquiry is saved.',
    },
    statusDefinitions: data.statusDefinitions,
    brands: BRANDS,
    categories: CATEGORIES.map((c) => ({
      id: c.id,
      application: c.application,
      name: c.name,
      summary: c.summary,
      url: U(`${APP_PATH[c.application]}?cat=${c.id}`),
      products: PRODUCTS.filter((p) => p.category === c.id).map((p) => ({
        id: p.id,
        name: p.name,
        url: U(`/components/products/${p.slug}`),
        description: p.description,
        ...(p.brand ? { brand: p.brand, series: p.series, models: p.models } : {}),
        send: p.send,
        limits: p.limits,
      })),
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
