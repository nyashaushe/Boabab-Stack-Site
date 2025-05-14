import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarField from '../ui/StarField';

const NotFoundPage: React.FC = () => {
  return (
    <StarField>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-300 mb-8">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </StarField>
  );
};

export default NotFoundPage;
