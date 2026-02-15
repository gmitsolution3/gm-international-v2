import { FieldConfig, ServiceConfig } from "../types/form.types";


// Common fields for all services
export const commonFields: FieldConfig[] = [
  {
    name: "f_name",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
  },
  {
    name: "c_name",
    label: "Company Name",
    type: "text",
    required: true,
  },
  {
    name: "c_email",
    label: "Company Email",
    type: "email",
    required: true,
  },
  {
    name: "c_address",
    label: "Company Address",
    type: "text",
    required: true,
  },
  {
    name: "p_photo",
    label: "Profile Photo",
    type: "file",
    required: true,
  },
  {
    name: "payment_getway",
    label: "Payment Gateway",
    type: "select",
    required: true,
    options: [
      { value: "WeChart", label: "WeChart" },
      { value: "Alipay", label: "Alipay" },
      { value: "Bank", label: "Bank" },
    ],
  },
  {
    name: "payment_proof",
    label: "Payment Proof",
    type: "radio",
    required: true,
    options: [
      { value: "t_id", label: "Transaction ID" },
      { value: "p_photo", label: "Payment Photo" },
    ],
  },
];

// Service specific configurations
export const serviceConfigs: Record<string, ServiceConfig> = {
  "company-setup": {
    title: "Company Setup - Advance 5000CNY",
    description: "Setup your company with all necessary documents",
    icon: "🏢",
    fields: [
      {
        name: "pas_scan_copy",
        label: "Passport Scan Copy",
        type: "file",
        required: true,
      },
      {
        name: "h_aca_certificate",
        label: "Academic Certificate",
        type: "file",
        required: true,
      },
      {
        name: "h_aca_transcript",
        label: "Academic Transcript",
        type: "file",
        required: true,
      },
      {
        name: "trade_license",
        label: "Trade License",
        type: "file",
        required: true,
      },
    ],
  },
  "change-info": {
    title: "Change Information - Service charge 500CNY",
    description: "Update your personal or company information",
    icon: "📝",
    fields: [
      {
        name: "change_info",
        label: "Change Information Type",
        type: "select",
        required: true,
        options: [
          { value: "c_nme", label: "Company Name" },
          { value: "legal_representative", label: "Legal Representative" },
          { value: "business_scope", label: "Change Business Scope" },
          {
            value: "registration_capital",
            label: "Change Registration Capital",
          },
          { value: "c_shareholder", label: "Change Shareholder" },
          { value: "c_address", label: "Change Address" },
          { value: "info_license", label: "Change information of license" },
        ],
      },
    ],
  },
  "license-cert": {
    title: "License & Certificate - service charge 1000CNY",
    description: "Apply for various licenses and certificates",
    icon: "📜",
    fields: [
      {
        name: "select_license_type",
        label: "License Type",
        type: "select",
        required: true,
        options: [
          { value: "import_export", label: "Import Export License" },
          { value: "food_operation", label: "Food Operation License" },
          { value: "hygienic", label: "Hygienic License" },
          { value: "beauty_salon", label: "Beauty Salon License" },
          { value: "gyemnisium", label: "Gymnasium License" },
          { value: "parlar", label: "Parlor License" },
          { value: "trade_mark_license", label: "Trademark License" },
          { value: "labor_dispatch_permit", label: "Labor Dispatch Permit" },
        ],
      },
    ],
  },
  tax: {
    title: "Tax Services -service charge 500CNY",
    description: "Get professional tax assistance",
    icon: "💰",
    fields: [
      {
        name: "select_service",
        label: "Tax Service Type",
        type: "select",
        required: true,
        options: [
          { value: "tax_return", label: "Tax Return Service" },
          { value: "individual_income_tax", label: "Individual Income Tax" },
          {
            value: "com_annual_inspection",
            label: "Commercial Annual Inspection",
          },
          { value: "vat_eit_pit", label: "VAT/EIT/PIT" },
        ],
      },
    ],
  },
  accounting: {
    title: "Accounting Services -service charge 100CNY",
    description: "Professional accounting solutions",
    icon: "📊",
    fields: [
      {
        name: "select_service",
        label: "Accounting Service",
        type: "select",
        required: true,
        options: [
          { value: "account_solution", label: "Account Solution" },
          { value: "software_automation", label: "Software Automation" },
        ],
      },
    ],
  },
  "legal-advice": {
    title: "Legal Advice -Service charge 1 hour - 300CNY, 2 hour-500CNY, 3 hour - 700CNY",
    description: "Expert legal consultation",
    icon: "⚖️",
    fields: [
      {
        name: "select_advise_time",
        label: "Advice Time",
        type: "select",
        required: true,
        options: [
          { value: "1_hour", label: "1 Hour" },
          { value: "2_hour", label: "2 Hours" },
          { value: "3_hour", label: "3 Hours" },
        ],
      },
      {
        name: "select_adviser",
        label: "Select Adviser",
        type: "select",
        required: true,
        options: [
          { value: "lawer", label: "Lawyer" },
          { value: "business_dev", label: "Business Developer" },
          { value: "wev_dev", label: "Web Developer" },
          { value: "marketing_advisor", label: "Marketing Advisor" },
        ],
      },
    ],
  },
};

// Get service config or return null if not found
export const getServiceConfig = (serviceId: string): ServiceConfig | null => {
  return serviceConfigs[serviceId] || null;
};

// Get all available services
export const getAllServices = () => {
  return Object.entries(serviceConfigs).map(([id, config]) => ({
    id,
    title: config.title,
    description: config.description,
    icon: config.icon,
  }));
};
