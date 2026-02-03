import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  FiLogIn,
  FiShield,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, login } = useApp();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (user && user.role === "admin") {
    return <Navigate to="/sys-dashboard-mgmt" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Call backend API to login
      await login({
        email: credentials.username, // Backend expects email field
        password: credentials.password,
      });

      // Redirect to admin dashboard on success
      navigate("/sys-dashboard-mgmt");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden bg-gradient-to-br from-bg-main via-bg-main to-bg-secondary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-whatsapp-green/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-whatsapp-green/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}></div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-whatsapp-green/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}></div>
        ))}
      </div>

      <div className="w-full max-w-[480px] relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-whatsapp-green via-unread-badge to-whatsapp-green rounded-3xl shadow-[0_8px_32px_rgba(37,211,102,0.4)] mb-6 animate-float relative">
            <div className="absolute inset-0 bg-gradient-to-br from-whatsapp-green to-unread-badge rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <FiShield className="w-12 h-12 text-bg-main relative z-10" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-3 tracking-tight bg-gradient-to-r from-text-primary via-whatsapp-green to-text-primary bg-clip-text">
            System Administrator
          </h1>
          <p className="text-text-secondary text-base font-medium">
            Secure Access Portal
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-whatsapp-green rounded-full animate-pulse"></div>
            <span className="text-xs text-whatsapp-green font-semibold tracking-wider uppercase">
              Protected System
            </span>
            <div className="w-2 h-2 bg-whatsapp-green rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-bg-card/90 backdrop-blur-2xl border border-border-color/50 rounded-3xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_64px_rgba(37,211,102,0.2)] transition-all duration-500 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-whatsapp-green/5 via-transparent to-unread-badge/5 pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="bg-red-500/10 border-2 border-red-500/50 text-red-400 px-5 py-4 rounded-2xl text-center text-sm animate-shake backdrop-blur-sm shadow-[0_4px_24px_rgba(239,68,68,0.2)]">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-whatsapp-green uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-whatsapp-green transition-all duration-300 group-focus-within:scale-110">
                  <FiMail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full h-16 pl-14 pr-5 bg-bg-main/60 border-2 border-border-color/50 rounded-2xl text-text-primary placeholder:text-text-secondary/50 focus:border-whatsapp-green focus:bg-bg-main focus:shadow-[0_0_32px_rgba(37,211,102,0.2)] transition-all duration-300 outline-none font-medium"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-whatsapp-green uppercase tracking-wide">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-whatsapp-green transition-all duration-300 group-focus-within:scale-110">
                  <FiLock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full h-16 pl-14 pr-14 bg-bg-main/60 border-2 border-border-color/50 rounded-2xl text-text-primary placeholder:text-text-secondary/50 focus:border-whatsapp-green focus:bg-bg-main focus:shadow-[0_0_32px_rgba(37,211,102,0.2)] transition-all duration-300 outline-none font-medium"
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-whatsapp-green transition-all duration-300 hover:scale-110 active:scale-95"
                  tabIndex={-1}>
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-whatsapp-green hover:text-unread-badge transition-colors duration-300 font-semibold inline-flex items-center gap-2 group">
                Forgot Password?
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-gradient-to-r from-whatsapp-green via-unread-badge to-whatsapp-green text-bg-main rounded-2xl font-bold text-lg shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_48px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-bg-main/30 border-t-bg-main rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="w-6 h-6" />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border-color"></div>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              Secured Connection
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border-color"></div>
          </div>
          <p className="text-xs text-text-secondary/70">
            Tula Students Association © 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
