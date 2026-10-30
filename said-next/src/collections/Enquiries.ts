import type { CollectionConfig } from 'payload'

import { loggedIn } from '../access'

// Messages from the contact form. Created only by the /forms/enquiry route (server side);
// visible to logged-in staff only.
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'organisation', 'enquiryType', 'area', 'status', 'createdAt'],
    group: 'Submissions',
  },
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  timestamps: true,
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'contacted', 'qualified', 'closed'].map((v) => ({ label: v[0].toUpperCase() + v.slice(1), value: v })),
      admin: { position: 'sidebar' },
    },
    { name: 'fullName', type: 'text', required: true },
    { type: 'row', fields: [
      { name: 'organisation', type: 'text', required: true },
      { name: 'designation', type: 'text' },
    ] },
    { type: 'row', fields: [
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text' },
    ] },
    { name: 'location', type: 'text', required: true },
    { type: 'row', fields: [
      { name: 'enquiryType', type: 'select', required: true, options: [
        { label: 'Business Solutions', value: 'business' },
        { label: 'Education Solutions', value: 'education' },
      ] },
      { name: 'area', type: 'text', required: true },
      { name: 'solution', type: 'text' },
    ] },
    { name: 'industry', type: 'text' },
    { name: 'requirement', type: 'textarea', required: true },
    { name: 'contactMethod', type: 'select', required: true, options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Either', value: 'either' },
    ] },
    { name: 'consent', type: 'checkbox', required: true },
    { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
  ],
}
