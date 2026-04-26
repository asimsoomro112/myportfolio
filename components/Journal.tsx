'use client';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

export default function Journal() {
  return (
    <section id="journal" className="py-16 md:py-24 relative z-10 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-16 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">Thoughts & Experiments</h2>
          <div className="w-20 h-1 bg-gradient-brand rounded-full mb-8" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((item, i) => (
             <motion.article
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass-panel p-6 rounded-3xl group cursor-pointer hover:border-purple-500/30 transition-colors flex flex-col h-full"
             >
               <div className="flex items-center gap-2 text-xs text-purple-400 font-mono mb-4">
                 <Calendar className="w-3 h-3" />
                 <span>Oct {10 + i}, 2026</span>
               </div>
               <h3 className="text-xl font-heading font-medium text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-brand transition-all">
                  {['Building with Antigravity: The New AI Frontier', 'Glassmorphism 2.0: Beyond the Blur', 'Performance Tuning Next.js App Router'][i]}
               </h3>
               <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">
                  Exploring the architectural decisions and design patterns that defined this latest generation of web experiences. We dive deep into the specific constraints and breakthroughs...
               </p>
               <div className="flex items-center justify-between text-sm mt-auto font-medium">
                  <span className="text-slate-300 group-hover:text-white transition-colors">Read Article</span>
                  <span className="text-cyan-400 group-hover:translate-x-2 transition-transform opacity-0 group-hover:opacity-100">→</span>
               </div>
             </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
