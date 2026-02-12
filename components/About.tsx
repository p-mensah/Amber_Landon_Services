
import React, { useState, useEffect } from 'react';
import AnimatedElement from './AnimatedElement';
import { stats } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ClientLogos from './ClientLogos';
import ProgressiveImage from './ProgressiveImage';

const Counter: React.FC<{ end: number, duration?: number }> = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useScrollAnimation<HTMLSpanElement>();

    useEffect(() => {
        if (!isVisible) return;
        
        let start = 0;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * end);
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);
    
    return <span ref={ref}>{count}</span>;
};

const coreValues = [
    { icon: 'shield-checkmark-outline', title: 'Reliability', description: 'Delivering on our promises with unwavering consistency.' },
    { icon: 'rocket-outline', title: 'Efficiency', description: 'Optimizing every step to save you time and resources.' },
    { icon: 'earth-outline', title: 'Global Reach', description: 'Connecting your business to the world with a vast network.' },
    { icon: 'people-outline', title: 'Customer-Centric', description: 'Your success is at the core of everything we do.' }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-slate-100 dark:bg-navy/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedElement animation="fade-in-up">
            <div className="relative">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-cyan-accent to-purple-accent opacity-20 blur-2xl"></div>
                <ProgressiveImage 
                  src="https://i.ibb.co/wrjLzqzf/pexels-pixabay-262353.jpg" 
                  placeholderSrc="https://i.ibb.co/wrjLzqzf/pexels-pixabay-262353.jpg"
                  alt="Logistics operation" 
                  className="relative rounded-xl shadow-2xl w-full" 
                />
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fade-in-up" delay="duration-700">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-slate-900 dark:text-white">
                Your Trusted Partner in <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Global Logistics</span>
              </h2>
              <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                At Amber Landon Services, we are more than just a logistics company; we are an extension of your team. With a decade of experience, we've built a robust global network dedicated to streamlining your supply chain, enhancing your brand, and ensuring your products reach their destination safely and on time.
              </p>
              
              <div className="mt-10 grid grid-cols-2 gap-8 text-center">
                  {stats.map(stat => (
                      <div key={stat.label}>
                          <p className="text-4xl md:text-5xl font-montserrat font-bold bg-gradient-to-r from-cyan-accent to-emerald-accent gradient-text">
                            <Counter end={stat.value} />{stat.suffix}
                          </p>
                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-poppins">{stat.label}</p>
                      </div>
                  ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
        
        <div className="mt-20 lg:mt-32 text-center md:text-left">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                <AnimatedElement animation="fade-in-up">
                    <h3 className="text-3xl font-montserrat font-bold text-slate-900 dark:text-white mb-4">Our <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Mission</span></h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">To empower businesses by providing seamless, innovative, and reliable logistics and branding solutions that drive growth and connect them to the global marketplace.</p>
                </AnimatedElement>
                <AnimatedElement animation="fade-in-up" delay="duration-700">
                    <h3 className="text-3xl font-montserrat font-bold text-slate-900 dark:text-white mb-4">Our <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Vision</span></h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">To be the world's most trusted and customer-focused logistics partner, recognized for our commitment to excellence and our passion for simplifying global trade.</p>
                </AnimatedElement>
            </div>
        </div>
        
        <div className="mt-20 lg:mt-32 text-center">
            <AnimatedElement>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-slate-900 dark:text-white">
                    Our Core <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Values</span>
                </h2>
            </AnimatedElement>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreValues.map((value, index) => (
                    <AnimatedElement key={value.title} animation="fade-in-up" delay={`duration-${500 + index * 100}`}>
                        <div className="p-6 rounded-xl bg-slate-50 dark:bg-navy h-full transition-transform transform hover:-translate-y-2">
                            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-orange-primary/20 to-amber-primary/20 text-orange-primary dark:text-amber-primary text-4xl mb-4">
                                <ion-icon name={value.icon}></ion-icon>
                            </div>
                            <h4 className="text-xl font-poppins font-semibold text-slate-800 dark:text-white mb-2">{value.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{value.description}</p>
                        </div>
                    </AnimatedElement>
                ))}
            </div>
        </div>

        <ClientLogos />
      </div>
    </section>
  );
};

export default About;
