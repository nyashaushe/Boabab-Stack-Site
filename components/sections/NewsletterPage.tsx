import React, { useState } from 'react';
import { fetchNewsletters, subscribeToNewsletter, Newsletter } from '../../services/api/newsletter';

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  React.useEffect(() => {
    fetchNewsletters().then(setNewsletters).catch(() => {});
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      await subscribeToNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError('Subscription failed. Please try again.');
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Newsletter</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Subscribe to our newsletter to stay up to date.
          </p>
        </div>
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubscribe}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-gray-800 text-white w-64 focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'success' && <p className="text-green-400">Subscribed successfully!</p>}
          {status === 'error' && <p className="text-red-400">{error}</p>}
        </form>
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">Latest Newsletters</h3>
          <ul className="space-y-4">
            {newsletters.map(newsletter => (
              <li key={newsletter.id} className="bg-gray-800 rounded-lg p-4 text-left">
                <h4 className="text-lg font-semibold text-white">{newsletter.title}</h4>
                <p className="text-gray-400">{newsletter.summary}</p>
              </li>
            ))}
            {newsletters.length === 0 && <li className="text-gray-400">No newsletters yet.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPage;
