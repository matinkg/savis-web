/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: '127.0.0.1'
      },
      {
        protocol: "https",
        hostname: '127.0.0.1'
      },
      {
        protocol: "https",
        hostname: process.env.IMAGE_ALLOWED_DOMAIN || "**",
      },
      {
        protocol: "http",
        hostname: process.env.IMAGE_ALLOWED_DOMAIN || "**",
      },
    ],
  },
};

module.exports = nextConfig;