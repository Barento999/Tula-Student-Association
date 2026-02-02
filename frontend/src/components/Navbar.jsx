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
    <>
      <nav className="bg-main border-b-2 border-whatsapp-green py-4 sticky top-0 z-[10000] w-full backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        {/* Floating green dots background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-whatsapp-green/30 rounded-full animate-float blur-sm"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}></div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center gap-4 max-md:px-5 relative z-10">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-text-primary no-underline flex-shrink-0 transition-transform duration-300 hover:scale-105"
            onClick={closeMenu}>
            <img
              src="/tulas-logos.png"
              alt="Tula Students Association Logo"
              className="w-12 h-12 md:w-10 md:h-10 flex-shrink-0 rounded-full object-cover shadow-[0_2px_8px_rgba(37,211,102,0.2)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(37,211,102,0.4)]"
            />
            <div className="flex flex-col leading-tight md:block">
              <span className="text-lg md:text-xl font-bold">
                Tula Students
              </span>
              <span className="text-lg md:text-xl font-bold md:before:content-['\00a0'] md:inline">
                Association
              </span>
            </div>
          </Link>

          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 bg-transparent border-2 border-whatsapp-green rounded-lg p-3 cursor-pointer z-[10001] hover:bg-whatsapp-green/10 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu">
            <span
              className={`w-6 h-0.5 bg-whatsapp-green rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span
              className={`w-6 h-0.5 bg-whatsapp-green rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
            <span
              className={`w-6 h-0.5 bg-whatsapp-green rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
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
                className={({ isActive }) =>
                  `relative px-1 py-2 text-[17px] font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-whatsapp-green font-semibold after:w-full"
                      : "text-text-secondary hover:text-whatsapp-green"
                  } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:bg-whatsapp-green after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full ${
                    isActive ? "" : "after:w-0"
                  }`
                }>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-whatsapp-green font-medium transition-colors duration-300">
                    Admin
                  </Link>
                )}
                {user.role === "student" && (
                  <>
                    <Link
                      to="/student-profile"
                      className="text-text-secondary font-medium transition-colors duration-300 hover:text-whatsapp-green">
                      Profile
                    </Link>
                    <Link
                      to="/student-profile"
                      className="text-text-secondary font-medium transition-colors duration-300 hover:text-whatsapp-green">
                      Profile
                    </Link>
                  </>
                )}
                {user.role === "volunteer" && (
                  <Link
                    to="/volunteer-profile"
                    className="text-text-secondary font-medium transition-colors duration-300 hover:text-whatsapp-green">
                    Profile
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-transparent text-text-secondary border-2 border-border-color rounded-lg font-medium text-base transition-all duration-300 hover:bg-bg-main hover:text-text-primary hover:border-red-400 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,107,107,0.2)]">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/student-login"
                  className="px-5 py-2.5 bg-whatsapp-green text-bg-main rounded-lg font-semibold text-base transition-all duration-300 shadow-[0_2px_8px_rgba(37,211,102,0.3)] hover:bg-unread-badge hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(37,211,102,0.4)]">
                  Login
                </Link>
                <Link
                  to="/student-registration"
                  className="px-5 py-2.5 bg-transparent text-text-secondary border-2 border-border-color rounded-lg font-semibold text-base transition-all duration-300 hover:bg-bg-main hover:text-text-primary hover:border-whatsapp-green hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(37,211,102,0.2)]">
                  Registration
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay styled like image */}
      <div
        className={`md:hidden fixed inset-0 bg-[#0a0f0d]/95 backdrop-blur-sm flex-col transition-all duration-300 z-[99999] ${
          isOpen ? "flex opacity-100" : "hidden opacity-0"
        }`}>
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-whatsapp-green/30">
          <div className="flex items-center gap-3">
            <img
              src="/tulas-logos.png"
              alt="Tula Students Association Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-primary">
                TULA STUDENTS
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-12 h-12 flex items-center justify-center border-2 border-whatsapp-green rounded-lg text-whatsapp-green hover:bg-whatsapp-green/10 transition-colors duration-300"
            aria-label="Close menu">
            <span className="text-3xl">×</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "HOME" },
              { to: "/about", label: "ABOUT" },
              { to: "/programs", label: "PROGRAMS" },
              { to: "/materials", label: "MATERIALS" },
              { to: "/volunteer", label: "VOLUNTEER" },
              { to: "/gallery", label: "GALLERY" },
              { to: "/contact", label: "CONTACT" },
            ].map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-left text-xl font-bold py-4 px-6 rounded-lg transition-all duration-300 uppercase tracking-wide ${
                    isActive
                      ? "text-whatsapp-green bg-whatsapp-green/10"
                      : "text-primary hover:text-whatsapp-green hover:bg-whatsapp-green/5"
                  }`
                }
                style={{
                  animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                }}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Auth Buttons at Bottom */}
        <div className="p-6 border-t border-whatsapp-green/30">
          {user ? (
            <div className="flex flex-col gap-3">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="text-lg text-center font-bold py-3 bg-whatsapp-green text-main rounded-lg hover:bg-unread-badge transition-all duration-300">
                  Admin Dashboard
                </Link>
              )}
              {user.role === "student" && (
                <Link
                  to="/student-profile"
                  onClick={closeMenu}
                  className="text-lg text-center font-bold py-3 bg-whatsapp-green text-main rounded-lg hover:bg-unread-badge transition-all duration-300">
                  My Profile
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-lg text-center font-bold py-3 border-2 border-red-400 text-red-400 rounded-lg hover:bg-red-400 hover:text-main transition-all duration-300">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/student-login"
                onClick={closeMenu}
                className="flex-1 text-lg text-center font-bold py-3 text-whatsapp-green hover:text-primary transition-all duration-300">
                LOGIN
              </Link>
              <Link
                to="/student-registration"
                onClick={closeMenu}
                className="flex-1 text-lg text-center font-bold py-3 border-2 border-whatsapp-green text-whatsapp-green rounded-full hover:bg-whatsapp-green hover:text-main transition-all duration-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
