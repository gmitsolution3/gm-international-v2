import { Skeleton } from "@/components/ui/skeleton";


export function CardSkeleton() {
  return (
    <div className="bg-gray-200 rounded-2xl shadow-lg p-6 space-y-4">
      {/* Icon */}
      <Skeleton className="h-10 w-10 rounded-full mx-auto" />

      {/* Title */}
      <Skeleton className="h-6 w-3/4 mx-auto" />

      {/* Description */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6 mx-auto" />
    </div>
  );
}
