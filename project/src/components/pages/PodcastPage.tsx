import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Clock, Filter, Search, Mic, Video, Share2, Heart, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import ShareButtons from '../ui/ShareButtons';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import LikeButton from '../ui/LikeButton';
import { useLikes } from '../../hooks/useLikes';
import CommentSection from '../ui/CommentSection';
import { useComments, PodcastComment, User } from '../../hooks/useComments';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import StarField from '../ui/StarField';

// Define Podcast type
interface Podcast {
  id: number;
  title: string;
  description: string;
  host: string;
  guest?: string;
  date: string;
  duration: string;
  category: string;
  type: 'audio' | 'video';
  audioUrl: string;
  videoUrl?: string;
  imageUrl: string;
  likes?: number;
  isLiked?: boolean;
  comments: PodcastComment[];
}

// Mock data for podcast episodes
const MOCK_PODCASTS: Podcast[] = [
  {
    id: 1,
    title: 'The Future of Web Development',
    description: 'In this episode, we discuss emerging trends in web development and what skills will be most valuable in the coming years.',
    host: 'Sarah Johnson',
    guest: 'Michael Chen, CTO at TechForward',
    date: 'June 15, 2023',
    duration: '45:22',
    category: 'Technology',
    type: 'audio',
    audioUrl: '/podcasts/web-dev.mp3',
    imageUrl: '/podcasts/web-dev.jpg',
    likes: 128,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: {
          name: 'John Doe',
          avatar: '/avatars/john.jpg'
        },
        content: 'Great episode! Really enjoyed the discussion about future trends.',
        date: 'June 16, 2023',
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        user: {
          name: 'Jane Smith'
        },
        content: 'The insights about AI were particularly interesting.',
        date: 'June 15, 2023',
        likes: 3,
        isLiked: true
      }
    ]
  },
  {
    id: 2,
    title: 'Building Scalable Backend Systems',
    description: 'Learn about architecture patterns and best practices for building backend systems that can scale to millions of users.',
    host: 'David Wilson',
    guest: 'Emily Rodriguez, Lead Engineer at ScaleUp',
    date: 'May 22, 2023',
    duration: '52:10',
    category: 'Development',
    type: 'video',
    audioUrl: '/podcasts/scalable.mp3',
    imageUrl: '/podcasts/scalable.jpg',
    likes: 95,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: {
          name: 'John Doe',
          avatar: '/avatars/john.jpg'
        },
        content: 'Great episode! Really enjoyed the discussion about future trends.',
        date: 'June 16, 2023',
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        user: {
          name: 'Jane Smith'
        },
        content: 'The insights about AI were particularly interesting.',
        date: 'June 15, 2023',
        likes: 3,
        isLiked: true
      }
    ]
  },
  {
    id: 3,
    title: 'AI in Modern Business Applications',
    description: 'Exploring how artificial intelligence is transforming business operations and decision making processes.',
    host: 'Sarah Johnson',
    guest: 'Dr. James Lee, AI Researcher',
    date: 'April 10, 2023',
    duration: '38:45',
    category: 'Technology',
    type: 'audio',
    audioUrl: '/podcasts/ai-business.mp3',
    imageUrl: '/podcasts/ai-business.jpg',
    likes: 110,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: {
          name: 'John Doe',
          avatar: '/avatars/john.jpg'
        },
        content: 'Great episode! Really enjoyed the discussion about future trends.',
        date: 'June 16, 2023',
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        user: {
          name: 'Jane Smith'
        },
        content: 'The insights about AI were particularly interesting.',
        date: 'June 15, 2023',
        likes: 3,
        isLiked: true
      }
    ]
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    description: 'Essential design principles for creating intuitive and engaging user experiences.',
    host: 'Lisa Chen',
    guest: 'Alex Thompson, Senior Designer at DesignCo',
    date: 'March 28, 2023',
    duration: '41:15',
    category: 'Design',
    type: 'audio',
    audioUrl: '/podcasts/design-principles.mp3',
    imageUrl: '/podcasts/design-principles.jpg',
    likes: 80,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: {
          name: 'John Doe',
          avatar: '/avatars/john.jpg'
        },
        content: 'Great episode! Really enjoyed the discussion about future trends.',
        date: 'June 16, 2023',
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        user: {
          name: 'Jane Smith'
        },
        content: 'The insights about AI were particularly interesting.',
        date: 'June 15, 2023',
        likes: 3,
        isLiked: true
      }
    ]
  },
  {
    id: 5,
    title: 'Cloud Computing Best Practices',
    description: 'Expert insights on optimizing cloud infrastructure and reducing costs.',
    host: 'David Wilson',
    guest: 'Sarah Martinez, Cloud Architect at CloudScale',
    date: 'March 15, 2023',
    duration: '48:30',
    category: 'Technology',
    type: 'video',
    audioUrl: '/podcasts/cloud-computing.mp3',
    imageUrl: '/podcasts/cloud-computing.jpg',
    likes: 100,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: {
          name: 'John Doe',
          avatar: '/avatars/john.jpg'
        },
        content: 'Great episode! Really enjoyed the discussion about future trends.',
        date: 'June 16, 2023',
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        user: {
          name: 'Jane Smith'
        },
        content: 'The insights about AI were particularly interesting.',
        date: 'June 15, 2023',
        likes: 3,
        isLiked: true
      }
    ]
  },
  {
    id: 6,
    title: 'Startup Growth Strategies',
    description: 'Proven strategies for scaling your startup and attracting investors.',
    host: 'Sarah Johnson',
    guest: 'Mark Anderson, Venture Capitalist',
    date: 'February 28, 2023',
    duration: '55:20',
    category: 'Business',
    type: 'audio',
    audioUrl: '/podcasts/startup-growth.mp3',
    imageUrl: '/podcasts/startup-growth.jpg',
    likes: 70,
    isLiked: false,
    comments: [
      {
        id: 1,
        user: {
          name: 'John Doe',
          avatar: '/avatars/john.jpg'
        },
        content: 'Great episode! Really enjoyed the discussion about future trends.',
        date: 'June 16, 2023',
        likes: 5,
        isLiked: false
      },
      {
        id: 2,
        user: {
          name: 'Jane Smith'
        },
        content: 'The insights about AI were particularly interesting.',
        date: 'June 15, 2023',
        likes: 3,
        isLiked: true
      }
    ]
  }
];

// Mock categories
const CATEGORIES = ['All', 'Technology', 'Development', 'Business', 'Design'];

// Mock function to get podcasts (replace with actual API call later)
const getPodcasts = async (): Promise<Podcast[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_PODCASTS;
};

interface PodcastEpisodeProps {
  episode: Podcast;
  onPlay: (episode: Podcast) => void;
  isPlaying: boolean;
  isActive: boolean;
}

const PodcastEpisode: React.FC<PodcastEpisodeProps> = ({ episode, onPlay, isPlaying, isActive }) => {
  const { likes, isLiked, toggleLike } = useLikes({
    initialLikes: episode.likes || 0,
    isLiked: episode.isLiked || false,
    onLikeChange: (isLiked) => {
      console.log(`Episode ${episode.id} ${isLiked ? 'liked' : 'unliked'}`);
    }
  });

  const { comments, addComment, likeComment } = useComments({
    initialComments: episode.comments || [],
    onCommentAdd: async (comment) => {
      console.log('Adding comment:', comment);
    },
    onCommentLike: async (commentId) => {
      console.log('Liking comment:', commentId);
    }
  });

  const { showToast } = useToast();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    showToast('Link copied to clipboard!', 'success');
  };

  return (
    
      <motion.div 
        className={`bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${isActive ? 'border border-purple-500 shadow-purple-500/20' : 'hover:shadow-purple-500/10'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        whileHover={{ y: -5 }}
      >
        <div className="relative">
          <img 
            src={episode?.imageUrl} 
            alt={episode?.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-lg font-semibold mb-1">{episode?.title}</h3>
            <p className="text-gray-300 text-sm">{episode?.duration}</p>
          </div>
        </div>

      <div className="p-4">
        <p className="text-gray-300 text-sm mb-4">{episode?.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onPlay(episode)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isPlaying && isActive ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{isPlaying && isActive ? 'Pause' : 'Play'}</span>
            </button>
            
            <LikeButton
              likes={likes}
              isLiked={isLiked}
              onToggle={toggleLike}
            />
          </div>
          
          <ShareButtons
            url={`/podcast/${episode?.id}`}
            title={episode?.title}
            description={episode?.description}
            onShare={handleShare}
          />
        </div>
      </div>

      {/* Comments Section */}
      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <h4 className="text-white font-medium">Comments</h4>
        </div>
        <CommentSection
          episodeId={episode.id}
          comments={comments}
          onAddComment={addComment}
          onLikeComment={likeComment}
        />
      </div>

      <div className="mt-4">
        <Link
          to={`/podcast/${episode?.id}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors"
        >
          <span>View full episode</span>
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const AudioPlayer: React.FC<{ 
  currentEpisode: Podcast | null; 
  isPlaying: boolean; 
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
}> = ({ 
  currentEpisode, 
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onVolumeChange,
  onSeek,
  onSkipForward,
  onSkipBackward
}) => {
  if (!currentEpisode) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <img 
            src={currentEpisode?.imageUrl} 
            alt={currentEpisode?.title} 
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <h4 className="text-white font-medium text-sm">{currentEpisode?.title}</h4>
            <p className="text-gray-400 text-xs">{currentEpisode?.host}</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-xl">
          <div className="flex items-center justify-center space-x-4">
            <motion.button 
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onSkipBackward}
            >
              <SkipBack size={20} />
            </motion.button>
            <motion.button 
              className="p-3 rounded-full bg-blue-500 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPlayPause}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            <motion.button 
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onSkipForward}
            >
              <SkipForward size={20} />
            </motion.button>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={volume} 
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-20 accent-blue-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PodcastPage: React.FC = () => {
  const [episodes, setEpisodes] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentEpisode, setCurrentEpisode] = useState<Podcast | null>(null);
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    setVolume,
    seek,
    skipForward,
    skipBackward
  } = useAudioPlayer({
    audioUrl: currentEpisode?.audioUrl || '',
    onEnded: () => {
      // Handle episode end
      setCurrentEpisode(null);
    }
  });

  useEffect(() => {
    getPodcasts()
      .then((data: Podcast[]) => {
        setEpisodes(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError("Failed to load podcast episodes.");
        setLoading(false);
        console.error('Error loading podcasts:', err);
      });
  }, []);

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          episode.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayEpisode = (episode: Podcast) => {
    if (currentEpisode?.id === episode.id) {
      togglePlayPause();
    } else {
      setCurrentEpisode(episode);
      // The useAudioPlayer hook will automatically start playing the new episode
    }
  };

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

  return (
    <StarField>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        {/* Hero Section */}
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
                Tech Podcast
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Listen to our latest episodes about technology, development, and design.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" className="group">
                  Latest Episodes
                  <Play className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost">
                  Subscribe on Spotify
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
        

        {/* Featured Episode */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-full">
                  <img
                    src={currentEpisode?.imageUrl}
                    alt={currentEpisode?.title}
                    className="w-full h-full object-cover"
                  />
                  </div>
                <div className="p-8">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
                    {currentEpisode?.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {currentEpisode?.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {currentEpisode?.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                    <span>{currentEpisode?.date}</span>
                    <span>•</span>
                    <span>{currentEpisode?.duration}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayPause}
                      className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    <button 
                      onClick={skipBackward}
                      className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                      <SkipBack className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={skipForward}
                      className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                      <SkipForward className="h-6 w-6" />
                    </button>
                    <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                      <Volume2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Episodes List */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">All Episodes</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse through our collection of podcast episodes
              </p>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center mb-12"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Episodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={episode.imageUrl}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                        {episode.category}
                      </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{episode.title}</h3>
                  <p className="text-gray-400 mb-4">{episode.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{episode.date}</span>
                      <span>•</span>
                      <span>{episode.duration}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-700 text-gray-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                      <ShareButtons 
                        url={`${window.location.origin}/podcasts/${episode.id}`}
                        title={episode.title}
                        description={episode.description}
                      />
                      <button className="p-2 bg-gray-700 text-gray-400 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <motion.div 
        className="mt-16 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-8 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Our Podcast</h3>
            <p className="text-gray-300">Never miss an episode. Get notified when new content is available.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#7C3AED" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"></path>
              </svg>
              Apple Podcasts
            </motion.button>
            <motion.button 
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Spotify
            </motion.button>
            <motion.button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Google Podcasts
            </motion.button>
          </div>
        </div>
    </motion.div>

      {/* Audio player */}
      <AudioPlayer
        currentEpisode={currentEpisode}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={togglePlayPause}
        onVolumeChange={setVolume}
        onSeek={seek}
        onSkipForward={skipForward}
        onSkipBackward={skipBackward}
      />
    </StarField>
  );
};

export default PodcastPage;
