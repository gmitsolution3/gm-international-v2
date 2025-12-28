"use client"

import { X } from "lucide-react"

interface FilterTagProps {
  label: string
  onRemove: () => void
}

export default function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-red-600 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-50 transition-colors duration-200 animate-fade-in">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-red-200 rounded-full p-0.5 transition-colors duration-200"
        aria-label={`Remove ${label} filter`}
      >
        <X size={14} className="stroke-3" />
      </button>
    </div>
  )
}
