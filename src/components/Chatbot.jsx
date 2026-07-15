import React, { useState, useRef, useEffect } from 'react';

// --- TASK 8: Chatbot Component ---
export default function Chatbot({ onClose, onSendMessage }) {
  // --- TASK 9: Message History State ---
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! Welcome to Apex IT Solutions. How can I help you with our cloud or software services today?" }
  ]);
  
  // Input state for Task 10
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scrolls the chat window to the newest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // --- TASK 10: Handle Send Click / Enter Press ---
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue(''); // Clear input box

    // --- TASK 12: Add User Message to UI ---
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    // --- TASK 11: Execute the parent's API call function ---
    const botReply = await onSendMessage(userText);

    // --- TASK 12: Add Bot Response to UI ---
    setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[90vw] h-[450px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50">
      
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-sm">Apex Assistant</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition text-lg">✕</button>
      </div>

      {/* Message History Container (Task 12) */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-400 rounded-xl rounded-tl-none px-3 py-2 text-xs flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
              <span className="animate-bounce [animation-delay:0.4s]">.</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form (Task 10) */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 flex gap-2 bg-white">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about our IT services..." 
          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}