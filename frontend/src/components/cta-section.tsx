import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-100 via-white to-blue-100 py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-12 text-center shadow-2xl border border-blue-200">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Start using <span className="font-semibold text-blue-800">LUTIEXPENSE</span> — your intelligent financial assistant — to track, split, and optimize your spending in real-time.
        </p>
        <a
          href="/signup"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-md transition-all duration-300"
        >
          Get Started for Free
        </a>
      </div>

      {/* AI Glow Effect */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-20 animate-ping"></div>
    </section>
  );
};

export default CTASection;
