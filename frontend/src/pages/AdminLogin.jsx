import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FiLogIn } from "react-icons/fi";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call backend API to login
      await login({
        email: credentials.username, // Backend expects email field
        password: credentials.password,
      });

      // Redirect to admin dashboard on success
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-[520px]">
        <div className="bg-card border border-border rounded-xl p-12 max-md:p-8">
          <div className="text-center mb-8">
            <div className="text-[64px] mb-4">🔐</div>
            <h1 className="text-[28px] text-primary mb-2">Admin Login</h1>
            <p className="text-base text-secondary">
              Tula Students Association
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[rgba(255,107,107,0.1)] border border-[#ff6b6b] text-[#ff6b6b] px-4 py-3 rounded-lg mb-5 text-center text-sm">
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="admin@tula.org"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="form-input h-12 bg-main/50 border-2 border-border/50 rounded-xl focus:border-whatsapp-green focus:bg-main focus:shadow-[0_0_20px_rgba(37,211,102,0.2)] transition-all duration-300"
                required
                placeholder="Enter password"
              />
            </div>

            <div className="text-right mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-whatsapp-green hover:text-primary transition-colors duration-300">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full flex items-center justify-center gap-2">
              <FiLogIn className="w-5 h-5" />
              Login
            </button>

            <div className="mt-6 p-4 bg-main border border-border rounded-lg text-center">
              <p className="text-sm text-secondary my-1">
                <strong className="text-primary">Create Admin Account:</strong>
              </p>
              <p className="text-xs text-secondary my-1">
                See CREATE_ADMIN.md for instructions
              </p>
              <p className="text-xs text-whatsapp-green my-1">
                Default: admin@tula.org / admin123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
