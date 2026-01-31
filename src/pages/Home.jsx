import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Empowering Education in Tula Village</h1>
            <p className="hero-subtitle">
              University students returning home each summer to teach, support,
              and inspire the next generation
            </p>
            <div className="hero-cta">
              <Link to="/volunteer" className="btn btn-primary">
                Become a Volunteer
              </Link>
              <Link to="/student-registration" className="btn btn-secondary">
                Student Registration
              </Link>
              <Link to="/materials" className="btn btn-secondary">
                Download Materials
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👨‍🎓</div>
              <div className="stat-number">150+</div>
              <div className="stat-label">Volunteers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Students Taught</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📖</div>
              <div className="stat-number">200+</div>
              <div className="stat-label">Learning Materials</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">☀️</div>
              <div className="stat-number">5</div>
              <div className="stat-label">Summer Sessions</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            The Tula Students Association brings together university students
            from across the country who share a common goal: giving back to
            their community. Every summer vacation, our volunteers return to
            Tula Village to provide free education and support to elementary,
            secondary, and preparatory students.
          </p>
          <p>
            We believe that education is the key to breaking the cycle of
            poverty and creating opportunities for future generations. Through
            our summer programs, we provide quality teaching, learning
            materials, and financial support to ensure every child in Tula has
            access to education.
          </p>
        </div>
      </section>

      <section className="programs-preview">
        <div className="container">
          <h2>Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-icon">🎒</div>
              <h3>Elementary Teaching</h3>
              <p>
                Foundation building for grades 1-6 with focus on core subjects
              </p>
              <Link to="/programs">Learn More →</Link>
            </div>
            <div className="program-card">
              <div className="program-icon">📐</div>
              <h3>Secondary Support</h3>
              <p>
                Advanced learning for grades 7-9 with specialized subject
                teachers
              </p>
              <Link to="/programs">Learn More →</Link>
            </div>
            <div className="program-card">
              <div className="program-icon">🎓</div>
              <h3>Preparatory Exam Prep</h3>
              <p>
                Intensive preparation for grades 10-12 university entrance exams
              </p>
              <Link to="/programs">Learn More →</Link>
            </div>
            <div className="program-card">
              <div className="program-icon">🤝</div>
              <h3>Community Aid</h3>
              <p>
                Financial support and educational tools for students in need
              </p>
              <Link to="/programs">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Join Us This Summer</h2>
          <p>
            Whether you're a university student looking to volunteer or a junior
            student seeking support, we're here for you.
          </p>
          <div className="cta-buttons">
            <Link to="/volunteer" className="btn btn-primary">
              Volunteer Application
            </Link>
            <Link to="/student-registration" className="btn btn-secondary">
              Student Registration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
