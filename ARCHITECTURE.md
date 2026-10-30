# ARCHITECTURE.md — SAID Technologies Website

Defines how the SAID Technologies corporate website is built, deployed and operated.

- **Sources of truth:** PRD.md (product) and DESIGN.md (visual and UX). Until PRD.md exists, the product source is the approved client brief.
- **What the product is:** A public marketing and information website of about 116 pages. It has two lead-capture forms (business or education enquiry, and career application), plus blogs (7–8) and case studies (10–12) to be added.
- **What it is not:** It is not a web application. There are no user accounts, no customer portal, no e-commerce and no dashboards in the MVP.

---

## 1. Guiding Decisions

1. **Static first.** Every page is generated as HTML at build time. Nothing renders per request except the two form endpoints.
2. **One codebase, one host, one database.** No microservices, no separate backend server, no queue and no container platform.
3. **Content lives in the repository.** The approved copy is final and changes rarely, so it stays as files under version control. No CMS in the MVP.
4. **Shared layout, not 116 copies.** The header, mega menu, footer and page templates are defined once. Editing 116 HTML files by hand is not an acceptable workflow.
5. **Keep the approved content exactly as it is.** Moving to the build system must not change any copy, URL or page structure.

---

## 2. Recommended Tech Stack

| Layer | Choice | Reasoning |
|---|---|---|
| Framework | **Next.js (App Router), TypeScript** | The delivered HTML was generated from a Next.js project (see `said-html/README.txt`). Reusing that source keeps content, URLs and structure identical. It gives static generation of all pages and server endpoints for the forms in one project. |
| Styling | **Tailwind CSS v4** with design tokens from DESIGN.md | `site.css` is already Tailwind output, and the existing token names (`ink-*`, `brand-*`) carry over directly. |
| Content | **MDX or Markdown files and typed data files** in `content/` | Version-controlled, reviewable in pull requests and needs no extra service. Blogs and case studies use the same pattern. |
| Interactivity | **React client components only where needed** (mega menu, mobile drawer, forms, video player) | Everything else ships as plain HTML with zero JavaScript, as the current "islands" approach already does. |
| Form validation | **Zod**, one schema shared by browser and server | The same rules run on both sides from a single definition. |
| Database | **PostgreSQL on Supabase** (Mumbai region, `ap-south-1`) | It stores enquiries and applications, includes private file storage for résumés and offers row-level security. Data stays in India. See DATABASE.md. |
| File storage | **Supabase Storage**, private bucket | Holds résumé uploads next to the database under the same access rules. |
| Email | **Transactional email API** (Resend, or the client's SMTP if mandated) | Notifies the SAID team of each new submission. |
| Spam protection | Honeypot field, server-side rate limit and **Cloudflare Turnstile** | The honeypot already exists. Turnstile is invisible to most users and free. |
| Hosting | **Vercel** (or Netlify) | Native Next.js support, a global CDN for static pages, serverless functions for forms and preview deploys for every pull request. |
| Analytics | **Google Analytics 4** or Plausible, loaded only after consent | Basic traffic and conversion tracking. |

### Explicitly not used

These would add cost and complexity without serving an MVP requirement: a headless CMS, a separate Node or Express API, Redis, Docker or Kubernetes, GraphQL, ORMs with heavy runtime layers, state-management libraries and UI kit libraries.

### Fallback if the Next.js source is not available

The client has so far supplied only the generated HTML. **Request the original Next.js project (including the `content/` folder) first.** If it cannot be provided:

- Keep the plain HTML in `said-html/` and apply the new design through the shared `assets/site.css` and `assets/islands.js`.
- Header, menu and footer changes must then be applied by a one-off script across all files, not by hand.
- The form endpoints in Section 6 are deployed as two standalone serverless functions on the same host. The database design does not change.

---

## 3. System Architecture

```
                    ┌───────────────────────────────┐
  Visitor ─HTTPS──▶ │  CDN (Vercel Edge)            │
                    │  Static HTML / CSS / JS / img │  ◀── built from repo at deploy
                    └──────────────┬────────────────┘
                                   │ POST (forms only)
                    ┌──────────────▼────────────────┐
                    │  Serverless route handlers    │
                    │  /api/enquiry                 │
                    │  /api/careers                 │
                    └───┬───────────┬───────────┬───┘
                        │           │           │
              ┌─────────▼──┐  ┌─────▼─────┐  ┌──▼──────────────┐
              │ Supabase   │  │ Supabase  │  │ Email API       │
              │ Postgres   │  │ Storage   │  │ (notify SAID)   │
              └────────────┘  └───────────┘  └─────────────────┘
                        ▲
               Cloudflare Turnstile (token verified server-side)
```

### Frontend

- All routes are **statically generated at build time** with `generateStaticParams` over the content files, and no page uses request-time rendering.
- Pages are server components by default. Only these are client components: `MegaMenu`, `MobileNav`, `EnquiryForm`, `CareerForm`, `VideoPlayer` and `LoopPlayer`.
- Images go through `next/image` with fixed sizes and aspect ratios (DESIGN.md Section 5.4), served as AVIF or WebP.
- The navigation tree is generated from the content data, so the mega menu, mobile drawer, footer, breadcrumbs and sitemap always agree.

### Backend

- The backend consists of **two route handlers only**. They run on the Node.js runtime because they need file upload and the Supabase server client.
- The handlers have no session and no state between requests.

---

## 4. Data Flow

### 4.1 Page view

1. Build: content files and templates produce static HTML, which is pushed to the CDN.
2. Request: the CDN returns the HTML. There is no server or database call.

### 4.2 Enquiry submission

1. The browser validates the fields with the shared Zod schema.
2. The browser gets a Turnstile token and sends a `POST /api/enquiry` request with JSON.
3. The server then works through these steps in order. Any failure stops processing and returns an error.
   1. Reject the request if the honeypot field is filled. Return a fake success so bots learn nothing.
   2. Verify the Turnstile token with Cloudflare.
   3. Check the rate limit: no more than 5 submissions per IP hash in 10 minutes (a database query).
   4. Validate with the same Zod schema, then check that the chosen area and solution slugs exist in the content data.
   5. Insert the row into `enquiries`.
   6. Send the notification email to the SAID inbox for that enquiry type (business or education). If the email fails, log it and still return success, because the data is already saved.
4. The server returns `201`, and the browser shows the success panel.

### 4.3 Career application

The flow is the same as an enquiry, with these differences:

1. The request is `multipart/form-data`.
2. The server validates the résumé: PDF, DOC or DOCX only, 5 MB maximum, with the type checked by magic bytes and not only by file extension.
3. It uploads the file to the private bucket at `resumes/{yyyy}/{mm}/{uuid}.{ext}`.
4. It inserts the row into `career_applications` with the storage path.
5. If the insert fails, it deletes the uploaded file.
6. It sends a notification email with no attachment. The email contains only a link to view the application through the Supabase dashboard; the résumé itself is never sent by email.

### 4.4 Staff access to submissions (MVP)

SAID staff receive an email for each submission. Named staff can see full records, including résumés, through the **Supabase dashboard**, using individual accounts with two-factor authentication and read-only roles where possible. In the MVP there is no custom admin panel.

---

## 5. Folder Structure

```
said-website/
├── app/
│   ├── layout.tsx                 # html shell, fonts, header, footer
│   ├── page.tsx                   # Home
│   ├── what-we-do/[...slug]/      # categories and solution pages
│   ├── industries/[slug]/
│   ├── education/[...slug]/
│   ├── who-we-are/  careers/  contact/
│   ├── insights/
│   │   ├── blogs/[slug]/
│   │   ├── case-studies/[slug]/
│   │   ├── events/  news/
│   ├── privacy-policy/  terms-of-use/
│   ├── api/
│   │   ├── enquiry/route.ts
│   │   └── careers/route.ts
│   ├── sitemap.ts  robots.ts  not-found.tsx
├── components/
│   ├── layout/        # Header, MegaMenu, MobileNav, Footer, Breadcrumbs
│   ├── sections/      # SectionHeader, CtaBand, StepList, ScopeGrid, MediaSplit
│   ├── cards/         # ServiceCard, IndustryCard, BlogCard, CaseStudyCard
│   ├── forms/         # EnquiryForm, CareerForm, Field, ErrorSummary
│   └── media/         # Image, Placeholder, LoopPlayer, VideoPlayer
├── content/           # approved copy (single source; do not edit wording)
│   ├── navigation.ts
│   ├── solutions/  industries/  education/
│   ├── blogs/*.mdx
│   └── case-studies/*.mdx
├── lib/
│   ├── schemas/       # Zod schemas shared by forms and API
│   ├── server/        # supabase client, email, turnstile, rate-limit (server-only)
│   └── content.ts     # loaders and typed accessors for content/
├── public/
│   ├── images/  media/  logo/
├── styles/globals.css # Tailwind and design tokens
├── supabase/
│   ├── migrations/    # SQL migrations (see DATABASE.md)
│   └── seed.sql
├── tests/             # unit and end-to-end tests
├── .env.example
├── DESIGN.md  ARCHITECTURE.md  DATABASE.md  PRD.md
```

- Anything under `lib/server/` is imported only by route handlers. Mark it `server-only` so a secret can never be bundled into the browser code.

---

## 6. API Architecture

The API has two endpoints, both REST with JSON responses.

| Endpoint | Method | Body | Success | Errors |
|---|---|---|---|---|
| `/api/enquiry` | POST | JSON: fullName, organisation, designation?, email, phone?, location, enquiryType, area, solution?, industry?, requirement, contactMethod, consent, website (honeypot), turnstileToken | `201 { ok: true }` | `400` validation (field errors), `403` Turnstile failed, `429` rate limited, `500` server |
| `/api/careers` | POST | multipart: fullName, email, phone, location, role, experience, resume (file), message?, consent, website, turnstileToken | `201 { ok: true }` | `400`, `403`, `413` file too large, `415` wrong file type, `429`, `500` |

- **Error shape:** `{ ok: false, code: "VALIDATION", fields?: { email: "Enter a valid email" } }`. Field messages match the copy in DESIGN.md Section 7.
- Only `POST` is accepted. Same-origin only: check the `Origin` header and send no CORS headers.
- The request body limit is 16 KB for enquiries and 6 MB for careers.
- There is no public read API. Nothing that visitors submit is ever returned to the browser.

---

## 7. Database Interaction

- Database access goes through the **Supabase server client using the service-role key**, only inside route handlers. The browser never talks to the database.
- Queries use parameters and only three operations are allowed: insert a submission, count recent submissions for the rate limit and upload a file. There are no updates or deletes from the website.
- The schema, constraints, indexes and row-level security are defined in DATABASE.md. Schema changes are made only through SQL migrations in `supabase/migrations/`.

---

## 8. Authentication and Authorisation

| Actor | Access | Mechanism |
|---|---|---|
| Public visitor | Read all pages; submit forms | No authentication. Protected by Turnstile, honeypot and rate limit. |
| Route handlers | Insert submissions, upload résumés, count for the rate limit | Service-role key held in server environment variables |
| SAID staff (MVP) | Read submissions and download résumés | Personal Supabase dashboard accounts with 2FA, added by name and removed when they leave |
| Developers | Deploy, run migrations | Vercel and Supabase team roles with 2FA. Production keys are never kept on laptops. |

- MVP has **no website login**. With row-level security, anonymous database access is blocked completely (DATABASE.md).
- **Future:** If SAID needs a submissions dashboard, add `/admin` protected by Supabase Auth (email magic link, restricted to the company domain) with a `staff` role checked through RLS. This is not part of the MVP.

---

## 9. External Services

| Service | Purpose | Failure behaviour |
|---|---|---|
| Vercel | Hosting, CDN, serverless functions | If the platform is down, the site is down. Static pages are cached globally. |
| Supabase | Postgres and file storage | Forms return a `500` with an error banner that gives an email fallback. Pages are unaffected. |
| Email API | Team notifications | Logged and ignored; the submission is still saved. A daily check in Supabase covers missed emails. |
| Cloudflare Turnstile | Bot check | If verification is unreachable, **reject** the submission with the email fallback message. Never accept it unchecked. |
| Google Fonts | Fonts | Served from the site itself through `next/font`, so there is no runtime call to Google. |
| Analytics | Traffic | Loads only after consent. Failure has no effect on the site. |

---

## 10. AI Architecture

**Not needed.** The approved content is final and the site has no AI features in scope. Do not add chatbots, AI search or generated content. If an AI feature is requested later, it needs its own PRD entry and its own security and data-handling review.

---

## 11. Environment Configuration

| Variable | Scope | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical URLs and sitemap |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Turnstile widget |
| `TURNSTILE_SECRET_KEY` | **Server** | Token verification |
| `SUPABASE_URL` | Server | |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server** | Never prefixed with `NEXT_PUBLIC_` |
| `EMAIL_API_KEY` | **Server** | |
| `NOTIFY_TO_BUSINESS` / `NOTIFY_TO_EDUCATION` / `NOTIFY_TO_CAREERS` | Server | Destination inboxes, supplied by the client |
| `RATE_LIMIT_SALT` | **Server** | Used to hash IP addresses |
| `NEXT_PUBLIC_ANALYTICS_ID` | Public | Optional |

- There are three environments: **local** (Supabase CLI local database and Turnstile test keys), **preview** (one shared staging Supabase project with test inboxes) and **production**.
- Keep `.env.example` in the repository with empty values, and never commit real `.env*` files.
- Validate the environment at startup with Zod, so a missing secret fails the build or the function immediately and not at the first submission.

---

## 12. Error Handling

- **Build time:** A missing content field, a broken internal link or an unknown navigation slug **fails the build**. A broken page can never be deployed.
- **Route handlers:** Wrap each handler in one try/catch. Expected errors map to `400`, `403`, `413`, `415` and `429`. Everything else returns `500` with a generic message. Stack traces are never sent to the client.
- **Logging:** Use structured JSON logs (`requestId`, endpoint, outcome, duration). **Personal data such as names, emails, phone numbers and requirement text is never logged.** Platform logs on Vercel are enough for the MVP. Add Sentry only if errors cannot be traced from the logs.
- **Client:** Follow the form states in DESIGN.md Section 7. A network failure keeps the entered data and offers a retry plus an email fallback.
- **Pages:** Use a custom `not-found` page that matches DESIGN.md Section 8. Static pages cannot fail at runtime.

---

## 13. Security Boundaries

- **Trust boundary:** Everything from the browser is untrusted. Validate on the server even though the browser validated it too.
- **Secrets** exist only in server environment variables, and the service-role key never reaches the browser bundle.
- **Uploads:** Enforce an allowlist of file types checked by magic bytes and a 5 MB limit. Store files in a private bucket with random file names and never serve them publicly.
- **Output:** Submitted text is never rendered on the website. In notification emails it is HTML-escaped.
- **Security headers:** Set a strict Content-Security-Policy (self, plus Turnstile and analytics domains), HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `frame-ancestors 'none'` and a Permissions-Policy that denies camera, microphone and geolocation.
- **Abuse:** Use the honeypot, Turnstile, a per-IP-hash rate limit and request body size limits.
- **Privacy (India DPDP Act 2023):** An explicit consent checkbox is already in the forms, and the Privacy Policy is linked next to it. Collect only the fields the forms need. Retention rules are in DATABASE.md. The Privacy Policy must be approved by the client before launch.
- **Dependencies:** Keep the dependency list short, enable Dependabot, run `npm audit` in CI and pin versions with a lockfile.

---

## 14. Testing

| Level | Tool | What it covers |
|---|---|---|
| Static checks | TypeScript strict and ESLint | Every commit |
| Unit | Vitest | Zod schemas, content loaders, slug validation, rate-limit logic |
| Content integrity | Build-time script | Every navigation link resolves, every page has an H1 and meta description, there are no duplicate slugs, and the page count matches the approved inventory (116) |
| Copy regression | Script that compares visible text against the delivered HTML | Confirms the approved wording did not change during migration (run once at migration and on major refactors) |
| End-to-end | Playwright | Mega menu by mouse and keyboard, mobile drawer, enquiry submit (success, validation, server error), career upload (valid, too large, wrong type), 404 |
| Accessibility | axe-core inside Playwright, and a manual screen reader pass on Home, a detail page and Contact | WCAG 2.2 AA |
| Performance | Lighthouse CI on Home, a category page, a detail page and Contact | Performance 90+, CLS below 0.1, LCP below 2.5s on mobile |

---

## 15. Deployment

- **Git flow:** Use a protected `main` branch with pull requests. Every pull request gets a Vercel preview URL to share with the client for review.
- **CI (GitHub Actions):** Install, run type checks and lint, run unit tests, build (which includes the content checks), then run Playwright and axe against the preview.
- **Merge to `main`:** Production deploys automatically. Rollback is a one-click redeploy of the previous build on Vercel.
- **Database migrations:** Apply them to staging first and then to production with the Supabase CLI. Migrations are run by hand as a reviewed step and never automatically when the app deploys.
- **Domain:** The client's domain uses Vercel DNS records, with HTTPS automatic. Redirect `www` to the apex domain, or the reverse, as the client prefers.
- **Before launch:** All of the following must be complete.
  - Logo supplied
  - Images and media supplied
  - Legal text approved
  - Notification inboxes confirmed
  - Remove the "Demonstration form" notice
  - Submit `sitemap.xml` to Google Search Console

---

## 16. MVP vs Future

| Area | MVP (launch) | Future (only when needed) |
|---|---|---|
| Content editing | Developers edit `content/` through pull requests | Headless CMS (for example Sanity) if SAID wants to publish blogs without a developer |
| Submissions | Email notification and Supabase dashboard | `/admin` page with Supabase Auth and a CSV export |
| Blogs and case studies | MDX files, statically built | Tag pages, search, RSS |
| Careers | One general application form | Job openings managed as content, with an application linked to an opening |
| Media | Self-hosted images and short loops | Video hosting (YouTube or Mux) for long videos |
| Languages | English (`en-IN`) | Hindi or Marathi through Next.js i18n routing |
| Monitoring | Vercel logs and uptime check | Sentry, alerting |
| Scale | Static CDN handles traffic peaks without changes | Nothing expected; the architecture does not need to scale up |
