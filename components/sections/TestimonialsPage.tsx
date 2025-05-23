import React, { useEffect, useState } from 'react';
import { fetchTestimonials, submitTestimonial, Testimonial } from '../../services/api/testimonial';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ author: '', company: '', content: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load testimonials.');
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormError(null);
    try {
      const newTestimonial = await submitTestimonial(form);
      setTestimonials([newTestimonial, ...testimonials]);
      setForm({ author: '', company: '', content: '' });
      setFormStatus('success');
    } catch (err) {
      setFormStatus('error');
      setFormError('Failed to submit testimonial. Please try again.');
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Testimonials</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our clients are saying about us.
          </p>
        </div>
        <div className="max-w-xl mx-auto mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Submit Your Testimonial</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="author"
              required
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              value={form.author}
              onChange={handleChange}
            />
            <input
              type="text"
              name="company"
              placeholder="Your Company (optional)"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              value={form.company}
              onChange={handleChange}
            />
            <textarea
              name="content"
              required
              placeholder="Your testimonial..."
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none min-h-[100px]"
              value={form.content}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              disabled={formStatus === 'loading'}
            >
              {formStatus === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
            {formStatus === 'success' && <p className="text-green-400">Thank you for your feedback!</p>}
            {formStatus === 'error' && <p className="text-red-400">{formError}</p>}
          </form>
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">Client Reviews</h3>
          {loading ? (
            <p className="text-gray-400">Loading testimonials...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : testimonials.length > 0 ? (
            <ul className="space-y-6">
              {testimonials.map(testimonial => (
                <li key={testimonial.id} className="bg-gray-800 rounded-lg p-6 text-left">
                  <p className="text-gray-200 italic mb-2">"{testimonial.content}"</p>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{testimonial.author}</span>
                    <span className="text-gray-400 text-sm">{testimonial.company}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No testimonials yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
