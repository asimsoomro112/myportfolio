import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white/70 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-heading font-bold text-2xl text-slate-950 mb-2">
            Muhammad Asim<span className="text-cyan-600">.</span>
          </div>
          <p className="text-sm text-slate-500 text-center md:text-left">
            Software Engineer based in Karachi, Pakistan<br />© 2026 Muhammad Asim. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all text-slate-600" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all text-slate-600" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all text-slate-600" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
