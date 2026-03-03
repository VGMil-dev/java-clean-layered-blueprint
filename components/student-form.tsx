"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Send, Loader2, CheckCircle2, XCircle, X, CreditCard, AlertTriangle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ExerciseResult {
  componentType: string
  score: number
}

interface StudentFormProps {
  open: boolean
  onClose: () => void
  onSaved?: (attempts: number[]) => void
  day: string
  results: ExerciseResult[]
  totalQuestions?: number
}

export function StudentForm({ open, onClose, onSaved, day, results, totalQuestions }: StudentFormProps) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [cedula, setCedula] = useState("")
  const [curso, setCurso] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)
  const [attempts, setAttempts] = useState<number[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  const fetchHistory = useCallback(async (studentCedula: string) => {
    if (!studentCedula) return
    setIsLoadingHistory(true)
    try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("score")
        .eq("student_cedula", studentCedula)
        .eq("day", day)
        .eq("component_type", "total")
        .order("completed_at", { ascending: true })

      if (error) throw error
      if (data) {
        setAttempts(data.map(r => r.score))
      }
    } catch (e: any) {
      console.error("Error fetching history:", e?.message || e)
    } finally {
      setIsLoadingHistory(false)
    }
  }, [day])

  // Load student data from localStorage
  useEffect(() => {
    setIsHydrated(true)
    const savedId = localStorage.getItem("repojava_student_cedula")
    const savedName = localStorage.getItem("repojava_student_name")
    const savedLastname = localStorage.getItem("repojava_student_lastname")
    const savedCourse = localStorage.getItem("repojava_student_course")

    if (savedId) {
      setCedula(savedId)
      fetchHistory(savedId)
    }
    if (savedName) setNombre(savedName)
    if (savedLastname) setApellido(savedLastname)
    if (savedCourse) setCurso(savedCourse)
  }, [day, fetchHistory])

  // Fetch history when cedula is manually entered (10 digits)
  useEffect(() => {
    if (cedula.length === 10) {
      fetchHistory(cedula)
    }
  }, [cedula, fetchHistory])

  const courses = ["2E1G1", "2E1G2", "2E2G1", "2E2G2"]

  const divisor = totalQuestions && totalQuestions > 0 ? totalQuestions : results.length
  const totalScore = results.reduce((sum, r) => sum + r.score, 0)
  const currentAttemptScore = divisor > 0 ? Math.round(totalScore / divisor) : 0

  // Calculate Average with previous attempts
  const allAttemptScores = [...attempts, currentAttemptScore]
  const averageScore = allAttemptScores.length > 0 ? Math.round(allAttemptScores.reduce((a, b) => a + b, 0) / allAttemptScores.length) : 0

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!nombre.trim() || !apellido.trim() || !cedula.trim() || !curso) return
      setSaving(true)
      setError(false)

      try {
        // Prepare one single summary row instead of multiple question rows
        const summaryRow = {
          day,
          student_name: nombre.trim(),
          student_lastname: apellido.trim(),
          student_cedula: cedula.trim(),
          student_course: curso,
          component_type: "total",
          score: currentAttemptScore,
          attempt_number: attempts.length + 1,
          final_average: averageScore,
          completed_at: new Date().toISOString(),
        }

        const { error: dbError } = await supabase.from("user_progress").insert([summaryRow])

        if (dbError) {
          console.error("Error saving progress:", dbError.message)
          setError(true)
        } else {
          // Save student identification to localStorage for persistence
          localStorage.setItem("repojava_student_cedula", cedula.trim())
          localStorage.setItem("repojava_student_name", nombre.trim())
          localStorage.setItem("repojava_student_lastname", apellido.trim())
          localStorage.setItem("repojava_student_course", curso)

          const updatedAttempts = [...attempts, currentAttemptScore]
          setAttempts(updatedAttempts)
          if (onSaved) onSaved(updatedAttempts)

          setSaved(true)

          // Clear current session results upon success
          localStorage.removeItem(`repojava_eval_results_${day}`)
          localStorage.removeItem(`repojava_eval_selected_${day}`)
          localStorage.removeItem(`repojava_eval_step_${day}`)
        }
      } catch (err) {
        console.error("Error saving:", err)
        setError(true)
      } finally {
        setSaving(false)
      }
    },
    [nombre, apellido, cedula, curso, day, results, attempts, averageScore, currentAttemptScore, onSaved]
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass rounded-2xl p-8 w-full max-w-md amber-glow relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {saved ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Evaluacion completada
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Tu progreso ha sido guardado exitosamente.
                </p>
                <div className="glass-subtle rounded-xl px-5 py-4">
                  <p className="text-sm text-muted-foreground">Puntuacion promedio</p>
                  <p className="text-3xl font-bold text-amber mt-1">{averageScore}%</p>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/15">
                    <User className="h-5 w-5 text-amber" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Registro de Evaluacion
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Ingresa tus datos para guardar tu progreso
                    </p>
                  </div>
                </div>

                {/* Score preview */}
                <div className="flex flex-col gap-2 mb-6">
                  <div className="glass-subtle rounded-xl px-4 py-3 flex items-center justify-between border-amber/10 border bg-amber/5">
                    <span className="text-sm font-medium text-amber-intense flex items-center gap-2">
                      Puntuación de este intento
                    </span>
                    <span className="text-lg font-bold text-amber-intense">{currentAttemptScore}%</span>
                  </div>

                  {attempts.length > 0 && (
                    <div className="flex items-center gap-2 px-1">
                      <div className="h-px flex-1 bg-glass-border"></div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Historial</span>
                      <div className="h-px flex-1 bg-glass-border"></div>
                    </div>
                  )}

                  <div className="glass-subtle rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground font-bold">Nota Final Promediada</span>
                      <span className="text-[10px] text-muted-foreground">
                        {attempts.length + 1} intento(s) realizados
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-amber amber-text-glow">{averageScore}%</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Carlos"
                        className="w-full rounded-xl border border-glass-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-amber/50 focus:ring-1 focus:ring-amber/30"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="apellido"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Apellido
                      </label>
                      <input
                        id="apellido"
                        type="text"
                        required
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Ej: Garcia"
                        className="w-full rounded-xl border border-glass-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-amber/50 focus:ring-1 focus:ring-amber/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cedula"
                      className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-2"
                    >
                      <CreditCard className="h-3.5 w-3.5 text-amber" />
                      Número de Cédula (Único)
                    </label>
                    <input
                      id="cedula"
                      type="text"
                      required
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      placeholder="Ej: 1723456789"
                      className="w-full rounded-xl border border-glass-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-amber focus:ring-1 focus:ring-amber/30 font-mono"
                    />
                    <p className="mt-1.5 text-[10px] text-muted-foreground italic flex items-start gap-1">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      Este número servirá para identificarte y promediar tus notas. No te equivoques.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="curso"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Curso
                    </label>
                    <select
                      id="curso"
                      required
                      value={curso}
                      onChange={(e) => setCurso(e.target.value)}
                      className="w-full rounded-xl border border-glass-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-amber/50 focus:ring-1 focus:ring-amber/30 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25em_1.25em] bg-[right_1rem_center] bg-no-repeat"
                    >
                      <option value="" disabled className="bg-zinc-900 text-muted-foreground">Selecciona tu curso</option>
                      {courses.map(c => (
                        <option key={c} value={c} className="bg-zinc-900">{c}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3"
                    >
                      <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                      <p className="text-sm text-destructive">
                        Error al guardar. Intenta de nuevo.
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={saving || !nombre.trim() || !apellido.trim() || !cedula.trim() || !curso}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-5 py-4 text-sm font-black text-primary-foreground transition-all amber-glow hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Guardar Progreso
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
