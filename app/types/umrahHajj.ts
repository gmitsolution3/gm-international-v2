interface Companion {
  fullName: string;
  relation: string;
  passportNumber: string;
  passportImage: string;
  phone: string;
}

export interface ApplicationData {
  _id: string;
  applicantInfo: {
    fullName: string;
    fatherName: string;
    motherName: string;
    gender: string;
    dateOfBirth: string;
    maritalStatus: string;
    nationality: string;
    nidNumber: string;
    profession: string;
    phone: string;
    whatsapp: string;
    email: string;
    presentAddress: string;
    permanentAddress: string;
  };
  travelInfo: {
    packageType: string;
    travelMonth: string;
    departureDate: string;
    returnDate: string;
    departureAirport: string;
    makkahHotelCategory: string;
    madinahHotelCategory: string;
    roomSharing: string;
    airTicketIncluded: boolean;
    transportationIncluded: boolean;
  };
  companions: Companion[];
  payment: {
    paymentMethod: string;
    trxId: string;
    image: string;
    paymentStatus: string;
    paymentPay?: number;
    paymentDue?: number;
  };
  pkgInfo: {
    pkgId: string;
    pkgName: string;
    pkgPrice: number;
    pkgDepartureDate: string;
    pkgReturnDate: string;
  };
  createdAt: string;
  applicationStatus: string;
}

export interface ApplicationBookedTableProps {
  bookedData: {
    success: boolean;
    message: string;
    data: ApplicationData[];
  };
}

export interface ApplicationStatus {
  pending: number;
  approved: number;
  rejected: number;
}

export interface PaymentStatus {
  pending: number;
  partial: number;
  paid: number;
}

export interface DocumentCount {
  totalBookings: number;
  totalPackages: number;
  applications: ApplicationStatus;
  payment: PaymentStatus;
}

export interface GenderStat {
  gender: string;
  count: number;
}

export interface ApplicantInfo {
  fullName: string;
  gender: string;
  phone: string;
  email: string;
}

export interface TravelInfo {
  packageType: string;
}

export interface Payment {
  paymentStatus: string;
}

export interface PkgInfo {
  pkgName: string;
}

export interface RecentBooking {
  _id: string;
  applicantInfo: ApplicantInfo;
  travelInfo: TravelInfo;
  payment: Payment;
  pkgInfo: PkgInfo;
  createdAt: string;
  applicationStatus: string;
}

export interface TopPackage {
  _id: string;
  count: number;
  totalRevenue: number;
}

export interface MonthlyTrend {
  _id: {
    year: number;
    month: number;
  };
  count: number;
}

export interface Summary {
  totalRevenue: number;
}

export interface UmrahHajjAnalysisData {
  documentCount: DocumentCount;
  genderStats: GenderStat[];
  recentBookings: RecentBooking[];
  topPackages: TopPackage[];
  monthlyTrend: MonthlyTrend[];
  summary: Summary;
}