import React from 'react'
import ApplicationCard from './applicatoinCard';
import { TravelApplication } from './type';
import EditableApplicationCard from './editAbleApplication';


interface UniversityPackageModal {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  selectId : string | null
}


export const travelData: TravelApplication = {
  _id: "692433e1896e31a32d0c8d50",
  fullName: "sabbir",
  phoneNumber: "+8801817247388",
  email: "sabbir1@gmail.com",
  passportNumber: "21324345",
  visaStatus: "already-have",
  gender: "male",
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  travelCost: "523510",
  airTicket: "business",
  destinationCountry: "thailand",
  destinationPlace: ["Zurich", "Geneva"],
  duration: {
    days: 5,
    nights: 4,
  },
  foodPlan: ["Breakfast", "Lunch", "Dinner", "Snacks"],
  transportation: ["Private Car"],
  dateFrom: "2025-11-25T08:00:00.000Z",
  dateTo: "2025-11-30T08:00:00.000Z",
  hotelCategory: ["Resort"],
  paymentMethod: "bkash",
  applicationStatus: "pending",
  paymentStatus: "pending",
};


export const ViewApplication: React.FC<UniversityPackageModal> = ({
  isOpen,
  onClose,
  value,
  selectId,
}) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center bg-black/20 backdrop-blur-md p-4">
      <div className="max-h-[80vh] bg-white shadow-xl mg:p-4 lg:p-8 w-full md:max-w-5xl text-center relative flex flex-col items-center overflow-auto rounded-2xl">
        <div className="w-full text-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Close
          </button>
        </div>

        <div className="w-full">
          {/* <ApplicationView onClose={onClose} /> */}

          {value === "view" && (
            <ApplicationCard data={travelData} onClose={onClose} />
          )}

          {value === "edit" && (
            <EditableApplicationCard dataValue={travelData} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};
