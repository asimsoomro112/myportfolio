'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while splash screen is active
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 2500); // 2.5 seconds splash screen

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/10 backdrop-blur-3xl"
        >
          {/* Liquid Glass Blobs Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-cyan-400/30 blur-3xl rounded-full mix-blend-multiply"
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, -90, 0],
                borderRadius: ["70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-emerald-400/30 blur-3xl rounded-full mix-blend-multiply translate-x-1/4"
            />
          </div>

          {/* Glassmorphic Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6">
              {/* Liquid Glass Card */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-4xl sm:text-5xl font-heading font-black text-slate-800 tracking-tighter"
                >
                  MA
                </motion.span>
              </div>
            </div>

            {/* Loading Text */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm sm:text-base font-bold text-slate-600 uppercase tracking-[0.2em]">
                  Loading Experience
                </p>
              </motion.div>
            </div>
            
            {/* Progress Bar Container */}
            <div className="w-48 sm:w-64 h-1 bg-slate-200/50 rounded-full mt-6 overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                className="w-full h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
