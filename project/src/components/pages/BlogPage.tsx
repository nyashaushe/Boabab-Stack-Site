import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import StarField from '../ui/StarField';
import Blog from '../sections/Blog';

const BlogPage: React.FC = () => {
  return (
    <StarField>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Insights & Articles
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Explore our latest articles, tutorials, and insights about technology, development, and design.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" className="group">
                  Start Reading
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost">
                  Subscribe to Newsletter
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Featured Articles</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Discover our most popular and insightful articles handpicked by our team.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="/blog/web-dev.jpg"
                  alt="The Future of Web Development"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
                    Technology
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    The Future of Web Development
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Exploring the latest trends and technologies shaping the future of web development.
                  </p>
                  <Button variant="ghost" className="group">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="/blog/scalable.jpg"
                  alt="Building Scalable Applications"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
                    Development
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Building Scalable Applications
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Best practices and strategies for building applications that can handle growth.
                  </p>
                  <Button variant="ghost" className="group">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog Listing */}
        <Blog />
      </div>
    </StarField>
  );
};

export default BlogPage;
