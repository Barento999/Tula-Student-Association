import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Modal from "../components/Modal";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
} from "react-icons/fi";

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
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [adminProfile, setAdminProfile] = useState({
    fullName: user?.fullName || "Administrator",
    email: user?.email || "admin@tula.org",
    username: user?.username || "admin",
    role: "Admin",
    joinedDate: "January 2024",
  });

  const [profileForm, setProfileForm] = useState(adminProfile);

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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setAdminProfile(profileForm);
    setShowSuccess(true);
    setIsEditingProfile(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1419] via-[#0d1b24] to-[#0a1419] pt-20 pb-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-whatsapp-green/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-whatsapp-green/3 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-whatsapp-green via-[#00E676] to-whatsapp-green bg-clip-text text-transparent mb-2 animate-gradient">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage students, volunteers, and materials
          </p>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap bg-gradient-to-br from-[#1a2730] to-[#15202b] p-2 rounded-2xl border border-gray-700/50 shadow-2xl max-md:flex-col">
          <button
            className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-whatsapp-green to-[#00A884] text-white shadow-lg shadow-whatsapp-green/30"
                : "bg-transparent text-gray-400 hover:bg-[#0f1b24] hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}>
            Overview
          </button>
          <button
            className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-whatsapp-green to-[#00A884] text-white shadow-lg shadow-whatsapp-green/30"
                : "bg-transparent text-gray-400 hover:bg-[#0f1b24] hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}>
            Profile
          </button>
          <button
            className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
              activeTab === "students"
                ? "bg-gradient-to-r from-whatsapp-green to-[#00A884] text-white shadow-lg shadow-whatsapp-green/30"
                : "bg-transparent text-gray-400 hover:bg-[#0f1b24] hover:text-white"
            }`}
            onClick={() => setActiveTab("students")}>
            Students ({students.length})
          </button>
          <button
            className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
              activeTab === "volunteers"
                ? "bg-gradient-to-r from-whatsapp-green to-[#00A884] text-white shadow-lg shadow-whatsapp-green/30"
                : "bg-transparent text-gray-400 hover:bg-[#0f1b24] hover:text-white"
            }`}
            onClick={() => setActiveTab("volunteers")}>
            Volunteers ({volunteers.length})
          </button>
          <button
            className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
              activeTab === "materials"
                ? "bg-gradient-to-r from-whatsapp-green to-[#00A884] text-white shadow-lg shadow-whatsapp-green/30"
                : "bg-transparent text-gray-400 hover:bg-[#0f1b24] hover:text-white"
            }`}
            onClick={() => setActiveTab("materials")}>
            Materials ({materials.length})
          </button>
          <button
            className={`px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
              activeTab === "sessions"
                ? "bg-gradient-to-r from-whatsapp-green to-[#00A884] text-white shadow-lg shadow-whatsapp-green/30"
                : "bg-transparent text-gray-400 hover:bg-[#0f1b24] hover:text-white"
            }`}
            onClick={() => setActiveTab("sessions")}>
            Sessions ({sessions.length})
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-2 text-center">
                <div className="text-[56px] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  👨‍🎓
                </div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {students.length}
                </div>
                <div className="text-base text-gray-400">
                  Registered Students
                </div>
              </div>
              <div className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-2 text-center">
                <div className="text-[56px] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  🤝
                </div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {volunteers.length}
                </div>
                <div className="text-base text-gray-400">Active Volunteers</div>
              </div>
              <div className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-2 text-center">
                <div className="text-[56px] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  📚
                </div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {materials.length}
                </div>
                <div className="text-base text-gray-400">
                  Learning Materials
                </div>
              </div>
              <div className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-2 text-center">
                <div className="text-[56px] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  ☀️
                </div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {sessions.length}
                </div>
                <div className="text-base text-gray-400">Summer Sessions</div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className="group flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl text-white text-base font-bold transition-all duration-300 hover:border-whatsapp-green/50 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-whatsapp-green/20"
                  onClick={() => setShowMaterialModal(true)}>
                  <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    📄
                  </span>
                  Upload Material
                </button>
                <button
                  className="group flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl text-white text-base font-bold transition-all duration-300 hover:border-whatsapp-green/50 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-whatsapp-green/20"
                  onClick={() => setShowSessionModal(true)}>
                  <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    ➕
                  </span>
                  Create Session
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-whatsapp-green/20 border border-whatsapp-green rounded-xl text-whatsapp-green text-center font-semibold animate-fade-in">
                ✓ Profile updated successfully!
              </div>
            )}

            {/* Profile Card */}
            <div className="bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-700/50">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-whatsapp-green to-[#00A884] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-slow"></div>
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-whatsapp-green via-[#00E676] to-[#00A884] flex items-center justify-center text-5xl md:text-6xl text-white font-bold shadow-2xl ring-4 ring-whatsapp-green/30 group-hover:ring-whatsapp-green/50 transition-all duration-300 group-hover:scale-105">
                    {adminProfile.fullName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    {adminProfile.fullName}
                  </h2>
                  <p className="text-whatsapp-green text-lg mb-3 font-medium">
                    {adminProfile.email}
                  </p>
                  <span className="inline-block px-5 py-2 bg-gradient-to-r from-whatsapp-green/20 to-whatsapp-green/10 text-whatsapp-green rounded-full text-sm font-bold border border-whatsapp-green/50 shadow-lg shadow-whatsapp-green/20">
                    🛡️ {adminProfile.role}
                  </span>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-whatsapp-green to-[#00A884] hover:from-[#00A884] hover:to-whatsapp-green text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-whatsapp-green/30 hover:shadow-whatsapp-green/50 hover:scale-105 transform">
                    <FiEdit2 />
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={profileForm.fullName}
                        onChange={handleProfileChange}
                        required
                        className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                        className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={profileForm.username}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                        placeholder="Enter username"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                        Joined Date
                      </label>
                      <input
                        type="text"
                        name="joinedDate"
                        value={profileForm.joinedDate}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                        placeholder="e.g., January 2024"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-whatsapp-green hover:bg-[#00A884] text-white rounded-lg font-bold transition-all duration-300 shadow-lg">
                      <FiSave />
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setProfileForm(adminProfile);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-all duration-300">
                      <FiX />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username */}
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiUser className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          Username
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {adminProfile.username}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMail className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          Email
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {adminProfile.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiShield className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          Role
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {adminProfile.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Joined Date */}
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiCalendar className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          Joined
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {adminProfile.joinedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Registered Students
            </h2>
            <div className="bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#0f1b24]">
                    <tr>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Name
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        School
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Level
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Grade
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Subjects
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-[#0f1b24] transition-colors">
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {student.fullName}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {student.schoolName}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {student.level}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {student.grade}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {student.subjects.join(", ")}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {student.phone || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {students.length === 0 && (
                <div className="py-16 px-5 text-center text-gray-400 text-base">
                  No students registered yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "volunteers" && (
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Registered Volunteers
            </h2>
            <div className="bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#0f1b24]">
                    <tr>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Name
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        University
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Department
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Subjects
                      </th>
                      <th className="p-4 text-left font-semibold text-whatsapp-green border-b border-gray-700">
                        Preferred Level
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer) => (
                      <tr
                        key={volunteer.id}
                        className="hover:bg-[#0f1b24] transition-colors">
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {volunteer.fullName}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {volunteer.university}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {volunteer.department}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {volunteer.subjects.join(", ")}
                        </td>
                        <td className="p-4 text-gray-300 border-b border-gray-700/50">
                          {volunteer.preferredLevel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {volunteers.length === 0 && (
                <div className="py-16 px-5 text-center text-gray-400 text-base">
                  No volunteers registered yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
              <h2 className="text-3xl font-bold text-white">
                Learning Materials
              </h2>
              <button
                className="px-6 py-3 bg-gradient-to-r from-whatsapp-green to-[#00A884] hover:from-[#00A884] hover:to-whatsapp-green text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-whatsapp-green/30 hover:shadow-whatsapp-green/50 hover:scale-105 max-md:w-full"
                onClick={() => setShowMaterialModal(true)}>
                Upload Material
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl p-6 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/10">
                  <div>
                    <h3 className="text-xl text-white font-bold mb-2">
                      {material.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {material.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-[#0f1b24] border border-gray-700 rounded-xl text-xs text-whatsapp-green font-semibold">
                        {material.subject}
                      </span>
                      <span className="px-3 py-1 bg-[#0f1b24] border border-gray-700 rounded-xl text-xs text-gray-300">
                        {material.level}
                      </span>
                      <span className="px-3 py-1 bg-[#0f1b24] border border-gray-700 rounded-xl text-xs text-gray-300">
                        Grade {material.grade}
                      </span>
                      <span className="px-3 py-1 bg-[#0f1b24] border border-gray-700 rounded-xl text-xs text-gray-300">
                        {material.fileType}
                      </span>
                      <span className="px-3 py-1 bg-[#0f1b24] border border-gray-700 rounded-xl text-xs text-gray-300">
                        {material.session}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {materials.length === 0 && (
                <div className="py-16 px-5 text-center text-gray-400 text-base bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl">
                  No materials uploaded yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
              <h2 className="text-3xl font-bold text-white">Summer Sessions</h2>
              <button
                className="px-6 py-3 bg-gradient-to-r from-whatsapp-green to-[#00A884] hover:from-[#00A884] hover:to-whatsapp-green text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-whatsapp-green/30 hover:shadow-whatsapp-green/50 hover:scale-105 max-md:w-full"
                onClick={() => setShowSessionModal(true)}>
                Create Session
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="relative bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl p-6 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/10">
                  <h3 className="text-xl text-white font-bold mb-3">
                    {session.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Year: {session.year}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    Start: {session.startDate}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    End: {session.endDate}
                  </p>
                  {session.active && (
                    <span className="absolute top-6 right-6 px-3 py-1 bg-whatsapp-green text-white rounded-xl text-xs font-semibold shadow-lg shadow-whatsapp-green/30">
                      Active
                    </span>
                  )}
                </div>
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
