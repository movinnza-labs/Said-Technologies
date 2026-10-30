import { HomeBody, homeMetadata } from '@/components/home/HomeDocument'
import { SITE_URL } from '@/lib/site'

export const metadata = { metadataBase: new URL(SITE_URL), ...homeMetadata('v4', '/design/v4', false) }

export default function HomeDesign4() {
  return <HomeBody id="v4" />
}
