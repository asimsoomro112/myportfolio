'use client';

import { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code2, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'work', 'process', 'contact'];
      let current = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code2, label: 'Skills' },
    { id: 'work', icon: Briefcase, label: 'Work' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, type: 'spring', damping: 20 }}
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm"
    >
      <div className="flex items-center justify-between rounded-[2rem] border border-white/70 bg-white/60 px-5 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-3xl supports-[backdrop-filter]:bg-white/40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className="relative flex flex-col items-center gap-1 p-2 group"
            >
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isActive ? 'bg-cyan-500 shadow-md shadow-cyan-500/20' : 'bg-transparent hover:bg-white/50'}`}>
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'}`} />
              </div>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
