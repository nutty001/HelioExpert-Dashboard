import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../Theme/useTheme";
const Header = ({ plantName, status, lastUpdated }) => {
  const { isDark, toggleTheme } = useTheme();
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "text-green-500";
      case "offline":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const formatLastUpdated = (lastUpdated) => {
    const date = new Date(lastUpdated);
    return date.toLocaleString();
  };
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                HelioExpect
              </h1>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="hidden sm:flex items-center space-x-2">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {plantName}
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium capitalize ${getStatusColor()}`}
              >
                {status}
              </span>
            </div>

            <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
              last Updated: {formatLastUpdated(lastUpdated)}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
