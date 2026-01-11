# 🖥️ Hybrid Analysis Dashboard

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)

## 📖 Contexte du Projet

**Hybrid Analysis Dashboard** est l'interface utilisateur de la plateforme d'orchestration IA dédiée au media monitoring.

Développée avec **Next.js (App Router)**, cette application offre une expérience utilisateur fluide et performante pour interagir avec le backend d'intelligence artificielle. Elle permet l'authentification sécurisée des analystes et la visualisation en temps réel du traitement "Zero-Shot Classification" (Hugging Face) couplé à la synthèse générative (Gemini).

## 🏗 Architecture & Structure

Le projet utilise l'architecture moderne **Next.js App Router**, favorisant le Server-Side Rendering (SSR) là où c'est nécessaire et la modularité via TypeScript.

### 📂 Arborescence du Projet

Basé sur la structure actuelle du dépôt :

```text
OrchestrationIA Fullstack-frontend/
└── frontend/
    ├── .next/                # Build de production (généré)
    ├── public/               # Assets statiques (images, favicons)
    ├── src/
    │   └── app/              # Next.js App Router
    │       ├── dashboard/    # Espace protégé (Analyses & Résultats)
    │       │   └── page.tsx  # Vue principale du Dashboard
    │       ├── favicon.ico
    │       ├── globals.css   # Styles globaux & Variables CSS
    │       ├── layout.tsx    # Layout racine (RootLayout)
    │       └── page.tsx      # Landing Page / Authentification
    ├── .gitignore
    ├── dockerfile            # Configuration de l'image Docker
    ├── eslint.config.mjs     # Configuration du Linter
    ├── next.config.ts        # Configuration Next.js
    ├── package.json          # Dépendances et scripts
    ├── postcss.config.mjs    # Processeur CSS (Tailwind/Autoprefixer)
    └── tsconfig.json         # Configuration TypeScript
```

## 🛠️ Stack Technique

  * **Framework :** Next.js (App Router) pour le routing et l'optimisation.
  * **Langage :** TypeScript pour un typage fort et une meilleure maintenabilité.
  * **Styling :** CSS Modules / PostCSS (via `globals.css`).
  * **Qualité du Code :** ESLint (`eslint.config.mjs`) pour le respect des standards.
  * **Conteneurisation :** Docker (Multi-stage build).
  * **HTTP Client :** Fetch API ou Axios (pour la communication avec le Backend Python).

## ⚙️ Installation et Configuration

### Prérequis

  * Node.js (v18+)
  * NPM
  * Le Backend Python doit être lancé (localement sur le port 8000).

### 1\. Installation des dépendances

Placez-vous dans le dossier `frontend` :

```bash
cd frontend
npm install
```

### 2\. Variables d'Environnement

Créez un fichier `.env.local` à la racine du dossier `frontend` pour configurer la connexion avec l'API Backend.

```ini
# URL de l'API Backend (FastAPI)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3\. Lancement (Mode Développement)

Pour lancer le serveur de développement avec rechargement à chaud (HMR) :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`.

## 🐳 Lancement via Docker

Le projet contient un `dockerfile` optimisé pour la production.

1.  **Construire l'image :**

    ```bash
    docker build -t hybrid-analyzer-front .
    ```

2.  **Lancer le conteneur :**

    ```bash
    docker run -p 3000:3000 hybrid-analyzer-front
    ```

## 📱 Fonctionnalités & Pages

L'application est structurée autour de deux zones principales définies dans `src/app` :

### 1\. Authentification (`src/app/page.tsx`)

Page d'accueil par défaut.

  * Formulaire de connexion / inscription.
  * Gestion du token JWT (stockage sécurisé coté client).
  * Redirection automatique vers le dashboard après succès.

### 2\. Dashboard d'Analyse (`src/app/dashboard/page.tsx`)

Zone protégée nécessitant un token valide.

  * **Input :** Zone de texte pour soumettre les articles de presse.
  * **Orchestration Visuelle :** Feedback lors de l'appel au Backend (Loading states).
  * **Résultats :**
      * Affichage de la **Catégorie** (Finance, IT, RH...) issue de Hugging Face.
      * Affichage du **Résumé Contextuel** généré par Gemini.
      * Indicateur de **Tonalité**.

## 🧪 Qualité Code

Le projet impose une rigueur via :

  * **TypeScript (`tsconfig.json`) :** Typage strict des props et des réponses API.
  * **Linting (`eslint.config.mjs`) :** Vérification statique du code pour éviter les erreurs courantes React/Next.js.
