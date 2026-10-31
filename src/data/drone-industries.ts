// Industry pages under /physical-intelligence/drones.
// Copy supplied by the design brief of 2026-11-01. The scope note is shared by the hub,
// the three industry pages and the enquiry page, so the wording cannot drift between them.

export type DroneIndustry = {
  slug: 'construction' | 'agriculture' | 'inspection';
  application: 'Construction' | 'Agriculture' | 'Inspection';
  title: string;
  description: string;
  h1: string;
  lead: string;
  applications: string[];
  include: string[];
};

export const SCOPE_NOTE = [
  'DNY currently handles equipment sourcing and sales enquiries. We do not provide flight demonstrations, surveying, inspection operations or agricultural spraying services. Operators are responsible for obtaining the qualifications, registrations and approvals required for their activities.',
  'Product listings are invitations to enquire. Availability, configuration, price and delivery are confirmed in writing after review of applicable export, import and product requirements.',
];

export const DRONE_INDUSTRIES: DroneIndustry[] = [
  {
    slug: 'construction',
    application: 'Construction',
    title: 'Construction Drones',
    description:
      'Construction aircraft and payload options for site mapping, photogrammetry, progress imagery, roof assessment and building inspection, reviewed and quoted on enquiry.',
    h1: 'Construction Drones',
    lead: 'Explore aircraft and payload options for site mapping, photogrammetry, progress imagery, roof assessment and building inspection. Share your site environment, required outputs and preferred configuration so we can review suitable equipment.',
    applications: ['Site mapping and 3D models', 'Progress imagery', 'Roof and facade assessment', 'Building inspection'],
    include: ['Site environment', 'Required outputs (maps, models or imagery)', 'Preferred payload or camera', 'Quantity and delivery location'],
  },
  {
    slug: 'agriculture',
    application: 'Agriculture',
    title: 'Agricultural Drones',
    description:
      'Agricultural aircraft for crop monitoring, field mapping, spraying and spreading, reviewed by capacity, intended use and delivery location before a written quote.',
    h1: 'Agricultural Drones',
    lead: 'Explore aircraft for crop monitoring, field mapping, spraying and spreading applications. Tell us your intended use, required tank or hopper capacity and delivery location. Aircraft specifications, payloads and supply requirements are reviewed for each enquiry.',
    applications: ['Crop monitoring', 'Field mapping', 'Spraying', 'Spreading'],
    include: ['Intended use', 'Required tank or hopper capacity', 'Field size and terrain', 'Quantity and delivery location'],
  },
  {
    slug: 'inspection',
    application: 'Inspection',
    title: 'Inspection Drones',
    description:
      'Inspection aircraft and payload options for solar assets, utilities, pipelines, bridges and industrial facilities, reviewed against your imaging needs and operating environment.',
    h1: 'Inspection Drones',
    lead: 'Explore aircraft and payload options for solar assets, utilities, pipelines, bridges and industrial facilities. We review equipment options against your intended application, imaging needs and operating environment.',
    applications: ['Solar assets', 'Power and utilities', 'Pipelines', 'Bridges', 'Industrial facilities'],
    include: ['Asset type', 'Imaging needs (visual, thermal or other)', 'Operating environment', 'Quantity and delivery location'],
  },
];

export const droneIndustry = (slug: string) => DRONE_INDUSTRIES.find((d) => d.slug === slug);
