"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface Mode {
  id: string;
  icon: string;
  label: string;
  category: string;
}

const MODES: Mode[] = [
  { id: "professionnel", icon: "💼", label: "Professionnel", category: "Ton" },
  { id: "casual", icon: "😎", label: "Casual", category: "Ton" },
  { id: "académique", icon: "🎓", label: "Académique", category: "Ton" },
  { id: "email", icon: "✉️", label: "Email", category: "Format" },
  { id: "tweet", icon: "🐦", label: "Tweet", category: "Format" },
  { id: "resume", icon: "📋", label: "Résumé", category: "Format" },
  { id: "corriger", icon: "✏️", label: "Corriger", category: "Éditer" },
  { id: "simplifier", icon: "🔽", label: "Simplifier", category: "Éditer" },
  { id: "allonger", icon: "📏", label: "Allonger", category: "Éditer" },
  { id: "reduire", icon: "✂️", label: "Réduire", category: "Éditer" },
  { id: "persuasif", icon: "🔥", label: "Persuasif", category: "Style" },
  { id: "creatif", icon: "💡", label: "Créatif", category: "Style" },
  { id: "anglais", icon: "🇬🇧", label: "→ Anglais", category: "Traduire" },
  { id: "francais", icon: "🇫🇷", label: "→ Français", category: "Traduire" },
  { id: "espagnol", icon: "🇪🇸", label: "→ Espagnol", category: "Traduire" },
  { id: "arabe", icon: "🇸🇦", label: "→ Arabe", category: "Traduire" },
];

const CATEGORIES = ["Ton", "Format", "Éditer", "Style", "Traduire"];

export default function AppPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("professionnel");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 5000;

  const handleTransform = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Erreur de connexion. Vérifie ta connexion internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = text.length;
  const charClass =
    charCount > MAX_CHARS
      ? "danger"
      : charCount > MAX_CHARS * 0.8
      ? "warning"
      : "";

  return (
    <div className="min-h-screen grid-bg">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-surface-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <span className="font-semibold text-white tracking-tight">
              RewriteAI
            </span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-surface-300 hidden sm:inline">
              5 / 5 transformations restantes
            </span>
            <button className="px-4 py-1.5 rounded-lg bg-brand/10 text-brand-400 text-sm font-medium border border-brand/20 hover:bg-brand/20 transition">
              Passer Pro
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Mode selector */}
        <div className="mb-6">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="mb-3">
              <div className="text-xs text-surface-300 uppercase tracking-wider font-medium mb-2">
                {cat}
              </div>
              <div className="flex flex-wrap gap-2">
                {MODES.filter((m) => m.category === cat).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`mode-chip ${mode === m.id ? "active" : ""}`}
                  >
                    <span>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="glass-card p-1">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-xs text-surface-300 font-medium uppercase tracking-wider">
                Ton texte
              </span>
              <span className={`char-counter ${charClass}`}>
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Colle ton texte ici..."
              className="w-full h-64 md:h-80 bg-transparent text-surface-100 text-[15px] leading-relaxed resize-none p-4 pt-0 placeholder:text-surface-300/40 focus:outline-none"
              maxLength={MAX_CHARS}
            />
            <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setText("")}
                className="text-xs text-surface-300 hover:text-white transition"
              >
                Effacer
              </button>
              <button
                onClick={handleTransform}
                disabled={!text.trim() || loading || charCount > MAX_CHARS}
                className="btn-primary !py-2.5 !px-6 !text-sm flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="loading-spinner" />
                    Transformation...
                  </>
                ) : (
                  <>
                    Transformer →
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="glass-card p-1">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-xs text-surface-300 font-medium uppercase tracking-wider">
                Résultat —{" "}
                {MODES.find((m) => m.id === mode)?.icon}{" "}
                {MODES.find((m) => m.id === mode)?.label}
              </span>
              {result && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-brand-400 hover:text-brand-300 transition font-medium flex items-center gap-1"
                >
                  {copied ? "✓ Copié !" : "Copier"}
                </button>
              )}
            </div>
            <textarea
              ref={resultRef}
              value={result}
              readOnly
              placeholder="Le texte transformé apparaîtra ici..."
              className="w-full h-64 md:h-80 bg-transparent text-surface-100 text-[15px] leading-relaxed resize-none p-4 pt-0 placeholder:text-surface-300/40 focus:outline-none"
            />
            {error && (
              <div className="px-4 py-3 border-t border-red-500/20 text-sm text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="text-center mt-6 text-xs text-surface-300/60">
          Astuce : Ctrl+V pour coller, puis clique sur Transformer
        </div>
      </div>
    </div>
  );
}
