import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.codekiwi.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;