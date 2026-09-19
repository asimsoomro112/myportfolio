import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Journal from '@/components/Journal';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import BackgroundGlow from '@/components/BackgroundGlow';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F6F8FB] text-slate-950 selection:bg-cyan-200">
      <SplashScreen />
      <BackgroundGlow />

      <div className="relative z-10 font-sans">
        <Navbar />
        <Hero />
        <About />
        <Experience />
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
