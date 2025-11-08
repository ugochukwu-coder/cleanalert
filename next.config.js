/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.173.160',
        port: '5000', 
        pathname: '/uploads/**',
      },
    ],
  },
  // Optional: Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig

