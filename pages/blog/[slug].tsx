import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Clock, Calendar, User, Facebook, Twitter, Linkedin, ChevronLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import StarField from '@/components/ui/StarField';
import { fetchBlogPosts, fetchBlogPost, BlogPost } from '@/services/api/blog'; // Import fetch functions and type
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'; // Import Next.js types

// Mock data for related posts - can be removed or fetched dynamically
const relatedPostsMock = [
  {
    id: 2, // Assuming IDs are numbers for mock data
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

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: typeof relatedPostsMock; // Keep related posts mock for now, or fetch them too
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, relatedPosts }) => {
  const router = useRouter();

  // Handles fallback: true from getStaticPaths if the page is not yet generated
  if (router.isFallback) {
    return <div>Loading page...</div>;
  }

  // If post is not found after fallback (or if fallback: false and not found)
  if (!post) {
    return <div>Error: Blog post not found.</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title} - Baobab Stack Blog</title>
        {/* Use actual post content for meta description, ensuring it's plain text */}
        <meta name="description" content={post.content?.substring(0, 160).replace(/<[^>]+>/g, '') + "..." || 'Read this blog post on Baobab Stack.'} />
      </Head>
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
                onClick={() => router.push('/blog')}
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
                {/* Assuming categories is an array, or fallback to category string */}
                {post.categories?.[0] || post.category || 'General'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400 mb-8">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author || 'Anonymous'}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime || '5 min read'}
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
              src={post.featuredImage || post.image || '/placeholder-image.jpg'}
              alt={post.title}
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
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => ( // Added type for tag
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Author Bio - Assuming author might be an object or string */}
            {typeof post.author === 'object' && post.author !== null && 'name' in post.author && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 p-6 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-4">
                  {/* @ts-ignore */}
                  {post.author.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full" />}
                  <div>
                    {/* @ts-ignore */}
                    <h3 className="text-xl font-bold text-white">{post.author.name}</h3>
                    {/* @ts-ignore */}
                    {post.author.role && <p className="text-gray-400">{post.author.role}</p>}
                  </div>
                </div>
                {/* @ts-ignore */}
                {post.author.bio && <p className="mt-4 text-gray-300">{post.author.bio}</p>}
              </motion.div>
            )}

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

          {/* Related Posts - Using mock data for now */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => router.push(`/blog/${relatedPost.id}`)}
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{relatedPost.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{relatedPost.date}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await fetchBlogPosts(); // Fetch all posts to get their IDs/slugs
    // Assuming 'id' is a number and we'll use it as a string for the slug
    const paths = posts.map(post => ({
      params: { slug: String(post.id) }, 
    }));
    return { paths, fallback: 'blocking' }; // or true if you want to show a loading state
  } catch (error) {
    console.error('Failed to fetch blog post paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (context) => {
  const slug = context.params?.slug as string;

  if (!slug) {
    return { notFound: true };
  }

  try {
    // Assuming slug is the ID, convert to number if your API expects that
    const postId = Number(slug); 
    if (isNaN(postId)) {
      return { notFound: true }; // If slug is not a valid number
    }

    const post = await fetchBlogPost(postId);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post,
        relatedPosts: relatedPostsMock, // Pass mock related posts for now
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error);
    return { notFound: true };
  }
};

export default BlogPostPage;
