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
  env: {
    mapbox_key:
      "pk.eyJ1IjoiZGFyc2hhbmRhcnNodSIsImEiOiJjbGZtNGEzbWswN2wzM3dtbWdmNWoydmR2In0.hjk5vAGCBh-GBgGeiSneBA",
  },
};
