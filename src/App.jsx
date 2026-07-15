import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import FAQItem from './components/FAQItem';
import Chatbot from './components/Chatbot';

// --- TOGGLE THIS TO FALSE IF YOU EVER WANT TO USE A REAL GOOGLE API KEY ---
const USE_MOCK_API = true; 

const SERVICES_DATA = [
  {
    title: "Cloud Migration",
    description: "Seamlessly transition your infrastructure to AWS, Azure, or Google Cloud with zero downtime."
  },
  {
    title: "Custom Software Dev",
    description: "Tailor-made web and mobile solutions built with modern stacks to scale your enterprise."
  },
  {
    title: "Cybersecurity Audit",
    description: "End-to-end vulnerability scanning, threat mitigation, and compliance enforcement."
  }
];

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [faqContent, setFaqContent] = useState([]);
  const [isFaqLoading, setIsFaqLoading] = useState(false);

  // --- TASK 14: FAQ Generation with Quick Mock Fallback ---
  const generateFAQ = async () => {
    setIsFaqLoading(true);

    if (USE_MOCK_API) {
      // Simulate network delay of 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockAIFaqs = [
        {
          question: "How do you ensure data security during Cloud Migration?",
          answer: "We utilize end-to-end AES-256 encryption, secure VPN tunnels, and follow strict AWS/Azure landing zone blueprints to ensure zero leaks."
        },
        {
          question: "Do you offer post-deployment maintenance?",
          answer: "Yes, we provide 24/7 dedicated SLA-backed support, continuous monitoring, and rolling patch updates for all customized software builds."
        },
        {
          question: "What is your pricing model for IT audits?",
          answer: "We offer fixed-scope pricing for standard audits and flexible retainer packages for continuous virtual CISO services."
        }
      ];
      setFaqContent(mockAIFaqs);
      setIsFaqLoading(false);
      return;
    }

    // Real API Call code block (ignored if USE_MOCK_API is true)
    const GEMINI_API_KEY = "AIzaSyYourKeyHere"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Generate 3 relevant IT FAQs as a raw JSON array of objects with "question" and "answer" keys.` }] }]
        })
      });
      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text;
      setFaqContent(JSON.parse(rawText.trim()));
    } catch (error) {
      console.error("API error, fallback activated");
    } finally {
      setIsFaqLoading(false);
    }
  };

  // --- TASK 11: Chatbot response with Quick Simulator ---
  const handleSendMessageToGemini = async (userPrompt) => {
    if (USE_MOCK_API) {
      // Simulate quick thinking delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const promptLower = userPrompt.toLowerCase();
      if (promptLower.includes("price") || promptLower.includes("cost")) {
        return "Our pricing depends on the scope of work. We offer free consultations to estimate project roadmaps and hourly or fixed-fee models!";
      }
      if (promptLower.includes("cloud") || promptLower.includes("migrate")) {
        return "We provide AWS, Azure, and Google Cloud migration. We ensure 99.9% uptime and handle secure database migration seamlessly.";
      }
      if (promptLower.includes("hello") || promptLower.includes("hi")) {
        return "Hello! How can I assist you with your software development or cybersecurity needs today?";
      }
      return `Thank you for asking about "${userPrompt}". We specialize in custom software dev, security audits, and cloud setups. How can our system architects help you with this project?`;
    }

    // Real API call block (ignored if USE_MOCK_API is true)
    const GEMINI_API_KEY = "AIzaSyYourKeyHere"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are an expert support assistant for Apex IT. Keep answers under 3 sentences. User: ${userPrompt}` }] }]
        })
      });
      const data = await response.json();
      return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
      return "I'm having trouble connecting to my brain right now. Please email support@apexit.com!";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-16">
        
        {/* HERO SECTION */}
        <section id="hero" className="bg-slate-900 text-white py-20 md:py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white">
              We Build Next-Gen <span className="text-indigo-400">IT Infrastructure</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Empowering global enterprises with elite custom software engineering, strategic cloud migrations, and compliance-driven cybersecurity.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-lg transition transform hover:-translate-y-0.5"
            >
              Get Started
            </a>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Our Services</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">Enterprise-grade technical architecture tailored to modern scaling requirements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="py-20 px-6 bg-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">About Us</h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Founded by veteran system architects, Apex IT is a premier systems integrator and custom development partner. 
              We bridge complex core databases with clean web layers to keep businesses agile, protected, and incredibly fast.
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 mt-2 mb-6">Need instant tech answers? Build customized, relevant tech questions right now.</p>
            
            <button 
              onClick={generateFAQ}
              disabled={isFaqLoading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-400 text-white font-semibold px-6 py-2.5 rounded-lg transition"
            >
              {isFaqLoading ? "Compiling tech questions..." : "Load FAQs with AI"}
            </button>
          </div>

          <div className="space-y-4">
            {isFaqLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 text-sm animate-pulse">Consulting AI model database...</p>
              </div>
            ) : faqContent.length > 0 ? (
              faqContent.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} />
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-300 rounded-xl bg-white shadow-sm">
                <p className="text-slate-500 text-sm">No FAQs loaded yet. Click the loader button above to query AI.</p>
              </div>
            )}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Let's Discuss Your Project</h2>
            <p className="text-slate-400 mb-8 text-sm sm:text-base">Speak directly with a Solutions Engineer. Responses delivered within one business day.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Business Email" 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-indigo-500 text-sm transition placeholder-slate-400" 
                required 
              />
              <textarea 
                placeholder="What architectural challenge are you looking to solve?" 
                rows="4" 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-indigo-500 text-sm transition placeholder-slate-400" 
                required
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-semibold transition text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Floating Chat Trigger Button */}
      <button 
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl z-50 transition-all hover:scale-110 active:scale-95 text-xl flex items-center justify-center w-14 h-14"
        aria-label="Toggle Support Chatbot"
      >
        {isChatbotOpen ? '✕' : '💬'}
      </button>

      {isChatbotOpen && (
        <Chatbot 
          onClose={() => setIsChatbotOpen(false)} 
          onSendMessage={handleSendMessageToGemini}
        />
      )}

      <Footer />
    </div>
  );
}