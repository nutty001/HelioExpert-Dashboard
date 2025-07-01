import React from "react";
import { Sun, Thermometer, Wind, Compass } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MetricCard from "./MetricCard";
import { generateWeatherTrendData } from "../data/mockData";

const WeatherData = ({ data }) => {
  const weatherTrendData = generateWeatherTrendData();

  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="space-y-6">
      {/* Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Global Horizontal Irradiance"
          value={data.mbWM2Horz}
          unit="W/m²"
          color="orange"
          icon={Sun}
        />

        <MetricCard
          title="Temperature"
          value={data.mbWMTA}
          unit="°C"
          color="red"
          icon={Thermometer}
        />

        <MetricCard
          title="Wind Speed"
          value={data.mbWMWS}
          unit="m/s"
          color="blue"
          icon={Wind}
        />

        <MetricCard
          title="Wind Direction"
          value={getWindDirection(data.mbWMWD)}
          unit="°"
          color="purple"
          icon={Compass}
        />
      </div>

      {/* Current Weather Condition */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Current Weather Conditions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 dark:text-gray-400">
                  Global Horizontal Irradiance
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {data.mbWM2Horz} W/m²
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 dark:text-gray-400">
                  Ambient Temperature
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {data.mbWMTA}°C
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 dark:text-gray-400">Wind</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {data.mbWMWS} m/s
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 dark:text-gray-400">
                  Wind Direction
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {getWindDirection(data.mbWMWD)} ({data.mbWMWD}°)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 dark:text-gray-400">
                  Last Updated
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(data.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 24 hours Weather Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Weather Trends (24 Hours)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weatherTrendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
              <YAxis
                yAxisId="left"
                stroke="#6B7280"
                fontSize={12}
                domain={[0, 1000]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6B7280"
                fontSize={12}
                domain={[0, 50]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ghi"
                stroke="#F97316"
                strokeWidth={3}
                name="GHI (W/m²)"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="temperature"
                stroke="#EF4444"
                strokeWidth={2}
                name="Temperature (°C)"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="windSpeed"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Wind Speed (m/s)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">GHI (W/m²)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Temperature (°C)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Wind Speed (m/s)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
