import { useState } from "react";
import PageHeader from "../components/PageHeader";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="contact-page">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with the Tula Students Association"
        icon="📧"
      />

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>Tula Village</p>
              <p>Community Center</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>info@tulastudents.org</p>
              <p>volunteer@tulastudents.org</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Phone</h3>
              <p>+123 456 7890</p>
              <p>Available during summer</p>
            </div>

            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Operating Hours</h3>
              <p>Summer Season: June - August</p>
              <p>Daily: 8:00 AM - 4:00 PM</p>
            </div>

            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  📘 Facebook
                </a>
                <a href="#" className="social-link">
                  🐦 Twitter
                </a>
                <a href="#" className="social-link">
                  📷 Instagram
                </a>
                <a href="#" className="social-link">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            {success && (
              <div className="success-banner">
                <span className="success-icon">✓</span>
                <p>Thank you! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send us a Message</h2>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Message subject"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  rows="6"
                  required
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
