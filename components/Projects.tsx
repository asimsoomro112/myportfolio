'use client';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultProjects = [
  {
    title: 'Blueprint AI',
    type: 'AI-Assisted Interface Generator',
    description: 'An AI-powered workflow that converts unstructured layout sketches into structured, usable Next.js website concepts using the Gemini API.',
    outcome: 'Automates early-stage UI generation, accelerating the transition from idea to prototype.',
    image: '/projects/BlueprintAi.png',
    aspectRatio: '1909 / 942',
    tags: ['Gemini API', 'AI Workflow', 'Next.js', 'LLM Integration'],
    featured: true,
  },
  {
    title: 'OrthoAI',
    type: 'Computer Vision & AI Workflow',
    description: 'A data-driven Python workflow and computer vision prototype leveraging a YOLOv7 model for fracture detection in medical imagery.',
    outcome: 'Demonstrates applied AI model integration and data processing pipelines for image analysis.',
    image: '/projects/OrthoAi.png',
    aspectRatio: '1432 / 710',
    tags: ['Python', 'YOLOv7', 'Computer Vision', 'Data Processing'],
    featured: false,
  },
  {
    title: 'Revault',
    type: 'Full-Stack Escrow Platform',
    description: 'A structured marketplace platform featuring separate role-based flows (admin, seller, customer) and escrow-style transaction handling logic.',
    outcome: 'Provides a robust, trust-driven transaction architecture and secure state management.',
    image: '/projects/Revault.png',
    aspectRatio: '1919 / 942',
    tags: ['Next.js', 'Full-Stack Architecture', 'State Management', 'Role-Based UI'],
    featured: true,
  },
  {
    title: 'Restaurant Admin System',
    type: 'Database-Backed Admin Dashboard',
    description: 'A data management interface featuring CRUD operations, image handling, and real-time content updates backed by Firebase.',
    outcome: 'Delivers a reliable data pipeline for business owners to manage inventory and content dynamically.',
    image: '/projects/restaurant.png',
    aspectRatio: '1562 / 935',
    tags: ['Firebase', 'Database', 'Admin Panel', 'RESTful Patterns'],
    featured: false,
  },
  {
    title: 'Rice Mill Export Platform',
    type: 'B2B Catalog & Inquiry System',
    description: 'A production-ready product catalog system supporting structured categories and automated inquiry routing.',
    outcome: 'Optimized frontend architecture with dynamic routing for a seamless B2B user experience.',
    image: '/projects/saqibricemill.png',
    aspectRatio: '1908 / 947',
    tags: ['Next.js', 'Firebase', 'Data Modeling', 'Frontend Architecture'],
    featured: true,
  },
  {
    title: 'Aura-QX SMC Tool',
    type: 'Financial Data Dashboard',
    description: 'A real-time logic interface that organizes complex trading data concepts into a readable dashboard for decision support.',
    outcome: 'Focuses on complex state management and high-performance rendering of dynamic data.',
    image: '/projects/aurasmc.png',
    aspectRatio: '1349 / 948',
    tags: ['Dashboard', 'Data Visualization', 'React', 'Realtime Logic'],
    featured: false,
  },
  {
    title: 'StreamPK Live',
    type: 'Media Streaming Interface',
    description: 'A live media platform aggregating public IPTV sources into a fast, country-based browsing interface.',
    outcome: 'Highlights efficient data fetching and state handling in a Vite React environment.',
    image: '/projects/StreamPkLive.png',
    aspectRatio: '1919 / 940',
    tags: ['Vite', 'React', 'API Integration', 'Data Fetching'],
    featured: false,
  },
  {
    title: 'Sammar Fabrics Store',
    type: 'E-Commerce Platform',
    description: 'A structured product catalog with category management and optimized frontend performance.',
    outcome: 'Delivers a reliable e-commerce interface with clean component architecture.',
    image: '/projects/sammarfabrics.png',
    aspectRatio: '1901 / 932',
    tags: ['E-Commerce', 'Frontend', 'React', 'Responsive UI'],
    featured: true,
  },
  {
    title: 'Smoke Time Storefront',
    type: 'Retail E-Commerce',
    description: 'A product-led storefront featuring inventory thinking and custom cart state management.',
    outcome: 'Demonstrates scalable component design and shopping cart data flow.',
    image: '/projects/smoketime.png',
    aspectRatio: '1743 / 932',
    tags: ['React', 'Cart Logic', 'State Management'],
    featured: false,
  },
  {
    title: 'Luxe Apparel',
    type: 'D2C Storefront',
    description: 'A clean, minimal frontend architecture optimized for product drops and fast load times.',
    outcome: 'Prioritizes UI/UX precision and responsive design systems.',
    image: '/projects/luxeapparel.png',
    aspectRatio: '1912 / 908',
    tags: ['Frontend', 'UI Engineering', 'Performance'],
    featured: false,
  },
  {
    title: 'Stickman Fighting Game',
    type: 'JavaScript Logic Engine',
    description: 'A university project exploring physics mechanics, collision detection, and complex state handling in JavaScript.',
    outcome: 'Solidified foundational understanding of JavaScript execution and game loops.',
    image: '/projects/stickman.png',
    aspectRatio: '686 / 378',
    tags: ['JavaScript', 'Physics Logic', 'State Handling'],
    featured: false,
  }
];

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        if (data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects from Firebase. Falling back to default data.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
