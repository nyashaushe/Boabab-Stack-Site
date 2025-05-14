import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { Phone, Mail } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  subscribeToNewsletter: boolean;
  agreeToPrivacyPolicy: boolean;
}

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // This would be replaced with an actual API call
      // await submitContactForm(data);
      console.log('Form submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError('There was an error submitting your form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 border border-white/10 rounded-lg p-8 text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Thank You!</h3>
        <p className="text-gray-300 mb-6">
          Your message has been received. We'll get back to you as soon as possible.
        </p>
        <Button 
          variant="primary" 
          onClick={() => setSubmitSuccess(false)}
          className="mx-auto"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Your Name *
            </label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                Company
              </label>
              <input
                id="company"
                {...register('company')}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your Company"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
              Subject *
            </label>
            <select
              id="subject"
              {...register('subject', { required: 'Please select a subject' })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue=""
              style={{ color: 'white' }}
            >
              <option value="" disabled style={{ backgroundColor: '#1f2937', color: 'green' }}>Select a subject</option>
              <option value="General Inquiry" style={{ backgroundColor: '#1f2937', color: 'green' }}>General Inquiry</option>
              <option value="Service Request" style={{ backgroundColor: '#1f2937', color: 'green' }}>Service Request</option>
              <option value="Partnership Opportunity" style={{ backgroundColor: '#1f2937', color: 'green' }}>Partnership Opportunity</option>
              <option value="Technical Support" style={{ backgroundColor: '#1f2937', color: 'green' }}>Technical Support</option>
              <option value="Other" style={{ backgroundColor: '#1f2937', color: 'green' }}>Other</option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              {...register('message', { required: 'Message is required' })}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Tell us about your project or questions..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="subscribeToNewsletter"
                  type="checkbox"
                  {...register('subscribeToNewsletter')}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="subscribeToNewsletter" className="text-gray-300">
                  Subscribe to our newsletter for updates
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToPrivacyPolicy"
                  type="checkbox"
                  {...register('agreeToPrivacyPolicy', { required: 'You must agree to the privacy policy' })}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToPrivacyPolicy" className="text-gray-300">
                  I agree to the <a href="/privacy-policy" className="text-purple-400 hover:text-purple-300">privacy policy</a> *
                </label>
                {errors.agreeToPrivacyPolicy && (
                  <p className="mt-1 text-sm text-red-400">{errors.agreeToPrivacyPolicy.message}</p>
                )}
              </div>
            </div>
          </div>

          {submitError && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{submitError}</p>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:pl-6"
      >
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
          <p className="text-gray-400 mb-6">
            Have questions about our services? Need a custom solution for your business? 
            Fill out the form or contact us directly using the information below.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-gray-300">info@baobabstack.com</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-medium text-white mb-3">Business Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
              <li>Saturday: 10:00 AM - 2:00 PM EST</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;