import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { CaseStudies } from './collections/CaseStudies'
import { Enquiries } from './collections/Enquiries'
import { CareerApplications } from './collections/CareerApplications'
import { Resumes } from './collections/Resumes'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — SAID Technologies CMS' },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Posts, CaseStudies, Media, Enquiries, CareerApplications, Resumes, Users],
  editor: lexicalEditor(),
  // preview builds without a database have no secret; a real one is required once DATABASE_URL is set
  secret: process.env.PAYLOAD_SECRET || (process.env.DATABASE_URL ? '' : 'preview-without-database'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // production schema changes go through migrations (npm run payload migrate)
    migrationDir: path.resolve(dirname, 'migrations'),
    // tables are created/updated automatically when the production server starts
    prodMigrations: migrations,
    push: process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_DB_PUSH !== 'false',
  }),
  sharp,
  plugins: [],
})
