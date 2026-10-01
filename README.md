# DNY Cross Border Group — corporate website

Astro static site, deployed on Cloudflare Pages from this GitHub repository.
Built from the *Website Content & Architecture Upgrade Brief* (September 2026).

## Deploy settings (Cloudflare Pages → Settings → Builds & deployments)

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | from `.node-version` (22) |

`public/_redirects` sends every old `.html` URL (e.g. `/platform.html`, `/project-facadia.html`) to its new page with a 301.

## Local development

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # outputs dist/
npm run check:links    # after build: links, anchors, one H1 per page, no non-English text, no "AIHL"
python3 scripts/generate-og.py   # after build: regenerates Open Graph images in public/og/
```

## Where content lives (edit data, not pages)

| What | File |
|---|---|
| Navigation, footer, contact details, form endpoint, analytics token | `src/data/site.ts` |
| Ventures (name, status, layer, industry, capabilities, relationship) | `src/data/ventures.ts` |
| 5-layer group architecture, hierarchy, Physical AI loop, trust model | `src/data/architecture.ts` |
| Industries and the industry × capability matrix | `src/data/industries.ts` |
| Sub-pages for Physical Intelligence, AI Infrastructure, Industries, OPC + FDE | `src/data/topics.ts` |
| FAQ (rendered with FAQPage schema) | `src/data/faqs.ts` |
| Glossary definitions | `src/data/glossary.ts` |
| Long-form body copy migrated from the previous site | `src/legacy/*.html` |

* **Add a venture:** add an object to `VENTURES` (and optionally `src/legacy/<slug>.html` for a long body). The card, filters, venture page, sitemap and ItemList schema update automatically.
* **Rename a venture** (e.g. once a standalone brand is registered): change `name` only.
* **Status labels:** `Operating`, `In Development`, `Proposed`, `Research`, `Partnership Opportunity`.
* **Language:** the site is English only. `npm run check:links` fails if any CJK characters appear.

## Contact form

`/contact` posts JSON to FormSubmit (`SITE.formEndpoint`) and tags each enquiry with
`enquiry_type` (enterprise / partnership / investment / developer / visit / general), the source page,
landing page, referrer and UTM parameters. **The first submission sends a one-time activation email to
info@dnycrossbordergroup.com — click "Activate Form" in that email once.** CTAs link to
`/contact?type=…` so the type is pre-selected.

## Structured data

Every page: Organization, WebSite, BreadcrumbList, canonical, OG image. Topic pages add TechArticle and
DefinedTerm; FAQ blocks add FAQPage; `/ventures` adds ItemList; `/glossary` adds DefinedTermSet.

## Structure

```
src/
  components/   GroupStack, PIFlow, VentureCard/Grid, IndustryMatrix, TrustDiagram, FAQ, CTABand, TopicPage…
  data/         all content data (see above)
  layouts/      Base.astro (head, SEO, schema, nav, footer)
  legacy/       migrated long-form bodies + meta.json
  pages/        routes (clean URLs, e.g. /physical-intelligence/drones)
public/
  assets/       styles.css (brand v3), group.css (v4 components), main.js, fx.js, group.js
  og/           Open Graph images
  _redirects, _headers, robots.txt
_legacy-static/ the previous hand-written HTML site, kept for reference only (not deployed)
```

## GEO — being read and cited by AI search

| What | Where |
|---|---|
| AI-readable summary (llmstxt.org) | `/llms.txt` — generated from `src/lib/ai-text.ts` |
| Full site text for AI systems | `/llms-full.txt` |
| Canonical company facts page | `/facts` |
| AI crawlers explicitly allowed + content signals | `public/robots.txt` |
| Entity data (alternate names, profiles, brands, contact point) | `SITE` in `src/data/site.ts` → Organization schema |
| Freshness (`dateModified`, footer date) | `SITE.lastUpdated` — bump it whenever content changes |
| Instant indexing for Bing / Copilot / ChatGPT search | `npm run build && npm run indexnow` after each deploy (key file in `public/`) |

Add official profile URLs (LinkedIn, Crunchbase, X, GitHub…) to `SITE.sameAs` — it is the single strongest signal that ties those profiles and this site to one entity.
