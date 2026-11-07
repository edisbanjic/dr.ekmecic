// Generates public/assets/og-image.jpg — the 1200×630 card shown when the site
// is shared (Facebook, Viber, WhatsApp…). Text comes from locales/bs.json, so
// re-run `npm run og` after changing the copy (e.g. years of experience).
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const W = 1200;
const H = 630;
const PHONE = "037 514 771";
const COLORS = { bg: "#F5F0E8", ink: "#3D4142", blue: "#7EAEE8", peach: "#F4C7B5", mist: "#E3E6EA" };

const bs = JSON.parse(await readFile("locales/bs.json", "utf8"));
const tagline = `Moderna oprema, nježan pristup i ${bs.hero.badgeYears} — Cazin`;

async function googleFont(family, weight) {
  // Without a browser User-Agent, Google Fonts serves TTF (satori can't read woff2).
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`)
  ).text();
  const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`No TTF for ${family} ${weight}`);
  return (await fetch(url)).arrayBuffer();
}

const dataUri = (buf, mime) => `data:${mime};base64,${Buffer.from(buf).toString("base64")}`;

const logo = dataUri(await readFile("public/assets/brand-logo-full.png"), "image/png");
// Square crop around the face of the portrait (webp → jpeg: satori can't decode webp).
const photo = dataUri(
  await sharp("public/assets/team-kamala-5.webp")
    .extract({ left: 40, top: 0, width: 720, height: 720 })
    .resize(520)
    .jpeg({ quality: 90 })
    .toBuffer(),
  "image/jpeg",
);

const sparkle = (color) =>
  dataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${color}" d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0z"/></svg>`,
    "image/svg+xml",
  );
const phoneIcon = dataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${COLORS.ink}" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>`,
  "image/svg+xml",
);

const el = (type, style, children, extra = {}) => ({ type, props: { style, children, ...extra } });
const abs = (style) => ({ position: "absolute", display: "flex", ...style });

const card = el(
  "div",
  { width: W, height: H, display: "flex", position: "relative", background: COLORS.bg, fontFamily: "Nunito" },
  [
    // background blobs
    el("div", abs({ left: -160, top: -260, width: 620, height: 620, borderRadius: 9999, background: COLORS.mist })),
    el("div", abs({ left: 380, top: 420, width: 420, height: 420, borderRadius: 9999, background: "#F8E3D8" })),
    // photo in a peach ring
    el(
      "div",
      abs({
        right: 50, top: 65, width: 500, height: 500, borderRadius: 9999,
        background: COLORS.peach, alignItems: "center", justifyContent: "center",
      }),
      [el("img", { width: 452, height: 452, borderRadius: 9999, objectFit: "cover" }, undefined, { src: photo, width: 452, height: 452 })],
    ),
    el("img", abs({ right: 40, top: 50, width: 34, height: 34 }), undefined, { src: sparkle("#F0A58A"), width: 34, height: 34 }),
    el("img", abs({ left: 640, top: 505, width: 28, height: 28 }), undefined, { src: sparkle(COLORS.blue), width: 28, height: 28 }),
    // text column
    el("div", abs({ left: 80, top: 0, bottom: 0, width: 520, flexDirection: "column", justifyContent: "center" }), [
      el("img", { width: 520, height: 133 }, undefined, { src: logo, width: 520, height: 133 }),
      el("div", { display: "flex", marginTop: 34, fontSize: 32, fontWeight: 800, lineHeight: 1.3, color: COLORS.ink }, tagline),
      el(
        "div",
        {
          display: "flex", alignItems: "center", alignSelf: "flex-start", marginTop: 40,
          padding: "20px 40px", borderRadius: 9999, background: COLORS.blue,
          fontSize: 34, fontWeight: 800, color: COLORS.ink,
        },
        [
          el("img", { width: 32, height: 32, marginRight: 16 }, undefined, { src: phoneIcon, width: 32, height: 32 }),
          el("div", { display: "flex" }, PHONE),
        ],
      ),
    ]),
  ],
);

const res = new ImageResponse(card, {
  width: W,
  height: H,
  fonts: [
    { name: "Nunito", data: await googleFont("Nunito", 700), weight: 700, style: "normal" },
    { name: "Nunito", data: await googleFont("Nunito", 800), weight: 800, style: "normal" },
  ],
});
const png = Buffer.from(await res.arrayBuffer());
const jpg = await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
await writeFile("public/assets/og-image.jpg", jpg);
console.log(`og-image.jpg written (${Math.round(jpg.length / 1024)} KB)`);
