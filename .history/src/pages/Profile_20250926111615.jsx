import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Target, 
  TrendingUp,
  Settings,
  Bell,
  Shield,
  Download,
  Edit3,
  Save,
  X
} from 'lucide-react';

const Profile = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email
  });

  // Mock achievements data
  const achievements = [
    { 
      id: 1, 
      name: 'First Step', 
      description: 'Logged your first emission entry', 
      icon: '🌱', 
      unlocked: true,
      xpReward: 10,
      unlockedDate: '2025-09-15'
    },
    { 
      id: 2, 
      name: 'Data Collector', 
      description: 'Logged 10 emission entries', 
      icon: '📊', 
      unlocked: true,
      xpReward: 25,
      unlockedDate: '2025-09-20'
    },
    { 
      id: 3, 
      name: 'Week Warrior', 
      description: 'Maintained 7-day logging streak', 
      icon: '⚡', 
      unlocked: true,
      xpReward: 50,
      unlockedDate: '2025-09-22'
    },
    { 
      id: 4, 
      name: 'Carbon Reducer', 
      description: 'Reduced emissions by 20% from baseline', 
      icon: '📉', 
      unlocked: false,
      xpReward: 100,
      progress: 65
    },
    { 
      id: 5, 
      name: 'Eco Champion', 
      description: 'Reduced emissions by 50% from baseline', 
      icon: '🏆', 
      unlocked: false,
      xpReward: 200,
      progress: 30
    },
    { 
      id: 6, 
      name: 'Green Guru', 
      description: 'Maintained 30-day logging streak', 
      icon: '🌿', 
      unlocked: false,
      xpReward: 150,
      progress: 23
    }
  ];

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: editForm.name,
      email: editForm.email
    };
    setUser(updatedUser);
    localStorage.setItem('carbonUser', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const levelProgress = (user.xp % 100) / 100 * 100; // Assuming 100 XP per level
  const nextLevelXP = Math.ceil(user.xp / 100) * 100;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-g bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text mt-1">{user.email}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  Level {user.level}
                </span>
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {user.xp} XP
                </span>
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  🔥 {user.streak} day streak
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-right">
            <p className="text-sm text-green-100">Member since</p>
            <p className="text-lg font-medium">{new Date(user.joinedDate || '2025-01-15').toLocaleDateString()}</p>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-green-100 mb-2">
            <span>Level {user.level}</span>
            <span>{user.xp}/{nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-300"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex">
            {tabs.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium text-gray-900">
                          {new Date(user.joinedDate || '2025-01-15').toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Total Emissions</p>
                        <p className="font-medium text-gray-900">{user.totalEmissions} kg CO₂e</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Summary */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-green-800">Achievements</p>
                        <p className="text-xl font-bold text-green-900">
                          {achievements.filter(a => a.unlocked).length}/{achievements.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-blue-800">Current Level</p>
                        <p className="text-xl font-bold text-blue-900">{user.level}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                      <div>
                        <p className="text-sm text-purple-800">Experience</p>
                        <p className="text-xl font-bold text-purple-900">{user.xp} XP</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🔥</span>
                      <div>
                        <p className="text-sm text-orange-800">Current Streak</p>
                        <p className="text-xl font-bold text-orange-900">{user.streak} days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Achievements & Badges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.unlocked ? 'text-green-900' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            achievement.unlocked 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            +{achievement.xpReward} XP
                          </span>
                          {achievement.unlocked ? (
                            <span className="text-xs text-green-600">
                              Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                            </span>
                          ) : achievement.progress && (
                            <span className="text-xs text-gray-500">
                              {achievement.progress}% complete
                            </span>
                          )}
                        </div>
                        {!achievement.unlocked && achievement.progress && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Settings & Preferences</h3>
              
              {/* Notifications */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                    <span className="ml-3 text-sm text-gray-700">Daily emission reminders</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                    <span className="ml-3 text-sm text-gray-700">Weekly progress reports</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="ml-3 text-sm text-gray-700">Achievement notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="ml-3 text-sm text-gray-700">Monthly recommendations</span>
                  </label>
                </div>
              </div>

              {/* Privacy */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy & Data
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                    <span className="ml-3 text-sm text-gray-700">Share anonymized data for research</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="ml-3 text-sm text-gray-700">Show profile in leaderboards</span>
                  </label>
                </div>
              </div>

              {/* Data Export */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Data Export
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Download your carbon footprint data for external analysis or backup.
                </p>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download My Data
                </button>
              </div>

              {/* Danger Zone */}
              <div className="border-t pt-6">
                <h4 className="font-medium text-red-900 mb-3">Danger Zone</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;