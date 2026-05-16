"use client";

import React from "react";
import {
  Users,
  Globe,
  Map,
  Package,
  TrendingUp,
  DollarSign,
  Plane,
  Building2,
  CheckCircle2,
  Clock,
  Briefcase,
} from "lucide-react";

import RecentBookingsCard from "./RecentBookingsCard";
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { TouristAnalysisData } from "@/app/types/tourist";
import StatCard from "@/app/dashboard/scholarship/admin/Components/StatCard";

interface TouristAnalysisStateProps {
  data: TouristAnalysisData;
}

const COLORS = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

const TouristAnalysisState: React.FC<TouristAnalysisStateProps> = ({
  data,
}) => {
  const {
    documentCount,
    internationalVsDomestic,
    recentBookings,
    topPackages,
    monthlyTrend,
  } = data;

  // Prepare chart data
  const bookingTypeData = [
    { name: "International", value: internationalVsDomestic.international },
    { name: "Domestic", value: internationalVsDomestic.domestic },
  ];

  const revenueData = [
    {
      name: "International",
      revenue: internationalVsDomestic.internationalRevenue,
    },
    { name: "Domestic", revenue: internationalVsDomestic.domesticRevenue },
  ];

  const monthlyTrendData = monthlyTrend.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    bookings: item.count,
  }));

  const topPackagesData = topPackages.map((pkg, index) => ({
    name: pkg._id.length > 25 ? pkg._id.substring(0, 25) + "..." : pkg._id,
    fullName: pkg._id,
    bookings: pkg.count,
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg">
              <Plane className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              Tourism Booking Analysis
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 ml-10 sm:ml-12">
            Comprehensive overview of all tour bookings and statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Bookings"
            value={documentCount.totalBookings}
            icon={Users}
            color="text-red-600"
            bgColor="bg-red-50"
          />
          <StatCard
            title="International"
            value={documentCount.totalInternationalBookings}
            icon={Globe}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Domestic"
            value={documentCount.totalDomesticBookings}
            icon={Map}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Tour Packages"
            value={documentCount.totalTourPackages}
            icon={Package}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <StatCard
            title="Custom Packages"
            value={documentCount.totalCustomPackage}
            icon={Briefcase}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Approved"
            value={documentCount.totalApproved}
            icon={CheckCircle2}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Pending"
            value={documentCount.totalPending}
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Intl. Revenue"
            value={`৳${internationalVsDomestic.internationalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="text-indigo-600"
            bgColor="bg-indigo-50"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Monthly Booking Trend
            </h3>
            
            <div className="h-48 sm:h-56 lg:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyTrendData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: -10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />

                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
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

                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#EF4444"
                    strokeWidth={4}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Booking Type Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              International vs Domestic
            </h3>
            <div className="h-48 sm:h-56 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingTypeData}
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
                    {bookingTypeData.map((entry, index) => (
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
        </div>

        {/* Revenue and Top Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Revenue by Type
            </h3>
            <div className="h-48 sm:h-56 lg:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis
                    type="number"
                    stroke="#6B7280"
                    fontSize={10}
                    tickLine={false}
                    tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#6B7280"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value) => {
                      const revenueValue =
                        typeof value === "number" ? value : Number(value ?? 0);
                      return [`৳${revenueValue.toLocaleString()}`, "Revenue"];
                    }}
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#EF4444"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={40}
                    label={{
                      position: "right",
                      fontSize: 10,
                      formatter: (value) => {
                        const revenueValue =
                          typeof value === "number"
                            ? value
                            : Number(value ?? 0);
                        return `৳${(revenueValue / 1000).toFixed(0)}K`;
                      },
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Packages */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Top Tour Packages
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {topPackagesData.map((pkg, index) => (
                <div
                  key={pkg.fullName}
                  className="flex items-center justify-between p-2 sm:p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {index + 1}
                      </span>
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
                    </div>
                  </div>
                  <div className="text-center shrink-0 ml-2">
                    <span className="text-sm sm:text-base font-bold text-red-600">
                      {pkg.bookings}
                    </span>
                    <p className="text-xs text-gray-500">
                      booking{pkg.bookings !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <RecentBookingsCard bookings={recentBookings} />
      </div>
    </div>
  );
};

export default TouristAnalysisState;
