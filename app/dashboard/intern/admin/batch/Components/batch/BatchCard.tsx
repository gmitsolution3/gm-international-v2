"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarDays, Hash, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { StatusBadge } from "./StatusBadge";
import BatchActions from "./BatchActions";
import { IInternBatch } from "@/app/dashboard/intern/types/validations/batch";

interface BatchCardProps {
  batch: IInternBatch;
  index: number;
  onView: (b: IInternBatch) => void;
  onDelete: (b: IInternBatch) => void;
}

export default function BatchCard({
  batch,
  index,
  onView,
  onDelete,
}: BatchCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      layout
    >
      <Card className="overflow-hidden border-border/60 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Hash className="h-3 w-3" />
                <span className="font-mono">
                  {String(batch.batchNumber).padStart(2, "0")}
                </span>
              </div>
              <h3 className="truncate font-semibold">{batch.batchName}</h3>
            </div>
            <BatchActions
              onView={() => onView(batch)}
              onEdit={() =>
                router.push(`/dashboard/intern/admin/batch/edit/${batch._id}`)
              }
              onDelete={() => onDelete(batch)}
            />
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {batch.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={batch.status} />
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <Users className="h-3 w-3" />
              {batch.maxIntern} seats
            </span>
          </div>

          <div className="flex items-center gap-2 border-t border-border/50 pt-3 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span>
              {format(new Date(batch.startDate), "MMM dd")} →{" "}
              {format(new Date(batch.endDate), "MMM dd, yyyy")}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}