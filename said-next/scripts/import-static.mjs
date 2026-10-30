// Converts the approved static site (../said-html) into content the Next.js app renders.
// Run: npm run import:static
//
// Output (all generated, safe to delete and re-run):
//   content/pages/manifest.json       one entry per inner page (route, title, description, file)
//   content/pages/*.html              the <main> of each inner page, links rewritten to clean URLs
//   content/partials/header.html      shared header markup (inner pages)
//   content/partials/footer.html      shared footer markup (inner pages)
//   content/home/v1.html|v2|v3        <body> of each home design, links rewritten
//   content/home/manifest.json        per design: <html> class, title, description
//   public/assets/img, public/assets/js
//
// Content is copied as-is. Only URLs change: relative links become clean absolute routes
// (/what-we-do/cloud-solutions) and assets become /assets/... .

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const appRoot = path.resolve(here, '..')
const src = path.resolve(appRoot, process.env.STATIC_SITE_DIR || '../said-html')
const out = path.join(appRoot, 'content')

const HOME_FILES = { 'index-v1.html': 'v1', 'index-v2.html': 'v2', 'index-v3.html': 'v3' }
const HOME_ROUTES = { v1: '/', v2: '/design/v2', v3: '/design/v3' }

if (!fs.existsSync(src)) {
  console.error(`Static site not found at ${src}`)
  process.exit(1)
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name)
    if (d.isDirectory()) return d.name === 'assets' ? [] : walk(p)
    return d.name.endsWith('.html') ? [p] : []
  })

// "../../what-we-do/index.html?x=1#y" seen from fileDir  ->  "/what-we-do?x=1#y"
function cleanUrl(raw, fileDir) {
  if (!raw || /^(https?:|mailto:|tel:|#|data:|javascript:|\/\/)/i.test(raw)) return raw
  const m = raw.match(/^([^?#]*)(.*)$/)
  const pathPart = m[1]
  const rest = m[2]
  if (!pathPart) return raw
  const abs = path.posix.normalize(
    path.posix.join('/', path.relative(src, fileDir).split(path.sep).join('/'), pathPart),
  )
  const base = path.posix.basename(abs)
  if (HOME_FILES[base] && path.posix.dirname(abs) === '/') return HOME_ROUTES[HOME_FILES[base]] + rest
  if (abs.startsWith('/assets/')) return abs + rest
  let route = abs.replace(/\/index\.html$/, '').replace(/\.html$/, '')
  if (route === '' || route === '/index') route = '/'
  return route + rest
}

const rewrite = (html, fileDir) =>
  html.replace(/\b(href|src|poster)="([^"]*)"/g, (_, attr, url) => `${attr}="${cleanUrl(url, fileDir)}"`)

const pick = (html, re) => (html.match(re) || [])[1] || ''
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')

// Home designs built directly in Next.js (not in the static site) survive a re-import.
const KEEP_HOMES = ['v4', 'v5']
const keptHomes = {}
for (const id of KEEP_HOMES) {
  const file = path.join(out, 'home', `${id}.html`)
  if (!fs.existsSync(file)) continue
  const manifest = JSON.parse(fs.readFileSync(path.join(out, 'home', 'manifest.json'), 'utf8'))
  keptHomes[id] = { html: fs.readFileSync(file, 'utf8'), meta: manifest[id] }
}

fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(path.join(out, 'pages'), { recursive: true })
fs.mkdirSync(path.join(out, 'partials'), { recursive: true })
fs.mkdirSync(path.join(out, 'home'), { recursive: true })

const pages = []
const homes = {}
let header = ''
let footer = ''

for (const file of walk(src)) {
  const rel = path.relative(src, file).split(path.sep).join('/')
  const fileDir = path.dirname(file)
  const html = fs.readFileSync(file, 'utf8')
  const meta = {
    title: decode(pick(html, /<title>([\s\S]*?)<\/title>/)),
    description: decode(pick(html, /<meta name="description" content="([^"]*)"/)),
  }

  // Home designs: keep the whole body, scripts are added by the Next.js layout.
  if (HOME_FILES[rel]) {
    const id = HOME_FILES[rel]
    const htmlClass = pick(html, /<html[^>]*class="([^"]*)"/)
    let body = pick(html, /<body[^>]*>([\s\S]*?)<\/body>/)
    body = body.replace(/<script\b[^>]*src=[^>]*><\/script>\s*/g, '')
    fs.writeFileSync(path.join(out, 'home', `${id}.html`), rewrite(body, fileDir))
    homes[id] = { ...meta, htmlClass, route: HOME_ROUTES[id] }
    continue
  }
  if (rel === 'index.html') continue // redirect stub to index-v1

  const main = pick(html, /(<main[\s\S]*<\/main>)/)
  if (!main) continue

  const route = rel === '404.html' ? '/404' : '/' + rel.replace(/\/?index\.html$/, '').replace(/\.html$/, '')
  const fileName = (route === '/' ? 'root' : route.slice(1).replace(/\//g, '__')) + '.html'
  fs.writeFileSync(path.join(out, 'pages', fileName), rewrite(main, fileDir))
  pages.push({ route, file: fileName, ...meta })
}

// Shared header/footer come from a root-level page so their relative links resolve from the site root.
const rootPage = walk(src).find((f) => path.dirname(f) === src && f.endsWith('404.html'))
if (rootPage) {
  const html = fs.readFileSync(rootPage, 'utf8')
  header = rewrite(pick(html, /(<header[\s\S]*?<\/header>)/), src)
  footer = rewrite(pick(html, /(<footer[\s\S]*?<\/footer>)/), src)
}

pages.sort((a, b) => a.route.localeCompare(b.route))
fs.writeFileSync(path.join(out, 'pages', 'manifest.json'), JSON.stringify(pages, null, 2))
for (const [id, kept] of Object.entries(keptHomes)) {
  fs.writeFileSync(path.join(out, 'home', `${id}.html`), kept.html)
  homes[id] = kept.meta
}
fs.writeFileSync(path.join(out, 'home', 'manifest.json'), JSON.stringify(homes, null, 2))
fs.writeFileSync(path.join(out, 'partials', 'header.html'), header)
fs.writeFileSync(path.join(out, 'partials', 'footer.html'), footer)

// Assets: images and the vanilla scripts the designs use. CSS lives in src/styles (imported by layouts).
const pub = path.join(appRoot, 'public', 'assets')
fs.mkdirSync(path.join(pub, 'js'), { recursive: true })
fs.cpSync(path.join(src, 'assets', 'img'), path.join(pub, 'img'), { recursive: true })
for (const js of ['theme.js', 'fresh.js', 'site-said.js']) {
  const p = path.join(src, 'assets', js)
  if (!fs.existsSync(p)) continue
  let code = fs.readFileSync(p, 'utf8')
  // menu links: "what-we-do/index.html" -> "/what-we-do" (clean Next.js routes)
  const cleanUrlFn = String.raw`var url = function (p) { return root + p.replace(/(^|\/)index\.html(?=$|[?#])/, "$1").replace(/\/(?=$|[?#])/, ""); };`
  code = code.replace('var url = function (p) { return root + p; };', () => cleanUrlFn)
  fs.writeFileSync(path.join(pub, 'js', js), code)
}
const stylesDir = path.join(appRoot, 'src', 'styles', 'site')
fs.mkdirSync(stylesDir, { recursive: true })
for (const css of fs.readdirSync(path.join(src, 'assets')).filter((f) => f.endsWith('.css'))) {
  fs.copyFileSync(path.join(src, 'assets', css), path.join(stylesDir, css))
}

console.log(`Imported ${pages.length} inner pages, ${Object.keys(homes).length} home designs from ${src}`)
