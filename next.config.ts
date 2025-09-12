import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 🚀 allows deployment even with lint errors
  },
};

export default nextConfig;
