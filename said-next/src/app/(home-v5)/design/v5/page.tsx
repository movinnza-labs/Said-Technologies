import { HomeBody, homeMetadata } from '@/components/home/HomeDocument'
import { SITE_URL } from '@/lib/site'

export const metadata = { metadataBase: new URL(SITE_URL), ...homeMetadata('v5', '/design/v5', false) }

export default function HomeDesign5() {
  return <HomeBody id="v5" />
}
