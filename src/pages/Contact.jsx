import { useState } from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiCheckCircle,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMessageCircle,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

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
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-unread-badge/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-whatsapp-green/5 rounded-full blur-[150px] animate-pulse-slow"
            style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-whatsapp-green/30 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}></div>
          ))}
        </div>

        <div className="container relative z-10 text-center px-4">
          <div className="mb-6 md:mb-8 perspective-[1000px]">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-4 leading-tight transform-gpu transition-all duration-700"
              style={{
                textShadow:
                  "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
              }}>
              <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Contact Us
              </span>
            </h1>
          </div>
          <p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Get in touch with the Tula Students Association. We're here to
            answer your questions and help you get involved.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-card via-main to-card">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(37, 211, 102, 0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 md:gap-10">
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <FiMapPin className="w-full h-full" />,
                  title: "Location",
                  lines: ["Tula Village", "Community Center"],
                },
                {
                  icon: <FiMail className="w-full h-full" />,
                  title: "Email",
                  lines: [
                    "info@tulastudents.org",
                    "volunteer@tulastudents.org",
                  ],
                },
                {
                  icon: <FiPhone className="w-full h-full" />,
                  title: "Phone",
                  lines: ["+123 456 7890", "Available during summer"],
                },
                {
                  icon: <FiClock className="w-full h-full" />,
                  title: "Operating Hours",
                  lines: [
                    "Summer Season: June - August",
                    "Daily: 8:00 AM - 4:00 PM",
                  ],
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-card to-[#1a2730] border border-border/50 hover:border-whatsapp-green rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                  }}>
                  <div
                    className="w-12 h-12 mb-3 text-whatsapp-green transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                    }}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-base text-secondary mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              ))}

              <div
                className="group bg-gradient-to-br from-card to-[#1a2730] border border-border/50 hover:border-whatsapp-green rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]"
                style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}>
                <h3 className="text-lg font-bold text-primary mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: <FiFacebook className="w-5 h-5" />,
                      label: "Facebook",
                    },
                    {
                      icon: <FiTwitter className="w-5 h-5" />,
                      label: "Twitter",
                    },
                    {
                      icon: <FiInstagram className="w-5 h-5" />,
                      label: "Instagram",
                    },
                    {
                      icon: <FiMessageCircle className="w-5 h-5" />,
                      label: "WhatsApp",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex items-center gap-3 text-secondary text-base transition-all duration-300 hover:text-whatsapp-green hover:translate-x-2">
                      {social.icon}
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="bg-gradient-to-br from-card to-[#1a2730] border border-border/50 rounded-3xl p-10 max-md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}>
              {success && (
                <div className="bg-gradient-to-r from-whatsapp-green to-unread-badge text-main px-6 py-4 rounded-2xl mb-6 flex items-center gap-3 shadow-[0_10px_40px_rgba(37,211,102,0.3)] animate-fade-in-up">
                  <FiCheckCircle className="w-6 h-6 flex-shrink-0" />
                  <p className="text-base font-medium">
                    Thank you! We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
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

                <button
                  type="submit"
                  className="btn btn-primary btn-full group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(37,211,102,0.4)]">
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
