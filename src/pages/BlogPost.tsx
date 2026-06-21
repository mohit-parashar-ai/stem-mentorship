import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import CTABanner from '../components/common/CTABanner';
import { getAllBlogPosts, type BlogPost as BlogPostType } from '../lib/blogService';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        const allPosts = await getAllBlogPosts();
        const foundPost = allPosts.find((p) => p.slug === slug);

        if (foundPost) {
          setPost(foundPost);

          const related = allPosts
            .filter((p) => p.category === foundPost.category && p.slug !== slug)
            .slice(0, 2);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  if (post.externalUrl) {
    window.location.href = post.externalUrl;
    return null;
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
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

          {post.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <span>By {post.author || 'Manu Pande'}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
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
              {post.excerpt}
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

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="card hover:scale-105"
                  >
                    <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {relatedPost.category}
                    </span>
                    <h4 className="text-lg font-bold text-primary mb-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTABanner
        title="Ready to Experience World-Class STEM Mentorship?"
        description="Stop reading about success and start achieving it. Book your free assessment today."
      />
    </>
  );
}
