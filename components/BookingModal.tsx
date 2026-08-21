"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import BookingForm from "@/components/BookingFormLazy";
import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

type BookingModalContextValue = {
  open: () => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingModalProvider");
  return ctx;
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const t = getDict(useLocale().locale);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <BookingModalContext.Provider value={{ open: show, close }}>
      {children}
      {open ? (
        <div
          className="booking-modal-backdrop"
          role="presentation"
          onClick={close}
        >
          <div
            className="booking-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="booking-modal-close"
              aria-label={t.modal.close}
              onClick={close}
            >
              ×
            </button>
            <div className="booking-modal-deco booking-modal-deco-a" aria-hidden="true" />
            <div className="booking-modal-deco booking-modal-deco-b" aria-hidden="true" />
            <div className="booking-modal-card">
              <div className="booking-modal-head">
                <div className="booking-modal-label">{t.modal.label}</div>
                <h2 id="booking-modal-title" className="booking-modal-title">
                  {t.modal.titlePre}<span>{t.modal.titleHighlight}</span>
                </h2>
                <p className="booking-modal-lead">{t.modal.lead}</p>
              </div>
              <BookingForm />
            </div>
          </div>
        </div>
      ) : null}
    </BookingModalContext.Provider>
  );
}

type BookingTriggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  mobile?: boolean;
  id?: string;
};

/** Opens the booking modal on subpages. */
export function BookingTrigger({ children, className, style, mobile, id }: BookingTriggerProps) {
  const { open } = useBookingModal();
  return (
    <button
      type="button"
      id={id}
      className={className}
      style={style}
      onClick={open}
      data-mobile-cta={mobile ? "1" : undefined}
    >
      {children}
    </button>
  );
}

type BookingCtaProps = {
  home?: boolean;
  mobile?: boolean;
};

/** Header / sticky-bar CTA — scroll on home, modal elsewhere. */
export function BookingCta({ home, mobile }: BookingCtaProps) {
  const t = getDict(useLocale().locale);
  const primaryStyle: CSSProperties = mobile
    ? {
        flex: "1.3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#7EAEE8",
        color: "#243038",
        fontFamily: "var(--font-fredoka)",
        fontWeight: 600,
        fontSize: "16px",
        padding: "14px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
      }
    : {
        background: "#7EAEE8",
        color: "#243038",
        fontFamily: "var(--font-fredoka)",
        fontWeight: 600,
        fontSize: "15.5px",
        padding: "11px 22px",
        borderRadius: "999px",
        animation: "pulse 3.2s ease-out infinite",
        transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
        border: "none",
        cursor: "pointer",
      };

  if (home) {
    return (
      <a
        id={mobile ? undefined : "hdr-cta"}
        href="#booking"
        style={primaryStyle}
        className={mobile ? undefined : "hv1"}
      >
        {t.header.bookCta}
      </a>
    );
  }

  return (
    <BookingTrigger
      id={mobile ? undefined : "hdr-cta"}
      className={mobile ? undefined : "hv1"}
      style={primaryStyle}
      mobile={mobile}
    >
      {t.header.bookCta}
    </BookingTrigger>
  );
}
