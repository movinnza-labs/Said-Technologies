import type { ReactNode } from 'react'

import { SiteShell } from './SiteShell'

type Crumb = { label: string; href?: string }

// Detail page for a blog or case study, built from the same classes as the approved inner-page hero.
export function ArticleLayout({
  crumbs,
  eyebrow,
  title,
  lead,
  meta,
  image,
  children,
}: {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lead?: string | null
  meta?: string
  image?: { url: string; alt: string } | null
  children: ReactNode
}) {
  return (
    <SiteShell>
      <main id="main" tabIndex={-1}>
        <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 to-white">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container-site relative pb-14 pt-8 sm:pb-16 lg:pb-20">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {crumbs.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {c.href ? (
                      <a href={c.href} className="underline-offset-4 hover:underline text-ink-600 hover:text-brand-700">
                        {c.label}
                      </a>
                    ) : (
                      <span aria-current="page" className="font-medium text-ink-900">
                        {c.label}
                      </span>
                    )}
                    {i < crumbs.length - 1 && <span aria-hidden="true" className="text-ink-600/50">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-8 max-w-3xl">
              <h1>
                <span className="eyebrow block">{eyebrow}</span>
                <span className="display-2 mt-4 block">{title}</span>
              </h1>
              {lead && <p className="mt-6 text-lg font-medium text-ink-800">{lead}</p>}
              {meta && <p className="mt-4 text-sm text-ink-600">{meta}</p>}
            </div>
          </div>
        </section>
        <section className="bg-white py-16 sm:py-20">
          <div className="container-site">
            {image?.url && <img className="said-article__cover" src={image.url} alt={image.alt} />}
            <div className="said-article">{children}</div>
          </div>
        </section>
      </main>
    </SiteShell>
  )
}
