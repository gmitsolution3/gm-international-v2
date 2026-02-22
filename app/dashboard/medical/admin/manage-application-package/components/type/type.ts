export type HospitalType = 'public' | 'private';

export interface MedicalFormData {
  _id?: string;
  hospital_name: string;
  country_name: string;
  city_name: string;
  provience: string;
  photo: string | null;
  hospital_type: HospitalType;
  department: string[];
  description: string;
  total_view: number;
  total_sell: number;
  createdAt: Date | string;
  createdBy: string;
  updatedAt: Date | string;
  rating: number;
}

export interface Department {
  id: string;
  name: string;
}

export const DEPARTMENT_OPTIONS: Department[] = [
  { id: '1', name: 'Cardiology' },
  { id: '2', name: 'Neurology' },
  { id: '3', name: 'Pediatrics' },
  { id: '4', name: 'Oncology' },
  { id: '5', name: 'Orthopedics' },
  { id: '6', name: 'Dermatology' },
  { id: '7', name: 'Gynecology' },
  { id: '8', name: 'Ophthalmology' },
  { id: '9', name: 'ENT' },
  { id: '10', name: 'Dentistry' },
  { id: '11', name: 'Psychiatry' },
  { id: '12', name: 'Radiology' },
  { id: '13', name: 'Cardiovascular' },
  { id: '14', name: 'Tradittional Chinese med.' },
  { id: '15', name: 'Ophthalmology' },
];