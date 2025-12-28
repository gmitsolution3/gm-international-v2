"use client"

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  type: "payment" | "application"
  status: string
}

export function StatusBadge({ type, status }: StatusBadgeProps) {
  const getPaymentBadgeStyles = () => {
    switch (status?.toLowerCase()) {
      case "paid":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "text-emerald-700 dark:text-emerald-400",
          label: "Paid",
        }
      case "due":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-700 dark:text-red-400",
          label: "Due",
        }
      default:
        return {
          bg: "bg-slate-100 dark:bg-slate-800",
          text: "text-slate-700 dark:text-slate-400",
          label: status,
        }
    }
  }

  const getApplicationBadgeStyles = () => {
    switch (status?.toLowerCase()) {
      case "on-progress":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "text-emerald-700 dark:text-emerald-400",
          label: "On Progress",
        }
      case "pending":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "text-amber-700 dark:text-amber-400",
          label: "Pending",
        }
      case "cancelled":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-700 dark:text-red-400",
          label: "Cancelled",
        }
      default:
        return {
          bg: "bg-slate-100 dark:bg-slate-800",
          text: "text-slate-700 dark:text-slate-400",
          label: status,
        }
    }
  }

  const badgeStyles = type === "payment" ? getPaymentBadgeStyles() : getApplicationBadgeStyles()

  return (
    <span
      className={cn(
        "inline-block px-3 py-1.5 rounded-full text-xs font-semibold",
        "transform transition-all duration-200 hover:scale-105",
        badgeStyles.bg,
        badgeStyles.text,
      )}
    >
      {badgeStyles.label}
    </span>
  )
}
