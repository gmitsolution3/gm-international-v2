"use client";

import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GenderBreakdownItem } from "./types/validations/analytics";


const barColors: Record<string, string> = {
  MALE: "bg-sky-500",
  FEMALE: "bg-pink-500",
  OTHER: "bg-amber-500",
};

export default function GenderBreakdown({
  data,
}: {
  data: GenderBreakdownItem[];
}) {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      className="h-full"
    >
      <Card className="h-full border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users2 className="h-4 w-4 text-primary" />
            Gender Distribution
          </CardTitle>
          <CardDescription>Diversity snapshot</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No gender data.
            </p>
          ) : (
            data.map((item, i) => {
              const pct = total > 0 ? (item.count / total) * 100 : 0;
              return (
                <div key={item._id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium capitalize">
                      {item._id.toLowerCase()}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {item.count} · {Math.round(pct)}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                      className={cn(
                        "h-full rounded-full",
                        barColors[item._id] ?? "bg-primary",
                      )}
                    />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
