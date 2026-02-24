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

      {/* Programs Showcase - Detailed */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FiBookOpen className="w-full h-full" />,
                title: "Elementary Program",
                grade: "Grades 1-8",
                desc: "Building strong foundations in Mathematics, Science, English, and Arabic through interactive and engaging lessons.",
                features: [
                  "Interactive learning sessions",
                  "Basic literacy and numeracy",
                  "Fun educational activities",
                  "Homework support",
                ],
                color: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: <FiTrendingUp className="w-full h-full" />,
                title: "Secondary Support",
                grade: "Grades 9-10",
                desc: "Advanced subject tutoring with specialized teachers covering the complete secondary curriculum.",
                features: [
                  "Subject-specific tutoring",
                  "Advanced Mathematics and Sciences",
                  "Study skills training",
                  "Exam preparation techniques",
                ],
                color: "from-green-500/20 to-emerald-500/20",
              },
              {
                icon: <FiAward className="w-full h-full" />,
                title: "Exam Preparation",
                grade: "Grades 11-12",
                desc: "Intensive preparation for university entrance exams with mock tests and proven strategies.",
                features: [
                  "University entrance exam prep",
                  "Mock exams and practice tests",
                  "Time management strategies",
                  "Career guidance",
                ],
                color: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: <FiHeart className="w-full h-full" />,
                title: "Community Aid",
                grade: "All Levels",
                desc: "Financial support and educational resources for students in need throughout the community.",
                features: [
                  "School supplies distribution",
                  "Book and material donations",
                  "Financial assistance",
                  "Scholarship opportunities",
                ],
                color: "from-orange-500/20 to-red-500/20",
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

                  <div className="space-y-2">
                    {program.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-secondary">
                        <span className="text-whatsapp-green">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Schedule */}
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
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Program Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <FiBookOpen className="w-6 h-6" />,
                title: "Duration",
                desc: "June - August",
              },
              {
                icon: <FiTrendingUp className="w-6 h-6" />,
                title: "Sessions",
                desc: "Morning only",
              },
              {
                icon: <FiAward className="w-6 h-6" />,
                title: "Class Size",
                desc: "Small groups",
              },
              {
                icon: <FiHeart className="w-6 h-6" />,
                title: "Cost",
                desc: "Completely FREE",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-[#1a2730] to-card rounded-2xl p-6 border border-border/50 hover:border-whatsapp-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)] text-center"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                }}>
                <div
                  className="text-whatsapp-green mb-3 flex justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                  }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-main via-card to-main">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37, 211, 102, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 211, 102, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Our Impact in <span className="text-whatsapp-green">Numbers</span>
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Real results from our community-driven education initiative
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FiUsers className="w-full h-full" />,
                number: "500+",
                label: "Students Taught",
                desc: "Since 2020",
              },
              {
                icon: <FiAward className="w-full h-full" />,
                number: "50+",
                label: "Volunteer Teachers",
                desc: "Every Summer",
              },
              {
                icon: <FiBookOpen className="w-full h-full" />,
                number: "1000+",
                label: "Learning Materials",
                desc: "Distributed",
              },
              {
                icon: <FiTrendingUp className="w-full h-full" />,
                number: "95%",
                label: "Success Rate",
                desc: "Grade Improvement",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-6 md:p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)] text-center"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                }}>
                <div className="absolute inset-0 bg-whatsapp-green/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-whatsapp-green transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12"
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                    }}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-5xl font-black text-whatsapp-green mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-secondary">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-card to-main relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-whatsapp-green/20 rounded-full animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}></div>
          ))}
        </div>

        <div className="container relative z-10 px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Stories from Our{" "}
              <span className="text-whatsapp-green">Community</span>
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Hear from students and volunteers who've experienced the impact
              firsthand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Amira Hassan",
                role: "Student, Grade 10",
                quote:
                  "The summer program helped me improve my math grades from 60% to 85%. The volunteer teachers are patient and make learning fun!",
                avatar: "👧",
              },
              {
                name: "Omar Ahmed",
                role: "Volunteer Teacher",
                quote:
                  "Teaching in my home village is the most rewarding experience. Seeing students' eyes light up when they understand a concept is priceless.",
                avatar: "👨‍🏫",
              },
              {
                name: "Fatima Ali",
                role: "Parent",
                quote:
                  "This program is a blessing for our community. My children look forward to summer classes and their confidence has grown tremendously.",
                avatar: "👩",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)]"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                }}>
                <div className="absolute inset-0 bg-whatsapp-green/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <div className="text-6xl mb-4">{testimonial.avatar}</div>
                  <p className="text-secondary mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border/50 pt-4">
                    <h4 className="text-lg font-bold text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-whatsapp-green">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Why <span className="text-whatsapp-green">Tula Students</span>{" "}
              Association?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FiHeart className="w-full h-full" />,
                title: "Community-Driven",
                desc: "Built by locals, for locals. Our volunteers are from Tula Village and understand the unique needs of our community.",
              },
              {
                icon: <FiStar className="w-full h-full" />,
                title: "Completely Free",
                desc: "No tuition fees, no hidden costs. Quality education should be accessible to everyone, regardless of economic status.",
              },
              {
                icon: <FiBookOpen className="w-full h-full" />,
                title: "Comprehensive Support",
                desc: "Beyond teaching, we provide learning materials, school supplies, and financial assistance for students in need.",
              },
              {
                icon: <FiUsers className="w-full h-full" />,
                title: "Small Class Sizes",
                desc: "Personalized attention with small student-to-teacher ratios ensures every child gets the support they need.",
              },
              {
                icon: <FiTrendingUp className="w-full h-full" />,
                title: "Proven Results",
                desc: "95% of our students show significant grade improvement and increased confidence in their academic abilities.",
              },
              {
                icon: <FiAward className="w-full h-full" />,
                title: "University Mentors",
                desc: "Learn from university students who bring modern teaching methods and real-world academic experience.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-[#1a2730] to-card rounded-2xl p-6 md:p-8 border border-border/50 hover:border-whatsapp-green/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                }}>
                <div
                  className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-whatsapp-green transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                  }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-main to-card relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-unread-badge/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              How It <span className="text-whatsapp-green">Works</span>
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Simple steps to join our educational community
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* For Students */}
              <div className="space-y-6">
                <div className="text-center md:text-left mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-whatsapp-green mb-2">
                    For Students
                  </h3>
                  <p className="text-secondary">
                    Join our summer learning program
                  </p>
                </div>

                {[
                  {
                    step: "1",
                    title: "Register Online",
                    desc: "Fill out the simple registration form with your details and grade level.",
                  },
                  {
                    step: "2",
                    title: "Get Confirmation",
                    desc: "Receive your class schedule and program details via email or phone.",
                  },
                  {
                    step: "3",
                    title: "Attend Classes",
                    desc: "Join morning sessions throughout the summer and access learning materials.",
                  },
                  {
                    step: "4",
                    title: "Track Progress",
                    desc: "Monitor your improvement and receive ongoing support from teachers.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 bg-gradient-to-br from-card to-[#1a2730] rounded-2xl p-6 border border-border/50 hover:border-whatsapp-green transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                    }}>
                    <div className="flex-shrink-0 w-12 h-12 bg-whatsapp-green/20 border-2 border-whatsapp-green rounded-full flex items-center justify-center text-whatsapp-green font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* For Volunteers */}
              <div className="space-y-6">
                <div className="text-center md:text-left mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-whatsapp-green mb-2">
                    For Volunteers
                  </h3>
                  <p className="text-secondary">Become a teacher this summer</p>
                </div>

                {[
                  {
                    step: "1",
                    title: "Apply Online",
                    desc: "Submit your volunteer application with your university details and subjects.",
                  },
                  {
                    step: "2",
                    title: "Interview & Training",
                    desc: "Brief orientation session to prepare you for teaching and classroom management.",
                  },
                  {
                    step: "3",
                    title: "Start Teaching",
                    desc: "Lead classes in your subject area and inspire the next generation.",
                  },
                  {
                    step: "4",
                    title: "Make Impact",
                    desc: "See the difference you make and build lasting connections with students.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 bg-gradient-to-br from-card to-[#1a2730] rounded-2xl p-6 border border-border/50 hover:border-whatsapp-green transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                    }}>
                    <div className="flex-shrink-0 w-12 h-12 bg-whatsapp-green/20 border-2 border-whatsapp-green rounded-full flex items-center justify-center text-whatsapp-green font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-main to-card relative">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Frequently Asked{" "}
              <span className="text-whatsapp-green">Questions</span>
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Everything you need to know about our programs
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Is the program really free?",
                a: "Yes! All our programs are completely free. We believe quality education should be accessible to everyone.",
              },
              {
                q: "What grades do you teach?",
                a: "We offer programs for grades 1-12, with specialized support for each level including university entrance exam preparation.",
              },
              {
                q: "When does the program run?",
                a: "Our summer program runs from June through August, with morning sessions to accommodate students' schedules.",
              },
              {
                q: "Do I need to be from Tula to join?",
                a: "While our focus is on Tula Village students, we welcome learners from nearby communities who can attend regularly.",
              },
              {
                q: "What subjects are covered?",
                a: "We teach Mathematics, Science, English, Arabic, and provide exam preparation for all secondary school subjects.",
              },
              {
                q: "Can I volunteer if I'm still in university?",
                a: "Absolutely! We welcome university students from Tula Village who want to give back during their summer break.",
              },
              {
                q: "How do I get learning materials?",
                a: "All registered students receive free learning materials, books, and supplies distributed at the start of the program.",
              },
              {
                q: "Is there financial aid available?",
                a: "Yes, we provide financial assistance for school supplies, uniforms, and other educational needs for students in need.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-card to-[#1a2730] rounded-2xl p-6 border border-border/50 hover:border-whatsapp-green transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                }}>
                <h3 className="text-lg font-bold text-whatsapp-green mb-3 flex items-start gap-2">
                  <span className="text-2xl">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-secondary leading-relaxed pl-8">{faq.a}</p>
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
