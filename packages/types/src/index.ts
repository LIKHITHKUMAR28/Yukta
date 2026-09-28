export type UserRole = "guest" | "student" | "trainer" | "admin" | "super_admin";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
  bio?: string;
  learningGoals?: string[];
  onboarded?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  price: string;
  isFree: boolean;
  duration: string;
  rating: number;
  reviews: number;
  lessonsCount: number;
  trainerId: string;
  trainerName: string;
  trainerBio: string;
  description: string;
  prerequisites: string[];
  published: boolean;
  createdAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  youtubeId: string;
  description: string;
  defaultNotes: string;
  resources: Array<{ name: string; url: string }>;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: "active" | "completed" | "revoked";
  progressPercentage: number;
}

export interface Progress {
  id: string;
  studentId: string;
  courseId: string;
  completedLessons: string[];
  notes?: Record<string, string>;
  quizScores?: Record<string, number>;
  updatedAt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  issuedAt: string;
  verificationUrl: string;
}

export interface PaymentRecord {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  status: "success" | "pending" | "failed";
  gateway: "stripe" | "razorpay";
  txnId: string;
  createdAt: string;
}
