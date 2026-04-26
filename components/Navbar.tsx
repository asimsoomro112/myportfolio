'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['About', 'Skills', 'Work', 'Journal', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer font-heading font-bold text-2xl tracking-tighter">
             <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white">
               M
             </div>
             <span>Asim<span className="text-cyan-400">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="glass px-6 py-2 rounded-full flex items-center gap-6 text-sm font-medium">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-300 hover:text-white transition-colors relative group">
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full rounded-full" />
                </a>
              ))}
            </div>
            
            <button className="relative group px-6 py-2 overflow-hidden rounded-full font-medium">
              <div className="absolute inset-0 bg-gradient-brand opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[1px] bg-[#0A0F1C] rounded-full transition-all group-hover:bg-opacity-0" />
              <span className="relative z-10 text-white group-hover:text-white transition-colors">Hire Me</span>
            </button>
          </div>

          <button className="md:hidden relative z-50 text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-[#0A0F1C]/80 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2 w-full max-w-sm px-6 text-2xl font-heading font-medium tracking-tight">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-cyan-400 transition-colors py-4 w-full text-center border-b border-white/5 last:border-0"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
