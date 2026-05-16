import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "text-red-600",
  bgColor = "bg-red-50",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 text-xs sm:text-sm font-medium">
          {title}
        </span>
        <div className={`p-2 sm:p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {trend && (
          <span className="text-xs sm:text-sm text-green-600 font-medium">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
