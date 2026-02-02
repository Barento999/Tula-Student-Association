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
    <div className="min-h-screen bg-[#0a1419] pt-20 pb-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-whatsapp-green mb-2">
            Welcome Back
          </h1>
          <p className="text-secondary text-lg">Your Profile Dashboard</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-whatsapp-green/20 border border-whatsapp-green rounded-xl text-whatsapp-green text-center font-semibold animate-fade-in">
            ✓ Profile updated successfully!
          </div>
        )}

        {/* Main Profile Card */}
        <div className="bg-[#1a2730] rounded-2xl p-8 mb-6 shadow-2xl">
          {/* User Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-700">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-whatsapp-green to-[#00A884] flex items-center justify-center text-6xl text-white font-bold shadow-xl ring-4 ring-whatsapp-green/30">
              {user?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {user?.name || "Volunteer"}
              </h2>
              <p className="text-whatsapp-green text-lg mb-3">
                {user?.email || ""}
              </p>
              <span className="inline-block px-4 py-2 bg-whatsapp-green/20 text-whatsapp-green rounded-full text-sm font-bold border border-whatsapp-green/50">
                🎓 Volunteer
              </span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-whatsapp-green hover:bg-[#00A884] text-white rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-whatsapp-green/50">
                <FiEdit2 />
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
              {/* First Name */}
              {profile.firstName && (
                <div className="bg-[#0f1b24] rounded-xl p-6 border border-gray-700 hover:border-whatsapp-green transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center">
                      <FiUser className="text-whatsapp-green text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">
                        First Name
                      </p>
                      <p className="text-white text-lg font-bold">
                        {profile.firstName}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Middle Name */}
              {profile.middleName && (
                <div className="bg-[#0f1b24] rounded-xl p-6 border border-gray-700 hover:border-whatsapp-green transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center">
                      <FiUser className="text-whatsapp-green text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">
                        Middle Name
                      </p>
                      <p className="text-white text-lg font-bold">
                        {profile.middleName}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* University */}
              <div className="bg-[#0f1b24] rounded-xl p-6 border border-gray-700 hover:border-whatsapp-green transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center">
                    <FiBook className="text-whatsapp-green text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">
                      University
                    </p>
                    <p className="text-white text-lg font-bold">
                      {profile.university}
                    </p>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div className="bg-[#0f1b24] rounded-xl p-6 border border-gray-700 hover:border-whatsapp-green transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center">
                    <FiAward className="text-whatsapp-green text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">
                      Department
                    </p>
                    <p className="text-white text-lg font-bold">
                      {profile.department}
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              {profile.availability && (
                <div className="bg-[#0f1b24] rounded-xl p-6 border border-gray-700 hover:border-whatsapp-green transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center">
                      <FiCalendar className="text-whatsapp-green text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">
                        Availability
                      </p>
                      <p className="text-white text-lg font-bold">
                        {profile.availability}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferred Level */}
              {profile.preferredLevel && (
                <div className="bg-[#0f1b24] rounded-xl p-6 border border-gray-700 hover:border-whatsapp-green transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center">
                      <FiTarget className="text-whatsapp-green text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">
                        Preferred Level
                      </p>
                      <p className="text-white text-lg font-bold">
                        {profile.preferredLevel}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Gender */}
              {profile.gender && (
                <div className="bg-[#0f1b24] rounded-xl p-6 border border-gray-700 hover:border-whatsapp-green transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center">
                      <FiUsers className="text-whatsapp-green text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">
                        Gender
                      </p>
                      <p className="text-white text-lg font-bold">
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
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm uppercase tracking-wide mb-4">
                Teaching Subjects
              </p>
              <div className="flex flex-wrap gap-3">
                {(profile.subjects || []).map((subject) => (
                  <span
                    key={subject}
                    className="px-4 py-2 bg-whatsapp-green/20 text-whatsapp-green rounded-lg text-sm font-semibold border border-whatsapp-green/50 hover:bg-whatsapp-green/30 transition-colors">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action - Minimized */}
        <button
          onClick={() => navigate("/materials")}
          className="w-full bg-[#1a2730] hover:bg-[#1f2f3a] rounded-xl p-4 shadow-xl transition-all duration-300 border border-gray-700 hover:border-whatsapp-green group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-whatsapp-green/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiBook className="text-whatsapp-green text-2xl" />
              </div>
              <div className="text-left">
                <h3 className="text-white text-lg font-bold group-hover:text-whatsapp-green transition-colors">
                  Learning Materials
                </h3>
              </div>
            </div>
            <div className="text-whatsapp-green text-2xl group-hover:translate-x-2 transition-transform">
              →
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default VolunteerProfile;
