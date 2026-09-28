import { create } from "zustand"
import { type User, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "@/config/firebase"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: "student" | "trainer" | "admin"
  createdAt: string
  bio?: string
  learningGoals?: string[]
}

// Embedded Admin UID - only this specific Firebase UID has root admin privileges
export const EMBEDDED_ADMIN_UID = "yukta-admin-root-uid-2026"

interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  initialized: boolean
  setSession: (user: User | null, profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  setInitialized: (initialized: boolean) => void
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  initialized: false,
  setSession: (user, profile) => {
    set({ user, profile, loading: false })
  },
  setLoading: (loading) => set({ loading }),
  setInitialized: (initialized) => set({ initialized }),
  signOut: async () => {
    set({ loading: true })
    try {
      await firebaseSignOut(auth)
      set({ user: null, profile: null, loading: false })
    } catch (error) {
      console.error("Error signing out:", error)
      set({ loading: false })
    }
  },
}))
