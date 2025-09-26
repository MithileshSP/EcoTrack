import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  Award,
  Plus,
  Car,
  Zap,
  Utensils,
  Plane
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ user, emissions, onNavigate }) => {
  // Calculate metrics
  const totalEmissions = emissions.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthEmissions = emissions
    .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);
  
  // Mock previous month for comparison
  const lastMonthEmissions = thisMonthEmissions * 1.15; // 15% higher last month
  const monthlyChange = ((thisMonthEmissions - lastMonthEmissions) / lastMonthEmissions) * 100;

  // Categories breakdown
  const categoryData = emissions.reduce((acc, emission) => {
    acc[emission.category] = (acc[emission.category] || 0) + emission.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
    color: getCategoryColor(category)
  }));

  // Weekly trend data (mock for visualization)
  const weeklyData = [
    { day: 'Mon', emissions: 45 },
    { day: 'Tue', emissions: 38 },
    { day: 'Wed', emissions: 52 },
    { day: 'Thu', emissions: 41 },
    { day: 'Fri', emissions: 48 },
    { day: 'Sat', emissions: 35 },
    { day: 'Sun', emissions: 42 }
  ];

  // Recent achievements
  const recentAchievements = user.achievements.slice(-3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text">
          Level {user.level} • {user.xp} XP • {user.streak} day streak 🔥
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Emissions</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmissions.toFixed(1)}</p>
              <p className="text-xs text-gray-500">kg CO₂e</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{thisMonthEmissions.toFixed(1)}</p>
              <div className="flex items-center mt-1">
                {monthlyChange < 0 ? (
                  <>
                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xs text-green-600">{Math.abs(monthlyChange).toFixed(1)}% decrease</p>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                    <p className="text-xs text-red-600">{monthlyChange.toFixed(1)}% increase</p>
                  </>
                )}
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Target Progress</p>
              <p className="text-2xl font-bold text-gray-900">72%</p>
              <p className="text-xs text-gray-500">of yearly reduction goal</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{user.achievements.length}</p>
              <p className="text-xs text-gray-500">badges earned</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Emissions Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg CO₂e`, 'Emissions']} />
              <Line 
                type="monotone" 
                dataKey="emissions" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Emissions by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toFixed(1)} kg CO₂e`, 'Emissions']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('data-entry')}
              className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <Plus className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-green-800">Log New Emission</span>
              </div>
              <span className="text-green-600">→</span>
            </button>
            
            <button
              onClick={() => onNavigate('recommendations')}
              className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <Target className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-blue-800">View Recommendations</span>
              </div>
              <span className="text-blue-600">→</span>
            </button>
            
            <button
              onClick={() => onNavigate('analytics')}
              className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-purple-800">View Analytics</span>
              </div>
              <span className="text-purple-600">→</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {emissions.slice(-5).reverse().map((emission, index) => (
              <div key={emission.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="p-2 rounded-full mr-3" style={{backgroundColor: getCategoryColor(emission.category) + '20'}}>
                  {getCategoryIcon(emission.category)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{emission.description}</p>
                  <p className="text-xs text-gray-500">{emission.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{emission.amount.toFixed(1)}</p>
                  <p className="text-xs text-gray-500">kg CO₂e</p>
                </div>
              </div>
            ))}
            
            {emissions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No emissions logged yet.</p>
                <button
                  onClick={() => onNavigate('data-entry')}
                  className="mt-2 text-green-600 hover:text-green-500 text-sm font-medium"
                >
                  Log your first emission →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement} className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-2xl mr-3">🏆</div>
                <div>
                  <p className="font-medium text-gray-900">{achievement}</p>
                  <p className="text-sm text-gray-600">Achievement unlocked!</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
const getCategoryColor = (category) => {
  const colors = {
    transportation: '#ef4444',
    energy: '#f59e0b',
    food: '#10b981',
    other: '#8b5cf6'
  };
  return colors[category] || '#6b7280';
};

const getCategoryIcon = (category) => {
  const iconMap = {
    transportation: <Car className="h-4 w-4" style={{color: getCategoryColor(category)}} />,
    energy: <Zap className="h-4 w-4" style={{color: getCategoryColor(category)}} />,
    food: <Utensils className="h-4 w-4" style={{color: getCategoryColor(category)}} />,
    other: <Plane className="h-4 w-4" style={{color: getCategoryColor(category)}} />
  };
  return iconMap[category] || <TrendingUp className="h-4 w-4" style={{color: getCategoryColor(category)}} />;
};

export default Dashboard;