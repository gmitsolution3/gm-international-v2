"use client";

import { BatchStatus, IInternBatch } from "@/app/dashboard/intern/types/validations/batch";
import { useMemo, useState } from "react";

export type SortKey =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "capacity";

interface UseBatchFiltersOptions {
  data: IInternBatch[];
}

export function useBatchFilters({ data }: UseBatchFiltersOptions) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BatchStatus | "ALL">("ALL");
  const [sort, setSort] = useState<SortKey>("newest");

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((b) => b.status === "ACTIVE").length;
    const upcoming = data.filter((b) => b.status === "UPCOMING").length;
    const completed = data.filter((b) => b.status === "COMPLETED").length;
    const cancelled = data.filter((b) => b.status === "CANCELLED").length;
    const totalCapacity = data.reduce((sum, b) => sum + (b.maxIntern ?? 0), 0);

    return { total, active, upcoming, completed, cancelled, totalCapacity };
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = data.filter((batch) => {
      const matchesQuery =
        !q ||
        batch.batchName.toLowerCase().includes(q) ||
        batch.description?.toLowerCase().includes(q) ||
        String(batch.batchNumber).includes(q);

      const matchesStatus = status === "ALL" || batch.status === status;

      return matchesQuery && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "newest":
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        case "name-asc":
          return a.batchName.localeCompare(b.batchName);
        case "name-desc":
          return b.batchName.localeCompare(a.batchName);
        case "capacity":
          return (b.maxIntern ?? 0) - (a.maxIntern ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [data, query, status, sort]);

  return {
    query,
    setQuery,
    status,
    setStatus,
    sort,
    setSort,
    filtered,
    stats,
  };
}
