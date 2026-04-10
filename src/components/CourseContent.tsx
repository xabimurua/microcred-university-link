
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  youtube_url: string;
  description: string | null;
  duration: string | null;
  order_index: number;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  order_index: number;
  content_items: ContentItem[];
}

interface CourseContentProps {
  courseId: string;
}

const CourseContent = ({ courseId }: CourseContentProps) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select(`
            *,
            content_items(*)
          `)
          .eq('course_id', courseId)
          .order('order_index');

        if (modulesError) throw modulesError;
        setModules(modulesData || []);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId]);

  if (loading) {
    return <div className="p-4">Loading course content...</div>;
  }

  const getYoutubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {modules.map((module) => (
        <AccordionItem key={module.id} value={module.id}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-start text-left">
              <div>
                <h3 className="font-semibold">{module.title}</h3>
                {module.description && (
                  <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {module.content_items?.map((item) => {
                const videoId = getYoutubeVideoId(item.youtube_url);
                return (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {videoId && (
                        <div className="aspect-video">
                          <img 
                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="md:col-span-2 p-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Play size={16} className="text-primary" />
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        )}
                        {item.duration && (
                          <p className="text-xs text-gray-400 mt-2">{item.duration}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseContent;
