"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

type PostShareProps = {
  title: string;
  summary?: string | null;
  url: string;
};

function IconButton({
  label,
  onClick,
  href,
  children,
  active,
}: {
  label: string;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    border: active ? "2px solid #7EAEE8" : "1px solid rgba(61,65,66,.12)",
    background: active ? "#E7F0FB" : "rgba(255,255,255,.85)",
    color: "#3D4142",
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform .25s ease, background .25s ease, border-color .25s ease",
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} style={style} className="hv8">
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} style={style} className="hv8">
      {children}
    </button>
  );
}

const iconProps = { width: 18, height: 18, "aria-hidden": true as const };

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...iconProps}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...iconProps}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#3E6B4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...iconProps}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#1877F2" {...iconProps}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#25D366" {...iconProps}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...iconProps}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...iconProps}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function PostShare({ title, summary, url }: PostShareProps) {
  const t = getDict(useLocale().locale).share;
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const text = summary ? `${title} — ${summary}` : title;

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, text, url });
    } catch {}
  };

  return (
    <div
      style={{
        marginTop: "20px",
        paddingTop: "14px",
        borderTop: "1px solid rgba(61,65,66,.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "#A98374",
            opacity: 0.85,
            marginRight: "2px",
          }}
        >
          {t.label}
        </div>
        {canNativeShare ? (
          <IconButton label={t.native} onClick={nativeShare}>
            <ShareIcon />
          </IconButton>
        ) : null}
        <IconButton label={copied ? t.copied : t.copy} onClick={copyLink} active={copied}>
          {copied ? <CheckIcon /> : <LinkIcon />}
        </IconButton>
        <IconButton
          label={t.facebook}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          label={t.whatsapp}
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton
          label={t.x}
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        >
          <XIcon />
        </IconButton>
        <IconButton
          label={t.email}
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`}
        >
          <EmailIcon />
        </IconButton>
      </div>
    </div>
  );
}
