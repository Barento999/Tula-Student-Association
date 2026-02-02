import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiBook,
  FiCalendar,
  FiAward,
  FiTarget,
  FiUser,
  FiUsers,
} from "react-icons/fi";

function VolunteerProfile() {
  const { user, volunteers, updateVolunteer } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "volunteer") {
      navigate("/");
    }
  }, [user, navigate]);

  const profile = useMemo(() => {
    if (!user || user.role !== "volunteer") return null;
    return volunteers.find((v) => v.userId === user._id);
  }, [user, volunteers]);

  const initialFormData = useMemo(
    () => ({
      firstName: profile?.firstName || "",
      middleName: profile?.middleName || "",
      university: profile?.university || "",
      department: profile?.department || "",
      subjects: profile?.subjects || [],
      availability: profile?.availability || "",
      preferredLevel: profile?.preferredLevel || "",
      gender: profile?.gender || "",
    }),
    [profile],
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, value],
      });
    } else {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter((s) => s !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile) {
      updateVolunteer(profile._id, formData);
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!profile || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#0a1419]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-whatsapp-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Amharic",
    "Computer Science",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1419] via-[#0d1b24] to-[#0a1419] pt-20 pb-12 relative overflow-hidden">
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

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-whatsapp-green via-[#00E676] to-whatsapp-green bg-clip-text text-transparent mb-2 animate-gradient">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-lg">Your Profile Dashboard</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-whatsapp-green/20 border border-whatsapp-green rounded-xl text-whatsapp-green text-center font-semibold animate-fade-in">
            ✓ Profile updated successfully!
          </div>
        )}

        {/* Main Profile Card */}
        <div className="bg-gradient-to-br from-[#1a2730] to-[#15202b] rounded-2xl p-8 mb-6 shadow-2xl border border-gray-700/50 backdrop-blur-sm animate-scale-in hover:shadow-whatsapp-green/10 transition-all duration-500">
          {/* User Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-700/50">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-whatsapp-green to-[#00A884] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-slow"></div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-whatsapp-green via-[#00E676] to-[#00A884] flex items-center justify-center text-6xl text-white font-bold shadow-2xl ring-4 ring-whatsapp-green/30 group-hover:ring-whatsapp-green/50 transition-all duration-300 group-hover:scale-105">
                {profile?.firstName?.charAt(0).toUpperCase() ||
                  user?.name?.charAt(0).toUpperCase() ||
                  "?"}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                {profile?.firstName && profile?.middleName
                  ? `${profile.firstName} ${profile.middleName}`
                  : profile?.firstName || user?.name || "Volunteer"}
              </h2>
              <p className="text-whatsapp-green text-lg mb-3 font-medium">
                {user?.email || ""}
              </p>
              <span className="inline-block px-5 py-2 bg-gradient-to-r from-whatsapp-green/20 to-whatsapp-green/10 text-whatsapp-green rounded-full text-sm font-bold border border-whatsapp-green/50 shadow-lg shadow-whatsapp-green/20">
                🎓 Volunteer
              </span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-whatsapp-green to-[#00A884] hover:from-[#00A884] hover:to-whatsapp-green text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-whatsapp-green/30 hover:shadow-whatsapp-green/50 hover:scale-105 transform">
                <FiEdit2 className="text-lg" />
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                    placeholder="Enter your middle name"
                  />
                </div>

                {/* University */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                    University *
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                    placeholder="Enter your university name"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                    placeholder="Enter your department"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Availability
                  </label>
                  <input
                    type="text"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="e.g., June-August 2024"
                    className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                  />
                </div>

                {/* Preferred Level */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Preferred Teaching Level
                  </label>
                  <select
                    name="preferredLevel"
                    value={formData.preferredLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors">
                    <option value="">Select Level</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Preparatory">Preparatory</option>
                    <option value="Any">Any Level</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <label className="block text-gray-400 text-sm uppercase tracking-wide mb-3">
                  Subjects You Can Teach *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {subjects.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center gap-2 px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg cursor-pointer hover:border-whatsapp-green transition-colors">
                      <input
                        type="checkbox"
                        value={subject}
                        checked={formData.subjects.includes(subject)}
                        onChange={handleSubjectChange}
                        className="w-4 h-4 accent-whatsapp-green"
                      />
                      <span className="text-white text-sm">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-whatsapp-green hover:bg-[#00A884] text-white rounded-lg font-bold transition-all duration-300 shadow-lg">
                  <FiSave />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-all duration-300">
                  <FiX />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* University */}
              <div className="group bg-gradient-to-br from-[#0f1b24] to-[#0a1419] rounded-xl p-6 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/10 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-whatsapp-green/20 to-whatsapp-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-whatsapp-green/10">
                    <FiBook className="text-whatsapp-green text-2xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                      University
                    </p>
                    <p className="text-white text-lg font-bold group-hover:text-whatsapp-green transition-colors">
                      {profile.university}
                    </p>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div className="group bg-gradient-to-br from-[#0f1b24] to-[#0a1419] rounded-xl p-6 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/10 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-whatsapp-green/20 to-whatsapp-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-whatsapp-green/10">
                    <FiAward className="text-whatsapp-green text-2xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                      Department
                    </p>
                    <p className="text-white text-lg font-bold group-hover:text-whatsapp-green transition-colors">
                      {profile.department}
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              {profile.availability && (
                <div className="group bg-gradient-to-br from-[#0f1b24] to-[#0a1419] rounded-xl p-6 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/10 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-whatsapp-green/20 to-whatsapp-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-whatsapp-green/10">
                      <FiCalendar className="text-whatsapp-green text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                        Availability
                      </p>
                      <p className="text-white text-lg font-bold group-hover:text-whatsapp-green transition-colors">
                        {profile.availability}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferred Level */}
              {profile.preferredLevel && (
                <div className="group bg-gradient-to-br from-[#0f1b24] to-[#0a1419] rounded-xl p-6 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/10 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-whatsapp-green/20 to-whatsapp-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-whatsapp-green/10">
                      <FiTarget className="text-whatsapp-green text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                        Preferred Level
                      </p>
                      <p className="text-white text-lg font-bold group-hover:text-whatsapp-green transition-colors">
                        {profile.preferredLevel}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Gender */}
              {profile.gender && (
                <div className="group bg-gradient-to-br from-[#0f1b24] to-[#0a1419] rounded-xl p-6 border border-gray-700/50 hover:border-whatsapp-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-whatsapp-green/10 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-whatsapp-green/20 to-whatsapp-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-whatsapp-green/10">
                      <FiUsers className="text-whatsapp-green text-2xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                        Gender
                      </p>
                      <p className="text-white text-lg font-bold group-hover:text-whatsapp-green transition-colors">
                        {profile.gender}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Teaching Subjects Display */}
          {!isEditing && (
            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <p className="text-whatsapp-green text-sm uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-whatsapp-green rounded-full animate-pulse"></span>
                Teaching Subjects
              </p>
              <div className="flex flex-wrap gap-3">
                {(profile.subjects || []).map((subject, index) => (
                  <span
                    key={subject}
                    className="px-5 py-2.5 bg-gradient-to-r from-whatsapp-green/20 to-whatsapp-green/10 text-whatsapp-green rounded-xl text-sm font-bold border border-whatsapp-green/50 hover:bg-whatsapp-green/30 hover:scale-105 transition-all duration-300 shadow-lg shadow-whatsapp-green/10 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action - Enhanced */}
        <button
          onClick={() => navigate("/materials")}
          className="w-full bg-gradient-to-br from-[#1a2730] to-[#15202b] hover:from-[#1f2f3a] hover:to-[#1a2730] rounded-2xl p-6 shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-whatsapp-green/50 group hover:shadow-whatsapp-green/20 hover:-translate-y-1 transform">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-whatsapp-green/20 to-whatsapp-green/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-whatsapp-green/20">
                <FiBook className="text-whatsapp-green text-3xl" />
              </div>
              <div className="text-left">
                <h3 className="text-white text-xl font-black group-hover:text-whatsapp-green transition-colors">
                  Learning Materials
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Access your study resources
                </p>
              </div>
            </div>
            <div className="text-whatsapp-green text-3xl group-hover:translate-x-2 transition-transform duration-300 font-bold">
              →
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default VolunteerProfile;
