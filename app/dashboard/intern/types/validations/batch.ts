import { z } from "zod";

export const batchStatusEnum = z.enum([
  "UPCOMING",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);

export const internBatchSchema = z
  .object({
    batchName: z
      .string()
      .min(3, "Batch name must be at least 3 characters")
      .max(80, "Batch name is too long"),
    batchNumber: z.coerce
      .number({ error: "Batch number is required" })
      .int("Must be a whole number")
      .positive("Must be positive"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description is too long"),
    startDate: z.date({ error: "Start date is required" }),
    endDate: z.date({ error: "End date is required" }),
    status: batchStatusEnum,
    maxIntern: z.coerce
      .number({ error: "Max interns is required" })
      .int()
      .min(1, "At least 1 intern required")
      .max(1000, "Too many interns"),
    createdBy: z.string().min(1),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type InternBatchFormValues = z.input<typeof internBatchSchema>;

export interface IInternBatch {
  _id: string;
  batchName: string;
  batchNumber: number;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  maxIntern: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInternBatchListResponse {
  success?: boolean;
  data: IInternBatch[];
  message?: string;
}

export type BatchStatus = "UPCOMING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
