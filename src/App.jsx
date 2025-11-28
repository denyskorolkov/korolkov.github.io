import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Terminal, 
  Cpu, 
  Cloud, 
  Layers, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Sun, 
  Briefcase, 
  ExternalLink, 
  Menu, 
  X, 
  Send,
  Database,
  Workflow,
  Bot,
  Sparkles,
  Loader2,
  Lightbulb,
  Calendar,
  Clock,
  Instagram,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';

// --- Gemini API Integration ---
const apiKey = ""; // API Key injected at runtime
const useCaseEndpoint = "https://script.google.com/macros/s/AKfycbwcpRzIg9Oj-N5ygXzFLotj3m2ZToaeMM_o8_3uP52oGgAJCxT9TWCS1KuyksZFfHWB/exec";

const callGemini = async (prompt) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System overloaded. Please try again later.";
  }
};

// --- Custom Hook for Parallax ---
const useParallax = (sensitivity = 0.1) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * sensitivity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sensitivity]);

  return offset;
};

// --- Custom Hook for Mouse Parallax (Hero) ---
const useMouseParallax = (sensitivity = 0.02) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: (e.clientX - window.innerWidth / 2) * sensitivity,
        y: (e.clientY - window.innerHeight / 2) * sensitivity,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);

  return position;
};

// --- Components ---

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => setIsOpen(false);
      window.addEventListener('scroll', handleScroll, { once: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        // Don't close if clicking on the nav element or its children
        if (navRef.current && !navRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      // Use a small delay to avoid immediate closure when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Blog', href: '#blog' },
    { name: 'Florida 🌴', href: '#florida', isSpecial: true },
  ];

  return (
    <nav ref={navRef} className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#" className="text-xl sm:text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
          <span>DENYS<span className="text-slate-500">.DEV</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors uppercase tracking-widest ${
                link.isSpecial 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500 font-bold hover:opacity-80' 
                : 'text-slate-300 hover:text-orange-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Button - Larger touch target */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }} 
          className="md:hidden text-white p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center z-10 relative"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav - Improved with backdrop and animation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/98 backdrop-blur-lg border-b border-slate-800 animate-in slide-in-from-top-2 duration-300">
          <div className="p-4 sm:p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-base sm:text-lg font-medium text-slate-300 hover:text-orange-400 py-3 px-2 transition-colors min-h-[44px] flex items-center"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="mt-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-bold transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const mousePos = useMouseParallax(0.05);
  const scrollY = useParallax(0.5);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Gradient Blob */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" 
          style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-orange-500/10 rounded-full blur-[100px]"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Retro Wave Sun & Palm - SVG Illustration */}
      <div 
        className="absolute bottom-0 md:bottom-20 right-0 md:right-20 opacity-20 sm:opacity-30 md:opacity-60 pointer-events-none select-none"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <svg width="600" height="600" viewBox="0 0 200 200" className="w-full max-w-[60vw] sm:max-w-[80vw] md:max-w-lg">
          <defs>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF7F50" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="120" r="60" fill="url(#sunGradient)" />
          <rect x="40" y="130" width="120" height="5" fill="#020617" />
          <rect x="40" y="140" width="120" height="8" fill="#020617" />
          <rect x="40" y="152" width="120" height="12" fill="#020617" />
          <path d="M140 180 Q 150 120 180 100" stroke="#1e293b" strokeWidth="8" fill="none" />
          <path d="M140 180 Q 130 130 110 110" stroke="#1e293b" strokeWidth="6" fill="none" />
          {/* Palm Leaves */}
          <path d="M180 100 Q 190 110 195 130" stroke="#1e293b" strokeWidth="4" fill="none" />
          <path d="M180 100 Q 160 90 140 100" stroke="#1e293b" strokeWidth="4" fill="none" />
          <path d="M180 100 Q 190 80 200 90" stroke="#1e293b" strokeWidth="4" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-2/3 space-y-4 sm:space-y-6 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for Consulting
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
                Intelligence.
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Avatar - Using User's Placeholder */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-orange-400 p-1 shadow-[0_0_20px_rgba(251,146,60,0.3)] overflow-hidden bg-slate-800 flex-shrink-0">
                <img 
                  src="https://share.cleanshot.com/7vhzJrxf+" /* User's uploaded photo path */
                  onError={(e) => {e.target.onerror = null; e.target.src="https://ui-avatars.com/api/?name=Denys+Korolkov&background=0D8ABC&color=fff&size=128"}}
                  alt="Denys Korolkov" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                I'm <strong className="text-white">Denys Korolkov</strong>. Fullstack Engineer, DevOps Specialist, and Founder of Prema Vision LLC.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
              <a href="#work" className="group bg-white text-slate-900 px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 min-h-[44px] text-sm sm:text-base">
                View Case Studies
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="px-6 sm:px-8 py-3 rounded-full border border-slate-700 text-white font-medium hover:bg-slate-800 transition-all text-center min-h-[44px] flex items-center justify-center text-sm sm:text-base">
                Contact Me
              </a>
            </div>

            {/* Tech Stack Marquee */}
            <div className="pt-8 sm:pt-12 opacity-60">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 sm:mb-4">Powering Systems With</p>
              <div className="flex flex-wrap gap-3 sm:gap-6 text-sm sm:text-base text-slate-400">
                 <span className="hover:text-orange-400 transition-colors">Python</span>
                 <span className="hidden sm:inline">•</span>
                 <span className="hover:text-blue-400 transition-colors">TypeScript</span>
                 <span className="hidden sm:inline">•</span>
                 <span className="hover:text-green-400 transition-colors">LangChain</span>
                 <span className="hidden sm:inline">•</span>
                 <span className="hover:text-purple-400 transition-colors">Kubernetes</span>
                 <span className="hidden sm:inline">•</span>
                 <span className="hover:text-cyan-400 transition-colors">AWS</span>
                 <span className="hidden sm:inline">•</span>
                 <span className="hover:text-pink-400 transition-colors">n8n</span>
              </div>
            </div>
          </div>

          {/* Right Side - Terminal/Code Graphic */}
          <div className="md:w-1/3 hidden md:block">
            <div className="bg-slate-900 rounded-lg border border-slate-700 shadow-2xl p-4 font-mono text-sm transform rotate-2 hover:rotate-0 transition-transform duration-500 opacity-90">
              <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-slate-300 space-y-2">
                <p className="text-green-400">➜  ~ whoami</p>
                <div className="flex items-center gap-2">
                  <div className="hidden w-6 h-6 rounded-full overflow-hidden bg-slate-700">
                      <img src="IMG_9573 Medium.png" onError={(e) => {e.target.src="https://ui-avatars.com/api/?name=DK&background=random&size=32"}} className="w-full h-full object-cover" />
                  </div>
                  <span>Denys Korolkov</span>
                </div>
                <p className="text-green-400">➜  ~ current_status</p>
                <p>Building AI Agents @ Prema Vision</p>
                <p className="text-green-400">➜  ~ location</p>
                <p>Palm Coast, FL 🌴</p>
                <p className="text-green-400">➜  ~ skills --verbose</p>
                <div className="pl-4 text-orange-300">
                  [ "Backend Architecture",<br/>
                   "DevOps Automation",<br/>
                   "LLM Integration",<br/>
                   "Next.js / React" ]
                </div>
                <span className="inline-block w-2 h-4 bg-slate-500 animate-pulse align-middle"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- About Section with Flip Cards ---
const About = () => {
  const experiences = [
    {
      company: "Prema Vision LLC",
      role: "Founder & Lead Engineer",
      period: "Present",
      desc: "Driving AI automation and IT consulting. Building custom agents and cloud architecture for clients.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
      filterColor: "bg-indigo-900/80"
    },
    {
      company: "BigPanda",
      role: "Integration Engineer",
      period: "Previous",
      desc: "Built Biggy AI UI integrations, aided K8s/Argo CD releases, and automated documentation workflows.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      filterColor: "bg-slate-900/80"
    },
    {
      company: "Autodesk",
      role: "Software Engineer",
      period: "Previous",
      desc: "Optimized Checkout Flow and Account Billing Portal. Worked on microfrontends and high-scale AWS performance.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
      filterColor: "bg-blue-950/80"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-slate-950 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div>
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
              <Cpu className="text-indigo-500 w-6 h-6 sm:w-7 sm:h-7" /> The Engine Room
            </h2>
            <div className="prose prose-invert text-slate-400 text-base sm:text-lg leading-relaxed">
              <p>
                I don't just write code; I build systems that scale. With a background deeply rooted in 
                <span className="text-orange-400 font-semibold"> backend engineering</span> and 
                <span className="text-purple-400 font-semibold"> DevOps</span>, 
                I've transitioned into the frontier of <span className="text-blue-400 font-semibold">Artificial Intelligence</span>.
              </p>
              <p className="mt-4">
                My approach is simple: Automate the boring stuff, architect for resilience, and keep the user experience buttery smooth. 
                Whether it's optimizing a billing portal for Autodesk or deploying AI agents for Prema Vision, the goal is always efficiency.
              </p>
              <p className="mt-4 italic border-l-4 border-indigo-500 pl-4 text-slate-500">
                "Future-oriented architecture with a sharp focus on business value."
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
             {experiences.map((exp, idx) => (
               <div key={idx} className="group relative overflow-hidden p-4 sm:p-6 rounded-xl border border-slate-800 transition-all duration-500 hover:border-orange-500/50 hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.2)] hover:-translate-y-1 cursor-default">
                 
                 {/* Background Image with Filter */}
                 <div className="absolute inset-0 z-0">
                   <img src={exp.image} alt="" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
                   <div className={`absolute inset-0 ${exp.filterColor} backdrop-blur-[2px] transition-opacity`} />
                 </div>

                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{exp.company}</h3>
                     <span className="text-xs font-mono text-slate-300 bg-white/10 backdrop-blur-md px-2 py-1 rounded border border-white/10">{exp.period}</span>
                   </div>
                   <p className="text-sm font-medium text-indigo-300 mb-2">{exp.role}</p>
                   <p className="text-slate-300 text-sm">{exp.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- AI Strategy Generator Component ---
const AIStrategyGenerator = () => {
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [useCases, setUseCases] = useState([]);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!industry.trim()) {
      setError("Drop in one industry name.");
      return;
    }
    setLoading(true);
    setError("");
    setUseCases([]);

    try {
      const response = await fetch(
        `${useCaseEndpoint}?industry=${encodeURIComponent(industry.trim())}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const data = await response.json();
      const payload =
        Array.isArray(data?.useCases) ? data.useCases :
        Array.isArray(data?.ideas) ? data.ideas :
        Array.isArray(data?.data) ? data.data :
        Array.isArray(data) ? data : [];

      if (!payload.length) {
        throw new Error("No ideas returned");
      }

      setUseCases(payload);
    } catch (err) {
      console.error("Strategy generator error:", err);
      setError("Couldn’t generate ideas right now. Try again in a bit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 bg-slate-900/80 border border-slate-700 rounded-2xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto backdrop-blur-sm shadow-2xl relative overflow-hidden">
      {/* Aesthetic gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-orange-400 w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-bold text-white">AI Strategy Generator</h3>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm">
            Curious how AI applies to you? Enter your industry, and I'll generate 3 use cases instantly.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <input 
          type="text" 
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="e.g. Real Estate, Logistics..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm sm:text-base focus:border-indigo-500 outline-none transition-all min-h-[44px]"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !industry}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold px-4 sm:px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap min-h-[44px] text-sm sm:text-base"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          Generate Ideas
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-400 mb-4">{error}</p>
      )}

      {useCases.length > 0 && (
        <div className="bg-slate-950/50 rounded-lg p-6 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-4">
            {useCases.map((idea, idx) => (
              <div key={`${idea?.title || idea?.id || idx}-${idx}`} className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2 text-xs uppercase tracking-widest text-slate-500">
                  <span>Use Case #{idx + 1}</span>
                  {idea?.impactScore && (
                    <span className="text-orange-400 font-semibold">Impact {idea.impactScore}/10</span>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {idea?.title || idea?.heading || `Idea ${idx + 1}`}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {idea?.description || idea?.summary || idea?.idea || "No description provided."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Bot size={32} />,
      title: "AI & LLM Agents",
      desc: "Custom LangChain integration, RAG pipelines, and autonomous agents.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Database size={32} />,
      title: "Backend Systems",
      desc: "Robust Python/Node.js architectures for high concurrency.",
      image: "https://images.unsplash.com/photo-1558494949-ef526b004297?auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Cloud size={32} />,
      title: "Cloud & DevOps",
      desc: "Kubernetes, AWS, and CI/CD pipelines. Works everywhere.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80"
    },
    {
      icon: <Workflow size={32} />,
      title: "Automation (n8n)",
      desc: "Connecting disparate tools into seamless workflows.",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Technical Expertise</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-4">Deploying cutting-edge solutions for modern business problems.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {services.map((s, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl border border-slate-800 transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)] hover:-translate-y-2 group cursor-default h-56 sm:h-64 flex flex-col justify-end p-6 sm:p-8">
              {/* Background Image Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={i === 1 ? "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500&q=80" : s.image} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-900/70 transition-colors" />
              </div>
              
              <div className="relative z-10">
                <div className="mb-4 text-indigo-500 group-hover:text-orange-400 transition-colors transform duration-300 origin-left">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Insert AI Feature */}
        <AIStrategyGenerator />

      </div>
    </section>
  );
};

// --- Project Modal Component ---
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-slate-900 w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-slate-800 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className={`h-24 sm:h-32 w-full bg-gradient-to-r ${project.color} relative overflow-hidden`}>
           <div className="absolute inset-0 bg-black/20" />
           <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 flex gap-2 flex-wrap">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded-md bg-black/40 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  {tag}
                </span>
              ))}
           </div>
        </div>

        <div className="p-4 sm:p-6 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">{project.title}</h2>
          
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">The Challenge</h3>
              <p>{project.details?.challenge || "Details coming soon."}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">The Solution</h3>
              <p>{project.details?.solution || "Details coming soon."}</p>
            </div>
            <div>
               <h3 className="text-lg font-bold text-white mb-2">Impact</h3>
               <p>{project.details?.impact || "Details coming soon."}</p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-800 flex justify-end">
            <button onClick={onClose} className="px-6 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors text-sm font-bold min-h-[44px]">
              Close Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const allProjects = [
  {
    title: "Checkout & Billing Portal Modernization",
    tags: ["React", "AWS", "Microfrontends"],
    desc: "Led modernization of a legacy checkout and billing portal for a large SaaS platform, focusing on performance, reliability, and smoother plan changes.",
    color: "from-orange-400 to-pink-600",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    efficiency: "40%", // LCP / conversion & reliability uplift
    details: {
      challenge:
        "The existing monolithic billing portal powered sign-up, upgrades, and invoices. Under traffic spikes it slowed down, and any change to pricing or plans felt risky. Product teams struggled to experiment without touching a fragile core flow.",
      solution:
        "Split the flow into React microfrontends with a clear contract to Node.js services on AWS. Introduced Vite/Storybook for UI consistency, improved observability with AWS X-Ray and structured logging, and gradually refactored critical screens (checkout, invoices, account changes) behind feature flags.",
      impact:
        "Improved core page LCP to under ~1s on key flows, stabilized SLA at 99.9–100% for billing endpoints, and unlocked safer experiments around pricing and plan changes without full-portal redeploys."
    }
  },
  {
    title: "BigPanda Integrations Platform",
    tags: ["Node.js", "Kubernetes", "MongoDB"],
    desc: "Owned key integrations and backend services for a monitoring/incident management platform running at enterprise scale.",
    color: "from-blue-500 to-indigo-500",
    image:
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    efficiency: "65%", // onboarding & ops gains
    details: {
      challenge:
        "Customers needed stable, high-throughput integrations with monitoring tools, ticketing systems, and notification channels. Existing flows were hard to extend, and every new integration added operational overhead.",
      solution:
        "Designed and maintained Node.js/Kubernetes services for inbound and outbound integrations, standardized payload mapping and retry semantics, and added better metrics around throughput and failure modes. Automated test coverage and CI/CD pipelines using GitHub Actions, Jenkins, and Argo CD for predictable rollouts.",
      impact:
        "Reduced time to onboard new integrations by ~65%, cut incident noise from flaky connectors, and gave customer-facing teams a more reliable platform to plug into new tools without bespoke one-off work each time."
    }
  },
  {
    title: "Biggy AI Incident Copilot",
    tags: ["React", "Node.js", "BigPanda UI"],
    desc: "Implemented the UI and end-to-end user experience for an AI-powered incident analysis assistant used by SRE and on-call engineers.",
    color: "from-purple-500 to-indigo-600",
    image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    efficiency: "50%",
    details: {
        challenge:
        "SREs had to juggle multiple dashboards, alert feeds, and historical incidents. Critical context was scattered, slowing triage and increasing cognitive load.",
        solution:
        "Designed and implemented the Biggy AI UI layer: integrated incident data streams, added contextual insights panels, improved search UX, and created a conversational interface for interacting with the AI backend. Collaborated closely with backend/AI teams to shape request/response flows, guardrails, and result presentation.",
        impact:
        "Engineers using the Biggy interface reached actionable insights up to 50% faster in supported services. Reduced repeated questions to senior SREs during high-severity incidents by surfacing relevant historical context directly in the UI."
    }
  }
    ,
  {
    title: "Prema Vision AI Automations",
    tags: ["Next.js", "OpenAI", "AWS"],
    desc: "Designed a suite of reusable patterns for AI-driven automations: CRM overlays, contract analysis, and ops bots for consulting clients.",
    color: "from-red-500 to-orange-600",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    efficiency: "80%", // time saved on repetitive workflows
    details: {
      challenge:
        "SMB and mid-market clients had repetitive, high-touch workflows (sales outreach, contract review, operational triage) but lacked in-house teams to design robust AI automations safely.",
      solution:
        "Developed a set of opinionated building blocks using Next.js, OpenAI APIs, serverless backends on AWS, and vector search. Patterns include CRM overlay assistants, contract analyzers, anomaly-detection helpers, and integration templates that can be adapted per client.",
      impact:
        "For early consulting clients, reduced time spent on repeated manual tasks by ~80% in targeted workflows (contract review, lead research, ops triage), while keeping implementations maintainable and auditable."
    }
  }
];



  const visibleProjects = showAll ? allProjects : allProjects.slice(0, 3);

  return (
    <section id="work" className="py-12 sm:py-16 md:py-24 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-12 flex items-center gap-2">
          <Layers className="text-orange-500 w-6 h-6 sm:w-7 sm:h-7" /> Case Studies
        </h2>
        
        <div className="flex flex-col gap-6 sm:gap-8 mb-8 sm:mb-12">
          {visibleProjects.map((project, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row hover:border-slate-700 transition-all">
              
              {/* Left Content */}
              <div className="md:w-3/5 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                <div>
                   <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.color} mb-4`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                <button 
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center text-sm font-bold text-white hover:text-orange-400 transition-colors mt-auto py-2 min-h-[44px]"
                >
                  View Full Details <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* Right Image/Dashboard Area */}
              <div className="md:w-2/5 h-48 sm:h-64 md:h-auto relative overflow-hidden">
                 {/* Overlay Gradient */}
                 <div className={`absolute inset-0 bg-gradient-to-l from-transparent to-slate-900 z-10`} />
                 <div className="absolute inset-0 bg-slate-900/20 z-10 group-hover:bg-transparent transition-colors" />
                 
                 <img 
                   src={project.image} 
                   alt="Dashboard" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                 />
                 
                 {/* Floating Stat Card Overlay (Cosmetic) */}
                 <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-gradient-to-br ${project.color}`}>
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Efficiency</div>
                        <div className="text-sm font-bold text-white">+{project.efficiency}</div>
                      </div>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Expand/Collapse Button */}
        <div className="flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all border border-slate-700 min-h-[44px] text-sm sm:text-base"
          >
            {showAll ? (
              <>Show Less <ChevronUp size={18} /></>
            ) : (
              <>Load More Projects <ChevronDown size={18} /></>
            )}
          </button>
        </div>
      </div>

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
};

// --- Article Modal Component ---
const ArticleModal = ({ post, onClose }) => {
  if (!post) return null;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-slate-900 w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-slate-800 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
           <div className="absolute inset-0 bg-grid-slate-700/[0.2] bg-[size:20px_20px]" />
           <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-slate-900 to-transparent" />
           <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 flex gap-3">
              <span className="px-2 sm:px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                {post.cat}
              </span>
           </div>
        </div>

        <div className="p-4 sm:p-6 md:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h2>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {post.date}
            </div>
          </div>

          <div className="field-notes-html text-slate-300 leading-loose">
             {post.content ? (
                <div dangerouslySetInnerHTML={{__html: post.content}} />
             ) : (
               <div className="space-y-6">
                 <p className="text-xl text-slate-400 font-light italic mb-8">
                   "{post.excerpt}"
                 </p>
                 <p>
                   In the rapidly evolving landscape of software engineering, understanding the core principles of {post.cat} is crucial. 
                   We are seeing a paradigm shift in how we approach scalability and performance.
                 </p>
                 <h3 className="text-2xl font-bold text-white mt-8 mb-4">The Core Challenge</h3>
                 <p>
                   Most organizations struggle not with the technology itself, but with the integration of that technology into existing legacy workflows. 
                   When we talk about <strong>{post.title}</strong>, we are really talking about a fundamental change in operational philosophy.
                 </p>
                 <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 my-6 font-mono text-sm text-blue-300 overflow-x-auto">
                    <code>
                      # Example Configuration<br/>
                      apiVersion: apps/v1<br/>
                      kind: Deployment<br/>
                      metadata:<br/>
                      &nbsp;&nbsp;name: service-name<br/>
                      spec:<br/>
                      &nbsp;&nbsp;replicas: 3
                    </code>
                 </div>
                 <p>
                   By leveraging modern architectures, we can reduce latency by up to 40% while maintaining high availability. 
                   This isn't just theoretical; it's what I've observed deploying systems at scale.
                 </p>
                 <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conclusion</h3>
                 <p>
                   The future belongs to those who can effectively bridge the gap between traditional DevOps practices and the new wave of AI-driven development.
                 </p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Blog with Scroll Component ---
const Blog = () => {
  const [filter, setFilter] = useState('All');
  const [activePost, setActivePost] = useState(null);
  const [summary, setSummary] = useState({}); 
  const [loadingSummary, setLoadingSummary] = useState({}); 
  const scrollContainerRef = useRef(null);

  const categories = ['All', 'AI Agents', 'DevOps', 'Backend'];
  
  // Enhanced list of posts to demonstrate scrolling
  const posts = [
  {
    title: "AI Assistants in Production: Lessons from Real Implementations",
    cat: "AI Agents",
    date: "Nov 18, 2025",
    excerpt: "How AI assistants evolve from simple RAG demos into reliable, enterprise-ready automations.",
    readTime: "6 min read",
    content: `
      <p>Most AI assistant demos stop at RAG — a vector search, a response, job done.</p>

      <p>In production, this is nowhere near enough. Real-world AI assistants require:</p>
      <ul>
        <li>consistent output formatting,</li>
        <li>audit logs and traceability,</li>
        <li>stable request/response contracts,</li>
        <li>UI flows that reduce cognitive load,</li>
        <li>fallback logic when AI inevitably fails.</li>
      </ul>

      <p>The biggest lesson: <strong>AI is only as good as the surrounding architecture.</strong></p>

      <p>With LangGraph, tool schemas, and structured workflows, assistants evolve from “chat toys” into
      <strong>actual actors in business processes</strong> — from incident triage to CRM intelligence to contract analysis.</p>
    `
  },

  {
    title: "Scaling Node.js Services on Kubernetes the Right Way",
    cat: "DevOps",
    date: "Nov 05, 2025",
    excerpt: "Real-world strategies for handling high-throughput Node.js workloads on Kubernetes.",
    readTime: "7 min read",
    content: `
      <p>Node.js works beautifully — until concurrency spikes and your cluster begins melting down.</p>

      <p>Key lessons from real production workloads:</p>
      <ul>
        <li>Horizontal autoscaling beats vertical tuning almost every time.</li>
        <li>Queue-based isolation prevents cascading failures.</li>
        <li>The Node.js Event Loop must be monitored independently.</li>
        <li>Single heavy requests silently destroy throughput.</li>
        <li>Poorly tuned probes can cause death spirals of restarts.</li>
      </ul>

      <p>The winning model:
      <strong>stateless Node pods + queues + aggressive autoscaling + smart retries.</strong></p>

      <p>This combination kept high-volume integrations stable in environments similar to BigPanda, where
      <strong>reliability is non-negotiable</strong>.</p>
    `
  },

  {
    title: "Python vs Go for Production Microservices",
    cat: "Backend",
    date: "Oct 21, 2025",
    excerpt: "Choosing the right runtime for high-throughput APIs and AI-backed microservices.",
    readTime: "5 min read",
    content: `
      <p>Python is the language of AI. Go is the language of scalable microservices.</p>

      <p>In real architectures, the two complement each other:</p>
      <ul>
        <li><strong>Python</strong> for ETL, orchestration, automations, AI workflows.</li>
        <li><strong>Go</strong> for gateways, schedulers, queues, and high-throughput APIs.</li>
      </ul>

      <p>Go consistently outperforms Python by 3–5× where raw latency matters.
      Python dominates where tooling, ML, and rapid development matter.</p>

      <p>The best teams choose the language <strong>per component, not per organization.</strong></p>
    `
  },

  {
    title: "Running Local LLMs on Mac Studio for Private Workflows",
    cat: "AI Agents",
    date: "Oct 02, 2025",
    excerpt: "Why local LLMs matter for secure, ultra-fast development loops.",
    readTime: "4 min read",
    content: `
      <p>Local LLMs on Mac Studio are more practical than ever. Models up to 70B run surprisingly well.</p>

      <p>Advantages:</p>
      <ul>
        <li>Zero data leaves your device.</li>
        <li>Ultra-low latency — no API hops.</li>
        <li>No token-based cost pressure.</li>
        <li>Perfect for prototyping private/internal agents.</li>
      </ul>

      <p>For Prema Vision AI automations, local inference accelerates prompt iteration,
      agent design, and UI prototyping without depending on cloud infrastructure.</p>
    `
  },

  {
    title: "Optimizing AWS Lambda Cold Starts in 2025",
    cat: "Backend",
    date: "Sep 15, 2025",
    excerpt: "Techniques for keeping serverless APIs responsive during load spikes.",
    readTime: "5 min read",
    content: `
      <p>Cold starts still matter — especially for latency-sensitive backend services.</p>

      <p>Strategies that consistently work:</p>
      <ul>
        <li>Provisioned Concurrency for critical paths.</li>
        <li>Lightweight periodic warmers.</li>
        <li>Splitting heavy handlers into cold-resistant parts.</li>
        <li>Reducing bundle size and dependency count.</li>
        <li>Using runtimes with faster init (Go, Rust).</li>
      </ul>

      <p>We used these approaches extensively in billing and checkout flows where performance is revenue-critical.</p>
    `
  },

  {
    title: "Terraform Best Practices for Scalable Infrastructure",
    cat: "DevOps",
    date: "Aug 28, 2025",
    excerpt: "Patterns for structuring Terraform modules that don’t collapse under scale.",
    readTime: "7 min read",
    content: `
      <p>Terraform at team scale is a different discipline than Terraform for a solo project.</p>

      <p>Patterns that survive scale:</p>
      <ul>
        <li>Versioned modules stored in a dedicated registry.</li>
        <li>Clear split between root and reusable modules.</li>
        <li>GitOps automation via Argo CD or Atlantis.</li>
        <li>Remote state with locking and strict access control.</li>
        <li>Explicit dependency graphs.</li>
      </ul>

      <p>These patterns reduce drift and make infra changes predictable even with many contributors.</p>
    `
  },

  {
    title: "Prompt Engineering for Developers: 2025 Edition",
    cat: "AI Agents",
    date: "Aug 07, 2025",
    excerpt: "Structured prompts, tools, and agent patterns for real production systems.",
    readTime: "6 min read",
    content: `
      <p>Prompt engineering has matured into <strong>protocol design</strong>.</p>

      <p>Effective production prompts include:</p>
      <ul>
        <li>System schemas and constraints.</li>
        <li>Strict formatting contracts.</li>
        <li>Tool/function declarations.</li>
        <li>Error and retry strategies.</li>
        <li>Safety and logging rules.</li>
      </ul>

      <p>Developers who design prompts like APIs build assistants that behave predictably — not magically.</p>
    `
  },

  {
    title: "Building Resilient Distributed Systems",
    cat: "Backend",
    date: "Jul 16, 2025",
    excerpt: "Retries, fallbacks, idempotency, and timeouts — and why they matter at scale.",
    readTime: "9 min read",
    content: `
      <p>In distributed systems, failure is not an exception — it’s ambient noise.</p>

      <p>Resilience requires:</p>
      <ul>
        <li>Idempotent operations.</li>
        <li>Circuit breakers and bulkheads.</li>
        <li>Retries with jitter.</li>
        <li>Dead-letter queues.</li>
        <li>Strict timeouts everywhere.</li>
      </ul>

      <p>These patterns prevented cascading outages in high-volume integration services 
      and kept production systems stable under unpredictable load.</p>
    `
  },

  {
    title: "AWS Cost Optimization: Real Savings for Real Systems",
    cat: "DevOps",
    date: "Jun 24, 2025",
    excerpt: "How to cut AWS bills by 30%+ with zero impact on performance.",
    readTime: "6 min read",
    content: `
      <p>Most inflated AWS bills aren’t caused by traffic — they’re caused by architecture.</p>

      <p>Real savings come from:</p>
      <ul>
        <li>Spot Instances for stateless services.</li>
        <li>Savings Plans + Compute Optimizer.</li>
        <li>Right-sizing EKS nodes.</li>
        <li>S3 Intelligent Tiering.</li>
        <li>Trimmed Lambda packages.</li>
      </ul>

      <p>Across clients, these steps consistently delivered
      <strong>30–55% savings</strong> with no SLA degradation.</p>
    `
  },

  {
    title: "LangGraph and Multi-Agent Orchestration",
    cat: "AI Agents",
    date: "Jun 03, 2025",
    excerpt: "Why complex automations require graph-based state machines, not linear flows.",
    readTime: "8 min read",
    content: `
      <p>Linear chains break as soon as workflows become real-world complex.</p>

      <p>LangGraph enables:</p>
      <ul>
        <li>Stateful agent behavior.</li>
        <li>Branching logic.</li>
        <li>Loops and retries.</li>
        <li>Human-in-the-loop actions.</li>
        <li>Deterministic orchestration.</li>
      </ul>

      <p>For enterprise AI automations — contract analysis, CRM overlays, ops assistants —
      graph-based orchestration is quickly becoming the standard.</p>
    `
  }
];


  const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.cat === filter);

  const handleSummarize = async (post) => {
    if (summary[post.title]) return; 
    setLoadingSummary(prev => ({ ...prev, [post.title]: true }));
    const prompt = `Generate 3 brief, punchy, technical bullet points about "${post.title}".`;
    const result = await callGemini(prompt);
    setSummary(prev => ({ ...prev, [post.title]: result }));
    setLoadingSummary(prev => ({ ...prev, [post.title]: false }));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-24 bg-slate-900/30 border-y border-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Field Notes</h2>
            <p className="text-sm sm:text-base text-slate-500">Thoughts on code, architecture, and the AI revolution.</p>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap min-h-[44px] flex items-center ${
                  filter === cat 
                  ? 'bg-white text-slate-900' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Controls (Visible on Desktop) */}
        <div className="hidden md:flex justify-end gap-2 mb-4">
          <button onClick={scrollLeft} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={scrollRight} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Horizontal Scroll Container - Now with 2 Rows */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
            {/* Using a grid inside the flex container to force 2 rows if enough items, 
                or we can just map and group. But a simpler CSS grid approach for horizontal scroll:
                grid-rows-2 grid-flow-col
            */}
            <div className="grid grid-rows-2 grid-flow-col gap-4 sm:gap-6 min-w-full">
              {filteredPosts.map((post, idx) => (
                <article 
                  key={idx} 
                  onClick={() => setActivePost(post)}
                  className="w-[85vw] sm:w-[90vw] md:w-[400px] snap-start group cursor-pointer bg-slate-950/50 border border-slate-800/50 p-4 sm:p-6 rounded-xl hover:border-slate-700 transition-all relative hover:-translate-y-1 flex flex-col h-full min-h-[200px]"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{post.cat}</span>
                    <span className="text-xs text-slate-600">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto border-t border-slate-800 pt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSummarize(post);
                      }}
                      disabled={loadingSummary[post.title]}
                      className="hidden text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {loadingSummary[post.title] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      {summary[post.title] ? "Done" : "AI Brief"}
                    </button>

                    <span className="text-xs font-bold text-slate-500 group-hover:text-white flex items-center gap-1 transition-colors">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  
                  {summary[post.title] && (
                    <div className="mt-3 p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/20 animate-in fade-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                      <p className="text-xs text-indigo-200 font-mono whitespace-pre-line leading-relaxed">
                        {summary[post.title]}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
        </div>
      </div>

      {activePost && (
        <ArticleModal post={activePost} onClose={() => setActivePost(null)} />
      )}

    </section>
  );
};

const FloridaFun = () => {
  return (
    <section id="florida" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-indigo-950 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          <div className="md:w-1/2 w-full">
             <div className="inline-block p-2 sm:p-3 rounded-2xl bg-orange-500/20 text-orange-300 mb-4 sm:mb-6 rotate-[-3deg]">
               <Sun className="w-6 h-6 sm:w-8 sm:h-8 inline mr-2" />
               <span className="font-bold tracking-wide text-sm sm:text-base">Sunshine State of Mind</span>
             </div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
               Palm Coast HQ
             </h2>
             <p className="text-base sm:text-lg text-slate-300 mb-4 sm:mb-6">
               Based in beautiful Florida. Yes, we have alligators. No, they don't write Python (yet).
             </p>
             <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8">
               When I'm not fine-tuning LLMs or debugging k8s clusters, I'm enjoying the quiet innovation of Palm Coast. 
               Remote work allows for high-tech output with a low-stress input.
             </p>
             
             <div className="grid grid-cols-3 gap-3 sm:gap-4">
               <div className="bg-slate-900/80 p-3 sm:p-4 rounded-lg text-center backdrop-blur-sm border border-slate-700 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center">
                 <div className="text-xl sm:text-2xl font-bold text-white">98%</div>
                 <div className="text-xs text-slate-400 uppercase">Humidity</div>
               </div>
               <a href="https://www.instagram.com/florida_for_fun/" className="bg-pink-600/20 hover:bg-pink-600/30 transition-colors p-3 sm:p-4 rounded-lg text-center backdrop-blur-sm border border-pink-500/30 group min-h-[80px] sm:min-h-[100px] flex flex-col justify-center">
                 <div className="flex justify-center mb-1"><Instagram className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 group-hover:scale-110 transition-transform" /></div>
                 <div className="text-xs text-pink-300 uppercase font-bold">Instagram</div>
               </a>
                <div className="bg-slate-900/80 p-3 sm:p-4 rounded-lg text-center backdrop-blur-sm border border-slate-700 min-h-[80px] sm:min-h-[100px] flex flex-col justify-center">
                 <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                 <div className="text-xs text-slate-400 uppercase">Focus</div>
               </div>
             </div>
          </div>

          <div className="md:w-1/2 relative">
            {/* Simple geometric visual representation of Florida vibe */}
            <a
              href="https://www.google.com/maps/place/Palm+Coast,+FL"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-tr from-orange-400 to-purple-600 p-1 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <div className="bg-slate-900 w-full h-full rounded-[20px] flex items-center justify-center relative overflow-hidden">
                   {/* Updated Map Background */}
                   <div className="absolute inset-0 bg-[url('https://share.cleanshot.com/CWt6nCZM+')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                   <div className="relative z-10 bg-slate-900/80 p-6 rounded-xl backdrop-blur-md border border-slate-700 text-center">
                     <MapPin className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                     <p className="font-mono text-sm text-white mb-1">Palm Coast, FL</p>
                     <span className="text-xs uppercase tracking-wide text-orange-200/80">Open in Google Maps</span>
                   </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const CONTACT_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz9VeBXlkur7VEM-9-ON8j3WsIXJauqd-1-XsGcmYgDOs8eTkaE4NedKlCfbp5NXoJh/exec';

const contactReasons = [
  'AI / LLM Integration',
  'Backend Architecture',
  'DevOps / Cloud Infra',
  'General Consulting',
  'Fractional CTO / Advisory',
  'Product Strategy / Roadmapping',
  'Podcast or Interview Invite',
  'Speaking / Panel / Event',
  'Mentorship or Career Chat',
  'Coffee / Beach Hang in Palm Coast',
  'Just Saying Hi / Cool Build Share'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: contactReasons[0],
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const updateField = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    formData.name.trim() &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) {
      setFeedback({ type: 'error', message: 'Fill in all fields before sending.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          message: formData.message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data?.error || 'Message failed to send. Try again in a bit.');
      }

      setFeedback({ type: 'success', message: "Got it! I'll reply shortly." });
      setFormData({
        name: '',
        email: '',
        projectType: contactReasons[0],
        message: ''
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-700 shadow-2xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Ready to Scale?</h2>
            <p className="text-sm sm:text-base text-slate-400 px-2">
              Whether you need an AI agent implementation, a backend audit, or full-stack leadership, let's chat.
            </p>
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={updateField('name')}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white text-base focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all min-h-[44px]"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={updateField('email')}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white text-base focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all min-h-[44px]"
                  placeholder="john@company.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Type</label>
              <select 
                value={formData.projectType}
                onChange={updateField('projectType')}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 text-base focus:border-indigo-500 outline-none transition-all min-h-[44px]"
              >
                {contactReasons.map((reason) => (
                  <option key={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
              <textarea 
                rows="5"
                value={formData.message}
                onChange={updateField('message')}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white text-base focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-y"
                placeholder="Tell me about your technical challenges..."
              ></textarea>
            </div>

            {feedback && (
              <div
                className={`text-sm rounded-xl border px-4 py-3 ${
                  feedback.type === 'success'
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
                    : 'border-red-500/40 bg-red-500/10 text-red-200'
                }`}
              >
                {feedback.message}
              </div>
            )}

            <button
              disabled={submitting || !isValid}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg shadow-lg transform active:scale-[0.99] transition-all flex justify-center items-center gap-2 min-h-[44px] text-base"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 py-8 sm:py-12 border-t border-slate-900">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Denys Korolkov</h3>
          <p className="text-slate-500 text-xs sm:text-sm">© {new Date().getFullYear()} Prema Vision LLC. All rights reserved.</p>
        </div>
        
        <div className="flex gap-4 sm:gap-6">
          <a href="https://github.com/denyskorolkov" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform min-w-[44px] min-h-[44px] flex items-center justify-center"><Github size={20} /></a>
          <a href="https://linkedin.com/in/denyskorolkov/" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform min-w-[44px] min-h-[44px] flex items-center justify-center"><Linkedin size={20} /></a>
          <a href="https://x.com/denys_korolkov" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform min-w-[44px] min-h-[44px] flex items-center justify-center"><Twitter size={20} /></a>
          <a href="mailto:denys.korolkov@gmail.com" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform min-w-[44px] min-h-[44px] flex items-center justify-center"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-orange-500/30 selection:text-orange-200">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <Blog />
        <FloridaFun />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating Gradient Orbs for Ambiance */}
      <div className="fixed top-20 left-0 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-20 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
    </div>
  );
}