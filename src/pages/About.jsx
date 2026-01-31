import PageHeader from "../components/PageHeader";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <PageHeader
        title="About Us"
        subtitle="Learn about our mission and the impact we're making"
        icon="ℹ️"
      />

      <div className="container">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            The Tula Students Association was founded by a group of university
            students who recognized the educational challenges facing their home
            village. What started as an informal tutoring initiative has grown
            into a comprehensive summer education program that serves hundreds
            of students each year.
          </p>
          <p>
            Every summer, when university students return home for vacation,
            they dedicate their time and energy to teaching junior students.
            This seasonal model ensures that students in Tula Village have
            access to quality education from passionate, knowledgeable
            volunteers who understand their community's unique needs.
          </p>
        </section>

        <section className="about-section">
          <h2>Summer-Based Teaching Model</h2>
          <div className="model-grid">
            <div className="model-card">
              <div className="model-icon">📅</div>
              <h3>June - August</h3>
              <p>
                Our programs run throughout the summer vacation period when
                university students are home
              </p>
            </div>
            <div className="model-card">
              <div className="model-icon">👥</div>
              <h3>Volunteer Teachers</h3>
              <p>
                University students from various disciplines volunteer their
                time and expertise
              </p>
            </div>
            <div className="model-card">
              <div className="model-icon">🎯</div>
              <h3>Focused Learning</h3>
              <p>
                Intensive summer sessions help students catch up and get ahead
                in their studies
              </p>
            </div>
            <div className="model-card">
              <div className="model-icon">🌟</div>
              <h3>Community Impact</h3>
              <p>
                Beyond teaching, we provide materials, tools, and financial
                support to students in need
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <div className="mission-points">
            <div className="mission-point">
              <span className="mission-icon">✓</span>
              <p>
                Provide free, quality education to elementary, secondary, and
                preparatory students
              </p>
            </div>
            <div className="mission-point">
              <span className="mission-icon">✓</span>
              <p>
                Support the local community with educational tools and financial
                assistance
              </p>
            </div>
            <div className="mission-point">
              <span className="mission-icon">✓</span>
              <p>Create a sustainable model of community-driven education</p>
            </div>
            <div className="mission-point">
              <span className="mission-icon">✓</span>
              <p>Empower university students to give back to their community</p>
            </div>
            <div className="mission-point">
              <span className="mission-icon">✓</span>
              <p>
                Bridge the educational gap in rural areas through volunteer
                efforts
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="offerings-grid">
            <div className="offering-card">
              <h3>📚 Free Teaching</h3>
              <p>
                All our teaching services are completely free for students in
                the community
              </p>
            </div>
            <div className="offering-card">
              <h3>📖 Learning Materials</h3>
              <p>
                Downloadable study materials, notes, and resources for all grade
                levels
              </p>
            </div>
            <div className="offering-card">
              <h3>💰 Financial Support</h3>
              <p>
                Assistance with school supplies, books, and other educational
                needs
              </p>
            </div>
            <div className="offering-card">
              <h3>🎓 Exam Preparation</h3>
              <p>
                Specialized support for students preparing for important exams
              </p>
            </div>
          </div>
        </section>

        <section className="about-section values-section">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h4>Community First</h4>
              <p>
                We prioritize the needs of our community and work together to
                create lasting change
              </p>
            </div>
            <div className="value-item">
              <h4>Education for All</h4>
              <p>
                Every child deserves access to quality education, regardless of
                their circumstances
              </p>
            </div>
            <div className="value-item">
              <h4>Volunteer Spirit</h4>
              <p>
                Our volunteers are driven by passion and commitment to making a
                difference
              </p>
            </div>
            <div className="value-item">
              <h4>Sustainable Impact</h4>
              <p>
                We build programs that create long-term positive change in our
                community
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
