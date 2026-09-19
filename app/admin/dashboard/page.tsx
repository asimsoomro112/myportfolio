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
    description: 'A multi-tier product catalog tailored for export inquiries, featuring dynamic quote generation and multi-currency displays.',
    outcome: 'Streamlines international lead capture and buyer verification workflows.',
    image: '/projects/ricemill.png',
    images: ['/projects/ricemill.png'],
    aspectRatio: '1900 / 920',
    tags: ['Next.js', 'B2B UI', 'Catalog Flow', 'Tailwind CSS'],
    featured: false,
  },
  {
    title: 'Live TV & Channel Browser',
    type: 'Streaming Media Aggregator',
    description: 'A media aggregation client enabling country-based channel switching, stream embedding, and lightweight state caching.',
    outcome: 'Delivers instant channel playback and organized category filtering with zero UI lag.',
    image: '/projects/livetv.png',
    images: ['/projects/livetv.png'],
    aspectRatio: '1918 / 948',
    tags: ['React', 'Media Streaming', 'State Management', 'UI Performance'],
    featured: false,
  },
  {
    title: 'Luxe Apparel Storefront',
    type: 'E-Commerce Storefront Prototype',
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
    role: 'Software Engineer',
    company: 'Independent & Client Projects',
    duration: '2023 - Present',
    description: 'Building full-stack web applications, AI tools, database systems, and interactive interfaces. Owned architecture, frontend design, and backend development for production projects.',
  }
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'messages'>('projects');
  
  // Form states
  const [formData, setFormData] = useState<Project>({
    title: '',
    type: '',
    description: '',
    outcome: '',
    image: '',
    images: [],
    aspectRatio: '16 / 9',
    tags: [],
    featured: false,
    liveLink: '',
    problem: '',
    solution: '',
    result: ''
  });
  const [tagsInput, setTagsInput] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Experience Form state
  const [expFormData, setExpFormData] = useState<Experience>({
    role: '',
    company: '',
    duration: '',
    description: ''
  });
  const [isExpEditing, setIsExpEditing] = useState(false);
  const [expEditingId, setExpEditingId] = useState<string | null>(null);

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
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const data: Project[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'experience'));
      const data: Experience[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Experience);
      });
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'messages'));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      data.sort((a, b) => (b.createdAt?.toMillis ? b.createdAt.toMillis() : 0) - (a.createdAt?.toMillis ? a.createdAt.toMillis() : 0));
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
  };

  const handleEdit = (project: Project) => {
    setIsEditing(true);
    setEditingId(project.id!);
    setFormData({
      ...project,
      images: project.images || (project.image ? [project.image] : [])
    });
    setTagsInput(project.tags ? project.tags.join(', ') : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project.');
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleMarkRead = async (id: string, currentReadStatus: boolean) => {
    await updateDoc(doc(db, 'messages', id), { read: !currentReadStatus });
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
        console.error('Upload error:', error);
        alert('Some images failed to upload.');
      }
    }

    const finalImages = [...(formData.images || []), ...newImageUrls];

    const projectData = {
      ...formData,
      image: finalImages.length > 0 ? finalImages[0] : '',
      images: finalImages,
      tags: tagsInput.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    try {
      if (isEditing && editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
      }
      setIsEditing(false);
      setEditingId(null);
      setFormData({ title: '', type: '', description: '', outcome: '', image: '', images: [], liveLink: '', aspectRatio: '16 / 9', tags: [], featured: false, problem: '', solution: '', result: '' });
      setTagsInput('');
      setImageFiles([]);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
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
        await addDoc(collection(db, 'projects'), proj);
      }
      for (const exp of defaultExperienceData) {
        await addDoc(collection(db, 'experience'), exp);
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
      try {
        await deleteDoc(doc(db, 'experience', id));
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Failed to delete experience.');
      }
    }
  };

  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isExpEditing && expEditingId) {
        await updateDoc(doc(db, 'experience', expEditingId), expFormData);
      } else {
        await addDoc(collection(db, 'experience'), expFormData);
      }
      setIsExpEditing(false);
      setExpEditingId(null);
      setExpFormData({ role: '', company: '', duration: '', description: '' });
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
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
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Welcome back, {user?.email}</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {projects.length === 0 && (
            <button onClick={handleSeedData} disabled={seeding} className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-2 px-3.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5">
              {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Seed Default Data'}
            </button>
          )}
          <button onClick={handleLogout} className="flex-1 sm:flex-initial bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs sm:text-sm font-bold py-2 px-3.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5 active:scale-95">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs bar: scrollable on mobile */}
      <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-slate-200 overflow-x-auto whitespace-nowrap pb-1 no-scrollbar text-xs sm:text-sm font-semibold">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-2.5 px-2.5 sm:px-3 border-b-2 transition-colors ${activeTab === 'projects' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Manage Projects
        </button>
        <button 
          onClick={() => setActiveTab('experience')}
          className={`pb-2.5 px-2.5 sm:px-3 border-b-2 transition-colors ${activeTab === 'experience' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Manage Experience
        </button>
        <button 
          onClick={() => setActiveTab('messages')}
          className={`pb-2.5 px-2.5 sm:px-3 border-b-2 transition-colors ${activeTab === 'messages' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Inbox Messages ({messages.filter(m => !m.read).length})
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 sm:gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center justify-between">
              Project List
              {loadingData && <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {projects.length === 0 && !loadingData && (
                <p className="text-slate-500 text-sm">No projects found in Firebase. Add one to see it here.</p>
              )}
              {projects.map(p => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 border border-slate-100 rounded-xl bg-slate-50 gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center flex-wrap gap-2">
                      {p.title} 
                      {p.featured && <span className="text-[10px] sm:text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Featured</span>}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{p.type}</p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button onClick={() => handleEdit(p)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-cyan-600 transition-colors shadow-sm" aria-label="Edit project">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id!)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-red-600 transition-colors shadow-sm" aria-label="Delete project">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg sm:text-xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Type (e.g. AI Workflow)</label>
                <input type="text" required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Outcome</label>
                <input type="text" required value={formData.outcome} onChange={e => setFormData({...formData, outcome: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Live URL (optional)</label>
                <input type="text" value={formData.liveLink || ''} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" placeholder="https://example.com" />
              </div>

              {/* Problem / Solution / Result Markdown fields */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">The Problem (optional Markdown)</label>
                <textarea rows={2} value={formData.problem || ''} onChange={e => setFormData({...formData, problem: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm resize-none" placeholder="What challenge did this solve?"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">The Solution (optional Markdown)</label>
                <textarea rows={2} value={formData.solution || ''} onChange={e => setFormData({...formData, solution: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm resize-none" placeholder="How did you solve it?"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">The Result (optional Markdown)</label>
                <textarea rows={2} value={formData.result || ''} onChange={e => setFormData({...formData, result: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none text-sm resize-none" placeholder="What were the quantitative results?"></textarea>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Images</label>
                {formData.images && formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-12 rounded border overflow-hidden group">
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.images?.filter((_, i) => i !== idx);
                            setFormData({...formData, images: updated, image: updated && updated.length > 0 ? updated[0] : ''});
                          }}
                          className="absolute inset-0 bg-red-600/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
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
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:border-cyan-500 outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" 
                />
                <p className="text-[11px] text-slate-400 mt-1">You can select multiple images. The first image will be used as the cover.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Aspect Ratio (e.g. 16 / 9)</label>
                <input type="text" required value={formData.aspectRatio} onChange={e => setFormData({...formData, aspectRatio: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                <input type="text" required value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                <label htmlFor="featured" className="text-xs sm:text-sm font-bold text-slate-700">Featured (Spans 2 columns)</label>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" disabled={uploading} className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? 'Update Project' : <><Plus className="w-4 h-4" /> Add Project</>)}
                </button>
                {isEditing && (
                  <button type="button" disabled={uploading} onClick={() => { setIsEditing(false); setEditingId(null); setFormData({ title: '', type: '', description: '', outcome: '', image: '', images: [], liveLink: '', aspectRatio: '16 / 9', tags: [], featured: false, problem: '', solution: '', result: '' }); setTagsInput(''); setImageFiles([]); }} className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors text-sm">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-slate-900">{isExpEditing ? 'Edit Experience' : 'Add New Experience'}</h2>
          
          <form onSubmit={handleExpSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                <input type="text" required value={expFormData.role} onChange={e => setExpFormData({...expFormData, role: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors" placeholder="e.g. Frontend Engineer" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
                <input type="text" required value={expFormData.company} onChange={e => setExpFormData({...expFormData, company: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors" placeholder="e.g. Google" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                <input type="text" required value={expFormData.duration} onChange={e => setExpFormData({...expFormData, duration: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors" placeholder="e.g. 2021 - Present" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea rows={3} required value={expFormData.description} onChange={e => setExpFormData({...expFormData, description: e.target.value})} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-cyan-500 outline-none transition-colors resize-none" placeholder="What did you do?" />
            </div>

            <div className="pt-2 flex gap-2">
              <button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm">
                {isExpEditing ? 'Update Experience' : <><Plus className="w-4 h-4" /> Add Experience</>}
              </button>
              {isExpEditing && (
                <button type="button" onClick={() => { setIsExpEditing(false); setExpEditingId(null); setExpFormData({ role: '', company: '', duration: '', description: '' }); }} className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors text-sm">
                  Cancel
                </button>
              )}
            </div>
          </form>

          <hr className="my-8 sm:my-10 border-slate-100" />
          
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-slate-900">Current Experiences</h2>
          <div className="space-y-3 sm:space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-3.5 sm:p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">{exp.role}</h3>
                  <p className="text-xs sm:text-sm text-cyan-700 font-semibold">{exp.company} &bull; {exp.duration}</p>
                </div>
                <div className="flex items-center gap-2 self-end md:self-center">
                  <button onClick={() => handleExpEdit(exp)} className="p-2 text-slate-500 hover:text-cyan-600 bg-white border border-slate-200 hover:border-cyan-200 rounded-lg transition-colors shadow-sm" aria-label="Edit experience">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleExpDelete(exp.id!)} className="p-2 text-slate-500 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 rounded-lg transition-colors shadow-sm" aria-label="Delete experience">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {experiences.length === 0 && !loadingData && (
              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-sm">
                <p>No experiences found.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center justify-between">
            Inbox Messages
            {loadingMessages && <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {messages.length === 0 && !loadingMessages && (
              <p className="text-slate-500 text-sm">No messages yet. When someone fills the contact form, it will appear here.</p>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`p-3.5 sm:p-4 border rounded-xl ${msg.read ? 'bg-slate-50 border-slate-200' : 'bg-white border-cyan-200 shadow-sm'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      {msg.name}
                      {!msg.read && <span className="bg-cyan-100 text-cyan-700 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold">New</span>}
                    </h3>
                    <a href={`mailto:${msg.email}`} className="text-xs sm:text-sm text-cyan-600 hover:underline break-all">{msg.email}</a>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400">
                    {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                  </div>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm mt-2 sm:mt-3 whitespace-pre-wrap p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed">{msg.message}</p>
                <div className="flex justify-end gap-2 mt-3 sm:mt-4">
                  <button onClick={() => handleMarkRead(msg.id, msg.read)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors active:scale-95">
                    {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <button onClick={() => handleDeleteMessage(msg.id)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-100 bg-red-50 hover:bg-red-100 text-red-600 transition-colors active:scale-95">
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
