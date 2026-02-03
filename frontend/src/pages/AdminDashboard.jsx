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
  FiTrash2,
  FiEye,
  FiUsers,
  FiBook,
  FiSun,
  FiFileText,
  FiPlus,
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
    deleteStudent,
    deleteVolunteer,
    deleteMaterial,
    deleteSession,
    updateMaterial,
    updateSession,
    loading,
  } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
    file: null,
    fileName: "",
  });

  const [sessionForm, setSessionForm] = useState({
    name: "",
    year: new Date().getFullYear(),
    startDate: "",
    endDate: "",
    active: false,
  });

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-whatsapp-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  const handleMaterialChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files[0]) {
      setMaterialForm((prev) => ({
        ...prev,
        file: files[0],
        fileName: files[0].name,
      }));
    } else {
      setMaterialForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSessionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSessionForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMaterialSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", materialForm.title);
      formData.append("subject", materialForm.subject);
      formData.append("level", materialForm.level);
      formData.append("grade", materialForm.grade);
      formData.append("fileType", materialForm.fileType);
      formData.append("description", materialForm.description);
      formData.append("uploadedBy", materialForm.uploadedBy);
      // Backend expects 'summerSession' not 'sessionId'
      formData.append("summerSession", materialForm.sessionId);

      // Add file if selected
      if (materialForm.file) {
        formData.append("file", materialForm.file);
      }

      if (editingItem) {
        // Update existing material
        await updateMaterial(editingItem.id, formData);
      } else {
        // Add new material
        await addMaterial(formData);
      }

      // Reset form
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
        file: null,
        fileName: "",
      });
      setEditingItem(null);
      setShowMaterialModal(false);
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("Failed to upload material. Please try again.");
    }
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();

    if (editingItem) {
      // Update existing session
      updateSession(editingItem.id, sessionForm);
    } else {
      // Add new session
      addSession(sessionForm);
    }

    setSessionForm({
      name: "",
      year: new Date().getFullYear(),
      startDate: "",
      endDate: "",
      active: false,
    });
    setEditingItem(null);
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

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      switch (type) {
        case "student":
          deleteStudent(id);
          break;
        case "volunteer":
          deleteVolunteer(id);
          break;
        case "material":
          deleteMaterial(id);
          break;
        case "session":
          deleteSession(id);
          break;
        default:
          break;
      }
    }
  };

  const handleView = (item, type) => {
    setSelectedItem({ ...item, type });
    setShowViewModal(true);
  };

  const handleEditMaterial = (material) => {
    setEditingItem(material);
    setMaterialForm({
      title: material.title,
      subject: material.subject,
      level: material.level,
      grade: material.grade,
      fileType: material.fileType,
      description: material.description,
      uploadedBy: material.uploadedBy,
      session: material.session,
      sessionId: material.sessionId,
    });
    setShowMaterialModal(true);
  };

  const handleEditSession = (session) => {
    setEditingItem(session);
    setSessionForm({
      name: session.name,
      year: session.year,
      startDate: session.startDate,
      endDate: session.endDate,
      active: session.active,
    });
    setShowSessionModal(true);
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
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FiUser className="w-8 h-8 text-whatsapp-green" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {students.length}
                </div>
                <div className="text-base text-gray-400">
                  Registered Students
                </div>
              </div>
              <div className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-2 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FiUsers className="w-8 h-8 text-whatsapp-green" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {volunteers.length}
                </div>
                <div className="text-base text-gray-400">Active Volunteers</div>
              </div>
              <div className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-2 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FiBook className="w-8 h-8 text-whatsapp-green" />
                  </div>
                </div>
                <div className="text-5xl font-bold text-whatsapp-green mb-2">
                  {materials.length}
                </div>
                <div className="text-base text-gray-400">
                  Learning Materials
                </div>
              </div>
              <div className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-2 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FiSun className="w-8 h-8 text-whatsapp-green" />
                  </div>
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
                  <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FiFileText className="w-8 h-8 text-whatsapp-green" />
                  </div>
                  Upload Material
                </button>
                <button
                  className="group flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl text-white text-base font-bold transition-all duration-300 hover:border-whatsapp-green/50 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-whatsapp-green/20"
                  onClick={() => setShowSessionModal(true)}>
                  <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <FiPlus className="w-8 h-8 text-whatsapp-green" />
                  </div>
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
            <div className="grid grid-cols-1 gap-4">
              {students.map((student, index) => (
                <div
                  key={student.id}
                  className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl p-6 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar & Name Section */}
                    <div className="flex items-center gap-4 lg:w-1/4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-whatsapp-green/20 rounded-full blur-md"></div>
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-whatsapp-green to-[#00A884] flex items-center justify-center text-2xl text-white font-bold shadow-lg ring-2 ring-whatsapp-green/30">
                          {(student.firstName || student.userId?.name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-whatsapp-green truncate">
                          {student.firstName && student.middleName
                            ? `${student.firstName} ${student.middleName}`
                            : student.firstName ||
                              student.userId?.name ||
                              "Unknown"}
                        </h3>
                        <p className="text-sm text-gray-300 truncate">
                          {student.userId?.email || "No email"}
                        </p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Phone
                        </p>
                        <p className="text-sm text-gray-300 font-medium truncate">
                          {student.phone || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Gender
                        </p>
                        <p className="text-sm text-gray-300 font-medium">
                          {student.gender || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          School
                        </p>
                        <p className="text-sm text-gray-300 font-medium truncate">
                          {student.schoolName || student.school || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Level
                        </p>
                        <p className="text-sm text-gray-300 font-medium">
                          {student.level || student.gradeLevel || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Grade
                        </p>
                        <p className="text-sm text-gray-300 font-medium">
                          {student.grade || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Guardian
                        </p>
                        <p className="text-sm text-gray-300 font-medium truncate">
                          {student.guardianName || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30 col-span-2">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-2 font-semibold">
                          Subjects
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(student.subjects || student.subjectInterests || [])
                            .slice(0, 3)
                            .map((subject, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-whatsapp-green/20 text-whatsapp-green rounded text-xs font-medium border border-whatsapp-green/30">
                                {subject}
                              </span>
                            ))}
                          {(student.subjects || student.subjectInterests || [])
                            .length > 3 && (
                            <span className="px-2 py-0.5 text-gray-400 text-xs">
                              +
                              {(
                                student.subjects ||
                                student.subjectInterests ||
                                []
                              ).length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:w-auto">
                      <button
                        onClick={() => handleView(student, "student")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium text-sm border border-blue-500/30"
                        title="View Details">
                        <FiEye className="w-4 h-4" />
                        <span className="lg:hidden">View</span>
                      </button>
                      <button
                        onClick={() =>
                          handleDelete("student", student._id || student.id)
                        }
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium text-sm border border-red-500/30"
                        title="Delete">
                        <FiTrash2 className="w-4 h-4" />
                        <span className="lg:hidden">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {students.length === 0 && (
                <div className="bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl py-16 px-5 text-center">
                  <div className="text-6xl mb-4 opacity-20">📚</div>
                  <p className="text-gray-400 text-lg">
                    No students registered yet.
                  </p>
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
            <div className="grid grid-cols-1 gap-4">
              {volunteers.map((volunteer, index) => (
                <div
                  key={volunteer.id}
                  className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl p-6 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar & Name Section */}
                    <div className="flex items-center gap-4 lg:w-1/4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-whatsapp-green/20 rounded-full blur-md"></div>
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-whatsapp-green to-[#00A884] flex items-center justify-center text-2xl text-white font-bold shadow-lg ring-2 ring-whatsapp-green/30">
                          {(
                            volunteer.firstName ||
                            volunteer.userId?.name ||
                            "?"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-whatsapp-green truncate">
                          {volunteer.firstName && volunteer.middleName
                            ? `${volunteer.firstName} ${volunteer.middleName}`
                            : volunteer.firstName ||
                              volunteer.userId?.name ||
                              "Unknown"}
                        </h3>
                        <p className="text-sm text-gray-300 truncate">
                          {volunteer.userId?.email || "No email"}
                        </p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Phone
                        </p>
                        <p className="text-sm text-gray-300 font-medium truncate">
                          {volunteer.phone || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Gender
                        </p>
                        <p className="text-sm text-gray-300 font-medium">
                          {volunteer.gender || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          University
                        </p>
                        <p className="text-sm text-gray-300 font-medium truncate">
                          {volunteer.university || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Department
                        </p>
                        <p className="text-sm text-gray-300 font-medium truncate">
                          {volunteer.department || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Level
                        </p>
                        <p className="text-sm text-gray-300 font-medium">
                          {volunteer.preferredLevel || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30 col-span-2 md:col-span-1">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-1 font-semibold">
                          Availability
                        </p>
                        <p className="text-sm text-gray-300 font-medium truncate">
                          {volunteer.availability || "N/A"}
                        </p>
                      </div>
                      <div className="bg-[#0f1b24] rounded-lg p-3 border border-gray-700/30 col-span-2">
                        <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-2 font-semibold">
                          Teaching Subjects
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(volunteer.subjects || [])
                            .slice(0, 3)
                            .map((subject, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-whatsapp-green/20 text-whatsapp-green rounded text-xs font-medium border border-whatsapp-green/30">
                                {subject}
                              </span>
                            ))}
                          {(volunteer.subjects || []).length > 3 && (
                            <span className="px-2 py-0.5 text-gray-400 text-xs">
                              +{(volunteer.subjects || []).length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 lg:w-auto">
                      <button
                        onClick={() => handleView(volunteer, "volunteer")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium text-sm border border-blue-500/30"
                        title="View Details">
                        <FiEye className="w-4 h-4" />
                        <span className="lg:hidden">View</span>
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            "volunteer",
                            volunteer._id || volunteer.id,
                          )
                        }
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium text-sm border border-red-500/30"
                        title="Delete">
                        <FiTrash2 className="w-4 h-4" />
                        <span className="lg:hidden">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {volunteers.length === 0 && (
                <div className="bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl py-16 px-5 text-center">
                  <div className="text-6xl mb-4 opacity-20">🤝</div>
                  <p className="text-gray-400 text-lg">
                    No volunteers registered yet.
                  </p>
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
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-whatsapp-green to-[#00A884] hover:from-[#00A884] hover:to-whatsapp-green text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-whatsapp-green/30 hover:shadow-whatsapp-green/50 hover:scale-105 max-md:w-full"
                onClick={() => {
                  setEditingItem(null);
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
                  setShowMaterialModal(true);
                }}>
                <FiPlus className="w-5 h-5" />
                Upload Material
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map((material, index) => (
                <div
                  key={material.id}
                  className="group bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl p-6 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/20 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}>
                  {/* Icon & File Type */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-whatsapp-green/20 rounded-lg blur-md"></div>
                      <div className="relative w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center border border-whatsapp-green/30">
                        <FiFileText className="w-6 h-6 text-whatsapp-green" />
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#0f1b24] border border-whatsapp-green/30 rounded-lg text-xs text-whatsapp-green font-bold">
                      {material.fileType}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg text-white font-bold mb-2 line-clamp-2 min-h-[3.5rem]">
                    {material.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                    {material.description || "No description available"}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-[#0f1b24] rounded-lg p-2 border border-gray-700/30">
                      <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-0.5 font-semibold">
                        Subject
                      </p>
                      <p className="text-xs text-gray-300 font-medium truncate">
                        {material.subject}
                      </p>
                    </div>
                    <div className="bg-[#0f1b24] rounded-lg p-2 border border-gray-700/30">
                      <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-0.5 font-semibold">
                        Level
                      </p>
                      <p className="text-xs text-gray-300 font-medium truncate">
                        {material.level}
                      </p>
                    </div>
                    <div className="bg-[#0f1b24] rounded-lg p-2 border border-gray-700/30">
                      <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-0.5 font-semibold">
                        Grade
                      </p>
                      <p className="text-xs text-gray-300 font-medium">
                        {material.grade}
                      </p>
                    </div>
                    <div className="bg-[#0f1b24] rounded-lg p-2 border border-gray-700/30">
                      <p className="text-xs text-whatsapp-green uppercase tracking-wide mb-0.5 font-semibold">
                        Session
                      </p>
                      <p className="text-xs text-gray-300 font-medium truncate">
                        {material.session}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-700/30">
                    <button
                      onClick={() => handleEditMaterial(material)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium text-sm border border-blue-500/30"
                      title="Edit">
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("material", material.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium text-sm border border-red-500/30"
                      title="Delete">
                      <FiTrash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {materials.length === 0 && (
                <div className="col-span-full bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl py-16 px-5 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 bg-whatsapp-green/10 rounded-full flex items-center justify-center">
                      <FiBook className="w-10 h-10 text-whatsapp-green/50" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg">
                    No materials uploaded yet.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Click "Upload Material" to add your first learning resource.
                  </p>
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
                onClick={() => {
                  setEditingItem(null);
                  setSessionForm({
                    name: "",
                    year: new Date().getFullYear(),
                    startDate: "",
                    endDate: "",
                    active: false,
                  });
                  setShowSessionModal(true);
                }}>
                Create Session
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="relative bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-gray-700/50 rounded-2xl p-6 hover:border-whatsapp-green/50 transition-all duration-300">
                  <h3 className="text-xl text-white font-bold mb-3">
                    {session.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Year: {session.year}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    Start: {session.startDate}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    End: {session.endDate}
                  </p>
                  {session.active && (
                    <span className="absolute top-6 right-6 px-3 py-1 bg-whatsapp-green text-white rounded-xl text-xs font-semibold shadow-lg shadow-whatsapp-green/30">
                      Active
                    </span>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditSession(session)}
                      className="flex-1 p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors font-semibold text-sm"
                      title="Edit">
                      <FiEdit2 className="w-4 h-4 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("session", session.id)}
                      className="flex-1 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors font-semibold text-sm"
                      title="Delete">
                      <FiTrash2 className="w-4 h-4 inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showMaterialModal}
        onClose={() => {
          setShowMaterialModal(false);
          setEditingItem(null);
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
            file: null,
            fileName: "",
          });
        }}
        title={
          editingItem ? "Edit Learning Material" : "Upload Learning Material"
        }>
        <form onSubmit={handleMaterialSubmit} className="space-y-6">
          {/* File Upload Section */}
          <div className="bg-gradient-to-br from-whatsapp-green/5 to-whatsapp-green/10 border-2 border-dashed border-whatsapp-green/30 rounded-xl p-6 hover:border-whatsapp-green/50 transition-all duration-300">
            <label className="cursor-pointer block">
              <input
                type="file"
                name="file"
                onChange={handleMaterialChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-whatsapp-green/10 rounded-full flex items-center justify-center">
                  <FiFileText className="w-8 h-8 text-whatsapp-green" />
                </div>
                <p className="text-white font-semibold mb-2">
                  {materialForm.fileName || "Click to upload file"}
                </p>
                <p className="text-gray-400 text-sm">
                  PDF, DOC, DOCX, PPT, PPTX (Max 10MB)
                </p>
              </div>
            </label>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label text-whatsapp-green">Title *</label>
            <input
              type="text"
              name="title"
              value={materialForm.title}
              onChange={handleMaterialChange}
              className="form-input bg-[#0f1b24] border-gray-700 focus:border-whatsapp-green text-white"
              placeholder="Enter material title"
              required
            />
          </div>

          {/* Subject and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-group">
              <label className="form-label text-whatsapp-green">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={materialForm.subject}
                onChange={handleMaterialChange}
                className="form-input bg-[#0f1b24] border-gray-700 focus:border-whatsapp-green text-white"
                placeholder="e.g., Mathematics"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label text-whatsapp-green">Level *</label>
              <select
                name="level"
                value={materialForm.level}
                onChange={handleMaterialChange}
                className="form-input bg-[#0f1b24] border-gray-700 focus:border-whatsapp-green text-white"
                required>
                <option value="">Select Level</option>
                <option value="Elementary">Elementary</option>
                <option value="Secondary">Secondary</option>
                <option value="Preparatory">Preparatory</option>
              </select>
            </div>
          </div>

          {/* Grade and File Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-group">
              <label className="form-label text-whatsapp-green">Grade *</label>
              <input
                type="text"
                name="grade"
                value={materialForm.grade}
                onChange={handleMaterialChange}
                className="form-input bg-[#0f1b24] border-gray-700 focus:border-whatsapp-green text-white"
                placeholder="e.g., Grade 8"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label text-whatsapp-green">
                File Type *
              </label>
              <select
                name="fileType"
                value={materialForm.fileType}
                onChange={handleMaterialChange}
                className="form-input bg-[#0f1b24] border-gray-700 focus:border-whatsapp-green text-white"
                required>
                <option value="PDF">PDF</option>
                <option value="DOC">DOC/DOCX</option>
                <option value="PPT">PPT/PPTX</option>
              </select>
            </div>
          </div>

          {/* Session */}
          <div className="form-group">
            <label className="form-label text-whatsapp-green">
              Session{" "}
              {sessions.length > 0
                ? "*"
                : "(Optional - Create a session first)"}
            </label>
            <select
              name="sessionId"
              value={materialForm.sessionId}
              onChange={handleMaterialChange}
              className="form-input bg-[#0f1b24] border-gray-700 focus:border-whatsapp-green text-white"
              required={sessions.length > 0}>
              <option key="empty" value="">
                {sessions.length > 0
                  ? "Select Session"
                  : "No sessions available"}
              </option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.name}
                </option>
              ))}
            </select>
            {sessions.length === 0 && (
              <p className="text-yellow-400 text-sm mt-2">
                ⚠️ Create a session first using the "Create Session" button
              </p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label text-whatsapp-green">
              Description
            </label>
            <textarea
              name="description"
              value={materialForm.description}
              onChange={handleMaterialChange}
              className="form-input bg-[#0f1b24] border-gray-700 focus:border-whatsapp-green text-white"
              rows="3"
              placeholder="Add a brief description..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-whatsapp-green to-[#00A884] hover:from-[#00A884] hover:to-whatsapp-green text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-whatsapp-green/30 hover:shadow-whatsapp-green/50 hover:scale-105">
            <FiFileText className="w-5 h-5" />
            {editingItem ? "Update Material" : "Upload Material"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={showSessionModal}
        onClose={() => {
          setShowSessionModal(false);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Summer Session" : "Create Summer Session"}>
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

      {/* View Details Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={`${selectedItem?.type === "student" ? "Student" : "Volunteer"} Details`}>
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Name</p>
                <p className="text-white font-semibold">
                  {selectedItem.fullName ||
                    `${selectedItem.firstName} ${selectedItem.middleName || ""} ${selectedItem.lastName || ""}`.trim()}
                </p>
              </div>
              {selectedItem.type === "student" && (
                <>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">School</p>
                    <p className="text-white font-semibold">
                      {selectedItem.schoolName || selectedItem.school}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Level</p>
                    <p className="text-white font-semibold">
                      {selectedItem.level || selectedItem.gradeLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Grade</p>
                    <p className="text-white font-semibold">
                      {selectedItem.grade}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Guardian</p>
                    <p className="text-white font-semibold">
                      {selectedItem.guardianName || "N/A"}
                    </p>
                  </div>
                </>
              )}
              {selectedItem.type === "volunteer" && (
                <>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">University</p>
                    <p className="text-white font-semibold">
                      {selectedItem.university}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Department</p>
                    <p className="text-white font-semibold">
                      {selectedItem.department}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Preferred Level
                    </p>
                    <p className="text-white font-semibold">
                      {selectedItem.preferredLevel || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Availability</p>
                    <p className="text-white font-semibold">
                      {selectedItem.availability || "N/A"}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <p className="text-white font-semibold">
                  {selectedItem.phone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Gender</p>
                <p className="text-white font-semibold">
                  {selectedItem.gender || "N/A"}
                </p>
              </div>
            </div>
            {selectedItem.subjects && selectedItem.subjects.length > 0 && (
              <div>
                <p className="text-gray-400 text-sm mb-2">
                  {selectedItem.type === "student"
                    ? "Subject Interests"
                    : "Teaching Subjects"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-whatsapp-green/20 text-whatsapp-green rounded-lg text-sm font-semibold border border-whatsapp-green/50">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedItem.subjectInterests &&
              selectedItem.subjectInterests.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">
                    Subject Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.subjectInterests.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-whatsapp-green/20 text-whatsapp-green rounded-lg text-sm font-semibold border border-whatsapp-green/50">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
