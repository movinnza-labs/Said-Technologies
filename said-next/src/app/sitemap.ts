import type { MetadataRoute } from 'next'

import { getPages } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', ...getPages().map((p) => p.route).filter((r) => r !== '/404')]
  return routes.map((r) => ({ url: `${SITE_URL}${r === '/' ? '' : r}`, changeFrequency: 'monthly' }))
}
