
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Newsletter = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the newsletter signup
    console.log("Newsletter signup submitted");
  };

  return (
    <section 
      className="py-16 bg-accent text-white"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail size={36} className="mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated on New Programs</h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Join our newsletter to receive updates on new microcredential programs, industry insights, and exclusive offers.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-3 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
            <Button 
              type="submit" 
              className="bg-white text-accent hover:bg-white/90 px-6 py-3 h-auto"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm mt-4 text-white/70">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
