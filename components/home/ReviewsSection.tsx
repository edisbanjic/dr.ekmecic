"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

const CARD_STYLES = [
  { bg: "#FFFFFF", rotate: "rotate(-1.5deg)", delay: 0, marginTop: undefined, star: "#F4A08A", className: "af1" },
  { bg: "#E7F0FB", rotate: "rotate(1.2deg)", delay: 110, marginTop: "16px", star: "#F4A08A", className: "af2" },
  { bg: "#FBE7DA", rotate: "rotate(1.8deg)", delay: 60, marginTop: undefined, star: "#E8836A", className: "af3" },
  { bg: "#FFFFFF", rotate: "rotate(-1deg)", delay: 170, marginTop: "10px", star: "#F4A08A", className: "af4" },
];

/** Patient reviews. */
export default function ReviewsSection() {
  const t = getDict(useLocale().locale).reviews;
  return (
    <>
      <div style={{background:"#F5F0E8",lineHeight:"0"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,40 C240,8 420,84 720,52 C1020,20 1200,78 1440,36 L1440,90 L0,90 Z" fill="#FBF8F1"></path></svg></div>

      <section id="reviews" style={{background:"#FBF8F1",padding:"clamp(60px,9vw,110px) 0 clamp(40px,6vw,70px)"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div data-reveal="" style={{textAlign:"center",marginBottom:"clamp(32px,5vw,52px)"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#E7F0FB",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>{t.badge}</div>
            <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(38px,5.6vw,62px)",lineHeight:"1.02"}}>{t.titlePre}<span style={{color:"#E8836A"}}>{t.titleHighlight}</span></h2>
            <p style={{margin:"14px 0 0",fontSize:"16px",fontWeight:"700",opacity:".7"}}>{t.rating}</p>
          </div>
          <div style={{display:"flex",gap:"clamp(20px,3vw,30px)",flexWrap:"wrap",justifyContent:"center"}}>
            {t.items.map((review, i) => {
              const s = CARD_STYLES[i % CARD_STYLES.length];
              return (
                <div key={i} data-reveal="" data-delay={s.delay} style={{position:"relative",flex:"1 1 320px",maxWidth:"480px",background:s.bg,borderRadius:"30px",padding:"26px 28px",transform:s.rotate,marginTop:s.marginTop,boxShadow:"0 22px 40px -24px rgba(61,65,66,.35)"}} className={s.className}>
                  <div style={{color:s.star,fontSize:"17px",letterSpacing:"4px"}}>★★★★★</div>
                  <p style={{margin:"12px 0 0",fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18.5px",lineHeight:"1.5"}}>{review.text}</p>
                  <div style={{marginTop:"16px",fontSize:"14.5px",fontWeight:"800"}}>{review.name} <span style={{opacity:".55",fontWeight:"700"}}>· {review.role}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
