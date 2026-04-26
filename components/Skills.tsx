'use client';
import { motion } from 'motion/react';
import { Layout, Database, Wand2, TerminalSquare } from 'lucide-react';

const skills = [
  {
    category: "Full Stack Mastery",
    icon: Layout,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    items: ["Next.js & React Ecosystem", "JavaScript (ES6+) & Logic", "API Integration & Middleware", "Full Stack Architecture"]
  },
  {
    category: "Cloud Ecosystem",
    icon: Database,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    items: ["Firebase Firestore & Auth", "Database Management", "Real-time Data Systems", "Serverless Workflows"]
  },
  {
    category: "E-commerce Expert",
    icon: Wand2,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    items: ["Luxury Storefront Logic", "B2B Industrial Platforms", "Inventory Systems", "Ready-to-Deploy Solutions"]
  },
  {
    category: "Systems & Ops",
    icon: TerminalSquare,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    items: ["Business Automation Tools", "Android Development", "Modern UI/UX Design", "Performance Optimization"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">Technical Mastery</h2>
          <div className="w-20 h-1 bg-gradient-brand rounded-full mb-8" />
          <p className="text-slate-400 max-w-2xl text-lg">
            A specialized toolkit focused on delivering premium E-commerce solutions and automated industrial systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className={`glass-panel p-6 md:p-8 rounded-3xl border transition-all duration-500 hover:scale-[1.02] ${skill.borderColor} group`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${skill.bgColor} flex items-center justify-center transition-colors group-hover:bg-opacity-20`}>
                  <skill.icon className={`w-8 h-8 ${skill.color}`} />
                </div>
                <h3 className="text-2xl font-heading font-medium text-white">{skill.category}</h3>
              </div>
              
              <ul className="space-y-3">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors" />
                     {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
