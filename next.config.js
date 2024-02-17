/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      },
      {
        source: '/dashboard',
        destination: '/dashboard/index',
        permanent: true
      }
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2']
  }
};

module.exports = nextConfig;
