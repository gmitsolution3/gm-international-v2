"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"




interface DropdownProps {
  options: string[];
  value: string
  onChange: (value: string) => void;
}

export default function Dropdown({ options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 flex items-center justify-between text-sm sm:text-base hover:border-red-400 group"
      >
        <span className="text-gray-700">{value}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 group-hover:text-gray-800 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 transition-all duration-200 text-sm sm:text-base ${
                option === value ? "bg-red-100 text-red-700 font-medium" : "text-gray-700 hover:bg-red-100 hover:border hover:border-red-400 hover:cursor-pointer"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
