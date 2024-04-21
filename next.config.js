/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'localhost', //'assets.example.com',
          port: '7029',
          //pathname: '/Statistics?**',
        },
      ],
    },
  }

module.exports = nextConfig
