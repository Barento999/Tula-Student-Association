import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";

const Footer = () => {
  const [particles] = useState(() =>
    [...Array(10)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

  return (
    <footer className="bg-gradient-to-br from-card via-main to-[#0d1821] border-t border-border py-12 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-whatsapp-green/5 via-transparent to-unread-badge/5 animate-gradient bg-[length:200%_200%]"></div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-unread-badge/10 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-whatsapp-green/5 rounded-full blur-[150px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-whatsapp-green/20 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}></div>
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <h3 className="text-primary mb-3 text-xl font-bold">
              Tula Students Association
            </h3>
            <p className="text-secondary leading-relaxed">
              Empowering education in Tula Village through summer volunteer
              programs.
            </p>
          </div>

          {/* Quick Links and For Students - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Quick Links */}
            <div
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <h4 className="text-primary mb-4 text-base font-semibold">
                Quick Links
              </h4>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-secondary transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                  About Us
                </Link>
                <Link
                  to="/programs"
                  className="block text-secondary transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                  Programs
                </Link>
                <Link
                  to="/volunteer"
                  className="block text-secondary transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                  Become a Volunteer
                </Link>
                <Link
                  to="/contact"
                  className="block text-secondary transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                  Contact
                </Link>
              </div>
            </div>

            {/* For Students */}
            <div
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <h4 className="text-primary mb-4 text-base font-semibold">
                For Students
              </h4>
              <div className="space-y-2">
                <Link
                  to="/student-registration"
                  className="block text-secondary transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                  Register
                </Link>
                <Link
                  to="/materials"
                  className="block text-secondary transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                  Learning Materials
                </Link>
                <Link
                  to="/student-dashboard"
                  className="block text-secondary transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                  Student Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <h4 className="text-primary mb-4 text-base font-semibold">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-secondary hover:text-whatsapp-green transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                <FiFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-secondary hover:text-whatsapp-green transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                <FiTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-secondary hover:text-whatsapp-green transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                <FiInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-secondary hover:text-whatsapp-green transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                <FiMail className="w-6 h-6" />
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-secondary text-sm group">
                <FiMapPin className="w-4 h-4 text-whatsapp-green group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">
                  Tula Village
                </span>
              </div>
              <div className="flex items-center gap-2 text-secondary text-sm group">
                <FiPhone className="w-4 h-4 text-whatsapp-green group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">
                  +251 9XX XXX XXX
                </span>
              </div>
              <div className="flex items-center gap-2 text-secondary text-sm group">
                <FiMail className="w-4 h-4 text-whatsapp-green group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">
                  tulastudents@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="text-center pt-6 border-t border-border text-muted opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          <p className="transition-colors duration-300 hover:text-whatsapp-green">
            &copy; {new Date().getFullYear()} Tula Students Association. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
