import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link'; // Changed from react-router-dom
import { useRouter } from 'next/router'; // Added for Next.js routing
import Button from '@/components/ui/Button'; // Updated path with alias
import debounce from 'lodash.debounce';

const navigation = {
  main: [
    { name: 'Blog', href: '/blog' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter(); // Changed from useLocation

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => router.pathname === path; // Changed from location.pathname

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-blue/90 backdrop-blur-md shadow-sm' : 'bg-dark'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center"> {/* Changed to prop to href */}
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                Baobab Stack
              </span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-10">

            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href} // Changed to prop to href
                className={`text-base font-medium ${
                  isActive(item.href)
                    ? 'text-indigo-600'
                    : 'text-purple-400 hover:text-indigo-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link href="/signin" className="whitespace-nowrap text-base font-medium text-purple-400 hover:text-indigo-600 mr-6"> {/* Changed to prop to href */}
              Sign in
            </Link>
            <Button variant="primary">Book a Call</Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50`}>
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent"> {/* Changed to prop to href */}
                  Baobab Stack
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  onClick={toggleMenu}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {navigation.main.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href} // Changed to prop to href
                    className={`-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 ${
                      isActive(item.href) ? 'bg-gray-50' : ''
                    }`}
                    onClick={toggleMenu}
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div>
              <Link
                href="/signin" // Changed to prop to href
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={toggleMenu}
              >
                Sign in
              </Link>
            </div>
            <div>
              <Button variant="primary" className="w-full" onClick={toggleMenu}>
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
