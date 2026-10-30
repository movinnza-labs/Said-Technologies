import type { ReactNode } from 'react'

import { HomeDocument } from '@/components/home/HomeDocument'

// Design 4 "Editorial": ivory paper, serif display type, asymmetric magazine layouts
import '@/styles/site/theme.css'
import '@/styles/site/theme-editorial.css'

export default function HomeV4Layout({ children }: { children: ReactNode }) {
  return <HomeDocument id="v4">{children}</HomeDocument>
}
