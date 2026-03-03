"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, BookCheck } from "lucide-react"
import Link from "next/link"
import { MultipleChoiceQuiz } from "@/components/multiple-choice-quiz"
import { DragAndDropMatch } from "@/components/drag-and-drop-match"
import { OrderCodeBlock } from "@/components/order-code-block"
import { StudentForm } from "@/components/student-form"

const quizData = {
  question:
    "¿Cuál es el propósito principal de un JPanel en una aplicación Swing?",
  options: [
    "Servir como la ventana principal del sistema.",
    "Actuar como un contenedor intermedio para organizar otros componentes.",
    "Mostrar exclusivamente imágenes en alta resolución.",
    "Gestionar la conexión a la base de datos.",
  ],
  correctIndex: 1,
  explanation:
    "El JPanel funciona como un 'lienzo' o habitación dentro del edificio (JFrame), permitiendo agrupar y organizar componentes de manera modular.",
}

const matchData = {
  pairs: [
    { concept: "JFrame", definition: "Ventana principal (El Edificio)" },
    { concept: "JPanel", definition: "Contenedor intermedio (El Lienzo)" },
    { concept: "JLabel", definition: "Mostrar texto o imágenes (Etiqueta)" },
    { concept: "JButton", definition: "Elemento interactivo (Botón)" },
    { concept: "setBounds", definition: "Define posición (x,y) y tamaño (w,h)" },
  ],
}

const orderData = {
  title: "Estructura de Ventana Básica",
  description:
    "Ordena las líneas de código para crear una ventana funcional con un panel gris oscuro.",
  lines: [
    "JFrame ventana = new JFrame(\"App\");",
    "ventana.setSize(400, 300);",
    "JPanel panel = new JPanel();",
    "panel.setBackground(Color.DARK_GRAY);",
    "ventana.add(panel);",
    "ventana.setVisible(true);",
  ],
  correctOrder: [0, 1, 2, 3, 4, 5],
}

interface ExerciseResult {
  componentType: string
  score: number
}

export default function SwingEvaluacionPage() {
  const [results, setResults] = useState<ExerciseResult[]>([])
  const [showForm, setShowForm] = useState(false)

  const handleExerciseComplete = useCallback(
    (componentType: string, score: number) => {
      setResults((prev) => {
        if (prev.some((r) => r.componentType === componentType)) return prev
        const updated = [...prev, { componentType, score }]
        if (updated.length === 3) {
          setTimeout(() => setShowForm(true), 600)
        }
        return updated
      })
    },
    []
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
            {completedCount}/3 completados
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
          <span className="amber-text-glow">Pon a Prueba tu Conocimiento</span>
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Completa los tres ejercicios interactivos para demostrar que dominas los componentes básicos de Swing.
        </p>

        {completedCount === 3 && (
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
            animate={{ width: `${(completedCount / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/20 text-xs font-bold text-amber">1</span>
          Pregunta de Selección Múltiple
          {results.some((r) => r.componentType === "multiple_choice") && (
            <span className="ml-auto text-xs text-success font-medium">Completado</span>
          )}
        </h2>
        <MultipleChoiceQuiz
          data={quizData}
          onComplete={(score) => handleExerciseComplete("multiple_choice", score)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-10"
      >
        <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gruvbox-blue/20 text-xs font-bold text-gruvbox-blue">2</span>
          Relacionar Conceptos
          {results.some((r) => r.componentType === "drag_and_drop") && (
            <span className="ml-auto text-xs text-success font-medium">Completado</span>
          )}
        </h2>
        <DragAndDropMatch
          data={matchData}
          onComplete={(score) => handleExerciseComplete("drag_and_drop", score)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 mb-16"
      >
        <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gruvbox-green/20 text-xs font-bold text-gruvbox-green">3</span>
          Ordenar Código
          {results.some((r) => r.componentType === "order_code") && (
            <span className="ml-auto text-xs text-success font-medium">Completado</span>
          )}
        </h2>
        <OrderCodeBlock
          data={orderData}
          onComplete={(score) => handleExerciseComplete("order_code", score)}
        />
      </motion.div>

      <StudentForm
        open={showForm}
        onClose={() => setShowForm(false)}
        day="swing-basico"
        results={results}
      />
    </div>
  )
}
