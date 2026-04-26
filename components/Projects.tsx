'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    title: "Rice Mill — Premium B2B Export",
    description: "A high-end industrial platform for global rice export. Features Emerald & Gold aesthetic, dynamic filtering, and shopping cart functionality.",
    image: "/projects/saqibricemill.png",
    tags: ["Next.js", "Firebase Firestore", "Emerald UI", "B2B Export"],
    featured: true
  },
  {
    title: "Aura-QX — Institutional Fintech",
    description: "Institutional-grade market analysis tool designed to automate Smart Money Concepts (SMC) for professional traders.",
    image: "/projects/aurasmc.png",
    tags: ["Fintech Logic", "SMC Automation", "Real-time", "V3 Engine"],
    featured: false
  },
  {
    title: "Smoke Time — Futuristic Lifestyle",
    description: "Cyberpunk aesthetic storefront featuring neon gradients and Orbitron typography. Includes dynamic cart and inventory logic.",
    image: "/projects/smoketime.png",
    tags: ["React/Next.js", "Cyberpunk UI", "Inventory Logic"],
    featured: false
  },
  {
    title: "Fabrics Store — Luxury Menswear",
    description: "Sophisticated 'Noir Luxury' E-commerce specializing in premium Pakistani unstitched fabrics with Black & Gold palette.",
    image: "/projects/sammarfabrics.png",
    tags: ["SPA Architecture", "Luxury UI", "Inventory Management"],
    featured: true
  },
  {
    title: "Luxe Apparel — Minimalist D2C",
    description: "Modern minimalist Direct-to-Consumer storefront with Brutalist Grey-scale aesthetics and technical fabric specs.",
    image: "/projects/luxeapparel.png",
    tags: ["Minimalist UI", "Product Drops", "Fabric Tech Specs"],
    featured: false
  },
  {
    title: "Restaurant Admin System",
    description: "Ready-made business solution with Firebase backend. Allows menu management and real-time image updates.",
    image: "/projects/restaurant.png",
    tags: ["Firebase", "Admin Dashboard", "Real-time DB"],
    featured: false
  },
  {
    title: "Stickman Fighting Game",
    description: "Award-winning physics-based game project. Ranked 2nd in University project competition for logic and mechanics.",
    image: "/projects/stickman.png",
    tags: ["Physics Engine", "Game Logic", "🏆 2nd Place Award"],
    featured: false
  }
];

function TiltCard({ children, featured }: { children: React.ReactNode, featured: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group block w-full relative rounded-[2rem] overflow-hidden ${featured ? 'lg:col-span-2' : ''}`}
    >
      <div 
        className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
        style={{ transform: "translateZ(50px)" }} 
      />
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-16 md:py-24 relative z-10" style={{ perspective: "2000px" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Featured Work</h2>
            <div className="w-20 h-1 bg-gradient-brand rounded-full" />
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors group"
          >
            View All Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {projects.map((project, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: i * 0.1 }}
               className={`group flex flex-col gap-6 ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <TiltCard featured={project.featured}>
                 <div className={`relative w-full ${project.featured ? 'h-[400px] md:h-[600px]' : 'h-[350px] md:h-[450px]'} rounded-[2rem] overflow-hidden border border-white/10`}>
                   <Image 
                     src={project.image} 
                     alt={project.title}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                     referrerPolicy="no-referrer"
                   />
                 </div>
              </TiltCard>

              <div className="flex flex-col gap-4 px-2">
                <div className="flex flex-wrap gap-2">
                   {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-mono font-medium text-cyan-400 border border-cyan-500/20 bg-cyan-500/5">
                         {tag}
                      </span>
                   ))}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-2 text-white font-bold hover:text-cyan-400 transition-colors group/btn">
                     View Case Study <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                     <Github className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
