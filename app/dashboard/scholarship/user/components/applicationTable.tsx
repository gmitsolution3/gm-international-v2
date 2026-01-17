"use client";

import { useState, useMemo, useEffect } from "react";
import { StatusBadge } from "./status-badge";
import { ApplicationRow } from "./applicationTableRow";
import { useSession } from "next-auth/react";
import Link from "next/link";
import EditUserApplication from "./editUserApplication";
import Loader from "@/components/ui/loader";

interface UserApplicationFormData {
  _id: string;
  country: string;
  university: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  admissionSemester: string;
  language: string;
  courseName: string;
  coverage: string;
  email: string;
  category: string;
  paymentMethod: string;
  degree: string;
  applicantId: string;
  dateApplied: string;
  paymentStatus: string;
  applicationStatus: string;
}

export function UserApplicationsTable({ edit }: { edit?: boolean }) {
  const { data: session, status } = useSession();
  const [filteredApplications, setFilteredApplications] = useState<
    UserApplicationFormData[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const email = session?.user?.email;

  useEffect(() => {
    // Fetch applications from API and set to state
    const applicationData = async () => {
      if (!email) return;
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/application-status?email=${email}`,
          {
            cache: "no-cache",
          }
        );
        const data = await response.json();

        setFilteredApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    applicationData();
  }, [email, setFilteredApplications]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (filteredApplications.length === 0) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <div className="my-4">
          <h1 className="text-xl font-bold lg:text-3xl">Application</h1>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No applications found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="my-4">
        <h1 className="textt-xl font-bold lg:text-3xl">Application</h1>
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-slate-700">
            <tr className="dark:from-slate-800 dark:to-slate-900">
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                University Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                Program
              </th>
              {/* <th className="px-6 py-4 text-left text-sm font-semibold ">Degree</th> */}
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                Coverage
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                Applicant Id.
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                Date Applied
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                Payment Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                Application Status
              </th>
              {!edit && (
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  View Details
                </th>
              )}
              {edit && (
                <th className="px-6 py-4 text-left text-sm font-semibold ">
                  Edit
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-red-200 dark:divide-slate-700 py-4">
            {filteredApplications.map((application, index) => (
              <tr
                key={application._id}
                className="hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-200 animate-fade-in py-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                  {application.university}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {application.courseName}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {application.coverage}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {application.applicantId}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {" "}
                  {new Date(
                    parseInt(application._id.substring(0, 8), 16) * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    type="payment"
                    status={application.paymentStatus}
                  />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    type="application"
                    status={application.applicationStatus}
                  />
                </td>
                {!edit && (
                  <td className="px-6 py-4 text-sm text-blue-500 dark:text-slate-400 hover:underline hover:cursor-pointer hover:link">
                    <Link
                      href={`/student-home-page/student-package-offer/${application.applicantId}`}
                    >
                      View Details
                    </Link>
                  </td>
                )}
                {edit && (
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    <button
                      onClick={() => (
                        setSelectedId(application._id), setIsOpen(true)
                      )}
                      className="px-3 py-2 border border-gray-300 bg-red-400 rounded-lg text-black hover:bg-red-400 hover:text-white "
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <EditUserApplication
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          filteredApplications={filteredApplications}
          selectedId={selectedId}
        />
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredApplications.map((application, index) => (
          <ApplicationRow
            key={application._id}
            application={application}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
