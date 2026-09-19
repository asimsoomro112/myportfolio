'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function SplashScreen() {
  const [stage, setStage] = useState<'loading' | 'welcome' | 'done'>('loading');
  const [typedText, setTypedText] = useState('');
  const fullText = "Welcome to my portfolio.";

  useEffect(() => {
    // Disable scrolling while splash screen is active
    document.body.style.overflow = 'hidden';
    
    const loadingTimer = setTimeout(() => {
      setStage('welcome');
    }, 2500); // 2.5 seconds splash screen

    const welcomeTimer = setTimeout(() => {
      setStage('done');
      document.body.style.overflow = '';
    }, 6200); // Extended slightly so welcome text doesn't disappear too fast

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(welcomeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (stage === 'welcome') {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
        }
      }, 55);
      return () => clearInterval(interval);
    }
  }, [stage, fullText]);

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/30 backdrop-blur-3xl p-4"
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
              className="absolute w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] bg-cyan-400/30 blur-3xl rounded-full mix-blend-multiply"
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, -90, 0],
                borderRadius: ["70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[60vw] h-[60vw] max-w-[300px] max-h-[300px] bg-emerald-400/30 blur-3xl rounded-full mix-blend-multiply translate-x-1/4"
            />
          </div>

          <AnimatePresence mode="wait">
            {stage === 'loading' && (
              <motion.div
                key="loading-stage"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.1, opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-5 sm:mb-6">
                  {/* Liquid Glass Card */}
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl border border-white/60 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
                    <Logo className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-md" />
                  </div>
                </div>

                {/* Loading Text */}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-xs sm:text-sm md:text-base font-bold text-slate-600 uppercase tracking-[0.2em]">
                      Loading Experience
                    </p>
                  </motion.div>
                </div>
                
                {/* Progress Bar Container */}
                <div className="w-40 sm:w-56 md:w-64 h-1 bg-slate-200/60 rounded-full mt-5 sm:mt-6 overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                    className="w-full h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                  />
                </div>
              </motion.div>
            )}

            {stage === 'welcome' && (
              <motion.div
                key="welcome-stage"
                initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl"
              >
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-heading font-bold text-slate-900 leading-tight inline-flex items-center justify-center flex-wrap">
                  <span>{typedText}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-0.5 sm:w-1 h-6 sm:h-10 md:h-12 bg-cyan-500 ml-1 rounded-full"
                  />
                </h1>
                
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: typedText === fullText ? 1 : 0, y: typedText === fullText ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => {
                    setStage('done');
                    document.body.style.overflow = '';
                  }}
                  className="mt-6 sm:mt-8 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-slate-300/60 bg-white/40 backdrop-blur-md shadow-sm text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Enter
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
