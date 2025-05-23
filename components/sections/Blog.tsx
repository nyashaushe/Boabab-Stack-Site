import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Added useRouter
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag, ChevronRight, Clock } from 'lucide-react';
import Button from '@/components/ui/Button'; // Updated path
import { BlogPost } from '@/services/api/blog'; // Assuming BlogPost type is exported from your service

// Mock data for blog posts - this can be kept for fallback or removed if posts prop is always provided
const mockBlogPosts: BlogPost[] = [ // Renamed to avoid conflict, and typed
  {
    id: 1,
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    image: '/blog/web-dev.jpg',
    author: 'John Doe',
    date: 'April 29, 2025',
    readTime: '5 min read',
    category: 'Technology',
    tags: ['Web Development', 'Future Tech', 'Trends']
  },
  {
    id: 2,
    title: 'Building Scalable Applications',
    excerpt: 'Best practices and strategies for building applications that can handle growth.',
    image: '/blog/scalable.jpg',
    author: 'Jane Smith',
    date: 'April 28, 2025',
    readTime: '7 min read',
    category: 'Development',
    tags: ['Scalability', 'Architecture', 'Best Practices']
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    excerpt: 'Essential design principles for creating intuitive and engaging user experiences.',
    image: '/blog/design.jpg',
    author: 'Mike Johnson',
    date: 'April 27, 2025',
    readTime: '6 min read',
    category: 'Design',
    tags: ['UI/UX', 'Design', 'User Experience'],
    // Ensure other required fields from BlogPost type are present if not already
    author: 'Mike Johnson', // Added missing author
    content: 'Content for UI/UX Design Principles...', // Added missing content
    featuredImage: '/blog/design.jpg', // Added missing featuredImage
    publishedAt: 'April 27, 2025', // Added missing publishedAt
  }
];

// Mock data for categories
const categories = [ // This can also be made dynamic if needed
  'All',
  'Technology',
  'Development',
  'Design',
  'Business',
  'Marketing'
];

interface BlogSectionProps { // Defined props for the component
  posts?: BlogPost[];
}

const Blog: React.FC<BlogSectionProps> = ({ posts }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const dataToFilter = posts || mockBlogPosts; // Use passed posts or fallback to mock

  // Filter posts based on search query and selected category
  const filteredPosts = dataToFilter.filter(post => {
    const titleMatch = post.title?.toLowerCase().includes(searchQuery.toLowerCase());
    // Assuming 'excerpt' might not exist directly on BlogPost type, use description or content
    const contentMatch = post.content?.toLowerCase().includes(searchQuery.toLowerCase()); 
    const matchesSearch = titleMatch || contentMatch;
    const matchesCategory = selectedCategory === 'All' || post.categories?.includes(selectedCategory) || post.category === selectedCategory; // Adjusted for potential categories array or single category
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Blog</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in technology and development.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.featuredImage || post.image || '/placeholder-image.jpg'} // Use featuredImage or fallback
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                    {/* Assuming post.categories is an array, take the first one, or use post.category */}
                    {post.categories?.[0] || post.category || 'General'} 
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{post.author || 'Anonymous'}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime || '5 min read'} {/* Fallback for readTime */}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                {/* Use content snippet as excerpt if excerpt is not available */}
                <p className="text-gray-400 mb-4"> 
                  {post.excerpt || post.content?.substring(0, 100) + '...' || 'No excerpt available.'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full group"
                  onClick={() => router.push(`/blog/${post.id}`)} // Changed to router.push
                >
                  Read More
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="ghost" className="group">
            Load More Articles
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
