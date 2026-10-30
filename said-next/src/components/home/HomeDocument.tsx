import Script from 'next/script'
import type { ReactNode } from 'react'

import { getHome, type HomeId } from '@/lib/content'
import { FONTS_EDITORIAL, FONTS_IMMERSIVE, FONTS_JAKARTA, FONTS_SORA } from '@/lib/site'

const FONTS: Record<HomeId, string> = {
  v1: FONTS_JAKARTA,
  v2: FONTS_SORA,
  v3: FONTS_SORA,
  v4: FONTS_EDITORIAL,
  v5: FONTS_IMMERSIVE,
}
const SCRIPTS: Record<HomeId, string[]> = {
  v1: ['/assets/js/theme.js'],
  v2: ['/assets/js/theme.js'],
  v3: ['/assets/js/theme.js', '/assets/js/fresh.js'],
  v4: ['/assets/js/theme.js', '/assets/js/editorial.js'],
  v5: ['/assets/js/theme.js', '/assets/js/immersive.js'],
}

// <html> for a home design. Each design keeps its own class, fonts and scripts, as in the approved HTML.
// theme.js builds the menus and animations from the server-rendered markup.
export function HomeDocument({ id, children }: { id: HomeId; children: ReactNode }) {
  const home = getHome(id)
  return (
    <html lang="en-IN" data-root="/" data-section="" className={home.htmlClass} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS[id]} />
      </head>
      <body suppressHydrationWarning>
        {children}
        {SCRIPTS[id].map((src) => (
          <Script key={src} src={src} strategy="afterInteractive" />
        ))}
      </body>
    </html>
  )
}

export function HomeBody({ id }: { id: HomeId }) {
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: getHome(id).html }} />
}

export function homeMetadata(id: HomeId, canonical: string, index = true) {
  const home = getHome(id)
  return {
    title: { absolute: home.title },
    description: home.description,
    alternates: { canonical },
    robots: index ? undefined : { index: false, follow: true },
    icons: {
      icon: [
        { url: '/assets/img/favicon-32x32.jpg', sizes: '32x32' },
        { url: '/assets/img/favicon-192x192.jpg', sizes: '192x192' },
      ],
      apple: '/assets/img/favicon-180x180.jpg',
    },
  }
}
