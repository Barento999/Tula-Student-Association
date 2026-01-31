import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const {
    user,
    students,
    volunteers,
    materials,
    sessions,
    addMaterial,
    addSession,
  } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);

  const [materialForm, setMaterialForm] = useState({
    title: "",
    subject: "",
    level: "",
    grade: "",
    fileType: "PDF",
    description: "",
    uploadedBy: "Admin",
    session: "",
    sessionId: "",
  });

  const [sessionForm, setSessionForm] = useState({
    name: "",
    year: new Date().getFullYear(),
    startDate: "",
    endDate: "",
    active: false,
  });

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    setMaterialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSessionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSessionForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMaterialSubmit = (e) => {
    e.preventDefault();
    const selectedSession = sessions.find(
      (s) => s.id === parseInt(materialForm.sessionId),
    );
    addMaterial({
      ...materialForm,
      session: selectedSession?.name || "",
      sessionId: parseInt(materialForm.sessionId),
    });
    setMaterialForm({
      title: "",
      subject: "",
      level: "",
      grade: "",
      fileType: "PDF",
      description: "",
      uploadedBy: "Admin",
      session: "",
      sessionId: "",
    });
    setShowMaterialModal(false);
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    addSession(sessionForm);
    setSessionForm({
      name: "",
      year: new Date().getFullYear(),
      startDate: "",
      endDate: "",
      active: false,
    });
    setShowSessionModal(false);
  };

  return (
    <div className="admin-dashboard">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage students, volunteers, and materials"
        icon="⚙️"
      />

      <div className="container">
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}>
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}>
            Students ({students.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "volunteers" ? "active" : ""}`}
            onClick={() => setActiveTab("volunteers")}>
            Volunteers ({volunteers.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "materials" ? "active" : ""}`}
            onClick={() => setActiveTab("materials")}>
            Materials ({materials.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "sessions" ? "active" : ""}`}
            onClick={() => setActiveTab("sessions")}>
            Sessions ({sessions.length})
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="overview-section">
            <div className="stats-grid">
              <Card className="stat-card">
                <div className="stat-icon">👨‍🎓</div>
                <div className="stat-number">{students.length}</div>
                <div className="stat-label">Registered Students</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-icon">🤝</div>
                <div className="stat-number">{volunteers.length}</div>
                <div className="stat-label">Active Volunteers</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-number">{materials.length}</div>
                <div className="stat-label">Learning Materials</div>
              </Card>
              <Card className="stat-card">
                <div className="stat-icon">☀️</div>
                <div className="stat-number">{sessions.length}</div>
                <div className="stat-label">Summer Sessions</div>
              </Card>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button
                  className="action-btn"
                  onClick={() => setShowMaterialModal(true)}>
                  <span className="action-icon">📄</span>
                  Upload Material
                </button>
                <button
                  className="action-btn"
                  onClick={() => setShowSessionModal(true)}>
                  <span className="action-icon">➕</span>
                  Create Session
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="data-section">
            <h2>Registered Students</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>School</th>
                    <th>Level</th>
                    <th>Grade</th>
                    <th>Subjects</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.fullName}</td>
                      <td>{student.schoolName}</td>
                      <td>{student.level}</td>
                      <td>{student.grade}</td>
                      <td>{student.subjects.join(", ")}</td>
                      <td>{student.phone || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="no-data">No students registered yet.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "volunteers" && (
          <div className="data-section">
            <h2>Registered Volunteers</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>University</th>
                    <th>Department</th>
                    <th>Subjects</th>
                    <th>Preferred Level</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer.id}>
                      <td>{volunteer.fullName}</td>
                      <td>{volunteer.university}</td>
                      <td>{volunteer.department}</td>
                      <td>{volunteer.subjects.join(", ")}</td>
                      <td>{volunteer.preferredLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {volunteers.length === 0 && (
                <div className="no-data">No volunteers registered yet.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="data-section">
            <div className="section-header">
              <h2>Learning Materials</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowMaterialModal(true)}>
                Upload Material
              </button>
            </div>
            <div className="materials-list">
              {materials.map((material) => (
                <Card key={material.id} className="material-item">
                  <div className="material-info">
                    <h3>{material.title}</h3>
                    <p>{material.description}</p>
                    <div className="material-tags">
                      <span className="tag">{material.subject}</span>
                      <span className="tag">{material.level}</span>
                      <span className="tag">Grade {material.grade}</span>
                      <span className="tag">{material.fileType}</span>
                      <span className="tag">{material.session}</span>
                    </div>
                  </div>
                </Card>
              ))}
              {materials.length === 0 && (
                <div className="no-data">No materials uploaded yet.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="data-section">
            <div className="section-header">
              <h2>Summer Sessions</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowSessionModal(true)}>
                Create Session
              </button>
            </div>
            <div className="sessions-grid">
              {sessions.map((session) => (
                <Card key={session.id} className="session-card">
                  <h3>{session.name}</h3>
                  <p>Year: {session.year}</p>
                  <p>Start: {session.startDate}</p>
                  <p>End: {session.endDate}</p>
                  {session.active && (
                    <span className="active-badge">Active</span>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showMaterialModal}
        onClose={() => setShowMaterialModal(false)}
        title="Upload Learning Material">
        <form onSubmit={handleMaterialSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={materialForm.title}
              onChange={handleMaterialChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Subject *</label>
              <input
                type="text"
                name="subject"
                value={materialForm.subject}
                onChange={handleMaterialChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Level *</label>
              <select
                name="level"
                value={materialForm.level}
                onChange={handleMaterialChange}
                className="form-input"
                required>
                <option value="">Select</option>
                <option value="Elementary">Elementary</option>
                <option value="Secondary">Secondary</option>
                <option value="Preparatory">Preparatory</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Grade *</label>
              <input
                type="text"
                name="grade"
                value={materialForm.grade}
                onChange={handleMaterialChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">File Type *</label>
              <select
                name="fileType"
                value={materialForm.fileType}
                onChange={handleMaterialChange}
                className="form-input"
                required>
                <option value="PDF">PDF</option>
                <option value="DOC">DOC</option>
                <option value="PPT">PPT</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Session *</label>
            <select
              name="sessionId"
              value={materialForm.sessionId}
              onChange={handleMaterialChange}
              className="form-input"
              required>
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={materialForm.description}
              onChange={handleMaterialChange}
              className="form-input"
              rows="3"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Upload Material
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        title="Create Summer Session">
        <form onSubmit={handleSessionSubmit}>
          <div className="form-group">
            <label className="form-label">Session Name *</label>
            <input
              type="text"
              name="name"
              value={sessionForm.name}
              onChange={handleSessionChange}
              className="form-input"
              placeholder="e.g., Summer 2025"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Year *</label>
            <input
              type="number"
              name="year"
              value={sessionForm.year}
              onChange={handleSessionChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={sessionForm.startDate}
                onChange={handleSessionChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={sessionForm.endDate}
                onChange={handleSessionChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="active"
                checked={sessionForm.active}
                onChange={handleSessionChange}
              />
              <span>Mark as active session</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Create Session
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
