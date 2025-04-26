import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
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
          <Link to="/" className="text-primary font-semibold text-2xl tracking-tight">
            MicroCred
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/programs" currentPath={location.pathname}>Programs</NavLink>
          <NavLink to="/for-companies" currentPath={location.pathname}>For Companies</NavLink>
          <NavLink to="#about" currentPath={location.pathname}>About</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="transition-standard"
                onClick={() => navigate("/auth")}
              >
                Iniciar Sesión
              </Button>
              <Button 
                className="bg-accent hover:bg-accent/90 transition-standard"
                onClick={() => navigate("/auth")}
              >
                Registrarse
              </Button>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-primary"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={cn(
          "md:hidden fixed inset-0 top-[60px] bg-white z-40 transition-all duration-300 ease-in-out",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="container flex flex-col p-6 space-y-6 animate-fade-in">
          <MobileNavLink to="/" currentPath={location.pathname}>Home</MobileNavLink>
          <MobileNavLink to="/programs" currentPath={location.pathname}>Programs</MobileNavLink>
          <MobileNavLink to="/for-companies" currentPath={location.pathname}>For Companies</MobileNavLink>
          <MobileNavLink to="#about" currentPath={location.pathname}>About</MobileNavLink>
          
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

const NavLink = ({ 
  to, 
  children, 
  currentPath 
}: { 
  to: string; 
  children: React.ReactNode;
  currentPath: string;
}) => {
  const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);
  const isAnchor = to.startsWith('#');
  
  if (isAnchor) {
    return (
      <a 
        href={to} 
        className={cn(
          "text-primary/90 hover:text-accent font-medium transition-standard relative group",
          isActive && "text-accent"
        )}
      >
        {children}
        <span className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}></span>
      </a>
    );
  }
  
  return (
    <Link 
      to={to} 
      className={cn(
        "text-primary/90 hover:text-accent font-medium transition-standard relative group",
        isActive && "text-accent"
      )}
    >
      {children}
      <span className={cn(
        "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
        isActive ? "w-full" : "w-0 group-hover:w-full"
      )}></span>
    </Link>
  );
};

const MobileNavLink = ({ 
  to, 
  children, 
  currentPath 
}: { 
  to: string; 
  children: React.ReactNode;
  currentPath: string;
}) => {
  const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);
  const isAnchor = to.startsWith('#');
  
  if (isAnchor) {
    return (
      <a 
        href={to} 
        className={cn(
          "text-xl font-medium py-2 transition-standard",
          isActive ? "text-accent" : "text-primary"
        )}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link 
      to={to} 
      className={cn(
        "text-xl font-medium py-2 transition-standard",
        isActive ? "text-accent" : "text-primary"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
