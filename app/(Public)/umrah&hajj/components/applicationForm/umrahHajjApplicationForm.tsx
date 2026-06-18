"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StepIndicator from "./StepIndicator";
import { UmrahPackageDetailsComProps } from "../UmrahPackageDetailsCom";
import { FormData, formSchema } from "@/app/types/UmrahHazz-form-types";
import ApplicantInfoStep from "./ApplicantInfoStep";
import TravelInfoStep from "./TravelInfoStep";
import MedicalInfoStep from "./MedicalInfoStep";
import EmergencyContactStep from "./EmergencyContactStep";
import DocumentsStep from "./DocumentsStep";
import CompanionsStep from "./CompanionsStep";
import PaymentStep from "./PaymentStep";
import Swal from "sweetalert2";
import ApplicationSuccess from "./ApplicationSuccessMessage";

const steps = [
  "Applicant Info",
  "Travel Info",
  "Medical Info",
  "Emergency Contact",
  "Documents",
  "Companions",
  "Payment",
  "status",
];

const UmrahHajjApplicationForm = ({ pkg }: UmrahPackageDetailsComProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantInfo: {
        fullName: "",
        fatherName: "",
        motherName: "",
        gender: "male",
        dateOfBirth: "",
        maritalStatus: "single",
        nationality: "Bangladeshi",
        nidNumber: "",
        profession: "",
        phone: "",
        whatsapp: "",
        email: "",
        presentAddress: "",
        permanentAddress: "",
      },
      travelInfo: {
        packageType: "umrah",
        travelMonth: "",
        departureDate: "",
        returnDate: "",
        departureAirport: "",
        makkahHotelCategory: "3-star",
        madinahHotelCategory: "3-star",
        roomSharing: "double",
        airTicketIncluded: true,
        transportationIncluded: true,
      },
      medicalInfo: {
        bloodGroup: "",
        hasDiabetes: false,
        hasHighBloodPressure: false,
        hasHeartDisease: false,
        usesWheelchair: false,
        allergies: "",
        otherMedicalIssues: "",
      },
      emergencyContact: {
        name: "",
        relation: "",
        phone: "",
        address: "",
      },
      documents: {
        passportNumber: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        passportImage: "",
        passportSizePhoto: ["", ""],
        vaccinationCertificate: "",
        covidCertificate: "",
      },
      companions: [],
      payment: {
        paymentMethod: "cash",
        trxId: "",
        image: "",
        paymentStatus: "pending",
      },
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = methods;

  const applicantName = watch("applicantInfo.fullName");

  const onSubmit = async (data: FormData) => {
    const pkgInfo = {
      pkgId: pkg._id,
      pkgName: pkg.title,
      pkgPrice: pkg.discount_price ? pkg.discount_price : pkg.price,
      pkgDepartureDate: pkg.departure_date,
      pkgReturnDate: pkg.return_date,
    };

    const payload = {
      ...data,
      pkgInfo,
      createdAt: new Date(),
      applicationStatus: "pending",
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/umrah-application/api/v1/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (!result._id) {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            result.message ||
            "There was an error submitting your application. Please try again.",
        });

        return;
      }

      setIsSubmitted(true);
      setApplicationId(result._id);
      setCurrentStep(7);

      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text:
          "Your application has been submitted successfully! Application ID: " +
          result._id,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }

    // Handle form submission
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const getFieldsForStep = (step: number): any => {
    switch (step) {
      case 0:
        return ["applicantInfo"];
      case 1:
        return ["travelInfo"];
      case 2:
        return ["medicalInfo"];
      case 3:
        return ["emergencyContact"];
      case 4:
        return ["documents"];
      case 5:
        return ["companions"];
      case 6:
        return ["payment"];
      default:
        return [];
    }
  };

  const successProps = {
    applicationId,
    packageName: pkg.title,
    applicantName,
    email: watch("applicantInfo.email"),
    packageDetails: {
      price: pkg.discount_price || pkg.price,
      departureDate: pkg.departure_date,
      returnDate: pkg.return_date,
    },
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ApplicantInfoStep />;
      case 1:
        return <TravelInfoStep packageData={pkg} />;
      case 2:
        return <MedicalInfoStep />;
      case 3:
        return <EmergencyContactStep />;
      case 4:
        return <DocumentsStep />;
      case 5:
        return <CompanionsStep />;
      case 6:
        return <PaymentStep packagePrice={pkg.discount_price || pkg.price} />;
      case 7:
        return isSubmitted && <ApplicationSuccess {...successProps} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50">
        {/* Package Info Banner */}
        <div className="bg-linear-to-r from-red-600 to-red-800 text-white p-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{pkg.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>
                💰 Price: ৳
                {pkg.discount_price?.toLocaleString() ||
                  pkg.price.toLocaleString()}
              </span>
              <span>
                📅 Duration: {new Date(pkg.departure_date).toLocaleDateString()}{" "}
                - {new Date(pkg.return_date).toLocaleDateString()}
              </span>
              <span>🎫 Seats Available: {pkg.seats}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-12">
          {/* Step Indicator */}
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
          />

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  ← Previous
                </button>

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200`}
                  >
                    Next →
                  </button>
                ) : (
                  <div>
                    {currentStep === 6 && (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200"
                      >
                        {isLoading ? "Submitting..." : "Submit Application"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default UmrahHajjApplicationForm;
