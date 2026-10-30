import type { CollectionConfig } from 'payload'

import { loggedIn } from '../access'

// Resume files attached to career applications. Private: only logged-in staff can open them.
export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: { group: 'Submissions', hidden: ({ user }) => !user },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    staticDir: 'uploads/resumes',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [],
}
