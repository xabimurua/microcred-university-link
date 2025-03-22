
import React, { useRef, useEffect } from "react";
import { Star, Quote } from "lucide-react";

type TestimonialProps = {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  imageSrc: string;
};

const Testimonials = () => {
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

  const testimonials: TestimonialProps[] = [
    {
      quote: "The microcredential program helped our team gain practical skills that were immediately applicable to our projects. The ROI has been phenomenal.",
      name: "Sarah Johnson",
      title: "Director of Talent Development",
      company: "TechCorp Inc.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "We've hired several graduates from these programs, and they've consistently demonstrated exceptional skills and knowledge specific to our industry needs.",
      name: "Michael Chen",
      title: "VP of Engineering",
      company: "Innovate Systems",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The custom program developed for our company addressed specific challenges we were facing. Our team is now more effective and aligned with our goals.",
      name: "Emily Rodriguez",
      title: "Chief Learning Officer",
      company: "Global Solutions",
      rating: 4,
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-24 bg-gray-50"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="text-center mb-12">
          <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">What Our Partners Say</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from companies and professionals who have experienced the impact of our microcredential programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover-lift animate-scale-in relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-6 right-6 text-accent/20">
                <Quote size={40} />
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} mr-1`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.imageSrc} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm" 
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
