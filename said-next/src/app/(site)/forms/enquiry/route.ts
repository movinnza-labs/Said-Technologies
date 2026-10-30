import { cms, cmsEnabled } from '@/lib/cms'
import { fail, isBot, isEmail, ok, rateLimited, text } from '@/lib/forms'

export async function POST(req: Request) {
  if (!cmsEnabled()) return fail('This form is not connected yet (website preview). Please contact SAID Technologies by email or phone.', 503)
  if (rateLimited(req, 'enquiry')) return fail('Too many enquiries from this connection. Please try again later.', 429)

  const form = await req.formData().catch(() => null)
  if (!form) return fail('The form could not be read. Please try again.')
  if (isBot(form)) return ok()

  const data = {
    fullName: text(form, 'fullName', 120),
    organisation: text(form, 'organisation', 160),
    designation: text(form, 'designation', 120),
    email: text(form, 'email', 160),
    phone: text(form, 'phone', 40),
    location: text(form, 'location', 120),
    enquiryType: text(form, 'enquiryType', 20) as 'business' | 'education',
    area: text(form, 'area', 120),
    solution: text(form, 'solution', 160),
    industry: text(form, 'industry', 120),
    requirement: text(form, 'requirement', 5000),
    contactMethod: text(form, 'contactMethod', 10) as 'email' | 'phone' | 'either',
    consent: form.get('consent') !== null,
    sourcePage: (req.headers.get('referer') || '').slice(0, 300),
  }

  const missing = (['fullName', 'organisation', 'email', 'location', 'area', 'requirement'] as const).filter((k) => !data[k])
  if (missing.length) return fail('Please complete all required fields.')
  if (!isEmail(data.email)) return fail('Please enter a valid email address.')
  if (!['business', 'education'].includes(data.enquiryType)) return fail('Please choose Business or Education Solutions.')
  if (!['email', 'phone', 'either'].includes(data.contactMethod)) return fail('Please choose a preferred contact method.')
  if (!data.consent) return fail('Please agree to be contacted so the team can respond.')

  try {
    await (await cms()).create({ collection: 'enquiries', data })
    return ok()
  } catch (err) {
    console.error('[forms/enquiry]', err)
    return fail('Your enquiry could not be sent right now. Please try again or email SAID Technologies directly.', 500)
  }
}
