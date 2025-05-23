import React from 'react';
import Head from 'next/head'; // Added Head for Next.js
import Hero from '@/components/sections/Hero'; // Updated path
import Services from '@/components/sections/Services'; // Updated path
import Testimonials from '@/components/sections/Testimonials'; // Updated path
import Stats from '@/components/sections/Stats'; // Updated path
import TechStack from '@/components/sections/TechStack'; // Updated path
import ProjectPortfolio from '@/components/sections/ProjectPortfolio'; // Updated path
import StarField from '@/components/ui/StarField'; // Updated path

const HomePage: React.FC = () => {
  return (
    <> {/* Changed div to Fragment to accommodate Head */}
      <Head>
        <title>Baobab Stack - Home</title>
        <meta name="description" content="Welcome to Baobab Stack - Innovative software solutions." />
        {/* Add other relevant meta tags if needed */}
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <StarField>
          <Hero />
          <div className="py-16 bg-red-500/20">
            <Services />
          </div>
          <div className="py-16 bg-blue-500/20">
            <Stats />
          </div>
          <div className="py-16 bg-green-500/20">
            <ProjectPortfolio />
          </div>
          <div className="py-16 bg-yellow-500/20">
            <Testimonials />
          </div>
          <div className="py-16">
            <TechStack />
          </div>
        </StarField>
      </div>
    </>
    </div>
  );
};

export default HomePage;
