'use client';
import { motion } from 'motion/react';
import { BrainCircuit, Database, LayoutDashboard, MonitorPlay, ShoppingBag, Workflow } from 'lucide-react';

const services = [
  {
    title: 'Websites & Storefronts',
    icon: ShoppingBag,
    text: 'Responsive websites, landing pages, product catalogs, carts, filtering, and polished frontend experiences.',
    tools: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    title: 'AI Tools & Automation',
    icon: BrainCircuit,
    text: 'Gemini API workflows, AI-assisted generation, Python model integration, and computer-vision prototypes.',
    tools: ['Gemini API', 'Python', 'YOLOv7'],
  },
  {
    title: 'Admin Dashboards',
    icon: LayoutDashboard,
    text: 'Internal panels for managing products, menus, images, orders, users, content, and app data.',
    tools: ['Firebase', 'CRUD flows', 'Role-ready structure'],
  },
  {
    title: 'Data-backed Systems',
    icon: Database,
    text: 'Firestore data models, real-time updates, forms, file/image flows, and lightweight APIs.',
    tools: ['Firestore', 'Auth-ready', 'Serverless'],
  },
  {
    title: 'Marketplaces & Workflows',
    icon: Workflow,
    text: 'Multi-role flows for admins, sellers, customers, escrow-style buying, and structured transactions.',
    tools: ['Marketplace logic', 'Escrow flow', 'Role-based UI'],
  },
  {
    title: 'Media & Interactive Apps',
    icon: MonitorPlay,
    text: 'Live TV browsing, IPTV-based interfaces, interactive states, game logic, and custom UI behavior.',
    tools: ['Vite', 'React', 'Game logic'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 relative z-10 w-full overflow-hidden scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-sm font-bold uppercase text-cyan-700">Capabilities</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-950">
            Practical engineering across websites, AI tools, marketplaces, dashboards, and media apps.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            The work is focused on useful software: clear frontend, reliable data flow, responsive layouts, and custom logic that supports the exact project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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
      </div>
    </section>
  );
}
