/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.dweb.link',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: '**.arweave.net',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'x-rayv2.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.imagedelivery.net',
      },
      {
        protocol: 'https',
        hostname: '**.neynar.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com',
      },
      {
        protocol: 'https',
        hostname: '**.warpcast.com',
      },
      {
        protocol: 'https',
        hostname: 'warpcast.com',
      },
    ],
  },
  webpack: (config) => {
    const extras = ['pino-pretty', 'lokijs', 'encoding'];
    if (Array.isArray(config.externals)) {
      config.externals.push(...extras);
    } else {
      config.externals = [...(config.externals ? [config.externals] : []), ...extras];
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/.well-known/farcaster.json',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ];
  },
};

export default nextConfig;
