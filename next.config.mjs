import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
