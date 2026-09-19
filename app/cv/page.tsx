'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

const cssContent = `
:root {
    --bg: #ffffff;
    --surface: #f8fafc;
    --surface2: #f1f5f9;
    --border: #e2e8f0;
    --border2: #cbd5e1;
    --cyan: #0891b2;
    --text: #1e293b;
    --text-dim: #64748b;
    --text-mid: #475569;
    --radius: 12px;
    --radius-sm: 8px;
}

@media screen {
    body.dark-theme {
        --bg: #070B14;
        --surface: #0D1321;
        --surface2: #111827;
        --border: rgba(255, 255, 255, 0.07);
        --border2: rgba(0, 245, 255, 0.15);
        --cyan: #00F5FF;
        --text: #E2E8F0;
        --text-dim: #64748B;
        --text-mid: #94A3B8;
    }
}

.cv-page {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    font-size: 14px;
    padding: 20px;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    overflow-x: auto;
}

.cv {
    width: 900px;
    margin: 0 auto;
}

.header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 30px;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 2px solid var(--border);
}

.profile-img {
    width: 140px;
    height: 140px;
    border-radius: var(--radius);
    object-fit: cover;
    border: 1px solid var(--border2);
}

.header-name {
    font-family: 'Syne', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 5px;
}

.header-name span {
    color: var(--cyan);
}

.header-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: var(--cyan);
    font-weight: 600;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.c-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-mid);
    font-size: 13px;
    text-decoration: none;
}

.c-item i {
    color: var(--cyan);
    width: 14px;
    text-align: center;
}

.body-grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 30px;
}

.section {
    margin-bottom: 30px;
}

.sec-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.sec-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
}

.sec-title i {
    color: var(--cyan);
    font-size: 16px;
}

.about-text {
    color: var(--text-mid);
    margin-bottom: 20px;
}

.project {
    margin-bottom: 20px;
    padding: 15px;
    background: var(--surface);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
}

.proj-name {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 5px;
    color: var(--text);
}

.proj-desc {
    font-size: 13px;
    color: var(--text-dim);
    margin-bottom: 10px;
}

.tech-row {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.tech {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 2px 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text-mid);
    border-radius: 4px;
}

.skill-group {
    margin-bottom: 20px;
}

.skill-group-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 10px;
}

.skill-item {
    font-size: 13px;
    color: var(--text-mid);
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.skill-item::before {
    content: '•';
    color: var(--cyan);
    font-weight: bold;
}

.edu-block {
    margin-bottom: 15px;
}

.edu-deg {
    font-weight: 700;
    color: var(--text);
}

.edu-school {
    font-size: 12px;
    color: var(--text-mid);
}



@media print {
    @page {
        size: A4 portrait;
        margin: 10mm 12mm 12mm 12mm;
    }

    html, body {
        overflow: visible !important;
        overflow-x: visible !important;
        height: auto !important;
        min-height: auto !important;
        background: #ffffff !important;
        color: #1e293b !important;
    }

    .cv-page {
        padding: 0 !important;
        margin: 0 !important;
        background: #ffffff !important;
        overflow: visible !important;
        overflow-x: visible !important;
        min-height: auto !important;
        height: auto !important;
        width: 100% !important;
    }

    .cv {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .body-grid {
        display: grid !important;
        grid-template-columns: 1fr 260px !important;
        gap: 24px !important;
    }

    .sidebar {
        width: 260px !important;
    }

    .header {
        border-bottom: 2px solid #000;
        margin-bottom: 20px;
        padding-bottom: 20px;
    }

    .sec-title::after {
        background: #cbd5e1;
    }

    .project {
        break-inside: avoid;
        page-break-inside: avoid;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        margin-bottom: 14px;
        padding: 12px 14px;
    }

    .skill-group, .edu-block {
        break-inside: avoid;
        page-break-inside: avoid;
    }

    .sec-title {
        break-after: avoid;
        page-break-after: avoid;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .no-print {
        display: none !important;
    }

    nav, footer { display: none !important; }
}
`;

export default function CVPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inject FontAwesome for icons dynamically if not present
    if (!document.getElementById('fa-stylesheet')) {
      const link = document.createElement('link');
      link.id = 'fa-stylesheet';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
      document.head.appendChild(link);
    }

    const fetchData = async () => {
      try {
        const [projSnap, expSnap] = await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "experience"))
        ]);

        const projData: any[] = [];
        projSnap.forEach(doc => projData.push({ id: doc.id, ...doc.data() }));
        setProjects(projData);

        const expData: any[] = [];
        expSnap.forEach(doc => expData.push({ id: doc.id, ...doc.data() }));
        setExperiences(expData);
      } catch (err) {
        console.error("Error fetching CV data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="cv-page">
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
      <div className="cv">
        <div className="no-print mb-6">
           <button onClick={() => window.print()} className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 transition-colors">
              <i className="fa-solid fa-file-pdf mr-2"></i> Save as PDF
           </button>
        </div>

        <header className="header">
          <img src="/passport-size.png" alt="Muhammad Asim" className="profile-img" />
          <div className="header-info">
            <h1 className="header-name">Muhammad <span>Asim</span></h1>
            <p className="header-title">Software Engineer | Full-Stack & AI Product Development</p>
            <div className="contact-row">
              <span className="c-item"><i className="fa-solid fa-envelope"></i> soomroasim77@gmail.com</span>
              <span className="c-item"><i className="fa-solid fa-phone"></i> +92 319 1278505</span>
              <span className="c-item"><i className="fa-solid fa-location-dot"></i> Karachi, Pakistan</span>
              <span className="c-item"><i className="fa-brands fa-github"></i> github.com/asimsoomro112</span>
            </div>
          </div>
        </header>

        <div className="body-grid">
          <main>
            <section className="section">
              <h2 className="sec-title"><i className="fa-solid fa-user"></i> Professional Summary</h2>
              <p className="about-text">
                Software Engineer focused on building full-stack applications, AI-assisted workflows, automation systems, and data-driven products. Expertise in frontend architecture, database management, and integrating AI (LLMs, Computer Vision) to solve real-world problems. Proven ability to deliver scalable and reliable software interfaces.
              </p>
            </section>

            <section className="section">
              <h2 className="sec-title"><i className="fa-solid fa-briefcase"></i> Experience</h2>
              {experiences.length > 0 ? experiences.map(exp => (
                <div className="project" key={exp.id}>
                  <p className="proj-name">💼 {exp.role}</p>
                  <div className="tech-row mb-2">
                    <span className="tech">{exp.company}</span>
                    <span className="tech text-cyan-600 font-bold">{exp.duration}</span>
                  </div>
                  <p className="proj-desc">{exp.description}</p>
                </div>
              )) : (
                <p className="text-sm text-slate-500 italic">No experience entries found.</p>
              )}
            </section>

            <section className="section">
              <h2 className="sec-title"><i className="fa-solid fa-code"></i> Featured Projects</h2>
              {projects.filter(p => p.featured).length > 0 ? (
                projects.filter(p => p.featured).map(proj => (
                  <div className="project" key={proj.id}>
                    <p className="proj-name">🚀 {proj.title} — {proj.type}</p>
                    <p className="proj-desc">{proj.description}</p>
                    {proj.tags && proj.tags.length > 0 && (
                      <div className="tech-row">
                        {proj.tags.map((t: string) => (
                          <span className="tech" key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">No featured projects found.</p>
              )}
              
              <h3 className="font-bold text-slate-900 mt-6 mb-4 font-heading text-lg">Other Projects</h3>
              {projects.filter(p => !p.featured).length > 0 ? (
                projects.filter(p => !p.featured).map(proj => (
                  <div className="project" key={proj.id}>
                    <p className="proj-name">✨ {proj.title} — {proj.type}</p>
                    <p className="proj-desc">{proj.description}</p>
                    {proj.tags && proj.tags.length > 0 && (
                      <div className="tech-row">
                        {proj.tags.map((t: string) => (
                          <span className="tech" key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">No other projects found.</p>
              )}
            </section>
          </main>

          <aside className="sidebar">
            <section className="section">
              <h2 className="sec-title"><i className="fa-solid fa-wrench"></i> Skills</h2>
              <div className="skill-group">
                <p className="skill-group-title">Frontend</p>
                <p className="skill-item">Next.js & React</p>
                <p className="skill-item">JavaScript (ES6+)</p>
                <p className="skill-item">Tailwind CSS</p>
                <p className="skill-item">UI/UX Design</p>
              </div>
              <div className="skill-group">
                <p className="skill-group-title">Backend</p>
                <p className="skill-item">Firebase & Firestore</p>
                <p className="skill-item">Python</p>
                <p className="skill-item">REST APIs</p>
                <p className="skill-item">Data Validation</p>
              </div>
              <div className="skill-group">
                <p className="skill-group-title">AI & Specialization</p>
                <p className="skill-item">Gemini API / LLMs</p>
                <p className="skill-item">Computer Vision</p>
                <p className="skill-item">AI Workflows</p>
                <p className="skill-item">Data Pipelines</p>
              </div>
            </section>

            <section className="section">
              <h2 className="sec-title"><i className="fa-solid fa-graduation-cap"></i> Education</h2>
              <div className="edu-block">
                <p className="edu-deg">BS Software Engineering</p>
                <p className="edu-school">Sir Syed University (SSUET)</p>
                <p className="edu-school">7th Semester — In Progress</p>
              </div>
            </section>

            <section className="section">
              <h2 className="sec-title"><i className="fa-solid fa-award"></i> Awards</h2>
              <div className="edu-block">
                <p className="edu-deg">University Competition</p>
                <p className="edu-school">🏆 2nd Place — SE Dept.</p>
                <p className="edu-school">Stickman Fighting Game</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
