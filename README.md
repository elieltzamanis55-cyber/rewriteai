# RewriteAI ✍️

Transformateur de texte IA — Reformule, corrige, traduis et adapte ton texte en un clic.

## 16 modes de transformation

**Ton** : Professionnel, Casual, Académique
**Format** : Email, Tweet, Résumé
**Éditer** : Corriger, Simplifier, Allonger, Réduire
**Style** : Persuasif, Créatif
**Traduire** : → Anglais, → Français, → Espagnol, → Arabe

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** pour le styling
- **API Anthropic Claude** pour les transformations
- **Vercel** pour le déploiement

## Installation locale

```bash
# 1. Clone le repo
git clone <ton-repo>
cd rewriteai

# 2. Installe les dépendances
npm install

# 3. Configure l'API key
cp .env.example .env.local
# Édite .env.local et ajoute ta clé Anthropic

# 4. Lance en local
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

## Déploiement sur Vercel

1. Push le code sur GitHub
2. Connecte le repo à [vercel.com](https://vercel.com)
3. Ajoute la variable d'environnement `ANTHROPIC_API_KEY` dans les settings Vercel
4. Déploie — c'est live !

## Monétisation

- **Gratuit** : 5 transformations/jour, max 500 caractères
- **Pro (3,99€/mois)** : Illimité, max 5 000 caractères, historique

## Structure du projet

```
rewriteai/
├── app/
│   ├── layout.tsx          # Layout racine
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Styles globaux
│   ├── app/
│   │   └── page.tsx        # App de transformation
│   └── api/
│       └── rewrite/
│           └── route.ts    # API endpoint IA
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Licence

Propriétaire — Tous droits réservés.
