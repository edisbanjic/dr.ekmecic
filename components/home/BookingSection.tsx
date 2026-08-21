"use client";

import BookingForm from "@/components/BookingFormLazy";
import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

/** Booking — intro, phone/chat links and the two-step form. */
export default function BookingSection() {
  const dict = getDict(useLocale().locale);
  const t = dict.bookingSection;
  const phone = dict.phoneDisplay;
  return (
    <section id="booking" style={{background:"#F5F0E8",padding:"clamp(30px,5vw,60px) 0 clamp(70px,10vw,120px)",position:"relative",overflow:"hidden"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"clamp(32px,5vw,64px)",alignItems:"start"}}>
        <div data-reveal="" style={{paddingTop:"clamp(24px,4vw,42px)"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FBE7DA",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#A05A42"}}>{t.badge}</div>
          <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(38px,5.6vw,62px)",lineHeight:"1.02"}}>{t.titlePre}<span style={{color:"#E8836A"}}>{t.titleHighlight}</span></h2>
          <p style={{margin:"20px 0 0",maxWidth:"440px",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>{t.lead}</p>
          <a href="tel:+38737514771" style={{display:"inline-flex",alignItems:"center",gap:"12px",marginTop:"26px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(24px,3vw,30px)"}}><svg viewBox="0 0 24 24" style={{width:"24px",height:"24px"}}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#7EAEE8"></path></svg>{phone}</a>
          <div style={{display:"flex",gap:"10px",marginTop:"18px",flexWrap:"wrap"}}>
            <a href="viber://chat?number=%2B38737514771" style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"2px solid #3D4142",borderRadius:"999px",padding:"9px 18px",fontWeight:"800",fontSize:"14px",background:"#FFFFFF",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv7"><span style={{width:"9px",height:"9px",borderRadius:"50%",background:"#7360F2"}}></span>Viber</a>
            <a href="https://wa.me/38737514771" style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"2px solid #3D4142",borderRadius:"999px",padding:"9px 18px",fontWeight:"800",fontSize:"14px",background:"#FFFFFF",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv7"><span style={{width:"9px",height:"9px",borderRadius:"50%",background:"#3FBD5A"}}></span>WhatsApp</a>
          </div>
          <p style={{margin:"16px 0 0",fontSize:"14px",opacity:".65",fontWeight:"600"}}>{t.messagesNote}</p>
        </div>
        <div data-reveal="" data-delay="130" style={{position:"relative"}}>
          <div data-parallax="0.04" style={{position:"absolute",right:"-40px",top:"-36px",width:"200px",height:"190px",background:"rgba(126,174,232,.25)",borderRadius:"58% 42% 61% 39% / 45% 61% 39% 55%"}}></div>
          <div data-parallax="-0.03" style={{position:"absolute",left:"-34px",bottom:"-30px",width:"160px",height:"150px",background:"rgba(244,160,138,.3)",borderRadius:"42% 58% 39% 61% / 55% 39% 61% 45%"}}></div>
          <span style={{position:"absolute",left:"26px",top:"-24px",width:"44px",transform:"rotate(-12deg)",zIndex:"2"}}><span style={{display:"block",animation:"floatY 7.5s ease-in-out infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#F4A08A"></path></svg></span></span>
          <span style={{position:"absolute",right:"18px",bottom:"-16px",fontSize:"24px",color:"#5B8FD4",zIndex:"2",animation:"floatB 6s ease-in-out infinite"}}>✦</span>
          <div style={{position:"relative",background:"#FFFFFF",border:"2px solid #F0E8D8",borderRadius:"34px",padding:"clamp(24px,4vw,42px)",boxShadow:"0 30px 60px -34px rgba(61,65,66,.45)"}}>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
