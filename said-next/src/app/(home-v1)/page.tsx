import { HomeBody, homeMetadata } from '@/components/home/HomeDocument'
import { SITE_URL } from '@/lib/site'

export const metadata = { metadataBase: new URL(SITE_URL), ...homeMetadata('v1', '/') }

export default function HomePage() {
  return <HomeBody id="v1" />
}
