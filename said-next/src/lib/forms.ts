import 'server-only'

import { NextResponse } from 'next/server'

// Small per-IP limit so a script cannot flood the inbox (resets when the server restarts).
const hits = new Map<string, number[]>()
export function rateLimited(req: Request, bucket: string, max = 5, windowMs = 10 * 60 * 1000) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const key = `${bucket}:${ip}`
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > max
}

export const text = (form: FormData, name: string, max = 500) => String(form.get(name) ?? '').trim().slice(0, max)
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export const fail = (error: string, status = 400) => NextResponse.json({ error }, { status })
export const ok = () => NextResponse.json({ ok: true })

// Bots fill the hidden "website" field; real visitors never see it.
export const isBot = (form: FormData) => text(form, 'website') !== ''
