
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import ServiceDescription from "@/components/ServiceDescription";
import StepByStep from "@/components/StepByStep";
import CompanyBenefits from "@/components/CompanyBenefits";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ServiceDescription />
        <FeaturedPrograms />
        <StepByStep />
        <CompanyBenefits />
        <Testimonials />
        <FAQSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
