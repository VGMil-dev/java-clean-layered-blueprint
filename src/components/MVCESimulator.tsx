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
            <div className="absolute inset-0 bg-[#120f0d]/98 backdrop-blur-3xl" onClick={closeSimulator} />

            <div className="relative w-full h-full md:max-w-screen-2xl md:max-h-[94vh] bg-[#120f0d] md:rounded-[48px] border-y md:border-2 border-amber-900/30 shadow-[0_0_150px_rgba(217,119,6,0.15)] overflow-hidden flex flex-col scale-in duration-500">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-6 border-b border-amber-900/20 bg-amber-950/10">
                    <div className="flex items-center gap-4 md:gap-5">
                        <div className="p-2.5 md:p-4 bg-amber-600 rounded-xl md:rounded-[22px] shadow-[0_0_30px_rgba(217,119,6,0.4)] transform hover:rotate-6 transition-transform">
                            <Zap size={20} className="md:w-6 md:h-6 text-black fill-black" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none uppercase">MVCE Event Lab</h2>
                            <p className="hidden md:block text-amber-500/60 text-[10px] uppercase tracking-[0.3em] font-black font-mono mt-1.5 text-center md:text-left">Simulación de Ingeniería de Software</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="hidden md:flex gap-3">
                            <button
                                onClick={reset}
                                disabled={isSimulating}
                                className="px-6 py-2.5 rounded-xl bg-amber-950/20 hover:bg-amber-950/40 text-amber-200/70 flex items-center gap-2.5 transition-all disabled:opacity-50 font-black text-[11px] uppercase tracking-wider border border-amber-900/30"
                            >
                                <RotateCcw size={16} /> Reiniciar
                            </button>
                            <button
                                onClick={runSimulation}
                                disabled={isSimulating}
                                className="px-8 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-black flex items-center gap-2.5 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(217,119,6,0.3)] text-[11px] uppercase tracking-wider"
                            >
                                <Play size={16} fill="currentColor" /> INICIAR
                            </button>
                        </div>
                        <button
                            onClick={closeSimulator}
                            className="p-2.5 md:p-4 rounded-lg md:rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all border border-red-500/20 group"
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
                            <div className="flex-[0.5] bg-amber-950/5 rounded-[28px] border border-amber-900/20 p-6 flex flex-col justify-between overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                    <Monitor size={100} className="text-amber-200" />
                                </div>
                                <div className="flex items-center gap-2 text-amber-800 text-[10px] uppercase tracking-[0.3em] font-black">
                                    <Monitor size={14} /> Virtual Device
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4 py-2">
                                    <div className="text-center">
                                        <div className="text-[9px] text-amber-900/50 mb-2 uppercase tracking-[0.2em] font-black">Memory Output</div>
                                        <div className={`text-6xl md:text-7xl font-black font-mono leading-none ${currentStep === 6 ? 'text-amber-400 scale-105 filter drop-shadow-[0_0_30px_rgba(217,119,6,0.3)]' : 'text-amber-950/20'} transition-all duration-1000`}>
                                            {currentStep === 6 ? '10' : '0'}
                                        </div>
                                    </div>
                                    <div className="w-full max-w-[240px] relative">
                                        <button
                                            className={`w-full py-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-3 font-black text-sm md:text-base
                                                ${isSimulating && currentStep === 0 ? 'bg-amber-600 text-black scale-95 border-amber-400 shadow-[0_0_30px_rgba(217,119,6,0.5)]' : 'bg-amber-950/40 text-amber-700 border-amber-900/20 hover:border-amber-700/50 hover:text-amber-600'}
                                            `}
                                        >
                                            <MousePointer2 size={20} /> {isSimulating && currentStep === 0 ? 'DISPARANDO' : 'OPERA SUMAR (+)'}
                                        </button>
                                        <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 animate-ping ${isSimulating && currentStep === 0 ? 'block' : 'hidden'}`} />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/10 text-[11px] text-amber-800/60 leading-tight font-medium text-center">
                                    Intercepta eventos físicos y los delega al <span className="text-amber-600 font-bold uppercase tracking-wider">Controlador</span>.
                                </div>
                            </div>

                            {/* Console Panel (Expanded) */}
                            <div className="flex-1 bg-black/40 rounded-[28px] border border-amber-900/20 flex flex-col overflow-hidden shadow-2xl relative min-h-0">
                                <div className="px-8 py-5 border-b border-amber-900/10 bg-amber-950/20 flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-amber-800/70 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-black">
                                        <Terminal size={16} className="text-amber-600" /> Pipeline Trace
                                    </div>
                                    <div className="flex gap-2.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-950 shadow-inner" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-950 shadow-inner" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-950 shadow-inner" />
                                    </div>
                                </div>
                                <div
                                    ref={scrollRef}
                                    className="flex-1 p-8 font-mono text-xs md:text-base overflow-y-auto custom-scrollbar leading-relaxed"
                                >
                                    {logs.length === 0 ? (
                                        <div className="text-amber-950/30 animate-pulse font-black text-xl flex items-center gap-4">
                                            <div className="w-1.5 h-8 bg-amber-950 animate-bounce" />
                                            SYSTEM_IDLE_
                                        </div>
                                    ) : (
                                        logs.map((log, i) => (
                                            <div key={i} className={`mb-4 animate-in fade-in slide-in-from-left-6 duration-700 ${i === logs.length - 1 ? 'text-amber-500 border-l-4 border-amber-600 pl-5 scale-[1.02] origin-left font-black' : 'text-amber-900/40 border-l-2 border-amber-950 pl-5 opacity-60'}`}>
                                                {log}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Section: High-Impact Architecture Graph */}
                        <div className="hidden lg:flex lg:col-span-8 relative rounded-[32px] border-2 border-amber-900/20 overflow-hidden bg-[#07080a] shadow-inner flex-col p-10">
                            <div className="absolute top-8 left-8 z-20 pointer-events-none">
                                <div className="px-6 py-3 rounded-full bg-amber-950/30 border border-amber-900/20 backdrop-blur-3xl shadow-3xl">
                                    <div className="text-[10px] md:text-xs text-amber-600 uppercase tracking-[0.4em] font-black flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-amber-600 shadow-[0_0_15px_rgba(217,119,6,1)] animate-pulse" />
                                        Infraestructura en tiempo real
                                    </div>
                                </div>
                            </div>

                            {/* Reusing ComponentHierarchy with manual control */}
                            <div className="flex-1 relative mt-10">
                                <div className="absolute inset-0 top-0">
                                    <ComponentHierarchy
                                        config={HIERARCHY_CONFIGS.MVCE}
                                        description="Visualización Molecular"
                                        isManual={true}
                                        controlledStep={currentStep}
                                    />
                                </div>
                            </div>

                            {/* Progress Indicator */}
                            <div className="mt-auto relative z-20 pointer-events-none">
                                <div className="bg-amber-950/20 border border-amber-900/20 p-6 rounded-[32px] backdrop-blur-3xl flex items-center gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                                    <div className="flex-1">
                                        <div className="flex justify-between text-[10px] text-amber-900/50 uppercase tracking-[0.3em] font-black mb-3 px-2">
                                            <span>Estado del Flujo</span>
                                            <span className="text-amber-600 font-black">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                                        </div>
                                        <div className="h-2.5 w-full bg-black rounded-full overflow-hidden border border-amber-950 relative">
                                            <div
                                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-700 to-amber-500 animate-[gradient_3s_linear_infinite] rounded-full shadow-[0_0_20px_rgba(217,119,6,0.5)] transition-all duration-1000 ease-out"
                                                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="px-8 py-4 bg-amber-950 rounded-[22px] border border-amber-900/20 text-center min-w-[240px] shadow-2xl">
                                        <div className="text-[9px] text-amber-800/40 uppercase font-black tracking-[0.2em] mb-1.5 leading-none">Punto de Control</div>
                                        <div className="text-base md:text-lg text-amber-100 font-black truncate tracking-tight uppercase">
                                            {HIERARCHY_CONFIGS.MVCE.steps[currentStep].title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Mobile Controls */}
                <div className="lg:hidden p-8 bg-[#120f0d] border-t border-amber-900/20 flex gap-6">
                    <button
                        onClick={reset}
                        disabled={isSimulating}
                        className="flex-1 py-6 rounded-[24px] bg-amber-950/20 text-amber-200/70 flex items-center justify-center gap-4 transition-all disabled:opacity-50 font-black text-lg border border-amber-900/30"
                    >
                        <RotateCcw size={24} />
                    </button>
                    <button
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="flex-[3] py-6 rounded-[24px] bg-amber-600 text-black font-black flex items-center justify-center gap-4 transition-all disabled:opacity-50 text-xl shadow-2xl"
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
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #3d2308; border-radius: 20px; border: 3px solid transparent; background-clip: content-box; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d97706; background-clip: content-box; }
                
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
                className="group relative cursor-pointer overflow-hidden rounded-[48px] border-2 border-slate-800 bg-slate-950 p-1 project-card-glow transition-all hover:border-amber-500/50 active:scale-[0.98] duration-500"
            >
                <div className="flex flex-col md:flex-row items-center gap-12 p-12 bg-gradient-to-br from-[#020617] to-black rounded-[44px]">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] uppercase tracking-[0.4em] font-black mb-8">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,1)]" />
                            Engine Simulation
                        </div>
                        <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-none">MVCE Event Lab</h2>
                        <p className="text-slate-500 max-w-xl text-xl leading-relaxed font-medium">
                            Visualiza el impacto atómico del patrón <span className="text-amber-500/50">Modelo-Vista-Controlador-Evento</span> en tiempo real, con trazado de pipeline y análisis de flujo de datos.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                        <div className="w-32 h-32 rounded-[36px] bg-slate-900 border-2 border-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-amber-500/5 blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
                            <Maximize2 size={48} className="text-amber-500 relative z-10 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                        </div>
                        <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 group-hover:gap-6 transition-all duration-500">
                            ABRIR LABORATORIO <ExternalLink size={18} />
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal Overlay via Portal */}
            {isOpen && mounted && createPortal(ModalContent, document.body)}

            <style>{`
                .project-card-glow {
                    box-shadow: 0 0 80px rgba(0,0,0,1);
                }
                .project-card-glow:hover {
                    box-shadow: 0 0 120px rgba(217,119,6,0.1);
                }
            `}</style>
        </div>
    );
}
