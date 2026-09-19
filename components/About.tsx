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
    <section id="about" className="py-16 md:py-24 relative z-10 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div>
              <p className="text-sm font-bold uppercase text-cyan-700">About</p>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-950">
                I build software systems that are reliable, scalable, and intuitive.
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              I’m a Software Engineer focused on building full-stack products and AI-assisted systems. I work across frontend, backend, APIs, databases, automation, and AI integrations.
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              My goal is to turn real-world requirements into usable software. Whether it’s integrating an AI API, setting up a database pipeline, or building a responsive UI, I prioritize engineering quality and product value.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-3xl font-heading font-bold text-slate-950">11+</div>
                <div className="text-sm text-slate-500">Projects Shipped</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-3xl font-heading font-bold text-slate-950">Full-Stack</div>
                <div className="text-sm text-slate-500">& AI Engineering</div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-panel rounded-3xl p-5 sm:p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6 flex gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" />
              <p className="text-slate-700 leading-relaxed">
                Every build is scoped around the actual product goal first, then designed and engineered so users can complete the main action without friction.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
