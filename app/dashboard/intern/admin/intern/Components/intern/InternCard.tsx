"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { InternAvatar } from "./InternAvatar";
import { InternStatusBadge } from "./InternStatusBadge";
import InternActions from "./InternActions";
import { IInternListItem } from "../types/validations/intern";

interface Props {
  intern: IInternListItem;
  index: number;
  onView: (i: IInternListItem) => void;
  onDelete: (i: IInternListItem) => void;
}

export default function InternCard({ intern, index, onView, onDelete }: Props) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      layout
    >
      <Card className="overflow-hidden border-border/60 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <InternAvatar
                firstName={intern.firstName}
                lastName={intern.lastName}
                imageUrl={intern.imageUrl}
                size="lg"
              />
              <div className="min-w-0">
                <h3 className="truncate font-semibold">
                  {intern.firstName} {intern.lastName}
                </h3>
                <p className="truncate text-xs text-muted-foreground">
                  {intern.university}
                </p>
              </div>
            </div>
            <InternActions
              onView={() => onView(intern)}
              onEdit={() =>
                router.push(`/dashboard/intern/admin/intern/edit/${intern._id}`)
              }
              onDelete={() => onDelete(intern)}
            />
          </div>

          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{intern.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>{intern.phone}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <InternStatusBadge status={intern.status} />
            {intern.batchId.batchName && (
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {intern.batchId.batchName}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              CGPA {intern.cgpa}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
