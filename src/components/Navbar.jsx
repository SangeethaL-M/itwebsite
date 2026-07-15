import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // --- TASK 18: Custom JavaScript Smooth Scroll ---
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile drawer if open
    
    const element = document.getElementById(targetId);
    if (element) {
      // Calculates offset to account for our fixed navbar height (16px / 4rem)
      const offset = 64; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className="bg-slate-950 text-white fixed top-0 left-0 right-0 z-50 border-b border-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a 
          href="#hero" 
          onClick={(e) => handleScroll(e, 'hero')}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-400 hover:opacity-90 transition"
        >
          <span>ApexIT</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => handleScroll(e, link.id)}
              className="hover:text-white transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-slate-300 hover:text-white focus:outline-none text-2xl"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 px-6 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => handleScroll(e, link.id)}
              className="text-slate-300 hover:text-white font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}