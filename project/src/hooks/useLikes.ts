import { useState, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

interface UseLikesProps {
  initialLikes?: number;
  isLiked?: boolean;
  onLikeChange?: (isLiked: boolean) => void;
}

interface UseLikesReturn {
  likes: number;
  isLiked: boolean;
  toggleLike: () => void;
}

export const useLikes = ({ 
  initialLikes = 0, 
  isLiked: initialIsLiked = false,
  onLikeChange 
}: UseLikesProps = {}): UseLikesReturn => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const { showToast } = useToast();

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => {
      const newIsLiked = !prev;
      setLikes((prevLikes) => newIsLiked ? prevLikes + 1 : prevLikes - 1);
      
      // Show toast notification
      showToast(
        newIsLiked ? 'Added to your favorites!' : 'Removed from your favorites',
        newIsLiked ? 'success' : 'info'
      );

      // Call the onLikeChange callback if provided
      onLikeChange?.(newIsLiked);
      
      return newIsLiked;
    });
  }, [onLikeChange, showToast]);

  return {
    likes,
    isLiked,
    toggleLike
  };
}; 