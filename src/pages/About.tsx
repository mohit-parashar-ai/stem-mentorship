import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import CTABanner from '../components/common/CTABanner';

export default function About() {
  return (
    <>
      <SEO
        title="About Manu Pande"
        description="Meet Manu Pande - Engineering professional with 15+ years of teaching experience. Specializing in IIT-style STEM mentorship for Grades 8-12."
        canonicalUrl="/about"
      />

      <HeroSection
        title="Meet Manu Pande"
        subtitle="Engineering Professional & STEM Educator with 15+ Years of Teaching Excellence"
        primaryButtonText="Book a Call"
        secondaryButtonText="View Programs"
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-secondary to-blue-700">
              <img
                src="/manu-pande-profile.jpg"
                alt="Manu Pande - Engineering Professional and STEM Educator"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="aspect-square flex items-center justify-center text-white p-8">
                      <div class="text-center">
                        <div class="text-8xl font-bold mb-4">MP</div>
                        <p class="text-xl">Engineering Professional</p>
                        <p class="text-lg">STEM Educator</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Engineering Leadership Meets Educational Excellence
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  With over 15 years of experience in both engineering and
                  education, I bring a unique perspective to STEM tutoring that
                  goes beyond traditional teaching methods.
                </p>
                <p>
                  My approach is rooted in the rigorous IIT-style problem-solving
                  methodology, which emphasizes deep conceptual understanding,
                  analytical thinking, and practical application of theoretical
                  knowledge.
                </p>
                <p>
                  I've had the privilege of mentoring hundreds of students across
                  the globe, helping them not just achieve top grades, but develop
                  a genuine love for Mathematics, Physics, and Chemistry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            My Teaching Philosophy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Conceptual Depth
              </h3>
              <p className="text-gray-600">
                I believe in teaching the 'why' before the 'how'. Students who
                understand concepts deeply can solve any problem, not just
                memorize solutions.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Active Problem Solving
              </h3>
              <p className="text-gray-600">
                Learning happens through doing. My sessions are highly
                interactive, with students actively solving problems rather than
                passively watching.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Personalized Approach
              </h3>
              <p className="text-gray-600">
                Every student learns differently. I adapt my teaching style to
                match each student's pace, learning preferences, and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            The IIT-Style STEM Mentorship Approach
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Systematic Problem Analysis
                </h3>
                <p className="text-gray-600">
                  Learn to break down complex problems into manageable components,
                  identify key principles, and develop structured solution
                  strategies.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Multi-Concept Integration
                </h3>
                <p className="text-gray-600">
                  Master the ability to recognize and apply multiple concepts
                  simultaneously, mirroring real-world STEM challenges and
                  competitive exam patterns.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Rigorous Practice Regimen
                </h3>
                <p className="text-gray-600">
                  Build speed and accuracy through graded problem sets, ranging
                  from foundational exercises to IIT-level challenge problems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Engineering Mindset Development
                </h3>
                <p className="text-gray-600">
                  Cultivate analytical thinking, mathematical intuition, and the
                  ability to approach unfamiliar problems with confidence and
                  systematic reasoning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Why IIT-Style Problem Solving Works
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-gray-700 mb-6">
              The Indian Institutes of Technology (IITs) are globally recognized
              for producing world-class engineers and scientists. The IIT entrance
              examination is one of the most challenging academic tests in the
              world, requiring not just knowledge but deep analytical thinking.
            </p>

            <p className="text-lg text-gray-700 mb-6">
              My teaching methodology draws from this rigorous tradition, adapted
              for international curricula. Students learn to:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Think like engineers, not just students preparing for exams
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Develop problem-solving frameworks applicable across all STEM
                  fields
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Build confidence to tackle challenging problems independently
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Excel not just in coursework, but in competitive exams like SAT,
                  AP, and beyond
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700">
              This approach has proven effective for students aiming for top
              universities and those simply wanting to master STEM fundamentals.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container max-w-5xl">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Mission & Vision
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-primary mb-4">Mission</h3>
              <p className="text-gray-700">
                To empower students globally with world-class STEM education that
                builds not just academic excellence, but lifelong problem-solving
                skills and a deep appreciation for scientific thinking.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-primary mb-4">Vision</h3>
              <p className="text-gray-700">
                To be the trusted global mentor for students seeking to master
                Mathematics, Physics, and Chemistry through rigorous,
                personalized, and engineering-focused education.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Experience IIT-Style Learning?"
        description="Book a free assessment call and discover how this proven methodology can transform your child's STEM journey."
      />
    </>
  );
}
