// types/hospital.ts
export interface Doctor {
  name: string;
  rating: string;
  expertise: string;
  image: string;
  uploaded?: boolean;
  uploading?: boolean;
}

export interface HospitalList {
  _id?: string;
  hospitalName: string;
  images: string[];
  country: string;
  city: string;
  address: string;
  description?: string;
  doctors: Doctor[];
  rating: string;
  createdAt?: Date | string;
  createdBy?: string;
}

export interface HospitalListProps {
  hospitals: HospitalList[];
}

export interface HospitalDetails {
  hospital: HospitalList;
}


export interface MedicalPackage {
  _id: string;
  hospitalName: string;
  appointmentDate: string;
  appointmentFree: string;
  treatmentDescription: string;
  hospitalWebLink: string;
  treatmentDetails: string;
  doctorExpertise: string;
  photo: string;
  country: string;
  createdAt: string  | undefined;
  createdBy?: string;
}


export interface MedicalPackageProps {
  offers: MedicalPackage[];
}

export interface MedicalPackageDetails {
  packageData: MedicalPackage;
}