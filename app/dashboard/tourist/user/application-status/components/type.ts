// types.ts

export interface GuestDetails {
  adults: number;
  children: number;
  infants: number;
}

export interface Duration {
  days: number;
  nights: number;
}

export interface TravelApplication {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  passportNumber: string;
  visaStatus: string;
  gender: string;
  guests: GuestDetails;
  travelCost: string; // Stored as string in the data
  airTicket: string;
  destinationCountry: string;
  destinationPlace: string[];
  duration: Duration;
  foodPlan: string[];
  transportation: string[];
  dateFrom: string; // ISO Date string
  dateTo: string; // ISO Date string
  hotelCategory: string[];
  paymentMethod: string;
  applicationStatus: "pending" | "approved" | "rejected";
  paymentStatus: "pending" | "paid" | "failed";
}
