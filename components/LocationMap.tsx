"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/** Ordinacija — Bolnička bb, Cazin */
const LNG = 15.93211628755716;
const LAT = 44.96627043157745;
const ZOOM = 15.4;

/** Otvara navigaciju u aplikaciji koju korisnik ima (Maps/Google Maps). */
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

/**
 * Interaktivna Mapbox GL mapa lokacije ordinacije. Mapbox biblioteka se
 * učitava dinamički pri prvom ulasku u viewport da ne tereti initial load.
 * Bez NEXT_PUBLIC_MAPBOX_TOKEN pada na OSM iframe, pa sajt radi i bez ključa.
 */
export default function LocationMap() {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // lazy: kreni s učitavanjem tek kad je mapa blizu ekrana
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

      // marker u brend plavoj
      const pin = document.createElement("div");
      pin.style.cssText =
        "width:22px;height:22px;border-radius:50%;background:#7EAEE8;" +
        "border:3px solid #F5F0E8;box-shadow:0 0 0 6px rgba(126,174,232,.28);cursor:pointer";
      pin.setAttribute("role", "img");
      pin.setAttribute("aria-label", "Ordinacija — Bolnička bb, Cazin");
      const marker = new mapboxgl.Marker({ element: pin, anchor: "center" })
        .setLngLat([LNG, LAT])
        .setPopup(
          new mapboxgl.Popup({ offset: 18, closeButton: false }).setHTML(
            '<div style="color:#3D4142;font-family:inherit;font-size:13.5px;line-height:1.5">' +
              '<strong style="font-weight:800;font-size:14.5px">Dr. Ekmečić</strong><br>' +
              "Bolnička bb, Cazin<br>" +
              `<a href="${DIRECTIONS}" target="_blank" rel="noopener" ` +
              'style="color:#3E5F86;font-weight:800;text-decoration:underline;text-underline-offset:3px">' +
              "otvori navigaciju →</a></div>"
          )
        )
        .addTo(map);
      // popup otvoren odmah, da se adresa i navigacija vide bez klika
      marker.togglePopup();
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [visible]);

  return (
    <div className="mapa-footer" style={{ flex: "1 1 300px", minWidth: "260px" }}>
      <div
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          border: "4px solid rgba(245,240,232,.14)",
          lineHeight: "0",
          background: "rgba(245,240,232,.06)",
        }}
      >
        {TOKEN ? (
          <div ref={box} style={{ width: "100%", height: "230px" }} aria-label="Mapa — lokacija ordinacije u Cazinu" />
        ) : (
          <iframe
            title="Mapa — Cazin"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=15.915%2C44.945%2C15.975%2C44.985&layer=mapnik&marker=${LAT}%2C${LNG}`}
            style={{ width: "100%", height: "230px", border: "0" }}
          />
        )}
      </div>
      <div style={{ fontSize: "13px", opacity: ".6", marginTop: "8px" }}>
        Bolnička bb, Cazin —{" "}
        <a
          href={DIRECTIONS}
          target="_blank"
          rel="noopener"
          style={{ color: "#F5F0E8", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          otvori navigaciju
        </a>
      </div>
    </div>
  );
}
