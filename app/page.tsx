import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Journal from '@/components/Journal';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackgroundGlow from '@/components/BackgroundGlow';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0F1C] text-slate-50 selection:bg-cyan-500/30">
      <BackgroundGlow />

      <div className="relative z-10 font-sans">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journal />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
