import React from "react";
import { Zap, AlertTriangle, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import MetricCard from "./MetricCard";
import StatusIndicator from "./StatusIndicator";
import { generateMPPTTrendData } from "../data/mockData";

const InverterMetrics = ({ data, scb }) => {
  const mpptTrendData = generateMPPTTrendData();

  const totalOutputPower = data.reduce((sum, inverter) => {
    return sum + (inverter._inv_w || 0);
  }, 0);
  const totalInputPower = data.reduce((sum, inverter) => {
    return sum + (inverter._inv_win || 0);
  }, 0);

  const formatPower = (_inv_win) => {
    if (_inv_win >= 1000000) {
      return `${(_inv_win / 1000000).toFixed(1)} MW`;
    } else if (_inv_win >= 1000) {
      return `${(_inv_win / 1000).toFixed(0)} kW`;
    }
    return `${_inv_win} W`;
  };

  const statusCounter = [0];
  const activeInverterCounter = [1];

  const activeInverters = data.filter((inv) =>
    activeInverterCounter.includes(Number(inv._inv_stat))
  ).length;

  const filteredInverters = data.filter((inv) =>
    statusCounter.includes(Number(inv._inv_stat))
  );

  const warninginverterCount = filteredInverters.length;

  const statusLabels = {
    0: "Offline",
    1: "Online",
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Power Output"
          value={formatPower(totalOutputPower)}
          icon={Zap}
          color="orange"
        />

        <MetricCard
          title="Total Power Input"
          value={formatPower(totalInputPower)}
          icon={Zap}
          color="green"
        />

        <MetricCard
          title="Active Inverters"
          value={activeInverters}
          unit={`/ ${data.length}`}
          icon={Activity}
          color="blue"
        />

        <MetricCard
          title="Warnings"
          value={warninginverterCount}
          icon={AlertTriangle}
          color={warninginverterCount > 0 ? "orange" : "green"}
        />
      </div>

      {/* MPPT Voltage Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          MPPT Voltage Trends (24 Hours)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mpptTrendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                domain={["dataMin - 15", "dataMax + 15"]}
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
                type="monotone"
                dataKey="channel1"
                stroke="#F97316"
                strokeWidth={2}
                name="Channel 1"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="channel2"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Channel 2"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="channel3"
                stroke="#10B981"
                strokeWidth={2}
                name="Channel 3"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="channel4"
                stroke="#8B5CF6"
                strokeWidth={2}
                name="Channel 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Channel 1</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Channel 2</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Channel 3</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-700 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Channel 4</span>
          </div>
        </div>
      </div>

      {/* Inverter Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((inverter) => (
          <div
            key={inverter.uid}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {inverter.devName}
              </h4>
              <StatusIndicator
                status={inverter._inv_stat}
                label={
                  statusLabels[Math.floor(inverter._inv_stat)] || "Unknown"
                }
              />
            </div>

            <div className="space-y-4">
              {/* AC/DC Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      AC Voltage
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {inverter._inv_v} V
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      DC Voltage
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {inverter._inv_vin} V
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    AC Current
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {inverter._inv_I} A
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    DC Current
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {inverter._inv_lin} A
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      AC Output Power
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPower(inverter._inv_w)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      DC Input Power
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPower(inverter._inv_win)}
                  </p>
                </div>
              </div>

              {/* MPPT Data */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  MPPT Channels
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[1, 2, 3, 4].map((channel) => {
                    const voltage = inverter[`_inv_mpv${channel}`] || 0;
                    const current = inverter[`_inv_mpi${channel}`] || 0;
                    return (
                      <div
                        key={channel}
                        className="bg-gray-50 dark:bg-gray-700 rounded p-2"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          Ch {channel}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {voltage.toFixed(0)}V / {current.toFixed(1)}A
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SCB Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scb.map((scb) => (
          <div
            key={scb.uid}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {scb.devName}
              </h4>
            </div>

            <div className="space-y-4">
              {/* SCB Voltage current power and temperature */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Input Voltage
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {scb._scb_v} V
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Input Current
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {scb._scb_itot} A
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Input Power
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {scb._scb_ptot} W
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Internal Temperature
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {scb._scb_inttemp} °C
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      External Temperature
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPower(scb._scb_exttemp1)} °C
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Generation Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Generation Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {data.map((inverter) => (
              <div key={inverter.uid} className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {inverter.devName}
                </h4>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Daily
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {inverter._inv_dayyld} kWh
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.map((inv) => ({
                  name: inv.devName.replace("Inverter Block ", ""),
                  daily: inv._inv_dayyld,
                }))}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="daily" fill="#F97316" name="Daily (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterMetrics;
