'use client';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, ChevronDown, Code, Sparkles, Terminal } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // 3D Parallax for the right hand element
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rx = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const ry = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(rx, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(ry, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 md:pt-24 overflow-hidden perspective-[1500px]"
    >
      {/* Dynamic Grid Background */}
      <motion.div 
        style={{ 
          y, 
          opacity,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d" 
        }} 
        className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10"
      >
        <div className="flex flex-col items-start gap-8 z-10" style={{ transform: "translateZ(60px)" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fiverr Top Seller Potential</span>
            </div>
          </motion.div>

          <div className="space-y-4 max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 text-balance drop-shadow-2xl"
            >
              Crafting Digital <br className="hidden md:block"/> Experiences.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-slate-400 font-light max-w-xl leading-relaxed"
            >
              Full Stack Developer & E-commerce Expert specializing in luxury storefronts, B2B industrial platforms, and automated business systems. Based in Karachi, delivering premium solutions globally.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A0F1C] rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Explore Work <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 glass rounded-full font-medium text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              <Terminal className="w-5 h-5" /> Let&apos;s Connect
            </button>
          </motion.div>
        </div>

        {/* Abstract 3D / Visualization Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, translateZ: -100 }}
          animate={{ opacity: 1, scale: 1, translateZ: 0 }}
          transition={{ duration: 1.5, delay: 0.2, type: 'spring', stiffness: 100 }}
          className="relative lg:h-[600px] w-full flex items-center justify-center perspective-[1000px] hidden lg:flex"
        >
            <div className="flex flex-col gap-8 w-full max-w-[500px]">
              <div className="relative aspect-square w-full max-w-[450px] mx-auto lg:mx-0 group preserve-3d" style={{ transformStyle: "preserve-3d" }}>
                {/* Main glass card with 3D separation */}
                <div className="absolute inset-0 glass-panel rounded-[2rem] transform transition-transform duration-700 cursor-pointer overflow-hidden border-white/10 group-hover:shadow-[0_0_80px_rgba(0,245,255,0.15)] group-hover:border-cyan-500/30" style={{ transform: "translateZ(30px)" }}>
                  {/* Square Profile Image - No padding to fit perfectly */}
                  <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(50px)" }}>
                      <Image 
                        src="/passport-size.png" 
                        alt="Muhammad Asim" 
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                  </div>
                  
                  {/* Interactive Glass Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                </div>
                
                {/* Decorative glowing orb behind the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
              </div>

              {/* Identity moved OUTSIDE the card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 px-4"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-4xl md:text-6xl font-heading font-bold text-white neon-text-cyan tracking-tight">
                      Muhammad Asim
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
                        SYSTEM.ACTIVE
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                    <div className="flex flex-col">
                      <span className="text-slate-600 mb-1">Location</span>
                      <span className="text-slate-200">Karachi, PK</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-600 mb-1">Role</span>
                      <span className="text-slate-200">Full Stack</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5, duration: 1 }}
         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 z-20"
      >
         <span className="text-xs uppercase tracking-[0.3em] font-medium">Scroll</span>
         <ChevronDown className="w-5 h-5 animate-bounce text-cyan-400" />
      </motion.div>
    </section>
  );
}
