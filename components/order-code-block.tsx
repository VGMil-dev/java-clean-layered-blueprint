"use client"

import { useState, useCallback, useMemo, useEffect, useId } from "react"
import { motion } from "framer-motion"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Check, Code2, GripVertical, RotateCcw, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/glass-card"
import { JavaHighlighter } from "@/components/java-highlighter"

export interface OrderCodeBlockData {
  title: string
  description: string
  lines: string[]
  correctOrder: number[]
  penalty?: number
  minScore?: number
}

interface SortableLineProps {
  id: string
  line: string
  index: number
  result: "correct" | "incorrect" | null
  disabled: boolean
}

function SortableLine({ id, line, index, result, disabled }: SortableLineProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      animate={
        result === "incorrect"
          ? { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } }
          : undefined
      }
      className={cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
        isDragging && "z-10 shadow-lg shadow-amber/10 scale-[1.02]",
        !result && "border-glass-border bg-card hover:border-amber/30",
        result === "correct" && "border-success/50 bg-success/10",
        result === "incorrect" && "border-destructive/50 bg-destructive/10"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className={cn(
          "flex h-6 w-6 shrink-0 cursor-grab items-center justify-center rounded-md text-muted-foreground transition-colors active:cursor-grabbing",
          !disabled && "hover:bg-secondary hover:text-foreground"
        )}
        aria-label={`Mover linea ${index + 1}`}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-bold text-muted-foreground">
        {index + 1}
      </span>

      <div className="flex-1 overflow-x-auto">
        <JavaHighlighter code={line} />
      </div>

      {result === "correct" && <Check className="h-4 w-4 shrink-0 text-success" />}
      {result === "incorrect" && <X className="h-4 w-4 shrink-0 text-destructive" />}
    </motion.div>
  )
}

interface OrderCodeBlockProps {
  data: OrderCodeBlockData
  onComplete?: (score: number) => void
}

export function OrderCodeBlock({ data, onComplete }: OrderCodeBlockProps) {
  const dndId = useId()
  const [completed, setCompleted] = useState(false)

  const [items, setItems] = useState<string[]>(() =>
    data.lines.map((_, i) => `line-${i}`)
  )

  useEffect(() => {
    setItems((prev) => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5)
      const isCorrect = shuffled.every(
        (id, idx) => parseInt(id.split("-")[1]) === data.correctOrder[idx]
      )
      if (isCorrect) {
        const temp = shuffled[0]
        shuffled[0] = shuffled[shuffled.length - 1]
        shuffled[shuffled.length - 1] = temp
      }
      return shuffled
    })
  }, [data.correctOrder])

  const [verified, setVerified] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const lineResults = useMemo(() => {
    if (!verified) return items.map(() => null)
    return items.map((id, idx) => {
      const lineIndex = parseInt(id.split("-")[1])
      return lineIndex === data.correctOrder[idx] ? "correct" : "incorrect"
    })
  }, [verified, items, data.correctOrder])

  const allCorrect = verified && lineResults.every((r) => r === "correct")

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.indexOf(active.id as string)
        const newIndex = prev.indexOf(over.id as string)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }, [])

  const handleVerify = useCallback(() => {
    setVerified(true)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    const isAllCorrect = items.every(
      (id, idx) => parseInt(id.split("-")[1]) === data.correctOrder[idx]
    )
    if (isAllCorrect && !completed) {
      const penalty = data.penalty ?? 20
      const minScore = data.minScore ?? 20
      const score = Math.max(100 - (newAttempts - 1) * penalty, minScore)
      setCompleted(true)
      onComplete?.(score)
    }
  }, [attempts, items, data.correctOrder, onComplete, completed])

  const handleRetry = useCallback(() => {
    setVerified(false)
  }, [])

  return (
    <GlassCard className="my-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gruvbox-green/20">
          <Code2 className="h-4 w-4 text-gruvbox-green" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-gruvbox-green">
          Ordenar Codigo
        </h3>
        {attempts > 0 && (
          <span className="ml-auto text-xs text-muted-foreground">
            Intentos: {attempts}
          </span>
        )}
      </div>

      <p className="mb-1 text-base font-medium text-foreground">{data.title}</p>
      <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
        {data.description}
      </p>

      {/* Sortable code lines */}
      <div className="space-y-2">
        <DndContext
          id={dndId}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id, index) => {
              const lineIndex = parseInt(id.split("-")[1])
              return (
                <SortableLine
                  key={id}
                  id={id}
                  line={data.lines[lineIndex]}
                  index={index}
                  result={lineResults[index] as "correct" | "incorrect" | null}
                  disabled={verified}
                />
              )
            })}
          </SortableContext>
        </DndContext>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        {!verified && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVerify}
            className="inline-flex items-center gap-2 rounded-lg bg-amber px-5 py-2.5 text-sm font-semibold text-primary-foreground amber-glow transition-all hover:opacity-90"
          >
            <Check className="h-4 w-4" />
            Verificar Orden
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

        {allCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-5 py-2.5 text-sm font-semibold text-success"
          >
            <Check className="h-4 w-4" />
            Orden correcto! El programa es funcional.
          </motion.div>
        )}
      </div>
    </GlassCard>
  )
}
