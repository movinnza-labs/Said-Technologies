import type { CollectionConfig } from 'payload'

import { anyone, loggedIn } from '../access'

// Images for blogs and case studies (public).
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Insights' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    staticDir: 'uploads/media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 720, height: 450, position: 'centre' },
      { name: 'wide', width: 1600, height: 900, position: 'centre' },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
