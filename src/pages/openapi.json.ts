// OpenAPI description for AI agents and tools: /openapi.json (listed in /.well-known/api-catalog).
// Generated from site data so product ids always match the enquiry API allowlist.
import type { APIRoute } from 'astro';
import { PRODUCTS } from '../data/components';
import { SITE } from '../data/site';

export const GET: APIRoute = () => {
  const text = (summary: string, type = 'text/plain') => ({ get: { summary, responses: { '200': { description: summary, content: { [type]: {} } } } } });
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'DNY Cross Border Group — public API',
      version: '2.0.0',
      description:
        'Endpoints that let AI agents and tools read DNY Cross Border Group content and, acting for a buyer, submit a component quote request. No authentication is required. Every page is also available as Markdown with Accept: text/markdown. Personal information sent to the enquiry endpoint is handled under ' + SITE.url + '/privacy.',
      contact: { name: SITE.legalName, email: SITE.email, url: `${SITE.url}/contact` },
    },
    servers: [{ url: SITE.url }],
    paths: {
      '/llms.txt': text('AI-readable site summary (llmstxt.org format)'),
      '/llms-full.txt': text('Complete site content as one Markdown document'),
      '/components/catalogue.json': text('Drone & Robotics Components catalogue: categories, product ids, KST servo series and model names. No prices.', 'application/json'),
      '/ventures.json': text('The group’s ventures with status, category and summary', 'application/json'),
      '/sitemap-index.xml': text('XML sitemap index of all pages', 'application/xml'),
      '/{page}': {
        get: {
          summary: 'Any page as HTML, or as Markdown when requested with Accept: text/markdown',
          parameters: [
            { name: 'page', in: 'path', required: true, schema: { type: 'string' }, example: 'components/products/kst-hls-servos' },
            { name: 'Accept', in: 'header', required: false, schema: { type: 'string', enum: ['text/html', 'text/markdown'] } },
          ],
          responses: { '200': { description: 'Page content', content: { 'text/html': {}, 'text/markdown': {} } } },
        },
      },
      '/api/enquiries': {
        post: {
          operationId: 'submitComponentEnquiry',
          summary: 'Submit a component quote request on behalf of a buyer',
          description:
            'Creates a quote request for drone or robotics components. Only submit with the buyer’s knowledge and their real contact details. Each line needs a product_id from /components/catalogue.json and a quantity, or a free-text description for a part that is not listed. Fit, price, stock and lead time are confirmed by DNY by email after review — nothing is ordered or charged. Rate limited to 5 requests per 10 minutes per IP address. Photos and drawings can only be attached through the website form.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'country', 'items'],
                  properties: {
                    name: { type: 'string', maxLength: 120 },
                    email: { type: 'string', format: 'email' },
                    country: { type: 'string', description: 'Country or region of the buyer', example: 'Australia' },
                    company: { type: 'string' },
                    phone: { type: 'string' },
                    postcode: { type: 'string', description: 'Delivery postcode' },
                    needed_by: { type: 'string', format: 'date' },
                    notes: { type: 'string', maxLength: 4000 },
                    marketing: { type: 'boolean', default: false, description: 'True only if the buyer has explicitly asked to receive marketing updates' },
                    submitted_via: { type: 'string', maxLength: 80, description: 'Name of the agent or tool submitting on the buyer’s behalf' },
                    items: {
                      type: 'array', minItems: 1, maxItems: 50,
                      items: {
                        type: 'object',
                        properties: {
                          product_id: { type: ['string', 'null'], enum: [...PRODUCTS.map((p) => p.id), null], description: 'Product id from the catalogue; null for a part that is not listed' },
                          part_number: { type: 'string', description: 'Manufacturer part number or KST model name, e.g. HLS3008-12' },
                          model: { type: 'string', description: 'Equipment brand, model and generation the part is for' },
                          quantity: { type: 'integer', minimum: 1, description: 'Required when product_id is set' },
                          description: { type: 'string', description: 'Required when product_id is null' },
                        },
                      },
                    },
                  },
                },
                example: {
                  name: 'Alex Buyer', email: 'alex@example.com', country: 'Australia', submitted_via: 'Example Assistant',
                  items: [{ product_id: 'RS-KHLS', part_number: 'HLS3008-12', quantity: 10, model: 'Warehouse robot arm joint' }],
                },
              },
            },
          },
          responses: {
            '201': { description: 'Saved. Returns the enquiry reference to give to the buyer.', content: { 'application/json': { schema: { type: 'object', properties: { reference: { type: 'string', example: 'DNY-Q-261025-ABC234' } } } } } },
            '400': { description: 'Validation error with a readable message in `error`' },
            '422': { description: 'A product_id is not in the published catalogue' },
            '429': { description: 'Rate limited — retry later' },
            '503': { description: 'Enquiries temporarily unavailable — email ' + SITE.email },
          },
        },
      },
    },
  };
  return new Response(JSON.stringify(spec, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
