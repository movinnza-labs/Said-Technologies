export const SITE_NAME = 'SAID Technologies Pvt. Ltd.'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

// Same Google Fonts requests as the approved static pages.
export const FONTS_JAKARTA =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap'
export const FONTS_SORA =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap'

// Routes rendered from Payload rather than from the imported static content.
export const CMS_ROUTES = ['/insights/blogs', '/insights/case-studies']
export const FONTS_EDITORIAL =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap'
export const FONTS_IMMERSIVE =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap'
