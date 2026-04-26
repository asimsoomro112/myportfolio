'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

export default function BackgroundGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 1000 });
  
  // Smooth out the movement using spring physics
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    queueMicrotask(() => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
      smoothX.set(window.innerWidth / 2);
      smoothY.set(window.innerHeight / 2);
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [smoothX, smoothY]);

  // Create 3D parallax rotations based on mouse position
  const rotateX = useTransform(smoothY, [0, windowSize.h], [10, -10]);
  const rotateY = useTransform(smoothX, [0, windowSize.w], [-10, 10]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1500px' }}>
      <motion.div 
        style={{ rotateX, rotateY }} 
        className="absolute inset-0 w-[110vw] h-[110vh] -left-[5vw] -top-[5vh] origin-center shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen transition-opacity duration-1000"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
          </video>
          {/* Fallback Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/40 via-[#0A0F1C]/60 to-[#0A0F1C]/90" />
      </motion.div>

      {/* Static ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[150px]" />
      
      {/* Interactive mouse glow */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-[120px] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
    </div>
  );
}
