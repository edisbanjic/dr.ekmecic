"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookingCta } from "@/components/BookingModal";
import { useLocale } from "@/components/LocaleProvider";
import { contactPath, getDict, homeAnchor, homePath, tipsPath } from "@/lib/i18n";

const SECTIONS = ["services", "hours"] as const;
type NavId = (typeof SECTIONS)[number] | "tips" | "contact";

function isTipsPath(pathname: string) {
  return /(^|\/)(savjeti|tips)(\/|$)/.test(pathname);
}

function isContactPath(pathname: string) {
  return /(^|\/)(kontakt|contact)(\/|$)/.test(pathname);
}

/** Fixed header + mobile sticky bar — same on landing and subpages. */
export default function SiteHeader({ home = false }: { home?: boolean }) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const t = getDict(locale);
  const to = (id: string) => homeAnchor(locale, id, home);
  const onTips = isTipsPath(pathname);
  const onContact = isContactPath(pathname);
  const [active, setActive] = useState<NavId | null>(
    onContact ? "contact" : onTips ? "tips" : null,
  );

  useEffect(() => {
    if (onContact) {
      setActive("contact");
      return;
    }
    if (onTips) {
      setActive("tips");
      return;
    }
    if (!home) {
      setActive(null);
      return;
    }

    const syncFromScroll = () => {
      const marker = 130;
      let current: NavId | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };

    const syncFromHash = () => {
      const id = window.location.hash.slice(1);
      if ((SECTIONS as readonly string[]).includes(id)) setActive(id as NavId);
      else syncFromScroll();
    };

    syncFromHash();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [home, onTips, onContact]);

  const navClass = (id: NavId) => (active === id ? "nav-active" : undefined);

  return (
    <>
      <header id="hdr" data-solid={home ? undefined : "1"} style={{position:"fixed",top:"0",left:"0",right:"0",zIndex:"90",transition:"background .35s ease,box-shadow .35s ease",background: home ? "transparent" : "rgba(245,240,232,.85)",backdropFilter: home ? "none" : "blur(14px)",WebkitBackdropFilter: home ? "none" : "blur(14px)",boxShadow: home ? "none" : "0 12px 30px -20px rgba(61,65,66,.4)"}}>
        <div style={{maxWidth:"1240px",margin:"0 auto",display:"flex",alignItems:"center",gap:"26px",padding:"13px clamp(16px,4vw,32px)"}}>
          <a href={home ? "#top" : homePath(locale)} style={{display:"flex",flexDirection:"column",lineHeight:"1",gap:"4px"}} onClick={() => home && setActive(null)}>
            <span style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"24px",letterSpacing:".02em",display:"inline-flex",alignItems:"flex-end"}}>DR.&nbsp;EK<svg viewBox="0 0 100 100" style={{width:"23px",height:"23px",margin:"0 1px 1px"}} aria-label="M"><defs><clipPath id="tcut-h"><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z"></path></clipPath></defs><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z" fill="#7EAEE8"></path><path d="M8 66C28 80 47 71 59 50C67 36 71 21 73 4" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" clipPath="url(#tcut-h)"></path></svg>EČIĆ</span>
            <span style={{fontSize:"8.5px",fontWeight:"800",letterSpacing:".34em",color:"#5B8FD4"}}>{t.header.tagline}</span>
          </a>
          <nav id="nav-links" style={{display:"flex",gap:"24px",marginLeft:"auto",fontWeight:"700",fontSize:"15px"}}>
            <a
              href={to("services")}
              className={navClass("services")}
              aria-current={active === "services" ? "true" : undefined}
              onClick={() => home && setActive("services")}
            >
              {t.header.nav.services}
            </a>
            <a
              href={to("hours")}
              className={navClass("hours")}
              aria-current={active === "hours" ? "true" : undefined}
              onClick={() => home && setActive("hours")}
            >
              {t.header.nav.hours}
            </a>
            <a
              href={tipsPath(locale)}
              className={navClass("tips")}
              aria-current={active === "tips" ? "page" : undefined}
            >
              {t.header.nav.tips}
            </a>
            <a
              href={contactPath(locale)}
              className={navClass("contact")}
              aria-current={active === "contact" ? "page" : undefined}
            >
              {t.header.nav.contact}
            </a>
          </nav>
          <a id="nav-phone" href="tel:+38737514771" style={{display:"flex",alignItems:"center",gap:"8px",fontWeight:"800",fontSize:"15px",marginLeft:"auto"}}>
            <svg viewBox="0 0 24 24" style={{width:"16px",height:"16px"}}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#7EAEE8"></path></svg>{t.phoneDisplay}
          </a>
          <BookingCta home={home} />
        </div>
      </header>

      <div id="sticky-bar" style={{display:"none",position:"fixed",left:"0",right:"0",bottom:"0",zIndex:"95",gap:"10px",padding:"10px 14px calc(10px + env(safe-area-inset-bottom))",background:"rgba(245,240,232,.92)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderTop:"2px solid rgba(61,65,66,.1)"}}>
        <a href="tel:+38737514771" style={{flex:"1",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"#3D4142",color:"#F5F0E8",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"16px",padding:"14px",borderRadius:"999px"}}>{t.header.call}</a>
        <BookingCta home={home} mobile />
      </div>
    </>
  );
}
