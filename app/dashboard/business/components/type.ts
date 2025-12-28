export interface ApplicationForm {
  _id: string;
  country: string;
  companyName: string;
  passport: string;
  visitingCard: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  designation: string;
  companyType: string;
  officeLocation: string;
  travelPurpose: string;
  email: string;
  travelPlan: string;
  paymentMethod: string;
  createdAt: Date;
  createdBy?: string | null;
  paymentStatus: "pending" | "paid" | "failed";
  applicationStatus: "pending" | "approved" | "rejected" | "confirmed";
}


