import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, User, Facebook, Twitter, Linkedin, ChevronLeft } from 'lucide-react';
import Button from '../ui/Button';

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: 'The Future of Web Development',
  content: `
    <p>Web development is constantly evolving, with new technologies and frameworks emerging at a rapid pace. In this article, we'll explore the key trends shaping the future of web development and how they're transforming the way we build and deploy web applications.</p>
    
    <h2>The Rise of WebAssembly</h2>
    <p>WebAssembly (Wasm) is revolutionizing web development by allowing developers to write high-performance code in languages like C++, Rust, and Go. This technology enables near-native performance in the browser, opening up new possibilities for complex applications.</p>
    
    <h2>Progressive Web Apps (PWAs)</h2>
    <p>PWAs continue to gain traction as they bridge the gap between web and native applications. With features like offline support, push notifications, and app-like experiences, PWAs are becoming the preferred choice for many businesses.</p>
    
    <h2>Serverless Architecture</h2>
    <p>The serverless paradigm is changing how we think about backend development. By abstracting away server management, developers can focus on writing code and delivering value without worrying about infrastructure.</p>
    
    <h2>AI and Machine Learning in Web Development</h2>
    <p>Artificial Intelligence and Machine Learning are making their way into web development, enabling smarter applications that can learn from user behavior and provide personalized experiences.</p>
  `,
  image: '/blog/web-dev.jpg',
  author: {
    name: 'John Doe',
    role: 'Senior Web Developer',
    avatar: '/team/john-doe.jpg',
    bio: 'John is a passionate web developer with over 10 years of experience in building modern web applications.'
  },
  date: 'April 29, 2025',
  readTime: '5 min read',
  category: 'Technology',
  tags: ['Web Development', 'Future Tech', 'Trends']
};

// Mock data for related posts
const relatedPosts = [
  {
    id: 2,
    title: 'Building Scalable Applications',
    image: '/blog/scalable.jpg',
    date: 'April 28, 2025',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    image: '/blog/design.jpg',
    date: 'April 27, 2025',
    readTime: '6 min read'
  }
];

import StarField from '../ui/StarField';

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <StarField>
      <article className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8">
            <Button
              variant="ghost"
              className="group"
              onClick={() => navigate('/blog')}
            >
              <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12">
            <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
              {blogPost.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400 mb-8">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {blogPost.author.name}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {blogPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {blogPost.readTime}
              </span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </motion.div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12">
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 p-6 bg-gray-800 rounded-xl">
              <div className="flex items-center gap-4">
                <img
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{blogPost.author.name}</h3>
                  <p className="text-gray-400">{blogPost.author.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">{blogPost.author.bio}</p>
            </motion.div>

            {/* Social Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Share this article:</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-800 text-gray-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-800 text-gray-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-800 text-gray-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </article>
    </StarField>
  );
};

export default BlogPost;
