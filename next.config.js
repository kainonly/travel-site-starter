/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true
      },
      {
        source: '/admin',
        destination: '/admin/index',
        permanent: true
      }
    ];
  },
  experimental: {
    serverComponentsExternalPackages: []
  }
};

module.exports = nextConfig;
