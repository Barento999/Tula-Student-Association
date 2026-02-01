import { useState } from "react";
import { FiImage, FiClock } from "react-icons/fi";

const Gallery = () => {
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
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4">
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
          <div className="mb-8 md:mb-12">
            <div
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 text-whatsapp-green transform transition-all duration-700 animate-pulse-slow"
              style={{
                filter: "drop-shadow(0 8px 24px rgba(37, 211, 102, 0.4))",
              }}>
              <FiImage className="w-full h-full" />
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-4 leading-tight transform-gpu transition-all duration-700"
              style={{
                textShadow:
                  "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
              }}>
              <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Gallery
              </span>
            </h1>
          </div>

          <div className="max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-full mb-6">
              <FiClock className="w-5 h-5 text-whatsapp-green" />
              <span className="text-whatsapp-green font-semibold">
                Coming Soon
              </span>
            </div>

            <p
              className="text-base sm:text-lg md:text-2xl text-secondary leading-relaxed opacity-0 animate-fade-in-up px-4"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              We're preparing an amazing photo gallery showcasing memories from
              our summer programs. Check back soon to see highlights from our
              teaching sessions, community events, and student achievements.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            {[
              { label: "Summer Programs", value: "2022-2024" },
              { label: "Community Events", value: "Coming" },
              { label: "Student Success", value: "Stories" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-card to-[#1a2730] border border-border/50 rounded-2xl p-6 hover:border-whatsapp-green/50 transition-all duration-500">
                <p className="text-sm text-secondary mb-2">{item.label}</p>
                <p className="text-xl font-bold text-whatsapp-green">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
