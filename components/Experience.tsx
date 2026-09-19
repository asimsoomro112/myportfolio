'use client';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'experience'));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experience', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, []);

  if (loading || experiences.length === 0) {
    return null; // Don't show the section if there's no data or it's loading.
  }

  return (
    <section id="experience" className="py-16 md:py-24 bg-slate-50 relative z-10 scroll-mt-24 md:scroll-mt-28 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-bold uppercase text-cyan-700 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Career
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-slate-950">
            Professional Experience
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id || i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="text-xl font-bold text-slate-950">{exp.role}</h3>
                <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
                  {exp.duration}
                </span>
              </div>
              <p className="text-cyan-700 font-bold mb-4">{exp.company}</p>
              <p className="text-slate-600 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
