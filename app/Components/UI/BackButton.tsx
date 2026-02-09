'use client'

import React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackButton({ className = "" }: { className?: string }) {
    const router = useRouter()

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className={`group fixed top-4 left-4 z-[9999] inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${className}`}
            aria-label="Go back"
        >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />

        </button>
    )
}