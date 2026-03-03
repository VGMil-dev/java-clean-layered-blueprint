"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { MousePointer2, ArrowRight, ArrowLeft, Zap, BellRing } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside } from "@/components/swing/swing-ui"
import { ButtonDemo } from "@/components/swing/swing-demos"

export default function JButtonPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JButton: Disparador de Acciones"
                description="Detecta las pulsaciones del usuario y ejecuta lógica de negocio."
                estimatedTime="7 min"
            />

            <Aside type="tip" title="El Motor">
                Sin botones, una interfaz es solo una imagen. El <strong>JButton</strong> es el componente que convierte una intención del usuario en una ejecución de código real.
            </Aside>

            <ButtonDemo />

            <div className="space-y-12 my-12">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <MousePointer2 className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Eventos y Lógica</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "addActionListener()", purpose: "Detecta el clic.", reason: "**Vital:** Aquí conectas el código Java al botón." },
                            { method: "setEnabled(boolean)", purpose: "Activa/Desactiva el botón.", reason: "Evita clics dobles o envíos incompletos." },
                            { method: "setText(String)", purpose: "Actualiza el texto.", reason: "Útil para mostrar el estado (Ej: 'Guardando...')." },
                            { method: "setToolTipText(String)", purpose: "Añade un globo informativo.", reason: "**UX:** Explica qué hace el botón al pasar el mouse." },
                            { method: "setMnemonic(int)", purpose: "Acceso por teclado.", reason: "Permite usar ALT + letra para pulsar el botón." },
                            { method: "setIcon(Icon)", purpose: "Añade una imagen.", reason: "Crea botones gráficos más profesionales." }
                        ]}
                    />
                </section>
            </div>

            <div className="bg-[#120f0d] border border-glass-border rounded-2xl p-8 my-12 relative overflow-hidden group border-dashed">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <BellRing className="h-28 w-28 text-amber" />
                </div>
                <h4 className="text-amber font-bold flex items-center gap-2 mb-4 uppercase tracking-[0.1em]">
                    El Flujo del Evento
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-amber/30 pl-4">
                    Cuando un usuario pulsa el botón, Swing dispara un <strong>ActionEvent</strong>. El programa busca si hay algún "oyente" registrado (ActionListener) y ejecuta su método <code>actionPerformed</code>.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Lógica de Reacción</h3>
                <JavaHighlighter
                    code={`import javax.swing.JButton;

public class MiEvento {
    public static void main(String[] args) {
        JButton btnGuardar = new JButton("Guardar");
        
        // Uso de Expresión Lambda (Java 8+)
        btnGuardar.addActionListener(e -> {
            System.out.println("Guardando datos...");
            btnGuardar.setText("¡Éxito!");
            btnGuardar.setEnabled(false);
        });
    }
}`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jlabel"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior: JLabel
                </Link>
                <Link
                    href="/swing-basico/jtextfield"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JTextField
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
