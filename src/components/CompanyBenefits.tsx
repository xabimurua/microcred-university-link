
import React, { useRef, useEffect } from "react";
import { CheckCircle, Users, BookOpen, Award, Target, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompanyBenefits = () => {
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

  const benefits = [
    {
      icon: <Users size={24} />,
      title: "Talent Development",
      description: "Upskill your workforce with targeted programs aligned with your business needs."
    },
    {
      icon: <Search size={24} />,
      title: "Recruitment Pipeline",
      description: "Connect with qualified professionals who have industry-relevant microcredentials."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Custom Programs",
      description: "Create company-specific microcredentials for your unique business challenges."
    },
    {
      icon: <Award size={24} />,
      title: "Recognition",
      description: "Be recognized as an industry leader supporting professional development."
    },
    {
      icon: <Target size={24} />,
      title: "Measurable Outcomes",
      description: "Track progress and ROI with detailed analytics on workforce skills development."
    },
    {
      icon: <Shield size={24} />,
      title: "Verified Credentials",
      description: "Trust in university-backed credentials with secure digital verification."
    }
  ];

  const logos = [
    { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png" },
    { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/150px-Microsoft_logo.svg.png" },
    { name: "IBM", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/150px-IBM_logo.svg.png" },
    { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/150px-Amazon_logo.svg.png" },
    { name: "Salesforce", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/150px-Salesforce.com_logo.svg.png" }
  ];

  return (
    <section 
      id="for-companies"
      className="py-16 md:py-24 bg-gray-50"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-2">For Companies</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Empower Your Workforce with Industry-Relevant Skills
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Partner with leading universities to develop targeted microcredentials that address your specific talent needs.
            </p>
            
            <div className="space-y-6 mb-8">
              {[
                "Custom microcredential programs for your industry",
                "Exclusive talent pipeline of qualified professionals",
                "Upskill current employees with specialized credentials",
                "Verify skills with secure digital credentials"
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CheckCircle size={22} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
            
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 h-auto text-base">
              Partner With Us
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-gray-200 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/5 text-secondary rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20">
          <p className="text-center text-gray-500 mb-8">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {logos.map((logo, index) => (
              <div 
                key={index} 
                className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <img src={logo.src} alt={logo.name} className="h-8 md:h-10 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyBenefits;
