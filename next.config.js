/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "assets.myntassets.com",
      "localhost",
      "cladethon-hosted-service.vercel.app",
    ],
  },
};
