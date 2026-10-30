import Link from 'next/link'

import type { CaseStudy, Post } from '@/payload-types'

import { formatDate, imageOf } from '@/lib/cms'

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="cms-list-title">
      <div className="container-site">
        <h2 id="cms-list-title" className="sr-only">Articles</h2>
        <ul className="said-cards">
          {posts.map((p, i) => {
            const img = imageOf(p.coverImage, i === 0 ? 'wide' : 'card')
            return (
              <li key={p.id} className={`said-card${i === 0 ? ' said-card--feature' : ''}`}>
                {img?.url && <img className="said-card__img" src={img.url} alt={img.alt} loading="lazy" />}
                <div className="said-card__body">
                  <p className="said-card__meta">
                    <span className="said-tag">{p.category}</span>
                    <span>{[formatDate(p.publishedAt), p.readingTime].filter(Boolean).join(' · ')}</span>
                  </p>
                  <h3 className="said-card__title">
                    <Link href={`/insights/blogs/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="said-card__text">{p.excerpt}</p>
                  <span className="said-card__go"><Arrow /></span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function CaseStudyGrid({ items }: { items: CaseStudy[] }) {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="cms-list-title">
      <div className="container-site">
        <h2 id="cms-list-title" className="sr-only">Case studies</h2>
        <ul className="said-cards">
          {items.map((c) => {
            const img = imageOf(c.coverImage)
            return (
              <li key={c.id} className="said-card">
                {img?.url && <img className="said-card__img" src={img.url} alt={img.alt} loading="lazy" />}
                <div className="said-card__body">
                  <p className="said-card__meta">
                    <span className="said-tag">{c.industry}</span>
                  </p>
                  <h3 className="said-card__title">
                    <Link href={`/insights/case-studies/${c.slug}`}>{c.title}</Link>
                  </h3>
                  <p className="said-card__text">{c.summary}</p>
                  <p className="said-card__steps">Requirement · Solution · Outcome</p>
                  <span className="said-card__go"><Arrow /></span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
