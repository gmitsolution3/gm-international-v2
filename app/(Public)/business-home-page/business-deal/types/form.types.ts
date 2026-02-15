export interface CommonFormData {
  f_name: string;
  phone: string;
  c_name: string;
  c_email: string;
  c_address: string;
  p_photo?: FileList;
  payment_getway: "WeChart" | "Alipay" | "Bank";
  payment_proof: "t_id" | "p_photo";
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "file" | "select" | "radio";
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface ServiceConfig {
  title: string;
  description: string;
  icon?: string;
  fields: FieldConfig[];
}
