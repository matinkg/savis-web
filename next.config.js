/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
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