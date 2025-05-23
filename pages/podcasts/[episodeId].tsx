import { useEffect, useState } from 'react'; // useState and useEffect might be partially removed or changed
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useLikes } from '@/hooks/useLikes';
import { useComments } from '@/hooks/useComments'; // Assuming PodcastComment is exported or defined within
import LikeButton from '@/components/ui/LikeButton';
import ShareButtons from '@/components/ui/ShareButtons';
import CommentSection from '@/components/ui/CommentSection';
import { useToast } from '@/contexts/ToastContext';
import StarField from '@/components/ui/StarField';
import { fetchPodcasts, fetchPodcast, Podcast } from '@/services/api/podcast'; // Import fetch functions and Podcast type
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Button from '@/components/ui/Button'; // Added missing Button import
import { ChevronLeft } from 'lucide-react'; // Added missing ChevronLeft import

// The Podcast interface is imported from services/api/podcast.ts

interface PodcastEpisodePageProps {
  episode: Podcast;
  // relatedPodcasts: Podcast[]; // Example if you fetch related podcasts
}

const PodcastEpisodePage: NextPage<PodcastEpisodePageProps> = ({ episode }) => {
  const router = useRouter();
  const { showToast } = useToast();

  // Handle fallback state from getStaticPaths
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If no episode data is found (e.g., after fallback or if notFound was true)
  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Episode not found</h2>
          <Button
            onClick={() => router.push('/podcasts')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to Podcasts
          </Button>
        </div>
      </div>
    );
  }
  
  const audioPlayer = useAudioPlayer({
    audioUrl: episode.audioUrl, // Use fetched episode data
    onEnded: () => {
      showToast('Episode finished playing', 'info');
    }
  });

  const likesManager = useLikes({
    initialLikes: episode.likes || 0, // Use fetched episode data
    isLiked: episode.isLiked || false, // Use fetched episode data
    onLikeChange: (isLiked) => {
      showToast(isLiked ? 'Added to likes' : 'Removed from likes', 'success');
    }
  });

  const commentsManager = useComments({
    initialComments: episode.comments || [], // Use fetched episode data
    onCommentAdd: async (content, user) => { // Make sure signature matches useComments hook
      showToast('Comment added successfully', 'success');
      // Here you might want to call an API to save the comment
    },
    onCommentLike: async (commentId) => {
      showToast('Comment liked', 'success');
      // API call to update comment like status
    }
  });

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Link copied to clipboard!', 'success');
  };

  return (
    <>
      <Head>
        <title>{episode.title} - Baobab Stack Podcast</title>
        <meta name="description" content={episode.description?.substring(0, 160) + "..." || 'Listen to this podcast episode on Baobab Stack.'} />
      </Head>
      <StarField>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button variant="ghost" onClick={() => router.push('/podcasts')} className="mb-8 group">
                <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Podcasts
              </Button>
              <div className="relative rounded-lg overflow-hidden mb-8">
                <img
                  src={episode.imageUrl || '/placeholder-podcast.jpg'}
                  alt={episode.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h1 className="text-4xl font-bold mb-4">{episode.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>{episode.host}</span>
                  <span>•</span>
                  <span>{episode.date}</span>
                  <span>•</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
            </div>

            {/* Episode Details */}
            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={audioPlayer.togglePlayPause}
                    className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    {audioPlayer.isPlaying ? (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{formatTime(audioPlayer.currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={audioPlayer.duration}
                      value={audioPlayer.currentTime}
                      onChange={(e) => audioPlayer.seek(Number(e.target.value))}
                      className="w-64"
                    />
                    <span className="text-sm text-gray-400">{formatTime(audioPlayer.duration)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <LikeButton
                    isLiked={likesManager.isLiked}
                    likes={likesManager.likes}
                    onToggle={likesManager.toggleLike}
                  />
                  <ShareButtons
                    url={window.location.href}
                    title={episode.title}
                    description={episode.description}
                    onShare={handleShare}
                  />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">{episode.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Host</h3>
                    <p className="text-gray-300">{episode.host}</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Guest</h3>
                    <p className="text-gray-300">{episode.guest}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                  <span className="px-3 py-1 bg-gray-700 rounded-full">{episode.category}</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full">{episode.type}</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Comments</h2>
              <CommentSection
                episodeId={Number(episode.id)}
                comments={commentsManager.comments}
                onAddComment={commentsManager.addComment}
                onLikeComment={commentsManager.likeComment}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </StarField>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const podcasts = await fetchPodcasts(); // Fetch all podcasts
    const paths = podcasts.map(podcast => ({
      params: { episodeId: String(podcast.id) }, // Assuming 'id' is the identifier
    }));
    return { paths, fallback: 'blocking' }; // or true if you prefer client-side loading for new paths
  } catch (error) {
    console.error('Failed to fetch podcast paths for getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<PodcastEpisodePageProps> = async (context) => {
  const episodeId = context.params?.episodeId as string;

  if (!episodeId) {
    return { notFound: true };
  }

  try {
    const numericEpisodeId = Number(episodeId);
    if (isNaN(numericEpisodeId)) {
      return { notFound: true }; // If episodeId is not a valid number
    }

    const episode = await fetchPodcast(numericEpisodeId); // Fetch specific podcast by ID

    if (!episode) {
      return { notFound: true };
    }
    
    // Ensure comments is always an array
    const episodeWithSafeComments = {
      ...episode,
      comments: Array.isArray(episode.comments) ? episode.comments : [],
    };

    return {
      props: {
        episode: episodeWithSafeComments,
        // relatedPodcasts: [], // Fetch related podcasts if needed
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error(`Failed to fetch podcast episode with ID ${episodeId}:`, error);
    return { notFound: true }; // Or handle error differently
  }
};

export default PodcastEpisodePage;
