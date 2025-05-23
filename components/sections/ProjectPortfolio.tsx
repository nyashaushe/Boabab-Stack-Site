import React from 'react';
import { motion } from 'framer-motion';

interface ProjectProps {
  title: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: ProjectProps[] = [
  {
    title: "E-Commerce Platform Redesign",
    client: "EcoTech Solutions",
    description: "Complete redesign of their online store resulting in 45% increase in conversions and improved user experience.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Web Development", "UI/UX Design", "E-Commerce"]
  },
  {
    title: "AI-Powered Logistics System",
    client: "TrackSmart Logistics",
    description: "Implemented an intelligent tracking system that reduced operational costs by 32% in the first quarter.",
    image: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["AI Development", "Automation", "Data Analytics"]
  },
  {
    title: "Digital Marketing Campaign",
    client: "NovaTech Startup",
    description: "Comprehensive marketing strategy that increased qualified leads by 78% and enhanced brand visibility.",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Digital Marketing", "SEO", "Content Strategy"]
  },
];

const ProjectPortfolio: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 12 } 
    },
    hover: { 
      y: -10, 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(167, 139, 250, 0.3)",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } }
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
    hover: { 
      scale: 1.1, 
      backgroundColor: "rgba(167, 139, 250, 0.3)",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent 70%)"
        }}
      />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.05, color: "#A78BFA" }}
          >
            Client Projects
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explore our recent work and discover how we've helped businesses achieve their digital goals.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden backdrop-blur-sm border border-purple-500/10 bg-gradient-to-br from-gray-900/80 to-gray-800/50"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div 
                className="relative h-48 overflow-hidden"
                variants={imageVariants}
              >
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <motion.div 
                  className="absolute bottom-0 left-0 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xs font-medium text-purple-300">{project.client}</span>
                </motion.div>
              </motion.div>
              
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold text-white mb-2"
                  variants={itemVariants}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-400 text-sm mb-4"
                  variants={itemVariants}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span 
                      key={tagIndex}
                      className="px-2 py-1 text-xs rounded-full bg-purple-900/30 text-purple-300"
                      variants={tagVariants}
                      whileHover="hover"
                      custom={tagIndex}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.button 
                  className="mt-4 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  View case study
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <motion.button 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectPortfolio;