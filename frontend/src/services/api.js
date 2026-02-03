// API Service for backend communication
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
  const user = localStorage.getItem("tula_user");
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiCall("/auth/profile"),
};

// Students API
export const studentsAPI = {
  getAll: () => apiCall("/students"),

  getById: (id) => apiCall(`/students/${id}`),

  getMyProfile: () => apiCall("/students/me"),

  create: (studentData) =>
    apiCall("/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    }),

  update: (id, studentData) =>
    apiCall(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(studentData),
    }),

  delete: (id) =>
    apiCall(`/students/${id}`, {
      method: "DELETE",
    }),
};

// Volunteers API
export const volunteersAPI = {
  getAll: () => apiCall("/volunteers"),

  getById: (id) => apiCall(`/volunteers/${id}`),

  getMyProfile: () => apiCall("/volunteers/me"),

  create: (volunteerData) =>
    apiCall("/volunteers", {
      method: "POST",
      body: JSON.stringify(volunteerData),
    }),

  update: (id, volunteerData) =>
    apiCall(`/volunteers/${id}`, {
      method: "PUT",
      body: JSON.stringify(volunteerData),
    }),

  delete: (id) =>
    apiCall(`/volunteers/${id}`, {
      method: "DELETE",
    }),
};

// Materials API
export const materialsAPI = {
  getAll: () => apiCall("/materials"),

  getById: (id) => apiCall(`/materials/${id}`),

  create: (materialData) => {
    // Check if materialData is FormData (for file uploads)
    if (materialData instanceof FormData) {
      const token = getAuthToken();
      return fetch(`${API_URL}/materials/upload`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: materialData,
      }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Upload failed");
        }
        return data;
      });
    }
    // Regular JSON upload
    return apiCall("/materials/upload", {
      method: "POST",
      body: JSON.stringify(materialData),
    });
  },

  update: (id, materialData) => {
    // Check if materialData is FormData (for file uploads)
    if (materialData instanceof FormData) {
      const token = getAuthToken();
      return fetch(`${API_URL}/materials/${id}`, {
        method: "PUT",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: materialData,
      }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Update failed");
        }
        return data;
      });
    }
    // Regular JSON update
    return apiCall(`/materials/${id}`, {
      method: "PUT",
      body: JSON.stringify(materialData),
    });
  },

  delete: (id) =>
    apiCall(`/materials/${id}`, {
      method: "DELETE",
    }),
};

// Sessions API
export const sessionsAPI = {
  getAll: () => apiCall("/sessions"),

  getById: (id) => apiCall(`/sessions/${id}`),

  create: (sessionData) =>
    apiCall("/sessions", {
      method: "POST",
      body: JSON.stringify(sessionData),
    }),

  update: (id, sessionData) =>
    apiCall(`/sessions/${id}`, {
      method: "PUT",
      body: JSON.stringify(sessionData),
    }),

  delete: (id) =>
    apiCall(`/sessions/${id}`, {
      method: "DELETE",
    }),

  setActive: (id) =>
    apiCall(`/sessions/${id}/activate`, {
      method: "PUT",
    }),
};

// Activities API
export const activitiesAPI = {
  getAll: () => apiCall("/activities"),

  getById: (id) => apiCall(`/activities/${id}`),

  create: (activityData) =>
    apiCall("/activities", {
      method: "POST",
      body: JSON.stringify(activityData),
    }),

  update: (id, activityData) =>
    apiCall(`/activities/${id}`, {
      method: "PUT",
      body: JSON.stringify(activityData),
    }),

  delete: (id) =>
    apiCall(`/activities/${id}`, {
      method: "DELETE",
    }),
};

// Donations API
export const donationsAPI = {
  getAll: () => apiCall("/donations"),

  getById: (id) => apiCall(`/donations/${id}`),

  create: (donationData) =>
    apiCall("/donations", {
      method: "POST",
      body: JSON.stringify(donationData),
    }),

  update: (id, donationData) =>
    apiCall(`/donations/${id}`, {
      method: "PUT",
      body: JSON.stringify(donationData),
    }),

  delete: (id) =>
    apiCall(`/donations/${id}`, {
      method: "DELETE",
    }),
};

export default {
  auth: authAPI,
  students: studentsAPI,
  volunteers: volunteersAPI,
  materials: materialsAPI,
  sessions: sessionsAPI,
  activities: activitiesAPI,
  donations: donationsAPI,
};
