interface Companion {
  fullName: string;
  relation: string;
  passportNumber: string;
  passportImage: string;
  phone: string;
}

export interface ApplicationData {
  _id: string;
  applicantInfo: {
    fullName: string;
    fatherName: string;
    motherName: string;
    gender: string;
    dateOfBirth: string;
    maritalStatus: string;
    nationality: string;
    nidNumber: string;
    profession: string;
    phone: string;
    whatsapp: string;
    email: string;
    presentAddress: string;
    permanentAddress: string;
  };
  travelInfo: {
    packageType: string;
    travelMonth: string;
    departureDate: string;
    returnDate: string;
    departureAirport: string;
    makkahHotelCategory: string;
    madinahHotelCategory: string;
    roomSharing: string;
    airTicketIncluded: boolean;
    transportationIncluded: boolean;
  };
  companions: Companion[];
  payment: {
    paymentMethod: string;
    trxId: string;
    image: string;
    paymentStatus: string;
    paymentPay?: number;
    paymentDue?: number;
  };
  pkgInfo: {
    pkgId: string;
    pkgName: string;
    pkgPrice: number;
    pkgDepartureDate: string;
    pkgReturnDate: string;
  };
  createdAt: string;
  applicationStatus: string;
}

export interface ApplicationBookedTableProps {
  bookedData: {
    success: boolean;
    message: string;
    data: ApplicationData[];
  };
}