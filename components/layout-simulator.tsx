"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "./glass-card"
import { JavaHighlighter } from "./java-highlighter"
import { Layout, Grid, Maximize, MousePointer2 } from "lucide-react"

type LayoutType = "flow" | "border" | "grid" | "null"

export function LayoutSimulator() {
    const [layoutType, setLayoutType] = useState<LayoutType>("flow")

    const layouts = [
        { id: "flow", name: "FlowLayout", icon: Layout, color: "text-amber" },
        { id: "border", name: "BorderLayout", icon: Maximize, color: "text-blue-400" },
        { id: "grid", name: "GridLayout", icon: Grid, color: "text-green-400" },
        { id: "null", name: "Absolute (null)", icon: MousePointer2, color: "text-red-400" },
    ]

    const getJavaCode = () => {
        switch (layoutType) {
            case "flow":
                return `JPanel p = new JPanel();\np.setLayout(new FlowLayout());\np.add(new JButton("1"));\np.add(new JButton("2"));\np.add(new JButton("3"));`
            case "border":
                return `JPanel p = new JPanel();\np.setLayout(new BorderLayout());\np.add(new JButton("N"), BorderLayout.NORTH);\np.add(new JButton("S"), BorderLayout.SOUTH);\np.add(new JButton("E"), BorderLayout.EAST);\np.add(new JButton("W"), BorderLayout.WEST);\np.add(new JButton("C"), BorderLayout.CENTER);`
            case "grid":
                return `JPanel p = new JPanel();\np.setLayout(new GridLayout(2, 2));\np.add(new JButton("1"));\np.add(new JButton("2"));\np.add(new JButton("3"));\np.add(new JButton("4"));`
            case "null":
                return `JPanel p = new JPanel();\np.setLayout(null);\n\nJButton b = new JButton("1");\nb.setBounds(50, 50, 100, 30);\np.add(b);`
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {layouts.map((l) => (
                    <button
                        key={l.id}
                        onClick={() => setLayoutType(l.id as LayoutType)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border ${layoutType === l.id
                                ? "bg-foreground/10 border-foreground/20 text-foreground"
                                : "bg-transparent border-transparent text-muted-foreground hover:bg-foreground/5"
                            }`}
                    >
                        <l.icon className={`h-4 w-4 ${layoutType === l.id ? l.color : ""}`} />
                        <span className="text-sm font-medium">{l.name}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard className="p-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden bg-background/50 border-foreground/10">
                    <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        Visualización Interactiva
                    </div>

                    <div className="w-full h-full flex items-center justify-center p-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={layoutType}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className={`w-full max-w-[400px] h-[300px] rounded-xl border-2 border-dashed border-foreground/20 bg-foreground/5 p-4 relative ${layoutType === "flow" ? "flex flex-wrap gap-2 content-start" : ""
                                    } ${layoutType === "border" ? "grid grid-cols-3 grid-rows-3 gap-2" : ""
                                    } ${layoutType === "grid" ? "grid grid-cols-2 grid-rows-2 gap-2" : ""
                                    }`}
                            >
                                {layoutType === "flow" && (
                                    <>
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <motion.div
                                                key={i}
                                                layoutId={`btn-${i}`}
                                                className="h-10 px-4 flex items-center justify-center rounded-lg bg-amber/20 border border-amber/30 text-amber text-xs font-bold"
                                            >
                                                Botón {i}
                                            </motion.div>
                                        ))}
                                    </>
                                )}

                                {layoutType === "border" && (
                                    <>
                                        <div className="col-start-1 col-end-4 row-start-1 flex items-center justify-center rounded-lg bg-blue-400/20 border border-blue-400/30 text-blue-400 text-xs font-bold">
                                            NORTH
                                        </div>
                                        <div className="col-start-1 row-start-2 flex items-center justify-center rounded-lg bg-blue-400/20 border border-blue-400/30 text-blue-400 text-xs font-bold px-2">
                                            WEST
                                        </div>
                                        <div className="col-start-2 row-start-2 flex items-center justify-center rounded-lg bg-blue-400/40 border border-blue-400/50 text-blue-400 text-xs font-bold">
                                            CENTER
                                        </div>
                                        <div className="col-start-3 row-start-2 flex items-center justify-center rounded-lg bg-blue-400/20 border border-blue-400/30 text-blue-400 text-xs font-bold px-2">
                                            EAST
                                        </div>
                                        <div className="col-start-1 col-end-4 row-start-3 flex items-center justify-center rounded-lg bg-blue-400/20 border border-blue-400/30 text-blue-400 text-xs font-bold">
                                            SOUTH
                                        </div>
                                    </>
                                )}

                                {layoutType === "grid" && (
                                    <>
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-center rounded-lg bg-green-400/20 border border-green-400/30 text-green-400 text-xs font-bold"
                                            >
                                                Celda {i}
                                            </div>
                                        ))}
                                    </>
                                )}

                                {layoutType === "null" && (
                                    <>
                                        <motion.div
                                            initial={{ x: 20, y: 20 }}
                                            animate={{ x: 30, y: 40 }}
                                            className="absolute w-24 h-10 flex items-center justify-center rounded-lg bg-red-400/20 border border-red-400/30 text-red-400 text-xs font-bold"
                                        >
                                            Btn 1
                                        </motion.div>
                                        <motion.div
                                            initial={{ x: 150, y: 100 }}
                                            animate={{ x: 180, y: 120 }}
                                            className="absolute w-32 h-14 flex items-center justify-center rounded-lg bg-red-400/20 border border-red-400/30 text-red-400 text-xs font-bold"
                                        >
                                            Btn 2 (Grande)
                                        </motion.div>
                                        <motion.div
                                            initial={{ x: 50, y: 200 }}
                                            animate={{ x: 40, y: 180 }}
                                            className="absolute w-20 h-8 flex items-center justify-center rounded-lg bg-red-400/20 border border-red-400/30 text-red-400 text-xs font-bold"
                                        >
                                            Btn 3
                                        </motion.div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="p-4 pt-0 text-center">
                        <p className="text-xs text-muted-foreground max-w-xs italic">
                            Los Layout Managers controlan automáticamente la posición y tamaño. En "null" tú tienes el control absoluto de los píxeles.
                        </p>
                    </div>
                </GlassCard>

                <div className="space-y-4">
                    <GlassCard className="p-4 border-foreground/10 bg-background/30">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-3 flex items-center gap-2">
                            <Layout className="h-3 w-3" /> Descripción
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            {layoutType === "flow" && "FlowLayout coloca componentes en una fila. Si no caben, saltan a la siguiente. Es el layout por defecto de los Paneles."}
                            {layoutType === "border" && "Dividen el contenedor en 5 áreas. Center se expande para ocupar todo el espacio restante. Ideal para estructuras principales."}
                            {layoutType === "grid" && "Divide el espacio en una cuadrícula de celdas iguales. Todos los componentes tendrán exactamente el mismo tamaño."}
                            {layoutType === "null" && "Desactiva toda la ayuda de Swing. Debes usar setBounds(x, y, w, h) para cada componente. ¡Cuidado! No es responsivo."}
                        </p>
                    </GlassCard>

                    <GlassCard className="border-foreground/10 bg-[#282828] overflow-hidden">
                        <div className="px-4 py-2 bg-black/20 border-b border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Java Implementation</span>
                            <div className="flex gap-1">
                                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                                <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                                <div className="h-2 w-2 rounded-full bg-green-500/50" />
                            </div>
                        </div>
                        <div className="p-4 overflow-x-auto text-xs">
                            <JavaHighlighter code={getJavaCode()} />
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    )
}
