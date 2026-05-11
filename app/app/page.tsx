"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoFull, BgElements } from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";

export default function AppPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [selected, setSelected] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState("");
  const [remaining, setRemaining] = useState(5);
  const isPro = false;

  const toggleMode = (catId: string, modeId: string) => {
    setSelected(prev => ({ ...prev, [catId]: prev[catId] === modeId ? null : modeId }));
  };

  const activeSelections = Object.entries(selected).filter(([_, v]) => v) as [string, string][];

  const getLabels = () => activeSelections.map(([c, m]) => {
    const cat = CATEGORIES.find(x => x.id === c);
    return cat?.modes.find(x => x.id === m)?.label;
  }).filter(Boolean);

  const transform = async () => {
    if (!text.trim() || loading) return;
    setLoading(true); setErr(""); setResult("");

    const modes = activeSelections.map(([_, m]) => m);
    if (modes.length === 0) modes.push("professionnel");

    try {
      const r = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, modes }),
      });
      const d = await r.json();
      if (d.error) { setErr(d.error); }
      else { setResult(d.result); if (d.remaining !== undefined) setRemaining(d.remaining); }
    } catch { setErr("Problème de connexion."); }
    finally { setLoading(false); }
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const labels = getLabels();

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",fontFamily:"var(--font)"}}>
      <BgElements/>

      {/* Nav */}
      <nav className="anim a1" style={{position:"relative",zIndex:10,borderBottom:"1px solid var(--border)",padding:"0 24px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link href="/"><LogoFull size={22}/></Link>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:12,color:"var(--fg3)"}}>{remaining >= 0 ? `${remaining} restantes` : "Illimité"}</span>
          <button className="btn-g" style={{padding:"4px 14px",fontSize:12,borderColor:"rgba(99,102,241,.2)",color:"var(--accent2)",background:"rgba(99,102,241,.06)"}}>Passer Pro</button>
        </div>
      </nav>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 24px",position:"relative",zIndex:5}}>

        {/* Mode selector */}
        <div className="anim a2" style={{marginBottom:16}}>
          {CATEGORIES.map(cat => (
            <div key={cat.id} style={{marginBottom:8,padding:"10px 14px",borderRadius:8,background:selected[cat.id]?cat.bg:"transparent",border:`1px solid ${selected[cat.id]?cat.border:"transparent"}`,transition:"all .25s ease"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:cat.color}}/>
                <span style={{fontSize:10,fontWeight:600,color:cat.color,textTransform:"uppercase",letterSpacing:"1px"}}>{cat.label}</span>
                {selected[cat.id] && (
                  <span style={{fontSize:10,padding:"1px 8px",borderRadius:4,background:cat.color,color:"#fff",fontWeight:600,marginLeft:"auto",animation:"fadeUp .3s ease"}}>{cat.modes.find(m=>m.id===selected[cat.id])?.label}</span>
                )}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {cat.modes.map(m => {
                  const on = selected[cat.id] === m.id;
                  const lk = !m.free && !isPro;
                  return (
                    <button key={m.id} className={`mb ${lk?"lk":""}`} onClick={()=>!lk&&toggleMode(cat.id,m.id)} title={lk?"Plan Pro requis":""}
                      style={{fontWeight:on?600:400,border:`1px solid ${on?cat.color:"var(--border)"}`,background:on?cat.color:undefined,color:on?"#fff":lk?"var(--fg3)":undefined,boxShadow:on?`0 0 14px ${cat.color}30`:"none"}}>
                      {m.label}{lk&&" ✦"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Combo bar */}
        {labels.length > 0 && (
          <div className="anim a3" style={{marginBottom:12,padding:"8px 14px",borderRadius:8,background:"var(--bg2)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:"var(--fg3)",fontWeight:500}}>Combo :</span>
            {activeSelections.map(([c, m]) => {
              const cat = CATEGORIES.find(x => x.id === c);
              const mode = cat?.modes.find(x => x.id === m);
              return <span key={c} style={{fontSize:11,padding:"2px 10px",borderRadius:4,background:cat?.bg,border:`1px solid ${cat?.border}`,color:cat?.color,fontWeight:600}}>{mode?.label}</span>;
            })}
          </div>
        )}

        {/* Editor */}
        <div className="anim a4" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {/* Source */}
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,display:"flex",flexDirection:"column"}}>
            <div style={{padding:"10px 16px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10,fontWeight:600,color:"var(--fg3)",textTransform:"uppercase",letterSpacing:".8px"}}>Source</span>
              <span style={{fontSize:11,color:text.length>4500?"#f87171":"var(--fg3)"}}>{text.length.toLocaleString()} / 5 000</span>
            </div>
            <textarea value={text} onChange={e=>setText(e.target.value.slice(0,5000))} placeholder="Colle ton texte ici..." style={{flex:1,minHeight:220,padding:16}}/>
            <div style={{padding:"10px 16px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <button onClick={()=>{setText("");setResult("");setErr("")}} style={{background:"none",border:"none",color:"var(--fg3)",fontSize:12,cursor:"pointer",fontFamily:"var(--font)"}}>Effacer</button>
              <button className="btn-m" onClick={transform} disabled={!text.trim()||loading} style={{padding:"8px 22px",fontSize:13}}>
                {loading && <span style={{width:14,height:14,border:"2px solid rgba(255,255,255,.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .5s linear infinite",display:"inline-block"}}/>}
                {loading?"En cours...":"Transformer"}
              </button>
            </div>
          </div>

          {/* Result */}
          <div style={{background:"var(--bg2)",border:`1px solid ${result?"rgba(45,212,191,.2)":"var(--border)"}`,borderRadius:10,display:"flex",flexDirection:"column",transition:"border-color .3s ease"}}>
            <div style={{padding:"10px 16px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10,fontWeight:600,color:result?"var(--teal)":"var(--fg3)",textTransform:"uppercase",letterSpacing:".8px",transition:"color .3s"}}>
                Résultat{labels.length>0?` — ${labels.join(" + ")}`:""}
              </span>
              {result && (
                <button onClick={copy} style={{background:"none",border:"none",color:copied?"var(--teal)":"var(--fg2)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--font)"}}>
                  {copied?"Copié !":"Copier"}
                </button>
              )}
            </div>
            <textarea value={result} readOnly placeholder="Le résultat apparaîtra ici..." style={{flex:1,minHeight:220,padding:16,background:result?"rgba(45,212,191,.03)":"transparent",transition:"background .3s ease",animation:result?"resultIn .4s ease":"none"}}/>
            {err && <div style={{padding:"10px 16px",borderTop:"1px solid rgba(248,113,113,.2)",fontSize:13,color:"#f87171"}}>{err}</div>}
          </div>
        </div>

        <p className="anim a5" style={{textAlign:"center",marginTop:14,fontSize:12,color:"var(--fg3)"}}>Choisis un mode par catégorie pour les combiner</p>
      </div>
    </div>
  );
}
