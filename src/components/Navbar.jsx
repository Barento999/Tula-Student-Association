import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <img
              src="/tulas-logos.png"
              alt="Tula Students Association Logo"
              className="brand-logo"
            />
            <span className="brand-text">Tula Students Association</span>
          </Link>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
            <Link to="/programs" onClick={closeMenu}>
              Programs
            </Link>
            <Link to="/materials" onClick={closeMenu}>
              Materials
            </Link>
            <Link to="/volunteer" onClick={closeMenu}>
              Volunteer
            </Link>
            <Link to="/gallery" onClick={closeMenu}>
              Gallery
            </Link>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>

            <div className="navbar-auth">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link to="/admin" onClick={closeMenu} className="nav-admin">
                      Admin
                    </Link>
                  )}
                  {user.role === "student" && (
                    <Link to="/student-dashboard" onClick={closeMenu}>
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="nav-logout">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/student-registration"
                    onClick={closeMenu}
                    className="nav-register">
                    Registration
                  </Link>
                  <Link to="/admin" onClick={closeMenu} className="nav-login">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
