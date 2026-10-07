"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  PauseCircle,
  Users,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { InternStatus } from "../../../batch/Components/hooks/use-intern-filters";


interface Props {
  stats: {
    total: number;
    active: number;
    inactive: number;
    completed: number;
    terminated: number;
  };
  onFilter?: (status: InternStatus | "ALL") => void;
}

const config = [
  {
    key: "total" as const,
    label: "Total Interns",
    icon: Users,
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
    key: "inactive" as const,
    label: "Inactive",
    icon: PauseCircle,
    accent: "text-amber-500 bg-amber-500/10",
    filter: "INACTIVE" as const,
  },
  {
    key: "completed" as const,
    label: "Completed",
    icon: CheckCircle2,
    accent: "text-violet-500 bg-violet-500/10",
    filter: "COMPLETED" as const,
  },
  {
    key: "terminated" as const,
    label: "Terminated",
    icon: XCircle,
    accent: "text-rose-500 bg-rose-500/10",
    filter: "TERMINATED" as const,
  },
];

export default function InternStats({ stats, onFilter }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {config.map((item, i) => {
        const Icon = item.icon;
        const value = stats[item.key];
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card
              onClick={() => onFilter?.(item.filter)}
              className="cursor-pointer border-border/60 bg-card shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
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
