import {
  Calendar,
  CheckCircle,
  Mail,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import React from "react";
import { formatDate } from "../s-package/page";

export const UserTable = ({ aUser }: any) => {
  return (
    <div className="hidden lg:block overflow-x-auto rounded-xl shadow-2xl border-2 border-red-200 animate-fade-in">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-linear-to-r from-red-700 to-rose-700 text-white">
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
          </tr>
        </thead>
        <tbody className="divide-y divide-red-100">
          <tr
            key={aUser._id}
            className="hover:bg-red-50 transition-all duration-300 animate-slide-up group"
            style={{ animationDelay: `${1 * 100}ms` }}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-red-900">
                  {aUser.userName}
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700">{aUser.email}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700">{aUser.phone}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 group-hover:bg-red-200 transition-colors">
                {aUser.userRole}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {aUser.isActive ? (
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
                {aUser.b2bProfileId}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="text-gray-700">{aUser.createdBy}</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 text-sm">
                  {formatDate(aUser.createdAt)}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
