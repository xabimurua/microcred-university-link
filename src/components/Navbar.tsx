
import React, { useState, useEffect } from "react";
import { Menu, X, UserCircle2, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
          ? "bg-darkbg/90 backdrop-blur-md border-b border-white/10 py-3" 
          : "bg-darkbg py-5"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold text-2xl tracking-tight gradient-text">
            MicroCred
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" currentPath={location.pathname}>Inicio</NavLink>
          <NavLink to="/programs" currentPath={location.pathname}>Programas</NavLink>
          <NavLink to="/for-companies" currentPath={location.pathname}>Empresas</NavLink>
          <NavLink to="#about" currentPath={location.pathname}>Acerca de</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/20 bg-darkbg-lighter">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-purple text-white">
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-darkbg-lighter border border-white/10">
                <DropdownMenuItem onClick={handleLogout} className="text-white hover:text-white hover:bg-darkbg">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 transition-standard"
                onClick={() => navigate("/auth")}
              >
                Iniciar Sesión
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple to-pink text-white hover:opacity-90 transition-standard font-medium glow-button"
                onClick={() => navigate("/auth")}
              >
                Registrarse
              </Button>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={cn(
          "md:hidden fixed inset-0 top-[60px] bg-darkbg z-40 transition-all duration-300 ease-in-out",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="container flex flex-col p-6 space-y-6 animate-fade-in">
          <MobileNavLink to="/" currentPath={location.pathname}>Inicio</MobileNavLink>
          <MobileNavLink to="/programs" currentPath={location.pathname}>Programas</MobileNavLink>
          <MobileNavLink to="/for-companies" currentPath={location.pathname}>Empresas</MobileNavLink>
          <MobileNavLink to="#about" currentPath={location.pathname}>Acerca de</MobileNavLink>
          
          <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
            <Button variant="outline" className="w-full border-white/20 text-white">
              Iniciar Sesión
            </Button>
            <Button className="w-full bg-gradient-to-r from-purple to-pink text-white hover:opacity-90">
              Registrarse
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
          "text-white/80 hover:text-purple font-medium transition-standard relative group",
          isActive && "text-purple"
        )}
      >
        {children}
        <span className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-purple transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}></span>
      </a>
    );
  }
  
  return (
    <Link 
      to={to} 
      className={cn(
        "text-white/80 hover:text-purple font-medium transition-standard relative group",
        isActive && "text-purple"
      )}
    >
      {children}
      <span className={cn(
        "absolute bottom-0 left-0 h-0.5 bg-purple transition-all duration-300",
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
          isActive ? "text-purple" : "text-white"
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
        isActive ? "text-purple" : "text-white"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
