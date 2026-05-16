import React from "react";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { RecentApplication } from "@/app/types/medical";


interface RecentApplicationsTableProps {
  applications: RecentApplication[];
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles = {
    approved: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  const icons = {
    Approved: <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />,
    Pending: <Clock className="w-3 h-3 sm:w-4 sm:h-4" />,
    Rejected: <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || ""}`}
    >
      {icons[status as keyof typeof icons]}
      {status}
    </span>
  );
};

const PaymentStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-700",
    Failed: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || ""}`}
    >
      {status}
    </span>
  );
};

const RecentApplicationsTableMedical: React.FC<RecentApplicationsTableProps> = ({
  applications,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Recent Applications
        </h3>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden divide-y divide-gray-100">
        {applications.map((app) => (
          <div
            key={app._id}
            className="p-4 hover:bg-red-50/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {app.patientName} 
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {app._id}
                </p>
              </div>
              <StatusBadge status={app.appointmentStatus} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">University</span>
                <span className="text-gray-700 font-medium text-right max-w-50 truncate">
                  {app.hospital_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <PaymentStatusBadge status={app.paymentStatus} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Submitted</span>
                <span className="text-gray-700 text-xs">
                  {new Date(app.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {applications.map((app) => (
              <tr
                key={app._id}
                className="hover:bg-red-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {app.patientName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{app.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-gray-600">
                    {app._id}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                  {app.hospital_name}
                </td>
                <td className="px-6 py-4">
                  <PaymentStatusBadge status={app.paymentStatus} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={app.appointmentStatus.toLocaleLowerCase()} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(app.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentApplicationsTableMedical;
