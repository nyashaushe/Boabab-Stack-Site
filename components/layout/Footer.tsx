import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Github as GitHub } from 'lucide-react';

const navigation = {
  product: [
    { name: 'Features', href: '#' },
    { name: 'Integrations', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Changelog', href: '#' },
    { name: 'Documentation', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Status', href: '#' },
    { name: 'Community', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Licensing', href: '#' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: GitHub },
  ],
};

const Footer: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 300 } },
    hover: { 
      scale: 1.2, 
      rotate: 15, 
      color: "#A78BFA",
      transition: { type: "spring", stiffness: 500 }
    }
  };

  const linkVariants = {
    hover: { 
      x: 5, 
      color: "#A78BFA",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <footer className="bg-gray-900 relative overflow-hidden" aria-labelledby="footer-heading">
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          background: "radial-gradient(circle at bottom, rgba(139, 92, 246, 0.1), transparent 70%)"
        }}
      />
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <motion.div 
        className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Baobab Stack
            </motion.div>
            <motion.p 
              className="text-sm leading-6 text-gray-300"
              variants={itemVariants}
            >
              Making the world a better place through innovative software solutions and development tools.
            </motion.p>
            <motion.div className="flex space-x-6" variants={containerVariants}>
              {navigation.social.map((item, index) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-400 hover:text-gray-300"
                  variants={socialIconVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <motion.h3 
                  className="text-sm font-semibold leading-6 text-white"
                  whileHover={{ color: "#A78BFA" }}
                >
                  Product
                </motion.h3>
                <motion.ul 
                  role="list" 
                  className="mt-6 space-y-4"
                  variants={containerVariants}
                >
                  {navigation.product.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <motion.a 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                        variants={linkVariants}
                        whileHover="hover"
                      >
                        {item.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div className="mt-10 md:mt-0" variants={itemVariants}>
                <motion.h3 
                  className="text-sm font-semibold leading-6 text-white"
                  whileHover={{ color: "#A78BFA" }}
                >
                  Company
                </motion.h3>
                <motion.ul 
                  role="list" 
                  className="mt-6 space-y-4"
                  variants={containerVariants}
                >
                  {navigation.company.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <motion.a 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                        variants={linkVariants}
                        whileHover="hover"
                      >
                        {item.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <motion.h3 
                  className="text-sm font-semibold leading-6 text-white"
                  whileHover={{ color: "#A78BFA" }}
                >
                  Support
                </motion.h3>
                <motion.ul 
                  role="list" 
                  className="mt-6 space-y-4"
                  variants={containerVariants}
                >
                  {navigation.support.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <motion.a 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                        variants={linkVariants}
                        whileHover="hover"
                      >
                        {item.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div className="mt-10 md:mt-0" variants={itemVariants}>
                <motion.h3 
                  className="text-sm font-semibold leading-6 text-white"
                  whileHover={{ color: "#A78BFA" }}
                >
                  Legal
                </motion.h3>
                <motion.ul 
                  role="list" 
                  className="mt-6 space-y-4"
                  variants={containerVariants}
                >
                  {navigation.legal.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <motion.a 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                        variants={linkVariants}
                        whileHover="hover"
                      >
                        {item.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div 
          className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24"
          variants={itemVariants}
        >
          <motion.p 
            className="text-xs leading-5 text-gray-400"
            whileHover={{ color: "#E9D5FF" }}
          >
            &copy; {new Date().getFullYear()} Baobab Stack, Inc. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;