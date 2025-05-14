import React from 'react';
import { motion } from 'framer-motion';
import StarField from '../ui/StarField';

const ServicesPage: React.FC = () => {
  return (
    <StarField>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
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
                Our Services
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover how we can help transform your business with our comprehensive range of services.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service cards will go here */}
            </div>
          </div>
        </section>
      </div>
    </StarField>
  );
};

export default ServicesPage;
