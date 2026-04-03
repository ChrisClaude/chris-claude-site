/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Azurite local emulator
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/devstoreaccount1/**',
      },
    ],
  },
};

module.exports = nextConfig;
