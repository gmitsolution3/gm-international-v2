"use client";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rounded variant */
  rounded?: "sm" | "md" | "lg" | "full";
}

export function Shimmer({ className, rounded = "md", ...props }: ShimmerProps) {
  const radius = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        radius,
        // animated sheen
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_1.6s_infinite]",
        "before:bg-linear-to-r",
        "before:from-transparent before:via-foreground/6 before:to-transparent",
        "dark:before:via-foreground/8",
        className,
      )}
      {...props}
    />
  );
}

export default function BatchSkeleton() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen w-full bg-background"
    >
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Page Header */}
        <motion.div variants={item} className="space-y-2">
          <Shimmer className="h-8 w-64 sm:h-9 sm:w-80" rounded="lg" />
          <Shimmer className="h-4 w-72 sm:w-96" rounded="md" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={i} variants={item}>
              <Card className="border-border/60 shadow-sm">
                <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                  <Shimmer className="h-9 w-9 shrink-0" rounded="lg" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Shimmer className="h-3 w-16" rounded="sm" />
                    <Shimmer className="h-5 w-10" rounded="sm" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <motion.div variants={item}>
          <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <Shimmer className="h-5 w-32" rounded="md" />
                <Shimmer className="h-3.5 w-24" rounded="sm" />
              </div>
              <Shimmer className="h-9 w-full sm:w-36" rounded="md" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_180px_180px]">
              <Shimmer className="h-9 w-full" rounded="md" />
              <Shimmer className="h-9 w-full" rounded="md" />
              <Shimmer className="h-9 w-full" rounded="md" />
            </div>
          </div>
        </motion.div>

        {/* Desktop Table Skeleton */}
        <motion.div
          variants={item}
          className="hidden overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm lg:block"
        >
          {/* Header */}
          <div className="grid grid-cols-[60px_2fr_1fr_1.5fr_100px_80px] gap-4 border-b border-border/40 bg-muted/40 px-4 py-3">
            {["#", "Batch", "Status", "Duration", "Capacity", ""].map(
              (_, i) => (
                <Shimmer key={i} className="h-3.5 w-16" rounded="sm" />
              ),
            )}
          </div>

          {/* Rows */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[60px_2fr_1fr_1.5fr_100px_80px] items-center gap-4 border-b border-border/40 px-4 py-4 last:border-0"
            >
              <Shimmer className="h-4 w-8" rounded="sm" />
              <div className="space-y-2">
                <Shimmer className="h-4 w-3/4" rounded="sm" />
                <Shimmer className="h-3 w-2/3" rounded="sm" />
              </div>
              <Shimmer className="h-5 w-20" rounded="full" />
              <div className="space-y-1.5">
                <Shimmer className="h-3.5 w-24" rounded="sm" />
                <Shimmer className="h-3 w-20" rounded="sm" />
              </div>
              <Shimmer className="mx-auto h-5 w-14" rounded="md" />
              <Shimmer className="ml-auto h-8 w-8" rounded="md" />
            </div>
          ))}
        </motion.div>

        {/* Mobile Card Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div key={i} variants={item}>
              <Card className="border-border/60 shadow-sm">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-2">
                      <Shimmer className="h-3 w-10" rounded="sm" />
                      <Shimmer className="h-4 w-3/4" rounded="sm" />
                    </div>
                    <Shimmer className="h-8 w-8" rounded="md" />
                  </div>
                  <div className="space-y-1.5">
                    <Shimmer className="h-3 w-full" rounded="sm" />
                    <Shimmer className="h-3 w-5/6" rounded="sm" />
                  </div>
                  <div className="flex gap-2">
                    <Shimmer className="h-5 w-20" rounded="full" />
                    <Shimmer className="h-5 w-16" rounded="md" />
                  </div>
                  <div className="border-t border-border/50 pt-3">
                    <Shimmer className="h-3.5 w-40" rounded="sm" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
