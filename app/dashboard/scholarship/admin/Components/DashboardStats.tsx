// // import React from "react";
// // import {
// //   Users,
// //   Award,
// //   Clock,
// //   XCircle,
// //   TrendingUp,
// //   Building2,
// //   Calendar,
// // } from "lucide-react";

// // interface DashboardData {
// //   documentCount: {
// //     totalApplications: number;
// //     totalApproved: number;
// //     totalPending: number;
// //     totalRejected: number;
// //     totalScholarshipPackages: number;
// //     totalUniversities: number;
// //   };
// //   paymentStats: {
// //     pending: number;
// //     paid: number;
// //     failed: number;
// //   };
// //   recentApplications: any[];
// //   topUniversities: { _id: string; count: number }[];
// //   monthlyTrend: { _id: { year: number; month: number }; count: number }[];
// // }

// // const StudentDashboardStats = ({ data }: { data: DashboardData }) => {
// //   const stats = data.documentCount;
// //   const payment = data.paymentStats;

// //   // Format month name
// //   const getMonthName = (month: number) => {
// //     const date = new Date(2026, month - 1, 1);
// //     return date.toLocaleString("default", { month: "short" });
// //   };

// //   return (
// //     <div className="min-h-screen bg-red-950 text-white p-4 md:p-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
// //           <div>
// //             <h1 className="text-3xl md:text-4xl font-bold text-red-500">
// //               Scholarship Analysis
// //             </h1>
// //             <p className="text-red-400 mt-1">
// //               Overview of all scholarship applications
// //             </p>
// //           </div>
// //           <div className="text-sm text-red-500 mt-2 md:mt-0">
// //             Last Updated: {new Date().toLocaleDateString()}
// //           </div>
// //         </div>

// //         {/* KPI Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
// //           <div className="bg-linear-to-br from-red-600 to-red-700 p-6 rounded-2xl shadow-xl">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-red-200 text-sm">Total Applications</p>
// //                 <p className="text-4xl font-bold mt-2">
// //                   {stats.totalApplications}
// //                 </p>
// //               </div>
// //               <Users className="w-12 h-12 text-red-200 opacity-80" />
// //             </div>
// //           </div>

// //           <div className="bg-linear-to-br from-green-600 to-emerald-700 p-6 rounded-2xl shadow-xl">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-green-200 text-sm">Approved</p>
// //                 <p className="text-4xl font-bold mt-2">{stats.totalApproved}</p>
// //               </div>
// //               <Award className="w-12 h-12 text-green-200 opacity-80" />
// //             </div>
// //           </div>

// //           <div className="bg-linear-to-br from-yellow-600 to-amber-700 p-6 rounded-2xl shadow-xl">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-yellow-200 text-sm">Pending</p>
// //                 <p className="text-4xl font-bold mt-2">{stats.totalPending}</p>
// //               </div>
// //               <Clock className="w-12 h-12 text-yellow-200 opacity-80" />
// //             </div>
// //           </div>

// //           <div className="bg-linear-to-br from-red-700 to-rose-800 p-6 rounded-2xl shadow-xl">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-red-200 text-sm">Rejected</p>
// //                 <p className="text-4xl font-bold mt-2">{stats.totalRejected}</p>
// //               </div>
// //               <XCircle className="w-12 h-12 text-red-200 opacity-80" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Second Row Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <div className="bg-red-900 border border-red-800 p-6 rounded-2xl">
// //             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
// //               <TrendingUp className="text-red-500" /> Payment Status
// //             </h3>
// //             <div className="space-y-4">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-red-400">Pending Payment</span>
// //                 <span className="font-bold text-yellow-400">
// //                   {payment.pending}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span className="text-red-400">Paid</span>
// //                 <span className="font-bold text-green-400">{payment.paid}</span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span className="text-red-400">Failed</span>
// //                 <span className="font-bold text-red-400">{payment.failed}</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-red-900 border border-red-800 p-6 rounded-2xl">
// //             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
// //               <Building2 className="text-red-500" /> Universities
// //             </h3>
// //             <div className="text-5xl font-bold text-red-500">
// //               {stats.totalUniversities}
// //             </div>
// //             <p className="text-red-400">Active Universities</p>
// //           </div>

// //           <div className="bg-red-900 border border-red-800 p-6 rounded-2xl">
// //             <h3 className="text-lg font-semibold mb-4">Scholarship Packages</h3>
// //             <div className="text-5xl font-bold text-red-500">
// //               {stats.totalScholarshipPackages}
// //             </div>
// //             <p className="text-red-400">Available Packages</p>
// //           </div>
// //         </div>

// //         {/* Monthly Trend */}
// //         <div className="bg-red-900 border border-red-800 p-6 rounded-2xl mb-8">
// //           <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
// //             <Calendar className="text-red-500" /> Monthly Application Trend
// //           </h3>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// //             {data.monthlyTrend.map((item, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-red-800 p-5 rounded-xl text-center hover:bg-red-700 transition"
// //               >
// //                 <p className="text-red-400 text-sm">
// //                   {getMonthName(item._id.month)} {item._id.year}
// //                 </p>
// //                 <p className="text-4xl font-bold mt-2 text-white">
// //                   {item.count}
// //                 </p>
// //                 <p className="text-xs text-red-500 mt-1">Applications</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Top Universities & Recent Applications */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {/* Top Universities */}
// //           <div className="bg-red-900 border border-red-800 p-6 rounded-2xl">
// //             <h3 className="text-xl font-semibold mb-5">Top Universities</h3>
// //             <div className="space-y-4">
// //               {data.topUniversities.map((uni, i) => (
// //                 <div
// //                   key={i}
// //                   className="flex items-center justify-between bg-red-800 p-4 rounded-xl"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold">
// //                       {i + 1}
// //                     </div>
// //                     <div>
// //                       <p className="font-medium">{uni._id}</p>
// //                     </div>
// //                   </div>
// //                   <div className="text-xl font-bold text-red-500">
// //                     {uni.count}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Recent Applications */}
// //           <div className="bg-red-900 border border-red-800 p-6 rounded-2xl">
// //             <h3 className="text-xl font-semibold mb-5">Recent Applications</h3>
// //             <div className="space-y-3 max-h-105 overflow-y-auto pr-2 custom-scrollbar">
// //               {data.recentApplications.map((app, i) => (
// //                 <div
// //                   key={i}
// //                   className="bg-red-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-red-700 transition"
// //                 >
// //                   <div>
// //                     <p className="font-semibold">
// //                       {app.firstName} {app.lastName}
// //                     </p>
// //                     <p className="text-sm text-red-400">{app.email}</p>
// //                     <p className="text-sm text-red-500 mt-1">
// //                       {app.university}
// //                     </p>
// //                   </div>
// //                   <div className="flex flex-col items-end gap-2">
// //                     <span
// //                       className={`px-3 py-1 text-xs font-medium rounded-full ${
// //                         app.applicationStatus === "Approved"
// //                           ? "bg-green-500/20 text-green-400"
// //                           : "bg-yellow-500/20 text-yellow-400"
// //                       }`}
// //                     >
// //                       {app.applicationStatus}
// //                     </span>
// //                     <span className="text-xs text-red-500">
// //                       {new Date(app.submittedAt).toLocaleDateString()}
// //                     </span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentDashboardStats;

// "use client";

// import React, { useState } from "react";
// import {
//   Users,
//   Award,
//   Clock,
//   XCircle,
//   TrendingUp,
//   Building2,
//   Calendar,
//   DollarSign,
//   PieChart,
//   BarChart3,
//   Activity,
//   ChevronDown,
//   ChevronUp,
//   Search,
//   Filter,
//   Download,
//   RefreshCcw,
//   AlertCircle,
//   CheckCircle2,
//   Clock4,
//   ArrowUpRight,
//   ArrowDownRight,
//   GraduationCap,
//   FileText,
//   CreditCard,
//   UserCheck,
//   UserX,
//   TrendingDown,
// } from "lucide-react";

// interface DashboardData {
//   documentCount: {
//     totalApplications: number;
//     totalApproved: number;
//     totalPending: number;
//     totalRejected: number;
//     totalScholarshipPackages: number;
//     totalUniversities: number;
//   };
//   paymentStats: {
//     pending: number;
//     paid: number;
//     failed: number;
//   };
//   recentApplications: any[];
//   topUniversities: { _id: string; count: number }[];
//   monthlyTrend: { _id: { year: number; month: number }; count: number }[];
// }

// const StudentDashboardStats = ({ data }: { data: DashboardData }) => {
//   const [selectedPeriod, setSelectedPeriod] = useState("2026");
//   const [showAllMonths, setShowAllMonths] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const stats = data.documentCount;
//   const payment = data.paymentStats;

//   // Calculate approval rate
//   const approvalRate =
//     stats.totalApplications > 0
//       ? ((stats.totalApproved / stats.totalApplications) * 100).toFixed(1)
//       : "0.0";

//   // Calculate payment completion rate
//   const totalPayments = payment.pending + payment.paid + payment.failed;
//   const paymentCompletionRate =
//     totalPayments > 0
//       ? ((payment.paid / totalPayments) * 100).toFixed(1)
//       : "0.0";

//   // Format month name
//   const getMonthName = (month: number) => {
//     const date = new Date(2026, month - 1, 1);
//     return date.toLocaleString("default", { month: "short" });
//   };

//   // Get max count for chart scaling
//   const maxCount = Math.max(...data.monthlyTrend.map((item) => item.count), 1);

//   // Filter applications based on search and status
//   const filteredApplications = data.recentApplications.filter((app) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.applicantId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "All" || app.applicationStatus === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // Status color mapping
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Approved":
//         return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
//       case "Pending":
//         return "bg-amber-500/20 text-amber-400 border-amber-500/30";
//       case "Rejected":
//         return "bg-red-500/20 text-red-400 border-red-500/30";
//       default:
//         return "bg-red-500/20 text-red-400 border-red-500/30";
//     }
//   };

//   const getPaymentStatusColor = (status: string) => {
//     switch (status) {
//       case "Paid":
//         return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
//       case "Pending":
//         return "bg-amber-500/20 text-amber-400 border-amber-500/30";
//       case "Failed":
//         return "bg-red-500/20 text-red-400 border-red-500/30";
//       default:
//         return "bg-red-500/20 text-red-400 border-red-500/30";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-red-950 via-red-900 to-red-950 text-white p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <div className="p-2 bg-red-500/10 rounded-xl">
//                 <GraduationCap className="w-8 h-8 text-red-500" />
//               </div>
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
//                   Scholarship Analytics
//                 </h1>
//                 <p className="text-red-400 mt-1">
//                   Comprehensive overview of all scholarship applications and
//                   metrics
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 mt-4 md:mt-0">
//             <button className="flex items-center gap-2 px-4 py-2 bg-red-800 rounded-lg hover:bg-red-700 transition text-sm">
//               <Calendar className="w-4 h-4" />
//               {selectedPeriod}
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm">
//               <Download className="w-4 h-4" />
//               Export Report
//             </button>
//             <button className="p-2 bg-red-800 rounded-lg hover:bg-red-700 transition">
//               <RefreshCcw className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* KPI Cards - Enhanced with trends */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
//           <div className="group relative bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:border-red-500/30 transition-all duration-300">
//             <div className="absolute inset-0 bg-linear-to-br from-red-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-red-500/10 rounded-xl">
//                   <Users className="w-6 h-6 text-red-500" />
//                 </div>
//                 <div className="flex items-center gap-1 text-emerald-400 text-sm">
//                   <ArrowUpRight className="w-4 h-4" />
//                   <span>12%</span>
//                 </div>
//               </div>
//               <p className="text-red-400 text-sm mb-1">Total Applications</p>
//               <p className="text-4xl font-bold">{stats.totalApplications}</p>
//               <div className="mt-4 w-full bg-red-700/50 rounded-full h-1">
//                 <div
//                   className="bg-linear-to-r from-red-500 to-red-400 h-1 rounded-full"
//                   style={{ width: "75%" }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div className="group relative bg-linear-to-br from-emerald-900 to-emerald-800 border border-emerald-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300">
//             <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-emerald-500/10 rounded-xl">
//                   <Award className="w-6 h-6 text-emerald-500" />
//                 </div>
//                 <div className="flex items-center gap-1 text-emerald-400 text-sm">
//                   <span>{approvalRate}%</span>
//                 </div>
//               </div>
//               <p className="text-red-400 text-sm mb-1">Approved</p>
//               <p className="text-4xl font-bold">{stats.totalApproved}</p>
//               <div className="mt-4 w-full bg-red-700/50 rounded-full h-1">
//                 <div
//                   className="bg-linear-to-r from-emerald-500 to-emerald-400 h-1 rounded-full"
//                   style={{ width: `${approvalRate}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div className="group relative bg-linear-to-br from-amber-900 to-amber-800 border border-amber-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300">
//             <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-amber-500/10 rounded-xl">
//                   <Clock className="w-6 h-6 text-amber-500" />
//                 </div>
//                 <div className="flex items-center gap-1 text-amber-400 text-sm">
//                   <AlertCircle className="w-4 h-4" />
//                   <span>Pending</span>
//                 </div>
//               </div>
//               <p className="text-red-400 text-sm mb-1">Pending Review</p>
//               <p className="text-4xl font-bold">{stats.totalPending}</p>
//               <div className="mt-4 w-full bg-red-700/50 rounded-full h-1">
//                 <div
//                   className="bg-linear-to-r from-amber-500 to-amber-400 h-1 rounded-full"
//                   style={{
//                     width: `${(stats.totalPending / stats.totalApplications) * 100}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div className="group relative bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:border-red-500/30 transition-all duration-300">
//             <div className="absolute inset-0 bg-linear-to-br from-red-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-red-500/10 rounded-xl">
//                   <XCircle className="w-6 h-6 text-red-500" />
//                 </div>
//                 <div className="flex items-center gap-1 text-red-400 text-sm">
//                   <TrendingDown className="w-4 h-4" />
//                   <span>0%</span>
//                 </div>
//               </div>
//               <p className="text-red-400 text-sm mb-1">Rejected</p>
//               <p className="text-4xl font-bold">{stats.totalRejected}</p>
//               <div className="mt-4 w-full bg-red-700/50 rounded-full h-1">
//                 <div
//                   className="bg-linear-to-r from-red-500 to-red-400 h-1 rounded-full"
//                   style={{
//                     width: `${(stats.totalRejected / stats.totalApplications) * 100}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-blue-500/10 rounded-xl">
//                 <Building2 className="w-6 h-6 text-blue-500" />
//               </div>
//             </div>
//             <h3 className="text-red-400 text-sm mb-2">Partner Universities</h3>
//             <p className="text-4xl font-bold text-blue-400">
//               {stats.totalUniversities}
//             </p>
//             <p className="text-sm text-red-500 mt-2">Active partnerships</p>
//           </div>

//           <div className="bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-purple-500/10 rounded-xl">
//                 <FileText className="w-6 h-6 text-purple-500" />
//               </div>
//             </div>
//             <h3 className="text-red-400 text-sm mb-2">Scholarship Packages</h3>
//             <p className="text-4xl font-bold text-purple-400">
//               {stats.totalScholarshipPackages}
//             </p>
//             <p className="text-sm text-red-500 mt-2">Available programs</p>
//           </div>

//           <div className="bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-emerald-500/10 rounded-xl">
//                 <CheckCircle2 className="w-6 h-6 text-emerald-500" />
//               </div>
//             </div>
//             <h3 className="text-red-400 text-sm mb-2">Payment Success</h3>
//             <p className="text-4xl font-bold text-emerald-400">
//               {payment.paid}
//             </p>
//             <p className="text-sm text-red-500 mt-2">
//               {paymentCompletionRate}% completion rate
//             </p>
//           </div>

//           <div className="bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <div className="flex items-center justify-between mb-4">
//               <div className="p-3 bg-amber-500/10 rounded-xl">
//                 <CreditCard className="w-6 h-6 text-amber-500" />
//               </div>
//             </div>
//             <h3 className="text-red-400 text-sm mb-2">Pending Payments</h3>
//             <p className="text-4xl font-bold text-amber-400">
//               {payment.pending}
//             </p>
//             <p className="text-sm text-red-500 mt-2">
//               {payment.failed} failed transactions
//             </p>
//           </div>
//         </div>

//         {/* Payment Stats Detailed */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <div className="lg:col-span-2 bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
//               <BarChart3 className="text-red-500" /> Monthly Application Trend
//             </h3>
//             <div className="relative">
//               {/* Bar Chart */}
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                 {data.monthlyTrend
//                   .sort((a, b) => {
//                     if (a._id.year !== b._id.year)
//                       return a._id.year - b._id.year;
//                     return a._id.month - b._id.month;
//                   })
//                   .map((item, index) => {
//                     const heightPercentage = (item.count / maxCount) * 100;
//                     return (
//                       <div
//                         key={index}
//                         className="flex flex-col items-center gap-2"
//                       >
//                         <div className="relative w-full flex justify-center mb-2">
//                           <span className="text-2xl font-bold text-white">
//                             {item.count}
//                           </span>
//                         </div>
//                         <div
//                           className="w-full bg-red-700/50 rounded-t-lg relative"
//                           style={{ height: "120px" }}
//                         >
//                           <div
//                             className="absolute bottom-0 w-full bg-linear-to-t from-red-600 to-red-400 rounded-t-lg transition-all duration-500 hover:from-red-500 hover:to-red-300"
//                             style={{
//                               height: `${heightPercentage}%`,
//                               minHeight: "4px",
//                             }}
//                           >
//                             <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-red-800 text-xs px-2 py-1 rounded whitespace-nowrap">
//                               {item.count} applications
//                             </div>
//                           </div>
//                         </div>
//                         <p className="text-red-400 text-xs text-center mt-2">
//                           {getMonthName(item._id.month)}
//                           <br />
//                           {item._id.year}
//                         </p>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           </div>

//           <div className="bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
//               <Activity className="text-red-500" /> Quick Stats
//             </h3>
//             <div className="space-y-4">
//               <div className="bg-red-800/50 p-4 rounded-xl">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-red-400 text-sm">Approval Rate</span>
//                   <span className="text-emerald-400 font-bold">
//                     {approvalRate}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-red-700/50 rounded-full h-2">
//                   <div
//                     className="bg-linear-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
//                     style={{ width: `${approvalRate}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="bg-red-800/50 p-4 rounded-xl">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-red-400 text-sm">
//                     Payment Completion
//                   </span>
//                   <span className="text-emerald-400 font-bold">
//                     {paymentCompletionRate}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-red-700/50 rounded-full h-2">
//                   <div
//                     className="bg-linear-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
//                     style={{ width: `${paymentCompletionRate}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="bg-red-800/50 p-4 rounded-xl">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-red-400 text-sm">Pending Rate</span>
//                   <span className="text-amber-400 font-bold">
//                     {stats.totalApplications > 0
//                       ? (
//                           (stats.totalPending / stats.totalApplications) *
//                           100
//                         ).toFixed(1)
//                       : "0.0"}
//                     %
//                   </span>
//                 </div>
//                 <div className="w-full bg-red-700/50 rounded-full h-2">
//                   <div
//                     className="bg-linear-to-r from-amber-500 to-amber-400 h-2 rounded-full"
//                     style={{
//                       width: `${(stats.totalPending / stats.totalApplications) * 100}%`,
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mt-6">
//                 <div className="bg-red-800/50 p-3 rounded-xl text-center">
//                   <div className="flex items-center justify-center gap-1 mb-1">
//                     <UserCheck className="w-4 h-4 text-emerald-400" />
//                     <span className="text-lg font-bold text-emerald-400">
//                       {stats.totalApproved}
//                     </span>
//                   </div>
//                   <p className="text-xs text-red-500">Approved</p>
//                 </div>
//                 <div className="bg-red-800/50 p-3 rounded-xl text-center">
//                   <div className="flex items-center justify-center gap-1 mb-1">
//                     <UserX className="w-4 h-4 text-red-400" />
//                     <span className="text-lg font-bold text-red-400">
//                       {stats.totalRejected}
//                     </span>
//                   </div>
//                   <p className="text-xs text-red-500">Rejected</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Top Universities & Recent Applications */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Top Universities */}
//           <div className="bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold flex items-center gap-2">
//                 <Building2 className="text-red-500" /> Top Universities
//               </h3>
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="text-red-400">Total:</span>
//                 <span className="font-bold text-red-400">
//                   {stats.totalUniversities}
//                 </span>
//               </div>
//             </div>
//             <div className="space-y-3">
//               {data.topUniversities.map((uni, i) => {
//                 const maxUniCount = Math.max(
//                   ...data.topUniversities.map((u) => u.count),
//                 );
//                 const barWidth = (uni.count / maxUniCount) * 100;

//                 return (
//                   <div
//                     key={i}
//                     className="bg-red-800/50 p-4 rounded-xl hover:bg-red-800 transition"
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
//                             i === 0
//                               ? "bg-linear-to-r from-yellow-400 to-amber-400 text-red-900"
//                               : i === 1
//                                 ? "bg-linear-to-r from-red-300 to-red-400 text-red-900"
//                                 : i === 2
//                                   ? "bg-linear-to-r from-amber-600 to-amber-700 text-white"
//                                   : "bg-red-700 text-red-300"
//                           }`}
//                         >
//                           {i + 1}
//                         </div>
//                         <div>
//                           <p className="font-medium text-sm">{uni._id}</p>
//                           <p className="text-xs text-red-500">
//                             {uni.count} applications
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-lg font-bold text-red-400">
//                           {uni.count}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="w-full bg-red-700/50 rounded-full h-1.5">
//                       <div
//                         className="bg-linear-to-r from-red-600 to-red-400 h-1.5 rounded-full transition-all duration-500"
//                         style={{ width: `${barWidth}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Recent Applications */}
//           <div className="bg-linear-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold flex items-center gap-2">
//                 <Users className="text-red-500" /> Recent Applications
//               </h3>
//               <div className="flex items-center gap-2">
//                 <select
//                   className="bg-red-800 border border-red-700 rounded-lg px-3 py-1.5 text-sm"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="All">All Status</option>
//                   <option value="Approved">Approved</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Rejected">Rejected</option>
//                 </select>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, or university..."
//                 className="w-full bg-red-800 border border-red-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
//               {filteredApplications.length > 0 ? (
//                 filteredApplications.map((app, i) => (
//                   <div
//                     key={i}
//                     className="bg-red-800/50 p-4 rounded-xl hover:bg-red-800 transition group"
//                   >
//                     <div className="flex items-start justify-between mb-2">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-linear-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center">
//                           <span className="text-red-400 font-bold text-sm">
//                             {app.firstName[0]}
//                             {app.lastName[0]}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="font-semibold">
//                             {app.firstName} {app.lastName}
//                           </p>
//                           <p className="text-xs text-red-400">{app.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end gap-1">
//                         <span
//                           className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${getStatusColor(app.applicationStatus)}`}
//                         >
//                           {app.applicationStatus}
//                         </span>
//                         <span
//                           className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${getPaymentStatusColor(app.paymentStatus)}`}
//                         >
//                           {app.paymentStatus}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between mt-3 pt-3 border-t border-red-700/50">
//                       <div className="flex items-center gap-2 text-xs text-red-400">
//                         <Building2 className="w-3 h-3" />
//                         <span>{app.university}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-red-500">
//                         <Clock4 className="w-3 h-3" />
//                         <span>
//                           {new Date(app.submittedAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                             },
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 mt-2">
//                       <span className="text-xs text-red-500">
//                         ID: {app.applicantId}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 text-red-500">
//                   <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p>No applications found</p>
//                 </div>
//               )}
//             </div>

//             {/* Show more button */}
//             {filteredApplications.length > 5 && (
//               <button className="w-full mt-4 py-2 bg-red-800 rounded-lg hover:bg-red-700 transition text-sm text-red-400">
//                 Show All Applications
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Footer Stats */}
//         <div className="mt-8 bg-linear-to-r from-red-900 to-red-800 border border-red-700/50 p-4 rounded-2xl">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//             <div className="p-2">
//               <p className="text-red-400 text-xs">Response Rate</p>
//               <p className="text-lg font-bold text-red-400 mt-1">
//                 {stats.totalApplications > 0
//                   ? (
//                       ((stats.totalApproved + stats.totalRejected) /
//                         stats.totalApplications) *
//                       100
//                     ).toFixed(1)
//                   : "0"}
//                 %
//               </p>
//             </div>
//             <div className="p-2">
//               <p className="text-red-400 text-xs">Avg. Processing Time</p>
//               <p className="text-lg font-bold text-red-400 mt-1">3.2 days</p>
//             </div>
//             <div className="p-2">
//               <p className="text-red-400 text-xs">Total Programs</p>
//               <p className="text-lg font-bold text-red-400 mt-1">
//                 {stats.totalScholarshipPackages}
//               </p>
//             </div>
//             <div className="p-2">
//               <p className="text-red-400 text-xs">Success Rate</p>
//               <p className="text-lg font-bold text-emerald-400 mt-1">
//                 {approvalRate}%
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(239, 68, 68, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(239, 68, 68, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default StudentDashboardStats;

"use client";

import React from "react";
import {
  Users,
  GraduationCap,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Building2,
  TrendingUp,
} from "lucide-react";
import StatCard from "./StatCard";
import RecentApplicationsTable from "./RecentApplicationsTable";
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
} from "recharts";
import { ScholarshipAnalysisData } from "@/app/types/scholarship";

interface StudentDashboardStatsProps {
  data: ScholarshipAnalysisData;
}

const COLORS = ["#EF4444", "#F87171", "#FCA5A5", "#FEE2E2"];

const StudentDashboardStats: React.FC<StudentDashboardStatsProps> = ({
  data,
}) => {
  const {
    documentCount,
    paymentStats,
    recentApplications,
    topUniversities,
    monthlyTrend,
  } = data;

  console.log({data})

  // Prepare chart data
  const applicationStatusData = [
    { name: "Approved", value: documentCount.totalApproved },
    { name: "Pending", value: documentCount.totalPending },
    { name: "Rejected", value: documentCount.totalRejected },
  ];

  const paymentStatusData = [
    { name: "Paid", value: paymentStats.paid },
    { name: "Pending", value: paymentStats.pending },
    { name: "Failed", value: paymentStats.failed },
  ];

  const monthlyTrendData = monthlyTrend.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    applications: item.count,
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-600 rounded-lg">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Scholarship Analysis Dashboard
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 ml-12">
            Comprehensive overview of all scholarship applications and
            statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Applications"
            value={documentCount.totalApplications}
            icon={FileText}
            color="text-red-600"
            bgColor="bg-red-50"
          />
          <StatCard
            title="Approved"
            value={documentCount.totalApproved}
            icon={CheckCircle2}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            title="Pending"
            value={documentCount.totalPending}
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Rejected"
            value={documentCount.totalRejected}
            icon={XCircle}
            color="text-red-600"
            bgColor="bg-red-50"
          />
          <StatCard
            title="Total Universities"
            value={documentCount.totalUniversities}
            icon={Building2}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Scholarship Packages"
            value={documentCount.totalScholarshipPackages}
            icon={DollarSign}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <StatCard
            title="Pending Payments"
            value={paymentStats.pending}
            icon={Clock}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Total Applications"
            value={documentCount.totalApplications}
            icon={TrendingUp}
            color="text-red-600"
            bgColor="bg-red-50"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Monthly Application Trend
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="applications"
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Application Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Application Status Distribution
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Universities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Top Universities
            </h3>
            <div className="space-y-3">
              {topUniversities.map((uni, index) => (
                <div
                  key={uni._id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {uni._id}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-red-600 ml-2">
                    {uni.count} app{uni.count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Stats */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Payment Overview
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {paymentStats.paid}
                </p>
                <p className="text-xs sm:text-sm text-green-700 mt-1">Paid</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  {paymentStats.pending}
                </p>
                <p className="text-xs sm:text-sm text-orange-700 mt-1">
                  Pending
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {paymentStats.failed}
                </p>
                <p className="text-xs sm:text-sm text-red-700 mt-1">Failed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications Table */}
        <RecentApplicationsTable applications={recentApplications} />
      </div>
    </div>
  );
};

export default StudentDashboardStats;