// components/AnalysisDashboard.tsx
"use client";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  FileText,
  Users,
  Building2,
  Globe,
  PieChart,
  Calendar,
  DollarSign,
  CreditCard,
  Wallet,
  Target,
  FileWarning,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  BriefcaseMedical,
  Handshake,
  MapPinned,
  FileUser,
  ShieldPlus,
} from "lucide-react";
import { SiVirustotal } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { TbCoinTakaFilled } from "react-icons/tb";

interface AnalysisData {
  overview: {
    totalAmount: number;
    totalAdvance: number;
    totalDue: number;
  };
  serviceWise: {
    student: { total: number; advance: number; due: number };
    medical: { total: number; advance: number; due: number };
    tourist: { total: number; advance: number; due: number };
    business: { total: number; advance: number; due: number };
    visa: { total: number; advance: number; due: number };
  };
  monthlyTrend: Array<{
    month: string;
    total: number;
    advance: number;
    due: number;
  }>;
  accountHolderStats: Array<{
    email: string;
    total: number;
    advance: number;
    due: number;
  }>;
  branchStats: Array<{
    branch: string;
    total: number;
    advance: number;
    due: number;
  }>;
  dueAnalysis: {
    totalDue: number;
    dueRatio: number;
  };
  missingDocsAnalysis: {
    totalMissingAccounts: number;
    documents: Array<{
      name: string;
      count: number;
    }>;
  };
  documentCount: {
    totalCounts: {
      totalRecords: number;
      student: number;
      medical: number;
      tourist: number;
      business: number;
      visa: number;
    };
    branchCounts: Array<{
      branch: string;
      count: number;
    }>;
    accountHolderCounts: Array<{
      email: string;
      branch: string;
      count: number;
    }>;
  };
}

interface AnalysisDashboardProps {
  data: AnalysisData;
}

const AnalysisDashboard = ({ data }: AnalysisDashboardProps) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Get service color
  const getServiceColor = (service: string) => {
    const colors: Record<string, string> = {
      student: "bg-red-500",
      medical: "bg-green-500",
      tourist: "bg-purple-500",
      business: "bg-orange-500",
      visa: "bg-pink-500",
    };
    return colors[service] || "bg-gray-500";
  };

  // Calculate profit (if cost data available in future)
  const calculateProfit = (total: number, advance: number) => {
    // This is a placeholder - you can add cost logic here
    return total - advance;
  };

  const totalProfit = calculateProfit(
    data.overview.totalAmount,
    data.overview.totalAdvance,
  );
  const dueRiskLevel =
    data.dueAnalysis.dueRatio > 30
      ? "High"
      : data.dueAnalysis.dueRatio > 15
        ? "Medium"
        : "Low";
  const dueRiskColor =
    data.dueAnalysis.dueRatio > 30
      ? "text-red-600"
      : data.dueAnalysis.dueRatio > 15
        ? "text-yellow-600"
        : "text-green-600";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Analysis Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive analytics and insights
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Export Report
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* 1. OVERVIEW - Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(data.overview.totalAmount)}
                </p>
              </div>
              <div className="bg-red-100 rounded-lg p-3">
                <TbCoinTakaFilled className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">+12.5%</span>
              <span className="text-xs text-gray-500">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Advance Collected
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {formatCurrency(data.overview.totalAdvance)}
                </p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(data.overview.totalAdvance / data.overview.totalAmount) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Collection Rate:{" "}
                {(
                  (data.overview.totalAdvance / data.overview.totalAmount) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Due</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {formatCurrency(data.overview.totalDue)}
                </p>
              </div>
              <div className="bg-red-100 rounded-lg p-3">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-xs text-red-600 font-medium">
                Due Ratio: {formatPercentage(data.dueAnalysis.dueRatio)}
              </span>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Profit
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {formatCurrency(totalProfit)}
                </p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Margin:{" "}
                {((totalProfit / data.overview.totalAmount) * 100).toFixed(1)}%
              </p>
            </div>
          </div> */}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-green-800 my-4">
            Total Document
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Total Document
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {data.documentCount.totalCounts.totalRecords}
                  </p>
                </div>
                <div className="bg-red-100 rounded-lg p-3">
                  <SiVirustotal className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Student</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {data.documentCount.totalCounts.student}
                  </p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <PiStudentFill className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Medical</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    {data.documentCount.totalCounts.medical}
                  </p>
                </div>
                <div className="bg-red-100 rounded-lg p-3">
                  <BriefcaseMedical className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Business</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {data.documentCount.totalCounts.business}
                  </p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <Handshake className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Tourist</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {data.documentCount.totalCounts.tourist}
                  </p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <MapPinned className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Visa</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {data.documentCount.totalCounts.visa}
                  </p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <FileUser className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-red-700 my-4">Total Branch</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.documentCount.branchCounts.map((b, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Branch: {b.branch}
                    </p>
                    <p>
                      Total submission:{" "}
                      <span className="text-2xl font-bold text-gray-900 mt-1">
                        {b.count}
                      </span>
                    </p>
                  </div>
                  <div className="bg-red-100 rounded-lg p-3">
                    <ShieldPlus className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. SERVICE-WISE BREAKDOWN & 9. CATEGORY-WISE TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Service Distribution
                </h2>
              </div>
            </div>
            <div className="space-y-4">
              {Object.entries(data.serviceWise).map(([service, stats]) => {
                const percentage =
                  (stats.total / data.overview.totalAmount) * 100;
                return (
                  <div key={service}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {service}
                      </span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(stats.total)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${getServiceColor(service)} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Summary Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Category Summary
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      Advance
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      Due
                    </th>
                    {/* <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      Profit
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(data.serviceWise).map(([service, stats]) => (
                    <tr key={service} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 capitalize">
                        {service}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(stats.total)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-600">
                        {formatCurrency(stats.advance)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-red-600">
                        {formatCurrency(stats.due)}
                      </td>
                      {/* <td className="px-4 py-3 text-sm text-right text-red-600">
                        {formatCurrency(
                          calculateProfit(stats.total, stats.advance),
                        )}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      Total
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-right text-gray-900">
                      {formatCurrency(data.overview.totalAmount)}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-right text-green-700">
                      {formatCurrency(data.overview.totalAdvance)}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-right text-red-700">
                      {formatCurrency(data.overview.totalDue)}
                    </td>
                    {/* <td className="px-4 py-3 text-sm font-semibold text-right text-red-700">
                      {formatCurrency(totalProfit)}
                    </td> */}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* 3. TIME-BASED ANALYSIS - Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Monthly Revenue Trend
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 flex items-center">
                <ArrowUp className="w-3 h-3" /> +15.2%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="flex items-end gap-4 h-64">
                {data.monthlyTrend.map((month, idx) => {
                  const maxTotal = Math.max(
                    ...data.monthlyTrend.map((m) => m.total),
                  );
                  const height = (month.total / maxTotal) * 100;
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="relative w-full group">
                        <div
                          className="bg-linear-to-t from-red-500 to-red-600 rounded-lg transition-all hover:from-red-600 hover:to-red-700"
                          style={{ height: `${height}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Total: {formatCurrency(month.total)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-600">
                          {month.month}
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {formatCurrency(month.total)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. ACCOUNT HOLDER PERFORMANCE & 5. BRANCH-WISE ANALYSIS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Holder Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Account Holder Performance
              </h2>
            </div>
            <div className="space-y-4">
              {data.accountHolderStats.map((holder, idx) => {
                const percentage =
                  (holder.total / data.overview.totalAmount) * 100;
                return (
                  <div
                    key={idx}
                    className="border-b border-gray-100 pb-3 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {holder.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Total Handled: {formatCurrency(holder.total)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600">
                          Collected: {formatCurrency(holder.advance)}
                        </p>
                        <p className="text-sm text-red-600">
                          Due: {formatCurrency(holder.due)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Branch-wise Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Branch Performance
              </h2>
            </div>
            <div className="space-y-4">
              {data.branchStats.map((branch, idx) => {
                const percentage =
                  (branch.total / data.overview.totalAmount) * 100;
                const collectionRate = (branch.advance / branch.total) * 100;
                return (
                  <div
                    key={idx}
                    className="border-b border-gray-100 pb-3 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {branch.branch} Branch
                        </p>
                        <p className="text-xs text-gray-500">
                          Revenue Share: {percentage.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">
                          {formatCurrency(branch.total)}
                        </p>
                        <p className="text-xs text-green-600">
                          Collection: {collectionRate.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${collectionRate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 6. DUE / RISK ANALYSIS & 7. MISSING DOCUMENT ANALYSIS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Due/Risk Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Due & Risk Analysis
              </h2>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-red-600">
                  {formatCurrency(data.dueAnalysis.totalDue)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Total Outstanding Due
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">Due Ratio</span>
                  <span className={`text-sm font-semibold ${dueRiskColor}`}>
                    {formatPercentage(data.dueAnalysis.dueRatio)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      data.dueAnalysis.dueRatio > 30
                        ? "bg-red-600"
                        : data.dueAnalysis.dueRatio > 15
                          ? "bg-yellow-600"
                          : "bg-green-600"
                    }`}
                    style={{
                      width: `${Math.min(data.dueAnalysis.dueRatio, 100)}%`,
                    }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span>Low Risk (&lt;15%)</span>
                  <span>Medium Risk (15-30%)</span>
                  <span>High Risk (&gt;30%)</span>
                </div>
              </div>
              <div className="bg-${dueRiskColor === 'text-red-600' ? 'red' : dueRiskColor === 'text-yellow-600' ? 'yellow' : 'green'}-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-800">
                  Risk Level:{" "}
                  <span className={dueRiskColor}>{dueRiskLevel}</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {dueRiskLevel === "High"
                    ? "⚠️ Immediate attention needed on collections"
                    : dueRiskLevel === "Medium"
                      ? "📊 Monitor due accounts regularly"
                      : "✅ Healthy collection ratio, keep it up!"}
                </p>
              </div>
            </div>
          </div>

          {/* Missing Document Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileWarning className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Missing Documents
              </h2>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">
                  {data.missingDocsAnalysis.totalMissingAccounts}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Accounts with Missing Documents
                </p>
              </div>
              <div className="space-y-2">
                {data.missingDocsAnalysis.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{doc.name}</span>
                    <span className="text-sm font-semibold text-red-600">
                      {doc.count} missing
                    </span>
                  </div>
                ))}
              </div>
              {data.missingDocsAnalysis.totalMissingAccounts > 0 && (
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  View Incomplete Accounts
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 8. COUNTRY / DESTINATION ANALYSIS - Placeholder for future enhancement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">
              Destination Analysis
            </h2>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500">
              Coming soon! Detailed country-wise analysis will be available
              here.
            </p>
          </div>
        </div>

        {/* 10. LOW PERFORMANCE ALERTS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">
              Smart Insights & Alerts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.dueAnalysis.dueRatio > 20 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-red-700">
                    High Due Alert
                  </span>
                </div>
                <p className="text-xs text-red-600">
                  Due ratio is {formatPercentage(data.dueAnalysis.dueRatio)}.
                  Consider collection drive.
                </p>
              </div>
            )}
            {data.missingDocsAnalysis.totalMissingAccounts > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-yellow-700" />
                  <span className="text-sm font-semibold text-yellow-700">
                    Missing Documents
                  </span>
                </div>
                <p className="text-xs text-yellow-700">
                  {data.missingDocsAnalysis.totalMissingAccounts} accounts need
                  document verification.
                </p>
              </div>
            )}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-red-700" />
                <span className="text-sm font-semibold text-red-700">
                  Top Performer
                </span>
              </div>
              <p className="text-xs text-red-700">
                {data.accountHolderStats[0]?.email} leads with{" "}
                {formatCurrency(data.accountHolderStats[0]?.total)} revenue
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
