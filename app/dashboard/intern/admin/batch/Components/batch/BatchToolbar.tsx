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
import { BatchStatus } from "@/app/dashboard/intern/types/validations/batch";
import { SortKey } from "../hooks/use-batch-filters";


interface BatchToolbarProps {
  query: string;
  onQueryChange: (v: string) => void;
  status: BatchStatus | "ALL";
  onStatusChange: (v: BatchStatus | "ALL") => void;
  sort: SortKey;
  onSortChange: (v: SortKey) => void;
  resultCount: number;
}

export default function BatchToolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  resultCount,
}: BatchToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">All Batches</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {resultCount} batch{resultCount !== 1 && "es"} found
          </p>
        </div>
        <Link
          href="/dashboard/intern/admin/batch/create"
          className="w-full sm:w-auto"
        >
          <Button className="w-full gap-2 sm:w-auto">
            <Plus className="h-4 w-4" />
            Create Batch
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_180px_180px]">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name, number, description..."
            className="pl-9 pr-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <Select
          value={status}
          onValueChange={(v) => onStatusChange(v as BatchStatus | "ALL")}
        >
          <SelectTrigger className="gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="UPCOMING">Upcoming</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortKey)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name (A → Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z → A)</SelectItem>
            <SelectItem value="capacity">Highest Capacity</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
