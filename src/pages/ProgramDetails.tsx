
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { programs } from "@/data/programs";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  Calendar, 
  Bookmark, 
  Share2, 
  FileText, 
  MessageSquare,
  CheckCircle,
  Building,
  Layers,
  ChevronDown,
  ChevronUp,
  Play,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProgramDetails = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState(programs.find(p => p.id.toString() === programId));
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!program) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 container mx-auto px-4">
          <div className="py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
            <p className="mb-8">The program you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/programs">Back to Programs</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Mock data for the program details
  const modules = [
    {
      id: 1,
      title: "Introduction to the Program",
      duration: "1 week",
      lessons: 3,
      completed: true
    },
    {
      id: 2,
      title: "Core Concepts and Principles",
      duration: "2 weeks",
      lessons: 5,
      completed: false
    },
    {
      id: 3,
      title: "Practical Applications",
      duration: "3 weeks",
      lessons: 8,
      completed: false
    },
    {
      id: 4,
      title: "Advanced Techniques",
      duration: "2 weeks",
      lessons: 6,
      completed: false
    },
    {
      id: 5,
      title: "Final Project and Assessment",
      duration: "2 weeks",
      lessons: 4,
      completed: false
    }
  ];
  
  const instructors = [
    {
      id: 1,
      name: "Dr. Maria Rodriguez",
      role: "Lead Instructor",
      background: "PhD in Business Administration with 15 years of experience in cooperative finance",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Prof. Ander Etxeberria",
      role: "Subject Matter Expert",
      background: "Former Director at Mondragon Cooperative Corporation with 20+ years of experience",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
  ];
  
  const skills = [
    "Strategic Thinking", 
    "Financial Analysis", 
    "Ethical Decision Making", 
    "Cooperative Management", 
    "Sustainable Business Models"
  ];
  
  const prerequisites = [
    "Basic understanding of business concepts",
    "Foundational knowledge of finance principles",
    "Interest in cooperative economic models"
  ];
  
  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: "Julia M.",
      rating: 5,
      date: "2 months ago",
      content: "This program exceeded my expectations. The course content was incredibly relevant to my work in the cooperative sector, and the instructors brought real-world experience that made complex concepts accessible."
    },
    {
      id: 2,
      name: "Carlos G.",
      rating: 4,
      date: "3 months ago",
      content: "Very practical approach to cooperative finance. I appreciated the case studies and how the program balanced theory with application. Would recommend to colleagues in the financial sector."
    },
    {
      id: 3,
      name: "Elena K.",
      rating: 5,
      date: "1 month ago",
      content: "As someone working in a cooperative bank, this program provided exactly the knowledge I needed to advance in my career. The final project was challenging but rewarding."
    }
  ];

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Program Bookmarked",
      description: isBookmarked 
        ? `${program.title} has been removed from your bookmarks.`
        : `${program.title} has been added to your bookmarks.`,
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Program link has been copied to clipboard.",
    });
  };
  
  const handleEnroll = () => {
    toast({
      title: "Enrollment Successful",
      description: `You've successfully enrolled in ${program.title}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-8">
          <div className="container px-4 mx-auto">
            <Breadcrumb className="mb-6">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/programs">Programs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{program.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Content */}
              <div className="lg:w-2/3">
                <Link 
                  to="/programs" 
                  className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-4"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to programs
                </Link>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{program.title}</h1>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className="text-xs font-medium text-secondary">
                    {program.category}
                  </Badge>
                  
                  <div className="flex items-center text-sm text-amber-500 font-medium">
                    <Star size={16} className="fill-amber-400 mr-1" />
                    {program.rating} (123 reviews)
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={15} className="mr-1" />
                    <span>{program.students.toLocaleString()} enrolled</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={15} className="mr-1" />
                    <span>{program.duration}</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">
                  A comprehensive program designed by {program.provider} to provide professionals with 
                  in-depth knowledge and practical skills in {program.category.toLowerCase()}.
                </p>
                
                <div className="flex items-center gap-3 mb-8">
                  <Button onClick={handleEnroll} size="lg">
                    Enroll Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleBookmark}
                    aria-label="Bookmark program"
                    className={isBookmarked ? "text-primary" : ""}
                  >
                    <Bookmark className={cn(isBookmarked && "fill-primary")} />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleShare}
                    aria-label="Share program"
                  >
                    <Share2 />
                  </Button>
                </div>
              </div>
              
              {/* Right Content - Program Card */}
              <div className="lg:w-1/3 h-auto">
                <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img 
                    src={program.imageSrc} 
                    alt={program.title} 
                    className="w-full aspect-video object-cover"
                  />
                  
                  <div className="p-6 bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-bold text-primary">Free</div>
                      {program.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                      {program.new && (
                        <Badge>New</Badge>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Full access to all course materials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Certificate upon completion</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Direct access to instructors</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                        <span>Community forums and networking</span>
                      </li>
                    </ul>
                    
                    <Button onClick={handleEnroll} className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Program Content */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructors">Instructors</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Program</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p className="mb-4">
                      This program offers an in-depth exploration of {program.category.toLowerCase()} principles 
                      within the context of cooperative economics and ethical finance. Developed by expert 
                      faculty from {program.provider}, it combines theoretical frameworks with practical 
                      case studies drawn from real-world applications.
                    </p>
                    <p className="mb-4">
                      Throughout this {program.duration} journey, you'll engage with cutting-edge concepts 
                      and methodologies that are reshaping the landscape of {program.category.toLowerCase()}. 
                      The program emphasizes a collaborative approach to learning, mirroring the cooperative 
                      values that underpin its content.
                    </p>
                    <p>
                      By the end of this program, you'll possess both the knowledge and the practical tools 
                      to implement sustainable and ethical approaches to {program.category.toLowerCase()} in 
                      your professional context, contributing to the development of more equitable and 
                      resilient economic models.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                  <ul className="space-y-2">
                    {prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Program Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="text-primary" size={20} />
                        <h3 className="font-semibold">Duration</h3>
                      </div>
                      <p>{program.duration}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-primary" size={20} />
                        <h3 className="font-semibold">Start Date</h3>
                      </div>
                      <p>Flexible (Start anytime)</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="text-primary" size={20} />
                        <h3 className="font-semibold">Certificate</h3>
                      </div>
                      <p>Upon completion</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="text-primary" size={20} />
                        <h3 className="font-semibold">Language</h3>
                      </div>
                      <p>English, Spanish, Basque</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Building className="text-primary" size={20} />
                        <h3 className="font-semibold">Institution</h3>
                      </div>
                      <p>{program.provider}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Layers className="text-primary" size={20} />
                        <h3 className="font-semibold">Level</h3>
                      </div>
                      <p>Intermediate</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Program Curriculum</h2>
                  <p className="text-gray-600 mb-6">
                    This curriculum is designed to provide a comprehensive understanding of {program.category.toLowerCase()}, 
                    with a focus on practical applications within cooperative and ethical frameworks.
                  </p>
                  
                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <Accordion type="single" collapsible>
                          <AccordionItem value={`module-${module.id}`} className="border-0">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                                    {index + 1}
                                  </div>
                                  <div className="text-left">
                                    <h3 className="font-semibold">{module.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                      <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {module.duration}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <BookOpen size={14} />
                                        {module.lessons} lessons
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {module.completed && (
                                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 mr-4">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                              <ul className="space-y-3 mt-2">
                                {Array.from({ length: 3 }, (_, i) => (
                                  <li key={i} className="flex items-center justify-between py-2 px-4 rounded-md hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                      <Play size={16} className="text-primary" />
                                      <span>Lesson {i + 1}: {["Introduction", "Key Concepts", "Case Study"][i]}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">25 min</span>
                                  </li>
                                ))}
                                {module.id === 1 && (
                                  <li className="flex items-center justify-between py-2 px-4 rounded-md hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                      <FileText size={16} className="text-primary" />
                                      <span>Module Assessment</span>
                                    </div>
                                    <span className="text-sm text-gray-500">45 min</span>
                                  </li>
                                )}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Program Materials</h3>
                  <p className="text-gray-600 mb-4">
                    Access to all course materials is provided upon enrollment. You can download the program 
                    syllabus below for a detailed overview.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={16} />
                    Download Syllabus
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="instructors" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Meet Your Instructors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {instructors.map((instructor) => (
                      <div key={instructor.id} className="flex flex-col sm:flex-row gap-6 p-6 border border-gray-200 rounded-lg">
                        <img 
                          src={instructor.image} 
                          alt={instructor.name} 
                          className="w-24 h-24 rounded-full object-cover shadow-sm mx-auto sm:mx-0"
                        />
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                          <p className="text-primary mb-2">{instructor.role}</p>
                          <p className="text-gray-600 text-sm">{instructor.background}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">About {program.provider}</h3>
                  <p className="text-gray-600 mb-4">
                    {program.provider === "Mondragon Unibertsitatea" ? (
                      <>
                        Mondragon Unibertsitatea is a cooperative university founded on the principles of 
                        democratic participation and social responsibility. It forms part of the Mondragon 
                        Corporation, the world's largest worker cooperative. The university is renowned for 
                        its innovative educational approach that integrates academic excellence with practical 
                        experience in cooperative enterprises.
                      </>
                    ) : program.provider === "Laboral Kutxa" ? (
                      <>
                        Laboral Kutxa is a cooperative credit union that operates according to principles of 
                        ethical banking and social economy. As a key financial institution within the Mondragon 
                        Cooperative Corporation, Laboral Kutxa combines financial expertise with cooperative 
                        values to develop educational programs that promote sustainable and responsible 
                        approaches to finance.
                      </>
                    ) : (
                      <>
                        {program.provider} is a leading institution in the field of {program.category.toLowerCase()}, 
                        committed to delivering high-quality educational programs that combine academic rigor 
                        with practical application.
                      </>
                    )}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-8">
                <div>
                  <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                    <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg text-center">
                      <div className="text-5xl font-bold text-primary mb-2">{program.rating}</div>
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={20} 
                            className={i < Math.floor(program.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-500">Based on 123 reviews</p>
                    </div>
                    
                    <div className="w-full md:w-2/3 space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className="fill-amber-400 text-amber-400" 
                            />
                          ))}
                        </div>
                        <Progress value={75} className="h-2 w-full max-w-md" />
                        <span className="text-sm text-gray-500 min-w-[40px]">75%</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className="fill-amber-400 text-amber-400" 
                            />
                          ))}
                          <Star size={16} className="text-gray-300" />
                        </div>
                        <Progress value={20} className="h-2 w-full max-w-md" />
                        <span className="text-sm text-gray-500 min-w-[40px]">20%</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          {[...Array(3)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className="fill-amber-400 text-amber-400" 
                            />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} size={16} className="text-gray-300" />
                          ))}
                        </div>
                        <Progress value={5} className="h-2 w-full max-w-md" />
                        <span className="text-sm text-gray-500 min-w-[40px]">5%</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          {[...Array(2)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className="fill-amber-400 text-amber-400" 
                            />
                          ))}
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} size={16} className="text-gray-300" />
                          ))}
                        </div>
                        <Progress value={0} className="h-2 w-full max-w-md" />
                        <span className="text-sm text-gray-500 min-w-[40px]">0%</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star 
                            size={16} 
                            className="fill-amber-400 text-amber-400" 
                          />
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} size={16} className="text-gray-300" />
                          ))}
                        </div>
                        <Progress value={0} className="h-2 w-full max-w-md" />
                        <span className="text-sm text-gray-500 min-w-[40px]">0%</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-6">Student Feedback</h2>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">{review.name}</h3>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Related Programs */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold mb-8">Similar Programs You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs
                .filter(p => p.id !== program.id && p.category === program.category)
                .slice(0, 3)
                .map((relatedProgram, index) => (
                  <div 
                    key={relatedProgram.id} 
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    onClick={() => window.location.href = `/programs/${relatedProgram.id}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={relatedProgram.imageSrc} 
                      alt={relatedProgram.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <Badge variant="outline" className="text-xs font-medium text-secondary mb-2">
                        {relatedProgram.category}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2">{relatedProgram.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{relatedProgram.provider}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-amber-500">
                          <Star size={16} className="fill-amber-400 mr-1" />
                          {relatedProgram.rating}
                        </div>
                        <div className="text-sm text-gray-500">
                          {relatedProgram.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetails;
