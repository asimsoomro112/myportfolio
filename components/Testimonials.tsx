'use client';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-10 md:mb-16">What Collaborators Say</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-brand opacity-20 blur-[100px] rounded-full z-0" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[3rem] relative z-10"
          >
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-cyan-400/30 absolute top-6 left-6 md:top-8 md:left-8" />
            <p className="text-lg sm:text-xl md:text-3xl font-light text-white leading-relaxed mb-8 md:mb-10 relative z-10 pt-4 md:pt-0">
              &quot;Aasim doesn&apos;t just write code; he engineers emotion. The application he built completely transformed our user engagement metrics. His mastery over modern UI paradigms is unmatched.&quot;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white/20">
                <Image src="https://picsum.photos/seed/face1/100/100" alt="Avatar" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Sarah Jenkins</div>
                <div className="text-sm text-slate-400">Product Lead @ TechNova</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
