import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FiCheckCircle, FiUserPlus } from "react-icons/fi";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const { registerStudent, login } = useApp();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    level: "",
    grade: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

  const levels = ["Elementary", "Secondary", "Preparatory"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.schoolName.trim())
      newErrors.schoolName = "School name is required";
    if (!formData.level) newErrors.level = "Please select your level";
    if (!formData.grade.trim()) newErrors.grade = "Grade is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const student = registerStudent(formData);
    login({ ...student, role: "student" });
    setSuccess(true);

    setTimeout(() => {
      navigate("/student-profile");
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-unread-badge/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
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
          <div className="bg-gradient-to-br from-card to-[#1a2730] border-2 border-whatsapp-green rounded-3xl p-12 max-md:p-8 text-center max-w-[500px] mx-auto shadow-[0_30px_80px_rgba(37,211,102,0.3)] animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-r from-whatsapp-green to-unread-badge text-main rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_10px_40px_rgba(37,211,102,0.4)]">
              <FiCheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Registration Successful!
            </h2>
            <p className="text-lg text-secondary mb-3">
              Welcome to Tula Students Association, {formData.firstName}{" "}
              {formData.lastName}!
            </p>
            <p className="text-base text-whatsapp-green font-semibold">
              Redirecting to your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              <FiUserPlus className="w-full h-full" />
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-3 leading-tight"
              style={{
                textShadow:
                  "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
              }}>
              <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Student Registration
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-secondary max-w-2xl mx-auto leading-relaxed px-4">
              Join our summer learning programs and unlock your potential
            </p>
          </div>

          <div className="max-w-[900px] mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-card to-[#1a2730] border border-border/50 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="First name"
                  />
                  {errors.firstName && (
                    <div className="error-message">{errors.firstName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Middle name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Last name"
                  />
                  {errors.lastName && (
                    <div className="error-message">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="error-message">{errors.gender}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+251 XXX XXX XXX"
                  />
                  {errors.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">School Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your school name"
                />
                {errors.schoolName && (
                  <div className="error-message">{errors.schoolName}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">Education Level *</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="form-input">
                    <option value="">Select level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.level && (
                    <div className="error-message">{errors.level}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Grade *</label>
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 8"
                  />
                  {errors.grade && (
                    <div className="error-message">{errors.grade}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter password (min 6 characters)"
                  />
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(37,211,102,0.4)]">
                <span className="relative z-10">Complete Registration</span>
                <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentRegistration;
