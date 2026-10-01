import { SITE } from './site';

// TechArticle / Article schema for canonical definition pages (brief §15)
export const techArticle = (headline: string, description: string, path: string, about: string[] = []) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline,
  description,
  url: new URL(path, SITE.url).href,
  inLanguage: 'en-AU',
  author: { '@id': `${SITE.url}/#organization` },
  publisher: { '@id': `${SITE.url}/#organization` },
  dateModified: SITE.lastUpdated,
  about: about.map((name) => ({ '@type': 'Thing', name })),
});

export const definedTerm = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name,
  description,
  url: new URL(path, SITE.url).href,
  inDefinedTermSet: new URL('/glossary', SITE.url).href,
});
