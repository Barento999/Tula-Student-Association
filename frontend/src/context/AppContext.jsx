import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const savedUser = localStorage.getItem("tula_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedStudents = localStorage.getItem("tula_students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }

    const savedVolunteers = localStorage.getItem("tula_volunteers");
    if (savedVolunteers) {
      setVolunteers(JSON.parse(savedVolunteers));
    }

    const savedMaterials = localStorage.getItem("tula_materials");
    if (savedMaterials) {
      // Check if we need to update with new subjects
      const parsed = JSON.parse(savedMaterials);
      const hasAllSubjects = mockMaterials.every((mock) =>
        parsed.some((saved) => saved.subject === mock.subject),
      );

      if (!hasAllSubjects) {
        // Update with new materials
        setMaterials(mockMaterials);
        localStorage.setItem("tula_materials", JSON.stringify(mockMaterials));
      } else {
        setMaterials(parsed);
      }
    } else {
      setMaterials(mockMaterials);
    }

    const savedSessions = localStorage.getItem("tula_sessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    } else {
      setSessions(mockSessions);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("tula_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tula_user");
  };

  const registerStudent = (studentData) => {
    const newStudent = {
      id: Date.now(),
      ...studentData,
      registeredAt: new Date().toISOString(),
    };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem("tula_students", JSON.stringify(updatedStudents));
    return newStudent;
  };

  const registerVolunteer = (volunteerData) => {
    // Create user account with volunteer role
    const newUser = {
      _id: Date.now().toString(),
      name: `${volunteerData.firstName} ${volunteerData.middleName || ""} ${volunteerData.lastName}`.trim(),
      email: volunteerData.email,
      password: volunteerData.password, // In production, this should be hashed
      role: "volunteer",
      createdAt: new Date().toISOString(),
    };

    // Create volunteer profile linked to user
    const newVolunteer = {
      id: Date.now(),
      userId: newUser._id,
      firstName: volunteerData.firstName,
      middleName: volunteerData.middleName,
      lastName: volunteerData.lastName,
      phone: volunteerData.phone,
      gender: volunteerData.gender,
      university: volunteerData.university,
      department: volunteerData.department,
      subjects: volunteerData.subjects,
      availability: volunteerData.availability,
      preferredLevel: volunteerData.preferredLevel,
      registeredAt: new Date().toISOString(),
    };

    // Save volunteer profile
    const updatedVolunteers = [...volunteers, newVolunteer];
    setVolunteers(updatedVolunteers);
    localStorage.setItem("tula_volunteers", JSON.stringify(updatedVolunteers));

    // Save user account (in production, this would be handled by backend)
    const existingUsers = JSON.parse(
      localStorage.getItem("tula_users") || "[]",
    );
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("tula_users", JSON.stringify(updatedUsers));

    // Auto-login the new volunteer
    login(newUser);

    return { user: newUser, volunteer: newVolunteer };
  };

  const addMaterial = (materialData) => {
    const newMaterial = {
      id: Date.now(),
      ...materialData,
      uploadedAt: new Date().toISOString(),
    };
    const updatedMaterials = [...materials, newMaterial];
    setMaterials(updatedMaterials);
    localStorage.setItem("tula_materials", JSON.stringify(updatedMaterials));
    return newMaterial;
  };

  const addSession = (sessionData) => {
    const newSession = {
      id: Date.now(),
      ...sessionData,
      createdAt: new Date().toISOString(),
    };
    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    localStorage.setItem("tula_sessions", JSON.stringify(updatedSessions));
    return newSession;
  };

  const updateStudent = (studentId, updatedData) => {
    const updatedStudents = students.map((student) =>
      student._id === studentId || student.id === studentId
        ? { ...student, ...updatedData }
        : student,
    );
    setStudents(updatedStudents);
    localStorage.setItem("tula_students", JSON.stringify(updatedStudents));
  };

  const deleteStudent = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student._id !== studentId && student.id !== studentId,
    );
    setStudents(updatedStudents);
    localStorage.setItem("tula_students", JSON.stringify(updatedStudents));
  };

  const updateVolunteer = (volunteerId, updatedData) => {
    const updatedVolunteers = volunteers.map((volunteer) =>
      volunteer._id === volunteerId || volunteer.id === volunteerId
        ? { ...volunteer, ...updatedData }
        : volunteer,
    );
    setVolunteers(updatedVolunteers);
    localStorage.setItem("tula_volunteers", JSON.stringify(updatedVolunteers));
  };

  const deleteVolunteer = (volunteerId) => {
    const updatedVolunteers = volunteers.filter(
      (volunteer) =>
        volunteer._id !== volunteerId && volunteer.id !== volunteerId,
    );
    setVolunteers(updatedVolunteers);
    localStorage.setItem("tula_volunteers", JSON.stringify(updatedVolunteers));
  };

  const updateMaterial = (materialId, updatedData) => {
    const updatedMaterials = materials.map((material) =>
      material.id === materialId ? { ...material, ...updatedData } : material,
    );
    setMaterials(updatedMaterials);
    localStorage.setItem("tula_materials", JSON.stringify(updatedMaterials));
  };

  const deleteMaterial = (materialId) => {
    const updatedMaterials = materials.filter(
      (material) => material.id !== materialId,
    );
    setMaterials(updatedMaterials);
    localStorage.setItem("tula_materials", JSON.stringify(updatedMaterials));
  };

  const updateSession = (sessionId, updatedData) => {
    const updatedSessions = sessions.map((session) =>
      session.id === sessionId ? { ...session, ...updatedData } : session,
    );
    setSessions(updatedSessions);
    localStorage.setItem("tula_sessions", JSON.stringify(updatedSessions));
  };

  const deleteSession = (sessionId) => {
    const updatedSessions = sessions.filter(
      (session) => session.id !== sessionId,
    );
    setSessions(updatedSessions);
    localStorage.setItem("tula_sessions", JSON.stringify(updatedSessions));
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const mockSessions = [
  {
    id: 1,
    name: "Summer 2024",
    year: 2024,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    active: true,
  },
  {
    id: 2,
    name: "Summer 2023",
    year: 2023,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    active: false,
  },
  {
    id: 3,
    name: "Summer 2022",
    year: 2022,
    startDate: "2022-06-01",
    endDate: "2022-08-31",
    active: false,
  },
];

const mockMaterials = [
  {
    id: 1,
    title: "Mathematics Grade 8 - Algebra Basics",
    subject: "Mathematics",
    level: "Secondary",
    grade: "8",
    fileType: "PDF",
    uploadedBy: "Ahmed Hassan",
    session: "Summer 2024",
    sessionId: 1,
    description: "Introduction to algebraic expressions and equations",
  },
  {
    id: 2,
    title: "English Grammar - Tenses",
    subject: "English",
    level: "Elementary",
    grade: "6",
    fileType: "PDF",
    uploadedBy: "Fatima Ali",
    session: "Summer 2024",
    sessionId: 1,
    description: "Complete guide to English tenses with exercises",
  },
  {
    id: 3,
    title: "Afaan Oromoo - Basic Grammar",
    subject: "Afaan Oromoo",
    level: "Elementary",
    grade: "5",
    fileType: "PDF",
    uploadedBy: "Chaltu Bekele",
    session: "Summer 2024",
    sessionId: 1,
    description: "Introduction to Afaan Oromoo grammar and vocabulary",
  },
  {
    id: 4,
    title: "Physics - Motion and Forces",
    subject: "Physics",
    level: "Preparatory",
    grade: "11",
    fileType: "PPT",
    uploadedBy: "Mohammed Ibrahim",
    session: "Summer 2024",
    sessionId: 1,
    description: "Understanding Newton's laws and motion",
  },
  {
    id: 5,
    title: "Chemistry - Periodic Table",
    subject: "Chemistry",
    level: "Secondary",
    grade: "9",
    fileType: "PDF",
    uploadedBy: "Sara Ahmed",
    session: "Summer 2024",
    sessionId: 1,
    description: "Elements, groups, and periodic trends",
  },
  {
    id: 6,
    title: "Biology - Cell Structure",
    subject: "Biology",
    level: "Secondary",
    grade: "8",
    fileType: "DOC",
    uploadedBy: "Omar Khalil",
    session: "Summer 2024",
    sessionId: 1,
    description: "Plant and animal cell structures",
  },
  {
    id: 7,
    title: "History - Ancient Civilizations",
    subject: "History",
    level: "Secondary",
    grade: "7",
    fileType: "PDF",
    uploadedBy: "Yusuf Ahmed",
    session: "Summer 2024",
    sessionId: 1,
    description: "Study of ancient civilizations and their contributions",
  },
  {
    id: 8,
    title: "Geography - Climate and Weather",
    subject: "Geography",
    level: "Elementary",
    grade: "6",
    fileType: "PPT",
    uploadedBy: "Amina Hassan",
    session: "Summer 2024",
    sessionId: 1,
    description: "Understanding climate zones and weather patterns",
  },
  {
    id: 9,
    title: "Economics - Supply and Demand",
    subject: "Economics",
    level: "Preparatory",
    grade: "11",
    fileType: "PDF",
    uploadedBy: "Ibrahim Ali",
    session: "Summer 2024",
    sessionId: 1,
    description: "Basic economic principles and market dynamics",
  },
  {
    id: 10,
    title: "Agriculture - Crop Production",
    subject: "Agriculture",
    level: "Secondary",
    grade: "9",
    fileType: "PDF",
    uploadedBy: "Abdi Mohammed",
    session: "Summer 2024",
    sessionId: 1,
    description: "Modern farming techniques and crop management",
  },
  {
    id: 11,
    title: "Mathematics Grade 10 - Geometry",
    subject: "Mathematics",
    level: "Secondary",
    grade: "10",
    fileType: "PDF",
    uploadedBy: "Ahmed Hassan",
    session: "Summer 2023",
    sessionId: 2,
    description: "Triangles, circles, and geometric proofs",
  },
  {
    id: 12,
    title: "English Literature - Short Stories",
    subject: "English",
    level: "Preparatory",
    grade: "12",
    fileType: "DOC",
    uploadedBy: "Fatima Ali",
    session: "Summer 2023",
    sessionId: 2,
    description: "Analysis of classic and contemporary short stories",
  },
];
