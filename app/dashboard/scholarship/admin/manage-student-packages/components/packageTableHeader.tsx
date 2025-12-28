
import { ChevronDown } from "lucide-react"

interface TableHeaderProps {
  onSort: (key: string) => void
  sortConfig: { key: string; direction: "asc" | "desc" } | null
}

export default function ScholarshipPackageTableHeader({ onSort, sortConfig }: TableHeaderProps) {
  const columns = [
    { key: "sl_No", label: "Sl. no." },
    { key: "packageType", label: "Package Type" },
    { key: "universitysDescription", label: "University name" },
    { key: "selectedCountry", label: "Country" },
    { key: "courseName", label: "Course" },
    { key: "packagePrice", label: "Costing" },
    { key: "deadlineDate", label: "Apply deadline" },
    { key: "selectDuration", label: "Duration" },
    { key: "startingDate", label: "Starting date" },
    { key: "manage", label: "Manage" },
  ]

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) return <ChevronDown size={16} className="opacity-30" />
    return (
      <ChevronDown
        size={16}
        className={`transition-transform duration-300 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`}
      />
    )
  }

  return (
    <thead className="bg-muted/50 border-b border-border">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            onClick={() => column.key !== "manage" && onSort(column.key)}
            className={`px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-foreground/70 uppercase tracking-wider ${
              column.key !== "manage" ? "cursor-pointer hover:bg-muted transition-colors duration-200" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{column.label}</span>
              {column.key !== "manage" && <SortIcon columnKey={column.key} />}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
