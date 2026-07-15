import React, { useState } from 'react';

export default function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition"
      >
        <span>{faq.question}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-1 text-slate-600 border-t border-slate-100 text-sm leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}