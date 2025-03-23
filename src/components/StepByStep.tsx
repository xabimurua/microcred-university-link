
import React, { useRef, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Award, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const StepByStep = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      icon: <Search size={24} />,
      title: "Discover Programs",
      description: "Browse our catalog of microcredentials designed with leading universities and industry experts.",
      delay: 100
    },
    {
      icon: <BookOpen size={24} />,
      title: "Complete Coursework",
      description: "Engage with flexible online learning materials and practical assignments.",
      delay: 300
    },
    {
      icon: <Award size={24} />,
      title: "Earn Your Credential",
      description: "Receive your digital credential upon successful completion of all requirements.",
      delay: 500
    },
    {
      icon: <Briefcase size={24} />,
      title: "Advance Your Career",
      description: "Share your verified credential with employers and unlock new opportunities.",
      delay: 700
    }
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-16 md:py-24 bg-gray-50"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-3">How It Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Your Path to Professional Growth
          </h3>
          <p className="text-gray-600 text-lg">
            Our streamlined process makes it easy to discover, complete, and leverage microcredentials
            to advance your career or find qualified talent.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-16 md:space-y-0 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${step.delay}ms` }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-accent text-white rounded-full z-10 flex-shrink-0 shadow-lg shadow-accent/20">
                  {step.icon}
                </div>
                
                <div className={`bg-white p-6 rounded-xl border border-gray-200 hover-lift flex-1 shadow-sm max-w-xl ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <div className="text-accent font-semibold mb-1">Step {index + 1}</div>
                  <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "800ms" }}>
          <p className="text-gray-600 text-lg mb-6">
            Ready to take the next step in your professional journey?
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20">
            <Link to="/programs">
              Explore Our Programs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StepByStep;
