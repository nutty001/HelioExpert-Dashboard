import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import TabNavigation from "./components/TabNavigation.jsx";
import PlantOverview from "./components/PlantOverview.jsx";
import InverterMetrics from "./components/InverterMetrics.jsx";
import WeatherData from "./components/WeatherData.jsx";
import { fetchData } from "./api/fetchData.js"; // Import the external function

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setData(data);
        console.log("Fetched solar data:", data);
      } catch (err) {
        console.error("Failed to load solar data", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const tabs = [
    {
      id: "overview",
      label: "Plant Overview",
    },
    {
      id: "Inverters",
      label: "Inverter Status",
    },
    {
      id: "Weather",
      label: "Weather Data",
    },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <PlantOverview data={data.Plant[0]} />;
      case "Inverters":
        return <InverterMetrics data={data.Inverter} scb={data.SCB} />;
      case "Weather":
        return <WeatherData data={data.Weather[0]} />;
      default:
        return <PlantOverview data={data.Plant} />;
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading data</p>
      </div>
    );
  }

  return (
    <div className="bod min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        plantName={data.Plant[0].devName}
        lastUpdated={data.Plant[0].timestamp}
      />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="max-2-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;
