
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-primary font-semibold text-2xl tracking-tight">
            MicroCred
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="#programs">Programs</NavLink>
          <NavLink href="#for-companies">For Companies</NavLink>
          <NavLink href="#about">About</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="transition-standard">
            Log In
          </Button>
          <Button className="bg-accent hover:bg-accent/90 transition-standard">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-primary"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 top-[60px] bg-white z-40 transition-all duration-300 ease-in-out",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="container flex flex-col p-6 space-y-6 animate-fade-in">
          <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="#programs" onClick={() => setMobileMenuOpen(false)}>Programs</MobileNavLink>
          <MobileNavLink href="#for-companies" onClick={() => setMobileMenuOpen(false)}>For Companies</MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
          
          <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
            <Button variant="outline" className="w-full">
              Log In
            </Button>
            <Button className="w-full bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-primary/90 hover:text-accent font-medium transition-standard relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <a 
    href={href} 
    className="text-xl font-medium text-primary py-2 transition-standard"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
