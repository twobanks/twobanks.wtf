
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;