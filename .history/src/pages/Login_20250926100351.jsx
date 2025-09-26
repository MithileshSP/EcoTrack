import React, { useState } from 'react';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';

const Login = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const loginSuccess = onLogin(formData.email, formData.password);
      if (!loginSuccess) {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'alexander.j@carbontrac.com',
      password: 'demo2024'
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex overflow-hidden">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="mb-12">
            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-cyan-400 to-indigo-400 rounded-3xl flex items-center justify-center mb-8 shadow-2xl backdrop-blur-sm border border-white/10">
              <Leaf className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent font-extrabold">
                CarbonTracker
              </span>
              <span className="block text-2xl xl:text-3xl font-medium text-slate-300 mt-2">
                Professional Edition
              </span>
            </h1>
            
            <p className="text-slate-300 text-xl xl:text-2xl leading-relaxed max-w-lg">
              Advanced carbon footprint analytics platform designed for enterprise sustainability management.
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
                <p className="text-slate-400 text-base leading-relaxed">Real-time emissions tracking with comprehensive reporting and predictive insights</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-indigo-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">AI-Powered Intelligence</h3>
                <p className="text-slate-400 text-base leading-relaxed">Smart recommendations and automated optimization strategies</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise Security</h3>
                <p className="text-slate-400 text-base leading-relaxed">Bank-grade security with seamless enterprise integration</p>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-slate-400 text-sm mb-4">Trusted by industry leaders worldwide</p>
            <div className="flex items-center space-x-6 opacity-60">
              <div className="text-white font-bold text-lg">FORTUNE</div>
              <div className="text-white font-bold text-lg">500+</div>
              <div className="text-slate-300">companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 bg-white/80 backdrop-blur-sm">
        <div className="w-full max-w-lg">
          {/* Mobile branding */}
          <div className="text-center lg:hidden mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">CarbonTracker</h1>
            <p className="text-slate-600 text-lg">Professional Edition</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
            {/* Login Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">Welcome Back</h2>
              <p className="text-slate-600 text-lg">Access your professional dashboard</p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-slate-50/50 hover:bg-slate-50 text-base"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-slate-50/50 hover:bg-slate-50 text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-4">
                  <p className="text-sm text-red-700 font-semibold flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    {error}
                  </p>
                </div>
              )}

              {/* Demo Credentials */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border-2 border-blue-200/60 rounded-2xl p-5">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-blue-900 mb-3">Demo Account Access</p>
                    <div className="text-sm text-blue-800 space-y-2 font-medium">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600">Email:</span>
                        <code className="bg-blue-100 px-2 py-1 rounded text-blue-900 text-xs">alexander.j@carbontrac.com</code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600">Password:</span>
                        <code className="bg-blue-100 px-2 py-1 rounded text-blue-900 text-xs">demo2024</code>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={fillDemoCredentials}
                      className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    >
                      Use Demo Credentials
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center items-center py-4 px-6 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-white/20"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                      <span className="text-lg">Signing you in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-lg mr-3">Sign in to Dashboard</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  )}
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-base text-slate-600">
                  New to CarbonTracker?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('register')}
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 inline-block"
                  >
                    Create Professional Account
                  </button>
                </p>
              </div>
            </form>
          </div>
          
          {/* Security notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 flex items-center justify-center">
              <Shield className="h-4 w-4 mr-2" />
              Your data is protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;