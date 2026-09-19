'use client';
import { motion } from 'motion/react';
import { CheckCircle2, Clock3, Laptop, Layers3 } from 'lucide-react';

const strengths = [
  {
    icon: Laptop,
    title: 'Full-stack engineering',
    text: 'I think through the interface, data model, API architecture, AI workflows, and state handling to build robust systems.',
  },
  {
    icon: Clock3,
    title: 'Product-focused delivery',
    text: 'Lean builds, clear priorities, and working interfaces without unnecessary complexity. I focus on turning requirements into reliable software.',
  },
  {
    icon: Layers3,
    title: 'AI & Data integration',
    text: 'I build AI tools, data-driven applications, and automation systems, integrating LLMs and computer vision where it solves real problems.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 relative z-10 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-5"
          >
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase text-cyan-700">About</p>
              <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-950 leading-tight">
                I build software systems that are reliable, scalable, and intuitive.
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
              I&apos;m a Software Engineer focused on building full-stack products and AI-assisted systems. I work across frontend, backend, APIs, databases, automation, and AI integrations.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
              My goal is to turn real-world requirements into usable software. Whether it&apos;s integrating an AI API, setting up a database pipeline, or building a responsive UI, I prioritize engineering quality and product value.
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-950">11+</div>
                <div className="text-xs sm:text-sm text-slate-500">Projects Shipped</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-slate-950">Full-Stack</div>
                <div className="text-xs sm:text-sm text-slate-500">& AI Engineering</div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:gap-4">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-cyan-200/80 transition-all flex gap-3 sm:gap-4 items-start"
              >
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
