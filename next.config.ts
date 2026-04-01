import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jk-dating-night",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
