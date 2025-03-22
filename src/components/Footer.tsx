
import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <a href="/" className="text-white font-semibold text-2xl tracking-tight mb-4 inline-block">
              MicroCred
            </a>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting education with industry through specialized microcredentials that help professionals advance their careers and companies find qualified talent.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" label="Facebook" />
              <SocialLink icon={<Twitter size={18} />} href="#" label="Twitter" />
              <SocialLink icon={<Linkedin size={18} />} href="#" label="LinkedIn" />
              <SocialLink icon={<Instagram size={18} />} href="#" label="Instagram" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Programs</h4>
            <ul className="space-y-3">
              <FooterLink href="#">Technology</FooterLink>
              <FooterLink href="#">Business</FooterLink>
              <FooterLink href="#">Health</FooterLink>
              <FooterLink href="#">Education</FooterLink>
              <FooterLink href="#">All Programs</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">For Companies</FooterLink>
              <FooterLink href="#">Universities</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">contact@microcred.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">(800) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  100 Innovation Drive<br />
                  Silicon Valley, CA 94123
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} MicroCred. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => (
  <a 
    href={href} 
    aria-label={label}
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a href={href} className="text-gray-300 hover:text-white transition-colors">
      {children}
    </a>
  </li>
);

export default Footer;
