import type { ReactNode } from 'react'

import { HomeDocument } from '@/components/home/HomeDocument'

// Design 1: logo navy + yellow, hub hero
import '@/styles/site/theme.css'
import '@/styles/site/theme-said.css'
import '@/styles/site/theme-logo.css'

export default function HomeV1Layout({ children }: { children: ReactNode }) {
  return <HomeDocument id="v1">{children}</HomeDocument>
}
