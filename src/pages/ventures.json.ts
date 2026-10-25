// Machine-readable venture list for AI agents: /ventures.json
import type { APIRoute } from 'astro';
import { VENTURES, STATUS_DEFS, CATEGORY_DEFS } from '../data/ventures';
import { SITE } from '../data/site';

export const GET: APIRoute = () => {
  const body = {
    publisher: { name: SITE.legalName, url: SITE.url },
    updated: SITE.lastUpdated,
    statusDefinitions: STATUS_DEFS,
    categoryDefinitions: CATEGORY_DEFS,
    ventures: VENTURES.map((v) => ({
      id: v.slug,
      name: v.name,
      url: `${SITE.url}/ventures/${v.slug}`,
      status: v.status,
      category: v.category,
      summary: v.short,
      industries: v.industries,
      capabilities: v.capabilities,
      relationToGroup: v.relation,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
