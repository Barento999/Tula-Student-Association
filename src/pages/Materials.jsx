import { useState } from "react";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import "./Materials.css";

const Materials = () => {
  const { materials, sessions } = useApp();
  const [filters, setFilters] = useState({
    subject: "",
    level: "",
    session: "",
  });

  const subjects = [...new Set(materials.map((m) => m.subject))];
  const levels = ["Elementary", "Secondary", "Preparatory"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredMaterials = materials.filter((material) => {
    if (filters.subject && material.subject !== filters.subject) return false;
    if (filters.level && material.level !== filters.level) return false;
    if (filters.session && material.session !== filters.session) return false;
    return true;
  });

  const handleDownload = (material) => {
    alert(
      `Downloading: ${material.title}\nFile Type: ${material.fileType}\n\nIn a real application, this would download the file.`,
    );
  };

  return (
    <div className="materials-page">
      <PageHeader
        title="Learning Materials"
        subtitle="Download study materials and resources"
        icon="📚"
      />

      <div className="container">
        <div className="filters-section">
          <Card>
            <h3>Filter Materials</h3>
            <div className="filters-grid">
              <div className="form-group">
                <label className="form-label">Subject</label>
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
                <label className="form-label">Level</label>
                <select
                  name="level"
                  value={filters.level}
                  onChange={handleFilterChange}
                  className="form-input">
                  <option value="">All Levels</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Summer Session</label>
                <select
                  name="session"
                  value={filters.session}
                  onChange={handleFilterChange}
                  className="form-input">
                  <option value="">All Sessions</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.name}>
                      {session.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>

        <div className="materials-count">
          <p>
            Showing {filteredMaterials.length} material
            {filteredMaterials.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="materials-grid">
          {filteredMaterials.length === 0 ? (
            <div className="no-materials">
              <p>No materials found matching your filters.</p>
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
                    {material.level} - Grade {material.grade}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">☀️</span>
                    {material.session}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">👤</span>
                    {material.uploadedBy}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(material)}
                  className="btn btn-primary btn-full">
                  Download Material
                </button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Materials;
