import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'

export const INDUSTRIES = [
  'Global Capability Centres',
  'Pharma & Healthcare',
  'BFSI / NBFC',
  'Manufacturing',
  'Automobile',
  'Retail',
  'IT / ITES',
  'Media',
  'Startups',
  'Real Estate & Infrastructure',
  'Education',
]

// Case studies shown at /insights/case-studies (the client plans 10–12 to start).
// Structure follows the approved page: requirement, solution, verified outcome.
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'industry', 'publishedAt', '_status'],
    group: 'Insights',
  },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      type: 'row',
      fields: [
        {
          name: 'industry',
          type: 'select',
          required: true,
          options: INDUSTRIES.map((i) => ({ label: i, value: i })),
          admin: { width: '50%' },
        },
        { name: 'customer', type: 'text', admin: { width: '50%', description: 'Only with written approval from the customer' } },
      ],
    },
    { name: 'summary', type: 'textarea', required: true, maxLength: 220, admin: { description: 'One-line verified outcome shown on cards' } },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'requirement', type: 'richText', required: true },
    { name: 'solution', type: 'richText', required: true },
    { name: 'outcome', type: 'richText', required: true },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
      hooks: {
        beforeChange: [({ value, siblingData }) => value ?? (siblingData._status === 'published' ? new Date() : undefined)],
      },
    },
  ],
}
