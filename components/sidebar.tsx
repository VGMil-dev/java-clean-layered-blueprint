"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  GraduationCap,
  Layers,
  Lock,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Lesson {
  id: string
  title: string
  href: string
}

interface ModuleItem {
  id: string
  title: string
  description: string
  unlocked: boolean
  completed: boolean
  lessons?: Lesson[]
}

const modules: ModuleItem[] = [
  {
    id: "swing-basico",
    title: "Componentes Básicos de Swing",
    description: "Ventana, contenedores y controles",
    unlocked: true,
    completed: false,
    lessons: [
      { id: "jframe", title: "JFrame", href: "/swing-basico/jframe" },
      { id: "jpanel", title: "JPanel", href: "/swing-basico/jpanel" },
      { id: "jlabel", title: "JLabel", href: "/swing-basico/jlabel" },
      { id: "jbutton", title: "JButton", href: "/swing-basico/jbutton" },
      { id: "jtextfield", title: "JTextField", href: "/swing-basico/jtextfield" },
      { id: "jtextarea", title: "JTextArea", href: "/swing-basico/jtextarea" },
      { id: "jscrollpane", title: "JScrollPane", href: "/swing-basico/jscrollpane" },
      { id: "jcheckbox", title: "JCheckBox", href: "/swing-basico/jcheckbox" },
      { id: "jcombobox", title: "JComboBox", href: "/swing-basico/jcombobox" },
      { id: "evaluacion", title: "Evaluación", href: "/swing-basico/evaluacion" },
    ],
  },
  { id: "control-flow", title: "Flujo de Control", description: "if, else, switch", unlocked: false, completed: false },
  { id: "loops", title: "Bucles", description: "for, while", unlocked: false, completed: false },
  { id: "arrays", title: "Arrays", description: "Arreglos y matrices", unlocked: false, completed: false },
  { id: "methods", title: "Métodos", description: "Funciones y parámetros", unlocked: false, completed: false },
  { id: "poo", title: "POO", description: "Clases y objetos", unlocked: false, completed: false },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedModules, setExpandedModules] = useState<string[]>(["swing-basico"])
  const pathname = usePathname()

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass relative flex h-screen shrink-0 flex-col border-r border-glass-border"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-glass-border px-4 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/20 amber-glow">
          <Code2 className="h-5 w-5 text-amber" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-lg font-bold tracking-tight text-foreground amber-text-glow">
                RepoJava
              </h1>
              <p className="text-xs text-muted-foreground">Master Swing</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 pt-5 pb-2"
          >
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Módulos
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module list */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {modules.map((module) => {
          const isExpanded = expandedModules.includes(module.id)
          const hasLessons = module.lessons && module.lessons.length > 0
          const isActive = pathname.includes(module.id)

          return (
            <div key={module.id} className="space-y-1">
              {module.unlocked ? (
                <div className="space-y-1">
                  <button
                    onClick={() => hasLessons && toggleModule(module.id)}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all",
                      isActive && !collapsed
                        ? "bg-amber/5 text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                        isActive
                          ? "bg-amber text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {module.id === "swing-basico" ? "S" : module.title[0]}
                    </div>
                    {!collapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold">{module.title}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{module.description}</p>
                      </div>
                    )}
                    {!collapsed && hasLessons && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200",
                          isExpanded ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && !collapsed && hasLessons && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-11 pr-2 space-y-1"
                      >
                        {module.lessons?.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={lesson.href}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-xs transition-colors",
                              pathname === lesson.href
                                ? "bg-amber/10 font-bold text-amber amber-glow"
                                : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                            )}
                          >
                            {lesson.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left cursor-not-allowed opacity-40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/30">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  {!collapsed && (
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{module.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{module.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer Progress */}
      <div className="border-t border-glass-border px-4 py-4">
        {!collapsed && (
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-amber-intense" />
            <span className="text-xs text-muted-foreground">
              Progreso: <span className="font-semibold text-amber-intense">1/6 Módulos</span>
            </span>
          </div>
        )}
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "16.6%" }}
            className="h-full rounded-full bg-gradient-to-r from-amber to-amber-intense"
          />
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-glass-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </motion.aside>
  )
}
