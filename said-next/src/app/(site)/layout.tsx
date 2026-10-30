import type { Metadata } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'

import { FONTS_JAKARTA, SITE_NAME, SITE_URL } from '@/lib/site'

// Stylesheets stay separate files, in the same order as the approved static pages.
import '@/styles/site/site.css'
import '@/styles/site/site-said.css'
import '@/styles/cms.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  icons: {
    icon: [
      { url: '/assets/img/favicon-32x32.jpg', sizes: '32x32' },
      { url: '/assets/img/favicon-192x192.jpg', sizes: '192x192' },
    ],
    apple: '/assets/img/favicon-180x180.jpg',
  },
}

const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Enterprise technology and educational solutions, planned around people, systems and practical requirements.',
  slogan: 'Services, Automation & Integrations Delivered',
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS_JAKARTA} />
        <meta name="theme-color" content="#0b1d3a" />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }} />
        {/* scroll reveal used by the inner pages */}
        <Script src="/assets/js/site-said.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
