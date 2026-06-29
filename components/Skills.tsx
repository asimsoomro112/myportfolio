'use client';
import { motion } from 'motion/react';
import { Database, LayoutDashboard, ShoppingBag, Workflow } from 'lucide-react';

const services = [
  {
    title: 'E-commerce Storefronts',
    icon: ShoppingBag,
    text: 'Product catalogs, carts, responsive product pages, filtering, and polished buyer journeys.',
    tools: ['Next.js', 'React', 'Checkout-ready UI'],
  },
  {
    title: 'Admin Dashboards',
    icon: LayoutDashboard,
    text: 'Clean internal panels for managing products, menus, images, orders, and content updates.',
    tools: ['Firebase', 'CRUD flows', 'Role-ready structure'],
  },
  {
    title: 'Data-backed Apps',
    icon: Database,
    text: 'Firestore data models, real-time updates, forms, file/image flows, and lightweight APIs.',
    tools: ['Firestore', 'Auth-ready', 'Serverless'],
  },
  {
    title: 'Business Automation',
    icon: Workflow,
    text: 'Small tools that remove repetitive work and make daily operations easier for teams.',
    tools: ['Workflows', 'Integrations', 'Reusable systems'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 relative z-10 w-full overflow-hidden scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-sm font-bold uppercase text-cyan-700">Services</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-950">
            Practical builds for businesses that need to launch, sell, and manage.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            The work is focused on useful web products: clear frontend, reliable backend, and mobile layouts that do not break when real content is added.
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
