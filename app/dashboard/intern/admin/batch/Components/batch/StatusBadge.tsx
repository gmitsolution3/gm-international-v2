import { BatchStatus } from "@/app/dashboard/intern/types/validations/batch";
import { cn } from "@/lib/utils";


const styles: Record<BatchStatus, string> = {
  ACTIVE:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  UPCOMING: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  COMPLETED:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  CANCELLED:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export function StatusBadge({ status }: { status: BatchStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
      )}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
