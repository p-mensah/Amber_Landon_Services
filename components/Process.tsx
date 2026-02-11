
import React from 'react';
import { processSteps } from '../constants';
import AnimatedElement from './AnimatedElement';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Process: React.FC = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="process" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-slate-900 dark:text-white">
            Our Streamlined <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Process</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            A clear and transparent workflow designed for efficiency and your peace of mind.
          </p>
        </AnimatedElement>

        <div ref={sectionRef} className="relative">
          {/* Animated Timeline Line */}
          <div 
            className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-orange-primary/20 via-purple-accent/20 to-cyan-accent/20 -translate-x-1/2 hidden md:block transition-all duration-[2000ms] ease-out"
            style={{ height: isSectionVisible ? '100%' : '0' }}
          ></div>

          {processSteps.map((step, index) => (
            <AnimatedElement key={index} className="mb-12 md:mb-0">
              <div className="group flex flex-col md:flex-row items-center">
                {/* Content Left */}
                <div className={`w-full md:w-5/12 ${index % 2 !== 0 ? 'md:order-3' : ''}`}>
                  <div className={`p-6 rounded-lg bg-slate-100 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-lg md:text-right ${index % 2 !== 0 ? 'md:text-left' : ''} transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                    <h3 className="text-xl font-poppins font-semibold text-slate-800 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{step.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="w-full md:w-2/12 flex justify-center my-4 md:my-0">
                  <div className="z-10 w-16 h-16 rounded-full bg-gradient-to-br from-orange-primary to-amber-primary text-white flex items-center justify-center text-3xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-orange-primary/40">
                    <ion-icon name={step.icon}></ion-icon>
                  </div>
                </div>

                {/* Spacer Right */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:order-3' : ''}`}></div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
