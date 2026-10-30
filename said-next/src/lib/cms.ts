import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { CaseStudy, Media, Post } from '@/payload-types'

// Without DATABASE_URL the site runs as a preview: pages work, CMS content falls back to the approved text.
export const cmsEnabled = () => Boolean(process.env.DATABASE_URL)

export const cms = () => getPayload({ config })

const published = { _status: { equals: 'published' as const } }

// Content pages must still render when the database is unreachable, so failures return empty results.
async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!cmsEnabled()) return fallback
  try {
    return await fn()
  } catch (err) {
    console.error(`[cms] ${label} failed:`, err instanceof Error ? err.message : err)
    return fallback
  }
}

export const listPosts = () =>
  safe('listPosts', async () => (await (await cms()).find({ collection: 'posts', where: published, sort: '-publishedAt', limit: 100, depth: 1 })).docs, [] as Post[])

export const getPost = (slug: string) =>
  safe('getPost', async () => (await (await cms()).find({ collection: 'posts', where: { and: [published, { slug: { equals: slug } }] }, limit: 1, depth: 1 })).docs[0] ?? null, null as Post | null)

export const listCaseStudies = () =>
  safe('listCaseStudies', async () => (await (await cms()).find({ collection: 'case-studies', where: published, sort: '-publishedAt', limit: 100, depth: 1 })).docs, [] as CaseStudy[])

export const getCaseStudy = (slug: string) =>
  safe('getCaseStudy', async () => (await (await cms()).find({ collection: 'case-studies', where: { and: [published, { slug: { equals: slug } }] }, limit: 1, depth: 1 })).docs[0] ?? null, null as CaseStudy | null)

export function imageOf(value: unknown, size: 'card' | 'wide' = 'card') {
  if (!value || typeof value !== 'object') return null
  const m = value as Media
  return { url: m.sizes?.[size]?.url || m.url || '', alt: m.alt || '' }
}

export const formatDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
