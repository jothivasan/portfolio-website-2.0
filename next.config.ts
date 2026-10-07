import type { NextConfig } from "next";

const config: NextConfig = {
  images: { qualities: [75, 100] },
  async redirects() {
    return [
      { source: "/contact/index.html", destination: "/contact", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default config;
