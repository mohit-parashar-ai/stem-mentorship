import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import ProgramCard from '../components/common/ProgramCard';
import CTABanner from '../components/common/CTABanner';

const programs = [
  {
    title: 'STEM Foundation',
    grade: 'Grades 8-10',
    description:
      'Build a rock-solid foundation in Mathematics, Physics, and Chemistry. Perfect for students beginning their STEM journey who want to develop strong problem-solving skills.',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    duration: '12-16 weeks',
    highlights: [
      'Core concept mastery across all three subjects',
      'Introduction to IIT-style problem solving',
      'Weekly practice problem sets',
      'Progress assessments every 4 weeks',
      'Parent progress reports',
    ],
  },
  {
    title: 'Advanced STEM',
    grade: 'Grades 11-12',
    description:
      'Advanced coverage of complex STEM topics for high school students preparing for college-level coursework and competitive exams.',
    subjects: ['Advanced Math', 'Advanced Physics', 'Advanced Chemistry'],
    duration: '16-20 weeks',
    highlights: [
      'Deep dives into advanced topics',
      'Rigorous IIT-level problem solving',
      'College prep and exam strategies',
      'University application support',
      'Research project guidance',
    ],
  },
  {
    title: 'AP Physics',
    grade: 'Grades 11-12',
    description:
      'Comprehensive preparation for AP Physics 1, 2, C: Mechanics, and C: Electricity & Magnetism with a focus on conceptual understanding and problem-solving mastery.',
    subjects: ['AP Physics 1', 'AP Physics 2', 'AP Physics C'],
    duration: '20-24 weeks',
    highlights: [
      'Complete AP curriculum coverage',
      'AP exam strategies and practice tests',
      'Lab experiment analysis',
      'Free Response Question (FRQ) mastery',
      'Score 5 preparation focus',
    ],
  },
  {
    title: 'AP Chemistry',
    grade: 'Grades 11-12',
    description:
      'Master AP Chemistry with in-depth coverage of all topics, extensive problem practice, and proven exam strategies to achieve top scores.',
    subjects: ['AP Chemistry'],
    duration: '20-24 weeks',
    highlights: [
      'All 9 AP Chemistry units covered',
      'Lab skills and experimental design',
      'Stoichiometry and problem-solving fluency',
      'FRQ and multiple choice practice',
      'Target score: 5',
    ],
  },
  {
    title: 'AP Calculus',
    grade: 'Grades 11-12',
    description:
      'Complete preparation for AP Calculus AB and BC, building strong calculus fundamentals and advanced problem-solving techniques.',
    subjects: ['AP Calculus AB', 'AP Calculus BC'],
    duration: '20-24 weeks',
    highlights: [
      'Limits, derivatives, and integrals mastery',
      'Series and differential equations (BC)',
      'Calculator and non-calculator strategies',
      'AP-style problem practice',
      'Proven 5-score methodology',
    ],
  },
  {
    title: 'Elite 1:1 Mentorship',
    grade: 'Grades 8-12',
    description:
      'Fully personalized STEM mentorship tailored to your specific goals, whether it\'s acing a specific course, preparing for competitions, or building research skills.',
    subjects: ['Custom Curriculum'],
    duration: 'Flexible',
    highlights: [
      'Completely customized learning plan',
      'Flexible scheduling and pacing',
      'Competition prep (Math Olympiad, Science Bowl, etc.)',
      'Independent research project guidance',
      'University admissions consulting',
    ],
  },
];

export default function Programs() {
  return (
    <>
      <SEO
        title="STEM Programs"
        description="Explore our comprehensive STEM programs including Foundation, Advanced, AP courses, and personalized 1:1 mentorship for Grades 8-12."
        keywords="STEM programs, AP Physics tutoring, AP Chemistry tutoring, AP Calculus tutoring, IIT-style STEM education, online STEM courses"
        canonicalUrl="/programs"
      />

      <HeroSection
        title="Comprehensive STEM Programs"
        subtitle="From foundation building to AP mastery, find the perfect program for your child's goals"
        primaryButtonText="Book Free Consultation"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Choose Your Program
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each program is designed with a clear learning pathway, combining
              conceptual depth, rigorous practice, and personalized attention to
              help your child excel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            What's Included in Every Program
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Live Interactive Sessions
                </h3>
                <p className="text-gray-600">
                  Weekly live sessions via Zoom with digital whiteboard and
                  screen sharing for collaborative problem solving.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Comprehensive Study Materials
                </h3>
                <p className="text-gray-600">
                  Custom problem sets, concept notes, formula sheets, and
                  practice tests tailored to each program.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  24/7 Doubt Resolution
                </h3>
                <p className="text-gray-600">
                  Ask questions anytime via email or WhatsApp and receive
                  detailed explanations within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-600">
                  Regular assessments and detailed progress reports shared with
                  parents to monitor improvement and identify areas for focus.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Flexible Scheduling
                </h3>
                <p className="text-gray-600">
                  Sessions scheduled to fit your time zone and family schedule
                  with options for rescheduling when needed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  Parent Communication
                </h3>
                <p className="text-gray-600">
                  Regular updates and quarterly review calls to discuss progress,
                  goals, and any adjustments to the learning plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            How to Choose the Right Program
          </h2>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  For Students in Grades 8-10
                </h3>
                <p className="text-gray-700">
                  Start with <strong>STEM Foundation</strong> to build strong
                  fundamentals across Mathematics, Physics, and Chemistry. This
                  program sets you up for success in advanced courses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  For Students in Grades 11-12
                </h3>
                <p className="text-gray-700">
                  Choose <strong>Advanced STEM</strong> for comprehensive
                  coverage, or select specific <strong>AP programs</strong> (AP
                  Physics, AP Chemistry, AP Calculus) if you're preparing for AP
                  exams and want focused, exam-oriented preparation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  For Specific Goals or Competition Prep
                </h3>
                <p className="text-gray-700">
                  Select <strong>Elite 1:1 Mentorship</strong> for a fully
                  customized program tailored to unique goals like Math Olympiad,
                  Science Bowl, research projects, or university admissions
                  support.
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <p className="text-gray-700 font-semibold">
                  Not sure which program is right for your child?
                </p>
                <p className="text-gray-600 mt-2">
                  Book a free assessment call and I'll evaluate your child's
                  current level, discuss their goals, and recommend the best
                  program to help them succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Start Your STEM Journey?"
        description="Book a free assessment call to discuss your goals and find the perfect program."
      />
    </>
  );
}
