import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface User {
  name: string;
  avatar?: string;
}

export interface PodcastComment {
  id: number;
  user: User;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface UseCommentsProps {
  initialComments: PodcastComment[];
  onCommentAdd?: (comment: Omit<PodcastComment, 'id' | 'date' | 'likes' | 'isLiked'>) => Promise<void>;
  onCommentLike?: (commentId: number) => Promise<void>;
}

interface UseCommentsReturn {
  comments: PodcastComment[];
  addComment: (content: string, user: User) => Promise<void>;
  likeComment: (commentId: number) => Promise<void>;
}

export const useComments = ({
  initialComments,
  onCommentAdd,
  onCommentLike
}: UseCommentsProps): UseCommentsReturn => {
  const [comments, setComments] = useState<PodcastComment[]>(initialComments);
  const { showToast } = useToast();

  const addComment = async (content: string, user: User) => {
    const newComment: PodcastComment = {
      id: Date.now(),
      user,
      content,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      likes: 0,
      isLiked: false
    };

    setComments(prev => [newComment, ...prev]);

    if (onCommentAdd) {
      await onCommentAdd({ user, content });
    }
  };

  const likeComment = async (commentId: number) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked
            }
          : comment
      )
    );

    if (onCommentLike) {
      await onCommentLike(commentId);
    }
  };

  return {
    comments,
    addComment,
    likeComment
  };
}; 