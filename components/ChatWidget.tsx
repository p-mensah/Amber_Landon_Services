import React, { useState } from 'react';
import ChatFAQ from './FAQ';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[60] w-16 h-16 rounded-full bg-gradient-to-r from-orange-primary to-amber-primary text-white shadow-2xl flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-110 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
      >
        {/* FIX: Changed 'class' to 'className' to align with React standards for JSX attributes. */}
        <ion-icon name={isOpen ? 'close-outline' : 'chatbubble-ellipses-outline'} className="text-3xl"></ion-icon>
      </button>
      <ChatFAQ isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatWidget;