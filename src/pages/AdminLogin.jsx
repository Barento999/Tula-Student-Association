import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, login } = useApp();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (user && user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication - in real app, this would call an API
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      login({
        id: "admin-1",
        username: credentials.username,
        role: "admin",
        fullName: "Administrator",
      });
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h1>Admin Login</h1>
            <p>Tula Students Association</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-banner">{error}</div>}

            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Login
            </button>

            <div className="demo-credentials">
              <p>
                <strong>Demo Credentials:</strong>
              </p>
              <p>Username: admin</p>
              <p>Password: admin123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
