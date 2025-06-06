import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import HowItWorksSection from "../components/how-it-works-section";
import FeaturesSection from "../components/features-section";
import TestimonialsSection from "../components/testimonials-section";
import CTASection from "../components/cta-section";
import Footer from "../components/footer";




function LandingPage() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <HowItWorksSection />
    <FeaturesSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
    </>
  );
}

export default LandingPage;