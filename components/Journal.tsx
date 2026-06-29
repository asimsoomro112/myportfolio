'use client';
import { motion } from 'motion/react';
import { ClipboardCheck, Code2, Rocket, Search } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Clarify the offer',
    text: 'We define the audience, primary goal, content, and must-have workflow before design starts.',
  },
  {
    icon: ClipboardCheck,
    title: 'Plan the interface',
    text: 'I map pages, sections, states, and mobile behavior so the build stays focused.',
  },
  {
    icon: Code2,
    title: 'Build and connect',
    text: 'Frontend, Firebase data, forms, admin flows, and responsive polish come together in one working product.',
  },
  {
    icon: Rocket,
    title: 'Launch and hand off',
    text: 'Final testing, performance checks, deployment support, and a simple handoff for future updates.',
  },
];

export default function Journal() {
  return (
    <section id="process" className="py-16 md:py-24 relative z-10 bg-white/65 border-y border-slate-200 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-sm font-bold uppercase text-cyan-700">Process</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-950">
            A simple build process that keeps the project moving.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Good projects move faster when the goal, content, data, and mobile behavior are clear before development gets heavy.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-400">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
