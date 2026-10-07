"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StatusBadge } from "./StatusBadge";
import BatchActions from "./BatchActions";
import { IInternBatch } from "@/app/dashboard/intern/types/validations/batch";

interface BatchTableProps {
  batches: IInternBatch[];
  onView: (batch: IInternBatch) => void;
  onDelete: (batch: IInternBatch) => void;
}

export default function BatchTable({
  batches,
  onView,
  onDelete,
}: BatchTableProps) {
  const router = useRouter();

  return (
    <div className="hidden overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm lg:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="w-15">#</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-center">Capacity</TableHead>
            <TableHead className="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.map((batch, i) => (
            <motion.tr
              key={batch._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="border-b border-border/40 transition-colors hover:bg-muted/30"
            >
              <TableCell className="font-mono text-sm text-muted-foreground">
                {String(batch.batchNumber).padStart(2, "0")}
              </TableCell>
              <TableCell className="max-w-[320px]">
                <div className="truncate font-medium">{batch.batchName}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {batch.description}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={batch.status} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                <div>{format(new Date(batch.startDate), "MMM dd, yyyy")}</div>
                <div className="text-xs">
                  → {format(new Date(batch.endDate), "MMM dd, yyyy")}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  <Users className="h-3 w-3" />
                  {batch.maxIntern}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <BatchActions
                  onView={() => onView(batch)}
                  onEdit={() =>
                    router.push(
                      `/dashboard/intern/admin/batch/edit/${batch._id}`,
                    )
                  }
                  onDelete={() => onDelete(batch)}
                />
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
