import { useState } from "react";
import { useApp } from "../context/AppContext";
import api from "../services/api";
import {
  FiBook,
  FiDownload,
  FiAward,
  FiCalendar,
  FiUser,
  FiFilter,
} from "react-icons/fi";
import CustomSelect from "../components/CustomSelect";

const Materials = () => {
  const { materials, sessions } = useApp();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSession, setSelectedSession] = useState("All");

  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

  const handleDownload = async (material) => {
    try {
      // Increment download count
      await api.materials.incrementDownload(material._id || material.id);

      // Download file to computer
      if (material.fileUrl) {
        // Fetch the file as a blob
        const response = await fetch(material.fileUrl);
        const blob = await response.blob();

        // Create a blob URL
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${material.title}.${material.fileType.toLowerCase()}`; // Set filename with extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
      } else {
        alert("File URL not available");
      }
    } catch (error) {
      console.error("Error downloading material:", error);
      alert("Failed to download material. Please try again.");
    }
  };

  const subjects = ["All", ...new Set(materials.map((m) => m.subject))];
  const levels = ["All", ...new Set(materials.map((m) => m.level))];
  const grades = ["All", ...new Set(materials.map((m) => m.grade))];

  const filteredMaterials = materials.filter((material) => {
    const sessionName = material.summerSession?.name || material.session || "";
    return (
      (selectedSubject === "All" || material.subject === selectedSubject) &&
      (selectedLevel === "All" || material.level === selectedLevel) &&
      (selectedGrade === "All" || material.grade === selectedGrade) &&
      (selectedSession === "All" || sessionName === selectedSession)
    );
  });

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-unread-badge/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-whatsapp-green/5 rounded-full blur-[150px] animate-pulse-slow"
            style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-whatsapp-green/30 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}></div>
          ))}
        </div>

        <div className="container relative z-10 text-center px-4">
          <div className="mb-6 md:mb-8 perspective-[1000px]">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-4 leading-tight transform-gpu transition-all duration-700"
              style={{
                textShadow:
                  "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
              }}>
              <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Learning Materials
              </span>
            </h1>
          </div>
          <p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Access free educational resources, study materials, and notes for
            all subjects and grade levels. Download and learn at your own pace.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-br from-card via-main to-card">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(37, 211, 102, 0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <FiFilter className="w-5 h-5 text-whatsapp-green" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Filter Materials
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <CustomSelect
                label="Subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                options={subjects}
              />

              <CustomSelect
                label="Level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                options={levels}
              />

              <CustomSelect
                label="Grade"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                options={grades.map((grade) =>
                  grade === "All" ? "All Grades" : `Grade ${grade}`,
                )}
              />

              <CustomSelect
                label="Session"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                options={["All Sessions", ...sessions.map((s) => s.name)]}
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-secondary">
                Showing{" "}
                <span className="text-whatsapp-green font-bold">
                  {filteredMaterials.length}
                </span>{" "}
                of{" "}
                <span className="text-primary font-bold">
                  {materials.length}
                </span>{" "}
                materials
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-b from-card to-main relative">
        <div className="container px-4">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-16">
              <FiBook className="w-12 h-12 text-whatsapp-green/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">
                No materials found
              </h3>
              <p className="text-secondary">
                Try adjusting your filters to see more results
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredMaterials.map((material, index) => (
                <div
                  key={material._id || material.id}
                  className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-6 md:p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)]"
                  style={{
                    transformStyle: "preserve-3d",
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                  }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-whatsapp-green/10 to-unread-badge/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700"></div>

                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 mb-4 text-whatsapp-green transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12"
                      style={{
                        filter:
                          "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                      }}>
                      <FiBook className="w-full h-full" />
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                      {material.title}
                    </h3>
                    <p className="text-sm text-secondary mb-4 line-clamp-2">
                      {material.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <FiAward className="w-4 h-4 text-whatsapp-green" />
                        <span>
                          {material.subject} - Grade {material.grade}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <FiCalendar className="w-4 h-4 text-whatsapp-green" />
                        <span>
                          {material.summerSession?.name ||
                            material.session ||
                            "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary">
                        <FiUser className="w-4 h-4 text-whatsapp-green" />
                        <span>
                          {material.uploadedBy?.name ||
                            material.uploadedBy ||
                            "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-whatsapp-green/20 border border-whatsapp-green/40 rounded-full text-whatsapp-green text-xs font-semibold">
                        {material.fileType}
                      </span>
                      <span className="text-xs text-secondary">
                        {material.level}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDownload(material)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-xl text-whatsapp-green font-semibold transition-all duration-300 hover:bg-whatsapp-green hover:text-main group-hover:scale-105">
                      <FiDownload className="w-5 h-5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-br from-main via-card to-main">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(37,211,102,0.15)_0%,transparent_50%)] animate-pulse-slow"></div>
          <div
            className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,rgba(0,168,132,0.15)_0%,transparent_50%)] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container relative z-10 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4 md:mb-6 leading-tight">
            Need More <span className="text-whatsapp-green">Resources?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-8 md:mb-12 px-4 leading-relaxed">
            Join our summer program to get personalized learning support and
            access to even more educational materials
          </p>
          <a
            href="/student-registration"
            className="inline-block px-8 py-4 bg-whatsapp-green text-main rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-[0_25px_70px_rgba(37,211,102,0.5)] transform-gpu">
            Register as Student
          </a>
        </div>
      </section>
    </div>
  );
};

export default Materials;
