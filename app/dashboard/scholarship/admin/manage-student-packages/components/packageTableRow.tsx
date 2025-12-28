"use client"
import { useState } from "react"

interface TableRowProps {
  item: any
  index: number
}

export default function ScholarshipPackageTableRow({ item, index }: TableRowProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <tr
      className="hover:bg-red-200/50 transition-all duration-300 border-b border-border last:border-b-0 animate-slideUp"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground/70 font-medium whitespace-nowrap">{item.sl_No}</td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground/70">Package Type</td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground font-medium">{item.selectedUniversity}</td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground/70">{item.selectedCountry.name}</td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground/70">{item.courseName}</td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground font-semibold">${item.packagePrice}</td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground/70">
        {new Date(item.deadlineDate).toLocaleDateString()}
      </td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground/70">{item.selectDuration}</td>
      <td className="px-4 sm:px-6 py-4 text-sm text-foreground/70">
        {new Date(item.startingDate).toLocaleDateString()}
      </td>
      <td className="px-4 sm:px-6 py-4 text-sm">
        <button
          className={`px-3 py-1.5 rounded-md transition-all duration-300 font-medium text-sm hover:cursor-pointer ${
            isHovered ? "bg-red-600 text-background" : "text-foreground hover:bg-muted"
          }`}
        >
          Manage
        </button>
      </td>
    </tr>
  )
}
