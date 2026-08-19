"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

/** Hero — headline, lead, CTAs and the photo collage. */
export default function Hero() {
  const dict = getDict(useLocale().locale);
  const t = dict.hero;
  const phone = dict.phoneDisplay;
  return (
    <section id="top" style={{position:"relative",background:"#F5F0E8",padding:"clamp(120px,16vh,160px) 0 90px",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:"-40px",background:"url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22%237EAEE8%22/%3E%3C/svg%3E')",backgroundSize:"120px",opacity:".05",transform:"rotate(-5deg)",pointerEvents:"none"}}></div>
      <div data-parallax="-0.05" style={{position:"absolute",left:"-140px",top:"120px",width:"460px",height:"420px",background:"rgba(126,174,232,.16)",borderRadius:"58% 42% 61% 39% / 45% 61% 39% 55%",pointerEvents:"none"}}></div>
      <div data-parallax="0.04" style={{position:"absolute",right:"-120px",top:"340px",width:"400px",height:"380px",background:"rgba(244,160,138,.16)",borderRadius:"42% 58% 39% 61% / 55% 39% 61% 45%",pointerEvents:"none"}}></div>
      <div style={{position:"relative",maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>

        <h1 data-hero="1" style={{margin:"26px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(50px,9vw,122px)",lineHeight:".98",letterSpacing:"-.015em",maxWidth:"12ch"}}>{t.titlePre}<span style={{position:"relative",display:"inline-block",color:"#5B8FD4"}}>{t.titleHighlight}<svg viewBox="0 0 200 20" preserveAspectRatio="none" style={{position:"absolute",left:"0",bottom:"-.14em",width:"100%",height:".22em"}}><path d="M4 12 Q24 2 44 10 T84 10 T124 10 T164 10 T196 10" stroke="#F4A08A" strokeWidth="7" fill="none" strokeLinecap="round"></path></svg></span>{t.titlePost}</h1>
        <p data-hero="2" style={{margin:"26px 0 0",maxWidth:"560px",fontSize:"clamp(16px,2vw,18.5px)",lineHeight:"1.6",fontWeight:"600",opacity:".85"}}>{t.lead}</p>
        <div data-hero="3" style={{display:"flex",gap:"14px",marginTop:"32px",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
          <a href="#booking" style={{background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"17.5px",padding:"16px 32px",borderRadius:"999px",boxShadow:"0 14px 26px -12px rgba(126,174,232,.8)",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv1">{t.ctaPrimary}</a>
          <a href="#services" style={{background:"transparent",border:"2px solid #3D4142",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"17.5px",padding:"14px 30px",borderRadius:"999px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv2">{t.ctaSecondary}</a>
          <span style={{fontSize:"15px",fontWeight:"700",opacity:".75"}}>{t.orCall} <a href="tel:+38737514771" style={{textDecoration:"underline",textUnderlineOffset:"3px"}}>{phone}</a></span>
        </div>
        <div data-hero="4" style={{position:"relative",width:"100%",maxWidth:"1060px",height:"clamp(330px,44vw,530px)",marginTop:"clamp(36px,5vw,64px)"}}>
          <div style={{position:"absolute",left:"50%",top:"0",transform:"translateX(-50%)",width:"clamp(250px,33vw,400px)",aspectRatio:"0.94",WebkitMask:"url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22black%22/%3E%3C/svg%3E') center / 100% 100% no-repeat",mask:"url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22black%22/%3E%3C/svg%3E') center / 100% 100% no-repeat"}}>
            <img src="/assets/hero-smile.webp" alt={t.altSmile} style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{position:"absolute",left:"50%",top:"0",transform:"translateX(-50%)",width:"clamp(250px,33vw,400px)",aspectRatio:"0.94",overflow:"visible",pointerEvents:"none"}}>
            <path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" pathLength="100" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="26 74" style={{transformOrigin:"50px 50px",transform:"scale(1.07)",animation:"toothTrail 9s linear infinite"}} />
            <path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" pathLength="100" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="10 90" style={{transformOrigin:"50px 50px",transform:"scale(1.07)",animation:"toothTrail 9s linear -4.5s infinite",opacity:".85"}} />
          </svg>
          <div style={{position:"absolute",left:"clamp(0px,4vw,60px)",bottom:"4%",width:"clamp(150px,19vw,230px)",aspectRatio:"0.8",transform:"rotate(-6deg)",borderRadius:"999px 999px 30px 30px",overflow:"hidden",border:"8px solid #FFFFFF",boxShadow:"0 24px 44px -22px rgba(61,65,66,.45)"}}>
            <img src="/assets/hero-clinic.webp" alt={t.altClinic} style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
          </div>
          <div style={{position:"absolute",right:"clamp(0px,4vw,60px)",top:"6%",width:"clamp(135px,17vw,210px)",aspectRatio:"1",transform:"rotate(5deg)",borderRadius:"58% 42% 61% 39% / 45% 61% 39% 55%",overflow:"hidden",border:"8px solid #FFFFFF",boxShadow:"0 24px 44px -22px rgba(61,65,66,.45)"}}>
            <img src="/assets/hero-patient.webp" alt={t.altPatient} style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
          </div>
          <span className="hero-badge" style={{position:"absolute",left:"1%",top:"16%",transform:"rotate(-5deg)"}}><span style={{display:"inline-block",background:"#FFFFFF",borderRadius:"18px",padding:"11px 18px",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"16px",whiteSpace:"nowrap",animation:"floatY 8s ease-in-out .4s infinite"}}><span style={{color:"#F4A08A"}}>★</span> {t.badgeRating}</span></span>
          <span className="hero-badge" style={{position:"absolute",left:"50%",bottom:"1%",transform:"translateX(-50%) rotate(2deg)"}}><span style={{display:"inline-block",background:"#FFFFFF",borderRadius:"18px",padding:"11px 18px",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"16px",whiteSpace:"nowrap",animation:"floatY 10s ease-in-out 1.6s infinite"}}>{t.badgeSmiles} <span style={{color:"#5B8FD4"}}>✦</span></span></span>
          <span className="hero-badge" style={{position:"absolute",right:"1%",bottom:"18%",transform:"rotate(4deg)"}}><span style={{display:"inline-block",background:"#FFFFFF",borderRadius:"18px",padding:"11px 18px",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"16px",whiteSpace:"nowrap",animation:"floatY 9s ease-in-out .9s infinite"}}>{t.badgeYears} <span style={{color:"#F4A08A"}}>✦</span></span></span>
          <span style={{position:"absolute",left:"14%",top:"2%",width:"34px",transform:"rotate(-14deg)"}}><span style={{display:"block",animation:"floatY 7s ease-in-out infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#7EAEE8"></path></svg></span></span>
          <span style={{position:"absolute",right:"16%",bottom:"10%",width:"26px",transform:"rotate(12deg)"}}><span style={{display:"block",animation:"floatY 9s ease-in-out 1.2s infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#F4A08A"></path></svg></span></span>
          <span style={{position:"absolute",left:"26%",bottom:"0",fontSize:"26px",color:"#F4A08A",animation:"floatB 6s ease-in-out .6s infinite"}}>✦</span>
          <span style={{position:"absolute",right:"27%",top:"0",fontSize:"20px",color:"#5B8FD4",animation:"floatB 8s ease-in-out infinite"}}>✦</span>
          <span style={{position:"absolute",left:"6%",top:"38%",width:"10px",height:"10px",borderRadius:"50%",background:"#F4A08A",opacity:".7"}}></span>
          <span style={{position:"absolute",left:"9%",top:"44%",width:"6px",height:"6px",borderRadius:"50%",background:"#7EAEE8",opacity:".7"}}></span>
          <span style={{position:"absolute",right:"7%",bottom:"34%",width:"8px",height:"8px",borderRadius:"50%",background:"#7EAEE8",opacity:".7"}}></span>
          <a href="#about" className="hero-name hv7" style={{position:"absolute",left:"52%",top:"68%",transform:"rotate(2deg)",background:"#FFFFFF",borderRadius:"999px",padding:"9px 16px",boxShadow:"0 16px 30px -16px rgba(61,65,66,.45)",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"14px",whiteSpace:"nowrap",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}}>{t.nameKamala} <span style={{color:"#5B8FD4"}}>✦</span></a>
          <a href="#team" className="hero-name hv7" style={{position:"absolute",left:"7%",bottom:"1%",transform:"rotate(-5deg)",background:"#FFFFFF",borderRadius:"999px",padding:"9px 16px",boxShadow:"0 16px 30px -16px rgba(61,65,66,.45)",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"14px",whiteSpace:"nowrap",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}}>{t.nameZehra} <span style={{color:"#F4A08A"}}>✦</span></a>
          <a href="#tech" className="hero-name hv7" style={{position:"absolute",right:"8%",top:"43%",transform:"rotate(4deg)",background:"#FFFFFF",borderRadius:"999px",padding:"9px 16px",boxShadow:"0 16px 30px -16px rgba(61,65,66,.45)",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"14px",whiteSpace:"nowrap",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}}>{t.nameTech} <span style={{color:"#5B8FD4"}}>✦</span></a>
        </div>
      </div>
    </section>
  );
}
