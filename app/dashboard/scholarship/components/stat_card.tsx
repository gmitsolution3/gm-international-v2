"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: "up" | "down"
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className="bg-white/50 border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-foreground/60">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>

          <div className="flex items-center gap-2">
            {icon}
            {trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
            {trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
