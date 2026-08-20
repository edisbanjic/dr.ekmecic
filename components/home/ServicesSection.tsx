"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDict } from "@/lib/i18n";

/** Bento grid with the eight services + "not sure" phone card. */
export default function ServicesSection() {
  const dict = getDict(useLocale().locale);
  const t = dict.services;
  const phone = dict.phoneDisplay;
  const c = t.cards;
  return (
    <>
      <div style={{background:"#F5F0E8",lineHeight:"0",marginTop:"-46px"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,50 C180,90 360,10 560,34 C760,58 900,84 1080,58 C1240,36 1340,20 1440,44 L1440,90 L0,90 Z" fill="#FBF8F1"></path></svg></div>

      <section style={{background:"#FBF8F1",padding:"clamp(60px,9vw,110px) 0 clamp(70px,10vw,120px)"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div id="services" data-reveal="" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"24px",flexWrap:"wrap",marginBottom:"clamp(32px,5vw,52px)"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#E7F0FB",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>{t.badge}</div>
              <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(38px,5.6vw,62px)",lineHeight:"1.02",letterSpacing:"-.01em"}}>{t.title}<span style={{color:"#F4A08A"}}>.</span></h2>
            </div>
            <p style={{margin:"0",maxWidth:"360px",fontSize:"16px",lineHeight:"1.6",fontWeight:"600",opacity:".8"}}>{t.lead}</p>
          </div>
          <div id="bento" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px"}}>
            <div data-card="" data-reveal="" data-delay="0" style={{gridColumn:"span 2",background:"#E7F0FB",borderRadius:"36px 22px 36px 22px",padding:"28px",display:"flex",gap:"22px",alignItems:"flex-start",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span data-ic="" style={{flex:"0 0 auto",width:"66px",height:"66px",borderRadius:"22px",background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"46px",height:"46px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><path d="M50 38v22M39 49h22" stroke="#7EAEE8" strokeWidth="7" strokeLinecap="round" fill="none"></path></svg></span>
              <div>
                <div style={{display:"inline-block",background:"#FFFFFF",borderRadius:"999px",padding:"4px 12px",fontSize:"11.5px",fontWeight:"800",letterSpacing:".12em",color:"#3E5F86"}}>{t.startHere}</div>
                <h3 style={{margin:"10px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"22px"}}>{c.general.title}</h3>
                <p style={{margin:"0",fontSize:"15px",lineHeight:"1.55",opacity:".85"}}>{c.general.text}</p>
              </div>
            </div>
            <div data-card="" data-reveal="" data-delay="70" style={{background:"#FBE7DA",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><circle cx="50" cy="42" r="11" fill="#7EAEE8"></circle></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>{c.fillings.title}</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>{c.fillings.text}</p>
            </div>
            <div data-card="" data-reveal="" data-delay="140" style={{background:"#E3EFE4",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><path d="M38 58c-2 9 1 17-2 26M62 58c2 9-1 17 2 26" stroke="#F4A08A" strokeWidth="5.5" fill="none" strokeLinecap="round"></path></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>{c.endo.title}</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>{c.endo.text}</p>
            </div>
            <div data-card="" data-reveal="" data-delay="0" style={{background:"#F8ECD2",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><g transform="rotate(12 50 55) translate(2 8) scale(.92)"><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path></g><path d="M24 18l-9-8M38 10l-4-9" stroke="#F4A08A" strokeWidth="5.5" fill="none" strokeLinecap="round"></path></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>{c.extraction.title}</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>{c.extraction.text}</p>
            </div>
            <div data-card="" data-reveal="" data-delay="70" style={{background:"#FBE7DA",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><g transform="translate(2 14) scale(.88)"><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path></g><path d="M32 13 39 4l11 8 11-8 7 9" stroke="#F4A08A" strokeWidth="5.5" fill="none" strokeLinejoin="round" strokeLinecap="round"></path></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>{c.prosthetics.title}</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>{c.prosthetics.text}</p>
            </div>
            <div data-card="" data-reveal="" data-delay="140" style={{gridColumn:"span 2",background:"#E7F0FB",borderRadius:"22px 36px 22px 36px",padding:"28px",display:"flex",gap:"22px",alignItems:"flex-start",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{flex:"0 0 auto",width:"66px",height:"66px",borderRadius:"22px",background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"46px",height:"46px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><path d="M50 28l3.5 10 10 3.5-10 3.5L50 55l-3.5-10-10-3.5 10-3.5Z" fill="#7EAEE8"></path><path d="M79 10l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5Z" fill="#F4A08A"></path></svg></span>
              <div>
                <h3 style={{margin:"4px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"22px"}}>{c.whitening.title}</h3>
                <p style={{margin:"0",fontSize:"15px",lineHeight:"1.55",opacity:".85"}}>{c.whitening.text}</p>
              </div>
            </div>
            <div data-card="" data-reveal="" data-delay="0" style={{background:"#F8ECD2",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><g transform="translate(0 10) scale(.85)"><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path></g><path d="M79 8c5 8 8 11 8 16a8 8 0 1 1-16 0c0-5 3-8 8-16Z" fill="#7EAEE8"></path><circle cx="64" cy="6" r="3" fill="#F4A08A"></circle><circle cx="90" cy="38" r="3" fill="#F4A08A"></circle></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>{c.scaling.title}</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>{c.scaling.text}</p>
            </div>
            <div data-card="" data-reveal="" data-delay="70" style={{gridColumn:"span 2",background:"#E3EFE4",borderRadius:"36px",padding:"28px",position:"relative",overflow:"hidden",display:"flex",gap:"22px",alignItems:"flex-start",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span style={{position:"absolute",right:"18px",top:"14px",color:"#F4A08A",fontSize:"18px"}}>✦</span>
              <span style={{position:"absolute",right:"44px",bottom:"16px",color:"#7EAEE8",fontSize:"13px"}}>✦</span>
              <span data-ic="" style={{flex:"0 0 auto",width:"66px",height:"66px",borderRadius:"22px",background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"46px",height:"46px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><circle cx="41" cy="36" r="3.5" fill="#3D4142"></circle><circle cx="59" cy="36" r="3.5" fill="#3D4142"></circle><path d="M40 47c4 6 16 6 20 0" stroke="#F4A08A" strokeWidth="5" fill="none" strokeLinecap="round"></path><path d="M17 8l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5Z" fill="#7EAEE8"></path></svg></span>
              <div>
                <h3 style={{margin:"4px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"22px"}}>{c.kids.title}</h3>
                <p style={{margin:"0",fontSize:"15px",lineHeight:"1.55",opacity:".85"}}>{c.kids.text}</p>
              </div>
            </div>
            <div data-reveal="" data-delay="140" style={{background:"#3D4142",color:"#F5F0E8",borderRadius:"26px",padding:"26px",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"16px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv5">
              <div>
                <span style={{color:"#F4A08A",fontSize:"20px"}}>✦</span>
                <h3 style={{margin:"10px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px",color:"#F5F0E8"}}>{t.help.title}</h3>
                <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".8"}}>{t.help.text}</p>
              </div>
              <a href="tel:+38737514771" style={{alignSelf:"flex-start",background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"15px",padding:"10px 18px",borderRadius:"999px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv6">{phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
