'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type MenuGroup = { label: string; href: string; links: { label: string; href: string }[] }

// Adds menu behaviour to the server-rendered header markup (it keeps the approved design):
// desktop mega menus (hover, click, Escape, outside click), shadow on scroll and the mobile menu.
export function HeaderBehaviour() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [groups, setGroups] = useState<MenuGroup[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('header.sticky')
    if (!header) return
    const toggles = Array.from(header.querySelectorAll<HTMLButtonElement>('nav button[aria-controls^="menu-"]'))
    let openBtn: HTMLButtonElement | null = null
    let hoverTimer: number | undefined

    const panelOf = (btn: HTMLButtonElement) => document.getElementById(btn.getAttribute('aria-controls') || '')
    const close = () => {
      if (!openBtn) return
      openBtn.setAttribute('aria-expanded', 'false')
      panelOf(openBtn)?.setAttribute('hidden', '')
      openBtn = null
    }
    const open = (btn: HTMLButtonElement) => {
      if (openBtn === btn) return
      close()
      btn.setAttribute('aria-expanded', 'true')
      panelOf(btn)?.removeAttribute('hidden')
      openBtn = btn
    }

    const cleanups: (() => void)[] = []
    for (const btn of toggles) {
      const li = btn.closest('li')!
      const onClick = () => (openBtn === btn ? close() : open(btn))
      const onEnter = () => {
        window.clearTimeout(hoverTimer)
        hoverTimer = window.setTimeout(() => open(btn), openBtn ? 0 : 120)
      }
      const onLeave = () => {
        window.clearTimeout(hoverTimer)
        hoverTimer = window.setTimeout(close, 180)
      }
      btn.addEventListener('click', onClick)
      li.addEventListener('mouseenter', onEnter)
      li.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        btn.removeEventListener('click', onClick)
        li.removeEventListener('mouseenter', onEnter)
        li.removeEventListener('mouseleave', onLeave)
      })
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const btn = openBtn
      close()
      btn?.focus()
      setMobileOpen(false)
    }
    const onDocClick = (e: MouseEvent) => {
      if (!header.contains(e.target as Node)) close()
    }
    const onScroll = () => {
      const scrolled = window.scrollY > 8
      header.classList.toggle('border-transparent', !scrolled)
      header.classList.toggle('border-line', scrolled)
      header.classList.toggle('shadow-sm', scrolled)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onDocClick)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Mobile menu data comes from the same markup, so desktop and mobile never drift apart.
    const readGroups = () =>
      toggles.map((btn) => {
        const top = btn.previousElementSibling as HTMLAnchorElement | null
        const links = Array.from(panelOf(btn)?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])
          .filter((a) => a.textContent?.trim())
          .map((a) => ({ label: a.textContent!.trim(), href: a.getAttribute('href')! }))
        const seen = new Set<string>()
        return {
          label: top?.textContent?.trim() || '',
          href: top?.getAttribute('href') || '/',
          links: links.filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true))),
        }
      })

    const mobileBtn = header.querySelector<HTMLButtonElement>('button[aria-controls="mobile-nav"]')
    const onMobile = () => {
      setGroups(readGroups())
      setMobileOpen((v) => !v)
    }
    mobileBtn?.addEventListener('click', onMobile)

    return () => {
      cleanups.forEach((c) => c())
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('scroll', onScroll)
      mobileBtn?.removeEventListener('click', onMobile)
      window.clearTimeout(hoverTimer)
    }
  }, [])

  useEffect(() => {
    document.querySelector('header.sticky button[aria-controls="mobile-nav"]')?.setAttribute('aria-expanded', String(mobileOpen))
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  if (!mobileOpen) return null
  return (
    <div id="mobile-nav" className="said-mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="said-mobile-nav__head">
        <Link href="/" aria-label="SAID Technologies — Home">
          <img src="/assets/img/said-logo-transparent.png" width={482} height={183} alt="SAID Technologies Pvt. Ltd." />
        </Link>
        <button type="button" className="said-mobile-nav__close" onClick={() => setMobileOpen(false)}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <ul className="said-mobile-nav__list">
        {groups.map((g, i) => (
          <li key={g.href}>
            <div className="said-mobile-nav__row">
              <Link href={g.href}>{g.label}</Link>
              {g.links.length > 0 && (
                <button
                  type="button"
                  aria-expanded={expanded === i}
                  aria-controls={`mnav-${i}`}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <span aria-hidden="true">{expanded === i ? '−' : '+'}</span>
                  <span className="sr-only">Show {g.label} links</span>
                </button>
              )}
            </div>
            {expanded === i && (
              <ul id={`mnav-${i}`} className="said-mobile-nav__sub">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <Link className="said-mobile-nav__cta" href="/contact#enquiry-form">
        Discuss Your Requirement
      </Link>
    </div>
  )
}
