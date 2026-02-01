import { useState } from "react";
import { FiBookOpen, FiTrendingUp, FiAward, FiHeart } from "react-icons/fi";

const Programs = () => {
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

  const programs = [
    {
      id: 1,
      icon: <FiBookOpen className="w-full h-full" />,
      title: "Elementary Program",
      grades: "Grades 1-8",
      description:
        "Building strong foundations in Mathematics, Science, English, and Arabic through interactive learning.",
      features: [
        "Interactive learning sessions",
        "Basic literacy and numeracy",
        "Fun educational activities",
        "Homework support",
      ],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: 2,
      icon: <FiTrendingUp className="w-full h-full" />,
      title: "Secondary Support",
      grades: "Grades 9-10",
      description:
        "Advanced subject tutoring with specialized teachers covering the complete secondary curriculum.",
      features: [
        "Subject-specific tutoring",
        "Advanced Mathematics and Sciences",
        "Study skills training",
        "Exam preparation techniques",
      ],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      id: 3,
      icon: <FiAward className="w-full h-full" />,
      title: "Exam Preparation",
      grades: "Grades 11-12",
      description:
        "Intensive preparation for university entrance exams with mock tests and proven strategies.",
      features: [
        "University entrance exam prep",
        "Mock exams and practice tests",
        "Time management strategies",
        "Career guidance",
      ],
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      id: 4,
      icon: <FiHeart className="w-full h-full" />,
      title: "Community Aid",
      grades: "All Levels",
      description:
        "Financial support and educational resources for students in need throughout the community.",
      features: [
        "School supplies distribution",
        "Book and material donations",
        "Financial assistance",
        "Scholarship opportunities",
      ],
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-whatsapp-green/10 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-unread-badge/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-whatsapp-green/5 rounded-full blur-[150px] animate-pulse-slow"
            style={{ animationDelay: "2s" }}></div>
        </div>

        {/* Floating Particles */}
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
                Our Programs
              </span>
            </h1>
          </div>

          <p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Comprehensive educational support tailored for every grade level.
            From elementary to university preparation, we're here to help
            students succeed.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-card to-main relative">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Summer Programs 2024
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Choose the program that fits your educational needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <div
                key={program.id}
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
                    className="w-16 h-16 mb-4 text-whatsapp-green transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12"
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                    }}>
                    {program.icon}
                  </div>
                  <span className="inline-block px-4 py-1 bg-whatsapp-green/20 border border-whatsapp-green/40 rounded-full text-whatsapp-green text-sm font-semibold mb-4">
                    {program.grades}
                  </span>
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {program.title}
                  </h3>
                  <p className="text-secondary mb-6 leading-relaxed">
                    {program.description}
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
                icon: <FiBookOpen className="w-8 h-8" />,
                title: "Duration",
                desc: "June - August",
              },
              {
                icon: <FiTrendingUp className="w-8 h-8" />,
                title: "Sessions",
                desc: "Morning only",
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: "Class Size",
                desc: "Small groups",
              },
              {
                icon: <FiHeart className="w-8 h-8" />,
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

      {/* CTA Section */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-br from-main via-card to-main">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(37,211,102,0.15)_0%,transparent_50%)] animate-pulse-slow"></div>
          <div
            className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,rgba(0,168,132,0.15)_0%,transparent_50%)] animate-pulse-slow"
            style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container relative z-10 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4 md:mb-6 leading-tight">
            Ready to <span className="text-whatsapp-green">Join?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-8 md:mb-12 px-4 leading-relaxed">
            Register now to secure your spot in our summer programs
          </p>
          <a
            href="/student-registration"
            className="inline-block px-8 py-4 bg-whatsapp-green text-main rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-[0_25px_70px_rgba(37,211,102,0.5)] transform-gpu">
            Register as Student
          </a>
        </div>
      </section>
    </div>
  );
};

export default Programs;
