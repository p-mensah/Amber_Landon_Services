
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      // Delay showing the banner slightly to not intrude immediately
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem('cookie_consent', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 inset-x-0 p-4 z-[60] transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-lg bg-white/80 dark:bg-navy/80 backdrop-blur-lg shadow-2xl flex items-center justify-between flex-wrap gap-4 border border-slate-200 dark:border-slate-700/50">
              <p className="text-slate-700 dark:text-slate-300 text-sm flex-1 min-w-[200px]">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
              <button
                  onClick={handleAccept}
                  className="px-6 py-2 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-orange-primary to-amber-primary hover:scale-105 transform transition-transform duration-300"
              >
                  Accept
              </button>
          </div>
      </div>
    </div>
  );
};

export default CookieBanner;
