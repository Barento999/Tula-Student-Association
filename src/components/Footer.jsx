import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-card to-main border-t border-border py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(37,211,102,0.2)_0%,transparent_50%)] animate-pulse-slow"></div>
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
                  +123 456 7890
                </span>
              </div>
              <div className="flex items-center gap-2 text-secondary text-sm group">
                <FiMail className="w-4 h-4 text-whatsapp-green group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">
                  info@tulastudents.org
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
