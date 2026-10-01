import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site into ./out — deployable to any static host
  // (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3) with no Node server.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export: no image-optimization server available.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "framerusercontent.com" },
    ],
  },
};

export default nextConfig;
