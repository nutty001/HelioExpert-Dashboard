import React from "react";

const StatusIndicator = ({ status, label, size = "md" }) => {
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const getStatusConfig = () => {
    const code = Number(status);
    switch (code) {
      case 1:
        return {
          color: "text-green-500",
          bgColor: "bg-green-100 dark:bg-green-900",
          borderColor: "border-green-200 dark:border-green-700",
        };
      // case 2:
      //   return {
      //     color: "text-yellow-500",
      //     bgColor: "bg-yellow-100 dark:bg-yellow-900",
      //     borderColor: "border-yellow-200 dark:border-yellow-700",
      //   };
      // case 3:
      //   return {
      //     color: "text-red-500",
      //     bgColor: "bg-red-100 dark:bg-red-900",
      //     borderColor: "border-red-200 dark:border-red-700",
      //   };
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-100 dark:bg-gray-900",
          borderColor: "border-gray-200 dark:border-gray-700",
        };
    }
  };

  const config = getStatusConfig();
  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor}`}
    >
      <span className={`font-medium ${config.color} ${textSizeClasses[size]}`}>
        {label}
      </span>
    </div>
  );
};

export default StatusIndicator;
