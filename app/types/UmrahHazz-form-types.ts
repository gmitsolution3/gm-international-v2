// types/form-types.ts
import { z } from "zod";

export const applicantSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["single", "married", "widowed"]),
  nationality: z.string().min(1, "Nationality is required"),
  nidNumber: z.string().optional(),
  profession: z.string().optional(),
  phone: z.string().min(10, "Valid phone number is required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Invalid email address"),
  presentAddress: z.string().min(5, "Present address is required"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
});

export const medicalSchema = z.object({
  bloodGroup: z.string().optional(),
  hasDiabetes: z.boolean().optional(),
  hasHighBloodPressure: z.boolean().optional(),
  hasHeartDisease: z.boolean().optional(),
  usesWheelchair: z.boolean().optional(),
  allergies: z.string().optional(),
  otherMedicalIssues: z.string().optional(),
});

export const travelSchema = z.object({
  packageType: z.enum(["umrah", "hajj"]),
  travelMonth: z.string().min(1, "Travel month is required"),
  departureDate: z.string().optional(),
  returnDate: z.string().optional(),
  departureAirport: z.string().min(1, "Departure airport is required"),
  makkahHotelCategory: z.enum(["3-star", "4-star", "5-star"]),
  madinahHotelCategory: z.enum(["3-star", "4-star", "5-star"]),
  roomSharing: z.enum(["single", "double", "triple", "quad"]),
  airTicketIncluded: z.boolean(),
  transportationIncluded: z.boolean(),
});

export const emergencyContactSchema = z.object({
  name: z.string().min(2, "Emergency contact name is required"),
  relation: z.string().min(1, "Relation is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().optional(),
});

export const documentsSchema = z.object({
  passportNumber: z.string().min(5, "Passport number is required"),
  passportIssueDate: z.string().min(1, "Issue date is required"),
  passportExpiryDate: z.string().min(1, "Expiry date is required"),
  passportImage: z.string().min(1, "Passport image is required"),
  nid: z
    .object({
      frontSide: z.string(),
      backSide: z.string(),
    })
    .optional(),
  visaImage: z.string().optional(),
  passportSizePhoto: z
    .array(z.string())
    .min(2, "Minimum 2 passport size photos required"),
  vaccinationCertificate: z.string().optional(),
  covidCertificate: z.string().optional(),
});

export const companionSchema = z.object({
  fullName: z.string().min(2, "Companion name is required"),
  relation: z.string().min(1, "Relation is required"),
  passportNumber: z.string().optional(),
  passportImage: z.string().min(1, "Passport image is required"),
  phone: z.string().optional(),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(["bkash", "nagad", "bank", "cash"]),
  trxId: z.string().optional(),
  image: z.string().optional(),
  paymentStatus: z.enum(["pending", "partial", "paid"]),
});

export const formSchema = z.object({
  applicantInfo: applicantSchema,
  medicalInfo: medicalSchema,
  travelInfo: travelSchema,
  emergencyContact: emergencyContactSchema,
  documents: documentsSchema,
  companions: z.array(companionSchema).optional(),
  payment: paymentSchema,
});

export type FormData = z.infer<typeof formSchema>;
export type ApplicantInfo = z.infer<typeof applicantSchema>;
export type MedicalInfo = z.infer<typeof medicalSchema>;
export type TravelInfo = z.infer<typeof travelSchema>;
export type EmergencyContact = z.infer<typeof emergencyContactSchema>;
export type Documents = z.infer<typeof documentsSchema>;
export type Companion = z.infer<typeof companionSchema>;
export type Payment = z.infer<typeof paymentSchema>;
