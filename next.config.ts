/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      // ... (Mantenha os da Steam e os outros do Spotify que já estavam) ...
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'media.steampowered.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '/**',
      },
      
      // --- ADICIONE ESTE NOVO AQUI ---
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      // -------------------------------
      
      // Outros domínios do Spotify que podem aparecer no futuro (Recomendado adicionar já):
      {
        protocol: 'https',
        hostname: 'image-cdn-fa.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wrapped-images.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'seed-mix-image.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'newjams-images.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;