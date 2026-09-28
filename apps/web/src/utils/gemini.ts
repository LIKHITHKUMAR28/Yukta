// Gemini AI API Client Interface

export interface Flashcard {
  question: string
  answer: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
}

const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || ""
}

/**
 * Strips markdown code blocks (```json ... ```) from model responses
 */
function cleanJsonOutput(raw: string): string {
  return raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim()
}

// Ask Gemini AI Tutor based on current lesson content
export async function askGeminiTutor(
  lessonTitle: string,
  lessonNotes: string,
  question: string
): Promise<string> {
  const apiKey = getApiKey()
  
  if (!apiKey) {
    // Context-aware simulated response if no API Key is provided
    return new Promise((resolve) => {
      setTimeout(() => {
        let answer = `[Offline Mode] In "${lessonTitle}", this concept is fundamental. `
        if (question.toLowerCase().includes("compiler")) {
          answer += "The React Compiler compiles React components into optimized JavaScript by adding memory caches dynamically. You no longer need to write useMemo or useCallback because dependency chains are handled during compile time."
        } else if (question.toLowerCase().includes("action")) {
          answer += "Actions are async transitions (like HTML form submissions). React 19 handles the pending states, error fallbacks, and updates the UI optimistically so you don't write manual loading flags."
        } else {
          answer += "This helps separate state concerns from UI presentation. Try asking about the 'Compiler' or 'Server Actions' to see detailed explanations!"
        }
        resolve(answer)
      }, 700)
    })
  }

  try {
    const prompt = `You are a helpful AI Tutor on the Yukta (EduOS) education platform. 
Current Lesson: "${lessonTitle}"
Lesson Context/Notes: "${lessonNotes}"

Student Question: "${question}"

Please provide a concise, professional, and clear educational response explaining the concept step-by-step. Keep formatting clean.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    if (!response.ok) {
      console.warn(`Gemini API request failed with status ${response.status}. Using context fallback.`)
      return `[Offline Mode] Here is an overview for "${lessonTitle}": This topic explores modular components and distributed state patterns. For hands-on testing, examine the code playground or ask a specific technical question.`
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    return text || "I was unable to formulate a response. Please rephrase your question."
  } catch (error) {
    console.error("Gemini API call failed:", error)
    return "AI Tutor is currently operating in offline mode. Please verify your connection or API key settings."
  }
}

// Pre-packaged educational flashcards fallback
const DEFAULT_FLASHCARDS: Flashcard[] = [
  { question: "What is the primary goal of the React 19 compiler?", answer: "To automate memoization, eliminating the manual use of useMemo and useCallback." },
  { question: "What does the useActionState hook do?", answer: "It manages async form actions, pending loading states, and automatically surfaces the action result." },
  { question: "Is useMemo still required in React 19?", answer: "No, the React Compiler automatically memoizes values and component trees during compilation." },
  { question: "How does optimistic UI updating work in modern React?", answer: "It immediately renders expected state transitions while awaiting background server confirmation." },
  { question: "What is the role of custom claims in Firebase RBAC?", answer: "They provide cryptographically signed, server-side role attributes verified on every token refresh." }
]

// Generate Flashcards for a lesson
export async function generateFlashcards(
  lessonTitle: string,
  lessonContent: string
): Promise<Flashcard[]> {
  const apiKey = getApiKey()

  if (!apiKey) {
    return DEFAULT_FLASHCARDS
  }

  try {
    const prompt = `Generate exactly 5 Q&A study flashcards for the lesson "${lessonTitle}".
Lesson details: "${lessonContent}"

Return the result STRICTLY as a JSON array of objects with "question" and "answer" properties. Do not wrap in markdown tags.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    )

    if (!response.ok) {
      console.warn(`Gemini API request failed with status ${response.status}. Serving default flashcards.`)
      return DEFAULT_FLASHCARDS
    }

    const data = await response.json()
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!rawText) return DEFAULT_FLASHCARDS

    const cleaned = cleanJsonOutput(rawText)
    const parsed = JSON.parse(cleaned)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as Flashcard[]
    }
    return DEFAULT_FLASHCARDS
  } catch (error) {
    console.error("Failed to generate flashcards via Gemini:", error)
    return DEFAULT_FLASHCARDS
  }
}

// Generate Quiz Questions for a topic
export async function generateQuiz(topic: string): Promise<QuizQuestion[]> {
  const defaultQuiz: QuizQuestion[] = [
    {
      question: `What is the core architectural principle of ${topic}?`,
      options: ["Decoupled state machines", "Manual DOM manipulation", "Synchronous blocking IO", "Global singleton mutations"],
      correctIndex: 0
    },
    {
      question: `Which advantage is most prominent in ${topic}?`,
      options: ["Automatic memoization and performance", "Increased manual boilerplate", "Browser memory leaks", "Higher server CPU costs"],
      correctIndex: 0
    },
    {
      question: `How should errors be handled when executing operations in ${topic}?`,
      options: ["Catch and surface user-friendly errors with fallback states", "Crash the parent component", "Silently discard exceptions", "Reload the window"],
      correctIndex: 0
    }
  ]

  const apiKey = getApiKey()

  if (!apiKey) {
    return defaultQuiz
  }

  try {
    const prompt = `Generate exactly 3 to 5 multiple choice quiz questions for the topic: "${topic}".
Each question MUST contain a "question", a list of 4 "options", and a 0-indexed "correctIndex".

Return the result STRICTLY as a JSON array of objects. Do not wrap in markdown tags.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      }
    )

    if (!response.ok) {
      console.warn(`Gemini API request failed with status ${response.status}. Serving default quiz.`)
      return defaultQuiz
    }

    const data = await response.json()
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!rawText) return defaultQuiz

    const cleaned = cleanJsonOutput(rawText)
    const parsed = JSON.parse(cleaned)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as QuizQuestion[]
    }
    return defaultQuiz
  } catch (error) {
    console.error("Failed to generate quiz via Gemini:", error)
    return defaultQuiz
  }
}


