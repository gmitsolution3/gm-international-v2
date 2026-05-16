import React from "react";
import { Calendar, MapPin, Package, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { RecentBooking } from "@/app/types/tourist";

interface RecentBookingsCardProps {
  bookings: RecentBooking[];
}

const BookingCard: React.FC<{ booking: RecentBooking }> = ({ booking }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-all duration-300">
    <div className="flex gap-3 sm:gap-4">
      {/* Thumbnail */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
        <Image
          src={booking.packageInfo.thumbnail}
          alt={booking.packageInfo.packageName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 64px, 80px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
            {booking.fullName}
          </h4>
          <span className="text-xs sm:text-sm font-bold text-red-600 whitespace-nowrap">
            ৳{parseInt(booking.totalCost).toLocaleString()}
          </span>
        </div>

        <div className="space-y-1 text-xs sm:text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Package className="w-3 h-3 shrink-0" />
            <span className="truncate">{booking.packageInfo.packageName}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">
              {booking.location.destinationPlace}, {booking.location.country}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 text-gray-500">
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 shrink-0" />
              <span className="truncate text-xs">{booking.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 shrink-0" />
              <span className="text-xs">{booking.phoneNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Calendar className="w-3 h-3 shrink-0" />
            <span>
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RecentBookingsCard: React.FC<RecentBookingsCardProps> = ({
  bookings,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Recent Bookings
        </h3>
      </div>
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentBookingsCard;
