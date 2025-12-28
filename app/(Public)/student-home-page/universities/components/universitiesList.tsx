"use client"

import { useState, useEffect } from "react"
import { UniversityCard } from "./universityCard"

interface University {
  _id: string
  country: string
  university: string
  studyLevel: string
  universityUrl: string
  introduction: string
  photo: string
}

interface UniversitiesListProps {
  universities: University[]
  country: string
}

export function UniversitiesList({ universities, country }: UniversitiesListProps) {
  const [visibleCards, setVisibleCards] = useState<number>(0)

  // Stagger animation for cards
  useEffect(() => {
    universities.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => prev + 1)
      }, index * 100)
    })
  }, [universities])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="space-y-4 sm:space-y-6">
        {universities.map((university, index) => (
          <div
            key={university._id}
            className={`transform transition-all duration-700 ease-out ${
              index < visibleCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <UniversityCard university={university} />
          </div>
        ))}
      </div>
    </div>
  )
}
