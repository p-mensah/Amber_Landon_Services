
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import AnimatedElement from './AnimatedElement';
import ParticlesCanvas from './ParticlesCanvas';
import ProgressiveImage from './ProgressiveImage';

const heroImages = [
  { src: 'https://picsum.photos/seed/cargo-ship/1920/1080?grayscale', placeholder: 'https://picsum.photos/seed/cargo-ship/192/108?grayscale&blur=2' },
  { src: 'https://picsum.photos/seed/air-freight/1920/1080?grayscale', placeholder: 'https://picsum.photos/seed/air-freight/192/108?grayscale&blur=2' },
  { src: 'https://picsum.photos/seed/port-containers/1920/1080?grayscale', placeholder: 'https://picsum.photos/seed/port-containers/192/108?grayscale&blur=2' },
  { src: 'https://picsum.photos/seed/warehouse-logistics/1920/1080?grayscale', placeholder: 'https://picsum.photos/seed/warehouse-logistics/192/108?grayscale&blur=2' },
  { src: 'https://picsum.photos/seed/shipping-docks/1920/1080?grayscale', placeholder: 'https://picsum.photos/seed/shipping-docks/192/108?grayscale&blur=2' },
];

const Hero: React.FC = () => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: ['Branding & Design.', 'Global Procurement.', 'Air & Sea Cargo.', 'Supplier Visits.'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      smartBackspace: true,
    });

    const Swiper = (window as any).Swiper;
    if (Swiper) {
      new Swiper('.hero-slider', {
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 1500,
      });
    }

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image Slider */}
      <div className="absolute inset-0 swiper hero-slider opacity-10 dark:opacity-5">
        <div className="swiper-wrapper">
          {heroImages.map((image, index) => (
            <div key={index} className="swiper-slide">
              <ProgressiveImage 
                src={image.src} 
                placeholderSrc={image.placeholder} 
                alt={`Shipping background ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
      
      <ParticlesCanvas />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-navy dark:via-navy/80"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimatedElement animation="fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-extrabold tracking-tight text-slate-900 dark:text-white">
            Seamless Logistics for
            <br />
            <span ref={el} className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text"></span>
          </h1>
        </AnimatedElement>
        <AnimatedElement animation="fade-in-up" delay="duration-700">
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Amber Landon Services provides end-to-end solutions, from product ideation and sourcing, to global shipping, ensuring your business thrives in a competitive market.
          </p>
        </AnimatedElement>
        <AnimatedElement animation="zoom-in" delay="duration-1000">
          <div className="mt-10">
            <a href="#help-and-support" className="inline-block text-white font-poppins font-semibold py-4 px-8 rounded-full bg-gradient-to-r from-orange-primary to-amber-primary hover:scale-105 transform transition-transform duration-300 shadow-lg hover:shadow-orange-primary/50 animate-pulse-glow">
              Get a Free Quote
            </a>
          </div>
        </AnimatedElement>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <a href="#services" aria-label="Scroll down">
          <div className="w-8 h-14 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center items-start p-1">
            <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
