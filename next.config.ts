import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Long browser cache for images/logos so repeat visits don't re-download
  // (saves Vercel bandwidth). If an asset changes, rename the file.
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  // Bosnian keeps localized /savjeti and /kontakt URLs; routes live at /tips and /contact.
  async rewrites() {
    return [
      { source: "/savjeti", destination: "/tips" },
      { source: "/savjeti/:slug", destination: "/tips/:slug" },
      { source: "/kontakt", destination: "/contact" },
    ];
  },
  // Implementation paths redirect to the public Bosnian URLs for a single canonical.
  async redirects() {
    return [
      { source: "/tips", destination: "/savjeti", permanent: true },
      { source: "/tips/:slug", destination: "/savjeti/:slug", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
    ];
  },
};

export default nextConfig;
