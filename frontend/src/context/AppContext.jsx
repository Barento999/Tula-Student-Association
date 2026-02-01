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
    const newVolunteer = {
      id: Date.now(),
      ...volunteerData,
      registeredAt: new Date().toISOString(),
    };
    const updatedVolunteers = [...volunteers, newVolunteer];
    setVolunteers(updatedVolunteers);
    localStorage.setItem("tula_volunteers", JSON.stringify(updatedVolunteers));
    return newVolunteer;
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

  const value = {
    user,
    login,
    logout,
    students,
    registerStudent,
    volunteers,
    registerVolunteer,
    materials,
    addMaterial,
    sessions,
    addSession,
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
