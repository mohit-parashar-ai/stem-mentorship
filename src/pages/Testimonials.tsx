import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import TestimonialCard from '../components/common/TestimonialCard';
import CTABanner from '../components/common/CTABanner';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Parent of Grade 11 Student',
    country: 'USA',
    content:
      "FOI's teaching transformed my daughter's approach to Physics. She went from struggling to scoring in the top 5% of her AP Physics class. The IIT-style methodology helped her understand concepts at a much deeper level.",
    rating: 5,
  },
  {
    name: 'Ahmed Al-Mansouri',
    role: 'Parent of Grade 10 Student',
    country: 'UAE',
    content:
      "The IIT-style problem solving methodology is exactly what we were looking for. Our son now tackles complex Math problems with confidence and has developed genuine problem-solving skills that will serve him throughout his education.",
    rating: 5,
  },
  {
    name: 'Jennifer Chen',
    role: 'Parent of Grade 12 Student',
    country: 'Canada',
    content:
      "Exceptional mentor! FOI helped our daughter secure admission to her dream engineering program at the University of Toronto with a strong foundation in STEM. She credits them for her 95+ average in Physics and Calculus.",
    rating: 5,
  },
  {
    name: 'Rajesh Patel',
    role: 'Parent of Grade 9 Student',
    country: 'USA',
    content:
      "My son was getting B's in Math and Chemistry. Within 3 months of working with FOI, he's consistently scoring A's and actually looks forward to his sessions. The personalized attention and clear explanations made all the difference.",
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Parent of Grade 12 Student',
    country: 'USA',
    content:
      "FOI prepared my daughter for AP Chemistry and AP Calculus BC. She scored 5 on both exams! Their structured approach, practice problems, and exam strategies were invaluable. Highly recommend for AP preparation.",
    rating: 5,
  },
  {
    name: 'Mohammed Hassan',
    role: 'Parent of Grade 11 Student',
    country: 'Saudi Arabia',
    content:
      "Outstanding educator with deep subject knowledge. My son's analytical thinking has improved dramatically. FOI doesn't just teach formulas; they teach how to think like an engineer and approach problems systematically.",
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Parent of Grade 10 Student',
    country: 'Canada',
    content:
      "The best STEM tutor we've worked with. FOI is patient, knowledgeable, and genuinely cares about student success. Our daughter's confidence in Math has soared, and she's now considering engineering for college.",
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Parent of Grade 12 Student',
    country: 'USA',
    content:
      "FOI helped our son prepare for the Math Olympiad while also keeping his regular coursework strong. Their ability to challenge advanced students while building fundamentals is remarkable. Son got into MIT!",
    rating: 5,
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Parent of Grade 9 Student',
    country: 'Qatar',
    content:
      "We tried three different tutors before finding FOI. They're in a different league. Their teaching style is engaging, their explanations are crystal clear, and they adapt to my daughter's learning pace perfectly.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <>
      <SEO
        title="Testimonials & Success Stories"
        description="Read success stories from parents and students who have benefited from Manu Pande's IIT-style STEM tutoring and mentorship."
        canonicalUrl="/testimonials"
      />

      <HeroSection
        title="Success Stories from Around the Globe"
        subtitle="Real results from students and parents who trust FOI's IIT-style STEM mentorship"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What Parents Are Saying
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Families from USA, Canada, UAE, Saudi Arabia, and Qatar share their
              experiences with our premium STEM mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Common Results Our Students Achieve
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-secondary mb-2">95%+</div>
              <p className="text-gray-700">
                Average improvement in test scores within the first semester
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-secondary mb-2">
                AP Score 5
              </div>
              <p className="text-gray-700">
                Majority of AP students achieve top scores (4 or 5) on AP exams
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-secondary mb-2">
                Top 10%
              </div>
              <p className="text-gray-700">
                Students consistently rank in top 10% of their class after one
                year
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-secondary mb-2">
                100%
              </div>
              <p className="text-gray-700">
                College admission rate to preferred STEM programs and
                universities
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join hundreds of students who have transformed their STEM skills and
            achieved their academic goals with personalized mentorship.
          </p>
          <a href="/assessment" className="btn btn-accent text-lg">
            Book Your Free Assessment
          </a>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
