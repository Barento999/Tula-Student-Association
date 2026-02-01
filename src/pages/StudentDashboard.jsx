import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

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
    <div className="min-h-screen">
      <PageHeader
        title={`Welcome, ${user.fullName}!`}
        subtitle={`${user.level} - Grade ${user.grade}`}
        icon="👋"
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-10">
          <Card>
            <h3 className="text-xl text-primary mb-5 pb-3 border-b border-border">
              Your Information
            </h3>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-secondary font-medium">School:</span>
              <span className="text-primary text-right">{user.schoolName}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-secondary font-medium">Level:</span>
              <span className="text-primary text-right">{user.level}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-secondary font-medium">Grade:</span>
              <span className="text-primary text-right">{user.grade}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-secondary font-medium">Subjects:</span>
              <span className="text-primary text-right">
                {user.subjects.join(", ")}
              </span>
            </div>
            {user.phone && (
              <div className="flex justify-between py-3">
                <span className="text-secondary font-medium">Phone:</span>
                <span className="text-primary text-right">{user.phone}</span>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-xl text-primary mb-5 pb-3 border-b border-border">
              Quick Stats
            </h3>
            <div className="flex items-center gap-4 py-4 border-b border-border">
              <div className="text-4xl">📚</div>
              <div>
                <div className="text-[28px] font-bold text-whatsapp-green">
                  {filteredMaterials.length}
                </div>
                <div className="text-sm text-secondary">
                  Available Materials
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4">
              <div className="text-4xl">🎯</div>
              <div>
                <div className="text-[28px] font-bold text-whatsapp-green">
                  {user.subjects.length}
                </div>
                <div className="text-sm text-secondary">Enrolled Subjects</div>
              </div>
            </div>
          </Card>
        </div>

        <section>
          <h2 className="text-[28px] text-primary mb-6">
            Your Learning Materials
          </h2>

          <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.length === 0 ? (
              <div className="col-span-full text-center py-[60px] text-secondary text-lg">
                <p>
                  No materials available for your level yet. Check back soon!
                </p>
              </div>
            ) : (
              filteredMaterials.map((material) => (
                <Card key={material.id} className="flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[40px]">
                      {material.fileType === "PDF" && "📄"}
                      {material.fileType === "DOC" && "📝"}
                      {material.fileType === "PPT" && "📊"}
                    </div>
                    <span className="bg-whatsapp-green text-main px-3 py-1 rounded-xl text-xs font-semibold">
                      {material.fileType}
                    </span>
                  </div>
                  <h3 className="text-lg text-primary mb-3 leading-snug">
                    {material.title}
                  </h3>
                  <p className="text-sm text-secondary mb-4 flex-grow">
                    {material.description}
                  </p>
                  <div className="flex flex-col gap-2 mb-5 pt-4 border-t border-border">
                    <span className="flex items-center gap-2 text-sm text-secondary">
                      <span className="text-base">📚</span>
                      {material.subject}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-secondary">
                      <span className="text-base">🎓</span>
                      Grade {material.grade}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-secondary">
                      <span className="text-base">👤</span>
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
