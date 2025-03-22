
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Briefcase, Award } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-12");
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      <div 
        ref={heroRef}
        className="container px-4 mx-auto transform opacity-0 translate-y-12 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-primary/5 rounded-full text-primary/80 font-medium text-sm animate-fade-in">
            Connecting Education with Industry
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Specialized <span className="text-accent">Microcredentials</span> for the Modern Workforce
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
            Industry-recognized credentials that help professionals gain specific skills and companies find qualified talent.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" className="bg-accent hover:bg-accent/90 gap-2 text-white shadow-lg shadow-accent/20">
              Browse Programs <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
              For Companies
            </Button>
          </div>
        </div>
        
        {/* Stats/Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard 
            icon={<GraduationCap className="text-secondary" />}
            title="120+ Programs"
            description="Industry-specific credentials from top universities"
            delay={100}
          />
          <FeatureCard 
            icon={<Briefcase className="text-secondary" />}
            title="500+ Companies"
            description="Trust our credential verification process"
            delay={300}
          />
          <FeatureCard 
            icon={<Award className="text-secondary" />}
            title="95% Success Rate"
            description="Of graduates advance their career within 6 months"
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  delay
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) => {
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover-lift overflow-hidden animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/5">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
