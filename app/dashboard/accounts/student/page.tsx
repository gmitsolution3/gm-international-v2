// app/dashboard/accounts/student/page.tsx
import React from "react";
import StudentApplicationTable from "../components/StudentApplicationTable";


interface ApplicationData {
  _id: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  admissionSemester: string;
  courseName: string;
  createdAt: string;
  submittedAt: string;
  packageId: string;
  universityName: string;
  serviceFee: string;
  applicationFee: string;
  b2bPrice: string;
  deadline: string;
  startingDate: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ApplicationData[];
}

const StudentAccountPage = async () => {
  try {
    const manageApplicationData = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/accounts/get-student-application`,
      {
        cache: "no-store",
      }
    );
    
    const applicationData: ApiResponse = await manageApplicationData.json();

    console.log({ applicationData: applicationData });

    
    return (
      <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Student Applications
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track all student visa applications
            </p>
          </div>

          {/* Table Component */}
          {applicationData.success && applicationData.data ? (
            <StudentApplicationTable
              applications={applicationData.data}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-500">No application data available</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return (
      <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-red-700 font-semibold text-lg mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-600">
            There was an error fetching the application data. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default StudentAccountPage;