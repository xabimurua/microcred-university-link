
import React, { useRef, useEffect } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Immediately make content visible on load
    if (sectionRef.current) {
      sectionRef.current.classList.add("opacity-100");
      sectionRef.current.classList.remove("opacity-0", "translate-y-8");
    }
    
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

  const faqs = [
    {
      question: "What is a microcredential?",
      answer: "A microcredential is a certification that verifies a person's skills or competencies in a specific area. Unlike traditional degrees, microcredentials are focused on specific skills that can be completed in a shorter timeframe, usually ranging from a few weeks to a few months."
    },
    {
      question: "How do companies benefit from microcredentials?",
      answer: "Companies benefit from microcredentials by gaining access to a talent pool with verified, specific skills that match their needs. They can also upskill their current workforce with targeted programs, creating custom credentials for their industry-specific challenges, and verifying skills with secure digital credentials."
    },
    {
      question: "Are these credentials recognized by employers?",
      answer: "Yes, our microcredentials are developed in partnership with leading universities and industry experts, ensuring they are recognized and valued by employers. Over 500 companies trust our credential verification process, and many actively participate in developing credential criteria."
    },
    {
      question: "How long does it take to complete a program?",
      answer: "Program duration varies based on the subject matter and depth. Most programs range from 5 to 12 weeks, requiring approximately 5-10 hours of work per week. Each program description includes specific time commitments."
    },
    {
      question: "Can we create custom programs for our company?",
      answer: "Absolutely! We work with companies to develop custom microcredential programs that address their specific talent needs and challenges. Contact our partnerships team to discuss creating a tailored program for your organization."
    }
  ];

  return (
    <section 
      id="faq" 
      className="py-16 md:py-24 bg-white"
      ref={sectionRef}
    >
      <div className="container px-4 mx-auto opacity-100 transition-all duration-1000 ease-out">
        <div className="text-center mb-12">
          <h2 className="text-sm text-secondary font-semibold uppercase tracking-wider mb-2">FAQ</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Got questions about our microcredential programs? Find answers to the most common questions below.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-gray-200 py-2"
                style={{ animation: `fadeIn 0.5s ease-out forwards ${index * 100}ms` }}
              >
                <AccordionTrigger className="text-lg font-medium text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
