/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
}

module.exports = {
  optimizeFonts: false,
  head: {
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/segycom.png',
      },
    ],
  },
}

module.exports = nextConfig
