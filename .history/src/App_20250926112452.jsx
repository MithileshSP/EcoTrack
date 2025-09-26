import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import Analytics from './pages/Analytics';
import Recommendations from './pages/Recommendations';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

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
        return <Profile user={user} setUser={setUser} emissions={userEmissions} />;
      default:
        return <Dashboard user={user} emissions={userEmissions} onNavigate={navigateTo} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading CarbonTracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {user && (
        <Navbar 
          user={user} 
          currentPage={currentPage} 
          onNavigate={navigateTo} 
          onLogout={logout} 
        />
      )}
      <main className={user ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" : ""}>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

// Professional Mock Data
const mockUsers = [
  {
    id: 1,
    name: 'Alexander Johnson',
    email: 'alexander.j@carbontrac.com',
    password: 'demo2024',
    totalEmissions: 2340,
    achievements: ['Carbon Conscious', 'Data Pioneer', 'Eco Advocate'],
    level: 4,
    xp: 275,
    streak: 12,
    joinedDate: '2024-11-15'
  },
  {
    id: 2,
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@greenfuture.org',
    password: 'demo2024',
    totalEmissions: 1890,
    achievements: ['Sustainability Leader', 'Climate Champion'],
    level: 6,
    xp: 420,
    streak: 24,
    joinedDate: '2024-10-08'
  }
];

const mockEmissionsData = [
  {
    id: 1,
    userId: 1,
    category: 'transportation',
    type: 'vehicle',
    amount: 245.8,
    date: '2025-09-20',
    description: 'Business commute - Tesla Model 3',
    details: { distance: 65, efficiency: 'electric' }
  },
  {
    id: 2,
    userId: 1,
    category: 'energy',
    type: 'electricity',
    amount: 178.3,
    date: '2025-09-21',
    description: 'Office electricity - renewable energy',
    details: { usage: 420, source: 'renewable' }
  },
  {
    id: 3,
    userId: 1,
    category: 'transportation',
    type: 'aviation',
    amount: 1450.0,
    date: '2025-09-15',
    description: 'Business conference - Mumbai to Delhi',
    details: { distance: 1400, class: 'business' }
  },
  {
    id: 4,
    userId: 1,
    category: 'lifestyle',
    type: 'dining',
    amount: 52.7,
    date: '2025-09-22',
    description: 'Sustainable dining choices',
    details: { type: 'plant-based', meals: 8 }
  },
  {
    id: 5,
    userId: 1,
    category: 'energy',
    type: 'heating',
    amount: 95.2,
    date: '2025-09-19',
    description: 'Smart home heating system',
    details: { efficiency: 'high', duration: 24 }
  }
];

export default App;