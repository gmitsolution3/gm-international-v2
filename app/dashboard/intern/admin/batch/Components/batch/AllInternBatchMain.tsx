"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import BatchStats from "./BatchStats";
import BatchToolbar from "./BatchToolbar";
import BatchTable from "./BatchTable";
import BatchCard from "./BatchCard";
import BatchViewModal from "./BatchViewModal";
import BatchDeleteDialog from "./BatchDeleteDialog";
import BatchEmptyState from "./BatchEmptyState";
import { IInternBatch } from "@/app/dashboard/intern/types/validations/batch";
import { useBatchFilters } from "../hooks/use-batch-filters";

interface AllInternBatchMainProps {
  data: IInternBatch[];
}

export default function AllInternBatchMain({ data }: AllInternBatchMainProps) {
  const batches: IInternBatch[] = Array.isArray(data) ? data : (data ?? []);

  // Local state — allows UI updates after delete
  const [items, setItems] = useState<IInternBatch[]>(batches);
  const { query, setQuery, status, setStatus, sort, setSort, filtered, stats } =
    useBatchFilters({ data: items });
  const [viewBatch, setViewBatch] = useState<IInternBatch | null>(null);
  const [deleteBatch, setDeleteBatch] = useState<IInternBatch | null>(null);

  const handleDeleted = (id: string) => {
    setItems((prev) => prev.filter((b) => b._id !== id));
  };

  const hasFilters = query.trim() !== "" || status !== "ALL";

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Batch Management
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Overview of all internship batches with quick actions.
          </p>
        </motion.div>

        {/* Stats */}
        <BatchStats stats={stats} onFilter={(s) => setStatus(s)} />

        {/* Toolbar */}
        <BatchToolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          sort={sort}
          onSortChange={setSort}
          resultCount={filtered.length}
        />

        {/* Content */}
        {filtered.length === 0 ? (
          <BatchEmptyState
            hasFilters={hasFilters}
            onClearFilters={() => {
              setQuery("");
              setStatus("ALL");
            }}
          />
        ) : (
          <>
            {/* Desktop Table */}
            <BatchTable
              batches={filtered}
              onView={setViewBatch}
              onDelete={setDeleteBatch}
            />

            {/* Mobile Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {filtered.map((batch, i) => (
                <BatchCard
                  key={batch._id}
                  batch={batch}
                  index={i}
                  onView={setViewBatch}
                  onDelete={setDeleteBatch}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <BatchViewModal
        batch={viewBatch}
        open={!!viewBatch}
        onOpenChange={(o) => !o && setViewBatch(null)}
      />

      <BatchDeleteDialog
        batch={deleteBatch}
        open={!!deleteBatch}
        onOpenChange={(o) => !o && setDeleteBatch(null)}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
