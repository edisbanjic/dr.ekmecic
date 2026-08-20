import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
