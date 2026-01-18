"use client"

import React, { useState } from 'react';
import { Users, Mail, Phone, Shield, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
import { GoPackageDependencies } from "react-icons/go";
import Link from 'next/link';

interface Users {
    _id: string;
    userName: string;
    email: string;
    phone: string;
    userRole: "b2b" | "admin" | "user",
    isActive: boolean;
    b2bProfileId: string;
    createdBy: string;
    createdAt: string;
}

interface UsersProps {
    allUsers: Users[]
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function UsersTable({allUsers}:UsersProps) {
  const [users] = useState<Users[]>(allUsers);

  

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-400 mx-auto">
        {/* Header */}

        {/* Mobile View - Cards */}
        <div className="block lg:hidden space-y-4">
          {users.map((user, index) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-5 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-red-100">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-red-600" />
                  <h3 className="text-xl font-bold text-red-900">
                    {user.userName}
                  </h3>
                </div>
                {user.isActive ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-red-600 font-semibold">Email</p>
                    <p className="text-sm text-gray-800 break-all">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-red-600 font-semibold">Phone</p>
                    <p className="text-sm text-gray-800">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-red-600 font-semibold">Role</p>
                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                      {user.userRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 text-xs shrink-0">
                    ID:
                  </span>
                  <div>
                    <p className="text-xs text-red-600 font-semibold">
                      B2B Profile
                    </p>
                    <p className="text-sm text-gray-800 break-all">
                      {user.b2bProfileId}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 text-xs shrink-0">
                    By:
                  </span>
                  <div>
                    <p className="text-xs text-red-600 font-semibold">
                      Created By
                    </p>
                    <p className="text-sm text-gray-800 break-all">
                      {user.createdBy}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-red-600 font-semibold">
                      Created At
                    </p>
                    <p className="text-sm text-gray-800">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 flex gap-2">
                  <Link
                    href={`/dashboard/b2b/assign/s-package?user=${user.b2bProfileId}`}
                    className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-red-700 hover:text-white font-semibold hover:cursor-pointer"
                  >
                    <GoPackageDependencies className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs">ASP</span>
                  </Link>
                  <Link
                    href={`/dashboard/b2b/assign/t-package?user=${user.b2bProfileId}`}
                    className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-red-700 hover:text-white font-semibold hover:cursor-pointer"
                  >
                    <GoPackageDependencies className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs">ATP</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop/Tablet View - Table */}
        <div className="hidden lg:block overflow-x-auto rounded-xl shadow-2xl border-2 border-red-200 animate-fade-in">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-linear-to-r from-red-600 to-rose-600 text-white">
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  B2B Profile ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Atc
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-red-50 transition-all duration-300 animate-slide-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-red-900">
                        {user.userName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 group-hover:bg-red-200 transition-colors">
                      {user.userRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isActive ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-green-600 font-semibold text-sm">
                          Active
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <XCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-red-600 font-semibold text-sm">
                          Inactive
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-mono text-sm">
                      {user.b2bProfileId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{user.createdBy}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700 text-sm">
                        {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      href={`/dashboard/b2b/assign/s-package?user=${user.b2bProfileId}`}
                      className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-red-700 hover:text-white font-semibold hover:cursor-pointer"
                    >
                      <GoPackageDependencies className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs">ASP</span>
                    </Link>
                    <Link
                      href={`/dashboard/b2b/assign/t-package?user=${user.b2bProfileId}`}
                      className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-red-700 hover:text-white font-semibold hover:cursor-pointer"
                    >
                      <GoPackageDependencies className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs">ATP</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}