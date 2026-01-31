import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Tula Students Association</h3>
            <p>
              Empowering education in Tula Village through summer volunteer
              programs.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/about">About Us</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/volunteer">Become a Volunteer</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-section">
            <h4>For Students</h4>
            <Link to="/student-registration">Register</Link>
            <Link to="/materials">Learning Materials</Link>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                📘
              </a>
              <a href="#" aria-label="Twitter">
                🐦
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="WhatsApp">
                💬
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Tula Students Association. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
