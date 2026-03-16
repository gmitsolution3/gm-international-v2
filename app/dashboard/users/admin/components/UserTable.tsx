// components/UserTable.tsx
"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Filter,
  MoreVertical,
  Shield,
  UserCog,
  Calendar,
  Mail,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

// Types
interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  updateAt?: string;
  updatedAt?: string;
  userRole:
    | "admin"
    | "user"
    | "account"
    | "hr"
    | "customer_rls"
    | "project_manager"
    | "graphic_designer"
    | "developer"
    | "office_admin";
  avatar?: string;
}

interface UserTableProps {
  initialUsers: User[];
}

// Role options for dropdown
const roleOptions = [
  { value: "account", label: "Account", color: "bg-red-100 text-red-800" },
  { value: "hr", label: "HR", color: "bg-green-100 text-green-800" },
  {
    value: "customer_rls",
    label: "Customer Relations",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "project_manager",
    label: "Project Manager",
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: "graphic_designer",
    label: "Graphic Designer",
    color: "bg-pink-100 text-pink-800",
  },
  {
    value: "developer",
    label: "Developer",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "office_admin",
    label: "Office Admin",
    color: "bg-yellow-100 text-yellow-800",
  },
  { value: "user", label: "User", color: "bg-gray-100 text-gray-800" },
  { value: "admin", label: "Admin", color: "bg-red-100 text-red-800" },
];

const UserTable: React.FC<UserTableProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState<string | null>(null);

  // Sort users to show admin at the top
  const sortedUsers = [...users].sort((a, b) => {
    if (a.userRole === "admin") return -1;
    if (b.userRole === "admin") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Filter users based on search
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  );

  // Handle role change
  const handleRoleChange = (userId: string, newRole: string) => {
    setLoading(userId);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the change",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/users/updated-role/${userId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userRole: newRole }),
            },
          );

          const result = await response.json();

          if (!result.success) {
            toast.error(result.message || "User Role not updated!!");
            return;
          }

          // Update local state
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId
                ? { ...user, userRole: newRole as User["userRole"] }
                : user,
            ),
          );


          Swal.fire({
            title: "Updated!",
            text: `${result.message} and ${userId} is now ${newRole}`,
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role. Please try again.");
    } finally {
      setLoading(null);
      setShowMobileMenu(null);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    const option = roleOptions.find((opt) => opt.value === role);
    return option?.color || "bg-gray-100 text-gray-800";
  };

  // Get role label
  const getRoleLabel = (role: string) => {
    const option = roleOptions.find((opt) => opt.value === role);
    return option?.label || role;
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage users and their roles within the organization
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <button className="px-4 py-2 sm:px-6 sm:py-2.5 bg-white border border-gray-300 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      user.userRole === "admin" ? "bg-red-50/30" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserCog className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {user.username}
                            {user.userRole === "admin" && (
                              <Shield className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 shrink-0" />
                          <span className="truncate max-w-50">
                            {user.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 shrink-0" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(user.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.userRole === "admin" ? (
                        <span
                          className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.userRole)}`}
                        >
                          <Shield className="w-3 h-3" />
                          Admin
                        </span>
                      ) : (
                        <select
                          value={user.userRole}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          disabled={loading === user._id}
                          className={`px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-35 ${getRoleBadgeColor(user.userRole)}`}
                        >
                          {roleOptions
                            .filter((opt) => opt.value !== "admin")
                            .map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {loading === user._id && (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="md:hidden space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 ${
                user.userRole === "admin" ? "border-l-4 border-l-red-500" : ""
              }`}
            >
              {/* User Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCog className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      {user.username}
                      {user.userRole === "admin" && (
                        <Shield className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {user._id.slice(-6)}
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                {user.userRole !== "admin" && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowMobileMenu(
                          showMobileMenu === user._id ? null : user._id,
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>

                    {showMobileMenu === user._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="p-2">
                          <p className="text-xs font-medium text-gray-500 px-3 py-2">
                            Change Role
                          </p>
                          {roleOptions
                            .filter((opt) => opt.value !== "admin")
                            .map((option) => (
                              <button
                                key={option.value}
                                onClick={() =>
                                  handleRoleChange(user._id, option.value)
                                }
                                disabled={loading === user._id}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md flex items-center justify-between"
                              >
                                <span>{option.label}</span>
                                {user.userRole === option.value && (
                                  <span className="text-red-600">✓</span>
                                )}
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>

              {/* Role Badge */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-500">
                  Current Role
                </span>
                {user.userRole === "admin" ? (
                  <span
                    className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.userRole)}`}
                  >
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                ) : (
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.userRole)}`}
                  >
                    {getRoleLabel(user.userRole)}
                  </span>
                )}
              </div>

              {/* Loading State */}
              {loading === user._id && (
                <div className="mt-2 flex justify-center">
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <UserCog className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No users found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}

        {/* Pagination Info */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>
    </div>
  );
};

export default UserTable;
