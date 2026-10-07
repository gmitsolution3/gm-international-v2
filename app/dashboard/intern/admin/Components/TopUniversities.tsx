"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TopUniversityItem } from "./types/validations/analytics";


export default function TopUniversities({
  data,
}: {
  data: TopUniversityItem[];
}) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.35 }}
      className="h-full"
    >
      <Card className="h-full border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-4 w-4 text-primary" />
            Top Universities
          </CardTitle>
          <CardDescription>Where interns come from</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No university data.
            </p>
          ) : (
            data.map((item, i) => {
              const pct = (item.count / max) * 100;
              return (
                <div key={item._id} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="truncate font-medium">{item._id}</span>
                    </div>
                    <span className="shrink-0 tabular-nums text-muted-foreground">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.08,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-primary"
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
