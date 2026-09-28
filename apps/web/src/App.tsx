import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/config/firebase"
import { useAuthStore, type UserProfile } from "./stores/auth-store"
import { RoleGuard } from "./components/RoleGuard"

// Pages
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { Onboarding } from "./pages/auth/Onboarding"
import { Home } from "./pages/public/Home"
import { Courses } from "./pages/public/Courses"
import { CourseDetail } from "./pages/public/CourseDetail"
import { StudentDashboard } from "./pages/student/Dashboard"
import { CoursePlayer } from "./pages/student/CoursePlayer"
import { CertificateViewer } from "./pages/student/CertificateViewer"
import { TrainerDashboard } from "./pages/trainer/Dashboard"
import { CourseBuilder } from "./pages/trainer/CourseBuilder"
import { AdminDashboard } from "./pages/admin/Dashboard"
import { OfflineEnrollment } from "./pages/admin/OfflineEnrollment"
import { VerifyCertificate } from "./pages/public/VerifyCertificate"
import { ForgotPassword } from "./pages/auth/ForgotPassword"
import { EmailVerification } from "./pages/auth/EmailVerification"
import { About } from "./pages/public/About"
import { Contact } from "./pages/public/Contact"
import { Mentors } from "./pages/public/Mentors"
import { Discussion } from "./pages/community/Discussion"
import { Assignments } from "./pages/trainer/Assignments"
import { Attendance } from "./pages/trainer/Attendance"
import { LiveClasses } from "./pages/trainer/LiveClasses"
import { DesignSystem } from "./pages/public/DesignSystem"

function App() {
  const { setSession, setLoading, setInitialized } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Verify authoritative role from Firebase Auth custom claims
          const tokenResult = await user.getIdTokenResult()
          const claimRole = tokenResult.claims.role as UserProfile["role"] | undefined

          // Fetch user profile from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const rawData = userDoc.data() as UserProfile
            // Server claim takes precedence to prevent client-side privilege escalation
            const role = claimRole || rawData.role || "student"
            setSession(user, { ...rawData, role })
          } else {
            // Logged in but profile doc doesn't exist yet (could be onboarding phase)
            setSession(user, null)
          }
        } catch (error) {
          console.error("Error loading user profile:", error)
          setSession(user, null)
        }
      } else {
        setSession(null, null)
      }
      setInitialized(true)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setSession, setLoading, setInitialized])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Onboarding */}
        <Route
          path="/onboarding"
          element={
            <RoleGuard>
              <Onboarding />
            </RoleGuard>
          }
        />

        {/* Discussion Forum */}
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/community" element={<Discussion />} />
        <Route path="/community/discussion" element={<Discussion />} />

        {/* Verification */}
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/verify/:certificateId" element={<VerifyCertificate />} />

        {/* Student Portal */}
        <Route
          path="/student/dashboard"
          element={
            <RoleGuard allowedRoles={["student", "admin"]}>
              <StudentDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/student/courses/:courseId"
          element={
            <RoleGuard allowedRoles={["student", "admin"]}>
              <CoursePlayer />
            </RoleGuard>
          }
        />
        <Route
          path="/student/certificates"
          element={
            <RoleGuard allowedRoles={["student", "admin"]}>
              <CertificateViewer />
            </RoleGuard>
          }
        />
        <Route
          path="/student/certificates/:courseId"
          element={
            <RoleGuard allowedRoles={["student", "admin"]}>
              <CertificateViewer />
            </RoleGuard>
          }
        />
        <Route
          path="/student/discussion"
          element={<Discussion />}
        />

        {/* Trainer Portal */}
        <Route
          path="/trainer/dashboard"
          element={
            <RoleGuard allowedRoles={["trainer", "admin"]}>
              <TrainerDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/trainer/courses/new"
          element={
            <RoleGuard allowedRoles={["trainer", "admin"]}>
              <CourseBuilder />
            </RoleGuard>
          }
        />
        <Route
          path="/trainer/assignments"
          element={
            <RoleGuard allowedRoles={["trainer", "admin"]}>
              <Assignments />
            </RoleGuard>
          }
        />
        <Route
          path="/trainer/attendance"
          element={
            <RoleGuard allowedRoles={["trainer", "admin"]}>
              <Attendance />
            </RoleGuard>
          }
        />
        <Route
          path="/trainer/live-classes"
          element={
            <RoleGuard allowedRoles={["trainer", "admin"]}>
              <LiveClasses />
            </RoleGuard>
          }
        />

        {/* Admin Portal */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleGuard allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/offline-enrollment"
          element={
            <RoleGuard allowedRoles={["admin"]}>
              <OfflineEnrollment />
            </RoleGuard>
          }
        />

        {/* Certificate Direct Viewer */}
        <Route path="/certificate/:courseId" element={<CertificateViewer />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
