"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, RefreshCcw, X, Info } from "lucide-react"

interface AttemptModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    attemptCount: number
}

export function AttemptModal({ open, onClose, onConfirm, attemptCount }: AttemptModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="glass max-w-sm rounded-2xl p-6 border-amber/20 amber-glow shadow-2xl relative"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Icon */}
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber/20 amber-glow-subtle">
                            <AlertTriangle className="h-7 w-7 text-amber animate-pulse" />
                        </div>

                        {/* Content */}
                        <div className="text-center">
                            <h3 className="text-xl font-black text-foreground mb-2">
                                ¿Nuevo intento?
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Estás a punto de reiniciar la evaluación. Recuerda que tu nota final será el <strong className="text-amber">promedio</strong> de todos tus intentos previos.
                            </p>

                            {/* Status info */}
                            <div className="glass-subtle rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                                <Info className="h-4 w-4 text-amber shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-foreground">Estado Actual</p>
                                    <p className="text-[11px] text-muted-foreground">Ya has realizado {attemptCount} intento(s). Este sería el intento #{attemptCount + 1}.</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onConfirm}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 text-sm font-bold text-primary-foreground amber-glow"
                                >
                                    <RefreshCcw className="h-4 w-4" />
                                    Sí, reiniciar evaluación
                                </motion.button>
                                <button
                                    onClick={onClose}
                                    className="w-full py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Volver atrás
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
