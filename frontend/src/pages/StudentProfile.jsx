import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import api from "../services/api";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiMapPin,
  FiBook,
  FiUser,
  FiPhone,
  FiAward,
  FiUsers,
} from "react-icons/fi";

function StudentProfile() {
  const { user, updateStudent, loading } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    school: "",
    gradeLevel: "",
    grade: "",
    subjectInterests: [],
    guardianName: "",
    phone: "",
    gender: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      // Wait for AppContext to finish loading
      if (loading) return;

      // After loading is complete, check if user exists and has correct role
      if (!user) {
        navigate("/student-login");
        return;
      }

      if (user.role !== "student") {
        navigate("/student-login");
        return;
      }

      try {
        setLoadingProfile(true);
        // Fetch current user's profile only
        const studentProfile = await api.students.getMyProfile();

        if (studentProfile) {
          setProfile(studentProfile);
          setFormData({
            firstName: studentProfile.firstName || "",
            middleName: studentProfile.middleName || "",
            lastName: studentProfile.lastName || "",
            school: studentProfile.school || "",
            gradeLevel: studentProfile.gradeLevel || "",
            grade: studentProfile.grade || "",
            subjectInterests: studentProfile.subjectInterests || [],
            guardianName: studentProfile.guardianName || "",
            phone: studentProfile.phone || "",
            gender: studentProfile.gender || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // If profile not found, show message
        if (error.message.includes("not found")) {
          alert(
            "Your profile was not found. Please contact support or register again.",
          );
          navigate("/student-registration");
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user, navigate, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        subjectInterests: [...formData.subjectInterests, value],
      });
    } else {
      setFormData({
        ...formData,
        subjectInterests: formData.subjectInterests.filter((s) => s !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profile) {
      try {
        // Update student in database
        const updated = await updateStudent(profile._id, formData);

        // Update local profile state with the returned data
        setProfile(updated);

        setShowSuccess(true);
        setIsEditing(false);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  if (loading || loadingProfile || !profile || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#0d1b24]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-whatsapp-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading profile...</p>
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
    <div className="min-h-screen bg-[#0d1b24] pt-20 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-whatsapp-green mb-2">
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
        <div className="bg-[#1a2730] rounded-2xl border border-whatsapp-green/30 shadow-2xl overflow-hidden mb-6">
          {/* Profile Header - Responsive Layout */}
          <div className="relative bg-gradient-to-r from-[#1a2730] to-[#15202b] p-6 md:p-8 border-b border-gray-700/50">
            {/* Edit Button - Top Right */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 bg-whatsapp-green/10 hover:bg-whatsapp-green/20 text-whatsapp-green rounded-lg transition-all duration-300 border border-whatsapp-green/30 z-10">
                <FiEdit2 className="text-lg" />
              </button>
            )}

            {/* Mobile: Centered Layout, Desktop: Horizontal Layout */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-whatsapp-green rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-whatsapp-green to-[#00A884] flex items-center justify-center text-4xl md:text-5xl text-white font-bold shadow-2xl ring-4 ring-whatsapp-green/40">
                  {profile?.firstName?.charAt(0).toUpperCase() ||
                    user?.name?.charAt(0).toUpperCase() ||
                    "?"}
                </div>
              </div>

              {/* Profile Info - Centered on mobile, left-aligned on desktop */}
              <div className="flex-1 text-center md:text-left">
                {/* Name */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {profile?.firstName && profile?.middleName
                    ? `${profile.firstName} ${profile.middleName}`
                    : profile?.firstName || user?.name || "Student"}
                </h2>

                {/* Email */}
                <p className="text-whatsapp-green text-base md:text-lg mb-3 md:mb-4 font-medium">
                  {user?.email || ""}
                </p>

                {/* Role Badge */}
                <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 bg-whatsapp-green/10 border-2 border-whatsapp-green/50 rounded-full">
                  <span className="w-2.5 h-2.5 bg-whatsapp-green rounded-full animate-pulse"></span>
                  <span className="text-white font-bold text-xs md:text-sm uppercase tracking-wide">
                    Student
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
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

                  {/* Last Name */}
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>

                  {/* School */}
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                      School Name *
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                      placeholder="Enter your school name"
                    />
                  </div>

                  {/* Grade Level */}
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                      Grade Level *
                    </label>
                    <select
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors">
                      <option value="">Select Level</option>
                      <option value="Elementary">
                        Elementary (Grades 1-6)
                      </option>
                      <option value="Secondary">Secondary (Grades 7-9)</option>
                      <option value="Preparatory">
                        Preparatory (Grades 10-12)
                      </option>
                    </select>
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                      Current Grade
                    </label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      placeholder="e.g., Grade 8"
                      className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Guardian Name */}
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                      Parent/Guardian Name
                    </label>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                      placeholder="Enter guardian name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-400 text-sm uppercase tracking-wide mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+251 9XX XXX XXX"
                      className="w-full px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg text-white focus:border-whatsapp-green focus:outline-none transition-colors"
                    />
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

                {/* Subject Interests */}
                <div>
                  <label className="block text-gray-400 text-sm uppercase tracking-wide mb-3">
                    Subject Interests *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {subjects.map((subject) => (
                      <label
                        key={subject}
                        className="flex items-center gap-2 px-4 py-3 bg-[#0f1b24] border border-gray-700 rounded-lg cursor-pointer hover:border-whatsapp-green transition-colors">
                        <input
                          type="checkbox"
                          value={subject}
                          checked={formData.subjectInterests.includes(subject)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Info Cards - Best Order */}

                {/* Phone */}
                {profile.phone && (
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiPhone className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          Phone
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {profile.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Gender */}
                {profile.gender && (
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiUsers className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          Gender
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {profile.gender}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guardian */}
                {profile.guardianName && (
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiUser className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          Guardian
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {profile.guardianName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* School (ZONE) */}
                {profile.school && (
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          ZONE
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {profile.school}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grade Level (WOREDA) */}
                {profile.gradeLevel && (
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiAward className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          WOREDA
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {profile.gradeLevel}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Grade (COLLEGE) */}
                {profile.grade && (
                  <div className="bg-[#0f1b24] rounded-xl p-5 border border-gray-700/50 hover:border-whatsapp-green/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiBook className="text-whatsapp-green text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-1">
                          COLLEGE
                        </p>
                        <p className="text-white text-lg font-bold truncate">
                          {profile.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subject Interests */}
                {profile.subjectInterests &&
                  profile.subjectInterests.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-700/50">
                      <p className="text-whatsapp-green text-xs uppercase tracking-wider font-semibold mb-4">
                        Subject Interests
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.subjectInterests.map((subject) => (
                          <span
                            key={subject}
                            className="px-4 py-2 bg-whatsapp-green/10 text-whatsapp-green rounded-lg text-sm font-semibold border border-whatsapp-green/30">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* Learning Materials Button */}
        <button
          onClick={() => navigate("/materials")}
          className="w-full mt-6 bg-[#1a2730] hover:bg-[#1f2f3a] rounded-xl p-5 border border-whatsapp-green/30 hover:border-whatsapp-green/50 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-whatsapp-green/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiBook className="text-whatsapp-green text-2xl" />
              </div>
              <span className="text-white text-lg font-bold group-hover:text-whatsapp-green transition-colors">
                Learning Materials
              </span>
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

export default StudentProfile;
