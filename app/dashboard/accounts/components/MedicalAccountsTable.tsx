// components/MedicalAccountsTable.tsx
"use client";

import { CheckIcon, MarsStrokeIcon, PencilIcon, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MedicalAccount {
  _id: string;
  name: string;
  hospitalName: string;
  countryName: string;
  patientAge: number;
  patientPhone: string;
  patientDisease: string;
  flyingDate: string;
  totalAmount: number;
  advance: number;
  due: number;
  createdAt: string;
  accountHolder?: {
    email: string;
    phone: string;
    userRole: string;
    branchName: string | null;
  };
}

interface MedicalAccountsTableProps {
  data: MedicalAccount[];
  isAdmin: boolean;
}

const MedicalAccountsTable = ({ data, isAdmin }: MedicalAccountsTableProps) => {
  const [accounts, setAccounts] = useState<MedicalAccount[]>(data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<MedicalAccount>>({});
  const [loading, setLoading] = useState(false);

  // Calculate profit (totalAmount - (advance + due))
  const calculateProfit = (total: number, advance: number, due: number) => {
    return total - (advance + due);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle edit click
  const handleEdit = (account: MedicalAccount) => {
    setEditingId(account._id);
    setEditData({
      name: account.name,
      hospitalName: account.hospitalName,
      countryName: account.countryName,
      patientAge: account.patientAge,
      patientPhone: account.patientPhone,
      patientDisease: account.patientDisease,
      flyingDate: account.flyingDate,
      totalAmount: account.totalAmount,
      advance: account.advance,
      due: account.due,
    });
  };

  // Handle save
  const handleSave = async (id: string) => {
    setLoading(true);
    try {
      // API call to update medical account
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/accounts/map-update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        },
      );

      const result = await response.json();

      if (result.success) {
        setAccounts(
          accounts.map((acc) =>
            acc._id === id ? { ...acc, ...editData } : acc,
          ),
        );
        setEditingId(null);
        setEditData({});
        toast.success(result.message || "Document updated successfully");
      } else {
        console.error("Failed to update medical account");
        toast.error(result.message || "Failed to update medical account");
      }
    } catch (error) {
      console.error("Error updating medical account:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };


const handleInputChange = (
  field: keyof MedicalAccount,
  value: string | number,
) => {
  setEditData((prev) => {
    const updated = { ...prev, [field]: value };

    // find current account
    const currentAccount = accounts.find((acc) => acc._id === editingId);

    if (!currentAccount) return updated;

    // get correct values (fallback)
    const total = Number(updated.totalAmount ?? currentAccount.totalAmount);

    const advance = Number(updated.advance ?? currentAccount.advance);

    // auto calculate due
    updated.due = total - advance;

    return updated;
  });
};

  // Calculate totals
  const totals = accounts.reduce(
    (acc, account) => ({
      totalAmount: acc.totalAmount + account.totalAmount,
      totalAdvance: acc.totalAdvance + account.advance,
      totalDue: acc.totalDue + account.due,
      totalProfit:
        acc.totalProfit +
        calculateProfit(account.totalAmount, account.advance, account.due),
    }),
    { totalAmount: 0, totalAdvance: 0, totalDue: 0, totalProfit: 0 },
  );

  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg">No medical accounts found</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first medical application to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Patient Name
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Hospital
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Country
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Age
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Disease
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Flying Date
              </th>
              <th className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                Total Amount
              </th>
              <th className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                Advance
              </th>
              <th className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                Due
              </th>

              {isAdmin && (
                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-900">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accounts.map((account) => {
              const profit = calculateProfit(
                account.totalAmount,
                account.advance,
                account.due,
              );
              const isEditing = editingId === account._id;

              return (
                <tr
                  key={account._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {isEditing && isAdmin ? (
                      <input
                        type="text"
                        value={editData.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      account.name
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {isEditing && isAdmin ? (
                      <input
                        type="text"
                        value={editData.hospitalName || ""}
                        onChange={(e) =>
                          handleInputChange("hospitalName", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      account.hospitalName
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {isEditing && isAdmin ? (
                      <input
                        type="text"
                        value={editData.countryName || ""}
                        onChange={(e) =>
                          handleInputChange("countryName", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      account.countryName
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {isEditing && isAdmin ? (
                      <input
                        type="number"
                        value={editData.patientAge || 0}
                        onChange={(e) =>
                          handleInputChange(
                            "patientAge",
                            Number(e.target.value),
                          )
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      account.patientAge
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                    {isEditing && isAdmin ? (
                      <input
                        type="text"
                        value={editData.patientDisease || ""}
                        onChange={(e) =>
                          handleInputChange("patientDisease", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      <span className="line-clamp-2">
                        {account.patientDisease}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {isEditing && isAdmin ? (
                      <input
                        type="date"
                        value={editData.flyingDate || ""}
                        onChange={(e) =>
                          handleInputChange("flyingDate", e.target.value)
                        }
                        className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      formatDate(account.flyingDate)
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-gray-900">
                    {isEditing && isAdmin ? (
                      <input
                        type="number"
                        value={editData.totalAmount ?? account.totalAmount}
                        onChange={(e) =>
                          handleInputChange(
                            "totalAmount",
                            Number(e.target.value),
                          )
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      formatCurrency(account.totalAmount)
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-green-600">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.advance ?? account.advance}
                        onChange={(e) =>
                          handleInputChange("advance", Number(e.target.value))
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      formatCurrency(account.advance)
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-red-600">
                    {isEditing  ? (
                      <input
                        type="number"
                        readOnly
                        value={editData.due ?? account.due}
                        onChange={(e) =>
                          handleInputChange("due", Number(e.target.value))
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      formatCurrency(account.due)
                    )}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleSave(account._id)}
                          disabled={loading}
                          className="p-1 text-green-600 hover:text-green-700 transition-colors"
                        >
                          <CheckIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-1 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(account)}
                        className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50 border-t border-gray-200">
            <tr className="font-semibold">
              <td
                colSpan={6}
                className="px-4 py-4 text-right text-sm text-gray-900"
              >
                Total:
              </td>
              <td className="px-4 py-4 text-right text-sm text-gray-900">
                {formatCurrency(totals.totalAmount)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-green-700">
                {formatCurrency(totals.totalAdvance)}
              </td>
              <td className="px-4 py-4 text-right text-sm text-red-700">
                {formatCurrency(totals.totalDue)}
              </td>

              {isAdmin && <td className="px-4 py-4"></td>}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {accounts.map((account) => {
          const profit = calculateProfit(
            account.totalAmount,
            account.advance,
            account.due,
          );
          const isEditing = editingId === account._id;

          return (
            <div key={account._id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {isEditing && isAdmin ? (
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"
                      placeholder="Patient Name"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900">
                      {account.name}
                    </h3>
                  )}
                </div>
                {isAdmin && !isEditing && (
                  <button
                    onClick={() => handleEdit(account)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Hospital</p>
                  {isEditing && isAdmin ? (
                    <input
                      type="text"
                      value={editData.hospitalName || ""}
                      onChange={(e) =>
                        handleInputChange("hospitalName", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.hospitalName}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Country</p>
                  {isEditing && isAdmin ? (
                    <input
                      type="text"
                      value={editData.countryName || ""}
                      onChange={(e) =>
                        handleInputChange("countryName", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.countryName}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Age</p>
                  {isEditing && isAdmin ? (
                    <input
                      type="number"
                      value={editData.patientAge || 0}
                      onChange={(e) =>
                        handleInputChange("patientAge", Number(e.target.value))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.patientAge} years
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Phone</p>
                  {isEditing && isAdmin ? (
                    <input
                      type="tel"
                      value={editData.patientPhone || ""}
                      onChange={(e) =>
                        handleInputChange("patientPhone", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.patientPhone}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">Disease</p>
                  {isEditing && isAdmin ? (
                    <input
                      type="text"
                      value={editData.patientDisease || ""}
                      onChange={(e) =>
                        handleInputChange("patientDisease", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.patientDisease}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">Flying Date</p>
                  {isEditing && isAdmin ? (
                    <input
                      type="date"
                      value={editData.flyingDate || ""}
                      onChange={(e) =>
                        handleInputChange("flyingDate", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {formatDate(account.flyingDate)}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <p className="text-gray-500 text-xs">Total</p>
                  {isEditing && isAdmin ? (
                    <input
                      type="number"
                      value={editData.totalAmount ?? account.totalAmount}
                      onChange={(e) =>
                        handleInputChange("totalAmount", Number(e.target.value))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold text-sm">
                      {formatCurrency(account.totalAmount)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Advance</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.advance ?? account.advance}
                      onChange={(e) =>
                        handleInputChange("advance", Number(e.target.value))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-green-600 font-semibold text-sm">
                      {formatCurrency(account.advance)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Due</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.due ?? account.due}
                      readOnly
                      onChange={(e) =>
                        handleInputChange("due", Number(e.target.value))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-red-600 font-semibold text-sm">
                      {formatCurrency(account.due)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div>
                  <p className="text-gray-500 text-xs">Profit</p>
                  <p className="text-blue-600 font-bold text-sm">
                    {formatCurrency(profit)}
                  </p>
                </div>
                {isAdmin && isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(account._id)}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Mobile Totals */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="font-semibold text-gray-900">
                {formatCurrency(totals.totalAmount)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Advance</p>
              <p className="font-semibold text-green-600">
                {formatCurrency(totals.totalAdvance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Due</p>
              <p className="font-semibold text-red-600">
                {formatCurrency(totals.totalDue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Profit</p>
              <p className="font-semibold text-blue-600">
                {formatCurrency(totals.totalProfit)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAccountsTable;
