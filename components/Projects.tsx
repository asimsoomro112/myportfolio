'use client';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Blueprint AI',
    type: 'AI sketch-to-website tool',
    description: 'An AI-powered tool that turns rough layout sketches and blueprint-style ideas into website interface concepts using the Gemini API.',
    outcome: 'Helps founders and designers move from a rough idea to a usable web prototype faster.',
    image: '/projects/BlueprintAi.png',
    aspectRatio: '1909 / 942',
    tags: ['Gemini API', 'AI workflow', 'Web generation', 'Prototype'],
    featured: true,
  },
  {
    title: 'OrthoAI',
    type: 'AI fracture detection prototype',
    description: 'A computer-vision prototype for detecting possible bone fractures in X-ray imagery using a YOLOv7 model and Python-based AI workflow.',
    outcome: 'Demonstrates applied AI model integration for medical-imaging support; built as a prototype, not a diagnostic replacement.',
    image: '/projects/OrthoAi.png',
    aspectRatio: '1432 / 710',
    tags: ['YOLOv7', 'Python', 'Computer vision', 'AI'],
    featured: false,
  },
  {
    title: 'Revault',
    type: 'Escrow marketplace platform',
    description: 'A preloved-clothing marketplace with separate flows for admins, sellers, and customers, plus escrow-style transaction handling to support safer buying and selling.',
    outcome: 'Creates trust between buyers and sellers by structuring the marketplace around managed transactions and role-based controls.',
    image: '/projects/Revault.png',
    aspectRatio: '1919 / 942',
    tags: ['Next.js', 'Marketplace', 'Escrow', 'Admin'],
    featured: true,
  },
  {
    title: 'StreamPK Live',
    type: 'Live TV streaming app',
    description: 'A live TV platform for browsing channels from countries around the world, powered by public IPTV sources and a fast Vite React interface.',
    outcome: 'Makes global live channels easier to discover through a lightweight country-based viewing experience.',
    image: '/projects/StreamPkLive.png',
    aspectRatio: '1919 / 940',
    tags: ['Vite', 'React', 'IPTV', 'Live TV'],
    featured: false,
  },
  {
    title: 'Rice Mill Export Platform',
    type: 'B2B export website',
    description: 'A polished product and company platform for a rice export business, designed to make product quality, categories, and inquiry paths easy to understand.',
    outcome: 'Premium brand presence with product discovery and cart-ready structure.',
    image: '/projects/saqibricemill.png',
    aspectRatio: '1908 / 947',
    tags: ['Next.js', 'Firebase', 'Product catalog', 'B2B'],
    featured: true,
  },
  {
    title: 'Aura-QX SMC Tool',
    type: 'Fintech analysis interface',
    description: 'A market-analysis interface organized around Smart Money Concepts, with emphasis on clear data states and decision support.',
    outcome: 'Turns complex trading logic into a more readable dashboard experience.',
    image: '/projects/aurasmc.png',
    aspectRatio: '1349 / 948',
    tags: ['Fintech UI', 'Dashboard', 'Logic', 'Realtime'],
    featured: false,
  },
  {
    title: 'Smoke Time Storefront',
    type: 'Lifestyle e-commerce',
    description: 'A product-led storefront with inventory thinking, cart flow, and a distinctive visual identity for a niche retail brand.',
    outcome: 'A memorable shop experience with practical buyer flow.',
    image: '/projects/smoketime.png',
    aspectRatio: '1743 / 932',
    tags: ['React', 'Cart', 'Inventory', 'Retail'],
    featured: false,
  },
  {
    title: 'Sammar Fabrics Store',
    type: 'Luxury fabric shop',
    description: 'A premium online catalog for unstitched fabrics with product details, structured categories, and a polished fashion-store feel.',
    outcome: 'Makes high-value fabric products easier to browse and compare.',
    image: '/projects/sammarfabrics.png',
    aspectRatio: '1901 / 932',
    tags: ['E-commerce', 'Catalog', 'Luxury UI', 'Products'],
    featured: true,
  },
  {
    title: 'Luxe Apparel',
    type: 'Minimal D2C storefront',
    description: 'A clean apparel storefront focused on product drops, fabric details, and a focused shopping experience.',
    outcome: 'Minimal interface that keeps attention on product quality.',
    image: '/projects/luxeapparel.png',
    aspectRatio: '1912 / 908',
    tags: ['D2C', 'Product pages', 'Responsive UI'],
    featured: false,
  },
  {
    title: 'Restaurant Admin System',
    type: 'Business admin panel',
    description: 'A ready-made restaurant management interface for menu updates, images, and Firebase-backed content changes.',
    outcome: 'Gives owners a practical way to manage menu content without developer help.',
    image: '/projects/restaurant.png',
    aspectRatio: '1562 / 935',
    tags: ['Firebase', 'Admin panel', 'CRUD', 'Realtime'],
    featured: false,
  },
  {
    title: 'Stickman Fighting Game',
    type: 'Game logic project',
    description: 'A physics-based university game project focused on movement, collision logic, game state, and playable mechanics.',
    outcome: 'Placed 2nd in a university project competition.',
    image: '/projects/stickman.png',
    aspectRatio: '686 / 378',
    tags: ['Game logic', 'Physics', 'JavaScript'],
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-16 md:py-24 relative z-10 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm font-bold uppercase text-cyan-700">Selected work</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-950">
              Project examples across AI, web apps, commerce, media, and interactive systems.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Each project highlights the product idea, the interface direction, the tech involved, and the practical value of the build.
            </p>
          </motion.div>
          <a
            href="#contact"
            className="text-slate-700 hover:text-slate-950 flex items-center gap-2 font-bold transition-colors group"
          >
            Discuss a project <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`group rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.04] overflow-hidden ${
                project.featured ? 'md:col-span-2' : ''
              }`}
            >
              <div
                className="relative w-full overflow-hidden bg-slate-100"
                style={{ aspectRatio: project.aspectRatio }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes={project.featured ? '(min-width: 768px) 1120px, calc(100vw - 2rem)' : '(min-width: 768px) 50vw, calc(100vw - 2rem)'}
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 sm:p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">{project.type}</span>
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-950">
                  {project.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{project.description}</p>
                <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  {project.outcome}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
