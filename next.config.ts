import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tools.naquinity.web.id",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn-1.naquinity.web.id",
      },
      {
        protocol: "https",
        hostname: "uwgdsfmjqduehcdcqgle.supabase.co",
      },
    ],
  },
};

export default nextConfig;
