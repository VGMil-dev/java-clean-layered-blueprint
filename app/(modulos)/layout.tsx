"use client"

import { Sidebar } from "@/components/sidebar"

export default function DiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-amber/6 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-gruvbox-orange/4 blur-[100px]" />
      </div>

      <Sidebar />

      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="px-6 py-10 sm:px-10 lg:px-16">
          {children}
        </div>
      </main>
    </div>
  )
}
