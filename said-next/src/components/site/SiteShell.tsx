import type { ReactNode } from 'react'

import { getEnquiryOptions, getFooterHtml, getHeaderHtml } from '@/lib/content'

import { FormBehaviour } from './FormBehaviour'
import { HeaderBehaviour } from './HeaderBehaviour'

const Html = ({ html }: { html: string }) => <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />

// Header + page body + footer for every inner page. The markup is the approved design;
// HeaderBehaviour and FormBehaviour add the interactive parts.
export function SiteShell({ html, children }: { html?: string; children?: ReactNode }) {
  const hasForm = Boolean(html && /data-island="(EnquiryForm|CareerForm)"/.test(html))
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Html html={getHeaderHtml()} />
      <HeaderBehaviour />
      {html ? <Html html={html} /> : children}
      <Html html={getFooterHtml()} />
      {hasForm && <FormBehaviour options={getEnquiryOptions()} />}
    </>
  )
}
