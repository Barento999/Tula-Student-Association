import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useApp();
  const location = useLocation();

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

  if (!user) {
    // Save the location they were trying to access
    return (
      <Navigate
        to="/student-login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
