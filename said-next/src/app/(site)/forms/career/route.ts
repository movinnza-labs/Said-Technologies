import { cms } from '@/lib/cms'
import { fail, isBot, isEmail, ok, rateLimited, text } from '@/lib/forms'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED = new Map([
  ['application/pdf', '.pdf'],
  ['application/msword', '.doc'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.docx'],
])

export async function POST(req: Request) {
  if (rateLimited(req, 'career', 3)) return fail('Too many applications from this connection. Please try again later.', 429)

  const form = await req.formData().catch(() => null)
  if (!form) return fail('The form could not be read. Please try again.')
  if (isBot(form)) return ok()

  const data = {
    fullName: text(form, 'fullName', 120),
    email: text(form, 'email', 160),
    phone: text(form, 'phone', 40),
    location: text(form, 'location', 120),
    role: text(form, 'role', 160),
    experience: text(form, 'experience', 60),
    message: text(form, 'message', 3000),
  }
  const missing = (['fullName', 'email', 'phone', 'location', 'role', 'experience'] as const).filter((k) => !data[k])
  if (missing.length) return fail('Please complete all required fields.')
  if (!isEmail(data.email)) return fail('Please enter a valid email address.')

  const file = form.get('resume')
  if (!(file instanceof File) || file.size === 0) return fail('Please attach your resume.')
  if (file.size > MAX_BYTES) return fail('The resume must be 5 MB or smaller.')
  const ext = ALLOWED.get(file.type)
  if (!ext) return fail('Please attach the resume as a PDF or Word document.')

  try {
    const payload = await cms()
    const safeName = `${data.fullName.replace(/[^a-z0-9]+/gi, '-').slice(0, 60) || 'resume'}-${Date.now()}${ext}`
    const resume = await payload.create({
      collection: 'resumes',
      data: {},
      file: { data: Buffer.from(await file.arrayBuffer()), mimetype: file.type, name: safeName, size: file.size },
    })
    await payload.create({ collection: 'career-applications', data: { ...data, resume: resume.id } })
    return ok()
  } catch (err) {
    console.error('[forms/career]', err)
    return fail('Your profile could not be sent right now. Please try again later.', 500)
  }
}
