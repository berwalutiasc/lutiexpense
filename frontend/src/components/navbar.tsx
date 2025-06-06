import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Show back to top button when scrolled down
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md px-6 py-4 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-gray-800 cursor-pointer" 
            onClick={() => scrollToSection('hero')}
          >
            LUTI<span className="text-blue-600">EXPENSE</span>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-blue-600 transition">Home</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-blue-600 transition">How It Works</button>
            <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600 transition">Features</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600 transition">Testimonials</button>

            <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition">Log In</Link>
            <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition">Sign Up</Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 flex flex-col items-start px-6">
            <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-blue-600 transition w-full text-left">Home</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-blue-600 transition w-full text-left">How It Works</button>
            <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600 transition w-full text-left">Features</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600 transition w-full text-left">Testimonials</button>

            <Link to="/login" className="block w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition">Log In</Link>
            <Link to="/signup" className="block w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition">Sign Up</Link>
          </div>
        )}
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Navbar;
