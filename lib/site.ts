export function getSiteUrl(): string {
  // NEXT_PUBLIC_SITE_URL wins; then the stable production domain. VERCEL_URL is a
  // per-deployment host, so it is only a last resort — canonical/og:url must not
  // point at a URL that dies with the next build.
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;
  if (!configured) return "http://localhost:3000";
  return configured.startsWith("http") ? configured : `https://${configured}`;
}
