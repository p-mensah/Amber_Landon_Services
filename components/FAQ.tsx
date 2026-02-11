import React, { useState, useEffect, useRef } from 'react';
import { faqs } from '../constants';

interface ChatMessage {
  id: number;
  type: 'assistant' | 'user' | 'options';
  content: string | typeof faqs;
}

interface ChatFAQProps {
  isOpen: boolean;
  onClose: () => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1 p-3">
        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
    </div>
);

const ChatFAQ: React.FC<ChatFAQProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat when it opens
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          { id: 1, type: 'assistant', content: "Hello! I'm the ALS Assistant. How can I help you today?" },
          { id: 2, type: 'options', content: faqs },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    // Scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestionSelect = (faqItem: typeof faqs[0]) => {
    // Remove options and add user's question
    setMessages(prev => [
      ...prev.filter(m => m.type !== 'options'),
      { id: Date.now(), type: 'user', content: faqItem.question }
    ]);

    setIsTyping(true);
    // Simulate assistant's response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, type: 'assistant', content: faqItem.answer },
        { id: Date.now() + 2, type: 'assistant', content: "Is there anything else I can help with?" },
        { id: Date.now() + 3, type: 'options', content: faqs },
      ]);
    }, 1500);
  };
  
  return (
    <div className={`fixed bottom-24 right-4 sm:right-6 md:right-8 w-[calc(100vw-2rem)] max-w-sm h-[65vh] max-h-[600px] rounded-2xl shadow-2xl bg-white/60 dark:bg-navy/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 flex flex-col transition-all duration-500 ease-in-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700/50">
          <div>
            <h3 className="font-poppins font-semibold text-lg text-slate-800 dark:text-white">ALS Assistant</h3>
            <p className="text-sm text-emerald-accent flex items-center"><span className="w-2 h-2 bg-emerald-accent rounded-full mr-2"></span>Online</p>
          </div>
          <button onClick={onClose} aria-label="Close chat" className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              {/* FIX: Changed 'class' to 'className' to align with React standards for JSX attributes. */}
              <ion-icon name="close" className="text-2xl"></ion-icon>
          </button>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div key={msg.id}>
            {msg.type === 'assistant' && (
              <div className="flex justify-start animate-[fade-in-up_0.5s_ease-out]">
                <div className="max-w-[80%] p-3 rounded-lg rounded-bl-none bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  {msg.content as string}
                </div>
              </div>
            )}
            {msg.type === 'user' && (
              <div className="flex justify-end animate-[fade-in-up_0.5s_ease-out]">
                <div className="max-w-[80%] p-3 rounded-lg rounded-br-none bg-gradient-to-r from-orange-primary to-amber-primary text-white">
                  {msg.content as string}
                </div>
              </div>
            )}
            {msg.type === 'options' && (
               <div className="space-y-2 animate-[fade-in-up_0.5s_ease-out]">
                {(msg.content as typeof faqs).map((faq, index) => (
                    <button key={index} onClick={() => handleQuestionSelect(faq)} className="w-full text-left p-3 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-sm text-slate-700 dark:text-slate-300">
                        {faq.question}
                    </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
             <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg rounded-bl-none bg-slate-200 dark:bg-slate-700">
                  <TypingIndicator />
                </div>
              </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatFAQ;