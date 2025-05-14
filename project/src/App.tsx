import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/sections/AboutPage';
import BlogPage from './components/pages/BlogPage';
import BlogPost from './components/pages/BlogPost';
import PodcastPage from './components/pages/PodcastPage';
import PodcastEpisodePage from './components/pages/PodcastEpisodePage';
import ContactPage from './components/pages/ContactPage';
import Header from './components/layout/Header';
import StarField from './components/ui/StarField';
import FeaturesPage from './components/sections/FeaturesPage';
import TestimonialsPage from './components/sections/TestimonialsPage';
import NewsletterPage from './components/sections/NewsletterPage';

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <StarField />
        <div className="relative z-10">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/newsletter" element={<NewsletterPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/podcast" element={<PodcastPage />} />
              <Route path="/podcasts" element={<PodcastPage />} />
              <Route path="/podcast/:id" element={<PodcastEpisodePage />} />
              <Route path="/podcasts/:id" element={<PodcastEpisodePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;
