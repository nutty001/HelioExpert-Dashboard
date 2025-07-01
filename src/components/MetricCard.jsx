import React from "react";

const MetricCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color = "blue",
  className = "",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  };

  const iconColorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    orange: "text-orange-500",
    red: "text-red-500",
    purple: "text-purple-500",
  };
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} bg-opacity-10`}
        >
          <Icon className={`w-6 h-6 ${iconColorClasses[color]}`} />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
