import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

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
    <nav className="bg-card-bg border-b border-border-color py-4 sticky top-0 z-[1000] w-full backdrop-blur-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center gap-10 max-md:px-5">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold text-text-primary no-underline flex-shrink-0 transition-transform duration-300 hover:scale-105"
          onClick={closeMenu}>
          <img
            src="/tulas-logos.png"
            alt="Tula Students Association Logo"
            className="w-10 h-10 flex-shrink-0 rounded-full object-cover shadow-[0_2px_8px_rgba(37,211,102,0.2)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(37,211,102,0.4)]"
          />
          <span className="max-md:text-base">Tula Students Association</span>
        </Link>

        <button
          className="hidden max-md:flex flex-col gap-1 bg-transparent border-none p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu">
          <span className="w-[25px] h-[3px] bg-text-primary rounded-sm transition-all duration-300"></span>
          <span className="w-[25px] h-[3px] bg-text-primary rounded-sm transition-all duration-300"></span>
          <span className="w-[25px] h-[3px] bg-text-primary rounded-sm transition-all duration-300"></span>
        </button>

        <div
          className={`flex items-center gap-6 flex-1 justify-center max-md:absolute max-md:top-full max-md:left-0 max-md:right-0 max-md:bg-card-bg max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:p-0 max-md:overflow-hidden max-md:transition-[max-height] max-md:duration-300 max-md:border-b max-md:border-border-color ${isOpen ? "max-md:max-h-[400px] max-md:relative max-md:border-b-0" : "max-md:max-h-0"}`}>
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/programs", label: "Programs" },
            { to: "/materials", label: "Materials" },
            { to: "/volunteer", label: "Volunteer" },
            { to: "/gallery", label: "Gallery" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `relative px-1 py-2 text-[17px] font-medium transition-all duration-300 whitespace-nowrap max-md:px-5 max-md:py-4 max-md:border-b max-md:border-border-color max-md:text-left max-md:w-full ${
                  isActive
                    ? "text-whatsapp-green font-semibold after:w-full"
                    : "text-text-secondary hover:text-whatsapp-green"
                } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:bg-whatsapp-green after:transition-all after:duration-300 after:-translate-x-1/2 max-md:after:hidden hover:after:w-full ${
                  isActive ? "" : "after:w-0"
                }`
              }>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div
          className={`flex items-center gap-4 flex-shrink-0 max-md:absolute max-md:top-full max-md:left-0 max-md:right-0 max-md:bg-card-bg max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:p-0 max-md:overflow-hidden max-md:transition-[max-height] max-md:duration-300 max-md:border-b max-md:border-border-color ${isOpen ? "max-md:max-h-[200px] max-md:relative max-md:border-b-0" : "max-md:max-h-0"}`}>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="text-whatsapp-green font-medium transition-colors duration-300 max-md:px-5 max-md:py-4 max-md:border-b max-md:border-border-color max-md:text-left max-md:w-full">
                  Admin
                </Link>
              )}
              {user.role === "student" && (
                <Link
                  to="/student-dashboard"
                  onClick={closeMenu}
                  className="text-text-secondary font-medium transition-colors duration-300 hover:text-whatsapp-green max-md:px-5 max-md:py-4 max-md:border-b max-md:border-border-color max-md:text-left max-md:w-full">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-transparent text-text-secondary border-2 border-border-color rounded-lg font-medium text-base transition-all duration-300 hover:bg-bg-main hover:text-text-primary hover:border-red-400 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,107,107,0.2)] max-md:rounded-none max-md:border-none max-md:border-b max-md:border-border-color max-md:transform-none max-md:hover:transform-none max-md:px-5 max-md:py-4 max-md:text-left max-md:w-full">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/admin"
                onClick={closeMenu}
                className="px-5 py-2.5 bg-whatsapp-green text-bg-main rounded-lg font-semibold text-base transition-all duration-300 shadow-[0_2px_8px_rgba(37,211,102,0.3)] hover:bg-unread-badge hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(37,211,102,0.4)] max-md:rounded-none max-md:border-none max-md:border-b max-md:border-border-color max-md:px-5 max-md:py-4 max-md:text-left max-md:w-full max-md:transform-none max-md:hover:transform-none">
                Login
              </Link>
              <Link
                to="/student-registration"
                onClick={closeMenu}
                className="px-5 py-2.5 bg-transparent text-text-secondary border-2 border-border-color rounded-lg font-semibold text-base transition-all duration-300 hover:bg-bg-main hover:text-text-primary hover:border-whatsapp-green hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(37,211,102,0.2)] max-md:rounded-none max-md:border-none max-md:border-b max-md:border-border-color max-md:px-5 max-md:py-4 max-md:text-left max-md:w-full max-md:transform-none max-md:hover:transform-none">
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
