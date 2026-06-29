'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative z-10 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold uppercase text-cyan-700">Contact</p>
              <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-slate-950">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Send a short brief about your business, the pages or features you need, and your preferred timeline. I can help with new builds, redesigns, and Firebase-backed admin systems.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:soomroasim77@gmail.com" className="flex items-center gap-4 text-slate-700 hover:text-cyan-700 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cyan-700" />
                </div>
                <span className="min-w-0 break-all text-base sm:text-lg font-semibold">soomroasim77@gmail.com</span>
              </a>

              <a href="tel:03191278505" className="flex items-center gap-4 text-slate-700 hover:text-cyan-700 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-cyan-700" />
                </div>
                <span className="min-w-0 text-base sm:text-lg font-semibold">03191278505</span>
              </a>

              <div className="flex items-center gap-4 text-slate-700">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-cyan-700" />
                </div>
                <span className="min-w-0 text-base sm:text-lg font-semibold">Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            className="glass-panel p-5 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden"
          >
            {submitted ? (
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-700" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-950">Message ready</h3>
                <p className="text-slate-600">Thanks. I&apos;ll get back to you with next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 font-semibold ml-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all font-sans"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 font-semibold ml-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all font-sans"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 font-semibold ml-1">Project brief</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all resize-none font-sans"
                    placeholder="Tell me what you want to build, redesign, or automate..."
                  />
                </div>
                <button type="submit" className="w-full bg-slate-950 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                  Send Project Brief <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
