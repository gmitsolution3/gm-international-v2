// data.ts

import { Globe, HandCoins, User, Users } from "lucide-react";
import { TravelApplication } from "./type";






// Helper function to format the ISO date string to a readable date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  // Using 'en-GB' format for Day/Month/Year
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface ApplicationCardProps {
  data: TravelApplication;
  onClose: ()=>void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ data, onClose }) => {
  const {
    fullName,
    phoneNumber,
    email,
    passportNumber,
    visaStatus,
    gender,
    guests,
    travelCost,
    airTicket,
    destinationCountry,
    destinationPlace,
    duration,
    foodPlan,
    transportation,
    dateFrom,
    dateTo,
    hotelCategory,
    paymentMethod,
    applicationStatus,
    paymentStatus,
  } = data;

  // Simple function for a status badge style
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
      case "paid":
        return "bg-green-100 text-green-800";
      case "rejected":
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const DetailItem = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="flex justify-between items-start py-2 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-900 text-right">
        {value}
      </span>
    </div>
  );

  return (
    <div className="max-w-full mx-auto my-8 overflow-hidden">
      <div className="p-6 bg-linear-65 from-[#CA2328] to-[#e02329] text-white rounded-2xl">
        <h2 className="text-2xl font-bold">Travel Application Overview</h2>
        <p className="text-blue-200">{`ID: ${data._id}`}</p>
      </div>

      <div className="p-6">
        {/* === Personal Information === */}
        <section className="mb-6">
          <h3 className="flex text-xl font-semibold border-b pb-2 mb-4 text-gray-700">
            <User /> Personal Details
          </h3>
          <DetailItem label="Full Name" value={fullName} />
          <DetailItem label="Email" value={email} />
          <DetailItem label="Phone Number" value={phoneNumber} />
          <DetailItem label="Passport Number" value={passportNumber} />
          <DetailItem label="Gender" value={gender} />
          <DetailItem label="Visa Status" value={visaStatus} />
        </section>

        {/* === Trip Details === */}
        <section className="mb-6">
          <h3 className="flex text-xl font-semibold border-b pb-2 mb-4 text-gray-700">
            <Globe /> Trip & Destination
          </h3>
          <DetailItem
            label="Destination Country"
            value={destinationCountry.toUpperCase()}
          />
          <DetailItem label="Places" value={destinationPlace.join(", ")} />
          <DetailItem
            label="Dates"
            value={`${formatDate(dateFrom)} - ${formatDate(dateTo)}`}
          />
          <DetailItem
            label="Duration"
            value={`${duration.days} Days / ${duration.nights} Nights`}
          />
          <DetailItem
            label="Air Ticket Class"
            value={airTicket.charAt(0).toUpperCase() + airTicket.slice(1)}
          />
          <DetailItem label="Hotel Category" value={hotelCategory.join(", ")} />
        </section>

        {/* === Traveler & Arrangements === */}
        <section className="mb-6">
          <h3 className="flex text-xl font-semibold border-b pb-2 mb-4 text-gray-700">
            <Users /> Travelers & Arrangements
          </h3>
          <DetailItem
            label="Guests"
            value={`Adults: ${guests.adults}, Children: ${guests.children}, Infants: ${guests.infants}`}
          />
          <DetailItem
            label="Transportation"
            value={transportation.join(", ")}
          />
          <DetailItem label="Food Plan" value={foodPlan.join(", ")} />
        </section>

        {/* === Financial & Status === */}
        <section>
          <h3 className="flex text-xl font-semibold border-b pb-2 mb-4 text-gray-700">
            <HandCoins /> Financial & Status
          </h3>
          <DetailItem
            label="Travel Cost (BDT)"
            value={`BDT ${parseInt(travelCost).toLocaleString("en-IN")}`}
          />
          <DetailItem
            label="Payment Method"
            value={paymentMethod.toUpperCase()}
          />
          <DetailItem
            label="Application Status"
            value={
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(
                  applicationStatus
                )}`}
              >
                {applicationStatus.toUpperCase()}
              </span>
            }
          />
          <DetailItem
            label="Payment Status"
            value={
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(
                  paymentStatus
                )}`}
              >
                {paymentStatus.toUpperCase()}
              </span>
            }
          />
        </section>
      </div>
    </div>
  );
};

export default ApplicationCard;
