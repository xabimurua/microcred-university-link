
import React, { useRef, useEffect, useState } from "react";
import { 
  CheckCircle, 
  Users, 
  BookOpen, 
  Award, 
  Target, 
  Search, 
  Shield, 
  ArrowRight, 
  Briefcase, 
  BarChart3, 
  GraduationCap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CompanyBenefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("benefits");

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

  const handleContactClick = () => {
    toast({
      title: "Request Received",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });
  };

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

  const caseStudies = [
    {
      company: "Mondragon Corporation",
      industry: "Cooperative Business",
      challenge: "Needed to standardize cooperative business practices across 96 different cooperatives.",
      solution: "Developed a custom 'Cooperative Leadership' microcredential program.",
      results: "85% improvement in cooperative governance and 32% increase in member engagement.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mondragon_Corporation.svg/320px-Mondragon_Corporation.svg.png"
    },
    {
      company: "Laboral Kutxa",
      industry: "Ethical Banking",
      challenge: "Struggled to find talent with both financial expertise and ethical banking principles.",
      solution: "Created a recruitment pipeline through the 'Ethical Finance' microcredential.",
      results: "Reduced hiring time by 40% and improved new hire retention by 35%.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Laboral_Kutxa_logo.svg/320px-Laboral_Kutxa_logo.svg.png"
    },
    {
      company: "Fagor Automation",
      industry: "Manufacturing Technology",
      challenge: "Needed to upskill engineers in emerging automation technologies.",
      solution: "Partnered on an 'Industrial Automation' specialized credential program.",
      results: "Productivity increased by 27% with 40% faster adaptation to new technologies.",
      logo: "https://www.fagorautomation.com/wp-content/themes/understrap/images/logo.svg"
    }
  ];

  const partnershipModels = [
    {
      icon: <Briefcase size={28} />,
      title: "Talent Pipeline",
      description: "Gain priority access to graduates with specific skills validated through microcredentials.",
      features: ["Early recruitment access", "Pre-vetted candidates", "Skills validation"]
    },
    {
      icon: <GraduationCap size={28} />,
      title: "Custom Programs",
      description: "Develop targeted microcredentials specific to your company's needs and industry challenges.",
      features: ["Tailored curriculum", "Company-specific cases", "White-labeled credentials"]
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Workforce Development",
      description: "Upskill your existing employees with industry-recognized microcredentials.",
      features: ["Bulk enrollment discounts", "Progress tracking", "Customized learning paths"]
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
        <div className="text-center mb-12">
          <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-2">For Companies</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Empower Your Workforce with Industry-Relevant Skills
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            Partner with leading universities to develop targeted microcredentials that address your specific talent needs.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            <TabsTrigger value="partnerships">Partnership</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
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
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-6 h-auto text-base"
                    onClick={handleContactClick}
                  >
                    Partner With Us
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-8 py-6 h-auto text-base"
                    asChild
                  >
                    <Link to="/programs">
                      Explore Programs
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl border border-gray-200 hover-lift shadow-sm animate-scale-in"
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
          </TabsContent>
          
          <TabsContent value="case-studies" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="overflow-hidden hover-lift">
                  <CardContent className="p-0">
                    <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="h-16 mb-4 flex items-center">
                        <img 
                          src={study.logo} 
                          alt={study.company} 
                          className="max-h-full object-contain"
                        />
                      </div>
                      <h4 className="text-xl font-semibold mb-1">{study.company}</h4>
                      <p className="text-sm text-gray-500 mb-4">{study.industry}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-primary">Challenge:</span>
                          <p className="text-gray-600">{study.challenge}</p>
                        </div>
                        <div>
                          <span className="font-medium text-secondary">Solution:</span>
                          <p className="text-gray-600">{study.solution}</p>
                        </div>
                        <div>
                          <span className="font-medium text-accent">Results:</span>
                          <p className="text-gray-600">{study.results}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="group"
                onClick={handleContactClick}
              >
                Request Full Case Studies 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="partnerships" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {partnershipModels.map((model, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover-lift relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-3xl -z-10"></div>
                  <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary rounded-xl mb-4">
                    {model.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{model.title}</h4>
                  <p className="text-gray-600 mb-4">{model.description}</p>
                  
                  <ul className="space-y-2">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
              <h4 className="text-2xl font-semibold mb-4">Ready to transform your workforce?</h4>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Schedule a consultation with our partnerships team to discuss how we can create a customized solution for your company.
              </p>
              <Button 
                className="bg-accent hover:bg-accent/90 text-white px-8"
                onClick={handleContactClick}
              >
                Schedule Consultation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
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
