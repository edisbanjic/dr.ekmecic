"use client";

import { useId } from "react";

/** Tooth mark from the site wordmark — unique clipPath id per instance. */
function ToothMark({ size }: { size: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <clipPath id={`tcut-${id}`}>
          <path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z" />
        </clipPath>
      </defs>
      <path
        d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z"
        fill="#7EAEE8"
      />
      <path
        d="M8 66C28 80 47 71 59 50C67 36 71 21 73 4"
        stroke="#FFFFFF"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        clipPath={`url(#tcut-${id})`}
      />
    </svg>
  );
}

/** Cover image, or brand logo placeholder at the same size when the post has no image. */
export default function PostCover({
  src,
  height,
  className,
}: {
  src: string | null;
  /** Fixed height; omit when a className (e.g. related-posts-image) owns the size. */
  height?: number | string;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className={className}
        style={{
          width: "100%",
          height,
          display: "block",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: "100%",
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "linear-gradient(160deg, #EAF4FF 0%, #FFF6EE 55%, #FFEFE6 100%)",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-fredoka)",
          fontWeight: 700,
          fontSize: "clamp(18px, 3.2vw, 22px)",
          letterSpacing: ".02em",
          color: "#3D4142",
          display: "inline-flex",
          alignItems: "flex-end",
          lineHeight: 1,
        }}
      >
        DR.&nbsp;EK
        <ToothMark size={22} />
        EČIĆ
      </span>
    </div>
  );
}
