# SAID Technologies — website (Next.js + Payload CMS + PostgreSQL)

The approved SAID Technologies website rebuilt on **Next.js 16** with **Payload CMS 3** and a **PostgreSQL** database.
Content and design are the approved ones; nothing was rewritten.

| What | Where |
|---|---|
| Home page (design 1 — logo navy + yellow, hub hero) | `/` |
| Home design 2 (light, warm palette) | `/design/v2` |
| Home design 3 "Nova" (blue / cyan / purple) | `/design/v3` |
| 112 inner pages (What We Do, Industries, Education, Who We Are, Careers, Contact, legal) | `/what-we-do/...` etc. |
| Blogs and Case Studies (managed in the CMS) | `/insights/blogs`, `/insights/case-studies` |
| CMS admin | `/admin` |

Old static addresses (`/said-html/...`, `.../index.html`, `index-v1.html`) redirect to the new ones.

## How it is built

- **Content** comes from the approved static site (`../said-html`). `npm run import:static` converts it into
  `content/` (page bodies, header, footer, home designs) and `public/assets/` (images, scripts).
  Run it again whenever the static site changes; the output is committed so the server does not need `../said-html`.
- **CSS stays in separate files** in `src/styles/`:
  - `site/site.css`, `site/site-said.css` — inner pages
  - `site/theme.css` + `site/theme-said.css` + `site/theme-logo.css` — design 1
  - `site/theme.css` — design 2
  - `site/theme.css` + `site/theme-nova.css` — design 3
  - `cms.css` — new parts (mobile menu, form messages, blog/case-study cards, article pages)
  Each design has its own route group and root layout (`src/app/(home-v1)`, `(home-v2)`, `(home-v3)`, `(site)`),
  so its stylesheets load only on its own pages.
- **Payload CMS** (`src/payload.config.ts`, `src/collections/`):
  - *Blogs* and *Case Studies* — drafts and publishing; published entries appear on the site immediately
  - *Media* — images (public)
  - *Enquiries* and *Career Applications* — filled by the website forms; staff-only
  - *Resumes* — uploaded CVs; staff-only
  - *Users* — CMS logins
- **Forms**: the contact and careers forms post to `/forms/enquiry` and `/forms/career`, which validate the input,
  block bots (hidden field + rate limit), accept PDF/Word resumes up to 5 MB and save to the CMS.

## Run locally

Requirements: Node.js 22.12 or newer, and a PostgreSQL database.

```bash
cp .env.example .env          # then fill in DATABASE_URL and PAYLOAD_SECRET
npm install
npm run dev                   # http://localhost:3000  — CMS at /admin
```

The first visit to `/admin` asks you to create the first admin user.

In development the database tables are created automatically. Pages still render without a database
(blogs and case studies then show the approved "nothing published yet" text), but forms and `/admin` need it.

## Database (PostgreSQL)

Use a hosted PostgreSQL such as **Neon** (neon.tech) or **Supabase** (supabase.com) — both have free tiers.
Copy the connection string into `DATABASE_URL`, for example:

```
DATABASE_URL=postgresql://USER:PASSWORD@ep-xxxx.eu-central-1.aws.neon.tech/said?sslmode=require
```

Schema changes are kept as migrations in `src/migrations/`. In production they run **automatically when the
server starts**. After changing a collection: `npm run migrate:create -- short-name`, then commit the new file.

## Deploy on Hostinger

Next.js + Payload need a running **Node.js** server. On Hostinger that means:

- **Business or Cloud web hosting** — hPanel → *Websites* → *Add website* → **Node.js Apps** (or *Advanced → Node.js*), or
- a **VPS**.

Basic shared hosting serves only static files and PHP and cannot run this app. If your plan has no Node.js option,
ask Hostinger support which plan includes "Node.js web apps".

### Node.js Apps (Business / Cloud)

1. Create the PostgreSQL database (Neon or Supabase) and copy its connection string.
2. hPanel → Node.js Apps → **Import from GitHub** → repository `movinnza-labs/Said-Technologies`, branch `main`.
3. Settings:
   - Framework: **Next.js**
   - Root / app directory: **`said-next`** (this folder). If the panel cannot use a sub-folder, deploy this folder as its own repository.
   - Node.js version: **22.x** or newer
   - Build command: `npm run build`  ·  Start command: `npm start`
4. Environment variables:
   - `DATABASE_URL` — the PostgreSQL connection string
   - `PAYLOAD_SECRET` — a long random string (for example from `openssl rand -hex 32`); never change it later
   - `NEXT_PUBLIC_SITE_URL` — the live address, for example `https://saidtechnologies.com`
5. Deploy. Open `https://your-domain/admin` and create the first admin user.

### VPS

```bash
git clone https://github.com/movinnza-labs/Said-Technologies.git && cd Said-Technologies/said-next
cp .env.example .env && nano .env      # fill in the three values
npm ci && npm run build
npx pm2 start npm --name said -- start # keeps it running; put Nginx in front for the domain + SSL
```

### Uploaded files

Images and resumes are stored in `uploads/` on the server. Make sure that folder survives redeploys
(on a VPS it does). If your Node.js plan replaces the folder on each deploy, switch Payload to S3-compatible
storage (for example Cloudflare R2 or AWS S3) with `@payloadcms/storage-s3`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | development server |
| `npm run build` / `npm start` | production build / server |
| `npm run import:static` | refresh `content/` and `public/assets/` from `../said-html` |
| `npm run generate:types` | refresh `src/payload-types.ts` after changing collections |
| `npm run migrate:create -- name` | new database migration after changing collections |
| `npm run migrate` | apply migrations manually (they also run on production start) |
