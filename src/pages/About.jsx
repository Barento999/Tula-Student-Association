import PageHeader from "../components/PageHeader";

const About = () => {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="About Us"
        subtitle="Learn about our mission and the impact we're making"
        icon="ℹ️"
      />

      <div className="container">
        <section className="mb-[60px]">
          <h2 className="text-[32px] text-primary mb-6">Our Story</h2>
          <p className="text-lg text-secondary leading-relaxed mb-4">
            The Tula Students Association was founded by a group of university
            students who recognized the educational challenges facing their home
            village. What started as an informal tutoring initiative has grown
            into a comprehensive summer education program that serves hundreds
            of students each year.
          </p>
          <p className="text-lg text-secondary leading-relaxed mb-4">
            Every summer, when university students return home for vacation,
            they dedicate their time and energy to teaching junior students.
            This seasonal model ensures that students in Tula Village have
            access to quality education from passionate, knowledgeable
            volunteers who understand their community's unique needs.
          </p>
        </section>

        <section className="mb-[60px]">
          <h2 className="text-[32px] text-primary mb-6">
            Summer-Based Teaching Model
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl text-primary mb-3">June - August</h3>
              <p className="text-base text-secondary">
                Our programs run throughout the summer vacation period when
                university students are home
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl text-primary mb-3">Volunteer Teachers</h3>
              <p className="text-base text-secondary">
                University students from various disciplines volunteer their
                time and expertise
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl text-primary mb-3">Focused Learning</h3>
              <p className="text-base text-secondary">
                Intensive summer sessions help students catch up and get ahead
                in their studies
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl text-primary mb-3">Community Impact</h3>
              <p className="text-base text-secondary">
                Beyond teaching, we provide materials, tools, and financial
                support to students in need
              </p>
            </div>
          </div>
        </section>

        <section className="mb-[60px]">
          <h2 className="text-[32px] text-primary mb-6">Our Mission</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-whatsapp-green text-2xl font-bold flex-shrink-0">
                ✓
              </span>
              <p className="text-lg text-secondary">
                Provide free, quality education to elementary, secondary, and
                preparatory students
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-whatsapp-green text-2xl font-bold flex-shrink-0">
                ✓
              </span>
              <p className="text-lg text-secondary">
                Support the local community with educational tools and financial
                assistance
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-whatsapp-green text-2xl font-bold flex-shrink-0">
                ✓
              </span>
              <p className="text-lg text-secondary">
                Create a sustainable model of community-driven education
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-whatsapp-green text-2xl font-bold flex-shrink-0">
                ✓
              </span>
              <p className="text-lg text-secondary">
                Empower university students to give back to their community
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-whatsapp-green text-2xl font-bold flex-shrink-0">
                ✓
              </span>
              <p className="text-lg text-secondary">
                Bridge the educational gap in rural areas through volunteer
                efforts
              </p>
            </div>
          </div>
        </section>

        <section className="mb-[60px]">
          <h2 className="text-[32px] text-primary mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-card border border-border rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <h3 className="text-xl text-primary mb-3">📚 Free Teaching</h3>
              <p className="text-base text-secondary">
                All our teaching services are completely free for students in
                the community
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <h3 className="text-xl text-primary mb-3">
                📖 Learning Materials
              </h3>
              <p className="text-base text-secondary">
                Downloadable study materials, notes, and resources for all grade
                levels
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <h3 className="text-xl text-primary mb-3">
                💰 Financial Support
              </h3>
              <p className="text-base text-secondary">
                Assistance with school supplies, books, and other educational
                needs
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <h3 className="text-xl text-primary mb-3">🎓 Exam Preparation</h3>
              <p className="text-base text-secondary">
                Specialized support for students preparing for important exams
              </p>
            </div>
          </div>
        </section>

        <section className="mb-[60px] bg-card rounded-xl p-10 border border-border max-md:p-6">
          <h2 className="text-[32px] text-primary mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <div>
              <h4 className="text-xl text-whatsapp-green mb-3">
                Community First
              </h4>
              <p className="text-base text-secondary">
                We prioritize the needs of our community and work together to
                create lasting change
              </p>
            </div>
            <div>
              <h4 className="text-xl text-whatsapp-green mb-3">
                Education for All
              </h4>
              <p className="text-base text-secondary">
                Every child deserves access to quality education, regardless of
                their circumstances
              </p>
            </div>
            <div>
              <h4 className="text-xl text-whatsapp-green mb-3">
                Volunteer Spirit
              </h4>
              <p className="text-base text-secondary">
                Our volunteers are driven by passion and commitment to making a
                difference
              </p>
            </div>
            <div>
              <h4 className="text-xl text-whatsapp-green mb-3">
                Sustainable Impact
              </h4>
              <p className="text-base text-secondary">
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
