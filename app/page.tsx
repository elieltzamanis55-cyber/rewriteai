"use client";

import Link from "next/link";
import { useState } from "react";

const MODES = [
  { icon: "💼", label: "Professionnel" },
  { icon: "😎", label: "Casual" },
  { icon: "🎓", label: "Académique" },
  { icon: "✉️", label: "Email" },
  { icon: "🐦", label: "Tweet" },
  { icon: "✏️", label: "Corriger" },
  { icon: "🔽", label: "Simplifier" },
  { icon: "📏", label: "Allonger" },
  { icon: "✂️", label: "Réduire" },
  { icon: "🇬🇧", label: "→ Anglais" },
  { icon: "🇫🇷", label: "→ Français" },
  { icon: "🇪🇸", label: "→ Espagnol" },
  { icon: "🇸🇦", label: "→ Arabe" },
  { icon: "🔥", label: "Persuasif" },
  { icon: "📋", label: "Résumé" },
  { icon: "💡", label: "Créatif" },
];

export default function Home() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-surface-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">
              RewriteAI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-surface-300">
            <a href="#modes" className="hover:text-white transition">
              Modes
            </a>
            <a href="#how" className="hover:text-white transition">
              Comment ça marche
            </a>
            <a href="#pricing" className="hover:text-white transition">
              Tarifs
            </a>
          </div>
          <Link
            href="/app"
            className="btn-primary !py-2 !px-5 !text-sm !rounded-lg"
          >
            Lancer l&apos;app →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-surface-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
            16 modes de transformation
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Transforme ton texte{" "}
            <span className="gradient-text">instantanément.</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Reformule, corrige, traduis et adapte ton texte en un clic. 16
            modes propulsés par l&apos;IA pour chaque situation.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/app" className="btn-primary !text-base !px-8 !py-3.5">
              Essayer gratuitement
            </Link>
            <a
              href="#how"
              className="px-8 py-3.5 rounded-xl text-base font-medium text-surface-300 border border-white/10 hover:bg-white/5 transition"
            >
              Voir comment
            </a>
          </div>
        </div>
      </section>

      {/* Modes grid */}
      <section id="modes" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            16 modes, un seul outil.
          </h2>
          <p className="text-surface-300 text-center mb-14 max-w-lg mx-auto">
            Chaque mode est optimisé pour un usage précis. Choisis, colle, transforme.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {MODES.map((m) => (
              <div
                key={m.label}
                className="glass-card p-4 flex items-center gap-3 hover:border-brand/30 transition cursor-default"
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-sm font-medium text-surface-200">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Simple comme 1, 2, 3.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Colle ton texte",
                desc: "Copie-colle n'importe quel texte dans l'éditeur. Email, message, dissertation, peu importe.",
              },
              {
                step: "02",
                title: "Choisis un mode",
                desc: "Sélectionne parmi 16 modes : pro, casual, académique, traduction, correction, résumé...",
              },
              {
                step: "03",
                title: "Récupère le résultat",
                desc: "Copie le texte transformé en un clic. C'est fait, c'est propre, c'est instantané.",
              },
            ].map((s) => (
              <div key={s.step} className="glass-card p-6">
                <div className="text-brand font-mono text-sm font-bold mb-4">
                  ÉTAPE {s.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-surface-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Prix transparent.
          </h2>
          <p className="text-surface-300 text-center mb-14">
            Commence gratuitement. Passe au Pro quand tu veux.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-1">Gratuit</h3>
              <div className="text-3xl font-bold text-white mb-1">
                0€
                <span className="text-sm font-normal text-surface-300">
                  /pour toujours
                </span>
              </div>
              <p className="text-sm text-surface-300 mb-6">
                Pour tester et utiliser occasionnellement.
              </p>
              <ul className="space-y-3 text-sm text-surface-200 mb-8">
                {[
                  "5 transformations / jour",
                  "Tous les 16 modes",
                  "Texte jusqu'à 500 caractères",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className="block text-center py-3 rounded-lg border border-white/10 text-sm font-medium hover:bg-white/5 transition"
              >
                Commencer gratuitement
              </Link>
            </div>

            {/* Pro */}
            <div className="glass-card p-8 border-brand/30 relative">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-brand rounded-full text-xs font-semibold text-white">
                Populaire
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Pro</h3>
              <div className="text-3xl font-bold text-white mb-1">
                3,99€
                <span className="text-sm font-normal text-surface-300">
                  /mois
                </span>
              </div>
              <p className="text-sm text-surface-300 mb-6">
                Usage illimité pour les pros.
              </p>
              <ul className="space-y-3 text-sm text-surface-200 mb-8">
                {[
                  "Transformations illimitées",
                  "Tous les 16 modes",
                  "Texte jusqu'à 5 000 caractères",
                  "Historique sauvegardé",
                  "Support prioritaire",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-brand-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full !py-3 !text-sm">
                Passer au Pro →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <span className="text-sm text-surface-300">
              © 2026 RewriteAI. Tous droits réservés.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-surface-300">
            <a href="#" className="hover:text-white transition">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition">
              Confidentialité
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
