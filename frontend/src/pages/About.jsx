import { useState } from "react";
import { FiTarget, FiHeart, FiUsers, FiAward } from "react-icons/fi";

const About = () => {
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })),
  );

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[80vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4">
        {/* Animated Background Elements */}
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
                About Us
              </span>
            </h1>
          </div>

          <p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Empowering education through community-driven summer programs.
            University students returning home to teach, inspire, and transform
            lives in Tula Village.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
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
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight px-4">
                Building Futures Through{" "}
                <span className="text-whatsapp-green">Community</span>
              </h2>
            </div>

            <div className="bg-gradient-to-br from-[#1a2730] to-card rounded-3xl p-6 md:p-10 border border-border/50 hover:border-whatsapp-green/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(37,211,102,0.2)]">
              <p className="text-base md:text-lg text-secondary leading-relaxed mb-4">
                The Tula Students Association was founded by university students
                who recognized the educational challenges in their home village.
                Every summer, when students return home, they dedicate their
                time to teaching and mentoring junior students, bringing fresh
                perspectives and modern teaching methods.
              </p>
              <p className="text-base md:text-lg text-secondary leading-relaxed mb-4">
                What started as informal tutoring has grown into a comprehensive
                summer program serving hundreds of students. We provide
                teaching, learning materials, financial support, and mentorship
                to help students achieve their goals and build a brighter
                future.
              </p>
              <p className="text-base md:text-lg text-secondary leading-relaxed">
                Our volunteers come from diverse academic backgrounds, creating
                a rich learning environment. Many of our current volunteers were
                once students in the program themselves, creating a meaningful
                cycle of giving back to the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-card to-main relative">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Our Mission & Values
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              The principles that guide our work and community impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <FiHeart className="w-full h-full" />,
                title: "Community First",
                desc: "Prioritizing local needs and working together to create lasting change",
              },
              {
                icon: <FiUsers className="w-full h-full" />,
                title: "Education for All",
                desc: "Free quality education for every child, regardless of economic background",
              },
              {
                icon: <FiTarget className="w-full h-full" />,
                title: "Volunteer Spirit",
                desc: "Passionate students giving back with enthusiasm and dedication",
              },
              {
                icon: <FiAward className="w-full h-full" />,
                title: "Sustainable Impact",
                desc: "Building programs that create long-term positive change",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)]"
                style={{
                  transformStyle: "preserve-3d",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                }}>
                <div
                  className="w-12 h-12 mb-4 text-whatsapp-green transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-12"
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(37, 211, 102, 0.4))",
                  }}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-br from-main via-card to-main">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              What We Offer
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Comprehensive support for students at every level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Free Summer Teaching",
                desc: "Comprehensive tutoring in Mathematics, Science, English, and Arabic for grades 1-12 with personalized attention",
                color: "from-blue-500/20 to-cyan-500/20",
              },
              {
                title: "Learning Materials",
                desc: "Downloadable study resources, notes, and practice materials for all subjects and grade levels",
                color: "from-green-500/20 to-emerald-500/20",
              },
              {
                title: "Financial Support",
                desc: "Assistance with school supplies, textbooks, and educational expenses for students in need",
                color: "from-purple-500/20 to-pink-500/20",
              },
              {
                title: "Exam Preparation",
                desc: "Intensive preparation sessions for university entrance exams with practice tests and strategies",
                color: "from-orange-500/20 to-red-500/20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)] overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                }}>
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700`}></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="text-whatsapp-green text-3xl">✓</span>
                    {item.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Leaders Section */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-card to-main">
        <div className="container px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 md:px-6 py-2 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-full text-whatsapp-green font-semibold mb-4 md:mb-6 text-sm md:text-base">
              Leadership Team
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
              Meet Our <span className="text-whatsapp-green">Leaders</span>
            </h2>
            <p className="text-base md:text-xl text-secondary max-w-2xl mx-auto px-4">
              Dedicated individuals guiding our mission to transform education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Aneso Yusuf",
                role: "President",
                university: "Rift Valley University",
                department: "Department Name",
                description:
                  "Leading the organization with vision and dedication to educational excellence.",
              },
              {
                name: "Leader Name",
                role: "Vice President",
                university: "University Name",
                department: "Department Name",
                description:
                  "Coordinating programs and ensuring quality education delivery.",
              },
              {
                name: "Leader Name",
                role: "Academic Coordinator",
                university: "University Name",
                department: "Department Name",
                description:
                  "Managing curriculum development and teaching standards.",
              },
            ].map((leader, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-card to-[#1a2730] rounded-3xl p-8 border border-border/50 hover:border-whatsapp-green transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(37,211,102,0.3)]"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                }}>
                {/* Avatar Placeholder */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-whatsapp-green/20 to-unread-badge/20 border-4 border-whatsapp-green/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <FiUsers className="w-12 h-12 text-whatsapp-green" />
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-whatsapp-green font-semibold mb-3">
                    {leader.role}
                  </p>
                  <p className="text-secondary text-sm mb-1">
                    {leader.university}
                  </p>
                  <p className="text-secondary text-sm mb-4">
                    {leader.department}
                  </p>
                  <p className="text-secondary leading-relaxed text-sm">
                    {leader.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow"
            style={{ animationDelay: "1.5s" }}></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] animate-pulse-slow"
            style={{ animationDelay: "2.5s" }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-block mb-5 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-5 md:px-7 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40 rounded-full text-blue-300 font-bold text-sm md:text-base shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Developer of Tula Students Association
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-3 px-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              Built with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Passion
              </span>{" "}
              & Dedication
            </h2>
            <p
              className="text-secondary text-base md:text-lg max-w-2xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              Transforming ideas into digital reality
            </p>
          </div>

          <div
            className="max-w-3xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <div className="group relative bg-gradient-to-br from-[#1a2730] via-card to-[#1a2730] rounded-3xl p-10 md:p-12 border-2 border-blue-500/30 hover:border-blue-400/60 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_100px_rgba(59,130,246,0.4)] overflow-hidden">
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              <div className="relative z-10 text-center">
                {/* Developer Photo with Enhanced Styling */}
                <div className="relative inline-block mb-8">
                  {/* Rotating Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30 animate-spin-slow"></div>

                  <div className="w-36 h-36 md:w-40 md:h-40 mx-auto rounded-full border-4 border-blue-500/40 overflow-hidden group-hover:scale-110 group-hover:border-blue-400/70 transition-all duration-500 shadow-[0_12px_40px_rgba(59,130,246,0.4)] group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/10 group-hover:ring-blue-400/20 relative">
                    <img
                      src="/barento.jpg"
                      alt="Barento Hashum"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">
                    ✓
                  </div>
                  <div
                    className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg animate-pulse"
                    style={{ animationDelay: "0.5s" }}></div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-primary mb-3 group-hover:text-blue-300 transition-colors duration-500">
                  Barento Hashum
                </h3>
                <p className="text-blue-400 font-bold text-xl mb-2 tracking-wide">
                  Full Stack Developer
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
                  <span className="text-blue-500/50 text-sm">●</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
                </div>
                <p className="text-secondary leading-relaxed text-base md:text-lg max-w-2xl mx-auto mb-6">
                  Crafted this platform with dedication to support the{" "}
                  <span className="text-whatsapp-green font-semibold">
                    Tula Students Association's
                  </span>{" "}
                  mission of empowering education through technology and
                  community engagement. Committed to creating meaningful digital
                  solutions that make a difference.
                </p>
                <div className="flex items-center justify-center gap-3 text-sm">
                  <span className="flex items-center gap-2 px-4 py-2 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-full text-whatsapp-green font-semibold hover:bg-whatsapp-green/20 transition-all duration-300">
                    <span className="animate-pulse">●</span> Available for
                    collaboration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summer Program CTA */}
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
            Summer 2026 <span className="text-whatsapp-green">Program</span>
          </h2>
          <p className="text-xl md:text-2xl text-whatsapp-green font-semibold mb-4">
            June - August | Free for All Students
          </p>
          <p className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8 md:mb-12 px-4 leading-relaxed">
            Join us for intensive learning sessions with personalized attention
            in a supportive community environment. Our programs run throughout
            June, July, and August with flexible scheduling and small class
            sizes designed to help students excel academically.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
