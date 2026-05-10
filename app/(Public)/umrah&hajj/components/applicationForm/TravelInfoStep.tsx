// components/steps/TravelInfoStep.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../ui/FormField";
import { UmrahPackage } from "../UmrahPackageDetailsCom";
import { FormData } from "@/app/types/UmrahHazz-form-types";
import FormSelect from "../ui/FormSelect";

const TravelInfoStep = ({ packageData }: { packageData: UmrahPackage}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
        Travel Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Package Type *"
          name="travelInfo.packageType"
          register={register}
          error={errors.travelInfo?.packageType?.message}
          options={[
            { value: "umrah", label: "Umrah" },
            { value: "hajj", label: "Hajj" },
          ]}
        />

        <FormField
          label="Travel Month *"
          name="travelInfo.travelMonth"
          type="month"
          register={register}
          error={errors.travelInfo?.travelMonth?.message}
        />

        <FormField
          label="Departure Date"
          name="travelInfo.departureDate"
          type="date"
          register={register}
          error={errors.travelInfo?.departureDate?.message}
        />

        <FormField
          label="Return Date"
          name="travelInfo.returnDate"
          type="date"
          register={register}
          error={errors.travelInfo?.returnDate?.message}
        />

        <FormField
          label="Departure Airport *"
          name="travelInfo.departureAirport"
          register={register}
          error={errors.travelInfo?.departureAirport?.message}
          placeholder="e.g., Hazrat Shahjalal International Airport"
        />

        <FormSelect
          label="Makkah Hotel Category *"
          name="travelInfo.makkahHotelCategory"
          register={register}
          error={errors.travelInfo?.makkahHotelCategory?.message}
          options={[
            { value: "3-star", label: "3 Star" },
            { value: "4-star", label: "4 Star" },
            { value: "5-star", label: "5 Star" },
          ]}
        />

        <FormSelect
          label="Madinah Hotel Category *"
          name="travelInfo.madinahHotelCategory"
          register={register}
          error={errors.travelInfo?.madinahHotelCategory?.message}
          options={[
            { value: "3-star", label: "3 Star" },
            { value: "4-star", label: "4 Star" },
            { value: "5-star", label: "5 Star" },
          ]}
        />

        <FormSelect
          label="Room Sharing *"
          name="travelInfo.roomSharing"
          register={register}
          error={errors.travelInfo?.roomSharing?.message}
          options={[
            { value: "single", label: "Single" },
            { value: "double", label: "Double" },
            { value: "triple", label: "Triple" },
            { value: "quad", label: "Quad" },
          ]}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Air Ticket Included
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("travelInfo.airTicketIncluded")}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm">Yes</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Transportation Included
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("travelInfo.transportationIncluded")}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm">Yes</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelInfoStep;
