import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Old static addresses (…/index.html, /said-html/…, index-v1.html) keep working.
  async redirects() {
    return [
      { source: '/said-html', destination: '/', permanent: true },
      { source: '/said-html/:path*', destination: '/:path*', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index-v1.html', destination: '/', permanent: true },
      { source: '/index-v2.html', destination: '/design/v2', permanent: true },
      { source: '/index-v3.html', destination: '/design/v3', permanent: true },
      { source: '/:path*/index.html', destination: '/:path*', permanent: true },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
