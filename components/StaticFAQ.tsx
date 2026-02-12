
import React, { useState, useEffect } from 'react';
import { faqs } from '../constants';
import AnimatedElement from './AnimatedElement';

interface FAQItemProps {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index, isOpen, onToggle }) => {
    const [feedbackState, setFeedbackState] = useState<'idle' | 'submitted'>('idle');

    const handleFeedback = () => {
        setFeedbackState('submitted');
    };

    // Reset feedback state when the accordion closes
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setFeedbackState('idle');
            }, 500); // Match animation duration to avoid state change before collapse
            return () => clearTimeout(timer);
        }
    }, [isOpen]);


    return (
        <div className="border-b border-slate-200 dark:border-slate-700/50 py-5">
            <button
                onClick={() => onToggle(index)}
                className="w-full flex justify-between items-center text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
            >
                <h3 className="text-lg font-poppins font-medium text-slate-800 dark:text-white">
                    {faq.question}
                </h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ion-icon name="chevron-down-outline" className="text-xl text-orange-primary"></ion-icon>
                </span>
            </button>
            <div
                id={`faq-answer-${index}`}
                className="grid transition-all duration-500 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className={`pt-4 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {faq.answer}
                        </p>
                        
                        {/* Feedback Section */}
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                            {feedbackState === 'idle' ? (
                                <div className="flex items-center gap-4">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Was this helpful?</p>
                                    <button onClick={handleFeedback} className="px-3 py-1 text-sm rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Yes</button>
                                    <button onClick={handleFeedback} className="px-3 py-1 text-sm rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">No</button>
                                </div>
                            ) : (
                                <p className="text-sm font-medium text-emerald-accent">Thank you for your feedback!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StaticFAQProps {
    showTitle?: boolean;
    className?: string;
}

const StaticFAQ: React.FC<StaticFAQProps> = ({ showTitle = true, className = '' }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`${showTitle ? 'mt-20 lg:mt-32' : ''} ${className}`}>
            {showTitle && (
                <AnimatedElement className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-slate-900 dark:text-white">
                        Frequently Asked <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Questions</span>
                    </h2>
                </AnimatedElement>
            )}
            <AnimatedElement animation="fade-in-up" delay={showTitle ? 'duration-700' : 'duration-300'}>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem 
                            key={index} 
                            faq={faq} 
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            </AnimatedElement>
        </div>
    );
};

export default StaticFAQ;
