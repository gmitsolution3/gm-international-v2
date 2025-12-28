"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

interface UniversityIntroductionProps {
  introduction: string
}

const subjects = [
  "Engineering & Technology",
  "Computer Science",
  "Business & Management",
  "Natural Sciences",
  "Humanities & Social Sciences",
  "Medicine & Health Sciences",
]

export default function UniversityIntroduction({ introduction }: UniversityIntroductionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Section Title */}
      <h2
        className={`text-2xl sm:text-3xl font-bold text-foreground mb-8 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        University Introduction
      </h2>

      {/* Introduction Text */}
      <p
        className={`text-sm sm:text-base text-slate-600 leading-relaxed mb-8 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {introduction}
      </p>

      {/* Subjects Section */}
      <div
        className={`transition-all duration-700 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Subjects</h3>

        {/* Subjects Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjects.map((subject, index) => (
            <div
              key={subject}
              className={`flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all duration-300 hover:translate-x-1 group cursor-pointer animate-slide-up`}
              style={{ animationDelay: `${500 + index * 50}ms` }}
            >
              <ChevronRight
                size={18}
                className="text-red-600 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="text-sm sm:text-base text-slate-700 font-medium">{subject}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8 sm:h-12"></div>
    </section>
  )
}
