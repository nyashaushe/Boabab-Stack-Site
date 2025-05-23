import React from 'react';
import { Monitor, Zap, Bot, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Monitor className="w-6 h-6 text-white" />, 
    title: "Website Development",
    description: "We craft modern, responsive, and SEO-optimized websites tailored to your brand and business goals. From landing pages to complex web apps, our solutions are built for performance, accessibility, and growth."
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />, 
    title: "AI Automations",
    description: "Automate repetitive tasks, streamline workflows, and unlock new efficiencies with custom AI-powered solutions. We design intelligent automations that save you time and let your team focus on what matters most."
  },
  {
    icon: <Bot className="w-6 h-6 text-white" />, 
    title: "AI Agent Creation",
    description: "Deploy smart AI agents for customer support, lead generation, and data processing. Our agents are tailored to your business needs, providing 24/7 assistance and actionable insights."
  },
  {
    icon: <BarChart className="w-6 h-6 text-white" />, 
    title: "Digital Marketing",
    description: "Grow your online presence with data-driven marketing strategies. We offer SEO, content marketing, and targeted campaigns to attract, engage, and convert your ideal customers."
  }
];

const Services: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200 } },
    hover: { scale: 1.2, rotate: 15, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05, color: "#A78BFA" }}
          >
            Our Solutions
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover how our comprehensive digital solutions can transform your business, drive innovation, and deliver measurable results in a rapidly evolving world.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 10px 25px -5px rgba(167, 139, 250, 0.4)",
                background: "linear-gradient(to bottom right, rgba(126, 34, 206, 0.3), rgba(79, 70, 229, 0.2))"
              }}
              className="card-gradient rounded-lg p-6 transition-all duration-300 backdrop-blur-sm border border-purple-500/10"
            >
              <motion.div 
                className="bg-white/10 rounded-lg p-3 w-fit mb-4"
                variants={iconVariants}
                whileHover="hover"
              >
                {service.icon}
              </motion.div>
              <motion.h3 
                className="text-lg font-semibold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {service.title}
              </motion.h3>
              <motion.p 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;