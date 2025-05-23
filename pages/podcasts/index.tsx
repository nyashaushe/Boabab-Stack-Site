import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Clock, Filter, Search, Mic, Video, Share2, Heart, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import ShareButtons from '@/components/ui/ShareButtons';
import LikeButton from '@/components/ui/LikeButton';
import CommentSection from '@/components/ui/CommentSection';
import StarField from '@/components/ui/StarField';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useLikes } from '@/hooks/useLikes';
import { useComments, PodcastComment, User } from '@/hooks/useComments'; // Assuming User is exported if needed by CommentSection
import { useToast } from '@/contexts/ToastContext';
import { fetchPodcasts, Podcast } from '@/services/api/podcast'; // Ensure Podcast type is imported
import { GetStaticProps, NextPage } from 'next';

// Categories can be fetched from API or be static like this
const CATEGORIES = ['All', 'Technology', 'Development', 'Business', 'Design'];

interface PodcastPageProps {
  initialEpisodes: Podcast[];
}

interface PodcastEpisodeCardProps {
  episode: Podcast;
  onPlay: (episode: Podcast) => void;
  isPlaying: boolean;
  isActive: boolean;
}

const PodcastEpisodeCard: React.FC<PodcastEpisodeCardProps> = ({ episode, onPlay, isPlaying, isActive }) => {
  const { likes, isLiked, toggleLike } = useLikes({
    initialLikes: episode.likes || 0,
    isLiked: episode.isLiked || false,
    onLikeChange: (liked) => {
      console.log(`Episode ${episode.id} ${liked ? 'liked' : 'unliked'}`);
    }
  });

  const { comments, addComment, likeComment } = useComments({
    initialComments: episode.comments || [],
    onCommentAdd: async (commentContent, user) => { // Matched signature for useComments
      console.log('Adding comment:', commentContent, user);
    },
    onCommentLike: async (commentId) => {
      console.log('Liking comment:', commentId);
    }
  });

  const { showToast } = useToast();

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/podcasts/${episode.id}`);
    }
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
            src={episode?.imageUrl || '/placeholder-podcast.jpg'} 
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
              {isPlaying && isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying && isActive ? 'Pause' : 'Play'}</span>
            </button>
            <LikeButton likes={likes} isLiked={isLiked} onToggle={toggleLike} />
          </div>
          <ShareButtons
            url={typeof window !== 'undefined' ? `${window.location.origin}/podcasts/${episode?.id}` : `/podcasts/${episode?.id}`}
            title={episode?.title || 'Podcast Episode'}
            description={episode?.description || ''}
            onShare={handleShare}
          />
        </div>
      </div>

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

      <div className="mt-4 p-4">
        <Link
          href={`/podcasts/${episode?.id}`}
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

const AudioPlayerComponent: React.FC<{
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
  currentEpisode, isPlaying, currentTime, duration, volume,
  onPlayPause, onVolumeChange, onSeek, onSkipForward, onSkipBackward
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
      initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: "spring", damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <img 
            src={currentEpisode?.imageUrl || '/placeholder-podcast.jpg'} 
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
            <motion.button className="text-gray-400 hover:text-white transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onSkipBackward}>
              <SkipBack size={20} />
            </motion.button>
            <motion.button className="p-3 rounded-full bg-blue-500 text-white" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onPlayPause}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            <motion.button className="text-gray-400 hover:text-white transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onSkipForward}>
              <SkipForward size={20} />
            </motion.button>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-gray-400 text-xs">{formatTime(currentTime)}</span>
            <input type="range" min={0} max={duration} value={currentTime} onChange={(e) => onSeek(Number(e.target.value))} className="w-full accent-blue-500 h-1" />
            <span className="text-gray-400 text-xs">{formatTime(duration)}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => onVolumeChange(Number(e.target.value))} className="w-20 accent-blue-500 h-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PodcastPage: NextPage<PodcastPageProps> = ({ initialEpisodes }) => {
  const [episodes, setEpisodes] = useState<Podcast[]>(initialEpisodes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentEpisode, setCurrentEpisode] = useState<Podcast | null>(null);

  const {
    isPlaying, currentTime, duration, volume, togglePlayPause, setVolume: setAudioVolume, seek, skipForward, skipBackward, audioRef
  } = useAudioPlayer({
    audioUrl: currentEpisode?.audioUrl || '',
    onEnded: () => { setCurrentEpisode(null); }
  });

  useEffect(() => {
    if (audioRef.current && currentEpisode?.audioUrl) {
      if (audioRef.current.src !== currentEpisode.audioUrl) {
        audioRef.current.src = currentEpisode.audioUrl;
        audioRef.current.load();
      }
      if (isPlaying && audioRef.current.paused) { // Only play if it's actually paused
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    }
  }, [currentEpisode?.audioUrl, isPlaying, audioRef]);


  const filteredEpisodes = episodes.filter(episode => {
    const titleMatch = episode.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = episode.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesSearch = titleMatch || descriptionMatch;
    const matchesCategory = selectedCategory === 'All' || episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayEpisode = (episode: Podcast) => {
    if (currentEpisode?.id === episode.id) {
      togglePlayPause();
    } else {
      setCurrentEpisode(episode);
      // If not already playing, explicitly start playback for the new episode
      if (!isPlaying) {
         // This will be handled by the useEffect above due to currentEpisode change
      }
    }
  };
  
  // Set a default featured episode if currentEpisode is null and there are episodes
  useEffect(() => {
    if (!currentEpisode && filteredEpisodes.length > 0) {
      setCurrentEpisode(filteredEpisodes[0]);
    }
  }, [currentEpisode, filteredEpisodes]);


  return (
    <>
      <Head>
        <title>Podcasts - Baobab Stack</title>
        <meta name="description" content="Listen to our latest podcast episodes about technology, development, and design." />
      </Head>
      <StarField>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
          <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Tech Podcast</h1>
                <p className="text-xl text-gray-300 mb-8">
                  Listen to our latest episodes about technology, development, and design.
                </p>
              </motion.div>
            </div>
          </section>
        
          <section className="py-20">
            <div className="container mx-auto px-4">
              {/* Featured Episode Section - Uses currentEpisode or first filtered episode */}
              {(currentEpisode || filteredEpisodes.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-800 rounded-xl overflow-hidden mb-16" // Added mb-16
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative h-64 md:h-full">
                      <img
                        src={(currentEpisode || filteredEpisodes[0])?.imageUrl || '/placeholder-podcast.jpg'}
                        alt={(currentEpisode || filteredEpisodes[0])?.title || 'Featured Episode'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
                        {(currentEpisode || filteredEpisodes[0])?.category || 'Category'}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {(currentEpisode || filteredEpisodes[0])?.title || 'Featured Episode Title'}
                      </h3>
                      <p className="text-gray-400 mb-6">
                        {(currentEpisode || filteredEpisodes[0])?.description || 'Featured episode description.'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                        <span>{(currentEpisode || filteredEpisodes[0])?.date || 'Date'}</span>
                        <span>•</span>
                        <span>{(currentEpisode || filteredEpisodes[0])?.duration || '00:00'}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handlePlayEpisode(currentEpisode || filteredEpisodes[0])} className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                          {(isPlaying && currentEpisode?.id === (currentEpisode || filteredEpisodes[0])?.id) ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </button>
                        <button onClick={skipBackward} className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                          <SkipBack className="h-6 w-6" />
                        </button>
                        <button onClick={skipForward} className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                          <SkipForward className="h-6 w-6" />
                        </button>
                        <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                          <Volume2 className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-4">All Episodes</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Browse through our collection of podcast episodes</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-2 justify-center mb-12"
              >
                {CATEGORIES.map((category) => (
                  <button key={category} onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  > {category} </button>
                ))}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEpisodes.map((episode, index) => (
                  <PodcastEpisodeCard
                    key={episode.id} episode={episode} onPlay={handlePlayEpisode}
                    isPlaying={isPlaying && currentEpisode?.id === episode.id}
                    isActive={currentEpisode?.id === episode.id}
                  />
                ))}
              </div>
            </div>
          </section>

          <motion.div 
            className="mt-16 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Our Podcast</h3>
                <p className="text-gray-300">Never miss an episode. Get notified when new content is available.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center" whileHover={{ scale: 1.05, backgroundColor: "#7C3AED" }} whileTap={{ scale: 0.95 }}>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm0-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"></path></svg>
                  Apple Podcasts
                </motion.button>
                <motion.button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center" whileHover={{ scale: 1.05, backgroundColor: "#059669" }} whileTap={{ scale: 0.95 }}>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                  Spotify
                </motion.button>
                <motion.button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center" whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }} whileTap={{ scale: 0.95 }}>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                  Google Podcasts
                </motion.button>
              </div>
            </div>
        </motion.div>
        </div>
        <AudioPlayerComponent
          currentEpisode={currentEpisode} isPlaying={isPlaying} currentTime={currentTime} duration={duration}
          volume={volume} onPlayPause={togglePlayPause} onVolumeChange={setAudioVolume} onSeek={seek}
          onSkipForward={skipForward} onSkipBackward={skipBackward}
        />
      </StarField>
    </>
  );
};

export const getStaticProps: GetStaticProps<PodcastPageProps> = async () => {
  try {
    const initialEpisodesData = await fetchPodcasts();
    const initialEpisodes = initialEpisodesData.map(ep => ({
      ...ep,
      comments: Array.isArray(ep.comments) ? ep.comments : [], // Ensure comments is always an array
    }));
    return {
      props: {
        initialEpisodes,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch podcasts for PodcastPage:', error);
    return {
      props: {
        initialEpisodes: [],
      },
      revalidate: 60,
    };
  }
};

export default PodcastPage;
