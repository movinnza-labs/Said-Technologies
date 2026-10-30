import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArticleLayout } from '@/components/site/ArticleLayout'
import { formatDate, getPost, imageOf } from '@/lib/cms'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  return post ? { title: { absolute: `${post.title} | SAID Technologies` }, description: post.excerpt } : {}
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  return (
    <ArticleLayout
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: 'Blogs', href: '/insights/blogs' }, { label: post.title }]}
      eyebrow={post.category}
      title={post.title}
      lead={post.excerpt}
      meta={[formatDate(post.publishedAt), post.readingTime].filter(Boolean).join(' · ')}
      image={imageOf(post.coverImage, 'wide')}
    >
      <RichText data={post.content} />
      <p className="said-article__back"><Link href="/insights/blogs">← All blogs</Link></p>
    </ArticleLayout>
  )
}
