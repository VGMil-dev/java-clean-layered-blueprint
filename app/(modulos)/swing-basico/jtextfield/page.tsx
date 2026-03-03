"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { FileCode, ArrowRight, ArrowLeft, Terminal, Keyboard, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside } from "@/components/swing/swing-ui"
import { TextFieldDemo } from "@/components/swing/swing-demos"

export default function JTextFieldPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JTextField: Entrada de Una Línea"
                description="Captura texto simple del usuario y maneja conversiones de tipos."
                estimatedTime="8 min"
            />

            <Aside type="note" title="Concepto Clave">
                El <strong>JTextField</strong> es el componente básico para recolectar datos breves. Todo lo que el usuario escribe llega a Java como un <code>String</code>, incluso si son números.
            </Aside>

            <TextFieldDemo />

            <div className="space-y-12 my-12">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <Keyboard className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Métodos de Captura</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "getText()", purpose: "Recupera el contenido.", reason: "<strong>Crucial:</strong> Siempre devuelve un String." },
                            { method: "setText(String)", purpose: "Limpia o actualiza el campo.", reason: "Útil para resets de formularios." },
                            { method: "setColumns(int)", purpose: "Define el ancho visual.", reason: "No limita los caracteres, solo el tamaño del campo." },
                            { method: "setEditable(boolean)", purpose: "Bloquea la edición.", reason: "Para campos de solo-lectura (ej. ID autogenerado)." },
                            { method: "selectAll()", purpose: "Resalta el texto.", reason: "<strong>UX:</strong> Facilita la sobreescritura al hacer focus." }
                        ]}
                    />
                </section>
            </div>

            <div className="my-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Terminal className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Potencia de Conversión</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { type: "Entero", method: "Integer.parseInt(s)", example: "10" },
                        { type: "Decimal", method: "Double.parseDouble(s)", example: "15.5" },
                        { type: "Flotante", method: "Float.parseFloat(s)", example: "3.14f" },
                        { type: "Largo", method: "Long.parseLong(s)", example: "1000000L" }
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-glass-border bg-black/20 flex flex-col gap-1">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold">{item.type}</span>
                            <code className="text-blue-400 text-sm font-mono">{item.method}</code>
                            <span className="text-[10px] text-zinc-600 italic">Ej: {item.example}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 my-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <AlertTriangle className="h-24 w-24 text-red-500" />
                </div>
                <h4 className="text-red-400 font-bold flex items-center gap-2 mb-4 uppercase tracking-tighter">
                    El Riesgo del Parsing
                </h4>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                    Para convertir un texto a número, usamos <code>Integer.parseInt()</code>. Si el usuario escribe algo que no es un número, Swing lanzará una excepción. ¡Debes capturarla!
                </p>
                <JavaHighlighter
                    code={`try {
    String texto = txtEdad.getText();
    int edad = Integer.parseInt(texto);
    System.out.println("Edad procesada: " + edad);
} catch (NumberFormatException e) {
    // Esto evita que tu App se cierre por error
    JOptionPane.showMessageDialog(null, "¡Ingresa solo números!");
}`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jbutton"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior: JButton
                </Link>
                <Link
                    href="/swing-basico/jtextarea"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JTextArea
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
