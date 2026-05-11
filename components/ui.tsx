import Link from "next/link";

export const Logo = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="url(#rw-lg)" />
    <defs><linearGradient id="rw-lg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs>
    <path d="M12 14h10M12 20h16M12 26h12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M30 13l-3 3 3 3" stroke="#c7d2fe" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LogoFull = ({ size = 30 }: { size?: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <Logo size={size} />
    <span style={{ fontWeight: 700, fontSize: size * 0.57, letterSpacing: "-0.4px", color: "var(--fg)" }}>
      Rewrite<span style={{ color: "#818cf8" }}>AI</span>
    </span>
  </div>
);

export const BgElements = () => (
  <>
    <div className="bg-grid" />
    <div className="bg-glow" />
    <div className="bg-line-l" />
    <div className="bg-line-r" />
    <div style={{ position:"fixed",top:"20%",right:"12%",width:6,height:6,borderRadius:"50%",background:"rgba(99,102,241,0.25)",pointerEvents:"none",zIndex:0 }}/>
    <div style={{ position:"fixed",top:"60%",left:"8%",width:4,height:4,borderRadius:"50%",background:"rgba(45,212,191,0.25)",pointerEvents:"none",zIndex:0 }}/>
    <div style={{ position:"fixed",top:"75%",right:"20%",width:8,height:8,borderRadius:2,border:"1px solid rgba(236,72,153,0.12)",pointerEvents:"none",zIndex:0,transform:"rotate(45deg)" }}/>
    <div style={{ position:"fixed",top:"35%",left:"15%",width:12,height:12,borderRadius:3,border:"1px solid rgba(99,102,241,0.1)",pointerEvents:"none",zIndex:0 }}/>
  </>
);

export const Footer = () => (
  <footer style={{borderTop:"1px solid var(--border)",padding:"24px 28px",maxWidth:1000,margin:"0 auto",position:"relative",zIndex:5}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:20}}>
      <div><LogoFull size={22}/><p style={{fontSize:12,color:"var(--fg3)",marginTop:8,maxWidth:260,lineHeight:1.5}}>Outil de réécriture propulsé par l&apos;intelligence artificielle. Conçu en France.</p></div>
      <div style={{display:"flex",gap:32}}>
        <div><p style={{fontSize:11,fontWeight:600,color:"var(--fg3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:10}}>Produit</p><div style={{display:"flex",flexDirection:"column",gap:6}}><a href="#fonctionnalites" className="lh" style={{fontSize:13}}>Fonctionnalités</a><a href="#tarifs" className="lh" style={{fontSize:13}}>Tarifs</a></div></div>
        <div><p style={{fontSize:11,fontWeight:600,color:"var(--fg3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:10}}>Légal</p><div style={{display:"flex",flexDirection:"column",gap:6}}><Link href="/mentions" className="lh" style={{fontSize:13}}>Mentions légales</Link><Link href="/contact" className="lh" style={{fontSize:13}}>Contact</Link></div></div>
      </div>
    </div>
    <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid var(--border)",fontSize:12,color:"var(--fg3)"}}>© 2026 RewriteAI. Tous droits réservés.</div>
  </footer>
);

export const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
