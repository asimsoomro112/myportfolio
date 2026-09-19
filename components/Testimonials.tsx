'use client';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const signals = [
  'Clear scope before design starts',
  'Responsive pages tested on mobile',
  'Project context, stack, and outcome documented',
  'Direct communication during the build',
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-3xl bg-slate-950 p-5 sm:p-8 md:p-10 text-white grid lg:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-8 items-center shadow-xl"
        >
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase text-cyan-300">What collaborators can expect</p>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight">
              Clear communication and practical execution.
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
              I keep projects grounded in the product goal, the user journey, and the technical parts that need to work reliably after launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {signals.map((signal) => (
              <div key={signal} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{signal}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
