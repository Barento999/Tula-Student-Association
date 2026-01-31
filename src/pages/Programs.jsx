import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import "./Programs.css";

const Programs = () => {
  const programs = [
    {
      id: 1,
      icon: "🎒",
      title: "Elementary Teaching Program",
      grades: "Grades 1-6",
      description:
        "Building strong foundations in core subjects including Mathematics, Science, English, and Arabic.",
      features: [
        "Interactive learning sessions",
        "Basic literacy and numeracy",
        "Fun educational activities",
        "Homework support",
        "Progress tracking",
      ],
    },
    {
      id: 2,
      icon: "📐",
      title: "Secondary School Support",
      grades: "Grades 7-9",
      description:
        "Advanced learning with specialized subject teachers covering all secondary school curriculum.",
      features: [
        "Subject-specific tutoring",
        "Advanced Mathematics and Sciences",
        "Language development",
        "Study skills training",
        "Exam preparation techniques",
      ],
    },
    {
      id: 3,
      icon: "🎓",
      title: "Preparatory Exam Support",
      grades: "Grades 10-12",
      description:
        "Intensive preparation for university entrance exams and final year assessments.",
      features: [
        "University entrance exam prep",
        "Advanced subject mastery",
        "Mock exams and practice tests",
        "Time management strategies",
        "Career guidance and counseling",
      ],
    },
    {
      id: 4,
      icon: "🤝",
      title: "Community Aid Program",
      grades: "All Levels",
      description:
        "Financial support and educational tools for students in need throughout the community.",
      features: [
        "School supplies distribution",
        "Book and material donations",
        "Financial assistance for fees",
        "Technology access support",
        "Scholarship opportunities",
      ],
    },
  ];

  return (
    <div className="programs-page">
      <PageHeader
        title="Our Programs"
        subtitle="Comprehensive educational support for all grade levels"
        icon="📚"
      />

      <div className="container">
        <section className="programs-intro">
          <p>
            Our summer programs are designed to provide comprehensive
            educational support to students at all levels. Each program is
            tailored to meet the specific needs of different age groups and
            academic stages, ensuring that every student receives the attention
            and resources they need to succeed.
          </p>
        </section>

        <div className="programs-list">
          {programs.map((program) => (
            <Card key={program.id} className="program-detail-card">
              <div className="program-header">
                <div className="program-icon-large">{program.icon}</div>
                <div>
                  <h2>{program.title}</h2>
                  <span className="program-grades">{program.grades}</span>
                </div>
              </div>
              <p className="program-description">{program.description}</p>
              <div className="program-features">
                <h3>What We Offer:</h3>
                <ul>
                  {program.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <section className="program-schedule">
          <h2>Program Schedule</h2>
          <Card>
            <div className="schedule-grid">
              <div className="schedule-item">
                <h3>📅 Duration</h3>
                <p>June - August (Summer Vacation)</p>
              </div>
              <div className="schedule-item">
                <h3>⏰ Sessions</h3>
                <p>Morning and afternoon classes available</p>
              </div>
              <div className="schedule-item">
                <h3>👥 Class Size</h3>
                <p>Small groups for personalized attention</p>
              </div>
              <div className="schedule-item">
                <h3>💰 Cost</h3>
                <p>Completely FREE for all students</p>
              </div>
            </div>
          </Card>
        </section>

        <section className="program-cta">
          <h2>Ready to Join?</h2>
          <p>Register now to secure your spot in our summer programs</p>
          <a href="/student-registration" className="btn btn-primary">
            Register as Student
          </a>
        </section>
      </div>
    </div>
  );
};

export default Programs;
