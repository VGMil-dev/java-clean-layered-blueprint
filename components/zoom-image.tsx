"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ZoomImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    caption?: string
}

export function ZoomImage({
    src,
    alt,
    width = 800,
    height = 450,
    className,
    caption,
}: ZoomImageProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={cn(
                    "group relative cursor-zoom-in overflow-hidden rounded-2xl border border-glass-border bg-[#120f0d] transition-all hover:border-amber/30",
                    className
                )}>
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="rounded-full bg-amber/90 p-3 text-primary-foreground shadow-xl shadow-amber/20 backdrop-blur-sm"
                        >
                            <Maximize2 className="h-6 w-6" />
                        </motion.div>
                    </div>
                    {caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <p className="text-sm font-medium text-white/90">{caption}</p>
                        </div>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none outline-none sm:max-w-[90vw]">
                <div className="relative flex min-h-[50vh] items-center justify-center p-4">
                    <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Cerrar</span>
                    </DialogClose>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative h-full w-full max-w-5xl"
                    >
                        <Image
                            src={src}
                            alt={alt}
                            width={1920}
                            height={1080}
                            className="h-auto w-full rounded-2xl object-contain shadow-2xl"
                            priority
                        />
                        {caption && (
                            <div className="mt-4 text-center">
                                <p className="text-lg font-medium text-white/90">{caption}</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
