"use client";

import Faq from "@/components/Faq";
import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

/** FAQ — heading + interactive accordion. */
export default function FaqSection() {
  const t = getDict(useLocale().locale).faq;
  return (
    <section id="faq" style={{background:"#FBF8F1",padding:"clamp(40px,6vw,70px) 0 clamp(80px,11vw,130px)"}}>
      <div style={{maxWidth:"760px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
        <div data-reveal="" style={{textAlign:"center",marginBottom:"clamp(28px,4vw,44px)"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FBE7DA",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#A05A42"}}>{t.badge}</div>
          <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(36px,5vw,54px)",lineHeight:"1.02"}}>{t.title}</h2>
        </div>
        <Faq items={t.items} />
      </div>
    </section>
  );
}
