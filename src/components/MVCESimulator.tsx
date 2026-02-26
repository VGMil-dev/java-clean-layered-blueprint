import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ComponentHierarchy from './ComponentHierarchy';
import { HIERARCHY_CONFIGS } from './hierarchies/hierarchyConfigs';
import { Play, RotateCcw, Monitor, Zap, Terminal, MousePointer2, X, Maximize2, ExternalLink } from 'lucide-react';

export default function MVCESimulator() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const totalSteps = HIERARCHY_CONFIGS.MVCE.steps.length;

    useEffect(() => {
        setMounted(true);
    }, []);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, isOpen]);

    const runSimulation = async () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setLogs([]);
        setCurrentStep(0);

        const simulationSteps = [
            "Usuario hace clic en el botón 'Sumar (+)'",
            "La Vista (JButton) detecta la presión física",
            "La Vista dispara un ActionEvent",
            "El Orquestador recibe el aviso del ActionListener",
            "El Orquestador solicita el cálculo al Modelo",
            "El Modelo devuelve el resultado (5 + 5 = 10)",
            "El Orquestador actualiza el JLabel en la Vista"
        ];

        for (let i = 0; i < totalSteps; i++) {
            setCurrentStep(i);
            addLog(simulationSteps[i] || "Procesando...");
            await new Promise(resolve => setTimeout(resolve, 2200));
        }

        setIsSimulating(false);
        addLog("Simulación completada con éxito.");
    };

    const reset = () => {
        setCurrentStep(0);
        setLogs([]);
        setIsSimulating(false);
    };

    const closeSimulator = () => {
        setIsOpen(false);
        reset();
    };

    const ModalContent = (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-500">
            <div className="absolute inset-0 bg-[var(--sl-color-bg)]/98 backdrop-blur-3xl" onClick={closeSimulator} />

            <div className="relative w-full h-full md:max-w-screen-2xl md:max-h-[94vh] bg-[var(--sl-color-bg)] md:rounded-[48px] border-y md:border-2 border-[var(--sl-color-accent)]/20 shadow-[0_0_150px_rgba(var(--sl-color-accent-rgb),0.15)] overflow-hidden flex flex-col scale-in duration-500">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-6 border-b border-[var(--sl-color-accent)]/10 bg-[var(--sl-color-accent)]/[0.03]">
                    <div className="flex items-center gap-4 md:gap-5">
                        <div className="p-2.5 md:p-4 bg-[var(--sl-color-accent)] rounded-xl md:rounded-[22px] shadow-[0_0_30px_rgba(var(--sl-color-accent-rgb),0.4)] transform hover:rotate-6 transition-transform">
                            <Zap size={20} className="md:w-6 md:h-6 text-[var(--sl-color-bg)] fill-[var(--sl-color-bg)]" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-[var(--sl-color-white)] tracking-tight leading-none uppercase">MVCE Event Lab</h2>
                            <p className="hidden md:block text-[var(--sl-color-accent)]/60 text-[10px] uppercase tracking-[0.3em] font-black font-mono mt-1.5 text-center md:text-left">Simulación de Ingeniería de Software</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="hidden md:flex gap-3">
                            <button
                                onClick={reset}
                                disabled={isSimulating}
                                className="px-6 py-2.5 rounded-xl bg-[var(--sl-color-gray-6)] hover:bg-[var(--sl-color-gray-5)] text-[var(--sl-color-gray-1)] flex items-center gap-2.5 transition-all disabled:opacity-50 font-black text-[11px] uppercase tracking-wider border border-[var(--sl-color-gray-5)]"
                            >
                                <RotateCcw size={16} /> Reiniciar
                            </button>
                            <button
                                onClick={runSimulation}
                                disabled={isSimulating}
                                className="px-8 py-2.5 rounded-xl bg-[var(--sl-color-accent)] hover:bg-[var(--sl-color-accent-high)] text-[var(--sl-color-bg)] font-black flex items-center gap-2.5 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(var(--sl-color-accent-rgb),0.3)] text-[11px] uppercase tracking-wider"
                            >
                                <Play size={16} fill="currentColor" /> INICIAR
                            </button>
                        </div>
                        <button
                            onClick={closeSimulator}
                            className="p-2.5 md:p-4 rounded-lg md:rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all border border-red-500/20 group"
                        >
                            <X size={20} className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-hidden p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 h-full">

                        {/* Left Section: Combined Mock UI and Console */}
                        <div className="lg:col-span-4 flex flex-col gap-5 md:gap-6 h-full min-h-0">
                            {/* Mock UI Panel (Downsized) */}
                            <div className="flex-[0.5] bg-[var(--sl-color-gray-6)] rounded-[28px] border border-[var(--sl-color-gray-5)] p-6 flex flex-col justify-between overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                    <Monitor size={100} className="text-[var(--sl-color-accent)]" />
                                </div>
                                <div className="flex items-center gap-2 text-[var(--sl-color-gray-1)] text-[10px] uppercase tracking-[0.3em] font-black">
                                    <Monitor size={14} /> Virtual Device
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 py-2">
                                    <div className="text-center">
                                        <div className="text-[9px] text-[var(--sl-color-gray-2)] mb-2 uppercase tracking-[0.2em] font-black">Memory Output</div>
                                        <div className={`text-6xl md:text-7xl font-black font-mono leading-none ${currentStep === 6 ? 'text-[var(--sl-color-accent)] scale-105 filter drop-shadow-[0_0_30px_rgba(var(--sl-color-accent-rgb),0.3)]' : 'text-[var(--sl-color-gray-5)]'} transition-all duration-1000`}>
                                            {currentStep === 6 ? '10' : '0'}
                                        </div>
                                    </div>
                                    <div className="w-full max-w-[240px] relative">
                                        <button
                                            className={`w-full py-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-3 font-black text-sm md:text-base
                                                ${isSimulating && currentStep === 0 ? 'bg-[var(--sl-color-accent)] text-[var(--sl-color-bg)] scale-95 border-[var(--sl-color-accent-high)] shadow-[0_0_30px_rgba(var(--sl-color-accent-rgb),0.5)]' : 'bg-[var(--sl-color-gray-5)] text-[var(--sl-color-gray-1)] border-[var(--sl-color-gray-2)]/20 hover:border-[var(--sl-color-accent)]/50 hover:text-[var(--sl-color-accent)]'}
                                            `}
                                        >
                                            <MousePointer2 size={20} /> {isSimulating && currentStep === 0 ? 'DISPARANDO' : 'OPERA SUMAR (+)'}
                                        </button>
                                        <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--sl-color-accent)] animate-ping ${isSimulating && currentStep === 0 ? 'block' : 'hidden'}`} />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-[var(--sl-color-bg)] border border-[var(--sl-color-gray-5)] text-[11px] text-[var(--sl-color-gray-2)] leading-tight font-medium text-center">
                                    Intercepta eventos físicos y los delega al <span className="text-[var(--sl-color-accent)] font-bold uppercase tracking-wider">Controlador</span>.
                                </div>
                            </div>

                            {/* Console Panel (Expanded) */}
                            <div className="flex-1 bg-[var(--sl-color-bg)]/40 rounded-[28px] border border-[var(--sl-color-gray-5)] flex flex-col overflow-hidden shadow-2xl relative min-h-0">
                                <div className="px-8 py-5 border-b border-[var(--sl-color-accent)]/10 bg-[var(--sl-color-accent)]/[0.05] flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-[var(--sl-color-gray-1)] text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-black">
                                        <Terminal size={16} className="text-[var(--sl-color-accent)]" /> Pipeline Trace
                                    </div>
                                    <div className="flex gap-2.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--sl-color-gray-5)] shadow-inner" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--sl-color-gray-5)] shadow-inner" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--sl-color-gray-5)] shadow-inner" />
                                    </div>
                                </div>
                                <div
                                    ref={scrollRef}
                                    className="flex-1 p-8 font-mono text-xs md:text-base overflow-y-auto custom-scrollbar leading-relaxed"
                                >
                                    {logs.length === 0 ? (
                                        <div className="text-[var(--sl-color-gray-5)] animate-pulse font-black text-xl flex items-center gap-4">
                                            <div className="w-1.5 h-8 bg-[var(--sl-color-gray-5)] animate-bounce" />
                                            SYSTEM_IDLE_
                                        </div>
                                    ) : (
                                        logs.map((log, i) => (
                                            <div key={i} className={`mb-4 animate-in fade-in slide-in-from-left-6 duration-700 ${i === logs.length - 1 ? 'text-[var(--sl-color-accent)] border-l-4 border-[var(--sl-color-accent)] pl-5 scale-[1.02] origin-left font-black' : 'text-[var(--sl-color-gray-1)]/40 border-l-2 border-[var(--sl-color-gray-5)] pl-5 opacity-60'}`}>
                                                {log}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Section: High-Impact Architecture Graph */}
                        <div className="hidden lg:flex lg:col-span-8 relative rounded-[32px] border-2 border-[var(--sl-color-accent)]/20 overflow-hidden bg-[var(--swing-bg-main)] shadow-inner flex-col p-10">
                            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                                <div className="px-6 py-3 rounded-full bg-[var(--sl-color-bg)]/30 border border-[var(--sl-color-accent)]/20 backdrop-blur-3xl shadow-3xl">
                                    <div className="text-[10px] md:text-xs text-[var(--sl-color-accent)] uppercase tracking-[0.4em] font-black flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-[var(--sl-color-accent)] shadow-[0_0_15px_rgba(var(--sl-color-accent-rgb),1)] animate-pulse" />
                                        Infraestructura en tiempo real
                                    </div>
                                </div>
                            </div>

                            {/* Reusing ComponentHierarchy with manual control */}
                            <div className="flex-1 mt-10">
                                <ComponentHierarchy
                                    config={HIERARCHY_CONFIGS.MVCE}
                                    description="Visualización Molecular"
                                    isManual={true}
                                    controlledStep={currentStep}
                                />
                            </div>

                            {/* Progress Indicator */}
                            <div className="mt-auto relative z-20 pointer-events-none">
                                <div className="bg-[var(--sl-color-bg)]/20 border border-[var(--sl-color-accent)]/20 p-6 rounded-[32px] backdrop-blur-3xl flex items-center gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                                    <div className="flex-1">
                                        <div className="flex justify-between text-[10px] text-[var(--sl-color-gray-1)] uppercase tracking-[0.3em] font-black mb-3 px-2">
                                            <span>Estado del Flujo</span>
                                            <span className="text-[var(--sl-color-accent)] font-black">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                                        </div>
                                        <div className="h-2.5 w-full bg-[var(--sl-color-gray-6)] rounded-full overflow-hidden border border-[var(--sl-color-gray-5)] relative">
                                            <div
                                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--sl-color-accent-high)] to-[var(--sl-color-accent)] animate-[gradient_3s_linear_infinite] rounded-full shadow-[0_0_20px_rgba(var(--sl-color-accent-rgb),0.5)] transition-all duration-1000 ease-out"
                                                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="px-8 py-4 bg-[var(--sl-color-gray-6)] rounded-[22px] border border-[var(--sl-color-gray-5)] text-center min-w-[240px] shadow-2xl">
                                        <div className="text-[9px] text-[var(--sl-color-gray-1)]/40 uppercase font-black tracking-[0.2em] mb-1.5 leading-none">Punto de Control</div>
                                        <div className="text-base md:text-lg text-[var(--sl-color-white)] font-black truncate tracking-tight uppercase">
                                            {HIERARCHY_CONFIGS.MVCE.steps[currentStep].title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Mobile Controls */}
                <div className="lg:hidden p-8 bg-[var(--sl-color-bg)] border-t border-[var(--sl-color-accent)]/20 flex gap-6">
                    <button
                        onClick={reset}
                        disabled={isSimulating}
                        className="flex-1 py-6 rounded-[24px] bg-[var(--sl-color-gray-6)] text-[var(--sl-color-gray-1)] flex items-center justify-center gap-4 transition-all disabled:opacity-50 font-black text-lg border border-[var(--sl-color-gray-5)]"
                    >
                        <RotateCcw size={24} />
                    </button>
                    <button
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="flex-[3] py-6 rounded-[24px] bg-[var(--sl-color-accent)] text-[var(--sl-color-bg)] font-black flex items-center justify-center gap-4 transition-all disabled:opacity-50 text-xl shadow-2xl"
                    >
                        {isSimulating ? 'SIMULANDO...' : 'INICIAR FLUJO'}
                    </button>
                </div>

            </div>

            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 10px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--sl-color-gray-5); border-radius: 20px; border: 3px solid transparent; background-clip: content-box; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--sl-color-accent); background-clip: content-box; }
                
                @keyframes scale-in {
                    from { transform: scale(0.92); opacity: 0; filter: blur(30px); }
                    to { transform: scale(1); opacity: 1; filter: blur(0); }
                }
                .scale-in {
                    animation: scale-in 0.7s cubic-bezier(0.19, 1, 0.22, 1);
                }
            `}</style>
        </div>
    );

    return (
        <div className="my-20">
            {/* Launcher Card */}
            <div
                onClick={() => setIsOpen(true)}
                className="group relative cursor-pointer overflow-hidden rounded-[48px] border-2 border-[var(--sl-color-gray-5)] bg-[var(--sl-color-bg)] p-1 project-card-glow transition-all hover:border-[var(--sl-color-accent)]/50 active:scale-[0.98] duration-500"
            >
                <div className="flex flex-col md:flex-row items-center gap-12 p-12 bg-gradient-to-br from-[var(--sl-color-bg)] to-[var(--sl-color-gray-6)] rounded-[44px]">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--sl-color-accent)]/10 border border-[var(--sl-color-accent)]/20 text-[var(--sl-color-accent)] text-[11px] uppercase tracking-[0.4em] font-black mb-8">
                            <div className="w-2 h-2 rounded-full bg-[var(--sl-color-accent)] animate-pulse shadow-[0_0_10px_rgba(var(--sl-color-accent-rgb),1)]" />
                            Engine Simulation
                        </div>
                        <h2 className="text-5xl font-black text-[var(--sl-color-white)] mb-6 tracking-tight leading-none">MVCE Event Lab</h2>
                        <p className="text-[var(--sl-color-gray-1)] max-w-xl text-xl leading-relaxed font-medium">
                            Visualiza el impacto atómico del patrón <span className="text-[var(--sl-color-accent)]/50">Modelo-Vista-Controlador-Evento</span> en tiempo real, con trazado de pipeline y análisis de flujo de datos.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <div className="w-32 h-32 rounded-[36px] bg-[var(--sl-color-gray-6)] border-2 border-[var(--sl-color-gray-5)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-[0_0_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[var(--sl-color-accent)]/5 blur-3xl group-hover:bg-[var(--sl-color-accent)]/20 transition-all duration-700" />
                            <Maximize2 size={48} className="text-[var(--sl-color-accent)] relative z-10 filter drop-shadow-[0_0_15px_rgba(var(--sl-color-accent-rgb),0.5)]" />
                        </div>
                        <span className="text-[var(--sl-color-accent)] font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                            ABRIR LABORATORIO <ExternalLink size={18} />
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal Overlay via Portal */}
            {isOpen && mounted && createPortal(ModalContent, document.body)}

            <style>{`
                .project-card-glow {
                    box-shadow: 0 0 80px rgba(0,0,0,0.05);
                }
                .project-card-glow:hover {
                    box-shadow: 0 0 120px rgba(var(--sl-color-accent-rgb),0.1);
                }
            `}</style>
        </div>
    );
}
