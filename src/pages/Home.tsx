import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import TestimonialCard from '../components/common/TestimonialCard';
import FAQAccordion from '../components/common/FAQAccordion';
import CTABanner from '../components/common/CTABanner';
import { Link } from 'react-router-dom';

const whyChoose = [
  {
    icon: '🎓',
    title: 'IIT-Level Expertise',
    description:
      'Learn from an engineering professional with proven IIT-style problem-solving methodology.',
  },
  {
    icon: '👨‍🏫',
    title: '15+ Years Experience',
    description:
      'Benefit from over a decade of teaching excellence with students worldwide.',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    description:
      'Serving students across USA, Canada, UAE, Saudi Arabia, and Qatar.',
  },
  {
    icon: '📈',
    title: 'Proven Results',
    description:
      'Track record of students achieving top grades and gaining admission to premier institutions.',
  },
];

const subjects = [
  {
    name: 'Mathematics',
    icon: '∫',
    topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics'],
  },
  {
    name: 'Physics',
    icon: '⚛',
    topics: ['Mechanics', 'Electromagnetism', 'Thermodynamics', 'Optics'],
  },
  {
    name: 'Chemistry',
    icon: '⚗',
    topics: ['Organic', 'Inorganic', 'Physical', 'Analytical'],
  },
];

const journey = [
  {
    step: '1',
    title: 'Free Assessment',
    description:
      'Book a comprehensive STEM assessment to identify strengths and gaps.',
  },
  {
    step: '2',
    title: 'Custom Learning Plan',
    description:
      'Receive a personalized roadmap tailored to your child\'s goals and grade level.',
  },
  {
    step: '3',
    title: 'Live Sessions',
    description:
      'Engage in interactive 1:1 or small group sessions with Manu.',
  },
  {
    step: '4',
    title: 'Continuous Progress',
    description:
      'Track improvement through regular assessments and detailed feedback.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Parent of Grade 11 Student',
    country: 'USA',
    content:
      'Manu\'s teaching transformed my daughter\'s approach to Physics. She went from struggling to scoring in the top 5% of her AP Physics class.',
  },
  {
    name: 'Ahmed Al-Mansouri',
    role: 'Parent of Grade 10 Student',
    country: 'UAE',
    content:
      'The IIT-style problem solving methodology is exactly what we were looking for. Our son now tackles complex Math problems with confidence.',
  },
  {
    name: 'Jennifer Chen',
    role: 'Parent of Grade 12 Student',
    country: 'Canada',
    content:
      'Exceptional mentor! Manu helped our daughter secure admission to her dream engineering program with a strong foundation in STEM.',
  },
];

const faqs = [
  {
    question: 'What grades do you teach?',
    answer:
      'I work with students from Grades 8-12, covering foundational to advanced STEM topics including AP-level courses.',
  },
  {
    question: 'What is IIT-style problem solving?',
    answer:
      'IIT-style teaching emphasizes deep conceptual understanding, rigorous problem-solving techniques, and developing engineering thinking. It prepares students not just for exams, but for real-world STEM challenges.',
  },
  {
    question: 'Do you offer group classes or only 1:1?',
    answer:
      'I offer both personalized 1:1 mentorship and small group sessions (max 4 students) depending on your preference and learning goals.',
  },
  {
    question: 'How long is each session?',
    answer:
      'Standard sessions are 60-90 minutes, scheduled based on your availability and the program you choose.',
  },
  {
    question: 'What technology do I need?',
    answer:
      'All you need is a stable internet connection, a computer or tablet, and we use Zoom for live sessions with a digital whiteboard.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Book a free STEM assessment call where we\'ll discuss your child\'s goals, evaluate their current level, and design a custom learning plan.',
  },
];

export default function Home() {
  return (
    <>
      <SEO canonicalUrl="/" />

      <HeroSection
        title="Transform Your Child Into a Confident STEM Problem Solver"
        subtitle="IIT-style mentorship in Mathematics, Physics, and Chemistry for Grades 8-12"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Parents Choose Manu
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven track record of helping students master STEM subjects and
              achieve their academic goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              STEM Success Framework
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach to building deep understanding and
              problem-solving mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">1</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Conceptual Clarity
              </h3>
              <p className="text-gray-600">
                Build strong foundations by understanding the 'why' behind every
                concept, not just the 'how'.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Problem-Solving Practice
              </h3>
              <p className="text-gray-600">
                Master diverse problem types through structured practice and
                IIT-style challenges.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Engineering Thinking
              </h3>
              <p className="text-gray-600">
                Develop analytical skills and systematic approaches applicable to
                real-world STEM challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Subjects Covered
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage across core STEM subjects for Grades 8-12.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subjects.map((subject, index) => (
              <div key={index} className="card text-center hover:scale-105">
                <div className="text-6xl font-bold text-secondary mb-4">
                  {subject.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {subject.name}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {subject.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-accent mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/programs" className="btn btn-primary">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-primary to-blue-900 text-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your STEM Success Journey
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              A clear path from assessment to mastery in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journey.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/assessment" className="btn btn-accent text-lg">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What Parents Are Saying
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from families across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn btn-secondary">
              Read More Success Stories
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
