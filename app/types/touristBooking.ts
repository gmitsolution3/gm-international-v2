// types/touristBooking.ts
export interface IGuestInfo {
  adults: number;
  children: number;
  infants: number;
}

export interface IPackageInfo {
  title: string;
  thumbnail: string;
  packageName: string;
}

export interface ILocation {
  country: string;
  destinationPlace: string;
  subDestination: string;
}

export interface IDurationAndDates {
  duration: string;
  dateFrom: string;
  startForm: string;
}

export interface IIncludesAndExcludes {
  includes: string[];
  excludes: string[];
}

export interface ITouristBooking {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  passportNumber?: string;
  visaStatus: string;
  gender: string;
  guests: IGuestInfo;
  airTicket: string;
  foodPlan: string[];
  transportation: string[];
  hotelCategory: string[];
  paymentMethod: string;
  createdAt: string;
  passportVisaImage?: string;
  createdBy: string;
  packageInfo: IPackageInfo;
  location: ILocation;
  durationAndDates: IDurationAndDates;
  totalCost: string;
  isInternationalPackage: boolean;
  includesAndExcludes: IIncludesAndExcludes;
  client?: Record<string, any>;
}

export interface IApiResponse {
  success: boolean;
  message: string;
  data: ITouristBooking[];
}
