export interface DocumentCount {
  totalApplications: number;
  totalApproved: number;
  totalPending: number;
  totalRejected: number;
  totalScholarshipPackages: number;
  totalUniversities: number;
}

export interface PaymentStats {
  pending: number;
  paid: number;
  failed: number;
}

export interface RecentApplication {
  _id: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  university: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  applicationStatus: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

export interface TopUniversity {
  _id: string;
  count: number;
}

export interface MonthlyTrend {
  _id: {
    year: number;
    month: number;
  };
  count: number;
}

export interface ScholarshipAnalysisData {
  documentCount: DocumentCount;
  paymentStats: PaymentStats;
  recentApplications: RecentApplication[];
  topUniversities: TopUniversity[];
  monthlyTrend: MonthlyTrend[];
}
