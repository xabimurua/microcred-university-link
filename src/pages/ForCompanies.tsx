
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompanyBenefits from "@/components/CompanyBenefits";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ForCompanies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-transparent py-20 md:py-32">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Transform Your Workforce with Industry-Leading Microcredentials
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
                Partner with leading universities to develop targeted credentials that address your specific talent needs and upskill your workforce.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  Schedule Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                >
                  <Link to="/programs" className="group">
                    View Programs
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "94%", label: "Employee Retention" },
                { value: "82%", label: "Productivity Increase" },
                { value: "3.5x", label: "ROI on Training" },
                { value: "45%", label: "Faster Onboarding" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Benefits Section */}
        <CompanyBenefits />
      </main>
      <Footer />
    </div>
  );
};

export default ForCompanies;
