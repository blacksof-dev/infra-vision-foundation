import type { NextConfig } from "next";
import { hostname } from "os";
 

const nextConfig = {
  images: {
    remotePatterns: [
       {
        protocol:"https",
        hostname:"api.theinfravisionfoundation.org",
        pathname:"/**"
       },
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
  
 