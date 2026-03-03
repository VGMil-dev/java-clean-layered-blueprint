"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useMemo, useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { MultipleChoiceQuiz } from "./multiple-choice-quiz"
import { DragAndDropMatch } from "./drag-and-drop-match"
import { OrderCodeBlock } from "./order-code-block"

export interface Exercise {
    id: string
    type: string
    title: string
    iconColor: string
    data: any
}

interface ExerciseResult {
    componentType: string
    score: number
}

interface ExerciseFactoryProps {
    moduleId: string
    exercises: Exercise[]
    results: ExerciseResult[]
    onExerciseComplete: (id: string, score: number) => void
    limit?: number
    onCountDetermined?: (count: number) => void
}

export function ExerciseFactory({ moduleId, exercises, results, onExerciseComplete, limit, onCountDetermined }: ExerciseFactoryProps) {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
        const storageKey = `repojava_eval_selected_${moduleId}`

        // Try to load from localStorage first
        const saved = localStorage.getItem(storageKey)
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as Exercise[]
                // Basic validation to ensure they exist in current exercises
                const valid = parsed.filter(p => exercises.some(e => e.id === p.id))
                if (valid.length > 0) {
                    setSelectedExercises(valid)
                    if (onCountDetermined) onCountDetermined(valid.length)
                    return
                }
            } catch (e) {
                console.error("Error parsing saved exercises:", e)
            }
        }

        // Shuffle if not found or invalid
        const shuffled = [...exercises].sort(() => Math.random() - 0.5)
        const finalized = limit ? shuffled.slice(0, Math.min(limit, exercises.length)) : shuffled

        setSelectedExercises(finalized)
        localStorage.setItem(storageKey, JSON.stringify(finalized))

        // Load current index
        const stepKey = `repojava_eval_step_${moduleId}`
        const savedStep = localStorage.getItem(stepKey)
        if (savedStep) {
            setCurrentIndex(parseInt(savedStep, 10))
        }

        if (onCountDetermined) {
            onCountDetermined(finalized.length)
        }
    }, [moduleId, exercises, limit, onCountDetermined])

    // Sync index to localStorage
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(`repojava_eval_step_${moduleId}`, currentIndex.toString())
        }
    }, [currentIndex, isHydrated, moduleId])

    if (!isHydrated) return <div className="mb-16 min-h-[400px]" />
    const renderExercise = (exercise: Exercise, index: number) => {
        const result = results.find((r) => r.componentType === exercise.id)
        const isCompleted = !!result
        const delay = index * 0.1

        let ExerciseComponent: any = null
        switch (exercise.type) {
            case "multiple_choice":
                ExerciseComponent = MultipleChoiceQuiz
                break
            case "drag_and_drop":
                ExerciseComponent = DragAndDropMatch
                break
            case "order_code":
                ExerciseComponent = OrderCodeBlock
                break
            default:
                console.warn(`Unknown exercise type: ${exercise.type}`)
                return null
        }

        const handleComplete = (score: number) => {
            onExerciseComplete(exercise.id, score)
            // If they got it right (mastery check - adjust threshold if needed)
            if (score > 0) {
                setTimeout(() => {
                    setCurrentIndex(prev => Math.min(prev + 1, selectedExercises.length))
                }, 800)
            }
        }

        return (
            <motion.div
                key={exercise.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="mt-6"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-amber/20 text-sm font-black text-amber amber-glow`}>
                            {index + 1}
                        </span>
                        {exercise.title}
                    </h2>
                    <span className="text-xs font-bold text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg border border-border/50">
                        PREGUNTA {index + 1} DE {selectedExercises.length}
                    </span>
                </div>

                <div className="relative">
                    <ExerciseComponent
                        data={exercise.data}
                        onComplete={handleComplete}
                    />
                </div>
            </motion.div>
        )
    }

    const currentExercise = selectedExercises[currentIndex]
    const allCompleted = currentIndex >= selectedExercises.length && selectedExercises.length > 0

    return (
        <div className="mb-16 min-h-[400px]">
            <AnimatePresence mode="wait">
                {currentExercise ? (
                    renderExercise(currentExercise, currentIndex)
                ) : allCompleted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl border-2 border-dashed border-amber/20 bg-amber/5 p-12 text-center"
                    >
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber/20 text-amber">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-2 italic">¡Excelente Trabajo!</h3>
                        <p className="text-muted-foreground">Has completado todos los desafíos técnica y estéticamente. Es hora de guardar tu progreso.</p>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    )
}
