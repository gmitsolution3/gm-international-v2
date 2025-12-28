"use client";

import React, { useState } from "react";
import { Booking } from "../page";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Edit, Eye, Users, View } from "lucide-react";
import { ViewApplication } from "./viewApplication";

export interface BookingProps {
  bookings: Booking[];
}
export interface Guest {
  adults: number;
  children: number;
  infants: number;
}

export const TableShow = ({ bookings }: BookingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null)
  const [value,setValue] = useState<string > ('')

  const getTotalGuests = (guests: Guest) =>
    guests.adults + guests.children + guests.infants;

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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Destination
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Check In
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Check Out
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Sl No.
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date Registered
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Payment Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Guests
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Booking Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking, index) => (
            <motion.tr
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="transition-colors hover:bg-red-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {booking.destinationPlace.join(", ")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {format(new Date(booking.dateFrom), "dd.MM.yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {format(new Date(booking.dateTo), "dd.MM.yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {booking.serialNumber || "SP000" + (index + 1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {format(new Date(booking.dateFrom), "10.01.2025")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getPaymentBadge(booking.paymentStatus)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{getTotalGuests(booking.guests)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getBookingBadge(booking.applicationStatus)}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectId(booking._id);
                      setValue("view")
                    }}
                    className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectId(booking._id);
                      setValue("edit")
                    }}
                    className="p-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      <ViewApplication
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={value}
        selectId={selectId}
      />
      <ViewApplication
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={value}
        selectId={selectId}
      />
    </div>
  );
};
