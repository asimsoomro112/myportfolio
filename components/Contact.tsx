'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error sending message", error);
      alert("Failed to send message. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
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
                I am currently open to full-stack engineering and AI product development roles. If you&apos;re looking for an engineer who can own the frontend, manage the backend, and integrate AI systems, let&apos;s connect.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:soomroasim77@gmail.com" className="flex items-center gap-4 text-slate-700 hover:text-cyan-700 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-200 group-hover:bg-cyan-50 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-700" />
                </div>
                <span className="min-w-0 break-all text-base sm:text-lg font-semibold">soomroasim77@gmail.com</span>
              </a>
              
              <a href="https://www.linkedin.com/in/muhammad-asim-soomro-93909a436?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-700 hover:text-cyan-700 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-200 group-hover:bg-cyan-50 transition-colors">
                  <svg className="w-5 h-5 text-cyan-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <span className="min-w-0 text-base sm:text-lg font-semibold">LinkedIn Profile</span>
              </a>

              <a href="https://github.com/asimsoomro112" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-700 hover:text-cyan-700 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-200 group-hover:bg-cyan-50 transition-colors">
                  <svg className="w-5 h-5 text-cyan-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </div>
                <span className="min-w-0 text-base sm:text-lg font-semibold">GitHub (asimsoomro112)</span>
              </a>

              <div className="flex items-center gap-4 text-slate-700">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-200 group-hover:bg-cyan-50 transition-colors">
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
                <h3 className="text-2xl font-bold text-slate-950">Message sent</h3>
                <p className="text-slate-600">Thanks. I&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 font-semibold ml-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all font-sans"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 font-semibold ml-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all font-sans"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600 font-semibold ml-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all resize-none font-sans"
                    placeholder="Tell me what you want to build, redesign, or automate..."
                  />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-slate-950 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition-colors">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Message <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
