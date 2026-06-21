export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  author?: string;
  imageUrl?: string;
  externalUrl?: string;
}

// Local curated blog posts (always shown)
export const localBlogPosts: BlogPost[] = [
  {
    id: 'local-1',
    slug: 'iit-problem-solving-approach',
    title: 'What is IIT-Style Problem Solving and Why Does It Work?',
    excerpt:
      'Discover the systematic approach that has helped thousands of students master STEM subjects through rigorous analytical thinking.',
    category: 'Teaching Methodology',
    date: '2026-06-15',
    readTime: '5 min read',
  },
  {
    id: 'local-2',
    slug: 'ap-physics-preparation-guide',
    title: 'The Complete Guide to AP Physics Preparation',
    excerpt:
      'Everything you need to know to score a 5 on AP Physics exams, from study strategies to common pitfalls to avoid.',
    category: 'AP Preparation',
    date: '2026-06-10',
    readTime: '8 min read',
  },
  {
    id: 'local-3',
    slug: 'building-strong-math-foundation',
    title: 'Building a Strong Math Foundation in Grades 8-10',
    excerpt:
      'Why the middle school years are critical for STEM success and how to ensure your child develops strong fundamentals.',
    category: 'Mathematics',
    date: '2026-06-05',
    readTime: '6 min read',
  },
  {
    id: 'local-4',
    slug: 'chemistry-concepts-visualization',
    title: 'How to Help Students Visualize Abstract Chemistry Concepts',
    excerpt:
      'Practical techniques for making complex chemistry topics like molecular orbitals and reaction mechanisms more intuitive.',
    category: 'Chemistry',
    date: '2026-06-01',
    readTime: '7 min read',
  },
  {
    id: 'local-5',
    slug: 'stem-competitions-worth-it',
    title: 'Are STEM Competitions Worth It for Your Child?',
    excerpt:
      'Weighing the benefits and considerations of Math Olympiads, Science Bowls, and other competitive STEM activities.',
    category: 'Student Success',
    date: '2026-05-20',
    readTime: '5 min read',
  },
  {
    id: 'local-6',
    slug: 'choosing-right-ap-courses',
    title: 'Choosing the Right AP STEM Courses for College Admissions',
    excerpt:
      'Strategic guidance on selecting AP Math and Science courses that align with your college and career goals.',
    category: 'College Prep',
    date: '2026-05-15',
    readTime: '6 min read',
  },
];

// Fetch external blog posts from foiclasses.com
export async function fetchExternalBlogs(): Promise<BlogPost[]> {
  try {
    // Note: This is a placeholder for actual API integration
    // foiclasses.com doesn't have a public API, so we would need:
    // 1. Backend proxy to scrape the blog page
    // 2. CMS API if available
    // 3. RSS feed parser if available

    // For now, return empty array
    // In production, implement actual fetching logic
    return [];
  } catch (error) {
    console.error('Error fetching external blogs:', error);
    return [];
  }
}

// Map external categories to local categories (for future use when API is implemented)
export function mapCategory(externalCategory: string): string {
  const categoryMap: Record<string, string> = {
    'JEE AND NEET PREPRATION': 'Problem Solving', // Map to relevant category
    'Foundation Classes': 'Mathematics',
    'Class X, XI, XII, CBSE, State board preparation': 'Student Success',
  };

  return categoryMap[externalCategory] || 'Teaching Methodology';
}

// Filter posts relevant to international STEM education
function isRelevantPost(post: BlogPost): boolean {
  const irrelevantKeywords = [
    'jee',
    'neet',
    'iit entrance',
    'cbse',
    'state board',
    'bhopal',
    'india',
    'eligibility criteria',
    'pnst',
    'nursing exam',
  ];

  const titleLower = post.title.toLowerCase();
  const excerptLower = post.excerpt.toLowerCase();

  return !irrelevantKeywords.some(
    (keyword) => titleLower.includes(keyword) || excerptLower.includes(keyword)
  );
}

// Get all blog posts (local + filtered external)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const externalPosts = await fetchExternalBlogs();
  const relevantExternalPosts = externalPosts.filter(isRelevantPost);

  // Combine and sort by date (newest first)
  const allPosts = [...localBlogPosts, ...relevantExternalPosts];
  allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPosts;
}

// Get all unique categories
export function getCategories(posts: BlogPost[]): string[] {
  const categories = new Set<string>();
  posts.forEach((post) => categories.add(post.category));
  return ['All Posts', ...Array.from(categories).sort()];
}

// Filter posts by category
export function filterByCategory(posts: BlogPost[], category: string): BlogPost[] {
  if (category === 'All Posts') {
    return posts;
  }
  return posts.filter((post) => post.category === category);
}

// Search posts by query
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const queryLower = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(queryLower) ||
      post.excerpt.toLowerCase().includes(queryLower) ||
      post.category.toLowerCase().includes(queryLower)
  );
}
