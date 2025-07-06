import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["https://www.belugatasks.dev", "http://localhost:3000"],
    },
  },
};

export default nextConfig;
