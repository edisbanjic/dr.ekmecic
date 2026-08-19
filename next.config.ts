import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bosnian keeps its localized /savjeti URLs; the route lives at /tips.
  async rewrites() {
    return [
      { source: "/savjeti", destination: "/tips" },
      { source: "/savjeti/:slug", destination: "/tips/:slug" },
    ];
  },
  // /tips is an implementation detail — keep /savjeti as the only public
  // Bosnian URL so search engines see a single canonical address.
  async redirects() {
    return [
      { source: "/tips", destination: "/savjeti", permanent: true },
      { source: "/tips/:slug", destination: "/savjeti/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
