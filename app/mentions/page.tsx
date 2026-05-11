"use client";

import Link from "next/link";
import { LogoFull, BgElements } from "@/components/ui";

export default function MentionsPage() {
  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",fontFamily:"var(--font)"}}>
      <BgElements/>
      <nav style={{position:"relative",zIndex:10,maxWidth:1000,margin:"0 auto",padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link href="/"><LogoFull size={28}/></Link>
        <Link href="/" className="btn-g" style={{padding:"7px 18px",fontSize:13}}>Retour</Link>
      </nav>
      <div style={{maxWidth:600,margin:"0 auto",padding:"60px 28px 80px",position:"relative",zIndex:5}}>
        <h1 className="anim a1" style={{fontSize:32,fontWeight:700,letterSpacing:"-1px",marginBottom:32}}>Mentions légales</h1>
        {[
          {t:"Éditeur",d:"RewriteAI est édité par [Votre nom / raison sociale], [adresse], [SIRET]. Directeur de la publication : [Votre nom]."},
          {t:"Hébergement",d:"Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis."},
          {t:"Propriété intellectuelle",d:"L'ensemble du contenu (textes, logos, design) est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite."},
          {t:"Données personnelles",d:"Les données collectées (email, historique) sont utilisées uniquement pour le fonctionnement du service. Conformément au RGPD, vous pouvez exercer vos droits en nous contactant."},
          {t:"Cookies",d:"Le site utilise des cookies strictement nécessaires au fonctionnement. Aucun cookie publicitaire n'est utilisé."},
          {t:"Responsabilité",d:"RewriteAI ne garantit pas l'exactitude des textes générés par l'IA. L'utilisateur reste responsable de l'usage qu'il fait des résultats."},
        ].map((s,i)=>(
          <div key={i} className={`anim a${Math.min(i+2,7)}`} style={{marginBottom:24}}>
            <h3 style={{fontSize:15,fontWeight:600,marginBottom:6}}>{s.t}</h3>
            <p style={{fontSize:14,color:"var(--fg2)",lineHeight:1.65}}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
