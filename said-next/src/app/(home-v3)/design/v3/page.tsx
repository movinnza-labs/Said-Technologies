import { HomeBody, homeMetadata } from '@/components/home/HomeDocument'
import { SITE_URL } from '@/lib/site'

export const metadata = { metadataBase: new URL(SITE_URL), ...homeMetadata('v3', '/design/v3', false) }

export default function HomeDesign3() {
  return <HomeBody id="v3" />
}
