"use client";

import React from "react";
import {
  Building2,
  FileText,
  Handshake,
  Package,
  TrendingUp,
  Globe,
  CheckCircle2,
  Clock,
  XCircle,
  Activity,
  Briefcase,
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { BusinessAnalysisData } from "@/app/types/business";
import StatCard from "./StatCard";
import StatusBadge from "./StatusBadge";

interface BusinessAnalysisStepsProps {
  data: BusinessAnalysisData;
}

const COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"];

const BusinessAnalysisSteps: React.FC<BusinessAnalysisStepsProps> = ({
  data,
}) => {
  const {
    documentCount,
    recentApplications,
    recentDeals,
    topCountries,
    monthlyTrendApplications,
    monthlyTrendDeals,
    summary,
  } = data;

  // Application status data for pie chart
  const applicationStatusData = [
    { name: "Approved", value: documentCount.applications?.approved },
    { name: "Pending", value: documentCount.applications?.pending },
    { name: "Rejected", value: documentCount.applications?.rejected },
  ];

  // Deal status data
  const dealStatusData = [
    { name: "Approved", value: documentCount.deals.approved },
    { name: "Pending", value: documentCount.deals.pending },
  ];

  // Monthly trends combined
  const monthlyTrendData = monthlyTrendApplications.map((app) => {
    const deal = monthlyTrendDeals.find(
      (d) => d._id.year === app._id.year && d._id.month === app._id.month,
    );
    return {
      month: `${app._id.year}-${String(app._id.month).padStart(2, "0")}`,
      applications: app.count,
      deals: deal?.count || 0,
    };
  });

  // Top countries data
  const topCountriesData = topCountries.map((country, index) => ({
    name: country._id,
    value: country.count,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Business Analysis Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Total Business Activity:{" "}
                <span className="font-semibold text-red-600">
                  {summary.totalBusinessActivity}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid - Row 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
          <StatCard
            title="Total Companies"
            value={documentCount.totalCompanies}
            icon={Building2}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Applications"
            value={documentCount.totalBusinessApplications}
            icon={FileText}
            color="text-red-600"
            bgColor="bg-red-50"
          />
          <StatCard
            title="Business Deals"
            value={documentCount.totalBusinessDeals}
            icon={Handshake}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Packages"
            value={documentCount.totalBusinessPackages}
            icon={Package}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
        </div>

        {/* Stats Grid - Row 2 - Application Status */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="App. Approved"
            value={documentCount.applications.approved}
            icon={CheckCircle2}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="App. Pending"
            value={documentCount.applications.pending}
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="App. Rejected"
            value={documentCount.applications.rejected}
            icon={XCircle}
            color="text-red-600"
            bgColor="bg-red-50"
          />
        </div>

        {/* Stats Grid - Row 3 - Deal Status */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Deals Approved"
            value={documentCount.deals.approved}
            icon={CheckCircle2}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Deals Pending"
            value={documentCount.deals.pending}
            icon={Clock}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Monthly Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Monthly Trends
            </h3>
            <div className="h-48 sm:h-56 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendData}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
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
                    dataKey="applications"
                    stroke="#EF4444"
                    fillOpacity={1}
                    fill="url(#colorApps)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="deals"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorDeals)"
                    strokeWidth={2}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Application Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Application Status
            </h3>
            <div className="h-48 sm:h-56 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
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
        </div>

        {/* Deal Status & Top Countries */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Deal Status Chart */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Deal Status
            </h3>
            <div className="h-48 sm:h-56 lg:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealStatusData}>
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
                    {dealStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.name === "Approved" ? "#10B981" : "#F59E0B"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Countries */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Top Countries
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {topCountriesData.map((country, index) => (
                <div
                  key={country.name}
                  className="flex items-center justify-between p-2 sm:p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700">
                        {country.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-center shrink-0 ml-2">
                    <span className="text-sm sm:text-base font-bold text-red-600">
                      {country.value}
                    </span>
                    <p className="text-xs text-gray-500">applications</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications & Deals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
                Recent Applications
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentApplications.slice(0, 5).map((app) => (
                <div
                  key={app._id}
                  className="p-3 sm:p-4 hover:bg-red-50/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm truncate">
                        {app.firstName} {app.lastName}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {app.companyName}
                      </p>
                    </div>
                    <StatusBadge status={app.applicationStatus} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>
                      <span className="text-gray-400">Country:</span>{" "}
                      {app.country}
                    </div>
                    <div>
                      <span className="text-gray-400">Email:</span> {app.email}
                    </div>
                    <div>
                      <span className="text-gray-400">Phone:</span> {app.phone}
                    </div>
                    <div>
                      <span className="text-gray-400">Date:</span>{" "}
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Deals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
                Recent Deals
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentDeals.slice(0, 5).map((deal) => (
                <div
                  key={deal._id}
                  className="p-3 sm:p-4 hover:bg-green-50/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm truncate">
                        {deal.f_name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {deal.c_name}
                      </p>
                    </div>
                    <StatusBadge status={deal.applicationStatus} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600 line-clamp-2">
                      <span className="text-gray-400">Service:</span>{" "}
                      {deal.serviceTitle}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{deal.c_email}</span>
                      <span>
                        {new Date(deal.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalysisSteps;
