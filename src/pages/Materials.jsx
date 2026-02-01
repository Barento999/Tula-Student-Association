import { useState } from "react";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

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
    <div className="min-h-screen">
      <PageHeader
        title="Learning Materials"
        subtitle="Download study materials and resources"
        icon="📚"
      />

      <div className="container">
        <div className="mb-8">
          <Card>
            <h3 className="text-xl text-primary mb-5">Filter Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

        <div className="mb-6 text-secondary text-base">
          <p>
            Showing {filteredMaterials.length} material
            {filteredMaterials.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.length === 0 ? (
            <div className="col-span-full text-center py-[60px] text-secondary text-lg">
              <p>No materials found matching your filters.</p>
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
                    {material.level} - Grade {material.grade}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-secondary">
                    <span className="text-base">☀️</span>
                    {material.session}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-secondary">
                    <span className="text-base">👤</span>
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
