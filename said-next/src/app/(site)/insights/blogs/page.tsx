import { InsightsPage, insightsMetadata } from '@/components/site/InsightsPage'
import { PostGrid } from '@/components/site/InsightCards'
import { listPosts } from '@/lib/cms'

// Reads published blogs from Payload on each request, so new posts appear immediately.
export const dynamic = 'force-dynamic'
export const metadata = insightsMetadata('/insights/blogs')

export default async function BlogsPage() {
  const posts = await listPosts()
  return <InsightsPage route="/insights/blogs" list={posts.length ? <PostGrid posts={posts} /> : null} />
}
