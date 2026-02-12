
import React from 'react';

const ChatWidget: React.FC = () => {
  return (
    <a
      href="https://wa.me/233543503649"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[60] w-16 h-16 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-2xl flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-110"
    >
      <ion-icon name="logo-whatsapp" className="text-3xl"></ion-icon>
    </a>
  );
};

export default ChatWidget;
