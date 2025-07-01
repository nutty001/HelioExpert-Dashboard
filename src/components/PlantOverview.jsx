import React from "react";
import { Factory, Zap, Gauge } from "lucide-react";
import MetricCard from "./MetricCard";
import StatusIndicator from "./StatusIndicator";

const PlantOverview = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Plant Overview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ">
        <div className="flex items-start justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Factory className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.devName}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <span className="font-medium">Plant UID:</span>
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm-font-mono">
                  {data.uid}
                </code>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <span>
                  Last updated:{" "}
                  {new Date(data.lastUpdated * 1000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plant Detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Plant UID"
          value={data.uid}
          icon={Factory}
          color="blue"
        />
        <MetricCard
          title="Solar Load Factor"
          value={data.slf}
          unit="%"
          icon={Gauge}
          color="orange"
        />
        <MetricCard
          title="Device Type"
          value={data.devType}
          icon={Factory}
          color={"green"}
        />
      </div>
    </div>
  );
};

export default PlantOverview;
