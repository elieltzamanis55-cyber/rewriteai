"use client";

import Link from "next/link";
import { LogoFull, BgElements, Footer, ArrowIcon } from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";

export default function Home() {
  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",fontFamily:"var(--font)"}}>
      <BgElements/>

      {/* Nav */}
      <nav className="anim a1" style={{position:"sticky",top:0,zIndex:50,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",background:"rgba(11,11,15,0.8)",borderBottom:"1px solid var(--border)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 32px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <LogoFull size={28}/>
          <div style={{display:"flex",alignItems:"center",gap:24}}>
            <a href="#fonctionnalites" className="lh" style={{fontSize:14,fontWeight:500}}>Fonctionnalités</a>
            <a href="#tarifs" className="lh" style={{fontSize:14,fontWeight:500}}>Tarifs</a>
            <Link href="/auth/signin" className="lh" style={{fontSize:14,fontWeight:500}}>Connexion</Link>
            <Link href="/app" className="btn-m" style={{padding:"8px 20px",fontSize:13}}>Tester gratuitement</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{position:"relative",zIndex:5,maxWidth:900,margin:"0 auto",padding:"120px 32px 64px",textAlign:"center"}}>
        <div className="anim a1" style={{display:"inline-flex",padding:"6px 16px",borderRadius:20,background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.15)",marginBottom:24}}>
          <span style={{fontSize:13,color:"var(--accent2)",fontWeight:500}}>37 modes de transformation combinables</span>
        </div>
        <h1 className="anim a2" style={{fontSize:"clamp(40px,7vw,68px)",fontWeight:700,lineHeight:1.05,letterSpacing:"-3px",margin:"0 0 24px"}}>
          Colle ton texte.<br/><span style={{background:"linear-gradient(135deg, #818cf8, #2dd4bf)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Il ressort propre.</span>
        </h1>
        <p className="anim a3" style={{fontSize:18,lineHeight:1.7,color:"var(--fg2)",maxWidth:520,margin:"0 auto 40px"}}>
          Adapte le ton, le format, le style et la langue en même temps. Tu choisis, l&apos;IA réécrit instantanément.
        </p>
        <div className="anim a4" style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/app" className="btn-m" style={{padding:"12px 28px",fontSize:15}}>Tester gratuitement <ArrowIcon/></Link>
          <a href="#fonctionnalites" className="btn-g" style={{padding:"12px 28px",fontSize:15}} onClick={(e)=>{e.preventDefault();document.getElementById("fonctionnalites")?.scrollIntoView({behavior:"smooth"})}}>Découvrir</a>
        </div>
      </section>

      {/* Demo card */}
      <section className="anim a5" style={{maxWidth:800,margin:"0 auto",padding:"0 32px 100px",position:"relative",zIndex:5}}>
        <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,0.03) inset"}}>
          <div style={{padding:"12px 18px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:7}}>
              <div style={{width:12,height:12,borderRadius:"50%",background:"#ff5f57"}}/>
              <div style={{width:12,height:12,borderRadius:"50%",background:"#febc2e"}}/>
              <div style={{width:12,height:12,borderRadius:"50%",background:"#28c840"}}/>
            </div>
            <div style={{display:"flex",gap:6}}>
              {[{l:"Pro",c:"#6366f1",b:"rgba(99,102,241,.12)"},{l:"Email",c:"#2dd4bf",b:"rgba(45,212,191,.12)"},{l:"Corriger",c:"#f59e0b",b:"rgba(245,158,11,.12)"}].map(t=>(
                <span key={t.l} style={{fontSize:11,padding:"3px 10px",borderRadius:5,background:t.b,color:t.c,fontWeight:600}}>{t.l}</span>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
            <div style={{padding:"24px 22px",borderRight:"1px solid var(--border)"}}>
              <p style={{fontSize:11,fontWeight:600,color:"var(--fg3)",textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:12}}>Entrée</p>
              <p style={{fontSize:14,lineHeight:1.7,color:"var(--fg2)"}}>salut est ce que tu pe decaler la reunion de 2main a jeudi stp jai un truc de prevu</p>
            </div>
            <div style={{padding:"24px 22px",background:"rgba(45,212,191,.03)"}}>
              <p style={{fontSize:11,fontWeight:600,color:"var(--teal)",textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:12}}>Résultat</p>
              <p style={{fontSize:14,lineHeight:1.7,color:"var(--fg)"}}>Objet : Report de notre réunion<br/><br/>Bonjour,<br/><br/>Serait-il possible de reporter notre réunion prévue demain au jeudi ? J&apos;ai un engagement qui entre en conflit avec le créneau initial.<br/><br/>Merci pour ta compréhension,<br/>Cordialement</p>
            </div>
          </div>
        </div>
        <p style={{textAlign:"center",marginTop:14,fontSize:13,color:"var(--fg3)"}}>3 modes combinés : ton pro + format email + correction</p>
      </section>

      {/* Stats */}
      <section className="anim a6" style={{maxWidth:800,margin:"0 auto",padding:"0 32px 80px",position:"relative",zIndex:5}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {n:"37",l:"modes",d:"combinables entre eux"},
            {n:"5",l:"catégories",d:"ton, format, style, modifier, langue"},
            {n:"0 €",l:"pour commencer",d:"5 transformations par jour"},
          ].map((s,i)=>(
            <div key={i} style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,padding:"24px 20px",textAlign:"center"}}>
              <p style={{fontSize:28,fontWeight:700,letterSpacing:"-1px",color:"var(--accent2)",marginBottom:4}}>{s.n}</p>
              <p style={{fontSize:14,fontWeight:600,marginBottom:2}}>{s.l}</p>
              <p style={{fontSize:12,color:"var(--fg3)"}}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalites" style={{maxWidth:800,margin:"0 auto",padding:"0 32px 80px",position:"relative",zIndex:5}}>
        <h2 className="anim a6" style={{fontSize:28,fontWeight:700,letterSpacing:"-1px",marginBottom:40,textAlign:"center"}}>Comment ça marche</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {n:"1",t:"Colle ton texte",d:"N'importe quel brouillon : email, message, paragraphe, post. Même bourré de fautes.",c:"#6366f1",bg:"rgba(99,102,241,.08)"},
            {n:"2",t:"Combine les modes",d:"Un mode par catégorie. Pro + Email + Corriger, ou Casual + SMS + Espagnol. Les combinaisons sont infinies.",c:"#2dd4bf",bg:"rgba(45,212,191,.08)"},
            {n:"3",t:"Copie ou modifie",d:"Le texte sort prêt à l'emploi. Tu peux le modifier directement dans l'interface, puis copier.",c:"#f59e0b",bg:"rgba(245,158,11,.08)"},
          ].map((s,i)=>(
            <div key={i} style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,padding:"24px 20px"}}>
              <span style={{display:"inline-flex",width:36,height:36,borderRadius:10,background:s.bg,alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:s.c,marginBottom:14}}>{s.n}</span>
              <p style={{fontWeight:600,fontSize:16,marginBottom:6}}>{s.t}</p>
              <p style={{fontSize:13,color:"var(--fg2)",lineHeight:1.6}}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modes */}
      <section style={{maxWidth:800,margin:"0 auto",padding:"0 32px 80px",position:"relative",zIndex:5}}>
        <h2 style={{fontSize:28,fontWeight:700,letterSpacing:"-1px",marginBottom:32,textAlign:"center"}}>Tous les modes</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
          {CATEGORIES.map(cat=>(
            <div key={cat.id} style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,padding:"18px 20px"}}>
              <span style={{fontSize:12,fontWeight:600,color:cat.color,textTransform:"uppercase",letterSpacing:"1px",display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:cat.color}}/>{cat.label}
              </span>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {cat.modes.map(m=>(
                  <span key={m.id} style={{padding:"5px 12px",borderRadius:6,fontSize:12,fontWeight:500,background:cat.bg,border:`1px solid ${cat.border}`,color:cat.color,opacity:m.free?1:.45}}>
                    {m.label}{!m.free&&" ✦"}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{fontSize:12,color:"var(--fg3)",marginTop:12,textAlign:"center"}}>✦ Disponible avec le plan Pro</p>
      </section>

      {/* Install desktop */}
      <section style={{maxWidth:700,margin:"0 auto",padding:"0 32px 80px",position:"relative",zIndex:5}}>
        <div style={{background:"linear-gradient(135deg, rgba(99,102,241,0.06), rgba(45,212,191,0.04))",border:"1px solid rgba(99,102,241,0.12)",borderRadius:16,padding:"32px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24}}>
          <div>
            <p style={{fontWeight:600,fontSize:17,marginBottom:6}}>Installer sur ton bureau</p>
            <p style={{fontSize:14,color:"var(--fg2)",lineHeight:1.6}}>Accède à RewriteAI directement depuis ton bureau, sans navigateur. Mac et Windows.</p>
          </div>
          <button className="btn-g" style={{whiteSpace:"nowrap",padding:"10px 22px"}}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Installer
          </button>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" style={{maxWidth:700,margin:"0 auto",padding:"0 32px 80px",position:"relative",zIndex:5}}>
        <h2 style={{fontSize:28,fontWeight:700,letterSpacing:"-1px",marginBottom:32,textAlign:"center"}}>Tarifs simples</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:14,padding:"28px 24px"}}>
            <p style={{fontSize:14,fontWeight:600,marginBottom:6}}>Gratuit</p>
            <p style={{fontSize:36,fontWeight:700,letterSpacing:"-2px"}}>0 €</p>
            <p style={{fontSize:13,color:"var(--fg3)",marginBottom:24}}>5 par jour · 500 caractères</p>
            <div style={{fontSize:14,color:"var(--fg2)",lineHeight:2.2}}>Modes de base<br/>Sans inscription<br/>Combinaison libre</div>
            <Link href="/auth/register" className="btn-g" style={{width:"100%",justifyContent:"center",marginTop:24,padding:"10px 0"}}>S&apos;inscrire</Link>
          </div>
          <div style={{background:"var(--bg2)",border:"1px solid rgba(99,102,241,.3)",borderRadius:14,padding:"28px 24px",position:"relative",boxShadow:"0 0 60px rgba(99,102,241,.08)"}}>
            <span style={{position:"absolute",top:-10,right:20,fontSize:11,padding:"4px 12px",borderRadius:6,background:"var(--accent)",color:"#fff",fontWeight:600}}>Populaire</span>
            <p style={{fontSize:14,fontWeight:600,color:"var(--accent2)",marginBottom:6}}>Pro</p>
            <p style={{fontSize:36,fontWeight:700,letterSpacing:"-2px"}}>3,99 € <span style={{fontSize:14,fontWeight:400,color:"var(--fg3)"}}>/mois</span></p>
            <p style={{fontSize:13,color:"var(--fg3)",marginBottom:24}}>Illimité · 5 000 caractères</p>
            <div style={{fontSize:14,color:"var(--fg2)",lineHeight:2.2}}>Tous les modes<br/>Historique sauvegardé<br/>Support prioritaire</div>
            <Link href="/auth/register" className="btn-m" style={{width:"100%",justifyContent:"center",marginTop:24,padding:"10px 0"}}>S&apos;inscrire au Pro</Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{maxWidth:1200,margin:"0 auto",padding:"56px 32px",borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:5}}>
        <div>
          <p style={{fontSize:20,fontWeight:700,letterSpacing:"-.5px",marginBottom:4}}>Prêt à reformuler ?</p>
          <p style={{fontSize:14,color:"var(--fg2)"}}>Gratuit, sans carte bancaire.</p>
        </div>
        <Link href="/app" className="btn-m" style={{padding:"12px 28px",fontSize:15}}>Tester gratuitement</Link>
      </section>

      <Footer/>
    </div>
  );
}
