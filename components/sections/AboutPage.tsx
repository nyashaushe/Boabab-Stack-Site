import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Baobab Stack is a team of passionate technologists, designers, and strategists dedicated to helping businesses thrive in the digital era. Our mission is to empower organizations with innovative, scalable, and intelligent solutions that drive real results. With expertise in web development, AI automation, and digital marketing, we partner with clients to turn ambitious ideas into reality. We believe in transparency, collaboration, and delivering measurable value at every stage of your journey. We are committed to excellence and innovation in everything we do.

            Our core services include:
            - Web Development
            - AI Automation
            - Digital Marketing
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
