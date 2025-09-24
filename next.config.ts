<<<<<<< HEAD
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "142.93.215.57",
        port: "4000",
        pathname: "/**",
      },
    ],
=======
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   turbo: false, // turn off Turbopack
  // },
  images: {
    domains: ["142.93.215.57"],
>>>>>>> 220ebb1993f67443f659b5661a6320e7d44aeab1
  },
};
