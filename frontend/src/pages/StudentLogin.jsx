import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FiLogIn, FiMail, FiLock, FiUserPlus } from "react-icons/fi";

const StudentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApp();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Call backend API to login
      await login({
        email: formData.email,
        password: formData.password,
      });

      // Redirect to the page they were trying to access, or student profile
      const from = location.state?.from || "/student-profile";
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({
        submit: error.message || "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-unread-badge/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-whatsapp-green/5 rounded-full blur-[150px] animate-pulse-slow"
            style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-whatsapp-green/30 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}></div>
          ))}
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-[520px] mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <div
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 text-whatsapp-green animate-pulse-slow"
                style={{
                  filter: "drop-shadow(0 8px 24px rgba(37, 211, 102, 0.5))",
                }}>
                <FiLogIn className="w-full h-full" />
              </div>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-4 leading-tight"
                style={{
                  textShadow:
                    "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
                }}>
                <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Welcome Back
                </span>
              </h1>
              <p className="text-base md:text-lg text-secondary max-w-md mx-auto leading-relaxed">
                Login to access your dashboard and continue learning
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-card to-[#1a2730] border border-border/50 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(37,211,102,0.2)] transition-all duration-500">
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-whatsapp-green" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input h-12 bg-main/50 border-2 border-border/50 rounded-xl focus:border-whatsapp-green focus:bg-main focus:shadow-[0_0_20px_rgba(37,211,102,0.2)] transition-all duration-300"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <div className="error-message animate-fade-in-up">
                    {errors.email}
                  </div>
                )}
              </div>

              {errors.submit && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm animate-fade-in-up">
                  {errors.submit}
                </div>
              )}

              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <FiLock className="w-4 h-4 text-whatsapp-green" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input h-12 bg-main/50 border-2 border-border/50 rounded-xl focus:border-whatsapp-green focus:bg-main focus:shadow-[0_0_20px_rgba(37,211,102,0.2)] transition-all duration-300"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <div className="error-message animate-fade-in-up">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="text-right mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-whatsapp-green hover:text-primary transition-colors duration-300">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(37,211,102,0.5)]">
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg font-bold">
                  <FiLogIn className="w-5 h-5" />
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-r from-card to-[#1a2730] text-secondary">
                    New to Tula Students?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/student-registration"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-xl text-whatsapp-green font-semibold hover:bg-whatsapp-green hover:text-main transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(37,211,102,0.3)]">
                  <FiUserPlus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLogin;
