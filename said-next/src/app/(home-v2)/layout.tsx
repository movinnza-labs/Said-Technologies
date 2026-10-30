import type { ReactNode } from 'react'

import { HomeDocument } from '@/components/home/HomeDocument'

// Design 2: light hero with hub diagram (warm palette)
import '@/styles/site/theme.css'

export default function HomeV2Layout({ children }: { children: ReactNode }) {
  return <HomeDocument id="v2">{children}</HomeDocument>
}
