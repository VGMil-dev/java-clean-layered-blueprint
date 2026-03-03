"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { ListFilter, ArrowRight, ArrowLeft, ShieldAlert, Sparkles } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside } from "@/components/swing/swing-ui"
import { ComboBoxDemo } from "@/components/swing/swing-demos"

export default function JComboBoxPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JComboBox: Selección Única"
                description="Listas desplegables para optimizar el espacio en la interfaz."
                estimatedTime="5 min"
            />

            <Aside type="note" title="El Menú">
                El <strong>JComboBox</strong> permite al usuario elegir una sola opción de un conjunto predefinido. Es más limpio que tener muchos RadioButtons cuando hay más de 3 opciones.
            </Aside>

            <ComboBoxDemo />

            <div className="space-y-12 my-12">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <ListFilter className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Métodos de Lista</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "getSelectedItem()", purpose: "Recupera la elección.", reason: "**Casting:** Devuelve Object, requiere conversión." },
                            { method: "addItem(Object)", purpose: "Puebla la lista.", reason: "Permite añadir opciones dinámicamente." },
                            { method: "setSelectedIndex(int)", purpose: "Define selección inicial.", reason: "Útil para valores por defecto." },
                            { method: "removeAllItems()", purpose: "Limpia la lista.", reason: "**Bases de Datos:** Vital antes de recargar nuevos datos." },
                            { method: "getModel()", purpose: "Acceso al modelo.", reason: "**Avanzado:** Permite manipular ComboBoxModel directamente." }
                        ]}
                    />
                </section>
            </div>

            <div className="flex flex-col gap-8 my-12">
                <div className="p-8 rounded-2xl border border-glass-border bg-[#120f0d] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ShieldAlert className="h-16 w-16 text-amber" />
                    </div>
                    <h4 className="flex items-center gap-2 text-amber font-bold mb-4 uppercase text-xs tracking-widest">
                        Importancia del Casting
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed font-mono border-l-2 border-amber/20 pl-4 py-2">
                        String val = (String) cbRoles.getSelectedItem();
                    </p>
                    <p className="text-xs text-zinc-500 mt-2 italic">
                        Devuelve Object, por lo que siempre debemos "castear" al tipo original.
                    </p>
                </div>
                <div className="p-8 rounded-2xl border border-glass-border bg-[#120f0d] flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Sparkles className="h-16 w-16 text-blue-400" />
                    </div>
                    <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">
                        Uso con Modelos
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-blue-500/20 pl-4">
                        Para aplicaciones reales, se recomienda usar <code>DefaultComboBoxModel</code>, separando los datos de la visualización del componente.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Código de Carga</h3>
                <JavaHighlighter
                    code={`import javax.swing.JComboBox;

public class MiCombo {
    public static void main(String[] args) {
        JComboBox<String> cbRoles = new JComboBox<>();
        cbRoles.addItem("Admin");
        cbRoles.addItem("Editor");
        cbRoles.addItem("Usuario");
        
        // Seleccionamos "Editor" programáticamente
        cbRoles.setSelectedIndex(1);
    }
}`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jcheckbox"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior
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
    )
}
