
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
  const colors = ['card-yellow', 'card-purple', 'card-orange', 'card-teal'];
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
        "h-full overflow-hidden group transition-all duration-300 border-0 shadow-lg animate-scale-in",
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
            className={cn(
              "text-xs font-medium rounded-full px-3 py-1 mb-2",
              cardColor === 'card-yellow' || cardColor === 'card-teal' || cardColor === 'card-purple' 
                ? "bg-darkbg text-white border-darkbg" 
                : "bg-white text-darkbg border-white"
            )}
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
        
        <CardDescription className={cn(
          "text-sm flex items-center gap-1",
          cardColor === 'card-yellow' || cardColor === 'card-teal' || cardColor === 'card-purple' 
            ? "text-darkbg/80" 
            : "text-white/80"
        )}>
          {program.provider}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className={cn(
          "flex items-center text-sm",
          cardColor === 'card-yellow' || cardColor === 'card-teal' || cardColor === 'card-purple' 
            ? "text-darkbg/70" 
            : "text-white/70"
        )}>
          <Clock size={15} className="mr-2" />
          <span className="mr-4">{program.duration}</span>
          
          <Users size={15} className="mr-2" />
          <span>{(program.students || 0).toLocaleString()}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2">
        <Button 
          variant={cardColor === 'card-orange' ? "outline" : "default"}
          className={cn(
            "w-full transition-all duration-300 flex items-center gap-2 font-medium rounded-full",
            cardColor === 'card-yellow' || cardColor === 'card-teal' || cardColor === 'card-purple' 
              ? "bg-darkbg hover:bg-darkbg/80 text-white" 
              : "bg-white hover:bg-white/90 text-darkbg border-white"
          )}
          onClick={handleViewProgram}
        >
          Ver Programa
          <ExternalLink size={14} />
        </Button>
      </CardFooter>
      
      {showBookmark && (
        <button 
          className={cn(
            "absolute top-3 right-3 p-1.5 rounded-full transition-colors z-20",
            cardColor === 'card-yellow' || cardColor === 'card-teal' || cardColor === 'card-purple' 
              ? "bg-darkbg text-white hover:bg-darkbg/80" 
              : "bg-white text-darkbg hover:bg-white/90"
          )}
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
