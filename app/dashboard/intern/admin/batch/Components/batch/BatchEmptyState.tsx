"use client";

import { motion } from "framer-motion";
import { PackageOpen, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  hasFilters: boolean;
  onClearFilters?: () => void;
}

export default function BatchEmptyState({ hasFilters, onClearFilters }: Props) {
  const Icon = hasFilters ? SearchX : PackageOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/70 bg-card/50 px-6 py-16 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold">
          {hasFilters ? "No matching batches" : "No batches yet"}
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          {hasFilters
            ? "Try adjusting your search or filters to find what you're looking for."
            : "Get started by creating your first internship batch."}
        </p>
      </div>
      {hasFilters ? (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      ) : (
        <Link href="/dashboard/intern/admin/batch/create">
          <Button size="sm">Create your first batch</Button>
        </Link>
      )}
    </motion.div>
  );
}
