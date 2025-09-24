import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '142.93.215.57',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
  
 