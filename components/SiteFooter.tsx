"use client";

import LangSwitcher from "@/components/LangSwitcher";
import LocationMap from "@/components/LocationMap";
import { useLocale } from "@/components/LocaleProvider";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiViber } from "react-icons/si";
import { getDict, homeAnchor } from "@/lib/i18n";

const socialLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "42px",
  height: "42px",
  border: "2px solid rgba(245,240,232,.35)",
  borderRadius: "50%",
  background: "rgba(255,255,255,.04)",
  transition: "transform .3s cubic-bezier(.34,1.56,.64,1), background .25s ease",
} as const;

/** Footer with map, contact and the language switcher — same on landing and subpages. */
export default function SiteFooter({ home = false }: { home?: boolean }) {
  const { locale } = useLocale();
  const t = getDict(locale);
  const to = (id: string) => homeAnchor(locale, id, home);

  return (
    <>
      <div style={{background:"#FBF8F1",lineHeight:"0"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,50 C180,90 360,10 560,34 C760,58 900,84 1080,58 C1240,36 1340,20 1440,44 L1440,90 L0,90 Z" fill="#3D4142"></path></svg></div>

      <footer id="contact" style={{background:"#3D4142",color:"#F5F0E8",padding:"clamp(30px,5vw,60px) 0 30px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div style={{display:"flex",gap:"clamp(32px,5vw,64px)",flexWrap:"wrap",alignItems:"flex-start"}}>
            <div style={{flex:"1 1 320px",minWidth:"280px"}}>
              <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                <span style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(34px,4.5vw,50px)",letterSpacing:".02em",display:"inline-flex",alignItems:"flex-end",color:"#F5F0E8"}}>DR.&nbsp;EK<svg viewBox="0 0 100 100" style={{width:".86em",height:".86em",margin:"0 2px .04em"}}><defs><clipPath id="tcut-f"><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z"></path></clipPath></defs><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z" fill="#7EAEE8"></path><path d="M8 66C28 80 47 71 59 50C67 36 71 21 73 4" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" clipPath="url(#tcut-f)"></path></svg>EČIĆ</span>
                <span style={{fontSize:"11px",fontWeight:"800",letterSpacing:".34em",color:"#7EAEE8"}}>{t.footer.tagline}</span>
              </div>
              <p style={{margin:"18px 0 0",fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"19px",opacity:".9"}}>{t.footer.slogan} <span style={{color:"#F4A08A"}}>✦</span></p>
              <div style={{display:"flex",gap:"10px",marginTop:"22px",flexWrap:"wrap"}}>
                <a href="tel:+38737514771" style={{background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"15px",padding:"11px 20px",borderRadius:"999px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv9">{t.phoneDisplay}</a>
                <a href="viber://chat?number=%2B38737514771" aria-label="Viber" title="Viber" style={socialLinkStyle} className="hv10">
                  <SiViber size={22} color="#B89CFF" />
                </a>
                <a href="https://wa.me/38737514771" aria-label="WhatsApp" title="WhatsApp" style={socialLinkStyle} className="hv10">
                  <FaWhatsapp size={22} color="#3FBD5A" />
                </a>
                <a href="https://www.facebook.com/drKamalaEkmecic" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" style={socialLinkStyle} className="hv10">
                  <FaFacebookF size={20} color="#F5F0E8" />
                </a>
              </div>
            </div>
            <div style={{flex:"0 1 260px",minWidth:"220px"}}>
              <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"17px",marginBottom:"14px"}}>{t.footer.contactTitle}</div>
              <div style={{display:"grid",gap:"10px",fontSize:"15px",lineHeight:"1.5",opacity:".85"}}>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span>{t.footer.addressLine1}<br />{t.footer.addressLine2}</div>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span>{t.phoneDisplay}</div>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span><a href="mailto:ekmecic.kamala@gmail.com" style={{color:"#F5F0E8",textDecoration:"underline",textUnderlineOffset:"3px",wordBreak:"break-all"}}>ekmecic.kamala@gmail.com</a></div>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span>{t.footer.hoursPre}<a href={to("hours")} style={{color:"#F5F0E8",textDecoration:"underline",textUnderlineOffset:"3px"}}>{t.footer.hoursLink}</a></div>
              </div>
            </div>
            <LocationMap />
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px",flexWrap:"wrap",marginTop:"44px",paddingTop:"20px",borderTop:"1px solid rgba(245,240,232,.14)",fontSize:"13.5px"}}>
            <span style={{opacity:".65"}}>{t.footer.copyright}</span>
            <span style={{display:"inline-flex",alignItems:"center",gap:"18px",flexWrap:"wrap"}}>
              <LangSwitcher />
              <span style={{opacity:".65"}}>{t.footer.madeWith} <span style={{color:"#F4A08A"}}>✦</span></span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
