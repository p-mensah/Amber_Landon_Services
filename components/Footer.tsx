
import React from 'react';
import { navLinks } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900/70 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center space-x-2">
              <span className="text-3xl font-montserrat font-extrabold bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">
                ALS
              </span>
              <span className="font-poppins font-semibold text-xl text-slate-800 dark:text-white">Amber Landon</span>
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your partner in global logistics, branding, and procurement. We streamline your supply chain for success.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-slate-500 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-facebook"></ion-icon></a>
              <a href="#" aria-label="Twitter" className="text-slate-500 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-twitter"></ion-icon></a>
              <a href="#" aria-label="LinkedIn" className="text-slate-500 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-linkedin"></ion-icon></a>
              <a href="#" aria-label="Instagram" className="text-slate-500 dark:text-slate-400 hover:text-orange-primary transition-colors text-2xl transform hover:-translate-y-1"><ion-icon name="logo-instagram"></ion-icon></a>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-poppins font-semibold text-slate-800 dark:text-white tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors relative group">
                    <span>{link.name}</span>
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-primary transition-all duration-300 group-hover:w-1/2"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="font-poppins font-semibold text-slate-800 dark:text-white tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start">
                <ion-icon name="location-outline" className="text-lg text-orange-primary dark:text-amber-primary mt-1 mr-3 flex-shrink-0"></ion-icon>
                <span className="text-slate-600 dark:text-slate-400">241 North-Gbawe, Residential Area, Accra, Ghana</span>
              </li>
              <li className="flex items-start">
                <ion-icon name="call-outline" className="text-lg text-orange-primary dark:text-amber-primary mt-1 mr-3 flex-shrink-0"></ion-icon>
                <a href="tel:+233543503649" className="text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors">+233 543 503 649</a>
              </li>
              <li className="flex items-start">
                <ion-icon name="mail-outline" className="text-lg text-orange-primary dark:text-amber-primary mt-1 mr-3 flex-shrink-0"></ion-icon>
                <a href="mailto:contact@amberlandon.com" className="text-slate-600 dark:text-slate-400 hover:text-orange-primary dark:hover:text-amber-primary transition-colors">contact@amberlandon.com</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Section */}
          <div>
            <h3 className="font-poppins font-semibold text-slate-800 dark:text-white tracking-wider uppercase">Stay Updated</h3>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Subscribe to our newsletter for the latest industry insights and offers.</p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input type="email" id="footer-email" placeholder="Enter your email" className="flex-grow px-4 py-3 text-sm rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-orange-primary focus:outline-none transition" />
                <button type="submit" className="px-5 py-3 text-sm font-semibold rounded-md text-white bg-gradient-to-r from-orange-primary to-amber-primary hover:scale-105 transform transition-transform duration-300 shadow-md">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-300 dark:border-slate-700 pt-8 text-center text-sm text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Amber Landon Services. All Rights Reserved.</p>
          <div className="space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-orange-primary transition-colors">Privacy Policy</a>
            <span className="text-slate-400">|</span>
            <a href="#" className="hover:text-orange-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
