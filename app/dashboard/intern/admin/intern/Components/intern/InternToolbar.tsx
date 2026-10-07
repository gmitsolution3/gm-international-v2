"use client";

import Link from "next/link";
import { Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InternSortKey, InternStatus } from "../../../batch/Components/hooks/use-intern-filters";


interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  status: InternStatus | "ALL";
  onStatusChange: (v: InternStatus | "ALL") => void;
  batchId: string | "ALL";
  onBatchChange: (v: string | "ALL") => void;
  batchOptions: { id: string; name: string }[];
  sort: InternSortKey;
  onSortChange: (v: InternSortKey) => void;
  resultCount: number;
}

export default function InternToolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  batchId,
  onBatchChange,
  batchOptions,
  sort,
  onSortChange,
  resultCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">All Interns</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {resultCount} intern{resultCount !== 1 && "s"} found
          </p>
        </div>
        <Link
          href="/dashboard/intern/admin/intern/create"
          className="w-full sm:w-auto"
        >
          <Button className="w-full gap-2 sm:w-auto">
            <Plus className="h-4 w-4" />
            Create Intern Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_170px_200px_170px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search name, email, university..."
            className="pl-9 pr-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select
          value={status}
          onValueChange={(v) => onStatusChange(v as InternStatus | "ALL")}
        >
          <SelectTrigger className="gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="TERMINATED">Terminated</SelectItem>
          </SelectContent>
        </Select>

        <Select value={batchId} onValueChange={(v) => onBatchChange(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Batches</SelectItem>
            {batchOptions.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(v) => onSortChange(v as InternSortKey)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name (A → Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z → A)</SelectItem>
            <SelectItem value="cgpa">Highest CGPA</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
