// types/index.ts


// c_address: "Char Belabo, Belabo, Narsingdi";
// c_email: "dev.tariqulislam88@gmail.com";
// c_name: "e-Commerce";
// createdAt: "2026-06-11T04:53:49.970Z";
// f_name: "Tariqul Islam Khan";
// p_photo: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1781153905/l7r7gsgw8pk6ad7softr.png";
// payment_gateway: "1";
// payment_proof_type: "t_id";
// phone: "+8801817247388";
// select_service: "individual_income_tax";
// transaction_id: "sdareasdf";

interface IAllFormData {
  c_address: string;
  c_email: string;
  c_name: string;
  createdAt: string | Date;
  f_name: string;
  p_photo: string;
  payment_gateway: string;
  payment_proof_type: string;
  phone: string;
  select_service: string;
  transaction_id: string;
}


export interface IApplicationData {
  _id: string;
  allFormData: IAllFormData
  select_advise_time?: string;
  select_adviser?: string;
  select_license_type?: string;
  change_info?: string;
  payment_photo?: string;
  service: string;
  serviceTitle: string;
  createdBy: string;
  applicationStatus: string;
  pas_scan_copy?: string;
  h_aca_certificate?: string;
  h_aca_transcript?: string;
  trade_license?: string;
}


export interface ApplicationData {
  _id: string;
  f_name: string;
  phone: string;
  c_name: string;
  c_email: string;
  c_address: string;
  payment_gateway: string;
  select_advise_time?: string;
  select_adviser?: string;
  select_service?: string;
  select_license_type?: string;
  change_info?: string;
  payment_proof_type: string;
  transaction_id: string;
  payment_photo?: string;
  p_photo: string;
  service: string;
  serviceTitle: string;
  createdBy: string;
  createdAt: string;
  applicationStatus: string;
  pas_scan_copy?: string;
  h_aca_certificate?: string;
  h_aca_transcript?: string;
  trade_license?: string;
}



export type ModalType = "view" | "edit" | "delete" | null;
