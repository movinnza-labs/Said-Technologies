'use client'

import { useEffect } from 'react'

import type { EnquiryOptions, Option } from '@/lib/content'

const fill = (select: HTMLSelectElement, placeholder: string, options: Option[]) => {
  select.innerHTML = ''
  select.append(new Option(placeholder, ''))
  for (const o of options) select.append(new Option(o.label, o.value))
  select.disabled = options.length === 0
}

function showStatus(form: HTMLFormElement, kind: 'ok' | 'error', text: string) {
  let box = form.querySelector<HTMLElement>('.said-form-status')
  if (!box) {
    box = document.createElement('p')
    box.className = 'said-form-status'
    box.setAttribute('role', 'status')
    box.setAttribute('aria-live', 'polite')
    form.append(box)
  }
  box.dataset.kind = kind
  box.textContent = text
}

async function send(form: HTMLFormElement, endpoint: string, okText: string) {
  if (!form.reportValidity()) return
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const label = button?.textContent
  if (button) {
    button.disabled = true
    button.textContent = 'Sending…'
  }
  try {
    const res = await fetch(endpoint, { method: 'POST', body: new FormData(form) })
    const data = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
    form.reset()
    form.dispatchEvent(new Event('change'))
    showStatus(form, 'ok', okText)
  } catch (err) {
    showStatus(form, 'error', err instanceof Error ? err.message : 'Something went wrong. Please try again.')
  } finally {
    if (button) {
      button.disabled = false
      button.textContent = label ?? 'Submit'
    }
  }
}

// Makes the server-rendered enquiry and career forms (approved markup and design) work for real.
export function FormBehaviour({ options }: { options: EnquiryOptions }) {
  useEffect(() => {
    const cleanups: (() => void)[] = []

    const enquiry = document.querySelector<HTMLFormElement>('[data-island="EnquiryForm"] form')
    if (enquiry) {
      const area = enquiry.querySelector<HTMLSelectElement>('select[name="area"]')
      const solution = enquiry.querySelector<HTMLSelectElement>('select[name="solution"]')
      const industry = enquiry.querySelector<HTMLSelectElement>('select[name="industry"]')
      const typeOf = () =>
        (enquiry.querySelector<HTMLInputElement>('input[name="enquiryType"]:checked')?.value ?? '') as
          | 'business'
          | 'education'
          | ''
      const areasFor = () => (typeOf() ? options[typeOf() as 'business' | 'education'] : [])

      const syncAreas = () => {
        if (!area || !solution) return
        const areas = areasFor()
        fill(area, typeOf() ? 'Select an area' : 'Choose a solution type first', areas)
        fill(solution, 'Choose an area first', [])
      }
      const syncSolutions = () => {
        if (!area || !solution) return
        const chosen = areasFor().find((a) => a.value === area.value)
        fill(solution, chosen ? 'Select a service (optional)' : 'Choose an area first', chosen?.solutions ?? [])
      }
      if (industry && industry.options.length <= 1) fill(industry, 'Select your industry', options.industries)

      // Prefill from links such as /contact?type=business&area=cloud-solutions&solution=…#enquiry-form
      const q = new URLSearchParams(window.location.search)
      const type = q.get('type')
      const radio = type ? enquiry.querySelector<HTMLInputElement>(`input[name="enquiryType"][value="${CSS.escape(type)}"]`) : null
      if (radio) radio.checked = true
      syncAreas()
      if (area && q.get('area')) {
        area.value = q.get('area')!
        syncSolutions()
        if (solution && q.get('solution')) solution.value = q.get('solution')!
      }

      const onChange = (e: Event) => {
        const t = e.target as HTMLElement
        if (t.matches?.('input[name="enquiryType"]')) syncAreas()
        if (t === area) syncSolutions()
        if (e.target === enquiry) syncAreas()
      }
      const onSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        void send(enquiry, '/forms/enquiry', 'Thank you. Your enquiry has been sent to SAID Technologies, and the team will contact you.')
      }
      enquiry.addEventListener('change', onChange)
      enquiry.addEventListener('submit', onSubmit)
      cleanups.push(() => {
        enquiry.removeEventListener('change', onChange)
        enquiry.removeEventListener('submit', onSubmit)
      })
    }

    const career = document.querySelector<HTMLFormElement>('[data-island="CareerForm"] form')
    if (career) {
      career.setAttribute('enctype', 'multipart/form-data')
      const onSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        void send(career, '/forms/career', 'Thank you. Your profile has been shared with the SAID Technologies team.')
      }
      career.addEventListener('submit', onSubmit)
      cleanups.push(() => career.removeEventListener('submit', onSubmit))
    }

    return () => cleanups.forEach((c) => c())
  }, [options])

  return null
}
