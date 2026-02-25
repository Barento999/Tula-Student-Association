import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Modal from "../components/Modal";
import api from "../services/api";
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
  FiLogOut,
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
    updateUser,
    logout,
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

  // Initialize admin profile from user data
  const [adminProfile, setAdminProfile] = useState(() => ({
    fullName: user?.name || "Administrator",
    email: user?.email || "admin@tula.org",
    username: user?.username || user?.email?.split("@")[0] || "admin",
    role: user?.role || "Admin",
    joinedDate: "January 2024",
  }));

  const [profileForm, setProfileForm] = useState(adminProfile);

  // Use ref to track if profile has been initialized
  const profileInitialized = useRef(false);

  const [materialForm, setMaterialForm] = useState({
    title: "",
    subject: "",
    level: "",
    grade: "",
    fileType: "PDF",
    description: "",
    uploadedBy: "Admin",
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

  // Sync adminProfile with user data when user changes (only once on mount)
  useEffect(() => {
    if (user && user.name && user.email && !profileInitialized.current) {
      const updatedProfile = {
        fullName: user.name,
        email: user.email,
        username: user.username || user.email.split("@")[0],
        role: user.role || "Admin",
        joinedDate: "January 2024",
      };

      setAdminProfile(updatedProfile);
      setProfileForm(updatedProfile);
      profileInitialized.current = true;
    }
  }, [user]);

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
        // Update existing material - use _id not id
        await updateMaterial(editingItem._id || editingItem.id, formData);
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
      // Update existing session - use _id not id
      updateSession(editingItem._id || editingItem.id, sessionForm);
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

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profile in backend
      const updatedUser = await api.auth.updateProfile({
        name: profileForm.fullName,
        email: profileForm.email,
      });

      // Update local state
      setAdminProfile({
        ...profileForm,
        fullName: updatedUser.name,
        email: updatedUser.email,
      });

      // Update user in context and localStorage
      const newUserData = {
        ...user,
        name: updatedUser.name,
        email: updatedUser.email,
        token: updatedUser.token,
      };
      updateUser(newUserData);

      setShowSuccess(true);
      setIsEditingProfile(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
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
      // Extract the session ID - could be material.summerSession._id or material.summerSession
      sessionId:
        material.summerSession?._id ||
        material.summerSession ||
        material.sessionId ||
        "",
      file: null,
      fileName: "",
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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Clean Professional Header - Taller Version */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <FiShield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white mb-1">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Tula Student Association Management
                </p>
              </div>
            </div>

            {/* User & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-base font-semibold text-white shadow-md">
                  {(user?.name || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-base font-medium text-white">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {user?.email || "admin@tula.org"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 transition-all text-sm font-medium">
                <FiLogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-12 pl-6 pr-6">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-32 bottom-0 w-64 bg-[#111111]/80 backdrop-blur-xl border-r border-white/5 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {[
              { id: "overview", label: "Overview", icon: FiBook },
              { id: "profile", label: "Profile", icon: FiUser },
              {
                id: "students",
                label: "Students",
                count: students.length,
                icon: FiUsers,
              },
              {
                id: "volunteers",
                label: "Volunteers",
                count: volunteers.length,
                icon: FiUsers,
              },
              {
                id: "materials",
                label: "Materials",
                count: materials.length,
                icon: FiFileText,
              },
              {
                id: "sessions",
                label: "Sessions",
                count: sessions.length,
                icon: FiSun,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        activeTab === tab.id
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-white/10 text-gray-400"
                      }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="ml-64 max-w-[1400px]">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Clean Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Students Card */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {students.length}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Students</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <FiUsers className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Total enrolled</div>
                </div>

                {/* Volunteers Card */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/30 transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {volunteers.length}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Volunteers</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <FiUsers className="w-5 h-5 text-teal-400" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Active contributors
                  </div>
                </div>

                {/* Materials Card */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {materials.length}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Materials</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <FiBook className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Learning resources
                  </div>
                </div>

                {/* Sessions Card */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        {sessions.length}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Sessions</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <FiSun className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Active programs</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowMaterialModal(true)}
                    className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all text-left group">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FiFileText className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Upload Material</p>
                      <p className="text-sm text-gray-500">
                        Add new learning resources
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowSessionModal(true)}
                    className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/30 hover:bg-white/10 transition-all text-left group">
                    <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FiPlus className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Create Session</p>
                      <p className="text-sm text-gray-500">
                        Start a new program
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Success Message */}
              {showSuccess && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-center font-medium">
                  ✓ Profile updated successfully!
                </div>
              )}

              {/* Profile Card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-white/10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
                    {adminProfile.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-semibold text-white mb-2">
                      {adminProfile.fullName}
                    </h2>
                    <p className="text-emerald-400 text-base mb-3">
                      {adminProfile.email}
                    </p>
                    <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium border border-emerald-500/20">
                      {adminProfile.role}
                    </span>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg font-medium transition-all border border-emerald-500/20">
                      <FiEdit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={profileForm.fullName}
                          onChange={handleProfileChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={profileForm.username}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                          placeholder="Enter username"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">
                          Joined Date
                        </label>
                        <input
                          type="text"
                          name="joinedDate"
                          value={profileForm.joinedDate}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                          placeholder="e.g., January 2024"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg font-medium transition-all border border-emerald-500/20">
                        <FiSave className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setProfileForm(adminProfile);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg font-medium transition-all border border-white/10">
                        <FiX className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Username */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                          <FiUser className="text-emerald-400 w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-500 text-xs mb-1">Username</p>
                          <p className="text-white font-medium truncate">
                            {adminProfile.username}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                          <FiMail className="text-emerald-400 w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-500 text-xs mb-1">Email</p>
                          <p className="text-white font-medium truncate">
                            {adminProfile.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                          <FiShield className="text-emerald-400 w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-500 text-xs mb-1">Role</p>
                          <p className="text-white font-medium truncate">
                            {adminProfile.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Joined Date */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                          <FiCalendar className="text-emerald-400 w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-500 text-xs mb-1">Joined</p>
                          <p className="text-white font-medium truncate">
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
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">
                Registered Students ({students.length})
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-4 lg:w-1/4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl text-white font-bold">
                          {(student.firstName || student.userId?.name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-white truncate">
                            {student.firstName && student.middleName
                              ? `${student.firstName} ${student.middleName}`
                              : student.firstName ||
                                student.userId?.name ||
                                "Unknown"}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {student.userId?.email || "No email"}
                          </p>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Phone</p>
                          <p className="text-sm text-white font-medium truncate">
                            {student.phone || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Gender</p>
                          <p className="text-sm text-white font-medium">
                            {student.gender || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">School</p>
                          <p className="text-sm text-white font-medium truncate">
                            {student.schoolName || student.school || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Level</p>
                          <p className="text-sm text-white font-medium">
                            {student.level || student.gradeLevel || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Grade</p>
                          <p className="text-sm text-white font-medium">
                            {student.grade || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Guardian</p>
                          <p className="text-sm text-white font-medium truncate">
                            {student.guardianName || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 col-span-2">
                          <p className="text-xs text-gray-500 mb-2">Subjects</p>
                          <div className="flex flex-wrap gap-1">
                            {(
                              student.subjects ||
                              student.subjectInterests ||
                              []
                            )
                              .slice(0, 3)
                              .map((subject, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium border border-emerald-500/20">
                                  {subject}
                                </span>
                              ))}
                            {(
                              student.subjects ||
                              student.subjectInterests ||
                              []
                            ).length > 3 && (
                              <span className="px-2 py-0.5 text-gray-500 text-xs">
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
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all font-medium text-sm border border-blue-500/20"
                          title="View Details">
                          <FiEye className="w-4 h-4" />
                          <span className="lg:hidden">View</span>
                        </button>
                        <button
                          onClick={() =>
                            handleDelete("student", student._id || student.id)
                          }
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all font-medium text-sm border border-red-500/20"
                          title="Delete">
                          <FiTrash2 className="w-4 h-4" />
                          <span className="lg:hidden">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {students.length === 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-xl py-16 px-5 text-center">
                    <div className="text-6xl mb-4 opacity-20">📚</div>
                    <p className="text-gray-500">No students registered yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "volunteers" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">
                Registered Volunteers ({volunteers.length})
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {volunteers.map((volunteer) => (
                  <div
                    key={volunteer.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-4 lg:w-1/4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-xl text-white font-bold">
                          {(
                            volunteer.firstName ||
                            volunteer.userId?.name ||
                            "?"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-white truncate">
                            {volunteer.firstName && volunteer.middleName
                              ? `${volunteer.firstName} ${volunteer.middleName}`
                              : volunteer.firstName ||
                                volunteer.userId?.name ||
                                "Unknown"}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {volunteer.userId?.email || "No email"}
                          </p>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Phone</p>
                          <p className="text-sm text-white font-medium truncate">
                            {volunteer.phone || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Gender</p>
                          <p className="text-sm text-white font-medium">
                            {volunteer.gender || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">
                            University
                          </p>
                          <p className="text-sm text-white font-medium truncate">
                            {volunteer.university || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">
                            Department
                          </p>
                          <p className="text-sm text-white font-medium truncate">
                            {volunteer.department || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">Level</p>
                          <p className="text-sm text-white font-medium">
                            {volunteer.preferredLevel || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-gray-500 mb-1">
                            Availability
                          </p>
                          <p className="text-sm text-white font-medium truncate">
                            {volunteer.availability || "N/A"}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10 col-span-2">
                          <p className="text-xs text-gray-500 mb-2">
                            Teaching Subjects
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {(volunteer.subjects || [])
                              .slice(0, 3)
                              .map((subject, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-teal-500/10 text-teal-400 rounded text-xs font-medium border border-teal-500/20">
                                  {subject}
                                </span>
                              ))}
                            {(volunteer.subjects || []).length > 3 && (
                              <span className="px-2 py-0.5 text-gray-500 text-xs">
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
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all font-medium text-sm border border-blue-500/20"
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
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all font-medium text-sm border border-red-500/20"
                          title="Delete">
                          <FiTrash2 className="w-4 h-4" />
                          <span className="lg:hidden">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {volunteers.length === 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-xl py-16 px-5 text-center">
                    <div className="text-6xl mb-4 opacity-20">🤝</div>
                    <p className="text-gray-500">
                      No volunteers registered yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "materials" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">
                  Learning Materials ({materials.length})
                </h2>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg font-medium transition-all border border-emerald-500/20"
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
                      sessionId: "",
                    });
                    setShowMaterialModal(true);
                  }}>
                  <FiPlus className="w-4 h-4" />
                  Upload Material
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => (
                  <div
                    key={material._id || material.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all">
                    {/* Icon & File Type */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                        <FiFileText className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 font-medium">
                        {material.fileType}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base text-white font-medium mb-2 line-clamp-2 min-h-[3rem]">
                      {material.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">
                      {material.description || "No description available"}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <p className="text-xs text-gray-500 mb-0.5">Subject</p>
                        <p className="text-xs text-white font-medium truncate">
                          {material.subject}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <p className="text-xs text-gray-500 mb-0.5">Level</p>
                        <p className="text-xs text-white font-medium truncate">
                          {material.level}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <p className="text-xs text-gray-500 mb-0.5">Grade</p>
                        <p className="text-xs text-white font-medium">
                          {material.grade}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <p className="text-xs text-gray-500 mb-0.5">Session</p>
                        <p className="text-xs text-white font-medium truncate">
                          {material.summerSession?.name ||
                            material.session ||
                            "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleEditMaterial(material)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all font-medium text-sm border border-blue-500/20"
                        title="Edit">
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete("material", material._id || material.id)
                        }
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all font-medium text-sm border border-red-500/20"
                        title="Delete">
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {materials.length === 0 && (
                  <div className="col-span-full bg-white/5 border border-white/10 rounded-xl py-16 px-5 text-center">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiBook className="w-10 h-10 text-blue-400" />
                    </div>
                    <p className="text-gray-500">No materials uploaded yet.</p>
                    <p className="text-gray-600 text-sm mt-2">
                      Click "Upload Material" to add your first learning
                      resource.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "sessions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">
                  Summer Sessions ({sessions.length})
                </h2>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg font-medium transition-all border border-amber-500/20"
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
                  <FiPlus className="w-4 h-4" />
                  Create Session
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sessions.map((session) => (
                  <div
                    key={session._id || session.id}
                    className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-all">
                    <h3 className="text-lg text-white font-medium mb-3">
                      {session.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-500">
                        Year: <span className="text-white">{session.year}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Start:{" "}
                        <span className="text-white">{session.startDate}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        End:{" "}
                        <span className="text-white">{session.endDate}</span>
                      </p>
                    </div>
                    {session.active && (
                      <span className="absolute top-6 right-6 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-500/20">
                        Active
                      </span>
                    )}
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleEditSession(session)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all font-medium text-sm border border-blue-500/20"
                        title="Edit">
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete("session", session._id || session.id)
                        }
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all font-medium text-sm border border-red-500/20"
                        title="Delete">
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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
                <option
                  key={session._id || session.id}
                  value={session._id || session.id}>
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
