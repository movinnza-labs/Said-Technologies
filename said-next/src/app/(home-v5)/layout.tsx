import type { ReactNode } from 'react'

import { HomeDocument } from '@/components/home/HomeDocument'

// Design 5 "Immersive": dark, live network hero, glass panels and glow
import '@/styles/site/theme.css'
import '@/styles/site/theme-immersive.css'

export default function HomeV5Layout({ children }: { children: ReactNode }) {
  return <HomeDocument id="v5">{children}</HomeDocument>
}
