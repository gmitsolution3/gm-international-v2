"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { TableShow } from "./components/tableShow";
import { TableMobileView } from "./components/tableMobileView";

interface Guest {
  adults: number;
  children: number;
  infants: number;
}

interface Duration {
  days: number;
  nights: number;
}

export interface Booking {
  _id: string;
  fullName: string;
  destinationPlace: string[];
  dateFrom: string;
  dateTo: string;
  guests: Guest;
  phoneNumber: string;
  email: string;
  passportNumber: string;
  visaStatus: string;
  travelCost: string;
  airTicket: string;
  duration: Duration;
  foodPlan: string[];
  transportation: string[];
  destinationCountry: string;
  hotelCategory: string[];
  paymentStatus: "paid" | "pending" | "due";
  applicationStatus: "confirmed" | "pending";
  serialNumber?: string;
  paymentMethod: string;
}

export default function TouristUserApplicationStatus() {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const userApplication = async () => {
      try {
        const res = await fetch(
          `https://gm-international-server-gamma.vercel.app/get-user-booked-data?email=${session?.user?.email}`,
          {
            cache: "no-store",
          }
        );
        const resOfResult = await res.json();
        setBookings(resOfResult);
      } catch (error) {
        console.error(`no data found ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    userApplication();
  }, [session]);

  if (!bookings || isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        User Dashboard
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl shadow-lg bg-white">
        <TableShow bookings={bookings} />
      </div>

      {/* Mobile Card View */}
      <div>
        <TableMobileView bookings={bookings} />
      </div>
    </div>
  );
}
