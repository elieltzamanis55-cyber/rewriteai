"use client";

import Link from "next/link";
import { LogoFull, BgElements, Footer, ArrowIcon } from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";

export default function Home() {
  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",fontFamily:"var(--font)"}}>
      <BgElements/>

      {/* Nav */}
      <nav className="anim a1" style={{position:"relative",zIndex:10,maxWidth:1000,margin:"0 auto",padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <LogoFull size={28}/>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          <a href="#fonctionnalites" className="lh" style={{fontSize:13,fontWeight:500}}>Fonctionnalités</a>
          <a href="#tarifs" className="lh" style={{fontSize:13,fontWeight:500}}>Tarifs</a>
          <Link href="/app" className="btn-m" style={{padding:"7px 18px",fontSize:13}}>Tester gratuitement</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{position:"relative",zIndex:5,maxWidth:660,margin:"0 auto",padding:"100px 28px 56px"}}>
        <h1 className="anim a2" style={{fontSize:"clamp(36px,6vw,56px)",fontWeight:700,lineHeight:1.1,letterSpacing:"-2px",margin:"0 0 20px"}}>
          Colle ton texte.<br/><span style={{color:"var(--accent2)"}}>Il ressort propre.</span>
        </h1>
        <p className="anim a3" style={{fontSize:17,lineHeight:1.65,color:"var(--fg2)",maxWidth:480,margin:"0 0 36px"}}>
          Adapte le ton, le format, le style et la langue en même temps. Tu choisis, l&apos;IA réécrit. Gratuit, sans inscription.
        </p>
        <div className="anim a4" style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <Link href="/app" className="btn-m">Tester gratuitement <ArrowIcon/></Link>
          <a href="#fonctionnalites" className="btn-g" onClick={(e)=>{e.preventDefault();document.getElementById("fonctionnalites")?.scrollIntoView({behavior:"smooth"})}}>Découvrir</a>
        </div>
      </section>

      {/* Demo card */}
      <section className="anim a5" style={{maxWidth:700,margin:"0 auto",padding:"0 28px 80px",position:"relative",zIndex:5}}>
        <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,overflow:"hidden",boxShadow:"0 12px 48px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)"}}>
          <div style={{padding:"10px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#ff5f57"}}/>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#febc2e"}}/>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#28c840"}}/>
            </div>
            <div style={{display:"flex",gap:6}}>
              {[{l:"Pro",c:"#6366f1",b:"rgba(99,102,241,.12)"},{l:"Email",c:"#2dd4bf",b:"rgba(45,212,191,.12)"},{l:"Corriger",c:"#f59e0b",b:"rgba(245,158,11,.12)"}].map(t=>(
                <span key={t.l} style={{fontSize:10,padding:"2px 8px",borderRadius:4,background:t.b,color:t.c,fontWeight:600}}>{t.l}</span>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
            <div style={{padding:"20px 18px",borderRight:"1px solid var(--border)"}}>
              <p style={{fontSize:10,fontWeight:600,color:"var(--fg3)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>Entrée</p>
              <p style={{fontSize:13,lineHeight:1.65,color:"var(--fg2)"}}>salut est ce que tu pe decaler la reunion de 2main a jeudi stp jai un truc de prevu</p>
            </div>
            <div style={{padding:"20px 18px",background:"rgba(45,212,191,.03)"}}>
              <p style={{fontSize:10,fontWeight:600,color:"var(--teal)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>Résultat</p>
              <p style={{fontSize:13,lineHeight:1.65,color:"var(--fg)"}}>Objet : Report de notre réunion<br/><br/>Bonjour,<br/><br/>Serait-il possible de reporter notre réunion prévue demain au jeudi ? J&apos;ai un engagement qui entre en conflit avec le créneau initial.<br/><br/>Merci pour ta compréhension,<br/>Cordialement</p>
            </div>
          </div>
        </div>
        <p style={{textAlign:"center",marginTop:12,fontSize:12,color:"var(--fg3)"}}>3 modes combinés : ton pro + format email + correction</p>
      </section>

      {/* Features */}
      <section id="fonctionnalites" className="anim a6" style={{maxWidth:660,margin:"0 auto",padding:"0 28px 80px",position:"relative",zIndex:5}}>
        <h2 style={{fontSize:24,fontWeight:700,letterSpacing:"-.8px",marginBottom:32}}>Comment ça marche</h2>
        {[
          {n:"1",t:"Colle ton texte",d:"N'importe quel brouillon : email, message, paragraphe, post.",c:"#6366f1",bg:"rgba(99,102,241,.1)"},
          {n:"2",t:"Combine les modes",d:"Un mode par catégorie. Pro + Email + Corriger, ou Casual + SMS + Espagnol.",c:"#2dd4bf",bg:"rgba(45,212,191,.1)"},
          {n:"3",t:"Copie le résultat",d:"Le texte sort prêt à l'emploi. Un clic pour copier-coller.",c:"#f59e0b",bg:"rgba(245,158,11,.1)"},
        ].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:16,alignItems:"flex-start",padding:"18px 0",borderBottom:i<2?"1px solid var(--border)":"none"}}>
            <span style={{minWidth:32,height:32,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:s.c}}>{s.n}</span>
            <div><p style={{fontWeight:600,fontSize:15,marginBottom:2}}>{s.t}</p><p style={{fontSize:13,color:"var(--fg2)",lineHeight:1.55}}>{s.d}</p></div>
          </div>
        ))}
      </section>

      {/* Modes */}
      <section style={{maxWidth:660,margin:"0 auto",padding:"0 28px 80px",position:"relative",zIndex:5}}>
        <h2 className="anim a6" style={{fontSize:24,fontWeight:700,letterSpacing:"-.8px",marginBottom:24}}>Tous les modes</h2>
        {CATEGORIES.map(cat=>(
          <div key={cat.id} style={{marginBottom:16}}>
            <span style={{fontSize:11,fontWeight:600,color:cat.color,textTransform:"uppercase",letterSpacing:"1px",display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:cat.color}}/>{cat.label}
            </span>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {cat.modes.map(m=>(
                <span key={m.id} style={{padding:"5px 12px",borderRadius:6,fontSize:12,fontWeight:500,background:cat.bg,border:`1px solid ${cat.border}`,color:cat.color,opacity:m.free?1:.5}}>
                  {m.label}{!m.free&&" ✦"}
                </span>
              ))}
            </div>
          </div>
        ))}
        <p style={{fontSize:12,color:"var(--fg3)",marginTop:8}}>✦ Disponible avec le plan Pro</p>
      </section>

      {/* Install desktop */}
      <section style={{maxWidth:560,margin:"0 auto",padding:"0 28px 80px",position:"relative",zIndex:5}}>
        <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,padding:"28px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20}}>
          <div>
            <p style={{fontWeight:600,fontSize:15,marginBottom:4}}>Installer sur ton bureau</p>
            <p style={{fontSize:13,color:"var(--fg2)",lineHeight:1.5}}>Accède à RewriteAI depuis ton bureau, sans navigateur. Mac et Windows.</p>
          </div>
          <button className="btn-g" style={{whiteSpace:"nowrap",padding:"9px 20px"}}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Installer
          </button>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" style={{maxWidth:560,margin:"0 auto",padding:"0 28px 80px",position:"relative",zIndex:5}}>
        <h2 style={{fontSize:24,fontWeight:700,letterSpacing:"-.8px",marginBottom:24}}>Tarifs</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,padding:"24px 20px"}}>
            <p style={{fontSize:13,fontWeight:600,marginBottom:4}}>Gratuit</p>
            <p style={{fontSize:32,fontWeight:700,letterSpacing:"-1.5px"}}>0 €</p>
            <p style={{fontSize:12,color:"var(--fg3)",marginBottom:20}}>5 par jour, 500 caractères</p>
            <div style={{fontSize:13,color:"var(--fg2)",lineHeight:2.2}}>Modes de base<br/>Sans inscription<br/>Combinaison libre</div>
            <Link href="/auth/register" className="btn-g" style={{width:"100%",justifyContent:"center",marginTop:20,padding:"9px 0"}}>S&apos;inscrire</Link>
          </div>
          <div style={{background:"var(--bg2)",border:"1px solid rgba(99,102,241,.25)",borderRadius:10,padding:"24px 20px",boxShadow:"0 0 48px rgba(99,102,241,.06)"}}>
            <p style={{fontSize:13,fontWeight:600,color:"var(--accent2)",marginBottom:4}}>Pro</p>
            <p style={{fontSize:32,fontWeight:700,letterSpacing:"-1.5px"}}>3,99 € <span style={{fontSize:13,fontWeight:400,color:"var(--fg3)"}}>/mois</span></p>
            <p style={{fontSize:12,color:"var(--fg3)",marginBottom:20}}>Illimité, 5 000 caractères</p>
            <div style={{fontSize:13,color:"var(--fg2)",lineHeight:2.2}}>Tous les modes<br/>Historique sauvegardé<br/>Support prioritaire</div>
            <Link href="/auth/register" className="btn-m" style={{width:"100%",justifyContent:"center",marginTop:20,padding:"9px 0"}}>S&apos;inscrire au Pro</Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{maxWidth:660,margin:"0 auto",padding:"48px 28px",borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:5}}>
        <div>
          <p style={{fontSize:18,fontWeight:700,letterSpacing:"-.5px",marginBottom:4}}>Prêt à reformuler ?</p>
          <p style={{fontSize:13,color:"var(--fg2)"}}>Gratuit, sans carte bancaire.</p>
        </div>
        <Link href="/app" className="btn-m">Tester gratuitement</Link>
      </section>

      <Footer/>
    </div>
  );
}
