"use client";

import { useMemo, useState } from "react";
import { IInternListItem } from "../../../intern/Components/types/validations/intern";


export type InternStatus = "ACTIVE" | "INACTIVE" | "COMPLETED" | "TERMINATED";

export type InternSortKey =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "cgpa";

interface Options {
  data: IInternListItem[];
}

export function useInternFilters({ data }: Options) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<InternStatus | "ALL">("ALL");
  const [batchId, setBatchId] = useState<string | "ALL">("ALL");
  const [sort, setSort] = useState<InternSortKey>("newest");

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((i) => i.status === "ACTIVE").length;
    const inactive = data.filter((i) => i.status === "INACTIVE").length;
    const completed = data.filter((i) => i.status === "COMPLETED").length;
    const terminated = data.filter((i) => i.status === "TERMINATED").length;
    return { total, active, inactive, completed, terminated };
  }, [data]);

  const batchOptions = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((i) => {
      if (i.batchId && i.batchId.batchName) {
        map.set(i.batchId._id, i.batchId.batchName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = data.filter((i) => {
      const fullName = `${i.firstName} ${i.lastName}`.toLowerCase();
      const matchesQuery =
        !q ||
        fullName.includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.phone?.includes(q) ||
        i.university?.toLowerCase().includes(q);

      const matchesStatus = status === "ALL" || i.status === status;
      const matchesBatch = batchId === "ALL" || i.batchId._id === batchId;

      return matchesQuery && matchesStatus && matchesBatch;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "newest":
          return (
            new Date(b.createdAt ?? b.startDate).getTime() -
            new Date(a.createdAt ?? a.startDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt ?? a.startDate).getTime() -
            new Date(b.createdAt ?? b.startDate).getTime()
          );
        case "name-asc":
          return `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`,
          );
        case "name-desc":
          return `${b.firstName} ${b.lastName}`.localeCompare(
            `${a.firstName} ${a.lastName}`,
          );
        case "cgpa":
          return (b.cgpa ?? 0) - (a.cgpa ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [data, query, status, batchId, sort]);

  return {
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
  };
}
