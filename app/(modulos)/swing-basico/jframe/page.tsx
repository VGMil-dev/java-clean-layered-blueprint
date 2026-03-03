"use client"

import { LessonHeader } from "@/components/lesson-header"
import { motion } from "framer-motion"
import { ArrowRight, AppWindow, ListOrdered, Shield } from "lucide-react"
import Link from "next/link"
import { JavaHighlighter } from "@/components/java-highlighter"
import { PropertyGrid, NumberedSteps, Aside, DemoContainer } from "@/components/swing/swing-ui"

export default function JFramePage() {
    return (
        <div className="mx-auto max-w-4xl pb-20">
            <LessonHeader
                day={1}
                title="JFrame: La Ventana Principal"
                description="El punto de partida de toda aplicación visual en Swing."
                estimatedTime="5 min"
            />

            <Aside type="note" title="El Edificio">
                El <strong>JFrame</strong> es el contenedor de nivel superior. Sin él, no hay ventana. Proporciona la barra de título, los botones de minimizar/cerrar y el marco físico de tu app.
            </Aside>

            <DemoContainer title="Visualizando el JFrame">
                <div className="relative w-full max-w-md aspect-video rounded-xl border-4 border-amber/40 bg-zinc-900/50 flex flex-col shadow-2xl shadow-amber/10 overflow-hidden">
                    <div className="h-8 bg-amber/20 border-b border-amber/40 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
                        </div>
                        <span className="text-[10px] font-mono text-amber/80 font-bold uppercase tracking-widest italic ml-2">Mi Aplicación Java</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-8 border-dashed border-2 border-white/5 m-4 rounded-lg bg-black/20">
                        <div className="text-center space-y-3">
                            <AppWindow className="h-12 w-12 text-amber mx-auto opacity-50" />
                            <p className="text-xs font-mono text-zinc-500 uppercase font-black tracking-tighter">Área de Contenido (Content Pane)</p>
                        </div>
                    </div>
                </div>
            </DemoContainer>

            <div className="my-12">
                <div className="p-6 rounded-2xl border border-glass-border bg-[#120f0d] hover:border-amber/30 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-amber/10 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-amber" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Propiedades del Marco</h3>
                    </div>
                    <PropertyGrid
                        properties={[
                            { method: "setTitle(String)", purpose: "Define el nombre de la ventana.", reason: "Identificación en la barra de tareas." },
                            { method: "setSize(int, int)", purpose: "Dimensiones iniciales.", reason: "Configura el ancho y alto en píxeles." },
                            { method: "setResizable(boolean)", purpose: "Control de tamaño.", reason: "Evita que el usuario deforme tu diseño." },
                            { method: "setLocationRelativeTo(null)", purpose: "Centrar la ventana.", reason: "**UX:** Imprescindible para que aparezca centrada." },
                            { method: "setDefaultCloseOperation()", purpose: "Gestión de salida.", reason: "**Vital:** Sin esto, el proceso no muere al cerrar." },
                            { method: "setVisible(true)", purpose: "Dibujado final.", reason: "Por defecto, los JFrame nacen ocultos." }
                        ]}
                    />
                </div>
            </div>

            <div className="my-16">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                    <ListOrdered className="h-7 w-7 text-amber" />
                    Ciclo de Vida de una Ventana
                </h3>
                <NumberedSteps
                    steps={[
                        { title: "Instanciación", content: "Creamos el objeto 'new JFrame()'. En este punto la ventana existe en memoria pero es invisible." },
                        { title: "Configuración", content: "Definimos títulos, tamaños y qué pasa cuando el usuario intenta cerrar la aplicación." },
                        { title: "Ensamblaje", content: "Añadimos el contenido (paneles, botones) usando el método .add()." },
                        { title: "Lanzamiento", content: "Invocamos setVisible(true). Swing calcula el layout y dibuja los píxeles en pantalla." }
                    ]}
                />
            </div>

            <div className="mt-12 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber" />
                    Ejemplo de Código Limpio
                </h3>
                <JavaHighlighter
                    code={`import javax.swing.JFrame;

public class MiAPP {
    public static void main(String[] args) {
        // 1. Crear el objeto
        JFrame frmPrincipal = new JFrame("Master Swing");
        
        // 2. Configurar medidas
        frmPrincipal.setSize(500, 400);
        
        // 3. Ubicación (null = centrado)
        frmPrincipal.setLocationRelativeTo(null);
        
        // 4. Detener app al cerrar
        frmPrincipal.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        // 5. ¡MOSTRAR!
        frmPrincipal.setVisible(true);
    }
}`}
                />
            </div>

            <div className="flex justify-between items-center mt-20 pt-8 border-t border-glass-border">
                <div />
                <Link
                    href="/swing-basico/jpanel"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber text-black font-bold hover:bg-amber/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber/20"
                >
                    Siguiente: JPanel
                    <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
