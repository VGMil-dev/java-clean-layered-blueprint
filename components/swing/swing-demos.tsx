"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DemoContainer } from "./swing-ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CheckCircle2, Info, MousePointer2, ShieldAlert } from "lucide-react"

export function ButtonDemo() {
    const [clicks, setClicks] = useState(0)
    const [text, setText] = useState("¡Haz clic aquí!")

    return (
        <DemoContainer title="JButton Simulator">
            <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                    <p className="text-xs text-zinc-500 mb-2 font-mono uppercase tracking-widest">ActionEvents</p>
                    <div className="text-4xl font-black text-amber drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">{clicks}</div>
                </div>
                <Button
                    variant="outline"
                    className="h-14 px-10 border-amber/40 bg-zinc-950/50 hover:bg-amber hover:text-black transition-all active:scale-95 text-lg font-bold rounded-xl"
                    onClick={() => setClicks(c => c + 1)}
                >
                    {text}
                </Button>
                <div className="flex flex-col gap-2 w-full mt-4 p-4 rounded-xl bg-zinc-900/50 border border-glass-border">
                    <Label className="text-[10px] text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                        <Info className="h-3 w-3" />
                        Metodo .setText()
                    </Label>
                    <Input
                        placeholder="Cambiar texto del botón..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="bg-transparent border-white/10 text-xs focus:border-amber/50"
                    />
                </div>
            </div>
        </DemoContainer>
    )
}

export function TextFieldDemo() {
    const [val, setVal] = useState("25")
    const [error, setError] = useState<string | null>(null)
    const [parsed, setParsed] = useState<number | null>(25)

    const handleInput = (v: string) => {
        setVal(v)
        try {
            if (v.trim() === "") {
                setParsed(null)
                setError(null)
                return
            }
            const n = parseInt(v)
            if (isNaN(n)) throw new Error("NumberFormatException")
            setParsed(n)
            setError(null)
        } catch (e) {
            setError("NumberFormatException: No es un entero válido")
            setParsed(null)
        }
    }

    return (
        <DemoContainer title="JTextField & Parsing">
            <div className="w-full space-y-6">
                <div className="space-y-3">
                    <Label className="text-xs text-amber font-mono uppercase tracking-widest">Entrada de Usuario (getText())</Label>
                    <Input
                        placeholder="Ingresa un número (edad, cantidad...)"
                        value={val}
                        onChange={(e) => handleInput(e.target.value)}
                        className="bg-zinc-900 border-glass-border h-12 text-lg font-mono focus:ring-amber/20"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border transition-all ${error ? 'bg-red-500/10 border-red-500/40' : 'bg-emerald-500/10 border-emerald-500/40'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            {error ? <AlertTriangle className="h-4 w-4 text-red-400" /> : <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                            <span className="text-[10px] font-bold uppercase tracking-tight">Resultado del Parse</span>
                        </div>
                        <div className="font-mono text-xl">
                            {error ? (
                                <span className="text-red-400">Error!</span>
                            ) : (
                                <span className="text-emerald-400">int x = {parsed}</span>
                            )}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border border-glass-border bg-zinc-900/30">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Codigo Sugerido</span>
                        <pre className="text-[10px] font-mono text-zinc-300">
                            int n = Integer.parseInt(<br />
                            &nbsp;&nbsp;txt.getText()<br />
                            );
                        </pre>
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-red-500 italic flex items-center gap-2"
                        >
                            <AlertTriangle className="h-3 w-3" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DemoContainer>
    )
}

export function TextAreaDemo() {
    const [val, setVal] = useState("Línea 1: Iniciando sistema...\nLínea 2: Cargando componentes...\nLínea 3: Listo.")

    return (
        <DemoContainer title="JTextArea Simulator">
            <div className="w-full space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs text-amber font-mono uppercase tracking-widest">JTextArea (Multilínea)</Label>
                    <Textarea
                        placeholder="Escribe mucho aquí..."
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        className="bg-zinc-900 border-glass-border min-h-[150px] font-mono text-sm leading-relaxed"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setVal(v => v + "\nNueva línea añadida!")}
                        className="text-[10px] uppercase font-bold h-7"
                    >
                        Ejecutar .append()
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setVal("")}
                        className="text-[10px] uppercase font-bold h-7 text-zinc-500"
                    >
                        Limpiar .setText("")
                    </Button>
                </div>
            </div>
        </DemoContainer>
    )
}

export function ScrollDemo() {
    return (
        <DemoContainer title="JScrollPane (El Viewport Window)">
            <div className="relative w-full aspect-video border-2 border-dashed border-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center bg-zinc-950 p-8">
                {/* External Window Metaphor */}
                <div className="absolute inset-4 border border-white/5 rounded-xl pointer-events-none" />

                {/* Viewport Frame */}
                <div className="relative w-48 h-48 border-[6px] border-amber ring-4 ring-amber/20 shadow-[0_0_50px_rgba(251,191,36,0.1)] z-20 flex flex-col items-center justify-center bg-zinc-900/40 backdrop-blur-sm rounded-2xl">
                    <div className="absolute -top-3 bg-amber px-3 py-0.5 rounded-full text-[10px] font-bold text-black uppercase shadow-lg">VIEWPORT</div>
                    <div className="text-center p-4">
                        <MousePointer2 className="h-6 w-6 text-amber mx-auto mb-2 animate-pulse" />
                        <p className="text-[10px] font-mono text-zinc-300 uppercase leading-tight font-bold items-center">SOLO ESTO SE VE <br /> EN EL JFRAME</p>
                    </div>
                    {/* Fake scrollbars */}
                    <div className="absolute right-[-18px] top-2 bottom-2 w-2 bg-zinc-800 rounded-full">
                        <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-full h-8 bg-amber/40 rounded-full" />
                    </div>
                </div>

                {/* Background "Giant" Content */}
                <motion.div
                    animate={{
                        y: [-120, 120, -120],
                        x: [-120, 120, -120]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 w-[250%] h-[250%] opacity-20 flex items-center justify-center select-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fbbf24 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                >
                    <div className="grid grid-cols-6 gap-12 p-20">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="h-24 w-24 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex flex-col items-center justify-center text-zinc-600 font-mono text-xl group hover:border-amber/40 transition-colors">
                                <span className="text-[10px] uppercase mb-1">Elem</span>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </DemoContainer>
    )
}

export function CheckBoxDemo() {
    const [check, setCheck] = useState(false)

    return (
        <DemoContainer title="JCheckBox Simulator">
            <div className="w-full space-y-6">
                <div
                    className="flex items-center space-x-4 p-8 rounded-2xl bg-zinc-900/80 border-2 border-amber/10 cursor-pointer hover:border-amber/30 transition-all shadow-2xl group"
                    onClick={() => setCheck(!check)}
                >
                    <div className="relative">
                        <Checkbox
                            id="terms"
                            checked={check}
                            onCheckedChange={(v) => setCheck(!!v)}
                            className="h-6 w-6 border-2 border-amber/50 data-[state=checked]:bg-amber data-[state=checked]:text-black transition-colors"
                        />
                        {!check && <div className="absolute inset-0 rounded bg-amber/5 pointer-events-none group-hover:bg-amber/10 transition-colors" />}
                    </div>
                    <Label htmlFor="terms" className="text-xl font-bold font-mono text-zinc-100 cursor-pointer select-none">
                        Activar Notificaciones
                    </Label>
                </div>

                <div className="p-5 rounded-2xl border border-dashed border-zinc-800 bg-black/40">
                    <h5 className="text-[10px] text-zinc-500 uppercase font-black mb-4 text-center tracking-[0.2em]">Retorno del Método</h5>
                    <div className="flex justify-center">
                        <div className="p-4 px-8 rounded-xl bg-zinc-900/50 border border-white/5 text-center">
                            <span className="text-[9px] text-amber block mb-1 font-mono uppercase">.isSelected()</span>
                            <span className={`text-2xl font-mono font-bold ${check ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                {check.toString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </DemoContainer>
    )
}

export function ComboBoxDemo() {
    const roles = [
        "Administrador del Sistema",
        "Editor de Contenido",
        "Invitado Temporal"
    ]
    const [select, setSelect] = useState(roles[0])

    return (
        <DemoContainer title="JComboBox Simulator">
            <div className="w-full space-y-6">
                <div className="space-y-4">
                    <Label className="text-xs text-amber font-mono uppercase tracking-[0.2em] opacity-80 pl-1">Selección de Datos</Label>
                    <Select value={select} onValueChange={setSelect}>
                        <SelectTrigger className="w-full bg-zinc-900/80 border-2 border-amber/10 h-16 rounded-2xl text-lg font-bold hover:border-amber/30 transition-all shadow-lg ring-offset-zinc-950 focus:ring-amber/20">
                            <SelectValue placeholder="Selecciona..." />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-950 border-white/10">
                            {roles.map(role => (
                                <SelectItem key={role} value={role} className="py-3 focus:bg-amber focus:text-black font-medium">
                                    {role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/40 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full" />
                        <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] block mb-3">Retorno de Java</span>
                        <div className="space-y-3">
                            <div>
                                <span className="text-[9px] text-zinc-500 block mb-1 font-mono">.getSelectedItem()</span>
                                <span className="text-xl font-mono text-zinc-100 font-bold block truncate leading-none">
                                    "{select}"
                                </span>
                            </div>
                            <div className="pt-2 border-t border-white/5">
                                <span className="text-[9px] text-zinc-500 block mb-1 font-mono">.getSelectedIndex()</span>
                                <span className="text-xl font-mono text-blue-400 font-bold">
                                    {roles.indexOf(select)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-amber/20 bg-amber/5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldAlert className="h-4 w-4 text-amber" />
                            <h5 className="text-[10px] text-amber font-black uppercase tracking-[0.2em]">Casting Necesario</h5>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                            En Java, <code>getSelectedItem()</code> devuelve un <strong>Object</strong>. Debes convertirlo al tipo original para usarlo:
                        </p>
                        <div className="mt-4 p-4 bg-black/60 rounded-xl border border-white/5 group-hover:border-amber/20 transition-colors">
                            <code className="text-xs font-mono text-amber/90">
                                String rol = (String) cb.getSelectedItem();
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </DemoContainer>
    )
}
