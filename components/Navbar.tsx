'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['About', 'Skills', 'Work', 'Process', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2.5 sm:py-3' : 'py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
          <div className="relative flex items-center justify-between rounded-2xl sm:rounded-3xl border border-white/70 bg-white/60 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/50">
            <a href="#hero" className="flex-shrink-0 flex items-center gap-2 font-heading font-bold text-xl sm:text-2xl text-slate-950 group">
              <Logo className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-md transition-transform group-hover:scale-105" />
              <span>Asim<span className="text-cyan-600">.</span></span>
            </a>

            {/* Desktop Navigation - strictly unchanged */}
            <div className="hidden md:flex items-center gap-5">
              <div className="rounded-full border border-white/70 bg-white/50 px-5 py-2 shadow-inner shadow-white/40 backdrop-blur-xl flex items-center gap-5 text-sm font-medium">
                {links.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-600 hover:text-slate-950 transition-colors relative group"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all group-hover:w-full rounded-full" />
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                className="px-5 py-2 rounded-full bg-slate-950 text-white font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-950/15 text-sm"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Actions: Clean non-overlapping row on mobile */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="#contact"
                className="rounded-full bg-slate-950 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-slate-950/15 active:scale-95 transition-transform"
              >
                Hire Me
              </a>

              <button
                className="relative z-50 text-slate-950 p-2 rounded-xl bg-white/60 border border-white/80 backdrop-blur-xl active:scale-95 transition-transform"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex w-full max-w-sm flex-col items-center gap-1.5 rounded-3xl border border-white/80 bg-white/90 p-6 text-xl font-heading font-semibold tracking-tight shadow-[0_30px_90px_rgba(15,23,42,0.25)] backdrop-blur-2xl"
            >
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
                <span className="text-xs text-cyan-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Portfolio
                </span>
              </div>
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-800 hover:text-cyan-700 active:bg-cyan-50/60 rounded-2xl transition-all py-3 w-full text-center flex items-center justify-between px-4 text-lg"
                >
                  <span>{link}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: links.length * 0.05 }}
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full rounded-2xl bg-slate-950 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-slate-950/20 active:scale-98 transition-transform"
              >
                Hire Me
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
