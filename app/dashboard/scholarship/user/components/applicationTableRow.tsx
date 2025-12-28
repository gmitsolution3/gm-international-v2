"use client";

import { StatusBadge } from "./status-badge";

interface ApplicationRowProps {
  application: any;
  index: number;
}

export function ApplicationRow({ application, index }: ApplicationRowProps) {
  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {application.university}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {application.courseName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              ID: {application.applicantId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Degree
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {application.degree}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Date Applied
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {application.dateApplied}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <div className="flex-1">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Payment
            </p>
            <StatusBadge type="payment" status={application.paymentStatus} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Status
            </p>
            <StatusBadge
              type="application"
              status={application.applicationStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
