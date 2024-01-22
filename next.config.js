/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/admin',
  //       permanent: true
  //     },
  //     {
  //       source: '/admin',
  //       destination: '/admin/index',
  //       permanent: true
  //     }
  //   ];
  // },
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2']
  }
};

module.exports = nextConfig;
