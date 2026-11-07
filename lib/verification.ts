// Google Search Console ownership token (public — it is printed in the page <head>).
// GOOGLE_SITE_VERIFICATION in the env overrides it.
const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION || "XRFKzYeXLZI-Mxnb_Q-wYFPFrQnyXPUHRPRzc-fORHU";

export const siteVerification = { google: GOOGLE_SITE_VERIFICATION };
