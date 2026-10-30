import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArticleLayout } from '@/components/site/ArticleLayout'
import { getCaseStudy, imageOf } from '@/lib/cms'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getCaseStudy((await params).slug)
  return item ? { title: { absolute: `${item.title} | SAID Technologies` }, description: item.summary } : {}
}

export default async function CaseStudyPage({ params }: Props) {
  const item = await getCaseStudy((await params).slug)
  if (!item) notFound()
  return (
    <ArticleLayout
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: 'Case Studies', href: '/insights/case-studies' }, { label: item.title }]}
      eyebrow={item.industry}
      title={item.title}
      lead={item.summary}
      meta={item.customer || undefined}
      image={imageOf(item.coverImage, 'wide')}
    >
      <h2>Requirement</h2>
      <RichText data={item.requirement} />
      <h2>Solution</h2>
      <RichText data={item.solution} />
      <h2>Outcome</h2>
      <RichText data={item.outcome} />
      <p className="said-article__back"><Link href="/insights/case-studies">← All case studies</Link></p>
    </ArticleLayout>
  )
}
