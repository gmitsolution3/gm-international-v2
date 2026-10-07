"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function EmptyAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/70 bg-card/50 px-6 py-16 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <BarChart3 className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold">No analytics available</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Analytics will appear here once you have batches and intern profiles.
        </p>
      </div>
    </motion.div>
  );
}
