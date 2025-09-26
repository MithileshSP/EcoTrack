import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import Analytics from './pages/Analytics';
import Recommendations from './pages/Recommendations';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './';

function App() {
  const [user, setUser] = useState(null);
  const [userEmissions, setUserEmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for logged in user
    const savedUser = localStorage.getItem('carbonUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Load user's emissions data
      const emissions = mockEmissionsData.filter(e => e.userId === userData.id);
      setUserEmissions(emissions);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('carbonUser', JSON.stringify(foundUser));
      const emissions = mockEmissionsData.filter(e => e.userId === foundUser.id);
      setUserEmissions(emissions);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: mockUsers.length + 1,
      totalEmissions: 0,
      achievements: []
    };
    setUser(newUser);
    localStorage.setItem('carbonUser', JSON.stringify(newUser));
    setCurrentPage('dashboard');
    return true;
  };

  const logout = () => {
    setUser(null);
    setUserEmissions([]);
    setCurrentPage('login');
    localStorage.removeItem('carbonUser');
  };

  const addEmission = (emissionData) => {
    const newEmission = {
      id: userEmissions.length + 1,
      userId: user.id,
      ...emissionData,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedEmissions = [...userEmissions, newEmission];
    setUserEmissions(updatedEmissions);
    
    // Update user's total emissions
    const totalEmissions = updatedEmissions.reduce((sum, e) => sum + e.amount, 0);
    const updatedUser = { ...user, totalEmissions };
    setUser(updatedUser);
    localStorage.setItem('carbonUser', JSON.stringify(updatedUser));
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    if (!user) {
      switch (currentPage) {
        case 'register':
          return <Register onRegister={register} onNavigate={navigateTo} />;
        default:
          return <Login onLogin={login} onNavigate={navigateTo} />;
      }
    }

    switch (currentPage) {
      case 'data-entry':
        return <DataEntry onAddEmission={addEmission} onNavigate={navigateTo} />;
      case 'analytics':
        return <Analytics emissions={userEmissions} />;
      case 'recommendations':
        return <Recommendations user={user} emissions={userEmissions} />;
      case 'profile':
        return <Profile user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} emissions={userEmissions} onNavigate={navigateTo} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Navbar 
          user={user} 
          currentPage={currentPage} 
          onNavigate={navigateTo} 
          onLogout={logout} 
        />
      )}
      <main className={user ? "container mx-auto px-4 py-8" : ""}>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

// Mock Data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    totalEmissions: 2340,
    achievements: ['First Step', 'Data Collector'],
    level: 3,
    xp: 150,
    streak: 7
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    totalEmissions: 1890,
    achievements: ['Eco Warrior', 'Carbon Reducer'],
    level: 5,
    xp: 280,
    streak: 12
  }
];

const mockEmissionsData = [
  {
    id: 1,
    userId: 1,
    category: 'transportation',
    type: 'car',
    amount: 234.5,
    date: '2025-09-20',
    description: 'Daily commute - 50km'
  },
  {
    id: 2,
    userId: 1,
    category: 'energy',
    type: 'electricity',
    amount: 156.8,
    date: '2025-09-21',
    description: 'Monthly electricity bill - 350 kWh'
  },
  {
    id: 3,
    userId: 1,
    category: 'transportation',
    type: 'flight',
    amount: 1200.0,
    date: '2025-09-15',
    description: 'Business trip to Mumbai'
  },
  {
    id: 4,
    userId: 1,
    category: 'food',
    type: 'meat',
    amount: 45.2,
    date: '2025-09-22',
    description: 'Weekly groceries'
  },
  {
    id: 5,
    userId: 1,
    category: 'energy',
    type: 'gas',
    amount: 89.3,
    date: '2025-09-19',
    description: 'Cooking gas cylinder'
  }
];

const mockRecommendations = [
  {
    id: 1,
    title: 'Switch to LED Bulbs',
    description: 'Replace incandescent bulbs with LED bulbs to reduce electricity consumption by 80%',
    potentialSavings: 120,
    difficulty: 'Easy',
    category: 'energy',
    actionSteps: [
      'Audit current bulbs in your home',
      'Purchase LED replacements',
      'Replace bulbs one room at a time',
      'Monitor electricity usage'
    ]
  },
  {
    id: 2,
    title: 'Use Public Transportation',
    description: 'Use public transport 3 days a week instead of personal car',
    potentialSavings: 450,
    difficulty: 'Medium',
    category: 'transportation',
    actionSteps: [
      'Research local bus/metro routes',
      'Purchase monthly pass',
      'Plan travel times',
      'Track fuel savings'
    ]
  },
  {
    id: 3,
    title: 'Reduce Meat Consumption',
    description: 'Have 2 plant-based meals per week to reduce food carbon footprint',
    potentialSavings: 200,
    difficulty: 'Medium',
    category: 'food',
    actionSteps: [
      'Research plant-based recipes',
      'Plan weekly meals',
      'Shop for plant proteins',
      'Track dietary changes'
    ]
  },
  {
    id: 4,
    title: 'Home Energy Audit',
    description: 'Conduct a comprehensive energy audit to identify saving opportunities',
    potentialSavings: 300,
    difficulty: 'Hard',
    category: 'energy',
    actionSteps: [
      'Schedule professional audit',
      'Identify energy leaks',
      'Prioritize improvements',
      'Implement changes gradually'
    ]
  }
];

const mockAchievements = [
  { id: 1, name: 'First Step', description: 'Logged your first emission entry', icon: '🌱', unlocked: true },
  { id: 2, name: 'Data Collector', description: 'Logged 10 emission entries', icon: '📊', unlocked: true },
  { id: 3, name: 'Week Warrior', description: 'Maintained 7-day logging streak', icon: '⚡', unlocked: true },
  { id: 4, name: 'Carbon Reducer', description: 'Reduced emissions by 20%', icon: '📉', unlocked: false },
  { id: 5, name: 'Eco Champion', description: 'Reduced emissions by 50%', icon: '🏆', unlocked: false },
  { id: 6, name: 'Green Guru', description: 'Maintained 30-day streak', icon: '🌿', unlocked: false }
];

export default App;