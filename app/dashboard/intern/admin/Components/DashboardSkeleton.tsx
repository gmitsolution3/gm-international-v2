"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shimmer } from "../batch/Components/batch/BatchSkeleton";


export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="space-y-2">
          <Shimmer className="h-8 w-72" rounded="lg" />
          <Shimmer className="h-4 w-96" />
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border/60 shadow-sm">
              <CardContent className="flex items-start justify-between gap-3 p-5">
                <div className="w-full space-y-2">
                  <Shimmer className="h-3 w-24" rounded="sm" />
                  <Shimmer className="h-7 w-16" rounded="md" />
                  <Shimmer className="h-3 w-32" rounded="sm" />
                </div>
                <Shimmer className="h-10 w-10 shrink-0" rounded="lg" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Batch Table */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <Shimmer className="h-5 w-48" />
            <Shimmer className="h-3.5 w-64" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Shimmer key={i} className="h-12 w-full" rounded="md" />
            ))}
          </CardContent>
        </Card>

        {/* Profile grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Shimmer className="h-72" rounded="lg" />
          <Shimmer className="h-72" rounded="lg" />
          <Shimmer className="h-72" rounded="lg" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Shimmer className="h-60 lg:col-span-2" rounded="lg" />
          <Shimmer className="h-60" rounded="lg" />
        </div>
      </div>
    </div>
  );
}
