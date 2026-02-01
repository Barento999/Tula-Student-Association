import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    // Simulate sending reset email
    setIsSubmitted(true);
    setError("");
  };

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1219] via-main to-[#0d1821] px-4 py-20">
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

        <div className="container relative z-10 px-4">
          <div className="max-w-[520px] mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <div
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 text-whatsapp-green animate-pulse-slow"
                style={{
                  filter: "drop-shadow(0 8px 24px rgba(37, 211, 102, 0.5))",
                }}>
                <FiMail className="w-full h-full" />
              </div>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-4 leading-tight"
                style={{
                  textShadow:
                    "0 10px 30px rgba(37, 211, 102, 0.3), 0 0 60px rgba(37, 211, 102, 0.1)",
                }}>
                <span className="inline-block bg-gradient-to-r from-whatsapp-green via-primary to-whatsapp-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Forgot Password?
                </span>
              </h1>
              <p className="text-base md:text-lg text-secondary max-w-md mx-auto leading-relaxed">
                {isSubmitted
                  ? "Check your email for reset instructions"
                  : "Enter your email and we'll send you a reset link"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-card to-[#1a2730] border border-border/50 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_80px_rgba(37,211,102,0.2)] transition-all duration-500">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-whatsapp-green" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="form-input h-12 bg-main/50 border-2 border-border/50 rounded-xl focus:border-whatsapp-green focus:bg-main focus:shadow-[0_0_20px_rgba(37,211,102,0.2)] transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                    {error && (
                      <div className="error-message animate-fade-in-up">
                        {error}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(37,211,102,0.5)] mb-6">
                    <span className="relative z-10 flex items-center justify-center gap-2 text-lg font-bold">
                      <FiSend className="w-5 h-5" />
                      Send Reset Link
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-unread-badge to-whatsapp-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>

                  <div className="text-center">
                    <Link
                      to="/student-login"
                      className="inline-flex items-center gap-2 text-sm text-whatsapp-green hover:text-primary transition-colors duration-300">
                      <FiArrowLeft className="w-4 h-4" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <div className="mb-6 p-6 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-xl">
                    <p className="text-primary mb-2">
                      ✓ Reset link sent successfully!
                    </p>
                    <p className="text-sm text-secondary">
                      We've sent a password reset link to{" "}
                      <span className="text-whatsapp-green font-semibold">
                        {email}
                      </span>
                    </p>
                  </div>

                  <p className="text-sm text-secondary mb-6">
                    Didn't receive the email? Check your spam folder or try
                    again.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail("");
                      }}
                      className="btn btn-secondary btn-full">
                      Try Another Email
                    </button>
                    <Link
                      to="/student-login"
                      className="btn btn-primary btn-full flex items-center justify-center gap-2">
                      <FiArrowLeft className="w-4 h-4" />
                      Back to Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
