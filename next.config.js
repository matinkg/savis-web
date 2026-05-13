/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  reactStrictMode: false,
  output: "standalone",
  images: {
    domains: ["127.0.0.1", "localhost", "194.5.192.110"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "194.5.192.110",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "p.rexogpt.ir",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
