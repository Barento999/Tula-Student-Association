import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/programs" onClick={closeMenu}>
            Programs
          </NavLink>
          <NavLink to="/materials" onClick={closeMenu}>
            Materials
          </NavLink>
          <NavLink to="/volunteer" onClick={closeMenu}>
            Volunteer
          </NavLink>
          <NavLink to="/gallery" onClick={closeMenu}>
            Gallery
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </div>

        <div className={`navbar-auth ${isOpen ? "active" : ""}`}>
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
              <Link to="/admin" onClick={closeMenu} className="nav-login">
                Login
              </Link>
              <Link
                to="/student-registration"
                onClick={closeMenu}
                className="nav-register">
                Registration
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
