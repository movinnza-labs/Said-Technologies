import { HomeBody, homeMetadata } from '@/components/home/HomeDocument'
import { SITE_URL } from '@/lib/site'

export const metadata = { metadataBase: new URL(SITE_URL), ...homeMetadata('v2', '/design/v2', false) }

export default function HomeDesign2() {
  return <HomeBody id="v2" />
}
