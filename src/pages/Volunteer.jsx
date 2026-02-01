import { useState } from "react";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";

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
    <div className="min-h-screen">
      <PageHeader
        title="Become a Volunteer"
        subtitle="Join us in making a difference this summer"
        icon="🤝"
      />

      <div className="container">
        <section className="mb-[60px]">
          <h2 className="text-[32px] text-primary text-center mb-10">
            Why Volunteer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl text-primary mb-3">Give Back</h3>
              <p className="text-base text-secondary">
                Make a meaningful impact in your community
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl text-primary mb-3">Share Knowledge</h3>
              <p className="text-base text-secondary">
                Use your university education to help others
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl text-primary mb-3">Gain Experience</h3>
              <p className="text-base text-secondary">
                Develop teaching and leadership skills
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl text-primary mb-3">Build Community</h3>
              <p className="text-base text-secondary">
                Connect with fellow students and locals
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-[800px] mx-auto">
          {success && (
            <div className="bg-whatsapp-green text-main px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
              <span className="text-2xl font-bold">✓</span>
              <p className="text-base font-medium">
                Thank you for registering! We'll contact you soon with more
                details.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-10 max-md:p-6">
            <h2 className="text-[28px] text-primary mb-8 text-center">
              Volunteer Application
            </h2>

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
