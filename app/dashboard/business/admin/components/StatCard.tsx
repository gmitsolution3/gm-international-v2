import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "text-red-600",
  bgColor = "bg-red-50",
  trend,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-gray-500 text-xs sm:text-sm font-medium line-clamp-1">
          {title}
        </span>
        <div className={`p-1.5 sm:p-2 rounded-lg ${bgColor} shrink-0`}>
          <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color}`} />
        </div>
      </div>
      <div className="flex items-baseline gap-1 sm:gap-2">
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {trend && (
          <span className="text-xs text-green-600 font-medium">{trend}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
