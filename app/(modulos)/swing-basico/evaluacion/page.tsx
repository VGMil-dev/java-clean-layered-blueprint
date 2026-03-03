"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, BookCheck, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { StudentForm } from "@/components/student-form"
import { ExerciseFactory, Exercise } from "@/components/exercise-factory"
import { AttemptModal } from "@/components/attempt-modal"
import { supabase } from "@/lib/supabase"
import exercisesData from "./exercises.json"

const exercises: Exercise[] = exercisesData

interface ExerciseResult {
  componentType: string
  score: number
}

export default function SwingEvaluacionPage() {
  const moduleId = "swing-basico"
  const [results, setResults] = useState<ExerciseResult[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showAttemptModal, setShowAttemptModal] = useState(false)
  const [actualExerciseCount, setActualExerciseCount] = useState(exercises.length)
  const [isHydrated, setIsHydrated] = useState(false)
  const [attempts, setAttempts] = useState<number[]>([])

  // Load results from localStorage on mount
  useEffect(() => {
    setIsHydrated(true)
    const savedResults = localStorage.getItem(`repojava_eval_results_${moduleId}`)

    if (savedResults) {
      try {
        setResults(JSON.parse(savedResults))
      } catch (e) {
        console.error("Error loading results:", e)
      }
    }
  }, [moduleId])

  const fetchHistory = useCallback(async (studentCedula: string) => {
    if (!studentCedula) return
    try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("score")
        .eq("student_cedula", studentCedula)
        .eq("day", moduleId)
        .eq("component_type", "total")
        .order("completed_at", { ascending: true })

      if (error) throw error
      if (data) {
        setAttempts(data.map((r: any) => r.score))
      }
    } catch (e: any) {
      console.error("Error fetching history:", e?.message || e)
    }
  }, [moduleId])

  useEffect(() => {
    if (isHydrated) {
      const savedCedula = localStorage.getItem("repojava_student_cedula")
      if (savedCedula) {
        fetchHistory(savedCedula)
      }
    }
  }, [isHydrated, fetchHistory])

  // Sync results to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(`repojava_eval_results_${moduleId}`, JSON.stringify(results))
    }
  }, [results, isHydrated, moduleId])

  const handleNewAttempt = useCallback(() => {
    // Clear current session but keep history (handled in localStorage and state)
    localStorage.removeItem(`repojava_eval_results_${moduleId}`)
    localStorage.removeItem(`repojava_eval_selected_${moduleId}`)
    localStorage.removeItem(`repojava_eval_step_${moduleId}`)

    // Refresh page to trigger new question selection
    window.location.reload()
  }, [moduleId])

  const handleExerciseComplete = useCallback(
    (componentType: string, score: number) => {
      setResults((prev) => {
        if (prev.some((r) => r.componentType === componentType)) return prev
        const updated = [...prev, { componentType, score }]
        if (updated.length === actualExerciseCount) {
          setTimeout(() => setShowForm(true), 600)
        }
        return updated
      })
    },
    [actualExerciseCount]
  )

  const handleCountDetermined = useCallback((count: number) => {
    setActualExerciseCount(count)
  }, [])

  const completedCount = results.length

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/swing-basico"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al contenido teórico
      </Link>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber amber-glow">
            <BookCheck className="h-3 w-3" />
            Evaluación - Swing Básico
          </span>
          <span className="text-xs text-muted-foreground">
            {completedCount}/{actualExerciseCount} completados
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
          <span className="amber-text-glow">Pon a Prueba tu Conocimiento</span>
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Resuelve los desafíos paso a paso para completar este módulo.
        </p>

        {completedCount === actualExerciseCount && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-amber px-4 py-2.5 text-sm font-black text-primary-foreground amber-glow hover:opacity-90 transition-all active:scale-95"
            >
              <BookCheck className="h-4 w-4" />
              Ver Resultados y Guardar
            </button>
            <button
              onClick={() => setShowAttemptModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-2.5 text-sm font-bold text-foreground hover:bg-secondary transition-all active:scale-95"
            >
              <RefreshCcw className="h-4 w-4" />
              Nuevo Intento
            </button>
          </motion.div>
        )}

        <div className="mt-5 h-2 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-amber"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / actualExerciseCount) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.header>

      <ExerciseFactory
        moduleId={moduleId}
        exercises={exercises}
        results={results}
        onExerciseComplete={handleExerciseComplete}
        limit={10}
        onCountDetermined={handleCountDetermined}
      />

      <StudentForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSaved={(newAttempts) => setAttempts(newAttempts)}
        day={moduleId}
        results={results}
        totalQuestions={actualExerciseCount}
      />

      <AttemptModal
        open={showAttemptModal}
        onClose={() => setShowAttemptModal(false)}
        onConfirm={handleNewAttempt}
        attemptCount={attempts.length}
      />
    </div>
  )
}
