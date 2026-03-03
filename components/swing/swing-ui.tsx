"use client"

import React from "react"
import { motion } from "framer-motion"
import { Monitor, ListOrdered, CheckCircle2 } from "lucide-react"

export function DemoContainer({
    title,
    children,
    className = ""
}: {
    title: string;
    children: React.ReactNode;
    className?: string
}) {
    return (
        <div className={`my-8 overflow-hidden rounded-xl border border-glass-border bg-[#0d0a08] shadow-2xl ${className}`}>
            <div className="flex items-center justify-between border-b border-glass-border bg-[#1a1614] px-4 py-2">
                <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-amber/70" />
                    <span className="text-xs font-mono text-zinc-400 capitalize">{title}</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
            </div>
            <div className="relative p-6 flex flex-col items-center justify-center min-h-[200px] bg-grid-white/[0.02]">
                {children}
            </div>
        </div>
    )
}

export function PropertyGrid({
    properties
}: {
    properties: Array<{ method: string; purpose: string; reason: string }>
}) {
    return (
        <div className="my-6 overflow-hidden rounded-lg border border-glass-border bg-[#120f0d]">
            <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900/50 text-amber font-medium">
                    <tr>
                        <th className="px-4 py-3">Método</th>
                        <th className="px-4 py-3">Propósito</th>
                        <th className="px-4 py-3">¿Por qué usarlo?</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-glass-border">
                    {properties.map((prop, i) => (
                        <tr key={i} className="hover:bg-amber/5 transition-colors">
                            <td className="px-4 py-3 font-mono text-xs text-blue-400">{prop.method}</td>
                            <td className="px-4 py-3 text-zinc-300">{prop.purpose}</td>
                            <td className="px-4 py-3 text-zinc-400 italic text-xs">{prop.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function NumberedSteps({
    steps
}: {
    steps: Array<{ title: string; content: string }>
}) {
    return (
        <div className="my-8 space-y-6">
            {steps.map((step, i) => (
                <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber/30 bg-amber/10 text-amber font-bold text-sm group-hover:bg-amber group-hover:text-black transition-all">
                            {i + 1}
                        </div>
                        {i < steps.length - 1 && (
                            <div className="w-px h-full bg-gradient-to-b from-amber/30 to-transparent my-2" />
                        )}
                    </div>
                    <div className="pb-4">
                        <h4 className="text-zinc-100 font-medium mb-1 group-hover:text-amber transition-colors">{step.title}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{step.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function Aside({
    type = "note",
    title,
    children
}: {
    type?: "note" | "tip" | "danger" | "caution";
    title: string;
    children: React.ReactNode
}) {
    const styles = {
        note: "border-blue-500/30 bg-blue-500/5 text-blue-200",
        tip: "border-green-500/30 bg-green-500/5 text-green-200",
        danger: "border-red-500/30 bg-red-500/5 text-red-200",
        caution: "border-amber-500/30 bg-amber-500/5 text-amber-200"
    }

    return (
        <div className={`my-6 rounded-lg border p-4 ${styles[type]}`}>
            <div className="flex items-center gap-2 mb-2 font-bold uppercase tracking-wider text-[10px] opacity-80">
                <CheckCircle2 className="h-3 w-3" />
                {title}
            </div>
            <div className="text-sm leading-relaxed opacity-90">{children}</div>
        </div>
    )
}
