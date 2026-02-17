// types/index.ts
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
