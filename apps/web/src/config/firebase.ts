import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"

// Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoPlaceholderForPublicRepoBuild",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eduos-prod.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "eduos-prod",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eduos-prod.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "407374019695",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:407374019695:web:demoappplaceholderid",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-X5HH90TTKQ"
}

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Firebase Analytics (guarded for browser support)
let analytics: Analytics | null = null
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  }).catch((err) => {
    console.warn("Firebase Analytics initialization skipped:", err)
  })
}

// Connect to Emulators only if explicitly configured
const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true"

if (useEmulator) {
  try {
    connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
    console.log("Connected to Firebase Auth Emulator")
  } catch (err) {
    console.warn("Firebase Auth Emulator connection skipped", err)
  }

  try {
    connectFirestoreEmulator(db, "localhost", 8080)
    console.log("Connected to Firestore Emulator")
  } catch (err) {
    console.warn("Firestore Emulator connection skipped", err)
  }

  try {
    connectStorageEmulator(storage, "localhost", 9199)
    console.log("Connected to Firebase Storage Emulator")
  } catch (err) {
    console.warn("Firebase Storage Emulator connection skipped", err)
  }
}

export { app, auth, db, storage, analytics, firebaseConfig }
