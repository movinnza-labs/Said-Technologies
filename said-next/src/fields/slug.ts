import type { Field } from 'payload'

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// URL part of an entry, filled from another field when left empty.
export const slugField = (from: string): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'Used in the page address. Leave empty to create it from the title.' },
  hooks: {
    beforeValidate: [({ value, data }) => toSlug(String(value || data?.[from] || ''))],
  },
})
