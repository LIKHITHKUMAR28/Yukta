# Yukta (EduOS) — Institutional Education Operating System

> **Next-Generation AI-First Learning & Academic Management Platform**  
> Architected as a modern TypeScript monorepo with React 19, Firebase Cloud Backend, and Google Gemini AI Tutor integration.

Live: - https://eduos-prod.web.app/
---

## 🌟 Executive Overview

**Yukta (EduOS)** is a unified academic operations and interactive learning platform engineered for universities, enterprise academies, and advanced technical institutions. It integrates curriculum authoring, real-time code playgrounds, AI-augmented tutoring, cryptographically verifiable certificates, and administrative compliance into a single interface.

Built around an institutional design system (Emerald Deep & Slate), Yukta features zero-trust Role-Based Access Control (RBAC), optimistic client caching, and dual-mode AI capabilities (live Google Gemini 1.5 Flash integration with zero-downtime offline simulation fallbacks).

---

## 🏛️ Monorepo Architecture

```
eduos-yukta/
├── apps/
│   └── web/                   # React 19 + TypeScript + Vite Single Page Application
│       ├── src/
│       │   ├── components/    # Reusable UI primitives (GlassCard, Buttons, Chips, Modals)
│       │   ├── config/        # Firebase & environment configurations
│       │   ├── hooks/         # Custom React hooks
│       │   ├── pages/         # Role-guarded application views
│       │   │   ├── admin/     # Governance, Moderation, Analytics, Offline Enrolls
│       │   │   ├── auth/      # Login, Register, Onboarding, Verification
│       │   │   ├── community/ # Academic discussion colloquium
│       │   │   ├── public/    # Catalog, Course Detail, Design System, Verify
│       │   │   ├── student/   # Student Dashboard, Course Player, Certificates
│       │   │   └── trainer/   # Course Builder, Assignments, Live Classes, Attendance
│       │   ├── stores/        # Zustand state machines (auth, session)
│       │   └── utils/         # Gemini AI client, validators, formatting helpers
├── firebase/
│   ├── firestore.rules        # Production Role-Based Access Control rules
│   ├── firestore.indexes.json # Composite query indexing specifications
│   ├── storage.rules          # Cloud Storage access rules
│   └── functions/             # Firebase Cloud Functions (TypeScript)
│       └── src/index.ts       # HMAC SHA-256 Payment Webhook & automated enrollment
├── packages/
│   ├── types/                 # Shared TypeScript interfaces & schemas
│   └── utils/                 # Cross-package utility functions
├── firebase.json              # Firebase Hosting, Functions, and Firestore configuration
├── .firebaserc                # Active Firebase target project mapping
└── .env.example               # Root environment configuration template
```

---

## 👥 Role-Based Access Control (RBAC)

Yukta enforces cryptographic, server-verified roles (`student`, `trainer`, `admin`):

| Module / Capability | Student | Trainer | Administrator |
|---|:---:|:---:|:---:|
| **Course Catalog & Detail Exploration** | ✅ | ✅ | ✅ |
| **Interactive Course Player & Labs** | ✅ Enrolled | ✅ | ✅ |
| **AI Lesson Tutor (Gemini 1.5 Flash)** | ✅ Live | ✅ Live | ✅ Live |
| **Adaptive Flashcards & Auto-Quiz Generator** | ✅ | ✅ | ✅ |
| **Cryptographic Verifiable Certificates** | ✅ Earned | ✅ Verify | ✅ Full Audit |
| **Course Builder & Curriculum Authoring** | ❌ | ✅ Own Courses | ✅ All Courses |
| **Assignment Triage & Grading** | ✅ Submit | ✅ Review/Score | ✅ System-wide |
| **Live Classroom & Attendance Records** | ✅ Attend | ✅ Host/Mark | ✅ Inspect |
| **Academic Moderation & Flagged Content** | ❌ | ❌ | ✅ Triage/Redact |
| **Financial Ledger & Webhook Transactions** | ❌ | ❌ | ✅ Audit/Refund |
| **Platform Announcements & Broadcasts** | ✅ Receive | ✅ Receive | ✅ Publish |

---

## ⚡ Key Capabilities & Modules

1. **Interactive Course Player (`/student/player`):**
   - Syntax-highlighted code editor, lesson notes drawer, and progress tracking.
   - Live AI Tutor assistant powered by Gemini 1.5 Flash with contextual grounding.
2. **AI Flashcards & Adaptive Quizzes:**
   - Real-time generative study cards and multiple-choice quizzes with automated grading.
   - Graceful offline fallback ensures uninterrupted learning even without an API key.
3. **Trainer Course Builder Studio (`/trainer/builder`):**
   - Multi-module syllabus architect with drag-and-drop hierarchy and lesson media tagging.
4. **Verifiable Certificate Engine (`/verify-certificate`):**
   - SHA-256 hash-anchored credentials verifiable by external auditors without authentication.
5. **Secure Payment Webhook:**
   - Cloud Function verifying `x-webhook-signature` via timing-safe HMAC SHA-256 comparisons.

---

## 🔒 Security & Public GitHub Deployment Readiness

Yukta is architected to be safely committed and maintained in **Public GitHub Repositories**:

1. **Zero Secret Leaks in Source Code:**
   - All client credentials are extracted to environment variables (`.env`).
   - Source code contains only non-sensitive mock fallbacks so GitHub Secret Scanner will never trigger.
2. **Untracked Secret Files:**
   - Root `.gitignore` and `apps/web/.gitignore` strictly ignore `.env`, `.env.local`, and build artifacts.
3. **Database Security Rules:**
   - Cloud Firestore Security Rules (`firebase/firestore.rules`) enforce role claims and prohibit client-side privilege escalation.
4. **Production Web Security Headers:**
   - `firebase.json` deploys enterprise-grade HTTP headers:
     - `Content-Security-Policy` restricting script, style, frame, and connect origins.
     - `Strict-Transport-Security` (HSTS max-age 31536000 with subdomains).
     - `X-Frame-Options: DENY` (anti-clickjacking).
     - `X-Content-Type-Options: nosniff`.

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Firebase CLI** (`npm install -g firebase-tools`)

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd eduos-yukta

# Install all workspace dependencies
npm install
```

### 3. Environment Configuration
Create an environment file for the web application:
```bash
cp apps/web/.env.example apps/web/.env
```
Fill in your Firebase project configuration in `apps/web/.env`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Optional: Add Google Gemini API Key for live AI Tutor responses
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Running the Development Server
```bash
# Start the web application
npm run dev

# Open http://localhost:5173 in your browser
```

### 5. Running with Firebase Local Emulators
```bash
# Set VITE_USE_FIREBASE_EMULATOR=true in apps/web/.env, then:
npm run emulators
```

---

## 🛠️ Build & Deployment

### Production Compilation
```bash
# Builds the web client and verifies TypeScript types
npm run build

# Builds Cloud Functions
npm run build:functions
```

### Hosting & Rules Deployment
```bash
# Full deployment (Hosting + Firestore Rules + Functions)
npm run deploy

# Deploy frontend hosting only
npm run deploy:hosting

# Deploy security rules only
npm run deploy:firestore

# Deploy Cloud Functions only
npm run deploy:functions
```

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
