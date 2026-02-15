import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HuntingSection from "@/components/HuntingSection";
import IncludedSection from "@/components/IncludedSection";
import BookingProcess from "@/components/BookingProcess";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HuntingSection />
      <IncludedSection />
      <BookingProcess />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
