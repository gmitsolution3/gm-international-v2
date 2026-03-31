// app/components/StudentApplicationTable.tsx
"use client";

import { useState } from "react";
import { Eye, Pencil, Save, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Type definitions based on your API response
export interface StudentApplication {
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
  totalAmount?: number;
  advanceAmount?: number;
  cost?: number;
}

interface TableProps {
  applications: StudentApplication[];
  onUpdate?: (
    id: string,
    updates: Partial<StudentApplication>,
  ) => Promise<void>;
}

// Helper to format currency
const formatCurrency = (amount: number | undefined | null) => {
  if (amount === undefined || amount === null) return "0.00";
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const parseAmount = (value: string): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

export default function StudentApplicationTable({
  applications,
}: TableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    totalAmount: number;
    advanceAmount: number;
    cost: number;
  }>({ totalAmount: 0, advanceAmount: 0, cost: 0 });
  const [viewingApp, setViewingApp] = useState<StudentApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination
  const totalPages = Math.ceil(applications.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedApps = applications.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const startEdit = (app: StudentApplication) => {
    setEditingId(app._id);
    setEditValues({
      totalAmount: app.totalAmount ?? 0,
      advanceAmount: app.advanceAmount ?? 0,
      cost: app.cost ?? 0,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

 
  const saveEdit = async (application: StudentApplication) => {
    const payload = {
      totalAmount: editValues.totalAmount,
      advance: editValues.advanceAmount,
      cost: editValues.cost,
      applicantId: application.applicantId,
      packageId: application.packageId,
      applicationId: application._id,
      userEmail: application.email,
      universityName: application.universityName,
      serviceFee: application.serviceFee,
      applicationFee: application.applicationFee,
      b2bPrice: application.b2bPrice,
      createdAt: new Date(),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/accounts/primary-calculation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        // Refresh the page or update state
        toast.success(result.message || "Amounts updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating amounts:", error);
    }

    setEditingId(null);
  };

  // Calculate due = totalAmount - advanceAmount
  const calculateDue = (total: number, advance: number) => {
    return Math.max(0, total - advance);
  };

  // Calculate profit = totalAmount - cost
  const calculateProfit = (total: number, cost: number) => {
    return total - cost;
  };

  // Render popup with full details
  const ViewPopup = () => {
    if (!viewingApp) return null;
    return (
      <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
            <h2 className="text-xl font-semibold">Application Details</h2>
            <button
              onClick={() => setViewingApp(null)}
              className="p-1 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem label="Applicant ID" value={viewingApp.applicantId} />
              <DetailItem
                label="Name"
                value={`${viewingApp.firstName} ${viewingApp.lastName}`}
              />
              <DetailItem label="Email" value={viewingApp.email} />
              <DetailItem label="Gender" value={viewingApp.gender} />
              <DetailItem
                label="University"
                value={viewingApp.universityName}
              />
              <DetailItem label="Course" value={viewingApp.courseName} />
              <DetailItem
                label="Semester"
                value={viewingApp.admissionSemester}
              />
              <DetailItem
                label="Starting Date"
                value={viewingApp.startingDate}
              />
              <DetailItem
                label="Deadline"
                value={new Date(viewingApp.deadline).toLocaleDateString()}
              />
              <DetailItem
                label="Application Fee"
                value={`৳ ${formatCurrency(parseFloat(viewingApp.applicationFee))}`}
              />
              <DetailItem
                label="Service Fee"
                value={`৳ ${formatCurrency(parseFloat(viewingApp.serviceFee))}`}
              />
              <DetailItem
                label="B2B Price"
                value={`৳ ${formatCurrency(parseFloat(viewingApp.b2bPrice))}`}
              />
              <DetailItem
                label="Total Amount"
                value={
                  viewingApp.totalAmount !== undefined
                    ? `৳ ${formatCurrency(viewingApp.totalAmount)}`
                    : "N/A"
                }
              />
              <DetailItem
                label="Advance Amount"
                value={
                  viewingApp.advanceAmount !== undefined
                    ? `৳ ${formatCurrency(viewingApp.advanceAmount)}`
                    : "N/A"
                }
              />
              <DetailItem
                label="Cost"
                value={
                  viewingApp.cost !== undefined
                    ? `৳ ${formatCurrency(viewingApp.cost)}`
                    : "N/A"
                }
              />
              {viewingApp.totalAmount !== undefined &&
                viewingApp.advanceAmount !== undefined && (
                  <DetailItem
                    label="Due"
                    value={`৳ ${formatCurrency(calculateDue(viewingApp.totalAmount, viewingApp.advanceAmount))}`}
                  />
                )}
              {viewingApp.totalAmount !== undefined &&
                viewingApp.cost !== undefined && (
                  <DetailItem
                    label="Profit"
                    value={`৳ ${formatCurrency(calculateProfit(viewingApp.totalAmount, viewingApp.cost))}`}
                  />
                )}
              <DetailItem
                label="Submitted At"
                value={new Date(viewingApp.submittedAt).toLocaleString()}
              />
              <DetailItem
                label="Created At"
                value={new Date(viewingApp.createdAt).toLocaleString()}
              />
            </div>
          </div>
          <div className="p-4 border-t flex justify-end">
            <button
              onClick={() => setViewingApp(null)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="min-w-250 md:min-w-full">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  SL
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Degree
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  App Fee
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Advance
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Due
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Cost
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Profit
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedApps.map((app, idx) => {
                const globalIndex = startIndex + idx + 1;
                const isEditing = editingId === app._id;
                const total = isEditing
                  ? editValues.totalAmount
                  : (app.totalAmount ?? 0);
                const advance = isEditing
                  ? editValues.advanceAmount
                  : (app.advanceAmount ?? 0);
                const costVal = isEditing ? editValues.cost : (app.cost ?? 0);
                const due = calculateDue(total, advance);
                const profit = calculateProfit(total, costVal);
                const appFee = parseFloat(app.applicationFee) || 0;

                return (
                  <tr
                    key={app._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-gray-600">{globalIndex}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {app.firstName} {app.lastName}
                      <div className="text-xs text-gray-500">{app.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="text-xs text-gray-500">
                        {app.universityName}
                      </div>
                      {app.courseName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      ৳ {formatCurrency(appFee)}
                    </td>

                    {/* Total Amount */}
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.totalAmount}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              totalAmount: parseAmount(e.target.value),
                            })
                          }
                          className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          step="0.01"
                        />
                      ) : (
                        <span>৳ {formatCurrency(app.totalAmount)}</span>
                      )}
                    </td>

                    {/* Advance */}
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.advanceAmount}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              advanceAmount: parseAmount(e.target.value),
                            })
                          }
                          className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          step="0.01"
                        />
                      ) : (
                        <span>৳ {formatCurrency(app.advanceAmount)}</span>
                      )}
                    </td>

                    {/* Due (auto) */}
                    <td className="px-4 py-3 font-medium">
                      ৳ {formatCurrency(due)}
                    </td>

                    {/* Cost */}
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.cost}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              cost: parseAmount(e.target.value),
                            })
                          }
                          className="w-28 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          step="0.01"
                        />
                      ) : (
                        <span>৳ {formatCurrency(app.cost)}</span>
                      )}
                    </td>

                    {/* Profit (auto) */}
                    <td className="px-4 py-3 font-medium text-green-600">
                      ৳ {formatCurrency(profit)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setViewingApp(app)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(app)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Save"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(app)}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <ViewPopup />
    </>
  );
}

// Helper component for detail items in popup
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 p-2 rounded-lg">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800 wrap-break-word">{value}</p>
  </div>
);
