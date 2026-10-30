import type { ReactNode } from 'react'

import { HomeDocument } from '@/components/home/HomeDocument'

// Design 3 "Nova": v2 layout in blue / cyan / purple
import '@/styles/site/theme.css'
import '@/styles/site/theme-nova.css'

export default function HomeV3Layout({ children }: { children: ReactNode }) {
  return <HomeDocument id="v3">{children}</HomeDocument>
}
