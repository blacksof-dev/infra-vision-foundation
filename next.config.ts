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
  },
};
