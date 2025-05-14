import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would submit to an API here
    setIsSubmitted(true);
    setError('');
  };

  return (
    <div className="bg-indigo-600">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="relative isolate overflow-hidden bg-indigo-700/60 px-6 py-12 shadow-2xl rounded-3xl sm:px-16 md:py-16 lg:flex lg:gap-x-20 lg:px-24">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay updated with our newsletter
            </h2>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Join our newsletter to get the latest updates, tips, and exclusive offers delivered directly to your inbox.
            </p>
          </div>
          <div className="mt-10 w-full max-w-md mx-auto lg:mt-0">
            {isSubmitted ? (
              <div className="rounded-lg bg-white/10 p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">Subscription confirmed!</h3>
                <p className="mt-2 text-sm text-indigo-100">
                  Thank you for subscribing to our newsletter. You've been added to our list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-indigo-100">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ${
                        error ? 'ring-red-300' : 'ring-gray-300'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
                      placeholder="Enter your email"
                    />
                    {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-2.5 bg-white text-indigo-600 hover:bg-indigo-50"
                  >
                    Subscribe
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-xs text-indigo-100 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;