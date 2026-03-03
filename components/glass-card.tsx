"use client"

import { cn } from "@/lib/utils"
import { motion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  glow?: "amber" | "success" | "none"
}

export function GlassCard({ children, className, glow = "none", ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass rounded-2xl p-6",
        glow === "amber" && "amber-glow",
        glow === "success" && "success-glow",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
