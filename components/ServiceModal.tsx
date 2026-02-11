
import React, { useEffect, useRef } from 'react';
import { services } from '../constants';

type Service = typeof services[0];

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Trap focus within the modal for accessibility
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    firstElement.focus();
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-slate-50 dark:bg-navy rounded-xl shadow-2xl p-8 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-[fade-in-scale_0.3s_forwards]"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'fade-in-scale', animationFillMode: 'forwards', animationDuration: '0.3s' }}
      >
        <style>{`
          @keyframes fade-in-scale {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close service details"
        >
          {/* FIX: Changed 'class' to 'className' to align with React standards for JSX attributes. */}
          <ion-icon name="close" className="text-2xl"></ion-icon>
        </button>

        <h2 id="modal-title" className="text-3xl font-montserrat font-bold text-slate-900 dark:text-white mb-4">
          <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">{service.title}</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {service.details}
        </p>

        <div className="mt-8 text-right">
           <a href="#help-and-support" onClick={onClose} className="inline-block text-white font-poppins font-semibold py-3 px-6 rounded-full bg-gradient-to-r from-orange-primary to-amber-primary hover:scale-105 transform transition-transform duration-300 shadow-lg hover:shadow-orange-primary/50">
              Request This Service
            </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
