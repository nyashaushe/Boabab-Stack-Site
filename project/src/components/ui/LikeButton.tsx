import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export interface LikeButtonProps {
  likes: number;
  isLiked: boolean;
  onToggle: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ likes, isLiked, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`flex items-center gap-1 text-sm ${
        isLiked ? 'text-purple-400' : 'text-gray-400'
      } hover:text-purple-400 transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Heart
        className={`w-4 h-4 ${
          isLiked ? 'fill-purple-400' : ''
        }`}
      />
      <span>{likes}</span>
    </motion.button>
  );
};

export default LikeButton; 