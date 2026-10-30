import { SiteShell } from '@/components/site/SiteShell'
import { getPage } from '@/lib/content'

// Uses the approved 404 page from the static site.
export default function NotFound() {
  const page = getPage('/404')
  return page ? <SiteShell html={page.html} /> : <SiteShell><main id="main"><p>Page not found.</p></main></SiteShell>
}
