
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
  Bookmark, 
  ChevronDown,
  X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProgramCard from "@/components/ProgramCard";

// Program data (in real app, this would come from an API)
import { programs } from "@/data/programs";

const Programs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<{
    category: string | null,
    duration: string | null,
    provider: string | null
  }>({
    category: null, 
    duration: null,
    provider: null
  });

  // Filter programs based on search query and filters
  const filteredPrograms = programs.filter(program => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = !activeFilters.category || 
      program.category === activeFilters.category;
    
    // Duration filter
    const matchesDuration = !activeFilters.duration || 
      program.duration === activeFilters.duration;
    
    // Provider filter
    const matchesProvider = !activeFilters.provider || 
      program.provider === activeFilters.provider;
    
    return matchesSearch && matchesCategory && matchesDuration && matchesProvider;
  });

  const categories = [...new Set(programs.map(program => program.category))];
  const durations = [...new Set(programs.map(program => program.duration))];
  const providers = [...new Set(programs.map(program => program.provider))];

  // Apply filter
  const applyFilter = (type: 'category' | 'duration' | 'provider', value: string | null) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      category: null,
      duration: null,
      provider: null
    });
    setSearchQuery("");
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Animation for items
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-primary/5 py-12 md:py-16">
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Microcredential Programs
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Browse our comprehensive collection of industry-recognized microcredentials 
                designed to enhance your skills and advance your career.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search programs, skills, or providers..."
                    className="pl-10 py-6 h-auto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 h-auto py-2 px-4"
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Active filters */}
        {(activeFilters.category || activeFilters.duration || activeFilters.provider || searchQuery) && (
          <div className="bg-white border-b border-gray-100 py-3">
            <div className="container px-4 mx-auto">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {searchQuery && (
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery("")}>
                      <X size={14} className="ml-1" />
                    </button>
                  </span>
                )}
                
                {activeFilters.category && (
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {activeFilters.category}
                    <button onClick={() => applyFilter('category', null)}>
                      <X size={14} className="ml-1" />
                    </button>
                  </span>
                )}
                
                {activeFilters.duration && (
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {activeFilters.duration}
                    <button onClick={() => applyFilter('duration', null)}>
                      <X size={14} className="ml-1" />
                    </button>
                  </span>
                )}
                
                {activeFilters.provider && (
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {activeFilters.provider}
                    <button onClick={() => applyFilter('provider', null)}>
                      <X size={14} className="ml-1" />
                    </button>
                  </span>
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
        
        {/* Main content */}
        <section 
          className="py-12 md:py-16"
          ref={sectionRef}
        >
          <div className="container px-4 mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="w-full md:w-64 shrink-0">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Briefcase size={16} />
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          className={cn(
                            "text-sm py-1 px-2 rounded-md block w-full text-left transition-colors",
                            activeFilters.category === category 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "hover:bg-gray-100"
                          )}
                          onClick={() => applyFilter('category', category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock size={16} />
                      Duration
                    </h3>
                    <div className="space-y-2">
                      {durations.map(duration => (
                        <button
                          key={duration}
                          className={cn(
                            "text-sm py-1 px-2 rounded-md block w-full text-left transition-colors",
                            activeFilters.duration === duration 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "hover:bg-gray-100"
                          )}
                          onClick={() => applyFilter('duration', duration)}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star size={16} />
                      Providers
                    </h3>
                    <div className="space-y-2">
                      {providers.map(provider => (
                        <button
                          key={provider}
                          className={cn(
                            "text-sm py-1 px-2 rounded-md block w-full text-left transition-colors",
                            activeFilters.provider === provider 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "hover:bg-gray-100"
                          )}
                          onClick={() => applyFilter('provider', provider)}
                        >
                          {provider}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Programs grid */}
              <div className="flex-grow">
                <Tabs defaultValue="all" className="mb-8">
                  <TabsList>
                    <TabsTrigger value="all">All Programs</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
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
                      Showing {filteredPrograms.length} programs
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredPrograms.map((program, index) => (
                        <ProgramCard 
                          key={program.id} 
                          program={program} 
                          index={index}
                        />
                      ))}
                    </div>
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
