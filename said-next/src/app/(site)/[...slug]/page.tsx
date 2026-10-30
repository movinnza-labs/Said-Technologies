import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SiteShell } from '@/components/site/SiteShell'
import { getPage, getPages, stripDemoNotices } from '@/lib/content'
import { CMS_ROUTES } from '@/lib/site'

type Props = { params: Promise<{ slug: string[] }> }

const routeOf = (slug: string[]) => '/' + slug.map(decodeURIComponent).join('/')

// Every approved inner page is pre-rendered at build time.
export function generateStaticParams() {
  return getPages()
    .filter((p) => p.route !== '/404' && !CMS_ROUTES.includes(p.route))
    .map((p) => ({ slug: p.route.slice(1).split('/') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage(routeOf((await params).slug))
  if (!page) return {}
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.route },
    openGraph: { title: page.title, description: page.description, type: 'website', url: page.route },
  }
}

export default async function InnerPage({ params }: Props) {
  const route = routeOf((await params).slug)
  const page = route === '/404' ? null : getPage(route)
  if (!page) notFound()
  return <SiteShell html={stripDemoNotices(page.html)} />
}
