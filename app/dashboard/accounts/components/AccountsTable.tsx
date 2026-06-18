// components/StudentAccountsTable.tsx
"use client";

import { CheckIcon, FileWarning, PencilIcon, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StudentAccount {
  _id: string;
  name: string;
  userEmail: string;
  degree: string;
  university: string;
  intake: string;
  totalAmount: number;
  advance: number;
  due: number;
  createdAt: string;
  missingDocuments?: string[];
  accountHolder?: {
    email: string;
    phone: string;
    userRole: string;
    branchName: string | null;
  };
}

interface StudentAccountsTableProps {
  data: StudentAccount[];
  isAdmin: boolean;
  userRole?: string;
}

const StudentAccountsTable = ({
  data,
  isAdmin,
  userRole,
}: StudentAccountsTableProps) => {
  const [accounts, setAccounts] = useState<StudentAccount[]>(data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<StudentAccount>>({});
  const [loading, setLoading] = useState(false);

  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);
  const [docInput, setDocInput] = useState("");

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

  const handleOpenDocModal = (account: StudentAccount) => {
    setSelectedId(account._id);
    setDocuments(account.missingDocuments || []);
    setDocModalOpen(true);
  };

  const handleAddDocument = () => {
    if (!docInput.trim()) return;

    setDocuments((prev) => [...prev, docInput.trim()]);
    setDocInput("");
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveDocuments = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/std-account/api/v1/sap-upd/${selectedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            missingDocuments: documents,
          }),
        },
      );

      const result = await res.json();
      console.log({ result });

      if (result.success) {
        setAccounts((prev) =>
          prev.map((acc) =>
            acc._id === selectedId
              ? { ...acc, missingDocuments: documents }
              : acc,
          ),
        );

        toast.success("Documents updated");
        setDocModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle edit click
  const handleEdit = (account: StudentAccount) => {
    setEditingId(account._id);
    setEditData({
      name: account.name,
      userEmail: account.userEmail,
      degree: account.degree,
      university: account.university,
      intake: account.intake,
      totalAmount: account.totalAmount,
      advance: account.advance,
      due: account.due,
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

      // API call to update student account
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/std-account/api/v1/sap-upd/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePayload),
        },
      );

      const result = await response.json();
      console.log({ result });

      if (result.success) {
        // Update local state
        setAccounts(
          accounts.map((acc) =>
            acc._id === id ? { ...acc, ...editData } : acc,
          ),
        );
        setEditingId(null);
        setEditData({});

        toast.success(result.message || "Update student account");
      } else {
        console.error("Failed to update student account");
        toast.success(result.message || "Failed to update student account");
      }
    } catch (error) {
      console.error("Error updating student account:", error);
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
    field: keyof StudentAccount,
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
        <p className="text-gray-500 text-lg">No student accounts found</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first student application to get started
        </p>
      </div>
    );
  }

  console.log({ accounts });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Student Details
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Academic Info
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                University
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">
                Intake
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
              <th>Missing Doc</th>

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
                            value={editData.name || ""}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            placeholder="Student Name"
                          />
                          <input
                            type="email"
                            value={editData.userEmail || ""}
                            onChange={(e) =>
                              handleInputChange("userEmail", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            placeholder="Email"
                          />
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-gray-900">
                            {account.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Email: {account.userEmail}
                          </p>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {isEditing && canEditAllFields ? (
                      <input
                        type="text"
                        value={editData.degree || ""}
                        onChange={(e) =>
                          handleInputChange("degree", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        placeholder="Degree"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{account.degree}</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {isEditing && canEditAllFields ? (
                      <input
                        type="text"
                        value={editData.university || ""}
                        onChange={(e) =>
                          handleInputChange("university", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        placeholder="University"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">
                        {account.university}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {isEditing && canEditAllFields ? (
                      <input
                        type="text"
                        value={editData.intake || ""}
                        onChange={(e) =>
                          handleInputChange("intake", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        placeholder="Intake"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 capitalize">
                        {account.intake}
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
                  <td>
                    {account.missingDocuments?.length ? (
                      <div className="flex flex-col flex-wrap gap-1">
                        {account.missingDocuments.map((doc, i) => (
                          <span
                            key={i}
                            className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">None</span>
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
                          {account.accountHolder && (
                            <p className="text-gray-500">
                              Branch:{" "}
                              {account.accountHolder.userRole === "admin"
                                ? "Main branch"
                                : account.accountHolder.branchName}
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
                      <div className="flex gap-2 justify-center">
                        {(canEditAllFields || canEditAdvanceOnly) && (
                          <button onClick={() => handleEdit(account)}>
                            <PencilIcon className="w-5 h-5" />
                          </button>
                        )}
                        {isAdmin && (
                          <button onClick={() => handleOpenDocModal(account)}>
                            <FileWarning className="w-5 h-5 text-yellow-600" />
                          </button>
                        )}
                      </div>
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
                      value={editData.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"
                      placeholder="Student Name"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900">
                      {account.name}
                    </h3>
                  )}
                </div>
                <div className="flex gap-2 justify-center">
                  {(canEditAllFields || canEditAdvanceOnly) && (
                    <button onClick={() => handleEdit(account)}>
                      <PencilIcon className="w-5 h-5" />
                    </button>
                  )}

                  {isAdmin && (
                    <button onClick={() => handleOpenDocModal(account)}>
                      <FileWarning className="w-5 h-5 text-yellow-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">Email</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="email"
                      value={editData.userEmail || ""}
                      onChange={(e) =>
                        handleInputChange("userEmail", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.userEmail}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Degree</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="text"
                      value={editData.degree || ""}
                      onChange={(e) =>
                        handleInputChange("degree", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.degree}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Intake</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="text"
                      value={editData.intake || ""}
                      onChange={(e) =>
                        handleInputChange("intake", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium capitalize">
                      {account.intake}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">University</p>
                  {isEditing && canEditAllFields ? (
                    <input
                      type="text"
                      value={editData.university || ""}
                      onChange={(e) =>
                        handleInputChange("university", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.university}
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
                <div>
                  {account.missingDocuments?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {account.missingDocuments.map((doc, i) => (
                        <span
                          key={i}
                          className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">None</span>
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
                {isAdmin && account.accountHolder && (
                  <div className="text-right text-xs">
                    <p className="text-gray-500">
                      {account.accountHolder.email}
                    </p>
                    <p className="text-gray-500">
                      {account.accountHolder.userRole === "admin"
                        ? "Main branch"
                        : account.accountHolder.branchName}
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

      {docModalOpen && isAdmin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-100 space-y-4">
            <h2 className="text-lg font-semibold">Missing Documents</h2>

            <div className="flex gap-2">
              <input
                value={docInput}
                onChange={(e) => setDocInput(e.target.value)}
                className="flex-1 border px-2 py-1 rounded"
                placeholder="Enter document name"
              />
              <button
                onClick={handleAddDocument}
                className="bg-red-600 font-bold text-white px-3 rounded"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-100 px-2 py-1 rounded"
                >
                  <span>{doc}</span>
                  <button
                    onClick={() => handleRemoveDocument(i)}
                    className="hover:bg-red-800 rounded-md hover:text-white"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDocModalOpen(false)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDocuments}
                className="px-3 py-1 bg-green-800 font-bold text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAccountsTable;
