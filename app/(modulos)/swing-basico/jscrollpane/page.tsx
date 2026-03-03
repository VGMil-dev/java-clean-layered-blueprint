"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { Layers, ArrowRight, ArrowLeft, Settings, MousePointer2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside } from "@/components/swing/swing-ui"
import { ScrollDemo } from "@/components/swing/swing-demos"

export default function JScrollPanePage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JScrollPane: El Concepto de Viewport"
                description="Proporciona barras de desplazamiento a cualquier componente que exceda el tamaño visible."
                estimatedTime="6 min"
            />

            <Aside type="tip" title="El Contenedor Invisible">
                Un <code>JTextArea</code> o un <code>JPanel</code> grande no tienen barras de desplazamiento por sí solos. Necesitan ser "envueltos" en un <strong>JScrollPane</strong> para poder navegar por su contenido.
            </Aside>

            <ScrollDemo />

            <div className="space-y-12 my-12">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <Settings className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Configuración de Barras</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "VERTICAL_SCROLLBAR_ALWAYS", purpose: "Barra fija.", reason: "Mantiene la UI estática incluso si no hay texto." },
                            { method: "VERTICAL_SCROLLBAR_AS_NEEDED", purpose: "Auto-detección.", reason: "**Recomendado:** Solo aparece si el contenido se desborda." },
                            { method: "setViewportView(Component)", purpose: "Define el contenido.", reason: "Alternativa al constructor para añadir el componente." },
                            { method: "getVerticalScrollBar()", purpose: "Acceso a la barra.", reason: "**Avanzado:** Permite cambiar la velocidad de scroll." },
                            { method: "setWheelScrollingEnabled()", purpose: "Control de mouse.", reason: "Habilita/Deshabilita el scroll con la rueda del ratón." }
                        ]}
                    />
                </section>
            </div>

            <div className="rounded-2xl border-2 border-amber/20 bg-amber/5 p-8 my-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <AlertCircle className="h-20 w-24 text-amber" />
                </div>
                <h4 className="text-amber font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                    Jerarquía de Construcción (¡VITAL!)
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8 font-medium italic">
                    Imaginalo como una muñeca rusa o un cuadro con marco. No puedes colgar el lienzo y el marco por separado; el lienzo va <strong>dentro</strong> del marco.
                </p>

                <div className="relative h-48 w-full bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center p-4">
                    {/* JFrame (Outer) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full border-2 border-blue-500/30 bg-blue-500/5 rounded-xl flex items-center justify-center p-6 relative"
                    >
                        <span className="absolute top-2 left-3 text-[8px] font-bold text-blue-400 uppercase tracking-widest">JFrame (La Ventana)</span>

                        {/* JScrollPane (Middle) */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full h-full border-2 border-amber-500/40 bg-amber-500/10 rounded-lg flex items-center justify-center p-4 relative"
                        >
                            <span className="absolute top-1 left-2 text-[7px] font-bold text-amber-500 uppercase">JScrollPane (El Marco)</span>

                            {/* Base Component (Inner) */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-full h-full border border-zinc-500/50 bg-zinc-800 rounded flex items-center justify-center shadow-2xl"
                            >
                                <span className="text-[9px] font-mono text-zinc-300">JTextArea / JPanel</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Logic Flow Overlay */}
                    <div className="absolute -bottom-4 bg-zinc-900 border border-glass-border px-4 py-1 rounded-full text-[10px] text-zinc-400 font-mono shadow-xl">
                        add( <span className="text-amber-400">new JScrollPane</span>( <span className="text-zinc-300 font-bold underline">componente</span> ) )
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Ejemplo Técnico</h3>
                <JavaHighlighter
                    code={`// 1. Crear el contenido gigante
JTextArea txtGrande = new JTextArea(20, 50);

// 2. Envolverlo en el ScrollPane
JScrollPane scpContenedor = new JScrollPane(txtGrande);

// 3. Añadir el SCROLL al JFrame (no el txt)
frmPrincipal.add(scpContenedor);`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jtextarea"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior
                </Link>
                <Link
                    href="/swing-basico/jcheckbox"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JCheckBox
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
