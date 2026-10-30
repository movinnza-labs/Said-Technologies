import type { CollectionConfig } from 'payload'

import { loggedIn } from '../access'

// Profiles from the careers form. Created only by the /forms/career route; staff-only.
export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'role', 'experience', 'status', 'createdAt'],
    group: 'Submissions',
  },
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  timestamps: true,
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'shortlisted', 'interview', 'closed'].map((v) => ({ label: v[0].toUpperCase() + v.slice(1), value: v })),
      admin: { position: 'sidebar' },
    },
    { name: 'fullName', type: 'text', required: true },
    { type: 'row', fields: [
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', required: true },
    ] },
    { name: 'location', type: 'text', required: true },
    { type: 'row', fields: [
      { name: 'role', type: 'text', required: true },
      { name: 'experience', type: 'text', required: true },
    ] },
    { name: 'resume', type: 'upload', relationTo: 'resumes', required: true },
    { name: 'message', type: 'textarea' },
  ],
}
