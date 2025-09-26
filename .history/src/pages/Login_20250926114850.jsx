import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import logo from "../assets/logo.jpg";

const Login = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const loginSuccess = onLogin(formData.email, formData.password);
      if (!loginSuccess) {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 800);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: "alexander.j@carbontrac.com",
      password: "demo2024",
    });
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <img
                src={logo}
                alt="EcoTrack logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
              Welcome to
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                EcoTrack
              </span>
            </h1>
            <p className="text-slate-300 text-lg xl:text-xl leading-relaxed">
              Professional carbon footprint management platform for sustainable
              business practices.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Advanced Analytics
                </h3>
                <p className="text-slate-400 text-sm">
                  Real-time insights and comprehensive reporting
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2.5 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  AI-Powered Recommendations
                </h3>
                <p className="text-slate-400 text-sm">
                  Personalized strategies to reduce emissions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2.5 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Enterprise Integration
                </h3>
                <p className="text-slate-400 text-sm">
                  Seamless workflow integration and automation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile branding */}
          <div className="text-center lg:hidden">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <img
                src={logo}
                alt="EcoTrack logo"
                className="h-12 w-12 object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">CarbonTracker</h2>
            <p className="text-slate-600 mt-2">Professional Edition</p>
          </div>

          {/* Login Header */}
          <div className="text-center">
            <h2 className="hidden lg:block text-3xl font-bold text-slate-800 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-600">
              Sign in to your professional dashboard
            </p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
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
                    className="block w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-12 py-3.5 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    Demo Account
                  </p>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      alexander.j@carbontrac.com
                    </p>
                    <p>
                      <span className="font-medium">Password:</span> demo2024
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    Use demo credentials
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign in to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-slate-600">
                New to CarbonTracker?{" "}
                <button
                  type="button"
                  onClick={() => onNavigate("register")}
                  className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Create your account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
