import type { MetadataRoute } from "next";
import { getDict } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  const t = getDict("bs");
  return {
    name: t.meta.home.title,
    short_name: t.meta.siteName,
    description: t.meta.home.description,
    start_url: "/",
    display: "browser",
    background_color: "#F5F0E8",
    theme_color: "#F5F0E8",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
