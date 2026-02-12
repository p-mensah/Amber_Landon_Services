
import React, { useEffect, useRef, useState } from 'react';
import { services } from '../constants';
import AnimatedElement from './AnimatedElement';
import ServiceModal from './ServiceModal';
import ProgressiveImage from './ProgressiveImage';

// Define the service type based on the services array structure
type Service = typeof services[0];

const ServiceCard: React.FC<{ service: Service; index: number; onLearnMore: (service: Service) => void; }> = ({ service, index, onLearnMore }) => {
  const { icon, hoverIcon, title, description, image, placeholderImage } = service;
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiltNode = tiltRef.current;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (tiltNode && !isTouchDevice && window.matchMedia('(min-width: 768px)').matches && (window as any).VanillaTilt) {
      (window as any).VanillaTilt.init(tiltNode, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.03,
        perspective: 1000,
      });
    }

    return () => {
      if (tiltNode && (tiltNode as any).vanillaTilt) {
        (tiltNode as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={tiltRef}
      className="group p-0.5 rounded-xl bg-gradient-to-br from-orange-primary via-purple-accent to-cyan-accent bg-[length:200%_auto] transition-all duration-500 hover:animate-border-flow h-full [transform-style:preserve-3d]"
      style={{ 
        transitionDelay: `${index * 100}ms`,
        willChange: 'transform'
      }}
    >
      <div className="relative h-full rounded-lg bg-slate-100 dark:bg-slate-800/80 backdrop-blur-sm flex flex-col overflow-hidden transition-all duration-300 shadow-lg dark:shadow-slate-900/50 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),_0_0_20px_rgba(249,115,22,0.3)] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.7),_0_0_20px_rgba(245,158,11,0.3)] [transform:translateZ(20px)] group-hover:[transform:translateZ(40px)] will-change-[transform,box-shadow]">
        
        <div className="relative h-48 overflow-hidden will-change-transform">
            <ProgressiveImage src={image} placeholderSrc={placeholderImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4 md:p-6 flex flex-col flex-grow">
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-primary to-amber-primary text-white text-3xl mb-4 flex items-center justify-center group-hover:from-emerald-accent group-hover:to-cyan-accent transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-cyan-accent/30 -mt-10 z-10 border-4 border-slate-100 dark:border-slate-800/80">
                <ion-icon
                    name={icon}
                    className="absolute transition-all duration-300 ease-out transform group-hover:opacity-0 group-hover:-rotate-12 group-hover:scale-75 will-change-[transform,opacity]"
                ></ion-icon>
                <ion-icon
                    name={hoverIcon}
                    className="absolute transition-all duration-300 ease-out transform opacity-0 rotate-12 scale-75 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100 group-hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.7)] will-change-[transform,opacity]"
                ></ion-icon>
            </div>
            
            <h3 className="text-xl font-poppins font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
            
            {/* Content Reveal: Visible on mobile, slide-up on desktop hover */}
            <div className="grid md:grid-rows-[0fr] group-hover:md:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                <div className="overflow-hidden">
                    <p className="pt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        
            <div className="mt-auto pt-4"> {/* Use mt-auto to push button to the bottom */}
                <button onClick={() => onLearnMore(service)} className="font-poppins font-semibold text-orange-primary dark:text-amber-primary flex items-center text-sm group/link">
                    Learn More
                    <ion-icon name="arrow-forward-outline" className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1"></ion-icon>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openModal = (service: Service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-slate-900 dark:text-white">
              Our Core <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Services</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
              We provide a comprehensive suite of services to power your business from concept to customer.
            </p>
          </AnimatedElement>
          
          <div className="mt-12 mb-16 max-w-4xl mx-auto text-center">
              <AnimatedElement>
                  <h3 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-white">A Complete Suite of Solutions</h3>
                  <p className="mt-4 text-slate-600 dark:text-slate-300">
                      From the initial spark of an idea to the final delivery, Amber Landon Services provides an integrated ecosystem of services designed to support your business at every stage. We handle the complexities of branding, sourcing, and logistics, so you can focus on what you do best: growing your business.
                  </p>
              </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1500px]">
            {services.map((service, index) => (
              <AnimatedElement key={service.title} animation="fade-in-up" delay={`duration-${300 + index * 100}`}>
                <ServiceCard service={service} index={index} onLearnMore={openModal} />
              </AnimatedElement>
            ))}
          </div>
          
          <div className="mt-20 text-center">
              <AnimatedElement>
                  <h3 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-white">Ready to Elevate Your Business?</h3>
                  <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
                      Let us handle the logistics, so you can focus on your vision. Get in touch with our experts today for a personalized consultation.
                  </p>
                  <div className="mt-8">
                      <a href="#help-and-support" className="inline-block text-white font-poppins font-semibold py-4 px-8 rounded-full bg-gradient-to-r from-orange-primary to-amber-primary hover:scale-105 transform transition-transform duration-300 shadow-lg hover:shadow-orange-primary/50">
                          Request a Free Quote
                      </a>
                  </div>
              </AnimatedElement>
          </div>
        </div>
      </section>
      {selectedService && <ServiceModal service={selectedService} onClose={closeModal} />}
    </>
  );
};

export default Services;
