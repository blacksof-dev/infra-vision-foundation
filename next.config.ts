import type { NextConfig } from "next";
 

const nextConfig = {
  images: {
    remotePatterns: [
       
      {
        protocol: 'http',
        hostname: '64.227.188.3',
        pathname: '/**',
      } ,
      {
        protocol:"http",
        hostname:"localhost",
        pathname:"/**"
      }
    ],
  },
};

export default nextConfig;
  
 