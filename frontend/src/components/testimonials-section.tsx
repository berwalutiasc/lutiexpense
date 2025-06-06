import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const testimonials = [
  {
    name: 'Amina K.',
    role: 'Freelance Designer',
    quote:
      'LUTIEXPENSE helped me organize my scattered expenses. It feels like an AI accountant working 24/7 for me.',
  },
  {
    name: 'Daniel M.',
    role: 'Startup Founder',
    quote:
      'We use it for tracking our team expenses — intuitive UI and insights that actually help us optimize.',
  },
  {
    name: 'Rachel T.',
    role: 'Medical Student',
    quote:
      'As a student, budgeting is hard. This app makes it effortless with smart suggestions and beautiful charts.',
  },
  {
    name: 'James B.',
    role: 'Remote Developer',
    quote:
      "I can finally see where my money goes every month. It's like AI-based financial awareness in my pocket.",
  },
  {
    name: 'Fatima O.',
    role: 'Travel Blogger',
    quote:
      'From bill splitting with friends to tracking foreign currency spends, LUTIEXPENSE does it all smoothly.',
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" className="bg-blue-50 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-3">What Our Users Say</h2>
        <p className="text-md text-blue-800">Real people. Real impact. Real results.</p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {testimonials.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 text-center transition duration-500 hover:shadow-xl">
              <p className="text-gray-700 text-lg italic mb-4">
                "{item.quote}"
              </p>
              <h4 className="text-xl font-semibold text-blue-800">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialSection;
