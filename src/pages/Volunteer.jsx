import { useState } from "react";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import "./Volunteer.css";

const Volunteer = () => {
  const { registerVolunteer } = useApp();
  const [formData, setFormData] = useState({
    fullName: "",
    university: "",
    department: "",
    subjects: [],
    availability: "",
    preferredLevel: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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
    "Computer Science",
  ];
  const levels = ["Elementary", "Secondary", "Preparatory", "Any Level"];

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
    setFormData({
      fullName: "",
      university: "",
      department: "",
      subjects: [],
      availability: "",
      preferredLevel: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="volunteer-page">
      <PageHeader
        title="Become a Volunteer"
        subtitle="Join us in making a difference this summer"
        icon="🤝"
      />

      <div className="container">
        <section className="volunteer-intro">
          <h2>Why Volunteer?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">❤️</div>
              <h3>Give Back</h3>
              <p>Make a meaningful impact in your community</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3>Share Knowledge</h3>
              <p>Use your university education to help others</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌟</div>
              <h3>Gain Experience</h3>
              <p>Develop teaching and leadership skills</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">👥</div>
              <h3>Build Community</h3>
              <p>Connect with fellow students and locals</p>
            </div>
          </div>
        </section>

        <div className="volunteer-form-container">
          {success && (
            <div className="success-banner">
              <span className="success-icon">✓</span>
              <p>
                Thank you for registering! We'll contact you soon with more
                details.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="volunteer-form">
            <h2>Volunteer Application</h2>

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

            <div className="form-row">
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

            <button type="submit" className="btn btn-primary btn-full">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
