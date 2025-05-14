import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Lightbulb, Zap } from 'lucide-react';
import Button from '../ui/Button';

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Visionary leader with 15+ years of experience in tech innovation.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Tech expert specializing in cloud architecture and AI solutions.',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Award-winning designer with a passion for user experience.',
    social: {
      linkedin: 'https://linkedin.com',
      dribbble: 'https://dribbble.com'
    }
  }
];

// Mock data for company values
const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Innovation',
    description: 'Pushing boundaries and embracing new technologies to solve complex problems.'
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Customer First',
    description: 'Putting our clients\' needs at the center of everything we do.'
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Excellence',
    description: 'Striving for the highest quality in every project we undertake.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Agility',
    description: 'Adapting quickly to change and delivering results efficiently.'
  }
];

const About: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-dark to-blue-900/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Company Overview */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            About Baobab Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
          >
            We're a team of passionate technologists dedicated to transforming businesses through innovative digital solutions.
          </motion.p>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <Award className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white text-center mb-4">Our Mission</h3>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            To empower businesses with cutting-edge technology solutions that drive growth, 
            enhance efficiency, and create lasting value in an ever-evolving digital landscape.
          </p>
        </motion.div>

        {/* Company Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-white text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-purple-400 mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Meet Our Team</h3>
            <p className="text-gray-300">The talented people behind our success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-1">{member.name}</h4>
                  <p className="text-purple-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join Our Journey?
          </h3>
          <p className="text-gray-300 mb-8">
            Let's work together to create something extraordinary.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 