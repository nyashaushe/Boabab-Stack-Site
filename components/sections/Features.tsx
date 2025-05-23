import React from 'react';
import { Zap, Shield, BarChart, Globe, Code, Compass } from 'lucide-react';

const features = [
  {
    name: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure.',
    icon: Zap,
  },
  {
    name: 'Enterprise Security',
    description: 'Built with security as the foundation, ensuring your data stays protected.',
    icon: Shield,
  },
  {
    name: 'Advanced Analytics',
    description: 'Gain valuable insights with our comprehensive analytics dashboard.',
    icon: BarChart,
  },
  {
    name: 'Global Deployment',
    description: 'Deploy worldwide in seconds with our distributed network.',
    icon: Globe,
  },
  {
    name: 'Developer Friendly',
    description: 'Intuitive APIs and comprehensive documentation for seamless integration.',
    icon: Code,
  },
  {
    name: 'Guided Experience',
    description: 'Step-by-step wizards and intelligent suggestions to enhance productivity.',
    icon: Compass,
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need, nothing you don't
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Our platform combines powerful capabilities with an intuitive interface, allowing you to focus on creating exceptional experiences.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-start">
              <div className="rounded-lg bg-indigo-50 p-3 ring-1 ring-indigo-100">
                <feature.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-6 text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;