// components/AccountsTable.tsx
"use client";

import { CheckIcon, MarsStrokeIcon, PencilIcon } from "lucide-react";
import { useState } from "react";

interface Account {
  _id: string;
  name: string;
  degree: string;
  university: string;
  intake: string;
  totalAmount: number;
  advance: number;
  due: number;
  email: string;
  phone: string;
  branchName: string | null;
  userEmail: string;
  createdAt: string;
}

interface AccountsTableProps {
  data: Account[];
  isAdmin: boolean;
}

const AccountsTable = ({ data, isAdmin }: AccountsTableProps) => {
  const [accounts, setAccounts] = useState<Account[]>(data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Account>>({});
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

  // Handle edit click
  const handleEdit = (account: Account) => {
    setEditingId(account._id);
    setEditData({
      name: account.name,
      degree: account.degree,
      university: account.university,
      intake: account.intake,
      totalAmount: account.totalAmount,
      advance: account.advance,
      due: account.due,
      phone: account.phone,
      email: account.email,
      branchName: account.branchName || "",
    });
  };

  // Handle save
  const handleSave = async (id: string) => {
    setLoading(true);
    try {
      // API call to update account
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/accounts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
          credentials: "include",
        },
      );

      if (response.ok) {
        // Update local state
        setAccounts(
          accounts.map((acc) =>
            acc._id === id ? { ...acc, ...editData } : acc,
          ),
        );
        setEditingId(null);
        setEditData({});
      } else {
        console.error("Failed to update account");
      }
    } catch (error) {
      console.error("Error updating account:", error);
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
  const handleInputChange = (field: keyof Account, value: string | number) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
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

  console.log({ accounts: accounts, data: data, isAdmin });

  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg">No accounts found</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first application to get started
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Student Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Degree
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                University
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Intake
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Total Amount
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Advance
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Due
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Branch
              </th>
              {isAdmin && (
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
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
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      account.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.degree || ""}
                        onChange={(e) =>
                          handleInputChange("degree", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      account.degree
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.university || ""}
                        onChange={(e) =>
                          handleInputChange("university", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      account.university
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.intake || ""}
                        onChange={(e) =>
                          handleInputChange("intake", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      account.intake
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.totalAmount || 0}
                        onChange={(e) =>
                          handleInputChange(
                            "totalAmount",
                            Number(e.target.value),
                          )
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      formatCurrency(account.totalAmount)
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-green-600">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.advance || 0}
                        onChange={(e) =>
                          handleInputChange("advance", Number(e.target.value))
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      formatCurrency(account.advance)
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-red-600">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.due || 0}
                        onChange={(e) =>
                          handleInputChange("due", Number(e.target.value))
                        }
                        className="w-32 text-right px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      formatCurrency(account.due)
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-blue-600">
                    {/* {formatCurrency(profit)} */}

                    <p className="text-xs text-gray-500 mt-1">
                      {account.branchName ? account.branchName : "Main Branch"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isAdmin && (
                      <>
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
                              <MarsStrokeIcon className="w-5 h-5" />
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
                      </>
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
                className="px-6 py-4 text-right text-sm text-gray-900"
              >
                Total:
              </td>
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                {formatCurrency(totals.totalAmount)}
              </td>
              <td className="px-6 py-4 text-right text-sm text-green-700">
                {formatCurrency(totals.totalAdvance)}
              </td>
              <td className="px-6 py-4 text-right text-sm text-red-700">
                {formatCurrency(totals.totalDue)}
              </td>
              {/* <td className="px-6 py-4 text-right text-sm text-blue-700">
                {formatCurrency(totals.totalProfit)}
              </td> */}
              <td className="px-6 py-4"></td>
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
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"
                      placeholder="Name"
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
                  <p className="text-gray-500 text-xs">Degree</p>
                  {isEditing ? (
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
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.intake || ""}
                      onChange={(e) =>
                        handleInputChange("intake", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  ) : (
                    <p className="text-gray-700 font-medium">
                      {account.intake}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">University</p>
                  {isEditing ? (
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
                  {isEditing ? (
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

export default AccountsTable;
