import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Filter,
  Download,
  Share2,
  Globe,
  Users,
} from "lucide-react";

const Analytics = ({ emissions }) => {
  const [timeRange, setTimeRange] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEmissions = React.useMemo(() => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const categoryFiltered = emissions.filter((emission) =>
      selectedCategory === "all" ? true : emission.category === selectedCategory
    );

    const daysMap = {
      week: 7,
      month: 30,
      quarter: 90,
      year: 365,
    };

    const rangeInDays = daysMap[timeRange] ?? 30;
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (rangeInDays - 1));
    startDate.setHours(0, 0, 0, 0);

    const dateFiltered = categoryFiltered.filter((emission) => {
      const emissionDate = new Date(emission.date);
      if (Number.isNaN(emissionDate.getTime())) {
        return false;
      }
      emissionDate.setHours(0, 0, 0, 0);
      return emissionDate >= startDate && emissionDate <= endDate;
    });

    return dateFiltered.length > 0 ? dateFiltered : categoryFiltered;
  }, [emissions, selectedCategory, timeRange]);

  // Process emissions data
  const processedData = React.useMemo(() => {
    const categoryTotals = filteredEmissions.reduce((acc, emission) => {
      acc[emission.category] = (acc[emission.category] || 0) + emission.amount;
      return acc;
    }, {});

    const monthlyData = {};
    filteredEmissions.forEach((emission) => {
      const month = emission.date.slice(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          total: 0,
          transportation: 0,
          energy: 0,
          food: 0,
          other: 0,
        };
      }
      monthlyData[month].total += emission.amount;
      monthlyData[month][emission.category] += emission.amount;
    });

    const typeBreakdown = filteredEmissions.reduce((acc, emission) => {
      const key = `${emission.category}-${emission.type}`;
      acc[key] = (acc[key] || 0) + emission.amount;
      return acc;
    }, {});

    return {
      categoryTotals,
      monthlyData: Object.values(monthlyData).sort((a, b) =>
        a.month.localeCompare(b.month)
      ),
      typeBreakdown,
    };
  }, [filteredEmissions]);

  const { categoryTotals, monthlyData, typeBreakdown } = processedData;

  // Chart data
  const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
    color: getCategoryColor(category),
  }));

  const barData = Object.entries(typeBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([type, amount]) => ({
      name: type.replace("-", " - ").toUpperCase(),
      value: amount,
      color: getCategoryColor(type.split("-")[0]),
    }));

  // Comparison data
  const comparisonData = {
    national: 2800,
    global: 4800,
    target: 2000,
    user: Object.values(categoryTotals).reduce((sum, val) => sum + val, 0),
  };

  const userVsAverages = [
    {
      name: "Transportation",
      user: categoryTotals.transportation || 0,
      national: 1050,
      global: 1850,
    },
    {
      name: "Energy",
      user: categoryTotals.energy || 0,
      national: 1150,
      global: 1950,
    },
    {
      name: "Food",
      user: categoryTotals.food || 0,
      national: 450,
      global: 750,
    },
    {
      name: "Other",
      user: categoryTotals.other || 0,
      national: 150,
      global: 250,
    },
  ];

  const totalEmissions = Object.values(categoryTotals).reduce(
    (sum, val) => sum + val,
    0
  );
  const percentageVsNational =
    ((totalEmissions - comparisonData.national) / comparisonData.national) *
    100;
  const percentageVsGlobal =
    ((totalEmissions - comparisonData.global) / comparisonData.global) * 100;
  const targetProgress =
    totalEmissions === 0 ? 0 : (comparisonData.target / totalEmissions) * 100;

  const handleExport = React.useCallback(() => {
    if (!filteredEmissions.length) {
      window.alert("No emissions available for the selected filters.");
      return;
    }

    const headers = [
      "Date",
      "Category",
      "Type",
      "Amount (kg CO₂e)",
      "Description",
    ];
    const rows = filteredEmissions.map((emission) => [
      emission.date,
      emission.category,
      emission.type,
      emission.amount,
      emission.description || "",
    ]);

    const escapeValue = (value) => `${String(value ?? "").replace(/"/g, '""')}`;
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${escapeValue(cell)}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `emissions-${timeRange}-${selectedCategory}-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [filteredEmissions, selectedCategory, timeRange]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Analytics & Insights
            </h1>
            <p className="text-gray-600 mt-1">
              Detailed analysis of your carbon footprint
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="transportation">Transportation</option>
              <option value="energy">Energy</option>
              <option value="food">Food</option>
            </select>

            <button
              onClick={handleExport}
              disabled={!filteredEmissions.length}
              className="flex items-center px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Emissions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalEmissions.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">kg CO₂e this month</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                vs National Avg
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {percentageVsNational > 0 ? "+" : ""}
                {percentageVsNational.toFixed(1)}%
              </p>
              <div className="flex items-center mt-1">
                {percentageVsNational < 0 ? (
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                )}
                <p
                  className={`text-xs ${
                    percentageVsNational < 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(percentageVsNational).toFixed(1)}%{" "}
                  {percentageVsNational < 0 ? "below" : "above"} average
                </p>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">vs Global Avg</p>
              <p className="text-2xl font-bold text-gray-900">
                {percentageVsGlobal > 0 ? "+" : ""}
                {percentageVsGlobal.toFixed(1)}%
              </p>
              <div className="flex items-center mt-1">
                {percentageVsGlobal < 0 ? (
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                )}
                <p
                  className={`text-xs ${
                    percentageVsGlobal < 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(percentageVsGlobal).toFixed(1)}%{" "}
                  {percentageVsGlobal < 0 ? "below" : "above"} average
                </p>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Target Progress
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {targetProgress.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500">of 2030 climate target</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Emissions Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `${value.toFixed(1)} kg CO₂e`,
                  "Emissions",
                ]}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `${value.toFixed(1)} kg CO₂e`,
                  "Emissions",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Emission Sources */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top Emission Sources
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={120} />
              <Tooltip
                formatter={(value) => [
                  `${value.toFixed(1)} kg CO₂e`,
                  "Emissions",
                ]}
              />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            You vs Averages
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userVsAverages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="user" fill="#10b981" name="You" />
              <Bar dataKey="national" fill="#f59e0b" name="National Avg" />
              <Bar dataKey="global" fill="#ef4444" name="Global Avg" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Insights */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Key Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Highest Category</p>
                <p className="text-sm text-blue-700">
                  {Object.entries(categoryTotals)
                    .sort(([, a], [, b]) => b - a)[0]?.[0]
                    ?.charAt(0)
                    .toUpperCase() +
                    Object.entries(categoryTotals)
                      .sort(([, a], [, b]) => b - a)[0]?.[0]
                      ?.slice(1)}{" "}
                  accounts for{" "}
                  {(
                    ((Object.entries(categoryTotals).sort(
                      ([, a], [, b]) => b - a
                    )[0]?.[1] || 0) /
                      totalEmissions) *
                    100
                  ).toFixed(0)}
                  % of your emissions
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <Target className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Climate Target</p>
                <p className="text-sm text-green-700">
                  You need to reduce emissions by{" "}
                  {(totalEmissions - comparisonData.target).toFixed(1)} kg CO₂e
                  to meet Paris Agreement targets
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
              <Calendar className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Monthly Trend</p>
                <p className="text-sm text-yellow-700">
                  {monthlyData.length > 1 &&
                  monthlyData[monthlyData.length - 1].total >
                    monthlyData[monthlyData.length - 2].total
                    ? "Your emissions increased this month. Consider implementing reduction strategies."
                    : "Good progress! Your emissions are trending downward."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Metrics */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Personal Metrics
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Daily Average
                </span>
                <span className="text-sm text-gray-900">
                  {(totalEmissions / 30).toFixed(1)} kg CO₂e
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (totalEmissions / 30 / 10) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Weekly Average
                </span>
                <span className="text-sm text-gray-900">
                  {(totalEmissions / 4).toFixed(1)} kg CO₂e
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min((totalEmissions / 4 / 70) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Annual Projection
                </span>
                <span className="text-sm text-gray-900">
                  {(totalEmissions * 12).toFixed(0)} kg CO₂e
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      ((totalEmissions * 12) / 5000) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                Based on your current patterns, you're projected to emit{" "}
                <span className="font-medium">
                  {(totalEmissions * 12).toFixed(0)} kg CO₂e
                </span>{" "}
                annually.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Detailed Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-right py-3 px-4">Amount (kg CO₂e)</th>
                <th className="text-right py-3 px-4">Percentage</th>
                <th className="text-right py-3 px-4">vs National</th>
                <th className="text-right py-3 px-4">vs Global</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categoryTotals).map(([category, amount]) => {
                const percentage = (amount / totalEmissions) * 100;
                const nationalData = userVsAverages.find(
                  (d) => d.name.toLowerCase() === category
                );
                const vsNational = nationalData
                  ? ((amount - nationalData.national) / nationalData.national) *
                    100
                  : 0;
                const vsGlobal = nationalData
                  ? ((amount - nationalData.global) / nationalData.global) * 100
                  : 0;

                return (
                  <tr key={category} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {amount.toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {percentage.toFixed(1)}%
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        vsNational < 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {vsNational > 0 ? "+" : ""}
                      {vsNational.toFixed(1)}%
                    </td>
                    <td
                      className={`py-3 px-4 text-right ${
                        vsGlobal < 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {vsGlobal > 0 ? "+" : ""}
                      {vsGlobal.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function
const getCategoryColor = (category) => {
  const colors = {
    transportation: "#ef4444",
    energy: "#f59e0b",
    food: "#10b981",
    other: "#8b5cf6",
  };
  return colors[category] || "#6b7280";
};

export default Analytics;
