"use client";

import React from "react";
import {
  Users,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  TrendingUp,
  Building2,
  UserCheck,
  UserCircle,
  Landmark,
  Calendar,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { UmrahHajjAnalysisData } from "@/app/types/umrahHajj";
import StatCard from "@/app/dashboard/business/admin/components/StatCard";
import { StatusBadge } from "@/app/dashboard/scholarship/user/components/status-badge";

interface UmrahHajjAnalysisStateProps {
  data: UmrahHajjAnalysisData;
}

const COLORS = [
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
];

const UmrahHajjAnalysisState: React.FC<UmrahHajjAnalysisStateProps> = ({
  data,
}) => {
  const {
    documentCount,
    genderStats,
    recentBookings,
    topPackages,
    monthlyTrend,
    summary,
  } = data;

  // Application status data for pie chart
  const applicationStatusData = [
    { name: "Approved", value: documentCount.applications.approved },
    { name: "Pending", value: documentCount.applications.pending },
    { name: "Rejected", value: documentCount.applications.rejected },
  ];

  // Payment status data
  const paymentStatusData = [
    { name: "Paid", value: documentCount.payment.paid },
    { name: "Partial", value: documentCount.payment.partial },
    { name: "Pending", value: documentCount.payment.pending },
  ];

  // Gender distribution data
  const genderData = genderStats.map((stat) => ({
    name: stat.gender.charAt(0).toUpperCase() + stat.gender.slice(1),
    value: stat.count,
  }));

  // Monthly trend data
  const monthlyTrendData = monthlyTrend.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    bookings: item.count,
  }));

  // Top packages data
  const topPackagesData = topPackages.map((pkg, index) => ({
    name: pkg._id.length > 25 ? pkg._id.substring(0, 25) + "..." : pkg._id,
    fullName: pkg._id,
    count: pkg.count,
    revenue: pkg.totalRevenue,
  }));

  // Format revenue
  const formatRevenue = (amount: number) => {
    if (amount >= 10000000) {
      return `৳${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `৳${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `৳${(amount / 1000).toFixed(1)}K`;
    }
    return `৳${amount}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-emerald-600 rounded-lg">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Umrah & Hajj Analysis Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Total Revenue:{" "}
                <span className="font-semibold text-emerald-600">
                  {formatRevenue(summary.totalRevenue)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid - Row 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
          <StatCard
            title="Total Bookings"
            value={documentCount.totalBookings}
            icon={Users}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Total Packages"
            value={documentCount.totalPackages}
            icon={Package}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Total Revenue"
            value={formatRevenue(summary.totalRevenue)}
            icon={DollarSign}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Monthly Bookings"
            value={monthlyTrendData[0]?.bookings || 0}
            icon={TrendingUp}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
        </div>

        {/* Stats Grid - Row 2 - Application Status */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Approved"
            value={documentCount.applications.approved}
            icon={CheckCircle2}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Pending"
            value={documentCount.applications.pending}
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Rejected"
            value={documentCount.applications.rejected}
            icon={XCircle}
            color="text-red-600"
            bgColor="bg-red-50"
          />
        </div>

        {/* Stats Grid - Row 3 - Payment Status */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Paid"
            value={documentCount.payment.paid}
            icon={CheckCircle2}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Partial"
            value={documentCount.payment.partial}
            icon={Clock}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Pending"
            value={documentCount.payment.pending}
            icon={XCircle}
            color="text-red-600"
            bgColor="bg-red-50"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Application Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Application Status Distribution
            </h3>
            <div className="h-48 sm:h-56 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      typeof percent === "number" && percent > 0
                        ? `${name} ${(percent * 100).toFixed(0)}%`
                        : ""
                    }
                    labelLine={false}
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Gender Distribution
            </h3>
            <div className="h-48 sm:h-56 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent! * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#EC4899" />
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Payment Status & Monthly Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Payment Status Chart */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Payment Status
            </h3>
            <div className="h-48 sm:h-56 lg:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis
                    dataKey="name"
                    stroke="#6B7280"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    {paymentStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#10B981", "#F59E0B", "#EF4444"][index]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Monthly Booking Trend
            </h3>
            <div className="h-48 sm:h-56 lg:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendData}>
                  <defs>
                    <linearGradient
                      id="colorBookings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="bookings"
                    stroke="#059669"
                    fillOpacity={1}
                    fill="url(#colorBookings)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Packages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            Top Packages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {topPackagesData.map((pkg, index) => (
              <div
                key={pkg.fullName}
                className="flex items-center justify-between p-3 sm:p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                      {pkg.name}
                    </p>
                    {pkg.fullName !== pkg.name && (
                      <p className="text-xs text-gray-500 truncate hidden sm:block">
                        {pkg.fullName}
                      </p>
                    )}
                    <p className="text-xs text-emerald-600 font-semibold mt-1">
                      Revenue: {formatRevenue(pkg.revenue)}
                    </p>
                  </div>
                </div>
                <div className="text-center shrink-0 ml-2">
                  <span className="text-lg sm:text-xl font-bold text-emerald-600">
                    {pkg.count}
                  </span>
                  <p className="text-xs text-gray-500">bookings</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
              Recent Bookings
            </h3>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-gray-100">
            {recentBookings.slice(0, 10).map((booking) => (
              <div
                key={booking._id}
                className="p-3 sm:p-4 hover:bg-emerald-50/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-800 text-xs sm:text-sm truncate">
                      {booking.applicantInfo.fullName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {booking.pkgInfo.pkgName}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0 ml-2">
                    <StatusBadge
                      status={booking.applicationStatus}
                      type="application"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <UserCircle className="w-3 h-3 text-gray-400" />
                    <span className="capitalize">
                      {booking.applicantInfo.gender}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="capitalize">
                      {booking.travelInfo.packageType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="truncate">
                      {booking.applicantInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span>{booking.applicantInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <StatusBadge
                    status={booking.payment.paymentStatus}
                    type="payment"
                  />
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(booking.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {booking.applicantInfo.fullName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {booking.applicantInfo.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.applicantInfo.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                      {booking.pkgInfo.pkgName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-sm text-gray-700">
                        {booking.travelInfo.packageType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-sm text-gray-700">
                        {booking.applicantInfo.gender}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={booking.payment.paymentStatus}
                        type="payment"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={booking.applicationStatus}
                        type="application"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(booking.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahHajjAnalysisState;
