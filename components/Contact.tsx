'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Send, CheckCircle2, Phone } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side text */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-white mb-6">Let&apos;s build <br/><span className="text-transparent bg-clip-text bg-gradient-brand">the future.</span></h2>
              <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-md">
                Ready to launch your next premium project? Starting from $50 with 48h delivery available for ready-made solutions.
              </p>
              
              <div className="space-y-6">
                <a href="mailto:soomroasim77@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-lg">soomroasim77@gmail.com</span>
                </a>
                
                <a href="tel:03191278505" className="flex items-center gap-4 text-slate-300 hover:text-purple-400 transition-colors group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-lg">03191278505</span>
                </a>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-lg">Karachi, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <motion.div 
               initial={{ opacity: 0, x: 20, rotateY: -10 }}
               whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
               viewport={{ once: true }}
               transition={{ type: 'spring', damping: 25, stiffness: 100 }}
               className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group border-cyan-500/20"
            >
              <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-1000 blur-3xl pointer-events-none" />
              {submitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400">I&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium ml-2">Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium ml-2">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium ml-2">Project Details</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-base text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none font-sans"
                      placeholder="Tell me about what you want to build..."
                    />
                  </div>
                  <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors group">
                    Send Transmission <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
         </div>
      </div>
    </section>
  );
}
