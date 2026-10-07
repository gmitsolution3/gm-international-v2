"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarDays, FileText, Hash, User, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./StatusBadge";
import { IInternBatch } from "@/app/dashboard/intern/types/validations/batch";

interface BatchViewModalProps {
  batch: IInternBatch | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BatchViewModal({
  batch,
  open,
  onOpenChange,
}: BatchViewModalProps) {
  if (!batch) return null;

  const rows = [
    {
      icon: Hash,
      label: "Batch Number",
      value: String(batch.batchNumber).padStart(2, "0"),
    },
    {
      icon: Users,
      label: "Max Interns",
      value: `${batch.maxIntern} seats`,
    },
    {
      icon: CalendarDays,
      label: "Start Date",
      value: format(new Date(batch.startDate), "PPP"),
    },
    {
      icon: CalendarDays,
      label: "End Date",
      value: format(new Date(batch.endDate), "PPP"),
    },
    {
      icon: User,
      label: "Created By",
      value: batch.createdBy,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl">{batch.batchName}</DialogTitle>
              <DialogDescription>
                Full details for batch #
                {String(batch.batchNumber).padStart(2, "0")}
              </DialogDescription>
            </div>
            <StatusBadge status={batch.status} />
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4 text-primary" />
              Description
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {batch.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {rows.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="truncate text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {batch.createdAt && (
            <>
              <Separator />
              <p className="text-xs text-muted-foreground">
                Created: {format(new Date(batch.createdAt), "PPP p")}
                {batch.updatedAt && (
                  <> · Updated: {format(new Date(batch.updatedAt), "PPP p")}</>
                )}
              </p>
            </>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
