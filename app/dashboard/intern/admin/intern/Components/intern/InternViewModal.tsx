"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { InternAvatar } from "./InternAvatar";
import { InternStatusBadge } from "./InternStatusBadge";
import { IInternListItem } from "../types/validations/intern";

interface Props {
  intern: IInternListItem | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function InternViewModal({ intern, open, onOpenChange }: Props) {
  if (!intern) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <InternAvatar
                firstName={intern.firstName}
                lastName={intern.lastName}
                imageUrl={intern.imageUrl}
                size="xl"
              />
              <div className="min-w-0">
                <DialogTitle className="truncate text-xl">
                  {intern.firstName} {intern.lastName}
                </DialogTitle>
                <DialogDescription className="truncate">
                  {intern.email}
                </DialogDescription>
                <div className="mt-2">
                  <InternStatusBadge status={intern.status} />
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          {/* Contact */}
          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <User className="h-4 w-4 text-primary" />
              Contact
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field icon={Mail} label="Email" value={intern.email} />
              <Field icon={Phone} label="Phone" value={intern.phone} />
              <Field
                icon={User}
                label="Gender"
                value={
                  intern.gender.charAt(0) + intern.gender.slice(1).toLowerCase()
                }
              />
              <Field
                icon={CalendarDays}
                label="Date of Birth"
                value={
                  intern.dateOfBirth
                    ? format(new Date(intern.dateOfBirth), "PPP")
                    : "—"
                }
              />
              <div className="sm:col-span-2">
                <Field icon={MapPin} label="Address" value={intern.address} />
              </div>
            </div>
          </section>

          <Separator />

          {/* Academic */}
          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <GraduationCap className="h-4 w-4 text-primary" />
              Academic
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  icon={GraduationCap}
                  label="University"
                  value={intern.university}
                />
              </div>
              <Field icon={BookOpen} label="Degree" value={intern.degree} />
              <Field icon={BookOpen} label="Major" value={intern.major} />
              <Field
                icon={CalendarDays}
                label="Graduation Year"
                value={intern.graduationYear}
              />
              <Field icon={BookOpen} label="CGPA" value={intern.cgpa} />
            </div>
          </section>

          <Separator />

          {/* Batch */}
          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <CalendarDays className="h-4 w-4 text-primary" />
              Batch & Timeline
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                icon={BookOpen}
                label="Batch"
                value={intern.batchId.batchName ?? "—"}
              />
              <Field
                icon={CalendarDays}
                label="Start Date"
                value={
                  intern.startDate
                    ? format(new Date(intern.startDate), "PPP")
                    : "—"
                }
              />
              <Field
                icon={CalendarDays}
                label="End Date"
                value={
                  intern.endDate ? format(new Date(intern.endDate), "PPP") : "—"
                }
              />
            </div>
          </section>

          {/* Notes */}
          {intern.notes && (
            <>
              <Separator />
              <section>
                <h4 className="mb-2 text-sm font-semibold">Notes</h4>
                <p className="rounded-lg border border-border/60 bg-muted/30 p-3 text-sm text-muted-foreground">
                  {intern.notes}
                </p>
              </section>
            </>
          )}

          {intern.createdAt && (
            <>
              <Separator />
              <p className="text-xs text-muted-foreground">
                Created: {format(new Date(intern.createdAt), "PPP p")}
                {intern.updatedAt && (
                  <> · Updated: {format(new Date(intern.updatedAt), "PPP p")}</>
                )}
              </p>
            </>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
