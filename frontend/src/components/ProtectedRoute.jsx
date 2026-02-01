import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useApp();

  if (!user) {
    // Redirect to student login if not authenticated
    return <Navigate to="/student-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
