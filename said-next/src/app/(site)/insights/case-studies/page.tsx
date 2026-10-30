import { CaseStudyGrid } from '@/components/site/InsightCards'
import { InsightsPage, insightsMetadata } from '@/components/site/InsightsPage'
import { listCaseStudies } from '@/lib/cms'

export const dynamic = 'force-dynamic'
export const metadata = insightsMetadata('/insights/case-studies')

export default async function CaseStudiesPage() {
  const items = await listCaseStudies()
  return <InsightsPage route="/insights/case-studies" list={items.length ? <CaseStudyGrid items={items} /> : null} />
}
