"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { CheckSquare, ArrowRight, ArrowLeft, Layers, Cpu } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside } from "@/components/swing/swing-ui"
import { CheckBoxDemo } from "@/components/swing/swing-demos"

export default function JCheckBoxPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JCheckBox: Opciones Binarias"
                description="Permite al usuario activar o desactivar opciones independientes."
                estimatedTime="5 min"
            />

            <Aside type="note" title="Uso Típico">
                El <strong>JCheckBox</strong> se usa para configuraciones o preferencias donde el usuario puede marcar varias opciones a la vez (Ej: "Recordar contraseña", "Aceptar términos").
            </Aside>

            <CheckBoxDemo />

            <div className="space-y-12 my-12">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <CheckSquare className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Gestión de Estado</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "isSelected()", purpose: "Consulta el estado.", reason: "<strong>Booleano:</strong> Detecta si está marcado o no." },
                            { method: "setSelected(boolean)", purpose: "Marca/Desmarca.", reason: "Útil para cargar preferencias guardadas." },
                            { method: "setText(String)", purpose: "Define la etiqueta.", reason: "Acompaña al cuadro con una descripción." },
                            { method: "addItemListener()", purpose: "Escucha cambios.", reason: "<strong>Reactividad:</strong> Ideal para activar otros componentes al marcar." },
                            { method: "setEnabled(boolean)", purpose: "Habilita/Deshabilita.", reason: "Bloquea opciones si no se cumple una condición previa." }
                        ]}
                    />
                </section>
            </div>

            <div className="p-8 rounded-2xl border border-glass-border bg-[#120f0d] my-12 relative group overflow-hidden border-dashed">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Cpu className="h-28 w-28 text-emerald-400" />
                </div>
                <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                    Reglas del Negocio
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-emerald-500/20 pl-4">
                    Al usar JCheckBox, el controlador debe preguntar por el estado antes de procesar un formulario: <code>if(view.chkTerminos.isSelected())...</code>
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Código de Control</h3>
                <JavaHighlighter
                    code={`import javax.swing.JCheckBox;

public class MiCheck {
    public static void main(String[] args) {
        JCheckBox chkAceptar = new JCheckBox("Recuérdame");
        
        // Consultar estado
        if (chkAceptar.isSelected()) {
            System.out.println("Usuario prefiere auto-login");
        }
    }
}`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jscrollpane"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior
                </Link>
                <Link
                    href="/swing-basico/jcombobox"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JComboBox
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
