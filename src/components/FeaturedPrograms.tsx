
import React, { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProgramCard from "@/components/ProgramCard";
import { programs } from "@/data/programs";

const FeaturedPrograms = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Immediately make content visible on load
    if (sectionRef.current) {
      sectionRef.current.classList.add("opacity-100");
      sectionRef.current.classList.remove("opacity-0", "translate-y-8");
    }
    
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
  
  // Get featured programs from Mondragon Unibertsitatea and Laboral Kutxa
  const mondragonAndLaboralPrograms = programs
    .filter(program => 
      (program.provider === "Mondragon Unibertsitatea" || program.provider === "Laboral Kutxa") && 
      (program.featured || program.new)
    )
    .slice(0, 2);
  
  // Get other featured programs to fill the remaining slots
  const otherFeaturedPrograms = programs
    .filter(program => 
      (program.provider !== "Mondragon Unibertsitatea" && program.provider !== "Laboral Kutxa") && 
      (program.featured || program.new)
    )
    .slice(0, 2);
  
  // Combine the two arrays to get 4 programs total
  const featuredPrograms = [...mondragonAndLaboralPrograms, ...otherFeaturedPrograms];

  return (
    <section 
      id="programs"
      className="py-16 md:py-24 bg-white relative"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-100 transition-all duration-1000 ease-out">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-2">Featured Programs</h2>
            <h3 className="text-3xl md:text-4xl font-bold max-w-xl mb-4 text-balance">
              Industry-Recognized Microcredentials
            </h3>
            <p className="text-gray-600 max-w-2xl mb-4 md:mb-0">
              Curated programs from Mondragon Unibertsitatea and Laboral Kutxa designed to help professionals gain targeted skills in cooperative business and ethical finance.
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-primary hover:text-accent group flex items-center gap-2"
            asChild
          >
            <Link to="/programs">
              View all programs 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredPrograms.map((program, index) => (
            <ProgramCard 
              key={program.id} 
              program={program} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
