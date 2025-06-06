import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative w-full h-[calc(100vh-72px)] overflow-hidden mt-[72px]">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="relative w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="her.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Overlay with gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
          Take Control of Your Finances
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in-delay">
          LUTIEXPENSE helps you track expenses, share bills, and gain insights with ease. 
          Designed for simplicity, made for everyone.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-2">
          <a
            href="/signup"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="/learn-more"
            className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
