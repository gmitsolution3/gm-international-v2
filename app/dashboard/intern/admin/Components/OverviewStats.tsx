"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OverviewAnalytics } from "./types/validations/analytics";


interface Props {
  overview: OverviewAnalytics;
}

const config = [
  {
    key: "totalBatches" as const,
    label: "Total Batches",
    icon: Layers,
    accent: "text-primary bg-primary/10",
    hint: "Across all programs",
  },
  {
    key: "totalInterns" as const,
    label: "Total Interns",
    icon: Users,
    accent: "text-sky-500 bg-sky-500/10",
    hint: "Registered profiles",
  },
  {
    key: "activeInterns" as const,
    label: "Active Interns",
    icon: Activity,
    accent: "text-emerald-500 bg-emerald-500/10",
    hint: "Currently engaged",
  },
  {
    key: "completionRate" as const,
    label: "Completion Rate",
    icon: CheckCircle2,
    accent: "text-violet-500 bg-violet-500/10",
    hint: "Successfully finished",
    suffix: "%",
  },
];

export default function OverviewStats({ overview }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {config.map((item, i) => {
        const Icon = item.icon;
        const value = overview[item.key];

        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Card className="group relative overflow-hidden border-border/60 bg-card shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              {/* subtle gradient accent */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-100" />
              <CardContent className="relative flex items-start justify-between gap-3 p-4 sm:p-5">
                <div className="min-w-0 space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold leading-tight sm:text-3xl">
                    {value}
                    {item.suffix ?? ""}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.hint}</p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    item.accent,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
