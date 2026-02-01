import { useState } from "react";
import PageHeader from "../components/PageHeader";

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
    <div className="min-h-screen">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with the Tula Students Association"
        icon="📧"
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10">
          <div className="flex flex-col gap-5">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-lg text-primary mb-3">Location</h3>
              <p className="text-base text-secondary mb-1">Tula Village</p>
              <p className="text-base text-secondary mb-1">Community Center</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="text-lg text-primary mb-3">Email</h3>
              <p className="text-base text-secondary mb-1">
                info@tulastudents.org
              </p>
              <p className="text-base text-secondary mb-1">
                volunteer@tulastudents.org
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg text-primary mb-3">Phone</h3>
              <p className="text-base text-secondary mb-1">+123 456 7890</p>
              <p className="text-base text-secondary mb-1">
                Available during summer
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="text-lg text-primary mb-3">Operating Hours</h3>
              <p className="text-base text-secondary mb-1">
                Summer Season: June - August
              </p>
              <p className="text-base text-secondary mb-1">
                Daily: 8:00 AM - 4:00 PM
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg text-primary mb-4">Follow Us</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 text-secondary text-base transition-colors duration-300 hover:text-whatsapp-green">
                  📘 Facebook
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-secondary text-base transition-colors duration-300 hover:text-whatsapp-green">
                  🐦 Twitter
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-secondary text-base transition-colors duration-300 hover:text-whatsapp-green">
                  📷 Instagram
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-secondary text-base transition-colors duration-300 hover:text-whatsapp-green">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-10 max-md:p-6">
            {success && (
              <div className="bg-whatsapp-green text-main px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
                <span className="text-2xl font-bold">✓</span>
                <p className="text-base font-medium">
                  Thank you! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h2 className="text-[28px] text-primary mb-8">
                Send us a Message
              </h2>

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
