/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    minimumCacheTTL: 60,
    domains: ["chwdaugcjxtyyfiqjibf.supabase.co", "raw.githubusercontent.com"],
  },
}

export default nextConfig
