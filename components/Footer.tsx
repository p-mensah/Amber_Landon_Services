
import React from 'react';
import { navLinks } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-200 dark:bg-navy/60 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* About Section */}
          <div className="lg:col-span-4">
             <a href="#home" className="flex items-center space-x-2">
              <span className="text-3xl font-montserrat font-extrabold bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">
                ALS
              </span>
              <span className="font-poppins font-semibold text-xl text-slate-800 dark:text-white">Amber Landon</span>
            </a>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              Your partner in global logistics, branding, and procurement. We streamline your supply chain for success.
            </p>
             <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-slate-600 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-facebook"></ion-icon></a>
              <a href="#" aria-label="Twitter" className="text-slate-600 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-twitter"></ion-icon></a>
              <a href="#" aria-label="LinkedIn" className="text-slate-600 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-linkedin"></ion-icon></a>
              <a href="#" aria-label="Instagram" className="text-slate-600 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-instagram"></ion-icon></a>
            </div>
          </div>

          {/* Links & Services */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-poppins font-semibold text-slate-800 dark:text-white tracking-wider">Navigation</h3>
                <ul className="mt-4 space-y-3">
                  {navLinks.map(link => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
               <div>
                <h3 className="font-poppins font-semibold text-slate-800 dark:text-white tracking-wider">Services</h3>
                <ul className="mt-4 space-y-3">
                  <li><a href="#services" className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors">Branding & Design</a></li>
                  <li><a href="#services" className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors">Procurement</a></li>
                  <li><a href="#services" className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors">Shipping</a></li>
                  <li><a href="#services" className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors">Factory Visits</a></li>
                </ul>
              </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="lg:col-span-4">
             <h3 className="font-poppins font-semibold text-slate-800 dark:text-white tracking-wider">Stay Updated</h3>
             <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Subscribe to our newsletter for the latest updates and offers.</p>
             <form className="mt-4 flex flex-col sm:flex-row gap-2">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input type="email" id="footer-email" placeholder="Enter your email" className="flex-grow px-4 py-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-primary focus:outline-none transition" />
                <button type="submit" className="px-5 py-3 text-sm font-semibold rounded-md text-white bg-gradient-to-r from-orange-primary to-amber-primary hover:scale-105 transform transition-transform duration-300 shadow-md">Subscribe</button>
             </form>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-300 dark:border-slate-700 pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Amber Landon Services. All Rights Reserved. | <a href="#" className="hover:text-orange-primary">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
