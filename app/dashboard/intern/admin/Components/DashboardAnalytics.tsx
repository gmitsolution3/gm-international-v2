"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import OverviewStats from "./OverviewStats";
import BatchPerformance from "./BatchPerformance";
import StatusBreakdown from "./StatusBreakdown";
import GenderBreakdown from "./GenderBreakdown";
import CgpaMetrics from "./CgpaMetrics";
import TopUniversities from "./TopUniversities";
import TopMajors from "./TopMajors";
import EmptyAnalytics from "./EmptyAnalytics";
import { DashboardAnalyticsResponse } from "./types/validations/analytics";

interface Props {
  data: DashboardAnalyticsResponse | null;
}

export default function InternDashboardAnalyticsMain({ data }: Props) {
  if (!data || !data.overview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <EmptyAnalytics />
        </div>
      </div>
    );
  }

  const { overview, batchStats, profileAnalytics } = data;

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-start gap-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Intern Analytics
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Real-time overview of batches, interns, and profile insights.
            </p>
          </div>
        </motion.div>

        {/* Overview KPIs */}
        <OverviewStats overview={overview} />

        {/* Batch performance */}
        <BatchPerformance batches={batchStats} />

        {/* Profile analytics grid */}
        <div className="space-y-2 pt-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Profile Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Demographics, academics, and diversity insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <StatusBreakdown data={profileAnalytics.statusBreakdown} />
          <GenderBreakdown data={profileAnalytics.genderBreakdown} />
          <TopMajors data={profileAnalytics.topMajors} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CgpaMetrics
              metrics={profileAnalytics.cgpaMetrics}
              distribution={profileAnalytics.cgpaDistribution}
            />
          </div>
          <TopUniversities data={profileAnalytics.topUniversities} />
        </div>
      </div>
    </div>
  );
}
