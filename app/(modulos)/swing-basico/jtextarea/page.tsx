"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { FileText, ArrowRight, ArrowLeft, History, ScrollText } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside } from "@/components/swing/swing-ui"
import { TextAreaDemo } from "@/components/swing/swing-demos"

export default function JTextAreaPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JTextArea: Múltiples Líneas"
                description="Gestiona bloques grandes de texto, reportes y logs del sistema."
                estimatedTime="7 min"
            />

            <Aside type="note" title="Diferencia Clave">
                A diferencia de <code>JTextField</code>, el <strong>JTextArea</strong> permite saltos de línea (ENTER). Es el componente ideal para bitácoras o reportes detallados.
            </Aside>

            <TextAreaDemo />

            <div className="space-y-12 my-12">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <History className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Métodos Dinámicos</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "append(String)", purpose: "Agrega texto al final.", reason: "**Bitácoras:** Ideal para añadir líneas sin borrar lo anterior." },
                            { method: "setLineWrap(true)", purpose: "Ajuste de margen.", reason: "Evita que el texto se pierda horizontalmente." },
                            { method: "setWrapStyleWord(true)", purpose: "Salto por palabra.", reason: "Mejora drásticamente la lectura del usuario." },
                            { method: "setRows(int)", purpose: "Altura inicial.", reason: "Define cuántas líneas de texto serán visibles." },
                            { method: "setEditable(false)", purpose: "Solo lectura.", reason: "**Reportes:** Para mostrar datos que no deben alterarse." }
                        ]}
                    />
                </section>
            </div>

            <div className="space-y-4 my-12">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <ScrollText className="h-5 w-5 text-amber" />
                    Configuración Estándar
                </h4>
                <JavaHighlighter
                    code={`JTextArea txtReporte = new JTextArea(10, 30);

// Configuración recomendada para cualquier TextArea
txtReporte.setLineWrap(true);
txtReporte.setWrapStyleWord(true);

// Ejemplo de append (acumulativo)
txtReporte.append("Iniciando carga de datos...\\n");
txtReporte.append("Conexión establecida.");`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jtextfield"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior
                </Link>
                <Link
                    href="/swing-basico/jscrollpane"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JScrollPane
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
