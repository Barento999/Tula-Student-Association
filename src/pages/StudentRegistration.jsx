import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import "./StudentRegistration.css";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const { registerStudent, login } = useApp();
  const [formData, setFormData] = useState({
    fullName: "",
    schoolName: "",
    level: "",
    grade: "",
    subjects: [],
    phone: "",
    guardianName: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const levels = ["Elementary", "Secondary", "Preparatory"];
  const subjectOptions = [
    "Mathematics",
    "English",
    "Arabic",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
  ];

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
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.schoolName.trim())
      newErrors.schoolName = "School name is required";
    if (!formData.level) newErrors.level = "Please select your level";
    if (!formData.grade.trim()) newErrors.grade = "Grade is required";
    if (formData.subjects.length === 0)
      newErrors.subjects = "Please select at least one subject";
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
      navigate("/student-dashboard");
    }, 2000);
  };

  if (success) {
    return (
      <div className="registration-success">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Welcome to Tula Students Association, {formData.fullName}!</p>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-registration-page">
      <PageHeader
        title="Student Registration"
        subtitle="Join our summer learning programs"
        icon="📝"
      />

      <div className="container">
        <div className="registration-form-container">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <div className="error-message">{errors.fullName}</div>
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

            <div className="form-row">
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

            <div className="form-group">
              <label className="form-label">Subject Interests *</label>
              <div className="checkbox-grid">
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
              <label className="form-label">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Parent/Guardian Name (Optional)
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter parent/guardian name"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
