"use client";

import { motion } from "framer-motion";
import { PieChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StatusBreakdownItem } from "./types/validations/analytics";


interface Props {
  data: StatusBreakdownItem[];
}

const colorMap: Record<string, string> = {
  ACTIVE: "hsl(142 71% 45%)", // emerald
  INACTIVE: "hsl(38 92% 50%)", // amber
  COMPLETED: "hsl(258 90% 66%)", // violet
  TERMINATED: "hsl(0 84% 60%)", // rose
};

export default function StatusBreakdown({ data }: Props) {
  const total = data.reduce((s, d) => s + d.count, 0);

  // Compute stroke segments for donut
  const segments = data.reduce<
    { item: StatusBreakdownItem; offset: number; percent: number }[]
  >((acc, item) => {
    const percent = total > 0 ? item.count / total : 0;
    const offset =
      acc.length > 0
        ? acc[acc.length - 1].offset + acc[acc.length - 1].percent
        : 0;
    acc.push({ item, offset, percent });
    return acc;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="h-full"
    >
      <Card className="h-full border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <PieChart className="h-4 w-4 text-primary" />
            Status Breakdown
          </CardTitle>
          <CardDescription>Intern profile distribution</CardDescription>
        </CardHeader>
        <CardContent>
          {total === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No status data.
            </p>
          ) : (
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-around">
              {/* Donut */}
              <div className="relative h-40 w-40 shrink-0">
                <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="4"
                  />
                  {segments.map(({ item, offset, percent }) => (
                    <motion.circle
                      key={item._id}
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="none"
                      stroke={colorMap[item._id] ?? "hsl(var(--primary))"}
                      strokeWidth="4"
                      strokeDasharray={`${percent * 100} ${100 - percent * 100}`}
                      strokeDashoffset={-offset * 100}
                      initial={{ strokeDasharray: "0 100" }}
                      animate={{
                        strokeDasharray: `${percent * 100} ${100 - percent * 100}`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      strokeLinecap="butt"
                    />
                  ))}
                </svg>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold">{total}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Total
                  </p>
                </div>
              </div>

              {/* Legend */}
              <ul className="w-full space-y-2 sm:w-auto sm:min-w-40">
                {data.map((item) => {
                  const pct =
                    total > 0 ? Math.round((item.count / total) * 100) : 0;
                  return (
                    <li
                      key={item._id}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              colorMap[item._id] ?? "hsl(var(--primary))",
                          }}
                        />
                        <span className="capitalize text-muted-foreground">
                          {item._id.toLowerCase()}
                        </span>
                      </div>
                      <span className="font-medium tabular-nums">
                        {item.count} · {pct}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
