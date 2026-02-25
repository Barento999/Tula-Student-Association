import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  FiHeart,
  FiBook,
  FiStar,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

const Volunteer = () => {
  const { registerVolunteer } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    university: "",
    department: "",
    subjects: [],
    availability: "",
    preferredLevel: "",
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

  const subjectOptions = [
    "Mathematics",
    "English",
    "Afaan Oromoo",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Economics",
    "Agriculture",
  ];
  const levels = ["Elementary", "Secondary", "Preparatory", "Any"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.university.trim())
      newErrors.university = "University name is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (formData.subjects.length === 0)
      newErrors.subjects = "Please select at least one subject";
    if (!formData.availability.trim())
      newErrors.availability = "Please specify your availability";
    if (!formData.preferredLevel)
      newErrors.preferredLevel = "Please select a preferred level";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    registerVolunteer(formData);
    setSuccess(true);

    // Redirect to volunteer profile after 2 seconds
    setTimeout(() => {
      navigate("/volunteer-profile");
    }, 2000);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4">
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

        <div className="container relative z-10 text-center px-4">
          <div className="mb-6 md:mb-8 perspective-[1000px]">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-4 leading-tight transform-gpu transition-all duration-700"
              style={{
                textShadow:
                  "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
              }}>
              <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Become a Volunteer
              </span>
            </h1>
          </div>
          <p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Join us in making a difference this summer. Share your knowledge,
            inspire young minds, and give back to your community.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-card via-main to-card">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(37, 211, 102, 0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 md:px-6 py-2 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-full text-whatsapp-green font-semibold mb-4 md:mb-6 text-sm md:text-base">
              Why Volunteer?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight px-4">
              Make a <span className="text-whatsapp-green">Difference</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <FiHeart className="w-full h-full" />,
                title: "Give Back",
                desc: "Make a meaningful impact in your community and help shape the future",
              },
              {
                icon: <FiBook className="w-full h-full" />,
                title: "Share Knowledge",
                desc: "Use your university education to inspire and teach the next generation",
              },
              {
                icon: <FiStar className="w-full h-full" />,
                title: "Gain Experience",
                desc: "Develop valuable teaching and leadership skills for your career",
              },
              {
                icon: <FiUsers className="w-full h-full" />,
                title: "Build Community",
                desc: "Connect with fellow students and strengthen local bonds",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)]"
                style={{
                  transformStyle: "preserve-3d",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                }}>
                <div
                  className="w-12 h-12 mb-4 text-whatsapp-green transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12"
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                  }}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-b from-card to-main relative">
        <div className="container px-4">
          <div className="max-w-[800px] mx-auto">
            {success && (
              <div className="bg-gradient-to-r from-whatsapp-green to-unread-badge text-main px-6 py-4 rounded-2xl mb-6 flex items-center gap-3 shadow-[0_10px_40px_rgba(37,211,102,0.3)] animate-fade-in-up">
                <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-base font-medium">
                  Registration successful! Redirecting to your profile...
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-card to-[#1a2730] border border-border/50 rounded-3xl p-10 max-md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
                Volunteer Application
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your first name"
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
                    placeholder="Enter your middle name"
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
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <div className="error-message">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+251 912 345 678"
                  />
                  {errors.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>

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
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="error-message">{errors.gender}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-group">
                  <label className="form-label">University *</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your university"
                  />
                  {errors.university && (
                    <div className="error-message">{errors.university}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Department/Major *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your major"
                  />
                  {errors.department && (
                    <div className="error-message">{errors.department}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subjects You Can Teach *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {subjectOptions.map((subject) => (
                    <label key={subject} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                      />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
                {errors.subjects && (
                  <div className="error-message">{errors.subjects}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Teaching Level *</label>
                <select
                  name="preferredLevel"
                  value={formData.preferredLevel}
                  onChange={handleChange}
                  className="form-input">
                  <option value="">Select level</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.preferredLevel && (
                  <div className="error-message">{errors.preferredLevel}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Availability (Summer Schedule) *
                </label>
                <textarea
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="form-input"
                  rows="4"
                  placeholder="e.g., Available June-August, mornings preferred"
                />
                {errors.availability && (
                  <div className="error-message">{errors.availability}</div>
                )}
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
                    placeholder="At least 6 characters"
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
                    placeholder="Re-enter your password"
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
                <span className="relative z-10">Submit Application</span>
                <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
