import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';

const blogPosts = [
  {
    slug: 'iit-problem-solving-approach',
    title: 'What is IIT-Style Problem Solving and Why Does It Work?',
    excerpt:
      'Discover the systematic approach that has helped thousands of students master STEM subjects through rigorous analytical thinking.',
    category: 'Teaching Methodology',
    date: '2026-06-15',
    readTime: '5 min read',
  },
  {
    slug: 'ap-physics-preparation-guide',
    title: 'The Complete Guide to AP Physics Preparation',
    excerpt:
      'Everything you need to know to score a 5 on AP Physics exams, from study strategies to common pitfalls to avoid.',
    category: 'AP Preparation',
    date: '2026-06-10',
    readTime: '8 min read',
  },
  {
    slug: 'building-strong-math-foundation',
    title: 'Building a Strong Math Foundation in Grades 8-10',
    excerpt:
      'Why the middle school years are critical for STEM success and how to ensure your child develops strong fundamentals.',
    category: 'Mathematics',
    date: '2026-06-05',
    readTime: '6 min read',
  },
  {
    slug: 'chemistry-concepts-visualization',
    title: 'How to Help Students Visualize Abstract Chemistry Concepts',
    excerpt:
      'Practical techniques for making complex chemistry topics like molecular orbitals and reaction mechanisms more intuitive.',
    category: 'Chemistry',
    date: '2026-05-28',
    readTime: '7 min read',
  },
  {
    slug: 'stem-competitions-worth-it',
    title: 'Are STEM Competitions Worth It for Your Child?',
    excerpt:
      'Weighing the benefits and considerations of Math Olympiads, Science Bowls, and other competitive STEM activities.',
    category: 'Student Success',
    date: '2026-05-20',
    readTime: '5 min read',
  },
  {
    slug: 'choosing-right-ap-courses',
    title: 'Choosing the Right AP STEM Courses for College Admissions',
    excerpt:
      'Strategic guidance on selecting AP Math and Science courses that align with your college and career goals.',
    category: 'College Prep',
    date: '2026-05-15',
    readTime: '6 min read',
  },
];

const categories = [
  'All Posts',
  'Teaching Methodology',
  'AP Preparation',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Student Success',
  'College Prep',
];

export default function Blog() {
  return (
    <>
      <SEO
        title="STEM Education Blog"
        description="Expert insights on STEM education, IIT-style problem solving, AP exam preparation, and strategies for academic success in Math, Physics, and Chemistry."
        keywords="STEM education blog, AP exam tips, Math tutoring advice, Physics learning, Chemistry education, IIT problem solving"
        canonicalUrl="/blog"
      />

      <HeroSection
        title="STEM Education Insights"
        subtitle="Expert guidance on mastering Math, Physics, and Chemistry"
        primaryButtonText="Book Free Assessment"
        secondaryButtonText="View Programs"
      />

      <section className="section-padding bg-white">
        <div className="section-container max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="card hover:scale-105"
              >
                <div className="mb-4">
                  <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 hover:text-secondary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              More articles coming soon! Subscribe to get notified.
            </p>
            <Link to="/contact" className="btn btn-secondary">
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="section-container max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Want Personalized Guidance?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Reading about STEM education is great, but personalized mentorship
            takes learning to the next level. Book a free assessment to discuss
            your child's specific goals and challenges.
          </p>
          <Link to="/assessment" className="btn btn-accent text-lg">
            Book Free Assessment
          </Link>
        </div>
      </section>
    </>
  );
}
