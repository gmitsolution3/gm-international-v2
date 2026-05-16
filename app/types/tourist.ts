export interface DocumentCount {
  totalBookings: number;
  totalApproved: number;
  totalPending: number;
  totalInternationalBookings: number;
  totalDomesticBookings: number;
  totalTourPackages: number;
  totalCustomPackage: number;
}

export interface PaymentStats {
  [key: string]: number;
}

export interface InternationalVsDomestic {
  international: number;
  domestic: number;
  internationalRevenue: number;
  domesticRevenue: number;
}

export interface PackageInfo {
  title: string;
  thumbnail: string;
  packageName: string;
}

export interface Location {
  country: string;
  destinationPlace: string;
  subDestination: string;
}

export interface RecentBooking {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  packageInfo: PackageInfo;
  location: Location;
  totalCost: string;
}

export interface TopPackage {
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

export interface TouristAnalysisData {
  documentCount: DocumentCount;
  paymentStats: PaymentStats;
  internationalVsDomestic: InternationalVsDomestic;
  recentBookings: RecentBooking[];
  topPackages: TopPackage[];
  monthlyTrend: MonthlyTrend[];
}
