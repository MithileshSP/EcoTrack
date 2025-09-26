import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  PlusCircle, 
  Lightbulb, 
  User, 
  LogOut, 
  Menu,
  X,
  Leaf,
  Settings
} from 'lucide-react';

const Navbar = ({ user, currentPage, onNavigate, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'data-entry', label: 'Track Data', icon: PlusCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'recommendations', label: 'Insights', icon: Lightbulb },
  ];

  const handleNavigation = (pageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src="ass" alt="EcoTrack Logo" className="h-6 w-6" />
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  EcoTrack
                </h1>
                <p className="text-xs text-slate-500 -mt-0.5">Professional Edition</p>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`group flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${
                  currentPage === id ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                }`} />
                {label}
              </button>
            ))}

            {/* User section */}
            <div className="flex items-center ml-8 pl-8 border-l border-slate-200">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500">Level {user.level}</span>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <span className="text-xs font-medium text-indigo-600">{user.xp} XP</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleNavigation('profile')}
                    className={`p-2.5 rounded-xl transition-all duration-200 ${
                      currentPage === 'profile'
                        ? 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={onLogout}
                    className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`w-full text-left flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </button>
            ))}
            
            {/* Mobile user info */}
            <div className="border-t border-slate-200 mt-4 pt-4">
              <div className="flex items-center px-4 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-base font-semibold text-slate-800">{user.name}</p>
                  <p className="text-sm text-slate-500">Level {user.level} • {user.xp} XP</p>
                </div>
              </div>
              
              <div className="px-4 py-2 space-y-2">
                <button
                  onClick={() => handleNavigation('profile')}
                  className="w-full text-left flex items-center px-4 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Profile & Settings
                </button>
                
                <button
                  onClick={onLogout}
                  className="w-full text-left flex items-center px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;