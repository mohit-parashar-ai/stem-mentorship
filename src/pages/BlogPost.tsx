import { useParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import CTABanner from '../components/common/CTABanner';

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <>
      <SEO
        title="Blog Post"
        description="Read this insightful article about STEM education and problem-solving strategies."
        canonicalUrl={`/blog/${slug}`}
      />

      <article className="section-padding bg-white">
        <div className="section-container max-w-4xl">
          <div className="mb-8">
            <Link
              to="/blog"
              className="text-secondary hover:text-blue-700 font-medium inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>

          <div className="mb-8">
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Teaching Methodology
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Sample Blog Post: {slug}
            </h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <span>By Manu Pande</span>
              <span>•</span>
              <span>June 15, 2026</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-secondary p-6 mb-8">
              <p className="text-gray-700 font-medium">
                <strong>Note:</strong> This is a placeholder blog post page. In a
                production environment, you would integrate with a CMS or use
                markdown files to populate actual blog content.
              </p>
            </div>

            <p className="lead text-xl text-gray-700 mb-6">
              This is where your blog post content would appear. You can integrate
              with a headless CMS like Contentful, Sanity, or use local markdown
              files with frontmatter for static generation.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              Sample Section Heading
            </h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <h3 className="text-xl font-bold text-primary mt-6 mb-3">
              Subsection Example
            </h3>
            <p className="text-gray-700 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Key point one with detailed explanation</li>
              <li>Important consideration number two</li>
              <li>Third critical element to remember</li>
              <li>Final takeaway for this section</li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
              <h4 className="font-bold text-primary mb-3">Pro Tip:</h4>
              <p className="text-gray-700">
                This is an example of a highlighted tip or important information
                callout that you might want to emphasize in your blog posts.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">
              Conclusion
            </h2>
            <p className="text-gray-700 mb-4">
              Your concluding thoughts and key takeaways would go here, summarizing
              the main points and offering actionable advice for readers.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                MP
              </div>
              <div>
                <p className="font-bold text-primary">Manu Pande</p>
                <p className="text-gray-600">
                  Engineering Professional & STEM Educator with 15+ years of
                  teaching experience
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/blog/related-post-1" className="card hover:scale-105">
                <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  AP Preparation
                </span>
                <h4 className="text-lg font-bold text-primary mb-2">
                  Related Blog Post Title One
                </h4>
                <p className="text-gray-600 text-sm">
                  Brief excerpt of the related post to entice readers to click
                  through and read more.
                </p>
              </Link>
              <Link to="/blog/related-post-2" className="card hover:scale-105">
                <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  Mathematics
                </span>
                <h4 className="text-lg font-bold text-primary mb-2">
                  Another Related Article Title
                </h4>
                <p className="text-gray-600 text-sm">
                  Short description to give context about what this article covers
                  and why it's relevant.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CTABanner
        title="Ready to Experience World-Class STEM Mentorship?"
        description="Stop reading about success and start achieving it. Book your free assessment today."
      />
    </>
  );
}
