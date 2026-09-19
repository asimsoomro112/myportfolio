'use client';
import { motion } from 'motion/react';
import { BrainCircuit, Database, LayoutDashboard, MonitorPlay, ShoppingBag, Workflow } from 'lucide-react';

const services = [
  {
    title: 'Frontend Architecture',
    icon: LayoutDashboard,
    text: 'Building responsive, accessible, and performant user interfaces with modern web standards.',
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend & Data',
    icon: Database,
    text: 'Designing database schemas, building REST APIs, and managing serverless data workflows.',
    tools: ['Python', 'Firebase / Firestore', 'REST APIs', 'Data Validation'],
  },
  {
    title: 'AI & Automation',
    icon: BrainCircuit,
    text: 'Integrating LLMs, prompt engineering, computer vision models, and building automated data pipelines.',
    tools: ['Gemini API', 'AI Workflows', 'Computer Vision'],
  },
  {
    title: 'Product Engineering',
    icon: Workflow,
    text: 'Translating business requirements into technical architecture with full-stack ownership.',
    tools: ['Git / GitHub', 'System Architecture', 'Lifecycle Management'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 relative z-10 w-full overflow-hidden scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-sm font-bold uppercase text-cyan-700">Engineering Capabilities</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-950">
            Practical engineering across frontend, backend, data, and AI systems.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Focused on building robust software: clean component architecture, reliable data flow, secure APIs, and integrating AI to solve actual problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel p-5 sm:p-6 md:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{service.text}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 sm:p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-heading font-bold text-slate-950 mb-6">How I Build</h3>
            <div className="flex flex-col space-y-4 relative">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200"></div>
              {['Idea & Requirements', 'Architecture & Data Modeling', 'Frontend + Backend APIs', 'AI & Automation Integration', 'Validation & Testing', 'Deployment'].map((step, i) => (
                <div key={step} className="flex items-center gap-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm border-2 border-white">
                    {i + 1}
                  </div>
                  <span className="font-semibold text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-50/50 to-emerald-50/50"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-5">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-950 mb-3">AI-Assisted Engineering</h3>
            <p className="text-slate-600 leading-relaxed">
              I use modern AI tools and assistants as part of my development workflow to accelerate exploration, scaffolding, debugging, refactoring, and documentation. AI serves as an engineering productivity tool, while I maintain full ownership over architecture, validation, and engineering judgment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
