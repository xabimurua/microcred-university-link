
import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Briefcase, 
  ChevronDown,
  X,
  Bookmark,
  GraduationCap,
  UserCheck,
  SlidersHorizontal
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProgramCard from "@/components/ProgramCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { programs as allPrograms } from "@/data/programs";

const Programs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 9;
  const [activeFilters, setActiveFilters] = useState<{
    category: string | null,
    duration: string | null,
    provider: string | null
  }>({
    category: null, 
    duration: null,
    provider: null
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const programs = allPrograms;

  const getFilteredPrograms = () => {
    return programs.filter(program => {
      const matchesSearch = searchQuery === "" || 
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !activeFilters.category || 
        program.category === activeFilters.category;
      
      const matchesDuration = !activeFilters.duration || 
        program.duration === activeFilters.duration;
      
      const matchesProvider = !activeFilters.provider || 
        program.provider === activeFilters.provider;
      
      const matchesTab = activeTab === "all" || 
        (activeTab === "featured" && program.featured) || 
        (activeTab === "new" && program.new) || 
        (activeTab === "popular" && program.popular);
      
      return matchesSearch && matchesCategory && matchesDuration && matchesProvider && matchesTab;
    });
  };

  const filteredPrograms = getFilteredPrograms();
  
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);

  const categories = [...new Set(programs.map(program => program.category))];
  const durations = [...new Set(programs.map(program => program.duration))];
  const providers = [...new Set(programs.map(program => program.provider))];

  const applyFilter = (type: 'category' | 'duration' | 'provider', value: string | null) => {
    setCurrentPage(1);
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: null,
      duration: null,
      provider: null
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const FiltersList = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
          <Briefcase size={16} />
          Categories
        </h3>
        <div className="grid grid-cols-1 gap-1.5">
          {categories.map(category => (
            <button
              key={category}
              className={cn(
                "text-sm py-1.5 px-3 rounded-md block w-full text-left transition-colors flex items-center justify-between",
                activeFilters.category === category 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-gray-100"
              )}
              onClick={() => applyFilter('category', category)}
            >
              <span>{category}</span>
              {activeFilters.category === category && (
                <span className="w-2 h-2 bg-primary rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
          <Clock size={16} />
          Duration
        </h3>
        <div className="grid grid-cols-1 gap-1.5">
          {durations.map(duration => (
            <button
              key={duration}
              className={cn(
                "text-sm py-1.5 px-3 rounded-md block w-full text-left transition-colors flex items-center justify-between",
                activeFilters.duration === duration 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-gray-100"
              )}
              onClick={() => applyFilter('duration', duration)}
            >
              <span>{duration}</span>
              {activeFilters.duration === duration && (
                <span className="w-2 h-2 bg-primary rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
          <Star size={16} />
          Providers
        </h3>
        <div className="grid grid-cols-1 gap-1.5">
          {providers.map(provider => (
            <button
              key={provider}
              className={cn(
                "text-sm py-1.5 px-3 rounded-md block w-full text-left transition-colors flex items-center justify-between",
                activeFilters.provider === provider 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-gray-100"
              )}
              onClick={() => applyFilter('provider', provider)}
            >
              <span>{provider}</span>
              {activeFilters.provider === provider && (
                <span className="w-2 h-2 bg-primary rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <Breadcrumb className="mb-6">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/programs">Programs</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Discover Microcredential Programs
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Browse our comprehensive collection of industry-recognized microcredentials 
                designed to enhance your skills and advance your career.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search programs, skills, or providers..."
                  className="pl-10 py-6 h-auto rounded-full"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="md:hidden flex items-center gap-2 h-auto py-2 px-4"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersList />
                  </div>
                  
                  {(activeFilters.category || activeFilters.duration || activeFilters.provider) && (
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={clearFilters}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
              
              <Button 
                variant="outline" 
                className="hidden md:flex items-center gap-2 h-auto py-2 px-4 rounded-full"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} />
              </Button>
            </div>
          </div>
        </section>
        
        <div className="bg-white border-b border-gray-100 py-6">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{programs.length}</div>
                  <div className="text-sm text-gray-500">Total Programs</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Bookmark className="text-secondary" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{providers.length}</div>
                  <div className="text-sm text-gray-500">Trusted Providers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-accent/10 p-3 rounded-full">
                  <UserCheck className="text-accent" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {programs.reduce((total, program) => total + program.students, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Enrolled Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {(activeFilters.category || activeFilters.duration || activeFilters.provider || searchQuery) && (
          <div className="bg-white border-b border-gray-100 py-3">
            <div className="container px-4 mx-auto">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {searchQuery && (
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="ml-1">
                      <X size={14} />
                    </button>
                  </Badge>
                )}
                
                {activeFilters.category && (
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                    Category: {activeFilters.category}
                    <button onClick={() => applyFilter('category', null)} className="ml-1">
                      <X size={14} />
                    </button>
                  </Badge>
                )}
                
                {activeFilters.duration && (
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                    Duration: {activeFilters.duration}
                    <button onClick={() => applyFilter('duration', null)} className="ml-1">
                      <X size={14} />
                    </button>
                  </Badge>
                )}
                
                {activeFilters.provider && (
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
                    Provider: {activeFilters.provider}
                    <button onClick={() => applyFilter('provider', null)} className="ml-1">
                      <X size={14} />
                    </button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm ml-auto"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <section 
          className="py-12 md:py-16"
          ref={sectionRef}
        >
          <div className="container px-4 mx-auto transition-all duration-1000 ease-out">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="hidden md:block w-64 shrink-0">
                <div className="sticky top-24 space-y-8 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <FiltersList />
                </div>
              </div>
              
              <div className="flex-grow">
                <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-8">
                  <TabsList className="bg-gray-100/70 p-1 rounded-full">
                    <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white">All Programs</TabsTrigger>
                    <TabsTrigger value="featured" className="rounded-full data-[state=active]:bg-white">Featured</TabsTrigger>
                    <TabsTrigger value="new" className="rounded-full data-[state=active]:bg-white">New</TabsTrigger>
                    <TabsTrigger value="popular" className="rounded-full data-[state=active]:bg-white">Popular</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {filteredPrograms.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No programs found</h3>
                    <p className="text-gray-500 mb-4">
                      We couldn't find any programs matching your filters.
                    </p>
                    <Button onClick={clearFilters}>Clear filters</Button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 mb-6">
                      Showing {currentPrograms.length} of {filteredPrograms.length} programs
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentPrograms.map((program, index) => (
                        <ProgramCard 
                          key={program.id} 
                          program={program} 
                          index={index}
                          showBookmark={true}
                        />
                      ))}
                    </div>
                    
                    {totalPages > 1 && (
                      <div className="mt-12">
                        <Pagination>
                          <PaginationContent>
                            {currentPage > 1 && (
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => handlePageChange(currentPage - 1)} 
                                  href="#"
                                  aria-label="Go to previous page"
                                />
                              </PaginationItem>
                            )}
                            
                            {[...Array(totalPages)].map((_, index) => (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  onClick={() => handlePageChange(index + 1)}
                                  isActive={currentPage === index + 1}
                                  href="#"
                                >
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            {currentPage < totalPages && (
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => handlePageChange(currentPage + 1)} 
                                  href="#"
                                  aria-label="Go to next page"
                                />
                              </PaginationItem>
                            )}
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
