"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import InternStats from "./InternStats";
import InternToolbar from "./InternToolbar";
import InternTable from "./InternTable";
import InternCard from "./InternCard";
import InternViewModal from "./InternViewModal";
import InternDeleteDialog from "./InternDeleteDialog";
import InternEmptyState from "./InternEmptyState";
import {
  IInternListItem,
  IInternListResponse,
} from "../types/validations/intern";
import { useInternFilters } from "../../../batch/Components/hooks/use-intern-filters";

interface Props {
  data: IInternListResponse | IInternListItem[];
}

export default function ManageAllInternMain({ data }: Props) {
  const interns: IInternListItem[] = Array.isArray(data)
    ? data
    : (data?.data ?? []);

  const [items, setItems] = useState<IInternListItem[]>(interns);

  const {
    query,
    setQuery,
    status,
    setStatus,
    batchId,
    setBatchId,
    sort,
    setSort,
    filtered,
    stats,
    batchOptions,
  } = useInternFilters({ data: items });

  const [viewIntern, setViewIntern] = useState<IInternListItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IInternListItem | null>(
    null,
  );

  const handleDeleted = (id: string) =>
    setItems((prev) => prev.filter((i) => i._id !== id));

  const hasFilters =
    query.trim() !== "" || status !== "ALL" || batchId !== "ALL";

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Intern Management
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage all intern profiles across batches.
          </p>
        </motion.div>

        <InternStats stats={stats} onFilter={(s) => setStatus(s)} />

        <InternToolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          batchId={batchId}
          onBatchChange={setBatchId}
          batchOptions={batchOptions}
          sort={sort}
          onSortChange={setSort}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <InternEmptyState
            hasFilters={hasFilters}
            onClearFilters={() => {
              setQuery("");
              setStatus("ALL");
              setBatchId("ALL");
            }}
          />
        ) : (
          <>
            <InternTable
              interns={filtered}
              onView={setViewIntern}
              onDelete={setDeleteTarget}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {filtered.map((intern, i) => (
                <InternCard
                  key={intern._id}
                  intern={intern}
                  index={i}
                  onView={setViewIntern}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <InternViewModal
        intern={viewIntern}
        open={!!viewIntern}
        onOpenChange={(o) => !o && setViewIntern(null)}
      />

      <InternDeleteDialog
        intern={deleteTarget}
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
