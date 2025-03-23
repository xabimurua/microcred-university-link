
import React, { useRef, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Shield, Award, Clock, GraduationCap } from "lucide-react";

const ServiceDescription = () => {
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

  const services = [
    {
      icon: <GraduationCap size={24} />,
      title: "Industry-Focused Education",
      description: "Specialized microcredentials designed with industry partners to target in-demand skills and knowledge gaps."
    },
    {
      icon: <Award size={24} />,
      title: "Verifiable Credentials",
      description: "Secure digital credentials backed by leading universities that can be easily shared with employers and verified instantly."
    },
    {
      icon: <Clock size={24} />,
      title: "Accelerated Learning",
      description: "Intensive, focused programs that allow professionals to acquire specific skills in weeks rather than years."
    },
    {
      icon: <Shield size={24} />,
      title: "Quality Assurance",
      description: "Rigorous academic standards combined with practical applications vetted by industry experts."
    }
  ];

  return (
    <section 
      id="services" 
      className="py-16 md:py-24 bg-white" 
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Bridging the Gap Between Education and Industry
          </h3>
          <p className="text-gray-600 text-lg">
            We partner with leading universities and industry experts to create targeted microcredentials 
            that help professionals advance their careers and organizations find qualified talent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex gap-5 p-6 rounded-xl border border-gray-100 bg-white hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/5 text-secondary rounded-lg flex-shrink-0">
                {service.icon}
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 p-8 rounded-xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <p className="text-gray-600">University Partners</p>
            </div>
            <div className="text-center p-6 md:border-x border-gray-200">
              <div className="text-4xl font-bold text-accent mb-2">120+</div>
              <p className="text-gray-600">Microcredentials</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-accent mb-2">50k+</div>
              <p className="text-gray-600">Program Graduates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
