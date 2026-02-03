import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiTarget,
  FiZap,
  FiStar,
  FiUsers,
  FiBookOpen,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiBook,
  FiArrowRight,
} from "react-icons/fi";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4">
        {/* Animated Background Elements - Same on all devices */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-unread-badge/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-whatsapp-green/5 rounded-full blur-[150px] animate-pulse-slow"
            style={{ animationDelay: "2s" }}></div>
        </div>

        {/* Floating Particles - Same on all devices */}
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

        <div
          className="container relative z-10 text-center px-4"
          style={{
            transform:
              window.innerWidth > 768
                ? `translateY(${scrollY * 0.3}px)`
                : "none",
          }}>
          {/* Main Heading with 3D Effect */}
          <div className="mb-6 md:mb-8 perspective-[1000px]">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-4 leading-tight transform-gpu transition-all duration-700"
              style={{
                textShadow:
                  "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
              }}>
              <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Welcome to Tula Students
              </span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                Association
              </span>
            </h1>
          </div>

          <p
            className="text-base sm:text-lg md:text-2xl text-secondary max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Empowering the next generation through education. University
            students returning home each summer to teach, inspire, and transform
            lives in Tula Village.
          </p>

          {/* CTA Buttons with 3D Hover */}
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <Link
              to="/volunteer"
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-whatsapp-green text-main rounded-2xl font-bold text-base md:text-lg overflow-hidden transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:shadow-[0_20px_60px_rgba(37,211,102,0.4)] transform-gpu w-full sm:w-auto"
              style={{ transformStyle: "preserve-3d" }}>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FiHeart className="w-5 h-5" />
                <span className="whitespace-nowrap">Become a Volunteer</span>
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              to="/student-registration"
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-card border-2 border-whatsapp-green/30 text-primary rounded-2xl font-bold text-base md:text-lg overflow-hidden transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:shadow-[0_20px_60px_rgba(37,211,102,0.3)] hover:border-whatsapp-green transform-gpu w-full sm:w-auto"
              style={{ transformStyle: "preserve-3d" }}>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FiBook className="w-5 h-5" />
                <span className="whitespace-nowrap">Register as Student</span>
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-whatsapp-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-whatsapp-green/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-whatsapp-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Parallax */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-card via-main to-card">
        {/* Background Pattern */}
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 md:px-6 py-2 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-full text-whatsapp-green font-semibold mb-4 md:mb-6 text-sm md:text-base">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight px-4">
                Building Futures Through{" "}
                <span className="text-whatsapp-green">Education</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  icon: <FiTarget className="w-full h-full" />,
                  title: "Our Vision",
                  desc: "To create a sustainable model of community-driven education where every child in Tula Village has access to quality learning, regardless of their economic background.",
                },
                {
                  icon: <FiZap className="w-full h-full" />,
                  title: "Our Approach",
                  desc: "University students return home during summer vacation to volunteer as teachers, bringing fresh perspectives and modern teaching methods to local students.",
                },
                {
                  icon: <FiStar className="w-full h-full" />,
                  title: "Our Impact",
                  desc: "Beyond teaching, we provide learning materials, financial support for school supplies, and mentorship to help students achieve their academic goals.",
                },
                {
                  icon: <FiUsers className="w-full h-full" />,
                  title: "Our Community",
                  desc: "We believe in the power of giving back. Every volunteer was once a student in Tula, creating a cycle of support that strengthens our entire community.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-[#1a2730] to-card rounded-2xl p-6 md:p-8 border border-border/50 hover:border-whatsapp-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                  }}>
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-whatsapp-green transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                    }}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Showcase */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-card to-main relative">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Summer Programs 2026
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Comprehensive educational support tailored for every grade level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <FiBookOpen className="w-full h-full" />,
                title: "Elementary Program",
                grade: "Grades 1-8",
                desc: "Building strong foundations in Mathematics, Science, English, and Arabic through interactive and engaging lessons.",
                features: [
                  "Interactive Learning",
                  "Basic Skills",
                  "Fun Activities",
                ],
                color: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: <FiTrendingUp className="w-full h-full" />,
                title: "Secondary Support",
                grade: "Grades 9-10",
                desc: "Advanced subject tutoring with specialized teachers covering the complete secondary curriculum.",
                features: [
                  "Subject Experts",
                  "Advanced Topics",
                  "Study Skills",
                ],
                color: "from-green-500/20 to-emerald-500/20",
              },
              {
                icon: <FiAward className="w-full h-full" />,
                title: "Exam Preparation",
                grade: "Grades 11-12",
                desc: "Intensive preparation for university entrance exams with mock tests and proven strategies.",
                features: ["Mock Exams", "Time Management", "Career Guidance"],
                color: "from-purple-500/20 to-pink-500/20",
              },
            ].map((program, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)]"
                style={{
                  transformStyle: "preserve-3d",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                }}>
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700`}></div>

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 mb-4 text-whatsapp-green transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12"
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                    }}>
                    {program.icon}
                  </div>
                  <span className="inline-block px-4 py-1 bg-whatsapp-green/20 border border-whatsapp-green/40 rounded-full text-whatsapp-green text-sm font-semibold mb-4">
                    {program.grade}
                  </span>
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {program.title}
                  </h3>
                  <p className="text-secondary mb-6 leading-relaxed">
                    {program.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-secondary">
                        <span className="text-whatsapp-green">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-2 text-whatsapp-green font-semibold group-hover:gap-4 transition-all duration-300">
                    Learn More <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with 3D Effect */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-br from-main via-card to-main">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(37,211,102,0.15)_0%,transparent_50%)] animate-pulse-slow"></div>
          <div
            className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,rgba(0,168,132,0.15)_0%,transparent_50%)] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container relative z-10 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4 md:mb-6 leading-tight">
            Ready to Make a{" "}
            <span className="text-whatsapp-green">Difference?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            Join us this summer and be part of a movement that's transforming
            education in Tula Village
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center">
            <Link
              to="/volunteer"
              className="group relative px-6 py-4 md:px-10 md:py-5 bg-whatsapp-green text-main rounded-2xl font-bold text-base md:text-lg overflow-hidden transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:shadow-[0_25px_70px_rgba(37,211,102,0.5)] transform-gpu w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                <FiHeart className="w-5 h-5 md:w-6 md:h-6" />
                <span className="whitespace-nowrap">Volunteer Application</span>
                <FiArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              to="/student-registration"
              className="group relative px-6 py-4 md:px-10 md:py-5 bg-card border-2 border-whatsapp-green/30 text-primary rounded-2xl font-bold text-base md:text-lg overflow-hidden transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:shadow-[0_25px_70px_rgba(37,211,102,0.4)] hover:border-whatsapp-green transform-gpu w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                <FiBook className="w-5 h-5 md:w-6 md:h-6" />
                <span className="whitespace-nowrap">Student Registration</span>
                <FiArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-whatsapp-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
