"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, GripHorizontal, RotateCcw, X, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/glass-card"

export interface DragAndDropMatchData {
  pairs: { concept: string; definition: string }[]
  penalty?: number
  minScore?: number
}

interface MatchState {
  [concept: string]: string | null
}

interface DragAndDropMatchProps {
  data: DragAndDropMatchData
  onComplete?: (score: number) => void
}

export function DragAndDropMatch({ data, onComplete }: DragAndDropMatchProps) {
  const [matches, setMatches] = useState<MatchState>({})
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [completed, setCompleted] = useState(false)

  const [shuffledDefs, setShuffledDefs] = useState(() =>
    data.pairs.map((p) => p.definition)
  )

  useEffect(() => {
    setShuffledDefs((prev) => [...prev].sort(() => Math.random() - 0.5))
  }, [])

  const correctMap = Object.fromEntries(data.pairs.map((p) => [p.concept, p.definition]))
  const usedDefinitions = new Set(Object.values(matches).filter(Boolean))

  const handleDragStart = useCallback((concept: string) => {
    setDragging(concept)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDragging(null)
    setDragOver(null)
  }, [])

  const handleDropOnDefinition = useCallback(
    (definition: string) => {
      if (!dragging) return
      setMatches((prev) => ({
        ...prev,
        [dragging]: definition,
      }))
      setDragging(null)
      setDragOver(null)
    },
    [dragging]
  )

  const handleVerify = useCallback(() => {
    setVerified(true)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    const isAllCorrect = data.pairs.every((p) => matches[p.concept] === correctMap[p.concept])
    if (isAllCorrect && !completed) {
      const score = Math.max(Math.round(100 * Math.pow(0.5, newAttempts - 1)), 10)
      setCompleted(true)
      onComplete?.(score)
    }
  }, [attempts, data.pairs, matches, correctMap, onComplete, completed])

  const handleRetry = useCallback(() => {
    setMatches({})
    setVerified(false)
  }, [])

  const handleRemoveMatch = useCallback(
    (concept: string) => {
      if (verified) return
      setMatches((prev) => {
        const updated = { ...prev }
        delete updated[concept]
        return updated
      })
    },
    [verified]
  )

  const allMatched = data.pairs.every((p) => matches[p.concept])
  const allCorrect = data.pairs.every((p) => matches[p.concept] === correctMap[p.concept])

  const getResult = (concept: string) => {
    if (!verified) return null
    return matches[concept] === correctMap[concept] ? "correct" : "incorrect"
  }

  return (
    <GlassCard className="my-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gruvbox-blue/20">
          <Link2 className="h-4 w-4 text-gruvbox-blue" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-gruvbox-blue">
          Relacionar Conceptos
        </h3>
        {attempts > 0 && (
          <span className="ml-auto text-xs text-muted-foreground">
            Intentos: {attempts}
          </span>
        )}
      </div>

      <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
        Arrastra cada concepto de la izquierda y sueltalo sobre su definicion correcta a la derecha.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Concepts (draggable) */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Conceptos
          </p>
          {data.pairs.map((pair) => {
            const result = getResult(pair.concept)
            const hasMatch = !!matches[pair.concept]

            return (
              <motion.div
                key={pair.concept}
                draggable={!verified}
                onDragStart={() => handleDragStart(pair.concept)}
                onDragEnd={handleDragEnd}
                whileHover={!verified ? { scale: 1.02 } : undefined}
                animate={
                  result === "incorrect"
                    ? { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } }
                    : undefined
                }
                className={cn(
                  "relative flex items-center gap-3 rounded-xl border px-4 py-3 transition-all select-none",
                  !verified && !hasMatch && "cursor-grab active:cursor-grabbing border-glass-border hover:border-amber/40 bg-card",
                  !verified && hasMatch && "cursor-grab active:cursor-grabbing border-amber/30 bg-amber/5",
                  result === "correct" && "border-success/50 bg-success/10",
                  result === "incorrect" && "border-destructive/50 bg-destructive/10",
                  dragging === pair.concept && "opacity-50 scale-95"
                )}
              >
                <GripHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground font-mono">
                  {pair.concept}
                </span>

                {hasMatch && !verified && (
                  <button
                    onClick={() => handleRemoveMatch(pair.concept)}
                    className="ml-auto flex h-5 w-5 items-center justify-center rounded-md bg-secondary text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
                    aria-label={`Quitar relacion de ${pair.concept}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}

                {result === "correct" && (
                  <Check className="ml-auto h-4 w-4 text-success" />
                )}
                {result === "incorrect" && (
                  <X className="ml-auto h-4 w-4 text-destructive" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Definitions (drop targets) */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Definiciones
          </p>
          {shuffledDefs.map((def) => {
            const isUsed = usedDefinitions.has(def)
            const isDraggedOver = dragOver === def

            return (
              <motion.div
                key={def}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(def)
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault()
                  handleDropOnDefinition(def)
                }}
                animate={isDraggedOver ? { scale: 1.02 } : { scale: 1 }}
                className={cn(
                  "flex min-h-[52px] items-center rounded-xl border px-4 py-3 transition-all",
                  !isUsed && !isDraggedOver && "border-dashed border-glass-border bg-card/30",
                  !isUsed && isDraggedOver && "border-gruvbox-blue/50 bg-gruvbox-blue/10 border-solid",
                  isUsed && "border-amber/20 bg-amber/5 border-solid"
                )}
              >
                <span
                  className={cn(
                    "text-sm leading-relaxed",
                    isUsed ? "text-foreground/80" : "text-muted-foreground"
                  )}
                >
                  {def}
                </span>
                {isDraggedOver && !isUsed && (
                  <ArrowRight className="ml-auto h-4 w-4 text-gruvbox-blue animate-pulse" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Matched preview */}
      <AnimatePresence>
        {Object.keys(matches).length > 0 && !verified && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 space-y-2 overflow-hidden"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Tus relaciones
            </p>
            {Object.entries(matches).map(([concept, def]) =>
              def ? (
                <div
                  key={concept}
                  className="flex items-center gap-2 rounded-lg bg-secondary/30 px-3 py-2 text-xs"
                >
                  <span className="font-mono font-medium text-amber">{concept}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground/70">{def}</span>
                </div>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        {!verified && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVerify}
            disabled={!allMatched}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
              allMatched
                ? "bg-amber text-primary-foreground amber-glow hover:opacity-90"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}
          >
            <Check className="h-4 w-4" />
            Verificar
          </motion.button>
        )}

        {verified && !allCorrect && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reintentar
          </motion.button>
        )}

        {verified && allCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-5 py-2.5 text-sm font-semibold text-success"
          >
            <Check className="h-4 w-4" />
            Todas las relaciones son correctas!
          </motion.div>
        )}
      </div>
    </GlassCard>
  )
}
