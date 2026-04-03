import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.redclass.redberryinternship.ge",
        pathname: "/storage/courses/**",
      },
    ],
  },
};

export default nextConfig;
