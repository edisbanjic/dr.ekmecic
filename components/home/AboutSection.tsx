"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

const STAT_COLORS = ["#5B8FD4", "#E8836A", undefined];
const POLAROID_IMAGES = [
  "/assets/polaroid-clinic.webp",
  "/assets/polaroid-equipment.webp",
  "/assets/polaroid-waiting-room.webp",
];
const POLAROID_STYLES = [
  { rotate: "rotate(-4deg)", delay: 0, marginTop: undefined },
  { rotate: "rotate(2.5deg)", delay: 110, marginTop: "18px" },
  { rotate: "rotate(-1.5deg)", delay: 220, marginTop: undefined },
];

/** "Meet the doctor" — both doctors, the technician, stats and the polaroid strip. */
export default function AboutSection() {
  const t = getDict(useLocale().locale).about;
  return (
    <>
      <div style={{background:"#FBF8F1",lineHeight:"0"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,40 C240,8 420,84 720,52 C1020,20 1200,78 1440,36 L1440,90 L0,90 Z" fill="#E9F1FB"></path></svg></div>

      <section id="about" style={{background:"#E9F1FB",padding:"clamp(60px,9vw,110px) 0",position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div style={{display:"flex",gap:"clamp(36px,6vw,72px)",alignItems:"center",flexWrap:"wrap"}}>
            <div data-reveal="" style={{position:"relative",flex:"0 1 420px",minWidth:"290px",maxWidth:"460px",margin:"0 auto"}}>
              <div data-parallax="0.05" style={{position:"absolute",left:"-8%",top:"-6%",width:"112%",height:"110%",background:"rgba(244,160,138,.4)",borderRadius:"42% 58% 39% 61% / 55% 39% 61% 45%",transform:"rotate(7deg)"}}></div>
              <div style={{position:"relative",aspectRatio:"0.87",borderRadius:"54% 46% 58% 42% / 48% 56% 44% 52%",overflow:"hidden"}}>
                <img src="/assets/dr-portrait.webp" alt={t.altPortrait} loading="lazy" decoding="async" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
              </div>
              <span style={{position:"absolute",left:"-16px",top:"8%",width:"30px",transform:"rotate(-16deg)"}}><span style={{display:"block",animation:"floatY 8s ease-in-out infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#7EAEE8"></path></svg></span></span>
              <span style={{position:"absolute",right:"-6px",top:"-14px",fontSize:"24px",color:"#F4A08A",animation:"floatB 7s ease-in-out infinite"}}>✦</span>
              <div style={{position:"absolute",right:"-10px",bottom:"-14px",background:"#FFFFFF",borderRadius:"18px",padding:"12px 18px",transform:"rotate(-3deg)",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"17px"}}>{t.sticker} <span style={{color:"#F4A08A"}}>✦</span></div>
            </div>
            <div data-reveal="" data-delay="120" style={{flex:"1 1 340px",minWidth:"290px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FFFFFF",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>{t.badge}</div>
              <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(36px,5vw,58px)",lineHeight:"1.04",letterSpacing:"-.01em"}}>{t.titlePre}<span style={{color:"#5B8FD4"}}>{t.titleHighlight}</span></h2>
              <p style={{margin:"22px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>{t.p1}</p>
              <p style={{margin:"14px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>{t.p2}</p>
              <div style={{display:"flex",gap:"clamp(24px,4vw,48px)",flexWrap:"wrap",marginTop:"34px"}}>
                {t.stats.map((stat, i) => (
                  <div key={i}>
                    <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(42px,5vw,58px)",lineHeight:"1",color:STAT_COLORS[i]}}><span data-count={stat.value} data-suffix={stat.suffix}>{stat.display}</span></div>
                    <div style={{fontSize:"14.5px",fontWeight:"700",opacity:".7",marginTop:"4px"}}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="team" data-reveal="" style={{display:"flex",flexDirection:"row-reverse",gap:"clamp(36px,6vw,72px)",alignItems:"center",flexWrap:"wrap",marginTop:"clamp(56px,8vw,96px)",scrollMarginTop:"110px"}}>
            <div style={{position:"relative",flex:"0 1 340px",minWidth:"260px",maxWidth:"380px",margin:"0 auto"}}>
              <div data-parallax="-0.04" style={{position:"absolute",left:"-8%",top:"-6%",width:"112%",height:"110%",background:"rgba(126,174,232,.4)",borderRadius:"58% 42% 61% 39% / 45% 61% 39% 55%",transform:"rotate(-7deg)"}}></div>
              <div style={{position:"relative",aspectRatio:"0.87",borderRadius:"46% 54% 42% 58% / 56% 48% 52% 44%",overflow:"hidden"}}>
                <img src="/assets/dr-zehra.png" alt={t.team.altPortrait} loading="lazy" decoding="async" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
              </div>
              <span style={{position:"absolute",right:"-14px",top:"6%",width:"28px",transform:"rotate(14deg)"}}><span style={{display:"block",animation:"floatY 8s ease-in-out 1s infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#F4A08A"></path></svg></span></span>
              <span style={{position:"absolute",left:"-6px",top:"-14px",fontSize:"22px",color:"#5B8FD4",animation:"floatB 7s ease-in-out infinite"}}>✦</span>
              <div style={{position:"absolute",left:"-10px",bottom:"-14px",background:"#FFFFFF",borderRadius:"18px",padding:"12px 18px",transform:"rotate(2.5deg)",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"17px"}}>{t.team.sticker} <span style={{color:"#5B8FD4"}}>✦</span></div>
            </div>
            <div style={{flex:"1 1 340px",minWidth:"290px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FFFFFF",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>{t.team.badge}</div>
              <h3 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(28px,4vw,44px)",lineHeight:"1.04",letterSpacing:"-.01em"}}>{t.team.namePre}<span style={{color:"#5B8FD4"}}>{t.team.nameHighlight}</span></h3>
              <p style={{margin:"18px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>{t.team.p1}</p>
              <p style={{margin:"14px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>{t.team.p2}</p>
              <a href="https://www.linkedin.com/in/zehra-ekme%C4%8Di%C4%87-4781b5389/" target="_blank" rel="noopener" style={{display:"inline-flex",alignItems:"center",gap:"9px",marginTop:"22px",background:"#FFFFFF",borderRadius:"999px",padding:"10px 20px",fontWeight:"800",fontSize:"14px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv7"><svg viewBox="0 0 24 24" style={{width:"16px",height:"16px"}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"></path></svg>LinkedIn</a>
            </div>
          </div>
          <div id="tech" data-reveal="" style={{display:"flex",gap:"clamp(36px,6vw,72px)",alignItems:"center",flexWrap:"wrap",marginTop:"clamp(56px,8vw,96px)",scrollMarginTop:"110px"}}>
            <div style={{position:"relative",flex:"0 1 340px",minWidth:"260px",maxWidth:"380px",margin:"0 auto"}}>
              <div data-parallax="0.04" style={{position:"absolute",left:"-8%",top:"-6%",width:"112%",height:"110%",background:"rgba(244,160,138,.4)",borderRadius:"42% 58% 39% 61% / 55% 39% 61% 45%",transform:"rotate(7deg)"}}></div>
              <div style={{position:"relative",aspectRatio:"0.87",borderRadius:"54% 46% 58% 42% / 44% 52% 48% 56%",overflow:"hidden"}}>
                <img src="/assets/hero-patient.webp" alt={t.tech.altPortrait} loading="lazy" decoding="async" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
              </div>
              <span style={{position:"absolute",left:"-14px",top:"6%",width:"28px",transform:"rotate(-14deg)"}}><span style={{display:"block",animation:"floatY 8s ease-in-out .5s infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#7EAEE8"></path></svg></span></span>
              <span style={{position:"absolute",right:"-6px",top:"-14px",fontSize:"22px",color:"#F4A08A",animation:"floatB 7s ease-in-out .8s infinite"}}>✦</span>
              <div style={{position:"absolute",right:"-10px",bottom:"-14px",background:"#FFFFFF",borderRadius:"18px",padding:"12px 18px",transform:"rotate(-2.5deg)",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"17px"}}>{t.tech.sticker} <span style={{color:"#F4A08A"}}>✦</span></div>
            </div>
            <div style={{flex:"1 1 340px",minWidth:"290px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FFFFFF",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>{t.tech.badge}</div>
              <h3 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(28px,4vw,44px)",lineHeight:"1.04",letterSpacing:"-.01em"}}>{t.tech.namePre}<span style={{color:"#5B8FD4"}}>{t.tech.nameHighlight}</span></h3>
              <p style={{margin:"18px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>{t.tech.p1}</p>
              <p style={{margin:"14px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>{t.tech.p2}</p>
            </div>
          </div>
          <div style={{display:"flex",gap:"clamp(18px,3vw,30px)",justifyContent:"center",flexWrap:"wrap",marginTop:"clamp(48px,7vw,80px)"}}>
            {t.polaroids.map((polaroid, i) => (
              <div key={i} data-reveal="" data-delay={POLAROID_STYLES[i].delay} style={{background:"#FFFFFF",padding:"12px 12px 14px",borderRadius:"6px",boxShadow:"0 20px 38px -20px rgba(61,65,66,.4)",transform:POLAROID_STYLES[i].rotate,marginTop:POLAROID_STYLES[i].marginTop}}>
                <img src={POLAROID_IMAGES[i]} alt={polaroid.alt} loading="lazy" decoding="async" style={{width:"230px",height:"170px",display:"block",objectFit:"cover",borderRadius:"2px"}} />
                <div style={{fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18px",textAlign:"center",marginTop:"10px"}}>{polaroid.caption}{i === 1 && <> <span style={{color:"#5B8FD4"}}>✦</span></>}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
