import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">LUTIEXPENSE</h2>
          <p className="text-sm text-blue-200">
            Your AI-powered assistant to track, split, and manage expenses smarter.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><a href="/features" className="hover:text-white transition">Features</a></li>
            <li><a href="/how-it-works" className="hover:text-white transition">How it Works</a></li>
            <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Privacy</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-800 mt-10 pt-6 text-center text-sm text-blue-300">
        © {new Date().getFullYear()} LUTIEXPENSE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
