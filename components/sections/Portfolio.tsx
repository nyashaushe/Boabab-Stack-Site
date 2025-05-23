import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Button from '../ui/Button';

const categories = ['All', 'Web', 'Mobile', 'AI', 'Cloud'];

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration.',
    category: 'Web',
    image: '/portfolio/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/project',
    live: 'https://project-demo.com',
  },
  {
    title: 'AI-Powered Analytics',
    description: 'Real-time analytics dashboard with machine learning predictions.',
    category: 'AI',
    image: '/portfolio/analytics.jpg',
    tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
    github: 'https://github.com/yourusername/project',
    live: 'https://project-demo.com',
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly mobile banking application.',
    category: 'Mobile',
    image: '/portfolio/banking.jpg',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    github: 'https://github.com/yourusername/project',
    live: 'https://project-demo.com',
  },
  {
    title: 'Cloud Migration Tool',
    description: 'Automated cloud migration and deployment solution.',
    category: 'Cloud',
    image: '/portfolio/cloud.jpg',
    tags: ['AWS', 'Terraform', 'Python', 'Docker'],
    github: 'https://github.com/yourusername/project',
    live: 'https://project-demo.com',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Comprehensive social media management platform.',
    category: 'Web',
    image: '/portfolio/social.jpg',
    tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/yourusername/project',
    live: 'https://project-demo.com',
  },
  {
    title: 'AI Content Generator',
    description: 'AI-powered content creation and optimization tool.',
    category: 'AI',
    image: '/portfolio/content.jpg',
    tags: ['GPT-4', 'Python', 'FastAPI', 'React'],
    github: 'https://github.com/yourusername/project',
    live: 'https://project-demo.com',
  },
];

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-900/20 to-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Our Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-300"
          >
            Explore our latest projects and success stories
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center space-x-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm text-gray-200">{project.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button variant="primary" size="lg">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;