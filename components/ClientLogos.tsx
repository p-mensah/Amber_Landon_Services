
import React from 'react';
import { clientLogos } from '../constants';
import AnimatedElement from './AnimatedElement';

const ClientLogos: React.FC = () => {
    return (
        <div className="mt-24">
            <AnimatedElement animation="fade-in">
                <h3 className="text-center text-lg font-poppins text-slate-500 dark:text-slate-400">
                    Trusted by innovative companies worldwide
                </h3>
            </AnimatedElement>
            <div className="relative mt-8 h-20 overflow-hidden">
                <div 
                    className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-100 to-transparent dark:from-navy/50 dark:to-transparent z-10"
                    aria-hidden="true"
                ></div>
                <div 
                    className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-100 to-transparent dark:from-navy/50 dark:to-transparent z-10"
                    aria-hidden="true"
                ></div>

                <div className="absolute top-0 left-0 flex items-center w-max animate-infinite-scroll group-hover:pause">
                    {[...clientLogos, ...clientLogos].map((logo, index) => (
                        <div key={index} className="flex-shrink-0 w-48 flex items-center justify-center mx-4">
                            <img 
                                src={logo.src} 
                                alt={logo.name} 
                                className="h-8 md:h-10 object-contain aspect-auto filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientLogos;