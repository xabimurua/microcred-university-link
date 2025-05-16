
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Bookmark, Clock, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

interface ProgramCardProps {
  program: {
    id: string | number;
    title: string;
    description?: string;
    provider: string;
    category: string;
    duration: string;
    imageSrc?: string;
    rating?: number;
    students?: number;
    featured?: boolean;
    new?: boolean;
    popular?: boolean;
  };
  index: number;
  showBookmark?: boolean;
}

// Generate a color for each card based on the index
const getCardColor = (index: number) => {
  const colors = ['card-purple', 'card-pink', 'card-blue', 'card-green'];
  return colors[index % colors.length];
};

const ProgramCard = ({ program, index, showBookmark = false }: ProgramCardProps) => {
  const navigate = useNavigate();
  const cardColor = getCardColor(index);
  
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
        "h-full overflow-hidden group transition-all duration-300 border-0 shadow-lg animate-scale-in glow-effect",
        cardColor
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        borderRadius: "18px" 
      }}
    >
      <CardHeader className="p-4 pb-3">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className="text-xs font-medium rounded-full px-3 py-1 mb-2 bg-white/10 text-white border-white/20"
          >
            {program.category}
          </Badge>
          
          {program.rating && (
            <div className="flex items-center text-sm font-medium">
              <Star size={16} className="mr-1 fill-current" />
              {program.rating}
            </div>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold leading-tight mt-2 mb-1">
          {program.title}
        </CardTitle>
        
        <CardDescription className="text-sm flex items-center gap-1 text-white/80">
          {program.provider}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-sm text-white/70">
          <Clock size={15} className="mr-2" />
          <span className="mr-4">{program.duration}</span>
          
          <Users size={15} className="mr-2" />
          <span>{(program.students || 0).toLocaleString()}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2">
        <Button 
          variant="outline"
          className="w-full transition-all duration-300 flex items-center gap-2 font-medium rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={handleViewProgram}
        >
          Ver Programa
          <ExternalLink size={14} />
        </Button>
      </CardFooter>
      
      {showBookmark && (
        <button 
          className="absolute top-3 right-3 p-1.5 rounded-full transition-colors z-20 bg-white/10 text-white hover:bg-white/20"
          onClick={handleBookmark}
          aria-label="Bookmark program"
        >
          <Bookmark size={16} />
        </button>
      )}
    </Card>
  );
};

export default ProgramCard;
