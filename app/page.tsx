import BookingForm from "@/components/BookingForm";
import Faq from "@/components/Faq";
import ScrollEffects from "@/components/ScrollEffects";
import LocationMap from "@/components/LocationMap";
export default function Home() {
  return (
    <>
      <ScrollEffects />
      <header id="hdr" style={{position:"fixed",top:"0",left:"0",right:"0",zIndex:"90",transition:"background .35s ease,box-shadow .35s ease"}}>
        <div style={{maxWidth:"1240px",margin:"0 auto",display:"flex",alignItems:"center",gap:"26px",padding:"13px clamp(16px,4vw,32px)"}}>
          <a href="#pocetak" style={{display:"flex",flexDirection:"column",lineHeight:"1",gap:"4px"}}>
            <span style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"24px",letterSpacing:".02em",display:"inline-flex",alignItems:"flex-end"}}>DR.&nbsp;EK<svg viewBox="0 0 100 100" style={{width:"23px",height:"23px",margin:"0 1px 1px"}} aria-label="M"><defs><clipPath id="tcut-h"><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z"></path></clipPath></defs><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z" fill="#7EAEE8"></path><path d="M8 66C28 80 47 71 59 50C67 36 71 21 73 4" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" clipPath="url(#tcut-h)"></path></svg>EČIĆ</span>
            <span style={{fontSize:"8.5px",fontWeight:"800",letterSpacing:".34em",color:"#5B8FD4"}}>STOMATOLOŠKA ORDINACIJA</span>
          </a>
          <nav id="nav-links" style={{display:"flex",gap:"24px",marginLeft:"auto",fontWeight:"700",fontSize:"15px"}}>
            <a href="#usluge">Usluge</a><a href="#radno-vrijeme">Radno vrijeme</a><a href="/savjeti">Savjeti</a><a href="#kontakt">Kontakt</a>
          </nav>
          <a id="nav-phone" href="tel:+38737514771" style={{display:"flex",alignItems:"center",gap:"8px",fontWeight:"800",fontSize:"15px",marginLeft:"auto"}}>
            <svg viewBox="0 0 24 24" style={{width:"16px",height:"16px"}}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#7EAEE8"></path></svg>037 514 771
          </a>
          <a id="hdr-cta" href="#zakazivanje" style={{background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"15.5px",padding:"11px 22px",borderRadius:"999px",animation:"pulse 3.2s ease-out infinite",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv1">Zakaži termin</a>
        </div>
      </header>

      <main>
      <section id="pocetak" style={{position:"relative",background:"#F5F0E8",padding:"clamp(120px,16vh,160px) 0 90px",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:"-40px",background:"url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22%237EAEE8%22/%3E%3C/svg%3E')",backgroundSize:"120px",opacity:".05",transform:"rotate(-5deg)",pointerEvents:"none"}}></div>
        <div data-parallax="-0.05" style={{position:"absolute",left:"-140px",top:"120px",width:"460px",height:"420px",background:"rgba(126,174,232,.16)",borderRadius:"58% 42% 61% 39% / 45% 61% 39% 55%",pointerEvents:"none"}}></div>
        <div data-parallax="0.04" style={{position:"absolute",right:"-120px",top:"340px",width:"400px",height:"380px",background:"rgba(244,160,138,.16)",borderRadius:"42% 58% 39% 61% / 55% 39% 61% 45%",pointerEvents:"none"}}></div>
        <div style={{position:"relative",maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>

          <h1 data-hero="1" style={{margin:"26px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(50px,9vw,122px)",lineHeight:".98",letterSpacing:"-.015em",maxWidth:"12ch"}}>Osmijeh koji <span style={{position:"relative",display:"inline-block",color:"#5B8FD4"}}>voliš<svg viewBox="0 0 200 20" preserveAspectRatio="none" style={{position:"absolute",left:"0",bottom:"-.14em",width:"100%",height:".22em"}}><path d="M4 12 Q24 2 44 10 T84 10 T124 10 T164 10 T196 10" stroke="#F4A08A" strokeWidth="7" fill="none" strokeLinecap="round"></path></svg></span> pokazati</h1>
          <p data-hero="2" style={{margin:"26px 0 0",maxWidth:"560px",fontSize:"clamp(16px,2vw,18.5px)",lineHeight:"1.6",fontWeight:"600",opacity:".85"}}>Dobrodošli u ordinaciju u kojoj se i najveći strah od zubara pretvara u osmijeh — moderna oprema, nježan pristup i tim koji zaista brine.</p>
          <div data-hero="3" style={{display:"flex",gap:"14px",marginTop:"32px",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
            <a href="#zakazivanje" style={{background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"17.5px",padding:"16px 32px",borderRadius:"999px",boxShadow:"0 14px 26px -12px rgba(126,174,232,.8)",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv1">Zakaži termin</a>
            <a href="#usluge" style={{background:"transparent",border:"2px solid #3D4142",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"17.5px",padding:"14px 30px",borderRadius:"999px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv2">Pogledaj usluge</a>
            <span style={{fontSize:"15px",fontWeight:"700",opacity:".75"}}>ili nazovi <a href="tel:+38737514771" style={{textDecoration:"underline",textUnderlineOffset:"3px"}}>037 514 771</a></span>
          </div>
          <div data-hero="4" style={{position:"relative",width:"100%",maxWidth:"1060px",height:"clamp(330px,44vw,530px)",marginTop:"clamp(36px,5vw,64px)"}}>
            <div style={{position:"absolute",left:"50%",top:"0",transform:"translateX(-50%)",width:"clamp(250px,33vw,400px)",aspectRatio:"0.94",WebkitMask:"url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22black%22/%3E%3C/svg%3E') center / 100% 100% no-repeat",mask:"url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22black%22/%3E%3C/svg%3E') center / 100% 100% no-repeat"}}>
              <img src="/assets/hero-osmijeh.webp" alt="Širok osmijeh" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
            </div>
            <div style={{position:"absolute",left:"clamp(0px,4vw,60px)",bottom:"4%",width:"clamp(150px,19vw,230px)",aspectRatio:"0.8",transform:"rotate(-6deg)",borderRadius:"999px 999px 30px 30px",overflow:"hidden",border:"8px solid #FFFFFF",boxShadow:"0 24px 44px -22px rgba(61,65,66,.45)"}}>
              <img src="/assets/hero-ordinacija.webp" alt="Ordinacija" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
            </div>
            <div style={{position:"absolute",right:"clamp(0px,4vw,60px)",top:"6%",width:"clamp(135px,17vw,210px)",aspectRatio:"1",transform:"rotate(5deg)",borderRadius:"58% 42% 61% 39% / 45% 61% 39% 55%",overflow:"hidden",border:"8px solid #FFFFFF",boxShadow:"0 24px 44px -22px rgba(61,65,66,.45)"}}>
              <img src="/assets/hero-pacijent.webp" alt="Sretan pacijent" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
            </div>
            <span style={{position:"absolute",left:"14%",top:"2%",width:"34px",transform:"rotate(-14deg)"}}><span style={{display:"block",animation:"floatY 7s ease-in-out infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#7EAEE8"></path></svg></span></span>
            <span style={{position:"absolute",right:"16%",bottom:"10%",width:"26px",transform:"rotate(12deg)"}}><span style={{display:"block",animation:"floatY 9s ease-in-out 1.2s infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#F4A08A"></path></svg></span></span>
            <span style={{position:"absolute",left:"26%",bottom:"0",fontSize:"26px",color:"#F4A08A",animation:"floatB 6s ease-in-out .6s infinite"}}>✦</span>
            <span style={{position:"absolute",right:"27%",top:"0",fontSize:"20px",color:"#5B8FD4",animation:"floatB 8s ease-in-out infinite"}}>✦</span>
            <span style={{position:"absolute",left:"6%",top:"38%",width:"10px",height:"10px",borderRadius:"50%",background:"#F4A08A",opacity:".7"}}></span>
            <span style={{position:"absolute",left:"9%",top:"44%",width:"6px",height:"6px",borderRadius:"50%",background:"#7EAEE8",opacity:".7"}}></span>
            <span style={{position:"absolute",right:"7%",bottom:"34%",width:"8px",height:"8px",borderRadius:"50%",background:"#7EAEE8",opacity:".7"}}></span>
            <svg viewBox="0 0 120 20" style={{position:"absolute",right:"4%",top:"44%",width:"90px",opacity:".7"}}><path d="M4 12 Q19 2 34 10 T64 10 T94 10 T116 10" stroke="#7EAEE8" strokeWidth="5" fill="none" strokeLinecap="round"></path></svg>
          </div>
        </div>
      </section>

      <div style={{position:"relative",zIndex:"6",transform:"rotate(-1.4deg)",margin:"-26px -2vw 0",width:"104vw"}}>
        <div style={{overflow:"hidden",background:"#3D4142",padding:"15px 0",boxShadow:"0 18px 34px -20px rgba(61,65,66,.55)"}}>
          <div id="marq-track" style={{display:"flex",width:"max-content",animation:"marquee 22s linear infinite"}}>
            <div style={{display:"flex",alignItems:"center",gap:"30px",paddingRight:"30px",whiteSpace:"nowrap",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(16px,2.1vw,23px)",letterSpacing:".09em",color:"#F5F0E8"}}>
              <span>ZDRAV OSMIJEH</span><span style={{color:"#F4A08A"}}>✦</span><span>BEZ BOLA</span><span style={{color:"#7EAEE8"}}>✦</span><span>MODERNA OPREMA</span><span style={{color:"#F4A08A"}}>✦</span><span>INDIVIDUALAN PRISTUP</span><span style={{color:"#7EAEE8"}}>✦</span><span>ZDRAV OSMIJEH</span><span style={{color:"#F4A08A"}}>✦</span><span>BEZ BOLA</span><span style={{color:"#7EAEE8"}}>✦</span><span>MODERNA OPREMA</span><span style={{color:"#F4A08A"}}>✦</span><span>INDIVIDUALAN PRISTUP</span><span style={{color:"#7EAEE8"}}>✦</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"30px",paddingRight:"30px",whiteSpace:"nowrap",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(16px,2.1vw,23px)",letterSpacing:".09em",color:"#F5F0E8"}}>
              <span>ZDRAV OSMIJEH</span><span style={{color:"#F4A08A"}}>✦</span><span>BEZ BOLA</span><span style={{color:"#7EAEE8"}}>✦</span><span>MODERNA OPREMA</span><span style={{color:"#F4A08A"}}>✦</span><span>INDIVIDUALAN PRISTUP</span><span style={{color:"#7EAEE8"}}>✦</span><span>ZDRAV OSMIJEH</span><span style={{color:"#F4A08A"}}>✦</span><span>BEZ BOLA</span><span style={{color:"#7EAEE8"}}>✦</span><span>MODERNA OPREMA</span><span style={{color:"#F4A08A"}}>✦</span><span>INDIVIDUALAN PRISTUP</span><span style={{color:"#7EAEE8"}}>✦</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{background:"#F5F0E8",lineHeight:"0",marginTop:"-46px"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,50 C180,90 360,10 560,34 C760,58 900,84 1080,58 C1240,36 1340,20 1440,44 L1440,90 L0,90 Z" fill="#FBF8F1"></path></svg></div>

      <section id="usluge" style={{background:"#FBF8F1",padding:"clamp(60px,9vw,110px) 0 clamp(70px,10vw,120px)"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div data-reveal="" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"24px",flexWrap:"wrap",marginBottom:"clamp(32px,5vw,52px)"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#E7F0FB",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>NAŠE USLUGE</div>
              <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(38px,5.6vw,62px)",lineHeight:"1.02",letterSpacing:"-.01em"}}>Sve za tvoj osmijeh<span style={{color:"#F4A08A"}}>.</span></h2>
            </div>
            <p style={{margin:"0",maxWidth:"360px",fontSize:"16px",lineHeight:"1.6",fontWeight:"600",opacity:".8"}}>Od redovnog pregleda do potpune obnove osmijeha — osam usluga pod jednim krovom.</p>
          </div>
          <div id="bento" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px"}}>
            <div data-card="" data-reveal="" data-delay="0" style={{gridColumn:"span 2",background:"#E7F0FB",borderRadius:"36px 22px 36px 22px",padding:"28px",display:"flex",gap:"22px",alignItems:"flex-start",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span data-ic="" style={{flex:"0 0 auto",width:"66px",height:"66px",borderRadius:"22px",background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"46px",height:"46px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><path d="M50 38v22M39 49h22" stroke="#7EAEE8" strokeWidth="7" strokeLinecap="round" fill="none"></path></svg></span>
              <div>
                <div style={{display:"inline-block",background:"#FFFFFF",borderRadius:"999px",padding:"4px 12px",fontSize:"11.5px",fontWeight:"800",letterSpacing:".12em",color:"#3E5F86"}}>KRENITE OVDJE ✦</div>
                <h3 style={{margin:"10px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"22px"}}>Opšta stomatologija</h3>
                <p style={{margin:"0",fontSize:"15px",lineHeight:"1.55",opacity:".85"}}>Pregledi, dijagnostika i jasan plan liječenja — temelj svakog zdravog osmijeha. Preventiva je najbolja (i najpovoljnija) stomatologija.</p>
              </div>
            </div>
            <div data-card="" data-reveal="" data-delay="70" style={{background:"#FBE7DA",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><circle cx="50" cy="42" r="11" fill="#7EAEE8"></circle></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>Popravka zuba</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>Estetske plombe u boji zuba — precizno, trajno i potpuno bezbolno.</p>
            </div>
            <div data-card="" data-reveal="" data-delay="140" style={{background:"#E3EFE4",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><path d="M38 58c-2 9 1 17-2 26M62 58c2 9-1 17 2 26" stroke="#F4A08A" strokeWidth="5.5" fill="none" strokeLinecap="round"></path></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>Liječenje korijena</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>Spašavamo i zube koji se čine izgubljenim — modernom endodoncijom.</p>
            </div>
            <div data-card="" data-reveal="" data-delay="0" style={{background:"#F8ECD2",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><g transform="rotate(12 50 55) translate(2 8) scale(.92)"><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path></g><path d="M24 18l-9-8M38 10l-4-9" stroke="#F4A08A" strokeWidth="5.5" fill="none" strokeLinecap="round"></path></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>Vađenje zuba</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>Kad je vađenje jedina opcija: brzo, pažljivo i uz nježnu anesteziju.</p>
            </div>
            <div data-card="" data-reveal="" data-delay="70" style={{background:"#FBE7DA",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><g transform="translate(2 14) scale(.88)"><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path></g><path d="M32 13 39 4l11 8 11-8 7 9" stroke="#F4A08A" strokeWidth="5.5" fill="none" strokeLinejoin="round" strokeLinecap="round"></path></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>Protetika</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>Krunice, mostovi i proteze koje se ne razlikuju od prirodnih zuba.</p>
            </div>
            <div data-card="" data-reveal="" data-delay="140" style={{gridColumn:"span 2",background:"#E7F0FB",borderRadius:"22px 36px 22px 36px",padding:"28px",display:"flex",gap:"22px",alignItems:"flex-start",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{flex:"0 0 auto",width:"66px",height:"66px",borderRadius:"22px",background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"46px",height:"46px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><path d="M50 28l3.5 10 10 3.5-10 3.5L50 55l-3.5-10-10-3.5 10-3.5Z" fill="#7EAEE8"></path><path d="M79 10l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5Z" fill="#F4A08A"></path></svg></span>
              <div>
                <h3 style={{margin:"4px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"22px"}}>Izbjeljivanje zuba</h3>
                <p style={{margin:"0",fontSize:"15px",lineHeight:"1.55",opacity:".85"}}>Profesionalno izbjeljivanje sigurno za gleđ — osmijeh svjetliji za nekoliko nijansi, često već nakon prvog tretmana.</p>
              </div>
            </div>
            <div data-card="" data-reveal="" data-delay="0" style={{background:"#F8ECD2",borderRadius:"26px",padding:"26px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv4">
              <span data-ic="" style={{display:"inline-flex",width:"62px",height:"62px",borderRadius:"20px",background:"rgba(255,255,255,.8)",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"44px",height:"44px"}}><g transform="translate(0 10) scale(.85)"><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path></g><path d="M79 8c5 8 8 11 8 16a8 8 0 1 1-16 0c0-5 3-8 8-16Z" fill="#7EAEE8"></path><circle cx="64" cy="6" r="3" fill="#F4A08A"></circle><circle cx="90" cy="38" r="3" fill="#F4A08A"></circle></svg></span>
              <h3 style={{margin:"16px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px"}}>Uklanjanje kamenca</h3>
              <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".85"}}>Ultrazvučno čišćenje i poliranje za svjež dah i zdrave desni.</p>
            </div>
            <div data-card="" data-reveal="" data-delay="70" style={{gridColumn:"span 2",background:"#E3EFE4",borderRadius:"36px",padding:"28px",position:"relative",overflow:"hidden",display:"flex",gap:"22px",alignItems:"flex-start",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv3">
              <span style={{position:"absolute",right:"18px",top:"14px",color:"#F4A08A",fontSize:"18px"}}>✦</span>
              <span style={{position:"absolute",right:"44px",bottom:"16px",color:"#7EAEE8",fontSize:"13px"}}>✦</span>
              <span data-ic="" style={{flex:"0 0 auto",width:"66px",height:"66px",borderRadius:"22px",background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg viewBox="0 0 100 100" style={{width:"46px",height:"46px"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="none" stroke="#3D4142" strokeWidth="5.5" strokeLinejoin="round"></path><circle cx="41" cy="36" r="3.5" fill="#3D4142"></circle><circle cx="59" cy="36" r="3.5" fill="#3D4142"></circle><path d="M40 47c4 6 16 6 20 0" stroke="#F4A08A" strokeWidth="5" fill="none" strokeLinecap="round"></path><path d="M17 8l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5Z" fill="#7EAEE8"></path></svg></span>
              <div>
                <h3 style={{margin:"4px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"22px"}}>Dječija stomatologija</h3>
                <p style={{margin:"0",fontSize:"15px",lineHeight:"1.55",opacity:".85"}}>Prvi posjet bez suza: kroz igru, strpljenje i malu nagradu za hrabrost. Mališani od nas odlaze s osmijehom — i vraćaju se rado.</p>
              </div>
            </div>
            <div data-reveal="" data-delay="140" style={{background:"#3D4142",color:"#F5F0E8",borderRadius:"26px",padding:"26px",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"16px",transition:"transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease"}} className="hv5">
              <div>
                <span style={{color:"#F4A08A",fontSize:"20px"}}>✦</span>
                <h3 style={{margin:"10px 0 6px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"20px",color:"#F5F0E8"}}>Niste sigurni šta vam treba?</h3>
                <p style={{margin:"0",fontSize:"14.5px",lineHeight:"1.55",opacity:".8"}}>Nazovite — rado ćemo vas posavjetovati.</p>
              </div>
              <a href="tel:+38737514771" style={{alignSelf:"flex-start",background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"15px",padding:"10px 18px",borderRadius:"999px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv6">037 514 771</a>
            </div>
          </div>
        </div>
      </section>

      <div style={{background:"#FBF8F1",lineHeight:"0"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,40 C240,8 420,84 720,52 C1020,20 1200,78 1440,36 L1440,90 L0,90 Z" fill="#E9F1FB"></path></svg></div>

      <section id="o-nama" style={{background:"#E9F1FB",padding:"clamp(60px,9vw,110px) 0",position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div style={{display:"flex",gap:"clamp(36px,6vw,72px)",alignItems:"center",flexWrap:"wrap"}}>
            <div data-reveal="" style={{position:"relative",flex:"0 1 420px",minWidth:"290px",maxWidth:"460px",margin:"0 auto"}}>
              <div data-parallax="0.05" style={{position:"absolute",left:"-8%",top:"-6%",width:"112%",height:"110%",background:"rgba(244,160,138,.4)",borderRadius:"42% 58% 39% 61% / 55% 39% 61% 45%",transform:"rotate(7deg)"}}></div>
              <div style={{position:"relative",aspectRatio:"0.87",borderRadius:"54% 46% 58% 42% / 48% 56% 44% 52%",overflow:"hidden"}}>
                <img src="/assets/dr-portret.webp" alt="Dr. Kamala Ekmečić" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
              </div>
              <span style={{position:"absolute",left:"-16px",top:"8%",width:"30px",transform:"rotate(-16deg)"}}><span style={{display:"block",animation:"floatY 8s ease-in-out infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#7EAEE8"></path></svg></span></span>
              <span style={{position:"absolute",right:"-6px",top:"-14px",fontSize:"24px",color:"#F4A08A",animation:"floatB 7s ease-in-out infinite"}}>✦</span>
              <div style={{position:"absolute",right:"-10px",bottom:"-14px",background:"#FFFFFF",borderRadius:"18px",padding:"12px 18px",transform:"rotate(-3deg)",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"17px"}}>25+ godina uz vaš osmijeh <span style={{color:"#F4A08A"}}>✦</span></div>
            </div>
            <div data-reveal="" data-delay="120" style={{flex:"1 1 340px",minWidth:"290px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FFFFFF",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>UPOZNAJTE DOKTORICU</div>
            <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(36px,5vw,58px)",lineHeight:"1.04",letterSpacing:"-.01em"}}>Mirna ruka, <span style={{color:"#5B8FD4"}}>toplo srce</span></h2>
              <p style={{margin:"22px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>Iza svakog zdravog osmijeha stoji strpljivo srce. Dr. Kamala Ekmečić vjeruje da posjeta stomatologu ne mora biti stresna — zato u našoj ordinaciji uvijek ima vremena za vaša pitanja, objašnjenje svakog koraka i pauzu kad vam zatreba.</p>
              <p style={{margin:"14px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>Uz kontinuiranu edukaciju i modernu opremu, svakom pacijentu pristupamo individualno — jer svaki osmijeh priča svoju priču.</p>
              <div style={{display:"flex",gap:"clamp(24px,4vw,48px)",flexWrap:"wrap",marginTop:"34px"}}>
                <div>
                  <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(42px,5vw,58px)",lineHeight:"1",color:"#5B8FD4"}}><span data-count="25" data-suffix="+">25+</span></div>
                  <div style={{fontSize:"14.5px",fontWeight:"700",opacity:".7",marginTop:"4px"}}>godina iskustva</div>
                </div>
                <div>
                  <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(42px,5vw,58px)",lineHeight:"1",color:"#E8836A"}}><span data-count="10000" data-suffix="+">10.000+</span></div>
                  <div style={{fontSize:"14.5px",fontWeight:"700",opacity:".7",marginTop:"4px"}}>zadovoljnih pacijenata</div>
                </div>
                <div>
                  <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(42px,5vw,58px)",lineHeight:"1"}}><span data-count="98" data-suffix="%">98%</span></div>
                  <div style={{fontSize:"14.5px",fontWeight:"700",opacity:".7",marginTop:"4px"}}>dolazi po preporuci</div>
                </div>
              </div>
            </div>
          </div>
          <div data-reveal="" style={{display:"flex",flexDirection:"row-reverse",gap:"clamp(36px,6vw,72px)",alignItems:"center",flexWrap:"wrap",marginTop:"clamp(56px,8vw,96px)"}}>
            <div style={{position:"relative",flex:"0 1 340px",minWidth:"260px",maxWidth:"380px",margin:"0 auto"}}>
              <div data-parallax="-0.04" style={{position:"absolute",left:"-8%",top:"-6%",width:"112%",height:"110%",background:"rgba(126,174,232,.4)",borderRadius:"58% 42% 61% 39% / 45% 61% 39% 55%",transform:"rotate(-7deg)"}}></div>
              <div style={{position:"relative",aspectRatio:"0.87",borderRadius:"46% 54% 42% 58% / 56% 48% 52% 44%",overflow:"hidden"}}>
                <img src="/assets/dr-druga.png" alt="Dr. Zehra Ekmečić" style={{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block",objectFit:"cover"}} />
              </div>
              <span style={{position:"absolute",right:"-14px",top:"6%",width:"28px",transform:"rotate(14deg)"}}><span style={{display:"block",animation:"floatY 8s ease-in-out 1s infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#F4A08A"></path></svg></span></span>
              <span style={{position:"absolute",left:"-6px",top:"-14px",fontSize:"22px",color:"#5B8FD4",animation:"floatB 7s ease-in-out infinite"}}>✦</span>
              <div style={{position:"absolute",left:"-10px",bottom:"-14px",background:"#FFFFFF",borderRadius:"18px",padding:"12px 18px",transform:"rotate(2.5deg)",boxShadow:"0 18px 34px -18px rgba(61,65,66,.4)",fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"17px"}}>drugi par pažljivih ruku <span style={{color:"#5B8FD4"}}>✦</span></div>
            </div>
            <div style={{flex:"1 1 340px",minWidth:"290px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FFFFFF",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>NAŠ TIM</div>
              <h3 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(28px,4vw,44px)",lineHeight:"1.04",letterSpacing:"-.01em"}}>Dr. Zehra <span style={{color:"#5B8FD4"}}>Ekmečić</span></h3>
              <p style={{margin:"18px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>Nova generacija iste posvećenosti — dr. Zehra u ordinaciju donosi svježa znanja, mirnu ruku i osmijeh koji opušta već u čekaonici. Posebno je vole najmlađi pacijenti i svi koje je strah od zubara dosad držao podalje.</p>
              <p style={{margin:"14px 0 0",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>Zajedno brinemo da svaki termin prođe mirno, temeljito i s osmijehom na kraju.</p>
              <a href="https://www.linkedin.com/in/zehra-ekme%C4%8Di%C4%87-4781b5389/" target="_blank" rel="noopener" style={{display:"inline-flex",alignItems:"center",gap:"9px",marginTop:"22px",background:"#FFFFFF",borderRadius:"999px",padding:"10px 20px",fontWeight:"800",fontSize:"14px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv7"><svg viewBox="0 0 24 24" style={{width:"16px",height:"16px"}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"></path></svg>LinkedIn</a>
            </div>
          </div>
          <div style={{display:"flex",gap:"clamp(18px,3vw,30px)",justifyContent:"center",flexWrap:"wrap",marginTop:"clamp(48px,7vw,80px)"}}>
            <div data-reveal="" data-delay="0" style={{background:"#FFFFFF",padding:"12px 12px 14px",borderRadius:"6px",boxShadow:"0 20px 38px -20px rgba(61,65,66,.4)",transform:"rotate(-4deg)"}}>
              <img src="/assets/polaroid-ordinacija.webp" alt="Ordinacija" style={{width:"230px",height:"170px",display:"block",objectFit:"cover",borderRadius:"2px"}} />
              <div style={{fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18px",textAlign:"center",marginTop:"10px"}}>naša ordinacija</div>
            </div>
            <div data-reveal="" data-delay="110" style={{background:"#FFFFFF",padding:"12px 12px 14px",borderRadius:"6px",boxShadow:"0 20px 38px -20px rgba(61,65,66,.4)",transform:"rotate(2.5deg)",marginTop:"18px"}}>
              <img src="/assets/polaroid-oprema.webp" alt="Oprema" style={{width:"230px",height:"170px",display:"block",objectFit:"cover",borderRadius:"2px"}} />
              <div style={{fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18px",textAlign:"center",marginTop:"10px"}}>moderna oprema <span style={{color:"#5B8FD4"}}>✦</span></div>
            </div>
            <div data-reveal="" data-delay="220" style={{background:"#FFFFFF",padding:"12px 12px 14px",borderRadius:"6px",boxShadow:"0 20px 38px -20px rgba(61,65,66,.4)",transform:"rotate(-1.5deg)"}}>
              <img src="/assets/polaroid-cekaonica.webp" alt="Čekaonica" style={{width:"230px",height:"170px",display:"block",objectFit:"cover",borderRadius:"2px"}} />
              <div style={{fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18px",textAlign:"center",marginTop:"10px"}}>kutak za najhrabrije</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{background:"#E9F1FB",lineHeight:"0"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,50 C180,90 360,10 560,34 C760,58 900,84 1080,58 C1240,36 1340,20 1440,44 L1440,90 L0,90 Z" fill="#F5F0E8"></path></svg></div>

      <section id="radno-vrijeme" style={{background:"#F5F0E8",padding:"clamp(60px,9vw,110px) 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:"0",background:"url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20100%20100%22%3E%3Cpath%20d=%22M50%205C31%205%2015%2015%2015%2034c0%2013%206%2021%2010%2033%203%209%203.5%2023%2012%2023%208%200%206.5-16%2013-16s5%2016%2013%2016c8.5%200%209-14%2012-23%204-12%2010-20%2010-33C85%2015%2069%205%2050%205Z%22%20fill=%22%237EAEE8%22/%3E%3C/svg%3E')",backgroundSize:"110px",backgroundPosition:"14px 10px",opacity:".05",pointerEvents:"none"}}></div>
        <div style={{position:"relative",maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)",textAlign:"center"}}>
          <div data-reveal="">
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FFFFFF",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>KAD SMO TU ZA VAS</div>
            <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(38px,5.6vw,62px)",lineHeight:"1.02"}}>Radno vrijeme</h2>
          </div>
          <div data-reveal="" data-delay="120" style={{position:"relative",maxWidth:"860px",margin:"clamp(32px,5vw,48px) auto 0",background:"#3D4142",color:"#F5F0E8",borderRadius:"44px",padding:"clamp(28px,5vw,52px)",transform:"rotate(-.6deg)",boxShadow:"0 36px 64px -32px rgba(61,65,66,.55)",textAlign:"left"}}>
            <span style={{position:"absolute",top:"-20px",right:"44px",width:"52px",transform:"rotate(14deg)"}}><span style={{display:"block",animation:"floatY 7s ease-in-out infinite"}}><svg viewBox="0 0 100 100" style={{width:"100%",display:"block"}}><path d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z" fill="#7EAEE8"></path></svg></span></span>
            <span style={{position:"absolute",left:"-10px",bottom:"52px",fontSize:"26px",color:"#F4A08A",animation:"floatB 6.5s ease-in-out infinite"}}>✦</span>
            <div style={{display:"grid",gap:"8px"}}>
              <div style={{display:"flex",alignItems:"baseline",gap:"14px",padding:"16px 18px",borderRadius:"18px"}}>
                <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(17px,2.4vw,22px)"}}>Ponedjeljak – Srijeda</div>
                <div style={{flex:"1",borderBottom:"3px dotted rgba(245,240,232,.3)",transform:"translateY(-5px)"}}></div>
                <div style={{textAlign:"right"}}><div style={{fontWeight:"800",fontSize:"clamp(16px,2.3vw,20px)"}}>08:00 – 16:00</div><div style={{fontSize:"13px",opacity:".6"}}>pauza 10:30 – 11:00</div></div>
              </div>
              <div style={{display:"flex",alignItems:"baseline",gap:"14px",padding:"16px 18px",borderRadius:"18px",background:"#7EAEE8",color:"#243038",boxShadow:"0 14px 28px -16px rgba(126,174,232,.9)"}}>
                <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(17px,2.4vw,22px)",display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>Četvrtak <span style={{background:"#FFFFFF",borderRadius:"999px",padding:"3px 11px",fontSize:"11.5px",letterSpacing:".1em",fontWeight:"600"}}>POSLIJEPODNE ✦</span></div>
                <div style={{flex:"1",borderBottom:"3px dotted rgba(36,48,56,.35)",transform:"translateY(-5px)"}}></div>
                <div style={{textAlign:"right"}}><div style={{fontWeight:"800",fontSize:"clamp(16px,2.3vw,20px)"}}>10:00 – 18:00</div><div style={{fontSize:"13px",opacity:".7"}}>pauza 14:00 – 14:30</div></div>
              </div>
              <div style={{display:"flex",alignItems:"baseline",gap:"14px",padding:"16px 18px",borderRadius:"18px"}}>
                <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(17px,2.4vw,22px)"}}>Petak</div>
                <div style={{flex:"1",borderBottom:"3px dotted rgba(245,240,232,.3)",transform:"translateY(-5px)"}}></div>
                <div style={{textAlign:"right"}}><div style={{fontWeight:"800",fontSize:"clamp(16px,2.3vw,20px)"}}>08:00 – 16:00</div><div style={{fontSize:"13px",opacity:".6"}}>pauza 10:30 – 11:00</div></div>
              </div>
              <div style={{display:"flex",alignItems:"baseline",gap:"14px",padding:"16px 18px",borderRadius:"18px"}}>
                <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(17px,2.4vw,22px)"}}>Vikend i praznici</div>
                <div style={{flex:"1",borderBottom:"3px dotted rgba(245,240,232,.3)",transform:"translateY(-5px)"}}></div>
                <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--font-shantell)",fontWeight:"600",fontSize:"clamp(16px,2.3vw,19px)",color:"#F4A08A"}}>ne radimo</div><div style={{fontSize:"13px",opacity:".6"}}>vidimo se u ponedjeljak!</div></div>
              </div>
            </div>
            <div style={{marginTop:"18px",paddingTop:"16px",borderTop:"1px solid rgba(245,240,232,.15)",fontSize:"14px",opacity:".75",display:"flex",gap:"8px",alignItems:"baseline"}}><span style={{color:"#7EAEE8"}}>✦</span>Savjet: četvrtkom radimo poslijepodne — idealno ako ste prijepodne zauzeti.</div>
          </div>
        </div>
      </section>

      <section id="zakazivanje" style={{background:"#F5F0E8",padding:"clamp(30px,5vw,60px) 0 clamp(70px,10vw,120px)",position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"clamp(32px,5vw,64px)",alignItems:"start"}}>
          <div data-reveal="" style={{paddingTop:"clamp(24px,4vw,42px)"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FBE7DA",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#A05A42"}}>ZAKAZIVANJE</div>
            <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(38px,5.6vw,62px)",lineHeight:"1.02"}}>Rezerviši svoj <span style={{color:"#E8836A"}}>termin</span></h2>
            <p style={{margin:"20px 0 0",maxWidth:"440px",fontSize:"16.5px",lineHeight:"1.65",fontWeight:"600",opacity:".85"}}>Ispunite formu, a mi vas nazovemo da potvrdimo termin — obično već isti dan. Bez čekanja, bez komplikacija.</p>
            <a href="tel:+38737514771" style={{display:"inline-flex",alignItems:"center",gap:"12px",marginTop:"26px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"clamp(24px,3vw,30px)"}}><svg viewBox="0 0 24 24" style={{width:"24px",height:"24px"}}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#7EAEE8"></path></svg>037 514 771</a>
            <div style={{display:"flex",gap:"10px",marginTop:"18px",flexWrap:"wrap"}}>
              <a href="viber://chat?number=%2B38737514771" style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"2px solid #3D4142",borderRadius:"999px",padding:"9px 18px",fontWeight:"800",fontSize:"14px",background:"#FFFFFF",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv7"><span style={{width:"9px",height:"9px",borderRadius:"50%",background:"#7360F2"}}></span>Viber</a>
              <a href="https://wa.me/38737514771" style={{display:"inline-flex",alignItems:"center",gap:"8px",border:"2px solid #3D4142",borderRadius:"999px",padding:"9px 18px",fontWeight:"800",fontSize:"14px",background:"#FFFFFF",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv7"><span style={{width:"9px",height:"9px",borderRadius:"50%",background:"#3FBD5A"}}></span>WhatsApp</a>
            </div>
            <p style={{margin:"16px 0 0",fontSize:"14px",opacity:".65",fontWeight:"600"}}>Odgovaramo i na poruke — pišite slobodno.</p>
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

      <div style={{background:"#F5F0E8",lineHeight:"0"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,40 C240,8 420,84 720,52 C1020,20 1200,78 1440,36 L1440,90 L0,90 Z" fill="#FBF8F1"></path></svg></div>

      <section id="recenzije" style={{background:"#FBF8F1",padding:"clamp(60px,9vw,110px) 0 clamp(40px,6vw,70px)"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div data-reveal="" style={{textAlign:"center",marginBottom:"clamp(32px,5vw,52px)"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#E7F0FB",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#3E5F86"}}>RECENZIJE</div>
            <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(38px,5.6vw,62px)",lineHeight:"1.02"}}>Osmjesi govore <span style={{color:"#E8836A"}}>prije nas</span></h2>
            <p style={{margin:"14px 0 0",fontSize:"16px",fontWeight:"700",opacity:".7"}}>★ 5,0 — prosječna ocjena naših pacijenata</p>
          </div>
          <div style={{display:"flex",gap:"clamp(20px,3vw,30px)",flexWrap:"wrap",justifyContent:"center"}}>
            <div data-reveal="" data-delay="0" style={{position:"relative",flex:"1 1 320px",maxWidth:"480px",background:"#FFFFFF",borderRadius:"30px",padding:"26px 28px",transform:"rotate(-1.5deg)",boxShadow:"0 22px 40px -24px rgba(61,65,66,.35)"}} className="af1">
              <div style={{color:"#F4A08A",fontSize:"17px",letterSpacing:"4px"}}>★★★★★</div>
              <p style={{margin:"12px 0 0",fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18.5px",lineHeight:"1.5"}}>„Godinama sam odgađala zubara zbog straha. Ovdje sam se prvi put opustila — sve objasne, ništa ne boli, a osoblje je predivno.“</p>
              <div style={{marginTop:"16px",fontSize:"14.5px",fontWeight:"800"}}>Amira K. <span style={{opacity:".55",fontWeight:"700"}}>· liječenje korijena</span></div>
            </div>
            <div data-reveal="" data-delay="110" style={{position:"relative",flex:"1 1 320px",maxWidth:"480px",background:"#E7F0FB",borderRadius:"30px",padding:"26px 28px",transform:"rotate(1.2deg)",marginTop:"16px",boxShadow:"0 22px 40px -24px rgba(61,65,66,.35)"}} className="af2">
              <div style={{color:"#F4A08A",fontSize:"17px",letterSpacing:"4px"}}>★★★★★</div>
              <p style={{margin:"12px 0 0",fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18.5px",lineHeight:"1.5"}}>„Kćerka je imala prvi pregled i jedva čeka sljedeći! Ko bi rekao da će dijete moliti da ide zubaru.“</p>
              <div style={{marginTop:"16px",fontSize:"14.5px",fontWeight:"800"}}>Emir H. <span style={{opacity:".55",fontWeight:"700"}}>· tata male Lamije</span></div>
            </div>
            <div data-reveal="" data-delay="60" style={{position:"relative",flex:"1 1 320px",maxWidth:"480px",background:"#FBE7DA",borderRadius:"30px",padding:"26px 28px",transform:"rotate(1.8deg)",boxShadow:"0 22px 40px -24px rgba(61,65,66,.35)"}} className="af3">
              <div style={{color:"#E8836A",fontSize:"17px",letterSpacing:"4px"}}>★★★★★</div>
              <p style={{margin:"12px 0 0",fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18.5px",lineHeight:"1.5"}}>„Profesionalno, brzo i bez čekanja. Kamenac skinut, zubi ko novi. Sve preporuke!“</p>
              <div style={{marginTop:"16px",fontSize:"14.5px",fontWeight:"800"}}>Selma B. <span style={{opacity:".55",fontWeight:"700"}}>· uklanjanje kamenca</span></div>
            </div>
            <div data-reveal="" data-delay="170" style={{position:"relative",flex:"1 1 320px",maxWidth:"480px",background:"#FFFFFF",borderRadius:"30px",padding:"26px 28px",transform:"rotate(-1deg)",marginTop:"10px",boxShadow:"0 22px 40px -24px rgba(61,65,66,.35)"}} className="af4">
              <div style={{color:"#F4A08A",fontSize:"17px",letterSpacing:"4px"}}>★★★★★</div>
              <p style={{margin:"12px 0 0",fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"18.5px",lineHeight:"1.5"}}>„Nova krunica izgleda toliko prirodno da je ni ja ne razlikujem. Hvala na strpljenju i savršenom poslu!“</p>
              <div style={{marginTop:"16px",fontSize:"14.5px",fontWeight:"800"}}>Jasmin M. <span style={{opacity:".55",fontWeight:"700"}}>· protetika</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" style={{background:"#FBF8F1",padding:"clamp(40px,6vw,70px) 0 clamp(80px,11vw,130px)"}}>
        <div style={{maxWidth:"760px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div data-reveal="" style={{textAlign:"center",marginBottom:"clamp(28px,4vw,44px)"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FBE7DA",borderRadius:"999px",padding:"8px 16px",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"12.5px",letterSpacing:".14em",color:"#A05A42"}}>ČESTA PITANJA</div>
            <h2 style={{margin:"16px 0 0",fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(36px,5vw,54px)",lineHeight:"1.02"}}>Pitate nas često</h2>
          </div>
          <Faq />
        </div>
      </section>

      <div style={{background:"#FBF8F1",lineHeight:"0"}}><svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{display:"block",width:"100%",height:"clamp(44px,7vw,90px)"}}><path d="M0,50 C180,90 360,10 560,34 C760,58 900,84 1080,58 C1240,36 1340,20 1440,44 L1440,90 L0,90 Z" fill="#3D4142"></path></svg></div>

      <footer id="kontakt" style={{background:"#3D4142",color:"#F5F0E8",padding:"clamp(30px,5vw,60px) 0 30px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 clamp(18px,4vw,32px)"}}>
          <div style={{display:"flex",gap:"clamp(32px,5vw,64px)",flexWrap:"wrap",alignItems:"flex-start"}}>
            <div style={{flex:"1 1 320px",minWidth:"280px"}}>
              <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                <span style={{fontFamily:"var(--font-fredoka)",fontWeight:"700",fontSize:"clamp(34px,4.5vw,50px)",letterSpacing:".02em",display:"inline-flex",alignItems:"flex-end",color:"#F5F0E8"}}>DR.&nbsp;EK<svg viewBox="0 0 100 100" style={{width:".86em",height:".86em",margin:"0 2px .04em"}}><defs><clipPath id="tcut-f"><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z"></path></clipPath></defs><path d="M50 13C43 6 37 4 30 5C17 8 13 19 14 32C15 44 20 53 24 66C27 77 28 92 36 92C44 92 41 76 50 76C59 76 56 92 64 92C72 92 73 77 76 66C80 53 85 44 86 32C87 19 83 8 70 5C63 4 57 6 50 13Z" fill="#7EAEE8"></path><path d="M8 66C28 80 47 71 59 50C67 36 71 21 73 4" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" clipPath="url(#tcut-f)"></path></svg>EČIĆ</span>
                <span style={{fontSize:"11px",fontWeight:"800",letterSpacing:".34em",color:"#7EAEE8"}}>STOMATOLOŠKA ORDINACIJA</span>
              </div>
              <p style={{margin:"18px 0 0",fontFamily:"var(--font-shantell)",fontWeight:"500",fontSize:"19px",opacity:".9"}}>Osmijeh koji voliš pokazati <span style={{color:"#F4A08A"}}>✦</span></p>
              <div style={{display:"flex",gap:"10px",marginTop:"22px",flexWrap:"wrap"}}>
                <a href="tel:+38737514771" style={{background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"15px",padding:"11px 20px",borderRadius:"999px",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv9">037 514 771</a>
                <a href="viber://chat?number=%2B38737514771" aria-label="Viber" title="Viber" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"42px",height:"42px",border:"2px solid rgba(245,240,232,.4)",borderRadius:"50%",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv10"><svg viewBox="0 0 24 24" style={{width:"20px",height:"20px"}}><path d="M11.4.8C9.5.8 5.4 1.1 3.1 3.2 1.4 4.9.8 7.4.7 10.5c-.06 3.1-.13 8.9 5.5 10.5v2.4s-.04 1 .6 1.2c.8.25 1.24-.5 2-1.3l1.4-1.6c3.85.32 6.8-.42 7.1-.53.8-.25 5.2-.8 5.9-6.6.74-6-.36-9.8-2.3-11.5-.6-.55-3-2.3-8.4-2.3 0 0-.4-.03-1.1 0zm.4 4.3c.17 0 .3.13.3.3s-.13.3-.3.3v.01c-1.55 0-2.85.52-3.9 1.55-1.05 1.02-1.58 2.4-1.6 4.2 0 .17-.14.3-.3.3-.17 0-.3-.14-.3-.3.02-2 .63-3.55 1.8-4.7C8.66 5.63 10.1 5.1 11.8 5.1zm.15 1.8c1.4 0 2.6.46 3.5 1.34.9.88 1.36 2.1 1.35 3.5 0 .17-.14.3-.3.3s-.3-.13-.3-.3c0-1.24-.4-2.3-1.17-3.06-.78-.77-1.8-1.17-3.08-1.18-.16 0-.3-.14-.3-.3 0-.17.14-.3.3-.3zm-4.1.1c.2-.02.42.03.6.15.42.3.85.7 1.28 1.6.5.7.17 1.4-.19 1.7l-.77.62c-.4.3-.35.9-.35.9s1.15 4.36 5.46 5.46l.02-.01s.58.05.9-.34l.62-.78c.29-.38 1-.68 1.7-.19.62.44 1.15.86 1.6 1.28.4.33.48.81.21 1.32v.01c-.28.48-.63.91-1.05 1.27a2.98 2.98 0 0 1-1.72.61c-.16 0-.31-.02-.48-.07v-.01c-.58-.2-1.06-.4-1.85-.83a16.5 16.5 0 0 1-3.72-2.73l-.04-.04-.03-.03-.05-.04-.03-.04a15.85 15.85 0 0 1-2.71-3.7 12 12 0 0 1-.85-1.86l-.02-.02a1.4 1.4 0 0 1-.08-.62c.04-.35.2-.71.5-1.07.36-.43.79-.78 1.27-1.06h.02c.09-.05.19-.08.29-.09zm4.33 1.6c1 .05 1.8.36 2.35.93.55.56.87 1.35.92 2.35a.3.3 0 0 1-.29.32h-.01a.3.3 0 0 1-.3-.29c-.04-.72-.26-1.18-.58-1.5-.32-.32-.77-.54-1.49-.58a.3.3 0 0 1 .01-.6z" fill="#F5F0E8"></path></svg></a>
                <a href="https://wa.me/38737514771" aria-label="WhatsApp" title="WhatsApp" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"42px",height:"42px",border:"2px solid rgba(245,240,232,.4)",borderRadius:"50%",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv10"><svg viewBox="0 0 24 24" style={{width:"20px",height:"20px"}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" fill="#F5F0E8"></path></svg></a>
                <a href="https://www.facebook.com/drKamalaEkmecic" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"42px",height:"42px",border:"2px solid rgba(245,240,232,.4)",borderRadius:"50%",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}} className="hv10"><svg viewBox="0 0 24 24" style={{width:"19px",height:"19px"}}><path d="M13.5 21v-7.4h2.5l.4-2.9h-2.9V8.85c0-.84.23-1.41 1.44-1.41h1.54V4.85c-.27-.04-1.18-.11-2.24-.11-2.22 0-3.74 1.35-3.74 3.83v2.14H8v2.9h2.45V21h3.05Z" fill="#F5F0E8"></path></svg></a>
              </div>
            </div>
            <div style={{flex:"0 1 260px",minWidth:"220px"}}>
              <div style={{fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"17px",marginBottom:"14px"}}>Kontakt</div>
              <div style={{display:"grid",gap:"10px",fontSize:"15px",lineHeight:"1.5",opacity:".85"}}>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span>Bolnička bb,<br />77220 Cazin, BiH</div>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span>037 514 771</div>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span><a href="mailto:ekmecic.kamala@gmail.com" style={{color:"#F5F0E8",textDecoration:"underline",textUnderlineOffset:"3px",wordBreak:"break-all"}}>ekmecic.kamala@gmail.com</a></div>
                <div style={{display:"flex",gap:"10px"}}><span style={{color:"#7EAEE8"}}>✦</span>Pon–Pet · pogledaj <a href="#radno-vrijeme" style={{color:"#F5F0E8",textDecoration:"underline",textUnderlineOffset:"3px"}}>radno vrijeme</a></div>
              </div>
            </div>
            <LocationMap />
          </div>
          <div style={{display:"flex",justifyContent:"space-between",gap:"16px",flexWrap:"wrap",marginTop:"44px",paddingTop:"20px",borderTop:"1px solid rgba(245,240,232,.14)",fontSize:"13.5px",opacity:".65"}}>
            <span>© 2026 Opća stomatološka ordinacija, vl. dr. Kamala Ekmečić</span>
            <span>Napravljeno s osmijehom <span style={{color:"#F4A08A"}}>✦</span></span>
          </div>
        </div>
      </footer>
      </main>

      <div id="sticky-bar" style={{display:"none",position:"fixed",left:"0",right:"0",bottom:"0",zIndex:"95",gap:"10px",padding:"10px 14px calc(10px + env(safe-area-inset-bottom))",background:"rgba(245,240,232,.92)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderTop:"2px solid rgba(61,65,66,.1)"}}>
        <a href="tel:+38737514771" style={{flex:"1",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"#3D4142",color:"#F5F0E8",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"16px",padding:"14px",borderRadius:"999px"}}>Pozovi</a>
        <a href="#zakazivanje" style={{flex:"1.3",display:"flex",alignItems:"center",justifyContent:"center",background:"#7EAEE8",color:"#243038",fontFamily:"var(--font-fredoka)",fontWeight:"600",fontSize:"16px",padding:"14px",borderRadius:"999px"}}>Zakaži termin</a>
      </div>
    </>
  );
}
