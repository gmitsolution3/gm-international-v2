export interface ApplicationStatus {
  approved: number;
  pending: number;
  rejected: number;
}

export interface DealStatus {
  approved: number;
  pending: number;
}

export interface DocumentCount {
  totalCompanies: number;
  totalBusinessApplications: number;
  totalBusinessDeals: number;
  totalBusinessPackages: number;
  applications: ApplicationStatus;
  deals: DealStatus;
}

export interface RecentApplication {
  _id: string;
  country: string;
  companyName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
  paymentStatus: string;
  applicationStatus: string;
}

export interface RecentDeal {
  _id: string;
  f_name: string;
  c_name: string;
  c_email: string;
  serviceTitle: string;
  createdAt: string;
  applicationStatus: string;
}

export interface TopCountry {
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

export interface Summary {
  totalBusinessActivity: number;
}

export interface BusinessAnalysisData {
  documentCount: DocumentCount;
  recentApplications: RecentApplication[];
  recentDeals: RecentDeal[];
  topCountries: TopCountry[];
  monthlyTrendApplications: MonthlyTrend[];
  monthlyTrendDeals: MonthlyTrend[];
  summary: Summary;
}
