import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { user, materials } = useApp();
  const [filters, setFilters] = useState({
    subject: "",
    grade: "",
  });

  if (!user || user.role !== "student") {
    return <Navigate to="/student-registration" />;
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredMaterials = materials.filter((material) => {
    if (material.level !== user.level) return false;
    if (filters.subject && material.subject !== filters.subject) return false;
    if (filters.grade && material.grade !== filters.grade) return false;
    return true;
  });

  const subjects = [...new Set(materials.map((m) => m.subject))];

  const handleDownload = (material) => {
    alert(
      `Downloading: ${material.title}\nFile Type: ${material.fileType}\n\nIn a real application, this would download the file.`,
    );
  };

  return (
    <div className="student-dashboard">
      <PageHeader
        title={`Welcome, ${user.fullName}!`}
        subtitle={`${user.level} - Grade ${user.grade}`}
        icon="👋"
      />

      <div className="container">
        <div className="dashboard-grid">
          <Card className="student-info-card">
            <h3>Your Information</h3>
            <div className="info-item">
              <span className="info-label">School:</span>
              <span className="info-value">{user.schoolName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Level:</span>
              <span className="info-value">{user.level}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Grade:</span>
              <span className="info-value">{user.grade}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Subjects:</span>
              <span className="info-value">{user.subjects.join(", ")}</span>
            </div>
            {user.phone && (
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{user.phone}</span>
              </div>
            )}
          </Card>

          <Card className="quick-stats">
            <h3>Quick Stats</h3>
            <div className="stat-item">
              <div className="stat-icon">📚</div>
              <div>
                <div className="stat-number">{filteredMaterials.length}</div>
                <div className="stat-label">Available Materials</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div>
                <div className="stat-number">{user.subjects.length}</div>
                <div className="stat-label">Enrolled Subjects</div>
              </div>
            </div>
          </Card>
        </div>

        <section className="materials-section">
          <h2>Your Learning Materials</h2>

          <Card className="filters-card">
            <div className="filters-grid">
              <div className="form-group">
                <label className="form-label">Filter by Subject</label>
                <select
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  className="form-input">
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Filter by Grade</label>
                <select
                  name="grade"
                  value={filters.grade}
                  onChange={handleFilterChange}
                  className="form-input">
                  <option value="">All Grades</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          <div className="materials-grid">
            {filteredMaterials.length === 0 ? (
              <div className="no-materials">
                <p>
                  No materials available for your level yet. Check back soon!
                </p>
              </div>
            ) : (
              filteredMaterials.map((material) => (
                <Card key={material.id} className="material-card">
                  <div className="material-header">
                    <div className="material-icon">
                      {material.fileType === "PDF" && "📄"}
                      {material.fileType === "DOC" && "📝"}
                      {material.fileType === "PPT" && "📊"}
                    </div>
                    <span className="material-type">{material.fileType}</span>
                  </div>
                  <h3>{material.title}</h3>
                  <p className="material-description">{material.description}</p>
                  <div className="material-meta">
                    <span className="meta-item">
                      <span className="meta-icon">📚</span>
                      {material.subject}
                    </span>
                    <span className="meta-item">
                      <span className="meta-icon">🎓</span>
                      Grade {material.grade}
                    </span>
                    <span className="meta-item">
                      <span className="meta-icon">👤</span>
                      {material.uploadedBy}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDownload(material)}
                    className="btn btn-primary btn-full">
                    Download
                  </button>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
