'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

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
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
          <div className="relative flex items-center justify-between rounded-3xl border border-white/70 bg-white/58 px-3 py-2 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/48 md:px-4">
          <a href="#hero" className="flex-shrink-0 flex items-center gap-2 font-heading font-bold text-2xl text-slate-950">
            <span className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-lg shadow-slate-950/15">
              M
            </span>
            <span>Asim<span className="text-cyan-600">.</span></span>
          </a>

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
              className="px-5 py-2 rounded-full bg-slate-950 text-white font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-950/15"
            >
              Hire Me
            </a>
          </div>

          <a
            href="#contact"
            className="md:hidden absolute left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/15"
          >
            Hire Me
          </a>

          <button
            className="md:hidden relative z-50 text-slate-950 p-2 rounded-2xl bg-white/45 border border-white/60 backdrop-blur-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/72 backdrop-blur-3xl flex items-center justify-center"
          >
            <div className="mx-4 flex w-full max-w-sm flex-col items-center gap-2 rounded-3xl border border-white/70 bg-white/70 p-6 text-2xl font-heading font-semibold tracking-tight shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-800 hover:text-cyan-700 transition-colors py-4 w-full text-center border-b border-slate-200 last:border-0"
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: links.length * 0.08 }}
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full rounded-full bg-slate-950 px-6 py-4 text-center text-base text-white"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
