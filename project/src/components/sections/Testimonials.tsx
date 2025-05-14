import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Button from '../ui/Button';

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    company: 'TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    content: 'Baobab Stack transformed our digital presence completely. Their team delivered beyond our expectations, and the results have been outstanding.',
    rating: 5,
    logo: '/logos/techstart.svg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO at InnovateX',
    company: 'InnovateX',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    content: 'Working with Baobab Stack was a game-changer for our business. Their expertise in cloud solutions helped us scale our operations efficiently.',
    rating: 5,
    logo: '/logos/innovatex.svg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager at GrowthLabs',
    company: 'GrowthLabs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    content: 'The team at Baobab Stack are true professionals. They understood our needs perfectly and delivered a solution that exceeded our expectations.',
    rating: 5,
    logo: '/logos/growthlabs.svg'
  }
];

// Mock data for client logos
const clientLogos = [
  { id: 1, name: 'TechStart', logo: '/logos/techstart.svg' },
  { id: 2, name: 'InnovateX', logo: '/logos/innovatex.svg' },
  { id: 3, name: 'GrowthLabs', logo: '/logos/growthlabs.svg' },
  { id: 4, name: 'DataFlow', logo: '/logos/dataflow.svg' },
  { id: 5, name: 'CloudNine', logo: '/logos/cloudnine.svg' },
  { id: 6, name: 'FutureTech', logo: '/logos/futuretech.svg' }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dark to-blue-900/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-300"
          >
            Trusted by leading companies worldwide
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="relative">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                      />
                      <Quote className="absolute -top-4 -right-4 text-purple-500 w-8 h-8" />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-semibold text-white">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                      <p className="text-purple-400">{testimonials[currentIndex].company}</p>
                      <div className="flex justify-center mt-2">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {testimonials[currentIndex].content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xl font-semibold text-gray-400 mb-12"
          >
            Trusted by Industry Leaders
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {clientLogos.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-300 mb-8">
            Join our growing list of satisfied clients and experience the Baobab Stack difference.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;