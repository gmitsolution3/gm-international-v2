// types/application.types.ts
export interface ApplicationData {
  _id: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  admissionSemester: string;
  courseName: string;
  createdAt: string;
  submittedAt: string;
  packageId: string;
  universityName: string;
  serviceFee: string;
  applicationFee: string;
  b2bPrice: string;
  deadline: string;
  startingDate: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: ApplicationData[];
}

export interface TableRowData extends ApplicationData {
  slNo: number;
  totalAmount: number;
  advance: number;
  due: number;
  cost: number;
  profit: number;
}
