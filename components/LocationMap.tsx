"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/** Clinic — Bolnička bb, Cazin */
const LNG = 15.93211628755716;
const LAT = 44.96627043157745;
const ZOOM = 15.4;

/** Opens navigation in whatever maps app the user has. */
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

/** Google's 3D Street View embed of the clinic's street. */
const STREET_VIEW_SRC =
  "https://www.google.com/maps/embed?pb=!4v1787170258664!6m8!1m7!1soTwkXzzwj2wHJPFWdaTUXw!2m2!1d44.96623974455438!2d15.93225772888374!3f280.00696!4f0!5f0.7820865974627469";

type LocationMapProps = {
  /** `footer` = dark chrome; `page` = light contact page. */
  variant?: "footer" | "page";
};

/**
 * Interactive Mapbox GL map of the clinic location. The Mapbox library is
 * loaded dynamically on first viewport entry so it does not weigh down the
 * initial load. Without NEXT_PUBLIC_MAPBOX_TOKEN it falls back to an OSM
 * iframe, so the site still works without a key.
 */
export default function LocationMap({ variant = "footer" }: LocationMapProps) {
  const t = getDict(useLocale().locale).map;
  const onPage = variant === "page";
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<"map" | "street">("map");
  // latest copy for the imperative Mapbox popup — a locale switch must not
  // recreate the map, so the map effect reads it through this ref
  const tRef = useRef(t);
  tRef.current = t;

  // lazy: start loading only once the map is near the viewport
  useEffect(() => {
    const el = box.current;
    if (!el || !TOKEN) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !box.current || !TOKEN) return;
    const el = box.current;
    let map: import("mapbox-gl").Map | undefined;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled) return;
      mapboxgl.accessToken = TOKEN;

      map = new mapboxgl.Map({
        container: el,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [LNG, LAT],
        zoom: ZOOM,
        attributionControl: false,
        cooperativeGestures: true,
      });
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

      // marker in brand blue
      const pin = document.createElement("div");
      pin.style.cssText =
        "width:22px;height:22px;border-radius:50%;background:#7EAEE8;" +
        "border:3px solid #F5F0E8;box-shadow:0 0 0 6px rgba(126,174,232,.28);cursor:pointer";
      const popupText = tRef.current;
      pin.setAttribute("role", "img");
      pin.setAttribute("aria-label", popupText.pinAria);
      new mapboxgl.Marker({ element: pin, anchor: "center" })
        .setLngLat([LNG, LAT])
        .setPopup(
          new mapboxgl.Popup({ offset: 18, closeButton: false }).setHTML(
            '<div style="color:#3D4142;font-family:inherit;font-size:13.5px;line-height:1.5">' +
              `<strong style="font-weight:800;font-size:14.5px">${popupText.popupName}</strong><br>` +
              `${popupText.popupAddress}<br>` +
              `<a href="${DIRECTIONS}" target="_blank" rel="noopener" ` +
              'style="color:#3E5F86;font-weight:800;text-decoration:underline;text-underline-offset:3px">' +
              `${popupText.directions} →</a></div>`
          )
        )
        .addTo(map);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [visible]);

  return (
    <div className={onPage ? "map-page" : "map-footer"} style={{ flex: "1 1 300px", minWidth: onPage ? 0 : "260px", width: "100%" }}>
      <div
        style={{
          position: "relative",
          borderRadius: onPage ? "22px" : "24px",
          overflow: "hidden",
          border: onPage ? "2px solid #E8DFD0" : "4px solid rgba(245,240,232,.14)",
          lineHeight: "0",
          background: onPage ? "#FFFFFF" : "rgba(245,240,232,.06)",
        }}
      >
        <div
          role="group"
          aria-label={t.viewSwitchAria}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            zIndex: 2,
            display: "flex",
            gap: "2px",
            padding: "3px",
            borderRadius: "999px",
            background: "rgba(36,48,56,.72)",
            backdropFilter: "blur(6px)",
          }}
        >
          {(["map", "street"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              style={{
                fontFamily: "inherit",
                fontSize: "12.5px",
                fontWeight: 600,
                lineHeight: "1.4",
                padding: "6px 12px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                color: view === v ? "#243038" : "#F5F0E8",
                background: view === v ? "#7EAEE8" : "transparent",
                transition: "background .2s, color .2s",
              }}
            >
              {v === "map" ? t.viewMap : t.viewStreet}
            </button>
          ))}
        </div>

        <div style={{ width: "100%", height: onPage ? "clamp(300px,38vw,400px)" : "230px" }}>
          {TOKEN && (
            <div
              ref={box}
              aria-label={t.boxAria}
              style={{ width: "100%", height: "100%", display: view === "map" ? "block" : "none" }}
            />
          )}
          {!TOKEN && (
            <iframe
              title={t.iframeTitle}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=15.915%2C44.945%2C15.975%2C44.985&layer=mapnik&marker=${LAT}%2C${LNG}`}
              style={{ width: "100%", height: "100%", border: "0", display: view === "map" ? "block" : "none" }}
            />
          )}
          <iframe
            title={t.streetTitle}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            src={STREET_VIEW_SRC}
            style={{ width: "100%", height: "100%", border: "0", display: view === "street" ? "block" : "none" }}
          />
        </div>
      </div>
      <div style={{ fontSize: "13px", opacity: onPage ? 0.7 : 0.6, marginTop: "8px", fontWeight: onPage ? 600 : undefined }}>
        {t.addressShort} —{" "}
        <a
          href={DIRECTIONS}
          target="_blank"
          rel="noopener"
          style={{ color: onPage ? "#3E5F86" : "#F5F0E8", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          {t.directions}
        </a>
      </div>
    </div>
  );
}
