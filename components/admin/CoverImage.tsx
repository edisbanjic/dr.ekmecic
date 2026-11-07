"use client";

import { useState } from "react";

/** Post cover image — existing preview + pick a new file. */
export default function CoverImage({ url, alt }: { url?: string | null; alt?: string | null }) {
  const [preview, setPreview] = useState(url ?? "");

  return (
    <div className="full">
      <span>Naslovna (cover) slika</span>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Cover pregled"
          style={{
            display: "block", width: "100%", maxHeight: "240px", objectFit: "cover",
            borderRadius: "16px", marginBottom: "10px", border: "2px solid #EDE5D4",
          }}
        />
      ) : null}
      <input
        type="file"
        name="image"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => {
          const f = e.target.files?.[0];
          setPreview(f ? URL.createObjectURL(f) : url ?? "");
        }}
      />
      <p style={{ margin: "8px 0 0", fontSize: "12.5px", fontWeight: 700, opacity: 0.55 }}>
        Posebno od covera u sadržaju. JPG, PNG, WebP, GIF · do 4 MB.
        {url ? " Ostavi prazno da zadržiš postojeću." : ""}
      </p>
      <label style={{ display: "block", marginTop: "14px" }}>
        <span>Opis slike (alt tekst)</span>
        <input name="image_alt" defaultValue={alt ?? ""} placeholder="npr. Dr. Zehra pregleda zube djetetu" />
        <p style={{ margin: "6px 0 0", fontSize: "12.5px", fontWeight: 700, opacity: 0.55 }}>
          Kratko opišite šta je na slici — Google ga čita, a i slabovidni korisnici.
        </p>
      </label>
    </div>
  );
}
