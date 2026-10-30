import type { ReactNode } from 'react'

import { getPage, splitSections } from '@/lib/content'

import { SiteShell } from './SiteShell'

// Approved Blogs / Case Studies page with its "nothing published yet" section replaced by CMS entries.
export function InsightsPage({ route, list }: { route: string; list: ReactNode | null }) {
  const page = getPage(route)
  if (!page) return null
  const { sections } = splitSections(page.html)
  const emptyIndex = sections.findIndex((s) => /have been published yet/.test(s))
  return (
    <SiteShell>
      <main id="main" tabIndex={-1}>
        {sections.map((s, i) =>
          i === emptyIndex && list ? (
            <div key={i} style={{ display: 'contents' }}>
              {list}
            </div>
          ) : (
            <div key={i} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: s }} />
          ),
        )}
      </main>
    </SiteShell>
  )
}

export function insightsMetadata(route: string) {
  const page = getPage(route)
  return page ? { title: { absolute: page.title }, description: page.description, alternates: { canonical: route } } : {}
}
