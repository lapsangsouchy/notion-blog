/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      's3.us-west-2.amazonaws.com',
      'images.unsplash.com',
      'www.notion.so',
    ],
  },
};

module.exports = nextConfig;
