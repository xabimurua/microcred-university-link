
import React from "react";
import { Star, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Program } from "@/data/programs";

interface ProgramCardProps {
  program: Program;
  index: number;
  showBookmark?: boolean;
}

const ProgramCard = ({ program, index, showBookmark = false }: ProgramCardProps) => {
  return (
    <div 
      className={cn(
        "relative bg-white rounded-xl overflow-hidden hover-lift border border-gray-100 flex flex-col h-full animate-scale-in",
        program.featured ? "md:col-span-2 lg:col-span-1" : ""
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
        
        {program.new && (
          <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
            New
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
          {program.duration}
        </div>
        
        {showBookmark && (
          <button className="absolute top-4 right-4 bg-white/90 text-primary p-1.5 rounded-full shadow-sm hover:bg-white transition-colors">
            <Bookmark size={16} />
          </button>
        )}
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

export default ProgramCard;
