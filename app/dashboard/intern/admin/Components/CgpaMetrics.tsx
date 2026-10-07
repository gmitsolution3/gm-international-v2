"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CgpaDistributionItem, CgpaMetric } from "./types/validations/analytics";


interface Props {
  metrics: CgpaMetric[];
  distribution: CgpaDistributionItem[];
}

export default function CgpaMetrics({ metrics, distribution }: Props) {
  const metric = metrics[0];
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
      className="h-full"
    >
      <Card className="h-full border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-4 w-4 text-primary" />
            CGPA Metrics
          </CardTitle>
          <CardDescription>Performance overview & distribution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* KPI row */}
          {metric && (
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Average
                </p>
                <p className="text-xl font-bold text-primary">
                  {metric.avgCgpa.toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-emerald-500/10 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  Highest
                </p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {metric.maxCgpa.toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-rose-500/10 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Lowest
                </p>
                <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
                  {metric.minCgpa.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Distribution bars */}
          {distribution.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                CGPA Distribution
              </div>
              <div className="flex h-40 items-end justify-around gap-3">
                {distribution.map((d, i) => {
                  const heightPct = (d.count / maxCount) * 100;
                  return (
                    <div
                      key={d._id}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <span className="text-xs font-medium tabular-nums">
                        {d.count}
                      </span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(heightPct, 8)}%` }}
                        transition={{
                          duration: 0.7,
                          delay: i * 0.08,
                          ease: "easeOut",
                        }}
                        className="w-full max-w-15 rounded-t-md bg-linear-to-t from-primary/60 to-primary"
                      />
                      <span className="text-[11px] text-muted-foreground">
                        {d._id}0
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
