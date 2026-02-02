import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";

function StudentProfile() {
  const { user, students, updateStudent } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    school: "",
    gradeLevel: "",
    grade: "",
    subjectInterests: [],
    guardianName: "",
    phone: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/student-login");
      return;
    }

    // Find student profile
    const studentProfile = students.find((s) => s.userId === user._id);
    if (studentProfile) {
      setProfile(studentProfile);
      setFormData({
        school: studentProfile.school || "",
        gradeLevel: studentProfile.gradeLevel || "",
        grade: studentProfile.grade || "",
        subjectInterests: studentProfile.subjectInterests || [],
        guardianName: studentProfile.guardianName || "",
        phone: studentProfile.phone || "",
      });
    }
  }, [user, students, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        subjectInterests: [...formData.subjectInterests, value],
      });
    } else {
      setFormData({
        ...formData,
        subjectInterests: formData.subjectInterests.filter((s) => s !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile) {
      updateStudent(profile._id, formData);
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!profile) {
    return (
      <div
        style={{ minHeight: "100vh", paddingTop: "80px", textAlign: "center" }}>
        <p style={{ color: "#E9EDEF" }}>Loading profile...</p>
      </div>
    );
  }

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Amharic",
    "Computer Science",
  ];

  return (
    <div
      style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "40px" }}>
      <PageHeader
        title="My Profile"
        subtitle="View and manage your student profile"
        icon="👤"
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
        {showSuccess && (
          <div
            style={{
              backgroundColor: "#00A884",
              color: "#fff",
              padding: "15px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
            }}>
            ✓ Profile updated successfully!
          </div>
        )}

        <div
          style={{
            backgroundColor: "#1E2A32",
            borderRadius: "12px",
            padding: "40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}>
          {/* User Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
              paddingBottom: "30px",
              borderBottom: "1px solid #2A3942",
            }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                color: "#fff",
              }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2
                style={{
                  fontSize: "24px",
                  color: "#E9EDEF",
                  marginBottom: "5px",
                }}>
                {user.name}
              </h2>
              <p style={{ color: "#8696A0", fontSize: "14px" }}>{user.email}</p>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  backgroundColor: "rgba(37, 211, 102, 0.1)",
                  color: "#25D366",
                  borderRadius: "12px",
                  fontSize: "12px",
                  marginTop: "8px",
                }}>
                Student
              </span>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "12px 24px",
                backgroundColor: "#25D366",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "30px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#00A884")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#25D366")}>
              Edit Profile
            </button>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              {/* School */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  School Name *
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Grade Level */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Grade Level *
                </label>
                <select
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}>
                  <option value="">Select Level</option>
                  <option value="Elementary">Elementary (Grades 1-6)</option>
                  <option value="Secondary">Secondary (Grades 7-9)</option>
                  <option value="Preparatory">
                    Preparatory (Grades 10-12)
                  </option>
                </select>
              </div>

              {/* Grade */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Current Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="e.g., Grade 8"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Subject Interests */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "12px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Subject Interests *
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                  }}>
                  {subjects.map((subject) => (
                    <label
                      key={subject}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#E9EDEF",
                        cursor: "pointer",
                      }}>
                      <input
                        type="checkbox"
                        value={subject}
                        checked={formData.subjectInterests.includes(subject)}
                        onChange={handleSubjectChange}
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
                      />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guardian Name */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 9XX XXX XXX"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "#25D366",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "transparent",
                    color: "#8696A0",
                    border: "2px solid #2A3942",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              {/* View Mode */}
              <div style={{ display: "grid", gap: "20px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8696A0",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}>
                    School
                  </label>
                  <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                    {profile.school}
                  </p>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8696A0",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}>
                    Grade Level
                  </label>
                  <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                    {profile.gradeLevel}
                  </p>
                </div>

                {profile.grade && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#8696A0",
                        fontSize: "12px",
                        marginBottom: "5px",
                      }}>
                      Current Grade
                    </label>
                    <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                      {profile.grade}
                    </p>
                  </div>
                )}

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8696A0",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}>
                    Subject Interests
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "8px",
                    }}>
                    {profile.subjectInterests.map((subject) => (
                      <span
                        key={subject}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "rgba(37, 211, 102, 0.1)",
                          color: "#25D366",
                          borderRadius: "12px",
                          fontSize: "14px",
                        }}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {profile.guardianName && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#8696A0",
                        fontSize: "12px",
                        marginBottom: "5px",
                      }}>
                      Parent/Guardian
                    </label>
                    <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                      {profile.guardianName}
                    </p>
                  </div>
                )}

                {profile.phone && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#8696A0",
                        fontSize: "12px",
                        marginBottom: "5px",
                      }}>
                      Phone Number
                    </label>
                    <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                      {profile.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}>
          <button
            onClick={() => navigate("/student-dashboard")}
            style={{
              padding: "20px",
              backgroundColor: "#1E2A32",
              border: "2px solid #2A3942",
              borderRadius: "12px",
              color: "#E9EDEF",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = "#25D366";
              e.target.style.backgroundColor = "rgba(37, 211, 102, 0.1)";
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = "#2A3942";
              e.target.style.backgroundColor = "#1E2A32";
            }}>
            📊 Dashboard
          </button>

          <button
            onClick={() => navigate("/materials")}
            style={{
              padding: "20px",
              backgroundColor: "#1E2A32",
              border: "2px solid #2A3942",
              borderRadius: "12px",
              color: "#E9EDEF",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = "#25D366";
              e.target.style.backgroundColor = "rgba(37, 211, 102, 0.1)";
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = "#2A3942";
              e.target.style.backgroundColor = "#1E2A32";
            }}>
            📚 Materials
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
