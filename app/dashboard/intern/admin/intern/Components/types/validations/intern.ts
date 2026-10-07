import { z } from "zod";

export const genderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

export const internProfileSchema = z
  .object({
    // Personal
    firstName: z.string().min(2, "First name is required").max(50),
    lastName: z.string().min(2, "Last name is required").max(50),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone is too long")
      .regex(/^[0-9+\-\s]+$/, "Invalid phone format"),
    gender: genderEnum,
    dateOfBirth: z.date({ error: "Date of birth is required" }),
    address: z.string().min(5, "Address is required").max(200),

    // Academic
    university: z.string().min(2, "University is required").max(120),
    degree: z.string().min(2, "Degree is required").max(100),
    major: z.string().min(2, "Major is required").max(100),
    graduationYear: z.coerce
      .number({ error: "Graduation year is required" })
      .int()
      .min(1990)
      .max(2100),
    cgpa: z.coerce.number({ error: "CGPA is required" }).min(0).max(4),

    // Batch
    batchId: z.string().min(1, "Please select a batch"),
    startDate: z.date({ error: "Start date is required" }),
    endDate: z.date({ error: "End date is required" }),
    status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED", "TERMINATED"]),
    notes: z.string().max(500).optional().or(z.literal("")),

    // Optional
    imageUrl: z.string().optional().or(z.literal("")),
  })
  .refine((d) => d.endDate > d.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type InternProfileFormValues = z.input<typeof internProfileSchema>;

export interface IInternProfile extends Partial<InternProfileFormValues> {
  _id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IInternListItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth: string | Date;
  address: string;
  university: string;
  degree: string;
  major: string;
  graduationYear: number;
  cgpa: number;
  batchId: {
    _id:string;
    batchName: string;
    batchNumber: number;
  };
  startDate: string | Date;
  endDate: string | Date;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED" | "TERMINATED";
  notes?: string;
  imageUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IInternListResponse {
  success?: boolean;
  data: IInternListItem[];
  message?: string;
}
