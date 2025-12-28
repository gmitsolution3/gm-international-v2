"use client"

import React from 'react'
import { BookingProps, Guest } from './tableShow';
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export const TableMobileView = ({ bookings }:BookingProps) => {

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Paid
          </span>
        );
      case "due":
        return (
          <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Due
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Pending
          </span>
        );
    }
  };

  const getTotalGuests = (guests: Guest) =>
    guests.adults + guests.children + guests.infants;



  const getBookingBadge = (status: string) => {
    return status === "confirmed" ? (
      <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        Confirmed
      </span>
    ) : (
      <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
        Pending
      </span>
    );
  };




  return (
    <div className="block md:hidden space-y-4">
      {bookings.map((booking, index) => (
        <motion.div
          key={booking._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <MapPin className="w-5 h-5 text-blue-600" />
                {booking.destinationPlace.join(", ")}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Sl No.</div>
              <div className="font-mono font-bold">
                {booking.serialNumber || "SP000" + (index + 1)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Check In</div>
                <div className="font-medium">
                  {format(new Date(booking.dateFrom), "dd.MM.yyyy")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Check Out</div>
                <div className="font-medium">
                  {format(new Date(booking.dateTo), "dd.MM.yyyy")}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Payment Status</div>
              {getPaymentBadge(booking.paymentStatus)}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Booking Status</div>
              {getBookingBadge(booking.applicationStatus)}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="font-medium">
                {getTotalGuests(booking.guests)} Guests
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Registered: 10.01.2025</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
