import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-heading font-bold text-2xl tracking-tighter mb-2">
             Muhammad Asim<span className="text-cyan-400">.</span>
          </div>
          <p className="text-sm text-slate-500">
            Premium Developer based in Karachi, PK<br/>© 2026 Muhammad Asim. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:text-cyan-400 transition-all text-slate-400">
             <Github className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:text-purple-400 transition-all text-slate-400">
             <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:text-amber-400 transition-all text-slate-400">
             <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
