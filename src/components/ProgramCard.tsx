import React from "react";
import { Star, Bookmark, Clock, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Program } from "@/data/programs";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ProgramCardProps {
  program: Program;
  index: number;
  showBookmark?: boolean;
}

const ProgramCard = ({ program, index, showBookmark = false }: ProgramCardProps) => {
  const navigate = useNavigate();
  
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Program Bookmarked",
      description: `${program.title} has been added to your bookmarks.`,
    });
  };
  
  const handleViewProgram = () => {
    navigate(`/programs/${program.id}`);
  };

  return (
    <Card 
      className={cn(
        "h-full overflow-hidden group hover:shadow-md transition-all duration-300 border-gray-200 animate-scale-in",
        program.featured ? "md:col-span-2 lg:col-span-1" : ""
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={program.imageSrc} 
          alt={program.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {program.featured && (
          <Badge variant="secondary" className="absolute top-3 left-3 z-10">
            Featured
          </Badge>
        )}
        
        {program.new && (
          <Badge className="absolute top-3 left-3 z-10 bg-secondary">
            New
          </Badge>
        )}
        
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5 z-10">
          <Clock size={14} />
          {program.duration}
        </div>
        
        {showBookmark && (
          <button 
            className="absolute top-3 right-3 bg-white/90 text-primary p-1.5 rounded-full shadow-sm hover:bg-white transition-colors z-20"
            onClick={handleBookmark}
            aria-label="Bookmark program"
          >
            <Bookmark size={16} />
          </button>
        )}
      </div>
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="text-xs font-medium text-secondary mb-2">
            {program.category}
          </Badge>
          <div className="flex items-center text-sm text-amber-500 font-medium">
            <Star size={16} className="fill-amber-400 mr-1" />
            {program.rating}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold line-clamp-2 mb-1">{program.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 flex items-center gap-1">
          {program.provider}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Users size={15} className="mr-1" />
          <span>{program.students.toLocaleString()} students enrolled</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full hover:bg-primary hover:text-white border-gray-200 transition-all duration-300 flex items-center gap-2"
          onClick={handleViewProgram}
        >
          View Program
          <ExternalLink size={14} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
