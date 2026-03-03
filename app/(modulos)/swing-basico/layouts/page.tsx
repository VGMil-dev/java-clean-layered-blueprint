"use client"

import { LessonHeader } from "@/components/lesson-header"
import { LayoutSimulator } from "@/components/layout-simulator"
import { GlassCard } from "@/components/glass-card"
import { ArrowLeft, ArrowRight, BookOpen, AlertTriangle, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function LayoutsPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="Layout Managers"
                description="Domina el arte de posicionar componentes de forma inteligente y responsiva en Swing."
                estimatedTime="10 min"
            />

            <div className="mt-12 space-y-12">
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-1 bg-amber rounded-full" />
                        <h2 className="text-2xl font-bold text-foreground">¿Qué es un Layout Manager?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <p className="text-foreground/80 leading-relaxed">
                                En Swing, no solemos decir "pon este botón en el píxel 50,50". En su lugar, usamos <strong>Layout Managers</strong>.
                            </p>
                            <p className="text-foreground/80 leading-relaxed">
                                Son algoritmos que calculan automáticamente el tamaño y la posición de los componentes basándose en el tamaño actual de la ventana.
                            </p>
                            <GlassCard className="p-4 border-amber/20 bg-amber/5">
                                <div className="flex gap-3">
                                    <Lightbulb className="h-5 w-5 text-amber shrink-0" />
                                    <p className="text-sm text-foreground/80 italic">
                                        "Si el usuario cambia el tamaño de la ventana, el Layout Manager se encarga de reordenar todo por ti."
                                    </p>
                                </div>
                            </GlassCard>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold text-foreground flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-amber" /> Beneficios clave:
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                                <li>Multiplataforma: Se adaptan a diferentes sistemas operativos y fuentes.</li>
                                <li>Mantenimiento: Es más fácil añadir o quitar componentes.</li>
                                <li>Internacionalización: Se ajustan si el texto traducido es más largo.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-1 bg-amber rounded-full" />
                        <h2 className="text-2xl font-bold text-foreground">Simulador de Layouts</h2>
                    </div>
                    <LayoutSimulator />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassCard className="p-6 border-foreground/10">
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-400" /> El Peligro del Layout Nulo
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            Usar <code className="text-red-400">setLayout(null)</code> parece fácil al principio, pero tiene graves consecuencias:
                        </p>
                        <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                            <li>La ventana no se adapta al cambiar de tamaño.</li>
                            <li>En Windows se puede ver bien, pero en Mac o Linux los componentes pueden cortarse.</li>
                            <li>Es extremadamente difícil de mantener en proyectos grandes.</li>
                        </ul>
                    </GlassCard>

                    <GlassCard className="p-6 border-amber/10 bg-amber/5">
                        <h3 className="text-lg font-bold text-foreground mb-4">Consejo Pro</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Casi todas las interfaces profesionales se construyen <strong>anidando paneles</strong>.
                            Un panel con <code className="text-amber">BorderLayout</code> puede tener en su zona `CENTER` otro panel con <code className="text-amber">GridLayout</code>.
                        </p>
                        <div className="mt-4 p-3 rounded-lg bg-black/20 font-mono text-[10px] text-amber">
                            mainPanel.add(topToolbar, BorderLayout.NORTH);<br />
                            mainPanel.add(gridContent, BorderLayout.CENTER);
                        </div>
                    </GlassCard>
                </section>

                <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                    <Link
                        href="/swing-basico/jcombobox"
                        className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Anterior: JComboBox
                    </Link>
                    <Link
                        href="/swing-basico/evaluacion"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
                    >
                        ¡Ir a Evaluación!
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
