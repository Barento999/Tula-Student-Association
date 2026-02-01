import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

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
    <div className="min-h-screen">
      <PageHeader
        title="Our Programs"
        subtitle="Comprehensive educational support for all grade levels"
        icon="📚"
      />

      <div className="container">
        <section className="text-center mb-12">
          <p className="text-lg text-secondary leading-relaxed max-w-[800px] mx-auto">
            Our summer programs are designed to provide comprehensive
            educational support to students at all levels. Each program is
            tailored to meet the specific needs of different age groups and
            academic stages, ensuring that every student receives the attention
            and resources they need to succeed.
          </p>
        </section>

        <div className="mb-[60px] space-y-8">
          {programs.map((program) => (
            <Card key={program.id}>
              <div className="flex items-center gap-5 mb-5 max-md:flex-col max-md:text-center">
                <div className="text-[64px]">{program.icon}</div>
                <div>
                  <h2 className="text-[28px] text-primary mb-2">
                    {program.title}
                  </h2>
                  <span className="inline-block bg-whatsapp-green text-main px-3 py-1 rounded-2xl text-sm font-semibold">
                    {program.grades}
                  </span>
                </div>
              </div>
              <p className="text-lg text-secondary leading-relaxed mb-6">
                {program.description}
              </p>
              <div>
                <h3 className="text-xl text-primary mb-4">What We Offer:</h3>
                <ul className="list-none p-0">
                  {program.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 py-2 text-base text-secondary">
                      <span className="text-whatsapp-green text-xl font-bold">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <section className="mb-[60px]">
          <h2 className="text-[32px] text-primary mb-6 text-center">
            Program Schedule
          </h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <h3 className="text-xl text-primary mb-3">📅 Duration</h3>
                <p className="text-base text-secondary">
                  June - August (Summer Vacation)
                </p>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl text-primary mb-3">⏰ Sessions</h3>
                <p className="text-base text-secondary">
                  Morning and afternoon classes available
                </p>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl text-primary mb-3">👥 Class Size</h3>
                <p className="text-base text-secondary">
                  Small groups for personalized attention
                </p>
              </div>
              <div className="text-center p-4">
                <h3 className="text-xl text-primary mb-3">💰 Cost</h3>
                <p className="text-base text-secondary">
                  Completely FREE for all students
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="text-center py-[60px] bg-card rounded-xl border border-border">
          <h2 className="text-[32px] text-primary mb-4">Ready to Join?</h2>
          <p className="text-lg text-secondary mb-8">
            Register now to secure your spot in our summer programs
          </p>
          <a href="/student-registration" className="btn btn-primary">
            Register as Student
          </a>
        </section>
      </div>
    </div>
  );
};

export default Programs;
