export interface DocumentCount {
  totalApplications: number;
  totalApproved: number;
  totalPending: number;
  totalRejected: number;
  totalHospitals: number;
}

export interface PaymentStats {
  pending: number;
  paid: number;
  failed: number;
}

export interface RecentApplication {
  _id: string;
  hospital_name: string;
  patientName: string;
  patient_disease: string;
  email: string;
  createdAt: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  appointmentStatus: "Pending" | "Approved" | "Rejected";
}

export interface topHospitals {
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

export interface MedicalAnalysisData {
  documentCount: DocumentCount;
  paymentStats: PaymentStats;
  recentApplications: RecentApplication[];
  topHospitals: topHospitals[];
  monthlyTrend: MonthlyTrend[];
}
