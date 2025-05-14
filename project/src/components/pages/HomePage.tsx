import React from 'react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import Stats from '../sections/Stats';
import TechStack from '../sections/TechStack';
import ProjectPortfolio from '../sections/ProjectPortfolio';

import StarField from '../ui/StarField';

const HomePage: React.FC = () => {
  return (
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
  );
};

export default HomePage;
