
import React, { useEffect } from 'react';
import { testimonials } from '../constants';
import AnimatedElement from './AnimatedElement';
import ProgressiveImage from './ProgressiveImage';

const StarRating = ({ rating, className = '' }: { rating: number; className?: string }) => {
  const totalStars = 5;
  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <div key={starIndex} className="star-rating">
             {/* FIX: Changed 'class' to 'className' to align with React standards for JSX attributes. */}
             <ion-icon 
                name={starIndex <= rating ? 'star' : 'star-outline'}
                className={`star text-amber-primary text-xl`}
                style={{ '--star-delay': `${starIndex * 100}ms` }}
            ></ion-icon>
          </div>
        );
      })}
    </div>
  );
};

const Testimonials: React.FC = () => {
  useEffect(() => {
    // Swiper is loaded from a CDN script, so it's available on the window object.
    const Swiper = (window as any).Swiper;
    if (Swiper) {
      new Swiper('.testimonials-slider', {
        effect: 'slide',
        loop: true,
        centeredSlides: true,
        slidesPerView: 1.5,
        spaceBetween: 20,
        grabCursor: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2.5,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }
      });
    }
  }, []);

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-slate-100 dark:bg-navy/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-slate-900 dark:text-white">
            What Our <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Clients Say</span>
          </h2>
        </AnimatedElement>

        <AnimatedElement animation="fade-in-up">
          <div className="relative">
            <div className="swiper testimonials-slider">
              <div className="swiper-wrapper items-stretch pb-16">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="swiper-slide h-auto">
                    <div className="relative flex flex-col justify-between text-center h-full min-h-[300px] p-8 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 shadow-lg">
                      <div className="absolute top-8 left-8 text-7xl text-orange-primary/10 dark:text-amber-primary/10 font-serif select-none">
                          “
                      </div>
                      <div className="relative z-10 flex flex-col h-full">
                        <StarRating rating={testimonial.rating} className="mb-6 star-rating" />
                        <p className="text-slate-600 dark:text-slate-300 mb-8 flex-grow text-base md:text-lg italic quote-content">"{testimonial.quote}"</p>
                        <div className="flex items-center justify-center client-info">
                          <div className="w-12 h-12 rounded-full mr-4 border-2 border-orange-primary/50 overflow-hidden flex-shrink-0">
                            <ProgressiveImage
                              src={testimonial.image}
                              placeholderSrc={testimonial.placeholderImage}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-poppins font-semibold text-slate-800 dark:text-white">{testimonial.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="swiper-pagination !-bottom-0"></div>
            </div>
            <div className="swiper-button-prev -left-0 md:-left-8 top-1/2 -translate-y-1/2 hidden md:flex"></div>
            <div className="swiper-button-next -right-0 md:-right-8 top-1/2 -translate-y-1/2 hidden md:flex"></div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Testimonials;
