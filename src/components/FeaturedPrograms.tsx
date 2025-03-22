
import React, { useRef, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Program = {
  id: number;
  title: string;
  provider: string;
  category: string;
  duration: string;
  rating: number;
  students: number;
  imageSrc: string;
  featured?: boolean;
};

const FeaturedPrograms = () => {
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
  
  const programs: Program[] = [
    {
      id: 1,
      title: "Data Science for Business Intelligence",
      provider: "Stanford University",
      category: "Technology",
      duration: "8 weeks",
      rating: 4.8,
      students: 3240,
      imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Strategic Leadership & Management",
      provider: "Harvard Business School",
      category: "Business",
      duration: "6 weeks",
      rating: 4.9,
      students: 4120,
      imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Cybersecurity for Organizations",
      provider: "MIT",
      category: "Security",
      duration: "10 weeks",
      rating: 4.7,
      students: 2890,
      imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Digital Marketing Analytics",
      provider: "Northwestern University",
      category: "Marketing",
      duration: "5 weeks",
      rating: 4.6,
      students: 3560,
      imageSrc: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section 
      id="programs"
      className="py-16 md:py-24 bg-white relative"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-2">Featured Programs</h2>
            <h3 className="text-3xl md:text-4xl font-bold max-w-xl mb-4 text-balance">
              Industry-Recognized Microcredentials
            </h3>
            <p className="text-gray-600 max-w-2xl mb-4 md:mb-0">
              Curated programs designed with top universities and industry experts to help professionals gain targeted skills.
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-primary hover:text-accent group flex items-center gap-2"
          >
            View all programs 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgramCard = ({ program, index }: { program: Program; index: number }) => {
  return (
    <div 
      className={cn(
        "relative bg-white rounded-xl overflow-hidden hover-lift border border-gray-100 animate-scale-in flex flex-col h-full",
        program.featured ? "md:col-span-2 lg:col-span-2" : ""
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={program.imageSrc} 
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {program.featured && (
          <div className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
          {program.duration}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block mb-2 text-xs font-medium bg-secondary/10 text-secondary px-2 py-1 rounded">
            {program.category}
          </span>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{program.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {program.provider}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-medium">{program.rating}</span>
          </div>
          <span className="mx-2">•</span>
          <span>{program.students.toLocaleString()} students</span>
        </div>
      </div>
      
      <div className="p-5 pt-0">
        <Button 
          variant="outline" 
          className="w-full hover:bg-accent hover:text-white border-gray-200 transition-all duration-300"
        >
          View Program
        </Button>
      </div>
    </div>
  );
};

export default FeaturedPrograms;
