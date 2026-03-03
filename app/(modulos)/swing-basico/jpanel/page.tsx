"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Box, LayoutPanelLeft, Zap } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside, DemoContainer } from "@/components/swing/swing-ui"

export default function JPanelPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JPanel: El Lienzo Organizador"
                description="Aprende a agrupar componentes y gestionar el diseño interno."
                estimatedTime="5 min"
            />

            <Aside type="tip" title="La Habitación">
                Si el JFrame es el edificio, el <strong>JPanel</strong> es una habitación. Es un contenedor intermedio "ligero" que permite organizar botones, textos y entradas de manera modular.
            </Aside>

            <DemoContainer title="Visualizando el JPanel">
                <div className="relative w-full max-w-md aspect-video rounded-xl border-2 border-dashed border-blue-400/20 bg-blue-400/5 flex items-center justify-center p-6 lg:p-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full h-full rounded-2xl border-2 border-blue-400/40 bg-blue-400/10 shadow-2xl shadow-blue-400/5 flex flex-col p-4 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3">
                            <Box className="h-6 w-6 text-blue-400/50" />
                        </div>
                        <div className="text-[10px] font-mono text-blue-400 font-black uppercase mb-4 tracking-widest">JPanel (Contenedor)</div>
                        <div className="flex-1 grid grid-cols-2 gap-3 opacity-60">
                            <div className="border border-white/10 rounded-lg bg-white/5 flex items-center justify-center text-[8px] font-mono">Boton A</div>
                            <div className="border border-white/10 rounded-lg bg-white/5 flex items-center justify-center text-[8px] font-mono">Boton B</div>
                            <div className="border border-white/10 rounded-lg bg-white/5 col-span-2 flex items-center justify-center text-[8px] font-mono">Input Texto</div>
                        </div>
                    </motion.div>
                </div>
            </DemoContainer>

            <div className="flex flex-col gap-8 my-12">
                <div className="p-6 rounded-2xl border border-glass-border bg-[#120f0d] hover:border-blue-400/30 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                            <LayoutPanelLeft className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Métodos Esenciales</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "setBackground(Color)", purpose: "Define el color base.", reason: "Personalización estética." },
                            { method: "setLayout(Layout)", purpose: "Reglas de posición.", reason: "**Vital:** Define cómo se mueven los hijos." },
                            { method: "add(Component)", purpose: "Incuba un hijo.", reason: "Permite la jerarquía visual." },
                            { method: "setBorder(Border)", purpose: "Añade un marco.", reason: "Mejora la separación visual (Empty/Line Border)." },
                            { method: "setPreferredSize(Dim)", purpose: "Sugerencia de tamaño.", reason: "Respetado por LayoutManagers modernos." }
                        ]}
                    />
                </div>
                <div className="p-8 rounded-2xl border border-blue-500/10 bg-blue-500/5 border-dashed flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap className="h-20 w-20 text-blue-400" />
                    </div>
                    <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-4 uppercase text-xs tracking-widest">
                        ¿Por qué usar Paneles?
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-blue-500/20 pl-4">
                        Un JFrame solo tiene un "Content Pane" principal. Usamos múltiples JPanel para crear secciones (Navegación, Formulario, Footer) y darles a cada uno su propio color y orden.
                    </p>
                </div>
            </div>

            <div className="mt-12 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Código del Contenedor
                </h3>
                <JavaHighlighter
                    code={`import javax.swing.*;
import java.awt.Color;

public class MiPanel {
    public static void main(String[] args) {
        // 1. Construir el lienzo
        JPanel pnlContenedor = new JPanel();
        
        // 2. Pintarlo
        pnlContenedor.setBackground(Color.DARK_GRAY);
        
        // 3. Configurar Layout (null para posición absoluta)
        pnlContenedor.setLayout(null);
        
        // 4. Agregar a la ventana
        frmPrincipal.add(pnlContenedor);
    }
}`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jframe"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Regresar a JFrame
                </Link>
                <Link
                    href="/swing-basico/jlabel"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JLabel
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
