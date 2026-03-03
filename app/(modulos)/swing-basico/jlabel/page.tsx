"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { Type, ArrowRight, ArrowLeft, Image as ImageIcon, Zap } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, Aside, DemoContainer } from "@/components/swing/swing-ui"

export default function JLabelPage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JLabel: Texto e Iconos"
                description="Muestra información estática y elementos visuales de solo lectura."
                estimatedTime="5 min"
            />

            <Aside type="note" title="Uso Principal">
                El <strong>JLabel</strong> es una etiqueta. Se usa para identificar otros campos (Ej: "Nombre:") o para mostrar resultados que el usuario no debe modificar directamente.
            </Aside>

            <DemoContainer title="JLabel Simulator">
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-8 py-4 rounded-2xl border border-amber/30 bg-amber/5 text-amber font-mono text-xl shadow-xl shadow-amber/5"
                    >
                        JLabel: "Identificador de App"
                    </motion.div>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#120f0d] border border-glass-border shadow-inner group">
                        <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                            <ImageIcon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <span className="text-[10px] text-zinc-500 block font-bold uppercase tracking-widest">Icon Support</span>
                            <span className="text-sm text-zinc-100 italic">JLabel también admite .png y .jpg</span>
                        </div>
                    </div>
                </div>
            </DemoContainer>

            <div className="space-y-12 my-12">
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <Type className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Personalización Visual</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "setText(String)", purpose: "Cambia el mensaje.", reason: "Actualización dinámica de información." },
                            { method: "setFont(Font)", purpose: "Estiliza la letra.", reason: "Define jerarquías (Títulos vs Notas)." },
                            { method: "setForeground(Color)", purpose: "Color del texto.", reason: "Personalización de colores (RGB o Predefinidos)." },
                            { method: "setHorizontalAlignment()", purpose: "Posiciona el texto.", reason: "Permite centrar con SwingConstants.CENTER." },
                            { method: "setIcon(Icon)", purpose: "Añade imágenes.", reason: "Soporta PNG, JPG y GIFs para una UI rica." }
                        ]}
                    />
                </section>
            </div>

            <div className="mt-12 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber" />
                    Implementación
                </h3>
                <JavaHighlighter
                    code={`import javax.swing.JLabel;
import java.awt.Font;

public class MiEtiqueta {
    public static void main(String[] args) {
        JLabel lblBienvenida = new JLabel("Bienvenido");
        
        // Estilo profesional
        lblBienvenida.setFont(new Font("Arial", Font.BOLD, 14));
        lblBienvenida.setHorizontalAlignment(JLabel.CENTER);
        
        // Añadiendo icono
        lblBienvenida.setIcon(new ImageIcon("img.png"));
    }
}`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <Link
                    href="/swing-basico/jpanel"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-glass-border text-zinc-400 font-bold hover:bg-zinc-900 transition-all font-mono text-xs uppercase"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Anterior: JPanel
                </Link>
                <Link
                    href="/swing-basico/jbutton"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JButton
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
