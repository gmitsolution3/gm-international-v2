export interface OverviewAnalytics {
  totalBatches: number;
  totalInterns: number;
  activeInterns: number;
  completionRate: number;
}

export interface BatchStatItem {
  _id: string;
  batchName: string;
  batchNumber: number;
  startDate: string;
  endDate: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  maxIntern: number;
  totalEnrolled: number;
  activeInternsCount: number;
  completedInternsCount: number;
  occupancyRate: number;
}

export interface StatusBreakdownItem {
  _id: "ACTIVE" | "INACTIVE" | "COMPLETED" | "TERMINATED";
  count: number;
}

export interface GenderBreakdownItem {
  _id: "MALE" | "FEMALE" | "OTHER";
  count: number;
}

export interface CgpaMetric {
  _id: string | null;
  avgCgpa: number;
  maxCgpa: number;
  minCgpa: number;
}

export interface CgpaDistributionItem {
  _id: number;
  count: number;
}

export interface TopUniversityItem {
  _id: string;
  count: number;
}

export interface TopMajorItem {
  _id: string;
  count: number;
}

export interface ProfileAnalytics {
  statusBreakdown: StatusBreakdownItem[];
  genderBreakdown: GenderBreakdownItem[];
  cgpaMetrics: CgpaMetric[];
  cgpaDistribution: CgpaDistributionItem[];
  topUniversities: TopUniversityItem[];
  topMajors: TopMajorItem[];
}

export interface DashboardAnalyticsResponse {
  overview: OverviewAnalytics;
  batchStats: BatchStatItem[];
  profileAnalytics: ProfileAnalytics;
}
