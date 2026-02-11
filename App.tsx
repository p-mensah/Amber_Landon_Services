
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import HelpAndSupport from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import AnimatedElement from './components/AnimatedElement';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="relative isolate min-h-screen">
       <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-navy bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute -z-10 top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-purple-accent/10 via-deep-blue/10 to-transparent dark:from-purple-accent/20 dark:via-deep-blue/20"></div>

      <Header />
      <main>
        <Hero />
        <AnimatedElement>
          <Services />
        </AnimatedElement>
        <AnimatedElement>
          <About />
        </AnimatedElement>
        <AnimatedElement>
          <Process />
        </AnimatedElement>
        <AnimatedElement>
          <Testimonials />
        </AnimatedElement>
        <AnimatedElement>
          <HelpAndSupport />
        </AnimatedElement>
      </main>
      <Footer />
      <CookieBanner />
      <ChatWidget />
    </div>
  );
};

export default App;
