import React from 'react';

const steps = [
  {
    title: "1. Sign Up & Set Up",
    description:
      "Create your account in seconds. Set up your profile and choose how you'd like to manage your expenses.",
    icon: "👤",
  },
  {
    title: "2. Add & Share Expenses",
    description:
      "Easily add personal or shared expenses. Categorize spending and invite friends or groups to split bills.",
    icon: "💸",
  },
  {
    title: "3. Get Insights",
    description:
      "Visualize your financial habits with charts and get suggestions to save more and spend better.",
    icon: "📊",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">
          LUTIEXPENSE simplifies your financial life — from sign-up to savings. Here's how:
        </p>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-left hover:scale-[1.02] transition-transform duration-300 border-t-4 border-blue-600"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Video Walkthrough */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          See It In Action
        </h3>
        <div className="relative w-full h-0 pb-[56.25%] rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
        <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/HDJzu57B0SE"
            title="LUTIEXPENSE App Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Watch our 2-minute demo to see how LUTIEXPENSE can transform your financial management
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
