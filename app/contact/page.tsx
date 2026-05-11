"use client";

import Link from "next/link";
import { LogoFull, BgElements } from "@/components/ui";

export default function ContactPage() {
  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",fontFamily:"var(--font)"}}>
      <BgElements/>
      <nav style={{position:"relative",zIndex:10,maxWidth:1000,margin:"0 auto",padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link href="/"><LogoFull size={28}/></Link>
        <Link href="/" className="btn-g" style={{padding:"7px 18px",fontSize:13}}>Retour</Link>
      </nav>
      <div style={{maxWidth:480,margin:"0 auto",padding:"60px 28px 80px",position:"relative",zIndex:5}}>
        <h1 className="anim a1" style={{fontSize:32,fontWeight:700,letterSpacing:"-1px",marginBottom:8}}>Contact</h1>
        <p className="anim a2" style={{fontSize:14,color:"var(--fg2)",marginBottom:32,lineHeight:1.6}}>Une question, un bug, une suggestion ? Écris-nous.</p>
        <div className="anim a3" style={{display:"flex",flexDirection:"column",gap:12}}>
          <input type="text" placeholder="Ton nom"/>
          <input type="email" placeholder="Ton email"/>
          <textarea placeholder="Ton message" rows={5} style={{padding:"10px 14px",borderRadius:8,border:"1px solid var(--border)",background:"var(--bg2)"}}/>
          <button className="btn-m" style={{width:"100%",justifyContent:"center",padding:"11px 0"}}>Envoyer</button>
        </div>
        <p className="anim a4" style={{fontSize:12,color:"var(--fg3)",marginTop:16}}>Ou directement : contact@rewriteai.fr</p>
      </div>
    </div>
  );
}
