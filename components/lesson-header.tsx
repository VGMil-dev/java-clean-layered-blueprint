"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Sparkles } from "lucide-react"

interface LessonHeaderProps {
  day: number
  title: string
  description: string
  estimatedTime: string
}

export function LessonHeader({ day, title, description, estimatedTime }: LessonHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber amber-glow">
          <Calendar className="h-3 w-3" />
          Dia {day}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gruvbox-blue/15 px-3 py-1 text-xs font-semibold text-gruvbox-blue">
          <Clock className="h-3 w-3" />
          {estimatedTime}
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        <span className="amber-text-glow">{title}</span>
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-amber/5 border border-amber/10 px-4 py-3">
        <Sparkles className="h-4 w-4 text-amber shrink-0" />
        <p className="text-sm text-amber/80">
          Completa todas las actividades interactivas para desbloquear el siguiente dia.
        </p>
      </div>
    </motion.header>
  )
}
