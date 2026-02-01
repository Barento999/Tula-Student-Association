import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FiLogIn, FiMail, FiLock, FiUserPlus } from "react-icons/fi";

const StudentLogin = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    login({ email: formData.email, role: "student" });
    navigate("/student-dashboard");
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
          <div className="text-center mb-8 md:mb-10">
            <div
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-whatsapp-green"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
              }}>
              <FiLogIn className="w-full h-full" />
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-3 leading-tight"
              style={{
                textShadow:
                  "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
              }}>
              <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Student Login
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-secondary max-w-2xl mx-auto leading-relaxed px-4">
              Access your dashboard and learning materials
            </p>
          </div>

          <div className="max-w-[500px] mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-card to-[#1a2730] border border-border/50 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input pl-12"
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                    <FiLock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input pl-12"
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(37,211,102,0.4)] mb-6">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FiLogIn className="w-5 h-5" />
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <div className="text-center">
                <p className="text-secondary text-sm mb-3">
                  Don't have an account?
                </p>
                <Link
                  to="/student-registration"
                  className="inline-flex items-center gap-2 text-whatsapp-green font-semibold hover:text-unread-badge transition-colors duration-300">
                  <FiUserPlus className="w-5 h-5" />
                  Register as Student
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
