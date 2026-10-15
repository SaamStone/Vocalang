import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/login", destination: "/", permanent: false },
      { source: "/register", destination: "/", permanent: false },
      { source: "/forgot-password", destination: "/", permanent: false },
      { source: "/verify", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
