"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  Layers,
  Users,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BatchStatsProps {
  stats: {
    total: number;
    active: number;
    upcoming: number;
    completed: number;
    cancelled: number;
    totalCapacity: number;
  };
  onFilter?: (
    status: "ALL" | "ACTIVE" | "UPCOMING" | "COMPLETED" | "CANCELLED",
  ) => void;
}

const statConfig = [
  {
    key: "total" as const,
    label: "Total Batches",
    icon: Layers,
    accent: "text-primary bg-primary/10",
    filter: "ALL" as const,
  },
  {
    key: "active" as const,
    label: "Active",
    icon: Activity,
    accent: "text-emerald-500 bg-emerald-500/10",
    filter: "ACTIVE" as const,
  },
  {
    key: "upcoming" as const,
    label: "Upcoming",
    icon: CalendarClock,
    accent: "text-sky-500 bg-sky-500/10",
    filter: "UPCOMING" as const,
  },
  {
    key: "completed" as const,
    label: "Completed",
    icon: CheckCircle2,
    accent: "text-violet-500 bg-violet-500/10",
    filter: "COMPLETED" as const,
  },
  {
    key: "cancelled" as const,
    label: "Cancelled",
    icon: XCircle,
    accent: "text-rose-500 bg-rose-500/10",
    filter: "CANCELLED" as const,
  },
  {
    key: "totalCapacity" as const,
    label: "Total Capacity",
    icon: Users,
    accent: "text-amber-500 bg-amber-500/10",
    filter: null,
  },
];

export default function BatchStats({ stats, onFilter }: BatchStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      {statConfig.map((item, i) => {
        const Icon = item.icon;
        const value = stats[item.key];
        const clickable = !!item.filter && !!onFilter;

        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <Card
              onClick={() => clickable && onFilter?.(item.filter!)}
              className={cn(
                "border-border/60 bg-card shadow-sm transition-all",
                clickable &&
                  "cursor-pointer hover:border-primary/40 hover:shadow-md",
              )}
            >
              <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    item.accent,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold leading-tight sm:text-xl">
                    {value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
