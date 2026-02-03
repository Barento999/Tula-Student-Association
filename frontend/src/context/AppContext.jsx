import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize - Load user from localStorage and fetch data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for saved user
        const savedUser = localStorage.getItem("tula_user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);

          // Only fetch admin-level data if user is admin
          if (userData.role === "admin") {
            Promise.all([
              fetchStudents(),
              fetchVolunteers(),
              fetchMaterials(),
              fetchSessions(),
            ]).catch((err) => console.error("Error fetching admin data:", err));
          }
        }
      } catch (error) {
        console.error("Initialization error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Fetch functions
  const fetchStudents = async () => {
    try {
      const data = await api.students.getAll();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const data = await api.volunteers.getAll();
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const data = await api.materials.getAll();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchSessions = async () => {
    try {
      const data = await api.sessions.getAll();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  // Auth functions
  const login = async (credentials) => {
    try {
      const data = await api.auth.login(credentials);
      setUser(data);
      localStorage.setItem("tula_user", JSON.stringify(data));

      // Fetch data in background (only for admin) - don't wait for it
      if (data.role === "admin") {
        Promise.all([
          fetchStudents(),
          fetchVolunteers(),
          fetchMaterials(),
          fetchSessions(),
        ]).catch((err) => console.error("Error fetching admin data:", err));
      }

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setStudents([]);
    setVolunteers([]);
    setMaterials([]);
    setSessions([]);
    localStorage.removeItem("tula_user");
  };

  // Student functions
  const registerStudent = async (studentData) => {
    try {
      // Backend handles both user and profile creation
      const registrationData = {
        name: `${studentData.firstName} ${studentData.middleName || ""} ${studentData.lastName}`.trim(),
        email: studentData.email,
        password: studentData.password,
        firstName: studentData.firstName,
        middleName: studentData.middleName || "",
        lastName: studentData.lastName,
        phone: studentData.phone,
        gender: studentData.gender,
        school: studentData.schoolName,
        gradeLevel: studentData.level,
        grade: studentData.grade,
        guardianName: studentData.guardianName,
        subjectInterests: studentData.subjectInterests || [],
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/students/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Update local state
      await fetchStudents();

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateStudent = async (studentId, updatedData) => {
    try {
      const updated = await api.students.update(studentId, updatedData);
      setStudents(
        students.map((student) =>
          student._id === studentId ? updated : student,
        ),
      );
      return updated;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await api.students.delete(studentId);
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Volunteer functions
  const registerVolunteer = async (volunteerData) => {
    try {
      // Backend handles both user and profile creation
      const registrationData = {
        name: `${volunteerData.firstName} ${volunteerData.middleName || ""} ${volunteerData.lastName}`.trim(),
        email: volunteerData.email,
        password: volunteerData.password,
        firstName: volunteerData.firstName,
        middleName: volunteerData.middleName || "",
        lastName: volunteerData.lastName,
        phone: volunteerData.phone,
        gender: volunteerData.gender,
        university: volunteerData.university,
        department: volunteerData.department,
        subjects: volunteerData.subjects || [],
        availability: volunteerData.availability,
        preferredLevel: volunteerData.preferredLevel,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/volunteers/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Auto-login the new volunteer
      if (data.user && data.user.token) {
        setUser(data.user);
        localStorage.setItem("tula_user", JSON.stringify(data.user));
      }

      // Update local state
      await fetchVolunteers();

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateVolunteer = async (volunteerId, updatedData) => {
    try {
      const updated = await api.volunteers.update(volunteerId, updatedData);
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer._id === volunteerId ? updated : volunteer,
        ),
      );
      return updated;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteVolunteer = async (volunteerId) => {
    try {
      await api.volunteers.delete(volunteerId);
      setVolunteers(
        volunteers.filter((volunteer) => volunteer._id !== volunteerId),
      );
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Material functions
  const addMaterial = async (materialData) => {
    try {
      const material = await api.materials.create(materialData);
      setMaterials([...materials, material]);
      return material;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateMaterial = async (materialId, updatedData) => {
    try {
      const updated = await api.materials.update(materialId, updatedData);
      setMaterials(
        materials.map((material) =>
          material._id === materialId ? updated : material,
        ),
      );
      return updated;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteMaterial = async (materialId) => {
    try {
      await api.materials.delete(materialId);
      setMaterials(materials.filter((material) => material._id !== materialId));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Session functions
  const addSession = async (sessionData) => {
    try {
      const session = await api.sessions.create(sessionData);
      setSessions([...sessions, session]);
      return session;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateSession = async (sessionId, updatedData) => {
    try {
      const updated = await api.sessions.update(sessionId, updatedData);
      setSessions(
        sessions.map((session) =>
          session._id === sessionId ? updated : session,
        ),
      );
      return updated;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await api.sessions.delete(sessionId);
      setSessions(sessions.filter((session) => session._id !== sessionId));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    students,
    registerStudent,
    updateStudent,
    deleteStudent,
    volunteers,
    registerVolunteer,
    updateVolunteer,
    deleteVolunteer,
    materials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    sessions,
    addSession,
    updateSession,
    deleteSession,
    loading,
    error,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
