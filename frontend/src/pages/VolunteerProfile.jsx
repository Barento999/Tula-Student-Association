import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";

function VolunteerProfile() {
  const { user, volunteers, updateVolunteer } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirect if not volunteer
  useEffect(() => {
    if (!user || user.role !== "volunteer") {
      navigate("/");
    }
  }, [user, navigate]);

  // Use useMemo to compute profile
  const profile = useMemo(() => {
    if (!user || user.role !== "volunteer") return null;
    return volunteers.find((v) => v.userId === user._id);
  }, [user, volunteers]);

  // Initialize form data from profile (computed value, not state initially)
  const initialFormData = useMemo(
    () => ({
      university: profile?.university || "",
      department: profile?.department || "",
      subjects: profile?.subjects || [],
      availability: profile?.availability || "",
      preferredLevel: profile?.preferredLevel || "",
    }),
    [profile],
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, value],
      });
    } else {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter((s) => s !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile) {
      updateVolunteer(profile._id, formData);
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
        title="Volunteer Profile"
        subtitle="Manage your volunteer information"
        icon="🎓"
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
                Volunteer
              </span>
            </div>
          </div>

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
              }}>
              Edit Profile
            </button>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                  }}>
                  University *
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                  }}>
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "12px",
                    color: "#E9EDEF",
                  }}>
                  Subjects You Can Teach *
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
                      }}>
                      <input
                        type="checkbox"
                        value={subject}
                        checked={formData.subjects.includes(subject)}
                        onChange={handleSubjectChange}
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                  }}>
                  Availability
                </label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="e.g., June-August 2024"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                  }}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#E9EDEF",
                  }}>
                  Preferred Teaching Level
                </label>
                <select
                  name="preferredLevel"
                  value={formData.preferredLevel}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                  }}>
                  <option value="">Select Level</option>
                  <option value="Elementary">Elementary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Preparatory">Preparatory</option>
                  <option value="Any">Any Level</option>
                </select>
              </div>

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
            <div style={{ display: "grid", gap: "20px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#8696A0",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}>
                  University
                </label>
                <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                  {profile.university}
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
                  Department
                </label>
                <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                  {profile.department}
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
                  Subjects
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "8px",
                  }}>
                  {profile.subjects.map((subject) => (
                    <span
                      key={subject}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "rgba(37, 211, 102, 0.1)",
                        color: "#25D366",
                        borderRadius: "12px",
                      }}>
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              {profile.availability && (
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8696A0",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}>
                    Availability
                  </label>
                  <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                    {profile.availability}
                  </p>
                </div>
              )}
              {profile.preferredLevel && (
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8696A0",
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}>
                    Preferred Level
                  </label>
                  <p style={{ color: "#E9EDEF", fontSize: "16px" }}>
                    {profile.preferredLevel}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VolunteerProfile;
