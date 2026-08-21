"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

const STAR_COLORS = ["#F4A08A", "#7EAEE8"];

function Track({ items }: { items: string[] }) {
  // items repeated twice per track so the loop has no visible seam
  const doubled = [...items, ...items];
  return (
    <div style={{display:"flex",alignItems:"center",gap:"30px",paddingRight:"30px",whiteSpace:"nowrap",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(16px,2.1vw,23px)",letterSpacing:".09em",color:"#F5F0E8"}}>
      {doubled.map((item, i) => (
        <span key={i} style={{display:"contents"}}>
          <span>{item}</span>
          <span style={{color:STAR_COLORS[i % 2]}}>✦</span>
        </span>
      ))}
    </div>
  );
}

/** Rotated marquee bar under the hero. */
export default function Marquee() {
  const items = getDict(useLocale().locale).marquee;
  return (
    <div style={{position:"relative",zIndex:"6",transform:"rotate(-1.4deg)",margin:"-26px -2% 0",width:"104%"}}>
      <div style={{overflow:"hidden",background:"#3D4142",padding:"15px 0",boxShadow:"0 18px 34px -20px rgba(61,65,66,.55)"}}>
        <div id="marq-track" style={{display:"flex",width:"max-content",animation:"marquee 22s linear infinite"}}>
          <Track items={items} />
          <Track items={items} />
        </div>
      </div>
    </div>
  );
}
