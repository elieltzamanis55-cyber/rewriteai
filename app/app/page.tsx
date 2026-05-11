"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { LogoFull, BgElements } from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";

export default function AppPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [originalResult, setOriginalResult] = useState("");
  const [selected, setSelected] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState("");
  const [remaining, setRemaining] = useState(5);
  const [edited, setEdited] = useState(false);
  const isPro = false;
  const resultRef = useRef<HTMLTextAreaElement>(null);

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
    setLoading(true); setErr(""); setResult(""); setEdited(false);

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
      else {
        setResult(d.result);
        setOriginalResult(d.result);
        if (d.remaining !== undefined) setRemaining(d.remaining);
      }
    } catch { setErr("Problème de connexion."); }
    finally { setLoading(false); }
  };

  const handleResultChange = (val: string) => {
    setResult(val);
    setEdited(val !== originalResult);
  };

  const resetResult = () => {
    setResult(originalResult);
    setEdited(false);
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const labels = getLabels();
  const wordCount = result.trim() ? result.trim().split(/\s+/).length : 0;

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--fg)",fontFamily:"var(--font)"}}>
      <BgElements/>

      {/* Nav */}
      <nav className="anim a1" style={{position:"sticky",top:0,zIndex:50,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",background:"rgba(11,11,15,0.8)",borderBottom:"1px solid var(--border)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 28px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Link href="/" style={{textDecoration:"none"}}><LogoFull size={22}/></Link>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:12,color:"var(--fg3)",padding:"4px 10px",borderRadius:6,background:"var(--bg2)",border:"1px solid var(--border)"}}>
              {remaining >= 0 ? `${remaining}/5 restantes` : "∞ Illimité"}
            </span>
            <Link href="/auth/signin" className="lh" style={{fontSize:13,fontWeight:500}}>Connexion</Link>
            <button className="btn-m" style={{padding:"6px 16px",fontSize:12,background:"linear-gradient(135deg, #6366f1, #8b5cf6)"}}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2l2 4 4.5.5-3.25 3 .75 4.5L8 12l-4 2 .75-4.5L1.5 6.5 6 6l2-4z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>
              Passer Pro
            </button>
          </div>
        </div>
      </nav>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"20px 28px",position:"relative",zIndex:5}}>

        {/* Mode selector - horizontal compact */}
        <div className="anim a2" style={{marginBottom:16}}>
          {CATEGORIES.map(cat => (
            <div key={cat.id} style={{marginBottom:6,padding:"8px 14px",borderRadius:10,background:selected[cat.id]?cat.bg:"transparent",border:`1px solid ${selected[cat.id]?cat.border:"transparent"}`,transition:"all .25s ease"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:cat.color}}/>
                <span style={{fontSize:10,fontWeight:600,color:cat.color,textTransform:"uppercase",letterSpacing:"1px"}}>{cat.label}</span>
                {selected[cat.id] && (
                  <span style={{fontSize:10,padding:"2px 8px",borderRadius:4,background:cat.color,color:"#fff",fontWeight:600,marginLeft:"auto"}}>{cat.modes.find(m=>m.id===selected[cat.id])?.label}</span>
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
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,display:"flex",flexDirection:"column"}}>
            <div style={{padding:"10px 16px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10,fontWeight:600,color:"var(--fg3)",textTransform:"uppercase",letterSpacing:".8px"}}>Source</span>
              <span style={{fontSize:11,color:text.length>4500?"#f87171":"var(--fg3)"}}>{text.length.toLocaleString()} / 5 000</span>
            </div>
            <textarea value={text} onChange={e=>setText(e.target.value.slice(0,5000))} placeholder="Colle ton texte ici..." style={{flex:1,minHeight:260,padding:16}}/>
            <div style={{padding:"10px 16px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <button onClick={()=>{setText("");setResult("");setErr("");setEdited(false);setOriginalResult("")}} style={{background:"none",border:"none",color:"var(--fg3)",fontSize:12,cursor:"pointer",fontFamily:"var(--font)",transition:"color .15s"}}
                onMouseEnter={e=>(e.target as HTMLElement).style.color="var(--fg2)"} onMouseLeave={e=>(e.target as HTMLElement).style.color="var(--fg3)"}>
                Effacer
              </button>
              <button className="btn-m" onClick={transform} disabled={!text.trim()||loading} style={{padding:"8px 24px",fontSize:13}}>
                {loading && <span style={{width:14,height:14,border:"2px solid rgba(255,255,255,.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .5s linear infinite",display:"inline-block"}}/>}
                {loading?"Transformation...":"Transformer"}
              </button>
            </div>
          </div>

          {/* Result - EDITABLE */}
          <div style={{background:"var(--bg2)",border:`1px solid ${result?(edited?"rgba(245,158,11,.3)":"rgba(45,212,191,.2)"):"var(--border)"}`,borderRadius:12,display:"flex",flexDirection:"column",transition:"border-color .3s ease"}}>
            <div style={{padding:"10px 16px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:10,fontWeight:600,color:result?(edited?"var(--amber)":"var(--teal)"):"var(--fg3)",textTransform:"uppercase",letterSpacing:".8px",transition:"color .3s"}}>
                  {result ? (edited ? "Modifié" : "Résultat") : "Résultat"}
                  {labels.length>0 && !edited ? ` — ${labels.join(" + ")}` : ""}
                </span>
                {edited && (
                  <button onClick={resetResult} style={{background:"none",border:"none",color:"var(--fg3)",fontSize:11,cursor:"pointer",fontFamily:"var(--font)",textDecoration:"underline"}}
                    title="Revenir au résultat original">
                    Annuler
                  </button>
                )}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                {result && <span style={{fontSize:11,color:"var(--fg3)"}}>{wordCount} mots</span>}
                {result && (
                  <button onClick={copy} style={{background:"none",border:"none",color:copied?"var(--teal)":"var(--fg2)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--font)",transition:"color .15s"}}>
                    {copied?"Copié !":"Copier"}
                  </button>
                )}
              </div>
            </div>
            <textarea
              ref={resultRef}
              value={result}
              onChange={e => handleResultChange(e.target.value)}
              placeholder="Le résultat apparaîtra ici... Tu pourras le modifier directement."
              style={{flex:1,minHeight:260,padding:16,background:result?(edited?"rgba(245,158,11,.02)":"rgba(45,212,191,.03)"):"transparent",transition:"background .3s ease",animation:result&&!edited?"resultIn .4s ease":"none"}}
            />
            {err && <div style={{padding:"10px 16px",borderTop:"1px solid rgba(248,113,113,.2)",fontSize:13,color:"#f87171"}}>{err}</div>}
          </div>
        </div>

        <p className="anim a5" style={{textAlign:"center",marginTop:14,fontSize:12,color:"var(--fg3)"}}>
          Choisis un mode par catégorie pour les combiner · Le résultat est modifiable
        </p>
      </div>
    </div>
  );
}
