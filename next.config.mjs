/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
      },
    ],
    qualities: [75, 90],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: 'https://github.com/priyanshuwq/portfolio/blob/main/privacy.md',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
