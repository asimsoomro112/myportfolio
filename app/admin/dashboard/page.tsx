'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Loader2, Plus, Edit2, Trash2, LogOut, X } from 'lucide-react';

type Project = {
  id?: string;
  title: string;
  type: string;
  description: string;
  outcome: string;
  image: string;
  aspectRatio: string;
  tags: string[];
  featured: boolean;
  liveLink?: string;
  images?: string[];
  problem?: string;
  solution?: string;
  result?: string;
};

type Experience = {
  id?: string;
  role: string;
  company: string;
  duration: string;
  description: string;
};

const defaultProjectsData = [
  {
    title: 'Blueprint AI',
    type: 'AI-Assisted Interface Generator',
    description: 'An AI-powered workflow that converts unstructured layout sketches into structured, usable Next.js website concepts using the Gemini API.',
    outcome: 'Automates early-stage UI generation, accelerating the transition from idea to prototype.',
    image: '/projects/BlueprintAi.png',
    images: ['/projects/BlueprintAi.png'],
    aspectRatio: '1909 / 942',
    tags: ['Gemini API', 'AI Workflow', 'Next.js', 'LLM Integration'],
    featured: true,
  },
  {
    title: 'OrthoAI',
    type: 'Computer Vision & AI Workflow',
    description: 'A data-driven Python workflow and computer vision prototype leveraging a YOLOv7 model for fracture detection in medical imagery.',
    outcome: 'Demonstrates applied AI model integration and data processing pipelines for image analysis.',
    image: '/projects/OrthoAi.png',
    images: ['/projects/OrthoAi.png'],
    aspectRatio: '1432 / 710',
    tags: ['Python', 'YOLOv7', 'Computer Vision', 'Data Processing'],
    featured: false,
  },
  {
    title: 'Revault',
    type: 'Full-Stack Escrow Platform',
    description: 'A structured marketplace platform featuring separate role-based flows (admin, seller, customer) and escrow-style transaction handling logic.',
    outcome: 'Provides a robust, trust-driven transaction architecture and secure state management.',
    image: '/projects/Revault.png',
    images: ['/projects/Revault.png'],
    aspectRatio: '1919 / 942',
    tags: ['Next.js', 'Full-Stack Architecture', 'State Management', 'Role-Based UI'],
    featured: true,
  },
  {
    title: 'Restaurant Admin System',
    type: 'Database-Backed Admin Dashboard',
    description: 'A data management interface featuring CRUD operations, image handling, and real-time content updates backed by Firebase.',
    outcome: 'Delivers a reliable data pipeline for business owners to manage inventory and content dynamically.',
    image: '/projects/restaurant.png',
    images: ['/projects/restaurant.png'],
    aspectRatio: '1562 / 935',
    tags: ['Firebase', 'Database', 'Admin Panel', 'RESTful Patterns'],
    featured: false,
  },
  {
    title: 'Rice Mill Export Platform',
    type: 'B2B Catalog & Inquiry System',
    description: 'A production-ready product catalog system supporting structured categories and automated inquiry routing.',
    outcome: 'Optimized frontend architecture with dynamic routing for a seamless B2B user experience.',
    image: '/projects/saqibricemill.png',
    images: ['/projects/saqibricemill.png'],
    aspectRatio: '1908 / 947',
    tags: ['Next.js', 'Firebase', 'Data Modeling', 'Frontend Architecture'],
    featured: true,
  },
  {
    title: 'Aura-QX SMC Tool',
    type: 'Financial Data Dashboard',
    description: 'A real-time logic interface that organizes complex trading data concepts into a readable dashboard for decision support.',
    outcome: 'Focuses on complex state management and high-performance rendering of dynamic data.',
    image: '/projects/aurasmc.png',
    images: ['/projects/aurasmc.png'],
    aspectRatio: '1349 / 948',
    tags: ['Dashboard', 'Data Visualization', 'React', 'Realtime Logic'],
    featured: false,
  },
  {
    title: 'StreamPK Live',
    type: 'Media Streaming Interface',
    description: 'A live media platform aggregating public IPTV sources into a fast, country-based browsing interface.',
    outcome: 'Highlights efficient data fetching and state handling in a Vite React environment.',
    image: '/projects/StreamPkLive.png',
    images: ['/projects/StreamPkLive.png'],
    aspectRatio: '1919 / 940',
    tags: ['Vite', 'React', 'API Integration', 'Data Fetching'],
    featured: false,
  },
  {
    title: 'Sammar Fabrics Store',
    type: 'E-Commerce Platform',
    description: 'A structured product catalog with category management and optimized frontend performance.',
    outcome: 'Delivers a reliable e-commerce interface with clean component architecture.',
    image: '/projects/sammarfabrics.png',
    images: ['/projects/sammarfabrics.png'],
    aspectRatio: '1901 / 932',
    tags: ['E-Commerce', 'Frontend', 'React', 'Responsive UI'],
    featured: true,
  },
  {
    title: 'Smoke Time Storefront',
    type: 'Retail E-Commerce',
    description: 'A product-led storefront featuring inventory thinking and custom cart state management.',
    outcome: 'Demonstrates scalable component design and shopping cart data flow.',
    image: '/projects/smoketime.png',
    images: ['/projects/smoketime.png'],
    aspectRatio: '1743 / 932',
    tags: ['React', 'Cart Logic', 'State Management'],
    featured: false,
  },
  {
    title: 'Luxe Apparel',
    type: 'D2C Storefront',
    description: 'A clean, minimal frontend architecture optimized for product drops and fast load times.',
    outcome: 'Prioritizes UI/UX precision and responsive design systems.',
    image: '/projects/luxeapparel.png',
    images: ['/projects/luxeapparel.png'],
    aspectRatio: '1912 / 908',
    tags: ['Frontend', 'UI Engineering', 'Performance'],
    featured: false,
  },
  {
    title: 'Stickman Fighting Game',
    type: 'JavaScript Logic Engine',
    description: 'A university project exploring physics mechanics, collision detection, and complex state handling in JavaScript.',
    outcome: 'Solidified foundational understanding of JavaScript execution and game loops.',
    image: '/projects/stickman.png',
    images: ['/projects/stickman.png'],
    aspectRatio: '686 / 378',
    tags: ['JavaScript', 'Physics Logic', 'State Handling'],
    featured: false,
  }
];

const defaultExperienceData = [
  {
    role: "Full-Stack Engineer, AI-Assisted Product Development",
    company: "Freelance / Personal Projects",
    duration: "2023 - Present",
    description: "Architected and built full-stack applications (Next.js, Firebase, React) integrating AI workflows (Gemini API) and computer vision models (YOLOv7). Developed secure escrow platforms, data-driven dashboards, and robust e-commerce solutions with a strong focus on UI/UX, backend integration, and state management."
  },
  {
    role: "Frontend Developer",
    company: "Various Clients",
    duration: "2022 - 2023",
    description: "Delivered responsive, high-performance web applications using React and Next.js. Engineered optimized product catalogs, media streaming interfaces, and B2B inquiry routing systems, prioritizing clean component architecture and fast load times."
  }
];

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'messages'>('projects');
  
  // Messages State
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '', type: '', description: '', outcome: '', image: '', images: [], liveLink: '', aspectRatio: '16 / 9', tags: [], featured: false, problem: '', solution: '', result: ''
  });
  const [tagsInput, setTagsInput] = useState('');
  
  // Image Upload State
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Experience State
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isExpEditing, setIsExpEditing] = useState(false);
  const [expEditingId, setExpEditingId] = useState<string | null>(null);
  const [expFormData, setExpFormData] = useState<Experience>({
    role: '', company: '', duration: '', description: ''
  });
  
  // Seeding state
  const [seeding, setSeeding] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
        fetchProjects();
        fetchExperiences();
        fetchMessages();
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchProjects = async () => {
    setLoadingData(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data: Project[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "experience"));
      const data: Experience[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Experience);
      });
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      // Sort by latest first
      data.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleEdit = (project: Project) => {
    setIsEditing(true);
    setEditingId(project.id!);
    // Migrate old 'image' to 'images' array for editing if 'images' doesn't exist
    const projectImages = project.images || (project.image ? [project.image] : []);
    setFormData({ ...project, images: projectImages, liveLink: project.liveLink || '', problem: project.problem || '', solution: project.solution || '', result: project.result || '' });
    setTagsInput(project.tags.join(', '));
    setImageFiles([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Delete this message?')) {
      await deleteDoc(doc(db, "messages", id));
      fetchMessages();
    }
  };

  const handleMarkRead = async (id: string, currentReadStatus: boolean) => {
    await updateDoc(doc(db, "messages", id), { read: !currentReadStatus });
    fetchMessages();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let newImageUrls: string[] = [];

    if (imageFiles.length > 0) {
      try {
        const uploadPromises = imageFiles.map(async (file) => {
          const uploadData = new FormData();
          uploadData.append('file', file);
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: uploadData,
          });
          const data = await res.json();
          return data.url;
        });
        const results = await Promise.all(uploadPromises);
        newImageUrls = results.filter(url => url);
      } catch (error) {
        console.error("Upload error:", error);
        alert('Some images failed to upload.');
      }
    }

    const finalImages = [...(formData.images || []), ...newImageUrls];

    const projectData = {
      ...formData,
      image: finalImages.length > 0 ? finalImages[0] : '', // Keep main image for backward compatibility
      images: finalImages,
      tags: tagsInput.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    try {
      if (isEditing && editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
      } else {
        await addDoc(collection(db, "projects"), projectData);
      }
      setIsEditing(false);
      setEditingId(null);
      setFormData({ title: '', type: '', description: '', outcome: '', image: '', images: [], liveLink: '', aspectRatio: '16 / 9', tags: [], featured: false, problem: '', solution: '', result: '' });
      setTagsInput('');
      setImageFiles([]);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert('Error saving project. Make sure Firestore rules are set to allow writes for authenticated users.');
    } finally {
      setUploading(false);
    }
  };

  const handleSeedData = async () => {
    if (!confirm('This will upload all default projects and experiences to your live database. Proceed?')) return;
    setSeeding(true);
    try {
      for (const proj of defaultProjectsData) {
        await addDoc(collection(db, "projects"), proj);
      }
      for (const exp of defaultExperienceData) {
        await addDoc(collection(db, "experience"), exp);
      }
      alert('Default data seeded successfully!');
      fetchProjects();
      fetchExperiences();
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Failed to seed data.');
    } finally {
      setSeeding(false);
    }
  };

  const handleExpEdit = (exp: Experience) => {
    setIsExpEditing(true);
    setExpEditingId(exp.id!);
    setExpFormData(exp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExpDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      await deleteDoc(doc(db, "experience", id));
      fetchExperiences();
    }
  };

  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isExpEditing && expEditingId) {
        await updateDoc(doc(db, "experience", expEditingId), expFormData as any);
      } else {
        await addDoc(collection(db, "experience"), expFormData);
      }
      setIsExpEditing(false);
      setExpEditingId(null);
      setExpFormData({ role: '', company: '', duration: '', description: '' });
      fetchExperiences();
    } catch (error) {
      console.error("Error saving experience:", error);
      alert('Error saving experience.');
    }
  };

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-900">Dashboard</h1>
          <p className="text-slate-500 font-medium">Welcome back, {user?.email}</p>
        </div>
        <div className="flex gap-2">
          {projects.length === 0 && (
            <button onClick={handleSeedData} disabled={seeding} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-colors flex items-center gap-2">
              {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Seed Default Data'}
            </button>
          )}
          <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl shadow-sm transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-3 font-semibold px-2 border-b-2 transition-colors ${activeTab === 'projects' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Manage Projects
        </button>
        <button 
          onClick={() => setActiveTab('experience')}
          className={`pb-3 font-semibold px-2 border-b-2 transition-colors ${activeTab === 'experience' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Manage Experience
        </button>
        <button 
          onClick={() => setActiveTab('messages')}
          className={`pb-3 font-semibold px-2 border-b-2 transition-colors ${activeTab === 'messages' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Inbox Messages
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
              Project List
              {loadingData && <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />}
            </h2>
            <div className="space-y-4">
              {projects.length === 0 && !loadingData && (
                <p className="text-slate-500">No projects found in Firebase. Add one to see it here.</p>
              )}
              {projects.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h3 className="font-bold text-slate-900">{p.title} {p.featured && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full ml-2">Featured</span>}</h3>
                    <p className="text-sm text-slate-500">{p.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(p)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-cyan-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id!)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Type (e.g. AI Workflow)</label>
                <input type="text" required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Outcome</label>
                <input type="text" required value={formData.outcome} onChange={e => setFormData({...formData, outcome: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Case Study Details (Markdown Supported)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">The Problem</label>
                    <textarea rows={4} value={formData.problem} onChange={e => setFormData({...formData, problem: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm font-mono"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">The Solution</label>
                    <textarea rows={4} value={formData.solution} onChange={e => setFormData({...formData, solution: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm font-mono"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">The Result</label>
                    <textarea rows={4} value={formData.result} onChange={e => setFormData({...formData, result: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm font-mono"></textarea>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Live Project URL (Optional)</label>
                <input type="url" value={formData.liveLink || ''} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" placeholder="https://" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Images</label>
                {(formData.images?.length! > 0 || imageFiles.length > 0) && (
                  <div className="flex flex-wrap gap-3 mb-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    {formData.images?.map((img, idx) => (
                      <div key={`existing-${idx}`} className="relative group">
                        <img src={img} alt={`Preview ${idx}`} className="h-16 w-24 rounded-lg object-cover border border-slate-200 shadow-sm" />
                        <button type="button" onClick={() => setFormData({...formData, images: formData.images!.filter((_, i) => i !== idx)})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {imageFiles.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative group">
                        <div className="h-16 w-24 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] text-slate-500 overflow-hidden text-center p-2 shadow-sm">
                          <span className="truncate w-full">{file.name}</span>
                        </div>
                        <button type="button" onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  multiple
                  onChange={e => {
                    if (e.target.files) {
                      setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
                    }
                  }} 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-cyan-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" 
                />
                <p className="text-xs text-slate-400 mt-2">You can select multiple images. The first image will be used as the cover.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Aspect Ratio (e.g. 16 / 9)</label>
                <input type="text" required value={formData.aspectRatio} onChange={e => setFormData({...formData, aspectRatio: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                <input type="text" required value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                <label htmlFor="featured" className="text-sm font-bold text-slate-700">Featured (Spans 2 columns)</label>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" disabled={uploading} className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? 'Update Project' : <><Plus className="w-4 h-4" /> Add Project</>)}
                </button>
                {isEditing && (
                  <button type="button" disabled={uploading} onClick={() => { setIsEditing(false); setEditingId(null); setFormData({ title: '', type: '', description: '', outcome: '', image: '', images: [], liveLink: '', aspectRatio: '16 / 9', tags: [], featured: false, problem: '', solution: '', result: '' }); setTagsInput(''); setImageFiles([]); }} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-slate-900">{isExpEditing ? 'Edit Experience' : 'Add New Experience'}</h2>
          
          <form onSubmit={handleExpSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                <input type="text" required value={expFormData.role} onChange={e => setExpFormData({...expFormData, role: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors" placeholder="e.g. Frontend Engineer" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
                <input type="text" required value={expFormData.company} onChange={e => setExpFormData({...expFormData, company: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors" placeholder="e.g. Google" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                <input type="text" required value={expFormData.duration} onChange={e => setExpFormData({...expFormData, duration: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors" placeholder="e.g. 2021 - Present" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea rows={4} required value={expFormData.description} onChange={e => setExpFormData({...expFormData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors resize-none" placeholder="What did you do?" />
            </div>

            <div className="pt-2 flex gap-2">
              <button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex justify-center items-center gap-2">
                {isExpEditing ? 'Update Experience' : <><Plus className="w-4 h-4" /> Add Experience</>}
              </button>
              {isExpEditing && (
                <button type="button" onClick={() => { setIsExpEditing(false); setExpEditingId(null); setExpFormData({ role: '', company: '', duration: '', description: '' }); }} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>

          <hr className="my-10 border-slate-100" />
          
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-slate-900">Current Experiences</h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{exp.role}</h3>
                  <p className="text-sm text-cyan-700 font-semibold">{exp.company} • {exp.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleExpEdit(exp)} className="p-2 text-slate-500 hover:text-cyan-600 bg-white border border-slate-200 hover:border-cyan-200 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleExpDelete(exp.id!)} className="p-2 text-slate-500 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {experiences.length === 0 && !loadingData && (
              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p>No experiences found.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
            Inbox Messages
            {loadingMessages && <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />}
          </h2>
          <div className="space-y-4">
            {messages.length === 0 && !loadingMessages && (
              <p className="text-slate-500">No messages yet. When someone fills the contact form, it will appear here.</p>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`p-4 border rounded-xl ${msg.read ? 'bg-slate-50 border-slate-200' : 'bg-white border-cyan-200 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      {msg.name}
                      {!msg.read && <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-0.5 rounded-full">New</span>}
                    </h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-cyan-600 hover:underline">{msg.email}</a>
                  </div>
                  <div className="text-xs text-slate-400">
                    {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                  </div>
                </div>
                <p className="text-slate-700 text-sm mt-3 whitespace-pre-wrap p-3 bg-slate-50 rounded-lg border border-slate-100">{msg.message}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => handleMarkRead(msg.id, msg.read)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors">
                    {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <button onClick={() => handleDeleteMessage(msg.id)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-100 bg-red-50 hover:bg-red-100 text-red-600 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
