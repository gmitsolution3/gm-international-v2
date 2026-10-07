"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IInternBatch } from "@/app/dashboard/intern/types/validations/batch";


interface BatchDeleteDialogProps {
  batch: IInternBatch | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (id: string) => void;
}

export default function BatchDeleteDialog({
  batch,
  open,
  onOpenChange,
  onDeleted,
}: BatchDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!batch) return;
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/intern/batch/del-batch/${batch._id}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Delete failed");

      toast.success(`"${batch.batchName}" deleted successfully`);
      onDeleted(batch._id);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete batch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <AlertDialogTitle>Delete batch?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-semibold text-foreground">
              {batch?.batchName}
            </span>
            . This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e:any) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={loading}
            className={cn(buttonVariants({ variant: "destructive" }), "gap-2")}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
