import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '../access'
import { slugField } from '../fields/slug'

// Blogs shown at /insights/blogs (the client plans 7–8 to start).
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog', plural: 'Blogs' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
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
        { name: 'category', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'readingTime', type: 'text', admin: { width: '50%', description: 'For example "5 min read"' } },
      ],
    },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 300 },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
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
