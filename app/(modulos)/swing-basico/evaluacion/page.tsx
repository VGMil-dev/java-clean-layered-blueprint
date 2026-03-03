"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, BookCheck } from "lucide-react"
import Link from "next/link"
import { StudentForm } from "@/components/student-form"
import { ExerciseFactory, Exercise } from "@/components/exercise-factory"
import exercisesData from "./exercises.json"

const exercises: Exercise[] = exercisesData

interface ExerciseResult {
  componentType: string
  score: number
}

export default function SwingEvaluacionPage() {
  const [results, setResults] = useState<ExerciseResult[]>([])
  const [showForm, setShowForm] = useState(false)
  const [actualExerciseCount, setActualExerciseCount] = useState(exercises.length)

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
          Completa los {actualExerciseCount} ejercicios interactivos para demostrar que dominas los componentes básicos de Swing.
        </p>

        {completedCount === actualExerciseCount && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6"
          >
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-amber/10 px-4 py-2 text-sm font-bold text-amber border border-amber/20 hover:bg-amber/20 transition-all active:scale-95"
            >
              <BookCheck className="h-4 w-4" />
              Abrir Registro de Progreso
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
        exercises={exercises}
        results={results}
        onExerciseComplete={handleExerciseComplete}
        limit={10}
        onCountDetermined={(count) => setActualExerciseCount(count)}
      />

      <StudentForm
        open={showForm}
        onClose={() => setShowForm(false)}
        day="swing-basico"
        results={results}
      />
    </div>
  )
}
