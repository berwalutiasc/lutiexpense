import React from 'react';

const features = [
  {
    title: 'Smart Expense Tracking',
    description:
      'Automatically categorize your expenses and track spending in real-time. Get notified when you\'re nearing your budget.',
    icon: '📱',
  },
  {
    title: 'Bill Splitting & Groups',
    description:
      'Split bills with friends, roommates, or teams. Group expenses and settle up easily with automatic calculations.',
    icon: '🤝',
  },
  {
    title: 'Insightful Reports & Graphs',
    description:
      'Visualize your financial health with graphs, charts, and spending summaries to help you make informed decisions.',
    icon: '📈',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Features You'll Love</h2>
        <p className="text-lg text-gray-600">
          Designed for everyday users, teams, and everyone who wants financial clarity.
        </p>
      </div>

      {/* Feature Blocks */}
      <div className="space-y-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            } items-center gap-10 max-w-6xl mx-auto`}
          >
            {/* Icon Block */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <div className="text-6xl bg-blue-100 w-28 h-28 flex items-center justify-center rounded-full text-blue-600 mx-auto shadow-md">
                {feature.icon}
              </div>
            </div>

            {/* Text Block */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-md">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
