# Yukta Web Client (`apps/web`)

> **Frontend Single Page Application for Yukta (EduOS)**  
> Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Firebase Client SDK**.

---

## 🚀 Overview

The `apps/web` workspace powers the complete student, trainer, and administrator user interface for Yukta. It connects securely to Cloud Firestore and Firebase Auth, integrating responsive layout containers, an institutional Emerald design system, and an intelligent client-side AI Tutor powered by Google Gemini.

---

## 📦 Features & Structure

- **Core Framework:** React 19 + TypeScript + Vite with dynamic code splitting.
- **Routing:** React Router v7 with role-guarded routes (`/student/*`, `/trainer/*`, `/admin/*`).
- **State Management:** Zustand stores with optimistic UI updates and reactive session caching.
- **Data Querying:** TanStack React Query for cached network state and background synchronizations.
- **Styling & Tokens:** Tailwind CSS v3 with custom design tokens for academic layouts and glassmorphic surfaces (`/design-system`).
- **AI Integration (`src/utils/gemini.ts`):** Direct client integration with Google Gemini 1.5 Flash supporting interactive lesson Q&A, automatic flashcard synthesis, and dynamic quiz generation with robust offline fallbacks.

---

## 🛠️ Directory Map

```
apps/web/
├── public/                 # Static assets, institutional icons & images
├── src/
│   ├── assets/             # Bundled SVG and graphic resources
│   ├── components/         # Shared UI components
│   │   ├── ui/             # Design system atoms (Button, Input, GlassCard, Badge, Chips)
│   │   ├── Header.tsx      # Top institutional navigation
│   │   └── RoleGuard.tsx   # Client route protection enforcing verified claims
│   ├── config/
│   │   └── firebase.ts     # Firebase App, Auth, Firestore, and Storage client setup
│   ├── pages/              # Primary view controllers
│   │   ├── admin/          # Platform governance & telemetry views
│   │   ├── auth/           # Login, Register, Password Reset, Onboarding
│   │   ├── community/      # Colloquium and peer discussion forum
│   │   ├── public/         # Landing, Course Catalog, Course Detail, Design System
│   │   ├── student/        # Interactive Player, Dashboard, Certificate Viewer
│   │   └── trainer/        # Course Builder Studio, Assignments, Attendance, Live Classes
│   ├── stores/             # Zustand state machines (authStore, etc.)
│   ├── utils/              # Gemini AI client, formatting, and validation utilities
│   ├── App.tsx             # Root route registration and auth listener
│   └── main.tsx            # DOM mount point
├── .env.example            # Environment configuration template
├── package.json            # Web client dependencies and scripts
├── tailwind.config.js      # Custom theme color tokens and spacing scales
└── vite.config.ts          # Vite build options and `@` path alias
```

---

## ⚙️ Environment Variables

Create a `.env` file in `apps/web/`:
```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|:---:|---|
| `VITE_FIREBASE_API_KEY` | Yes | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase Auth Domain (`*.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Cloud Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase Web App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Optional | Google Analytics Measurement ID |
| `VITE_USE_FIREBASE_EMULATOR` | Optional | Set to `true` to connect to local Firebase Emulators |
| `VITE_GEMINI_API_KEY` | Optional | Google Gemini API Key for live AI Tutor features |

> **Note:** If `VITE_GEMINI_API_KEY` is not provided, the platform automatically switches to an offline simulated AI Tutor mode with pre-seeded datasets, guaranteeing zero UI failure or blank screen issues.

---

## 💻 Available Scripts

Run these commands from `apps/web` or via workspace commands from the monorepo root:

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local development server with HMR at `http://localhost:5173` |
| `npm run build` | Compiles TypeScript types (`tsc -b`) and bundles production assets into `./dist` |
| `npm run lint` | Runs ESLint against all components and TypeScript source files |
| `npm run preview` | Starts a local web server to preview the production `./dist` bundle |
