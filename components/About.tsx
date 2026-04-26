'use client';
import { motion } from 'motion/react';
import { Globe, Heart, MousePointer2 } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">Identity</h2>
          <div className="w-20 h-1 bg-gradient-brand rounded-full mb-8" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
           {/* Main Bio - Bento Card */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
             <div className="relative z-10 space-y-4 md:space-y-6 text-base md:text-lg text-slate-300 font-light">
                <p className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed">
                   I am a Full Stack Developer and E-commerce Specialist dedicated to building high-performance, visually stunning digital solutions.
                </p>
                <p>
                   I specialize in luxury storefronts, B2B industrial platforms, and automated business systems. My focus is on delivering &quot;Product-Market Fit&quot; solutions that look premium and function flawlessly.
                </p>
                <p>
                   I build and deliver custom ready-made E-commerce systems within 24–48 hours for immediate business launch. My goal is to bridge the gap between complex engineering and human-centric design.
                </p>
                
                <div className="pt-6">
                   <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4 text-cyan-400 bg-cyan-500/5 border border-cyan-500/20">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                         <MousePointer2 className="w-5 h-5" />
                      </div>
                      <p className="text-sm md:text-base font-medium text-white italic">
                         &quot;I build and deliver custom ready-made E-commerce systems within 24–48 hours for immediate business launch.&quot;
                      </p>
                   </div>
                </div>

                <div className="pt-8 flex flex-wrap gap-4">
                   <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm text-cyan-400">
                      <Globe className="w-4 h-4" /> Global Mindset
                   </div>
                   <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm text-purple-400">
                      <MousePointer2 className="w-4 h-4" /> Pixel Perfect
                   </div>
                   <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm text-amber-400">
                      <Heart className="w-4 h-4" /> Built with Passion
                   </div>
                </div>
             </div>
           </motion.div>

           {/* Stats / Mini Bento */}
           <div className="lg:col-span-4 flex flex-col gap-8">
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass-panel rounded-3xl p-8 flex-1 flex flex-col justify-center items-center text-center border-purple-500/20 hover:border-purple-500/50 transition-colors"
             >
                <div className="text-5xl md:text-6xl font-heading font-bold text-white neon-text-purple mb-2">5+</div>
                <div className="text-sm tracking-widest text-slate-400 uppercase">Years of Obsession</div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.1 }}
               className="glass-panel rounded-3xl p-8 flex-1 relative overflow-hidden group hover:border-cyan-500/50 transition-colors border border-white/5"
             >
                <div dangerouslySetInnerHTML={{ __html: `
                  <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 scale-110 group-hover:scale-100" src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-11-large.mp4"></video>
                ` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="text-2xl font-heading font-bold text-white mb-1">Based in</div>
                  <div className="text-amber-400 font-medium">Karachi, PK</div>
                </div>
             </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
}
