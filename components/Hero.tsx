'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, BrainCircuit, ChevronDown, Code2, Gamepad2, Globe2, MapPin, MonitorPlay, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const proofPoints = [
  'Next.js / React',
  'Firebase / Firestore',
  'AI integrations',
  'Python workflows',
];

const projectSpectrum = [
  {
    title: 'AI tools',
    text: 'Gemini workflows, sketch-to-site ideas, and computer vision prototypes.',
    icon: BrainCircuit,
  },
  {
    title: 'Marketplaces',
    text: 'Seller, customer, admin, escrow, catalog, and checkout-style flows.',
    icon: ShieldCheck,
  },
  {
    title: 'Streaming apps',
    text: 'Country-based live channel browsing with fast React interfaces.',
    icon: MonitorPlay,
  },
  {
    title: 'Interactive logic',
    text: 'Game mechanics, dashboards, product systems, and custom UI states.',
    icon: Gamepad2,
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rx = useSpring(mouseY, { stiffness: 120, damping: 24 });
  const ry = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const rotateX = useTransform(rx, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(ry, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-28 pb-16 md:pt-28 md:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div className="flex flex-col items-start gap-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap gap-2"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Available for freelance
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/80 text-slate-700 text-xs font-bold uppercase">
                <MapPin className="w-3.5 h-3.5" />
                Karachi, PK
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-[620px]"
            >
              <div className="glass-panel rounded-3xl p-4 sm:p-5 lg:p-6 flex items-center gap-3 sm:gap-5">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  <Image
                    src="/passport-size.png"
                    alt="Muhammad Asim"
                    fill
                    sizes="(min-width: 1024px) 160px, 112px"
                    priority
                    className="object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="whitespace-nowrap text-xl sm:text-3xl lg:text-4xl font-heading font-bold text-slate-950">
                    Muhammad Asim
                  </h1>
                  <p className="mt-1 text-base sm:text-lg lg:text-xl font-semibold text-slate-700">Software Engineer</p>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Code2 className="w-3.5 h-3.5" />
                        Focus
                      </div>
                      <div className="mt-1 font-bold text-slate-900">Full-stack products</div>
                    </div>
                    <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-3">
                      <div className="flex items-center gap-1.5 text-cyan-700">
                        <Sparkles className="w-3.5 h-3.5" />
                        Delivery
                      </div>
                      <div className="mt-1 font-bold text-slate-900">Clean, usable UI</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-5 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl text-slate-900 font-bold leading-tight max-w-3xl"
              >
                I build websites, AI tools, dashboards, marketplaces, streaming apps, and interactive web experiences.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed"
              >
                My work covers polished frontends, Firebase-backed systems, AI workflows, marketplace logic, product catalogs, admin panels, live media interfaces, and gameplay-style interaction logic.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="#work"
                className="w-full sm:w-auto px-7 py-4 bg-slate-950 text-white rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-950/15"
              >
                View Work <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-4 glass rounded-full font-bold text-slate-800 hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                Start a Project
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="hidden sm:flex flex-wrap gap-2 pt-1"
            >
              {proofPoints.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="hidden lg:block"
          >
            <div className="glass-panel rounded-3xl p-6 xl:p-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase text-cyan-700">Project spectrum</p>
                  <h2 className="mt-2 text-3xl font-heading font-bold text-slate-950">
                    AI, web apps, media, commerce, and logic-heavy UI.
                  </h2>
                </div>
                <div className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-white">
                  <div className="text-2xl font-heading font-bold">11</div>
                  <div className="text-[10px] font-semibold uppercase text-slate-300">Projects</div>
                </div>
              </div>

              <div className="mt-7 grid gap-3">
                {projectSpectrum.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-white/72 p-4 flex gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4">
                  <ShoppingBag className="w-5 h-5 text-cyan-700" />
                  <div className="mt-2 text-sm font-bold text-slate-950">Stores</div>
                </div>
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                  <Globe2 className="w-5 h-5 text-emerald-700" />
                  <div className="mt-2 text-sm font-bold text-slate-950">Web apps</div>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <Code2 className="w-5 h-5 text-slate-700" />
                  <div className="mt-2 text-sm font-bold text-slate-950">Logic</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500 z-20"
      >
        <span className="text-xs uppercase font-semibold">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-cyan-600" />
      </motion.div>
    </section>
  );
}
