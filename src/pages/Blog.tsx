import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import {
  getAllBlogPosts,
  getCategories,
  filterByCategory,
  searchPosts,
  type BlogPost,
} from '../lib/blogService';

export default function Blog() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['All Posts']);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setIsLoading(true);
      try {
        const posts = await getAllBlogPosts();
        setAllPosts(posts);
        setFilteredPosts(posts);
        setCategories(getCategories(posts));
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setAllPosts([]);
        setFilteredPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  useEffect(() => {
    let posts = filterByCategory(allPosts, selectedCategory);
    if (searchQuery.trim()) {
      posts = searchPosts(posts, searchQuery);
    }
    setFilteredPosts(posts);
  }, [selectedCategory, searchQuery, allPosts]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
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
          <div className="mb-8">
            <div className="relative max-w-xl mb-8">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-6 py-3 pl-12 rounded-full border-2 border-gray-300 focus:border-secondary focus:outline-none text-gray-700"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-primary mb-6">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full border-2 transition-colors font-medium ${
                    selectedCategory === category
                      ? 'bg-secondary text-white border-secondary'
                      : 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              <p className="text-gray-600 mt-4">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery
                  ? `No posts found matching "${searchQuery}"`
                  : 'No posts available in this category'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  if (post.externalUrl) {
                    return (
                      <a
                        key={post.id}
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card hover:scale-105"
                      >
                        {post.imageUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
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
                          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          {post.readTime && <span>{post.readTime}</span>}
                        </div>
                        <div className="mt-2 flex items-center text-secondary text-sm">
                          <span>Read more</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="card hover:scale-105"
                    >
                      {post.imageUrl && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
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
                        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        {post.readTime && <span>{post.readTime}</span>}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                  Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                  {selectedCategory !== 'All Posts' && ` in ${selectedCategory}`}
                </p>
              </div>
            </>
          )}

          <div className="mt-12 text-center">
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
