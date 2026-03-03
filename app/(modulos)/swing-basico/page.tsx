"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SwingBasicoIndex() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/swing-basico/jframe")
  }, [router])

  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber border-t-transparent" />
    </div>
  )
}
