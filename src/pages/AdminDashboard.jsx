import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";

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
    <div className="min-h-screen">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage students, volunteers, and materials"
        icon="⚙️"
      />

      <div className="container">
        <div className="flex gap-2 mb-8 flex-wrap bg-card p-2 rounded-xl border border-border max-md:flex-col">
          <button
            className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
              activeTab === "overview"
                ? "bg-whatsapp-green text-main"
                : "bg-transparent text-secondary hover:bg-main hover:text-primary"
            }`}
            onClick={() => setActiveTab("overview")}>
            Overview
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
              activeTab === "students"
                ? "bg-whatsapp-green text-main"
                : "bg-transparent text-secondary hover:bg-main hover:text-primary"
            }`}
            onClick={() => setActiveTab("students")}>
            Students ({students.length})
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
              activeTab === "volunteers"
                ? "bg-whatsapp-green text-main"
                : "bg-transparent text-secondary hover:bg-main hover:text-primary"
            }`}
            onClick={() => setActiveTab("volunteers")}>
            Volunteers ({volunteers.length})
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
              activeTab === "materials"
                ? "bg-whatsapp-green text-main"
                : "bg-transparent text-secondary hover:bg-main hover:text-primary"
            }`}
            onClick={() => setActiveTab("materials")}>
            Materials ({materials.length})
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
              activeTab === "sessions"
                ? "bg-whatsapp-green text-main"
                : "bg-transparent text-secondary hover:bg-main hover:text-primary"
            }`}
            onClick={() => setActiveTab("sessions")}>
            Sessions ({sessions.length})
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-8">
                <div className="text-[56px] mb-4">👨‍🎓</div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {students.length}
                </div>
                <div className="text-base text-secondary">
                  Registered Students
                </div>
              </Card>
              <Card className="text-center p-8">
                <div className="text-[56px] mb-4">🤝</div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {volunteers.length}
                </div>
                <div className="text-base text-secondary">
                  Active Volunteers
                </div>
              </Card>
              <Card className="text-center p-8">
                <div className="text-[56px] mb-4">📚</div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {materials.length}
                </div>
                <div className="text-base text-secondary">
                  Learning Materials
                </div>
              </Card>
              <Card className="text-center p-8">
                <div className="text-[56px] mb-4">☀️</div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {sessions.length}
                </div>
                <div className="text-base text-secondary">Summer Sessions</div>
              </Card>
            </div>

            <div>
              <h2 className="text-[28px] text-primary mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className="flex flex-col items-center gap-3 p-8 bg-card border border-border rounded-xl text-primary text-base font-medium transition-all duration-300 hover:bg-main hover:transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]"
                  onClick={() => setShowMaterialModal(true)}>
                  <span className="text-5xl">📄</span>
                  Upload Material
                </button>
                <button
                  className="flex flex-col items-center gap-3 p-8 bg-card border border-border rounded-xl text-primary text-base font-medium transition-all duration-300 hover:bg-main hover:transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]"
                  onClick={() => setShowSessionModal(true)}>
                  <span className="text-5xl">➕</span>
                  Create Session
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="mt-6">
            <h2 className="text-[28px] text-primary mb-6">
              Registered Students
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-main">
                  <tr>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Name
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      School
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Level
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Grade
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Subjects
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-main">
                      <td className="p-4 text-secondary border-b border-border">
                        {student.fullName}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {student.schoolName}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {student.level}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {student.grade}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {student.subjects.join(", ")}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {student.phone || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="py-[60px] px-5 text-center text-muted text-base">
                  No students registered yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "volunteers" && (
          <div className="mt-6">
            <h2 className="text-[28px] text-primary mb-6">
              Registered Volunteers
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-main">
                  <tr>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Name
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      University
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Department
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Subjects
                    </th>
                    <th className="p-4 text-left font-semibold text-primary border-b border-border">
                      Preferred Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer.id} className="hover:bg-main">
                      <td className="p-4 text-secondary border-b border-border">
                        {volunteer.fullName}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {volunteer.university}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {volunteer.department}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {volunteer.subjects.join(", ")}
                      </td>
                      <td className="p-4 text-secondary border-b border-border">
                        {volunteer.preferredLevel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {volunteers.length === 0 && (
                <div className="py-[60px] px-5 text-center text-muted text-base">
                  No volunteers registered yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
              <h2 className="text-[28px] text-primary">Learning Materials</h2>
              <button
                className="btn btn-primary max-md:w-full"
                onClick={() => setShowMaterialModal(true)}>
                Upload Material
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {materials.map((material) => (
                <Card key={material.id} className="p-5">
                  <div>
                    <h3 className="text-lg text-primary mb-2">
                      {material.title}
                    </h3>
                    <p className="text-sm text-secondary mb-3">
                      {material.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-main border border-border rounded-xl text-xs text-secondary">
                        {material.subject}
                      </span>
                      <span className="px-3 py-1 bg-main border border-border rounded-xl text-xs text-secondary">
                        {material.level}
                      </span>
                      <span className="px-3 py-1 bg-main border border-border rounded-xl text-xs text-secondary">
                        Grade {material.grade}
                      </span>
                      <span className="px-3 py-1 bg-main border border-border rounded-xl text-xs text-secondary">
                        {material.fileType}
                      </span>
                      <span className="px-3 py-1 bg-main border border-border rounded-xl text-xs text-secondary">
                        {material.session}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
              {materials.length === 0 && (
                <div className="py-[60px] px-5 text-center text-muted text-base">
                  No materials uploaded yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
              <h2 className="text-[28px] text-primary">Summer Sessions</h2>
              <button
                className="btn btn-primary max-md:w-full"
                onClick={() => setShowSessionModal(true)}>
                Create Session
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <Card key={session.id} className="relative">
                  <h3 className="text-xl text-primary mb-3">{session.name}</h3>
                  <p className="text-sm text-secondary mb-2">
                    Year: {session.year}
                  </p>
                  <p className="text-sm text-secondary mb-2">
                    Start: {session.startDate}
                  </p>
                  <p className="text-sm text-secondary mb-2">
                    End: {session.endDate}
                  </p>
                  {session.active && (
                    <span className="absolute top-6 right-6 px-3 py-1 bg-whatsapp-green text-main rounded-xl text-xs font-semibold">
                      Active
                    </span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
