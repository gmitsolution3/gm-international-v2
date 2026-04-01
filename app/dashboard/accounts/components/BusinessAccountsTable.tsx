// components/BusinessAccountsTable.tsx
"use client";

import { CheckIcon, PencilIcon, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BusinessAccount {
  _id: string;
  clientName: string;
  clientPhone: string;
  gender: string;
  passportNumber: string;
  officeLocation: string;
  country: string;
  totalAmount: number;
  advance: number;
  due: number;
  remarks: string;
  createdAt: string;
  accountHolder?: {
    email: string;
    phone: string;
    userRole: string;
    branchName: string | null;
  };
}

interface BusinessAccountsTableProps {
  data: BusinessAccount[];
  isAdmin: boolean;
  userRole?: string;
}

const BusinessAccountsTable = ({
  data,
  isAdmin,
  userRole,
}: BusinessAccountsTableProps) => {
  const [accounts, setAccounts] = useState<BusinessAccount[]>(data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<BusinessAccount>>({});
  const [loading, setLoading] = useState(false);

  // Check if user can edit all fields (admin) or only advance (office_admin)
  const canEditAllFields = isAdmin && userRole === "admin";
  const canEditAdvanceOnly =
    userRole === "office_admin" || (!isAdmin && userRole !== "admin");

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
  const handleEdit = (account: BusinessAccount) => {
    setEditingId(account._id);
    setEditData({
      clientName: account.clientName,
      clientPhone: account.clientPhone,
      gender: account.gender,
      passportNumber: account.passportNumber,
      officeLocation: account.officeLocation,
      country: account.country,
      totalAmount: account.totalAmount,
      advance: account.advance,
      due: account.due,
      remarks: account.remarks,
    });
  };

  // Handle advance update for non-admin (auto-calculates due)
  const handleAdvanceUpdate = (advanceValue: number) => {
    const totalAmount = editData.totalAmount || 0;
    const newDue = totalAmount - advanceValue;
    setEditData((prev) => ({
      ...prev,
      advance: advanceValue,
      due: newDue >= 0 ? newDue : 0,
    }));
  };

  // Handle save
  const handleSave = async (id: string) => {
    setLoading(true);
    try {
      // Prepare data for API
      const updatePayload =
        canEditAdvanceOnly && !canEditAllFields
          ? { advance: editData.advance, due: editData.due }
          : editData;

      // API call to update business account
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/accounts/bap-update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePayload),
        },
      );

      const result = await response.json();

      if (result.success) {
        // Update local state
        setAccounts(
          accounts.map((acc) =>
            acc._id === id ? { ...acc, ...editData } : acc,
          ),
        );
        toast.success(result.message || "updated");
        setEditingId(null);
        setEditData({});
      } else {
        toast.error(result.message);
        console.error("Failed to update business account");
      }
    } catch (error) {
      console.error("Error updating business account:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // Handle input change
  // const handleInputChange = (
  //   field: keyof BusinessAccount,
  //   value: string | number,
  // ) => {
  //   if (field === "advance" && canEditAdvanceOnly && !canEditAllFields) {
  //     handleAdvanceUpdate(value as number);
  //   } else {
  //     setEditData((prev) => ({ ...prev, [field]: value }));

  //     // If totalAmount changes and we're in advance-only mode, recalculate due
  //     if (field === "totalAmount" && canEditAdvanceOnly && !canEditAllFields) {
  //       const newTotal = value as number;
  //       const currentAdvance = editData.advance || 0;
  //       const newDue = newTotal - currentAdvance;
  //       setEditData((prev) => ({
  //         ...prev,
  //         totalAmount: newTotal,
  //         due: newDue >= 0 ? newDue : 0,
  //       }));
  //     }
  //   }
  // };

  const handleInputChange = (
    field: keyof BusinessAccount,
    value: string | number,
  ) => {
    setEditData((prev) => {
      const updated = { ...prev, [field]: value };

      // always recalculate when advance or total changes
      if (field === "advance" || field === "totalAmount") {
        const total = Number(updated.totalAmount || 0);
        const advance = Number(updated.advance || 0);

        updated.due = total - advance >= 0 ? total - advance : 0;
      }

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
        <p className="text-gray-500 text-lg">No business accounts found</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first business application to get started
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Client Details
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Office Location
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Country
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Remarks
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
                  Account Holder
                </th>
              )}
              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
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
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      {isEditing && canEditAllFields ? (
                        <>
                          <input
                            type="text"
                            value={editData.clientName || ""}
                            onChange={(e) =>
                              handleInputChange("clientName", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            placeholder="Client Name"
                          />
                          <select
                            value={editData.gender || ""}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <input
                            type="tel"
                            value={editData.clientPhone || ""}
                            onChange={(e) =>
                              handleInputChange("clientPhone", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            placeholder="Phone"
                          />
                          <input
                            type="text"
                            value={editData.passportNumber || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "passportNumber",
                                e.target.value,
                              )
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            placeholder="Passport Number"
                          />
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-gray-900">
                            {account.clientName}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            Gender: {account.gender}
                          </p>
                          <p className="text-xs text-gray-500">
                            Phone: {account.clientPhone}
                          </p>
                          {account.passportNumber && (
                            <p className="text-xs text-gray-500">
                              Passport: {account.passportNumber}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {isEditing && canEditAllFields ? (
                      <input
                        type="text"
                        value={editData.officeLocation || ""}
                        onChange={(e) =>
                          handleInputChange("officeLocation", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        placeholder="Office Location"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">
                        {account.officeLocation}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {isEditing && canEditAllFields ? (
                      <input
                        type="text"
                        value={editData.country || ""}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        placeholder="Country"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{account.country}</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {isEditing && canEditAllFields ? (
                      <textarea
                        value={editData.remarks || ""}
                        onChange={(e) =>
                          handleInputChange("remarks", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        rows={2}
                        placeholder="Remarks"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 max-w-xs line-clamp-2">
                        {account.remarks || "—"}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {isEditing && canEditAllFields ? (
                      <input
                        type="number"
                        value={editData.totalAmount || 0}
                        onChange={(e) =>
                          handleInputChange(
                            "totalAmount",
                            Number(e.target.value),
                          )
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(account.totalAmount)}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.advance || 0}
                        onChange={(e) =>
                          handleInputChange("advance", Number(e.target.value))
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        disabled={!canEditAllFields && !canEditAdvanceOnly}
                      />
                    ) : (
                      <p className="text-sm font-medium text-green-600">
                        {formatCurrency(account.advance)}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.due || 0}
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm"
                        disabled
                      />
                    ) : (
                      <p className="text-sm font-medium text-red-600">
                        {formatCurrency(account.due)}
                      </p>
                    )}
                  </td>

                  {isAdmin && (
                    <td className="px-4 py-4">
                      {account.accountHolder && (
                        <div className="text-xs">
                          <p className="font-medium">
                            {account.accountHolder.email}
                          </p>
                          <p className="text-gray-500">
                            {account.accountHolder.phone}
                          </p>
                          {account.accountHolder.branchName && (
                            <p className="text-gray-500">
                              Branch: {account.accountHolder.branchName}
                            </p>
                          )}
                          <p className="text-gray-500 capitalize">
                            {account.accountHolder.userRole}
                          </p>
                        </div>
                      )}
                    </td>
                  )}
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
                      (canEditAllFields || canEditAdvanceOnly) && (
                        <button
                          onClick={() => handleEdit(account)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50 border-t border-gray-200">
            <tr className="font-semibold">
              <td
                colSpan={4}
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
              <td className="px-4 py-4"></td>
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
                  {isEditing && canEditAllFields ? (
                    <input
                      type="text"
                      value={editData.clientName || ""}
                      onChange={(e) =>
                        handleInputChange("clientName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"
                      placeholder="Client Name"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900">
                      {account.clientName}
                    </h3>
                  )}
                </div>
                {(canEditAllFields || canEditAdvanceOnly) && !isEditing && (
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
                  <p className="text-gray-500 text-xs">Gender</p>
                  {isEditing && canEditAllFields ? (
                    <select
                      value={editData.gender || ""}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-700 font-medium capitalize">
                      {account.gender}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Phone</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="tel"
                      value={editData.clientPhone || ""}
                      onChange={(e) =>
                        handleInputChange("clientPhone", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.clientPhone}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">Passport Number</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="text"
                      value={editData.passportNumber || ""}
                      onChange={(e) =>
                        handleInputChange("passportNumber", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.passportNumber || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Office Location</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="text"
                      value={editData.officeLocation || ""}
                      onChange={(e) =>
                        handleInputChange("officeLocation", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.officeLocation}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Country</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="text"
                      value={editData.country || ""}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.country}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">Remarks</p>
                  {isEditing && canEditAllFields ? (
                    <textarea
                      value={editData.remarks || ""}
                      onChange={(e) =>
                        handleInputChange("remarks", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.remarks || "—"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <p className="text-gray-500 text-xs">Total</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="number"
                      value={editData.totalAmount || 0}
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
                      value={editData.advance || 0}
                      onChange={(e) =>
                        handleInputChange("advance", Number(e.target.value))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      disabled={!canEditAllFields && !canEditAdvanceOnly}
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
                      value={editData.due || 0}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm"
                      disabled
                    />
                  ) : (
                    <p className="text-red-600 font-semibold text-sm">
                      {formatCurrency(account.due)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                {isAdmin && account.accountHolder && (
                  <div className="text-right text-xs">
                    <p className="text-gray-500">
                      {account.accountHolder.email}
                    </p>
                    <p className="text-gray-500">
                      {account.accountHolder.branchName || "No branch"}
                    </p>
                  </div>
                )}
                {(canEditAllFields || canEditAdvanceOnly) && isEditing && (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAccountsTable;
