import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { navLinks } from '../constants';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-navy/80 shadow-lg backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center space-x-2">
              <span className="text-2xl font-montserrat font-extrabold bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">
                ALS
              </span>
              <span className="hidden sm:block font-poppins font-semibold text-lg text-slate-800 dark:text-white">Amber Landon</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="font-poppins text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-orange-primary dark:hover:text-amber-primary transition-colors relative group">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-primary to-amber-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
            
            <button onClick={toggleTheme} aria-label="Toggle dark mode" className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              {theme === 'light' ? (
                // FIX: Changed 'class' to 'className' to align with React standards for JSX attributes.
                <ion-icon name="moon" className="text-xl"></ion-icon>
              ) : (
                // FIX: Changed 'class' to 'className' to align with React standards for JSX attributes.
                <ion-icon name="sunny" className="text-xl"></ion-icon>
              )}
            </button>

            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-slate-600 dark:text-slate-300"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                {/* FIX: Changed 'class' to 'className' to align with React standards for JSX attributes. */}
                <ion-icon name={isOpen ? 'close' : 'menu'} className="text-3xl"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-navy/95 backdrop-blur-lg transition-all duration-500 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link, i) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} 
              className="block px-3 py-3 rounded-md text-base font-poppins font-medium text-slate-700 dark:text-slate-200 hover:bg-orange-primary/10 dark:hover:bg-amber-primary/10 transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;