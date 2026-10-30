import 'server-only'

import fs from 'node:fs'
import path from 'node:path'

// Content generated from the approved static site by scripts/import-static.mjs.
const CONTENT_DIR = path.join(process.cwd(), 'content')

export type PageEntry = { route: string; file: string; title: string; description: string }
export type HomeId = 'v1' | 'v2' | 'v3'
export type HomeEntry = { route: string; title: string; description: string; htmlClass: string }

const read = (...parts: string[]) => fs.readFileSync(path.join(CONTENT_DIR, ...parts), 'utf8')

let pagesCache: PageEntry[] | null = null
export function getPages(): PageEntry[] {
  pagesCache ??= JSON.parse(read('pages', 'manifest.json')) as PageEntry[]
  return pagesCache
}

export function getPage(route: string): (PageEntry & { html: string }) | null {
  const entry = getPages().find((p) => p.route === route)
  return entry ? { ...entry, html: read('pages', entry.file) } : null
}

export const getHeaderHtml = () => read('partials', 'header.html')
export const getFooterHtml = () => read('partials', 'footer.html')

export function getHome(id: HomeId): HomeEntry & { html: string } {
  const homes = JSON.parse(read('home', 'manifest.json')) as Record<HomeId, HomeEntry>
  return { ...homes[id], html: read('home', `${id}.html`) }
}

// Splits page markup into its top-level <section> blocks so a CMS-driven block can replace one of them.
export function splitSections(mainHtml: string) {
  const open = mainHtml.match(/^<main[^>]*>/)?.[0] ?? '<main id="main">'
  const inner = mainHtml.replace(/^<main[^>]*>/, '').replace(/<\/main>\s*$/, '')
  const sections = inner.split(/(?=<section\b)/).filter((s) => s.trim())
  return { open, sections }
}

// The static export showed "Demonstration form" notices; the Next.js forms really send, so those go.
export const stripDemoNotices = (html: string) =>
  html
    .replace(/<div[^>]*role="note"[^>]*>(?:(?!<\/div>)[\s\S])*?Demonstration form[\s\S]*?<\/div>/g, '')
    .replace(/ aria-describedby="demo-note"/g, '')

export type Option = { value: string; label: string }
export type AreaOption = Option & { solutions: Option[] }

const labelOf = (title: string) => title.split(' — ')[0].split(' | ')[0].trim()
const slugOf = (route: string) => route.split('/').pop() || ''

// Solution areas and services for the enquiry form, taken from the page tree so they always match the site.
export function getEnquiryOptions() {
  const pages = getPages()
  const tree = (section: string): AreaOption[] =>
    pages
      .filter((p) => new RegExp(`^/${section}/[^/]+$`).test(p.route))
      .map((area) => ({
        value: slugOf(area.route),
        label: labelOf(area.title),
        solutions: pages
          .filter((p) => p.route.startsWith(area.route + '/') && p.route.split('/').length === 4)
          .map((s) => ({ value: slugOf(s.route), label: labelOf(s.title) })),
      }))
  return {
    business: tree('what-we-do'),
    education: tree('education'),
    industries: pages
      .filter((p) => /^\/industries\/[^/]+$/.test(p.route))
      .map((p) => ({ value: slugOf(p.route), label: labelOf(p.title) })),
  }
}
export type EnquiryOptions = ReturnType<typeof getEnquiryOptions>
