"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { GraduationCap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { InternAvatar } from "./InternAvatar";
import { InternStatusBadge } from "./InternStatusBadge";
import InternActions from "./InternActions";
import { IInternListItem } from "../types/validations/intern";

interface Props {
  interns: IInternListItem[];
  onView: (i: IInternListItem) => void;
  onDelete: (i: IInternListItem) => void;
}

export default function InternTable({ interns, onView, onDelete }: Props) {
  const router = useRouter();

  return (
    <div className="hidden overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm lg:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Intern</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interns.map((intern, i) => (
            <motion.tr
              key={intern._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="border-b border-border/40 transition-colors hover:bg-muted/30"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <InternAvatar
                    firstName={intern.firstName}
                    lastName={intern.lastName}
                    imageUrl={intern.imageUrl}
                    size="md"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      {intern.firstName} {intern.lastName}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      ID: {intern._id.slice(0, 8)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm">
                <div className="truncate">{intern.email}</div>
                <div className="text-xs text-muted-foreground">
                  {intern.phone}
                </div>
              </TableCell>
              <TableCell className="max-w-55">
                <div className="flex items-center gap-1.5 truncate text-sm">
                  <GraduationCap className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{intern.university}</span>
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {intern.degree} · CGPA {intern.cgpa}
                </div>
              </TableCell>
              <TableCell className="text-sm">
                {intern.batchId.batchName ? (
                  <>
                    <div className="truncate font-medium">
                      {intern.batchId.batchName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      #
                      {String(intern.batchId.batchNumber ?? "").padStart(
                        2,
                        "0",
                      )}
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <InternStatusBadge status={intern.status} />
              </TableCell>
              <TableCell className="text-right">
                <InternActions
                  onView={() => onView(intern)}
                  onEdit={() =>
                    router.push(
                      `/dashboard/intern/admin/intern/edit/${intern._id}`,
                    )
                  }
                  onDelete={() => onDelete(intern)}
                />
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
