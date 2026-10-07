"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarDays, TrendingUp, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BatchStatItem } from "./types/validations/analytics";


interface Props {
  batches: BatchStatItem[];
}

const statusStyles: Record<BatchStatItem["status"], string> = {
  ACTIVE:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  UPCOMING: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  COMPLETED:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  CANCELLED:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

function StatusBadge({ status }: { status: BatchStatItem["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status],
      )}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function OccupancyBar({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value));
  const color =
    pct >= 80 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-primary";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
      <span className="text-xs font-medium tabular-nums text-muted-foreground">
        {pct}%
      </span>
    </div>
  );
}

export default function BatchPerformance({ batches }: Props) {
  if (batches.length === 0) {
    return (
      <Card className="border-border/60 shadow-sm">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No batch data available.
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
    >
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-4 w-4 text-primary" />
                Batch Performance
              </CardTitle>
              <CardDescription>
                Enrollment & occupancy across all batches.
              </CardDescription>
            </div>
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {batches.length} batch{batches.length !== 1 && "es"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:px-6 sm:pb-6">
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-lg border border-border/60 sm:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-20">#</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Enrolled</TableHead>
                  <TableHead className="text-center">Active</TableHead>
                  <TableHead className="text-center">Completed</TableHead>
                  <TableHead>Occupancy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((b, i) => (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="border-b border-border/40 transition-colors hover:bg-muted/30"
                  >
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {String(b.batchNumber).padStart(2, "0")}
                    </TableCell>
                    <TableCell className="font-medium">{b.batchName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div>{format(new Date(b.startDate), "MMM dd, yyyy")}</div>
                      <div className="text-xs">
                        → {format(new Date(b.endDate), "MMM dd, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <Users className="h-3 w-3" />
                        {b.totalEnrolled}/{b.maxIntern}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-medium text-emerald-600 dark:text-emerald-400">
                      {b.activeInternsCount}
                    </TableCell>
                    <TableCell className="text-center font-medium text-violet-600 dark:text-violet-400">
                      {b.completedInternsCount}
                    </TableCell>
                    <TableCell>
                      <OccupancyBar value={b.occupancyRate} />
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 p-4 sm:hidden">
            {batches.map((b, i) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-lg border border-border/60 bg-card p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">
                      Batch #{String(b.batchNumber).padStart(2, "0")}
                    </div>
                    <h4 className="truncate font-semibold">{b.batchName}</h4>
                  </div>
                  <StatusBadge status={b.status} />
                </div>

                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {format(new Date(b.startDate), "MMM dd")} →{" "}
                  {format(new Date(b.endDate), "MMM dd, yyyy")}
                </div>

                <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-muted/50 p-2">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Enrolled
                    </p>
                    <p className="text-sm font-semibold">
                      {b.totalEnrolled}/{b.maxIntern}
                    </p>
                  </div>
                  <div className="rounded-md bg-emerald-500/10 p-2">
                    <p className="text-[10px] uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      Active
                    </p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {b.activeInternsCount}
                    </p>
                  </div>
                  <div className="rounded-md bg-violet-500/10 p-2">
                    <p className="text-[10px] uppercase tracking-wide text-violet-600 dark:text-violet-400">
                      Done
                    </p>
                    <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                      {b.completedInternsCount}
                    </p>
                  </div>
                </div>

                <OccupancyBar value={b.occupancyRate} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
