"use client"

import { motion } from "framer-motion"
import { useMemo, useEffect, useState } from "react"
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
    exercises: Exercise[]
    results: ExerciseResult[]
    onExerciseComplete: (id: string, score: number) => void
    limit?: number
    onCountDetermined?: (count: number) => void
}

export function ExerciseFactory({ exercises, results, onExerciseComplete, limit, onCountDetermined }: ExerciseFactoryProps) {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)

        // Shuffle only on client
        const shuffled = [...exercises].sort(() => Math.random() - 0.5)
        const finalized = limit ? shuffled.slice(0, Math.min(limit, exercises.length)) : shuffled

        setSelectedExercises(finalized)

        if (onCountDetermined) {
            onCountDetermined(finalized.length)
        }
    }, [exercises, limit, onCountDetermined])

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

        return (
            <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay }}
                className={index > 0 ? "mt-10" : ""}
            >
                <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-${exercise.iconColor}/20 text-xs font-bold text-${exercise.iconColor}`}>
                        {index + 1}
                    </span>
                    {exercise.title}
                    {isCompleted && (
                        <span className="ml-auto text-xs text-success font-medium">
                            Completado (+{result.score} pts)
                        </span>
                    )}
                </h2>
                <ExerciseComponent
                    data={exercise.data}
                    onComplete={(score: number) => onExerciseComplete(exercise.id, score)}
                />
            </motion.div>
        )
    }

    return (
        <div className="mb-16">
            {selectedExercises.map((exercise, index) => renderExercise(exercise, index))}
        </div>
    )
}
