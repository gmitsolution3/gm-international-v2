import { cn } from "@/lib/utils";

export type InternStatus = "ACTIVE" | "INACTIVE" | "COMPLETED" | "TERMINATED";

const styles: Record<InternStatus, string> = {
  ACTIVE:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  INACTIVE:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  COMPLETED:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  TERMINATED:
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export function InternStatusBadge({ status }: { status: InternStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[status],
      )}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
