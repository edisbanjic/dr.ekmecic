/** Cover image, or brand logo placeholder at the same size when the post has no image. */
export default function PostCover({
  src,
  alt = "",
  height,
  className,
}: {
  src: string | null;
  alt?: string;
  /** Fixed height; omit when a className (e.g. related-posts-image) owns the size. */
  height?: number | string;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
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
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8%",
        background: "linear-gradient(160deg, #EAF4FF 0%, #FFF6EE 55%, #FFEFE6 100%)",
        boxSizing: "border-box",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-full.webp"
        alt=""
        width={1060}
        height={248}
        style={{ width: "100%", maxWidth: "320px", height: "auto", display: "block" }}
      />
    </div>
  );
}
