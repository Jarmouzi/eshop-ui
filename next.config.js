/** @type {import('next').NextConfig} */
const imageLoader = require("./lib/imageLoader");
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "localhost", //'assets.example.com',
    //     port: "7029",
    //     //pathname: '/Statistics?**',
    //   },
    // ],
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },
};

module.exports = nextConfig;
