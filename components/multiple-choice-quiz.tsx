"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, RotateCcw, HelpCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/glass-card"

export interface MultipleChoiceQuizData {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface MultipleChoiceQuizProps {
  data: MultipleChoiceQuizData
  onComplete?: (score: number) => void
}

export function MultipleChoiceQuiz({ data, onComplete }: MultipleChoiceQuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [completed, setCompleted] = useState(false)

  const isCorrect = selectedIndex === data.correctIndex

  const handleSelect = useCallback(
    (index: number) => {
      if (hasSubmitted) return
      setSelectedIndex(index)
      setHasSubmitted(true)
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (index === data.correctIndex) {
        const score = Math.max(100 - (newAttempts - 1) * 25, 25)
        if (!completed) {
          setCompleted(true)
          onComplete?.(score)
        }
      }
    },
    [hasSubmitted, attempts, data.correctIndex, onComplete, completed]
  )

  const handleRetry = useCallback(() => {
    setSelectedIndex(null)
    setHasSubmitted(false)
  }, [])

  return (
    <GlassCard className="my-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/20">
          <HelpCircle className="h-4 w-4 text-amber" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-amber">
          Pregunta
        </h3>
        {attempts > 0 && (
          <span className="ml-auto text-xs text-muted-foreground">
            Intentos: {attempts}
          </span>
        )}
      </div>

      {/* Question */}
      <p className="mb-6 text-lg font-medium leading-relaxed text-foreground">
        {data.question}
      </p>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label={data.question}>
        {data.options.map((option, index) => {
          const isSelected = selectedIndex === index
          const isCorrectOption = index === data.correctIndex
          const showCorrect = hasSubmitted && isCorrectOption
          const showIncorrect = hasSubmitted && isSelected && !isCorrect

          return (
            <motion.button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={hasSubmitted}
              whileHover={!hasSubmitted ? { scale: 1.01, x: 4 } : undefined}
              whileTap={!hasSubmitted ? { scale: 0.99 } : undefined}
              animate={
                showIncorrect
                  ? {
                      x: [0, -8, 8, -6, 6, -3, 3, 0],
                      transition: { duration: 0.5 },
                    }
                  : undefined
              }
              className={cn(
                "group relative flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all",
                !hasSubmitted && "border-glass-border hover:border-amber/40 hover:bg-amber/5 cursor-pointer",
                showCorrect && "border-success/50 bg-success/10",
                showIncorrect && "border-destructive/50 bg-destructive/10",
                hasSubmitted && !isSelected && !isCorrectOption && "opacity-40 border-glass-border"
              )}
              role="radio"
              aria-checked={isSelected}
            >
              {/* Index letter */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors",
                  !hasSubmitted && "bg-secondary text-secondary-foreground group-hover:bg-amber/20 group-hover:text-amber",
                  showCorrect && "bg-success text-success-foreground",
                  showIncorrect && "bg-destructive text-destructive-foreground"
                )}
              >
                {showCorrect ? (
                  <Check className="h-4 w-4" />
                ) : showIncorrect ? (
                  <X className="h-4 w-4" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </div>

              {/* Option text */}
              <span
                className={cn(
                  "text-sm font-medium leading-relaxed",
                  !hasSubmitted && "text-foreground/80 group-hover:text-foreground",
                  showCorrect && "text-success",
                  showIncorrect && "text-destructive"
                )}
              >
                {option}
              </span>

              {/* Glow for correct */}
              {showCorrect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    boxShadow: "0 0 20px rgba(184, 187, 38, 0.2), 0 0 40px rgba(184, 187, 38, 0.05)",
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 overflow-hidden"
          >
            <div
              className={cn(
                "rounded-xl border px-5 py-4",
                isCorrect
                  ? "border-success/30 bg-success/5"
                  : "border-destructive/30 bg-destructive/5"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-bold",
                    isCorrect ? "text-success" : "text-destructive"
                  )}
                >
                  {isCorrect ? "Correcto!" : "Incorrecto"}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {data.explanation}
                </p>
              </div>
            </div>

            {/* Retry button */}
            {!isCorrect && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleRetry}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reintentar
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  )
}
