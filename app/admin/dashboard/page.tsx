'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Loader2, Plus, Edit2, Trash2, LogOut } from 'lucide-react';

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
};

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'experience'>('projects');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '', type: '', description: '', outcome: '', image: '', aspectRatio: '16 / 9', tags: [], featured: false
  });
  const [tagsInput, setTagsInput] = useState('');
  
  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin');
      } else {
        setUser(currentUser);
        fetchProjects();
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

  const handleLogout = () => {
    signOut(auth);
  };

  const handleEdit = (project: Project) => {
    setIsEditing(true);
    setEditingId(project.id!);
    setFormData(project);
    setTagsInput(project.tags.join(', '));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let finalImageUrl = formData.image;

    // Upload image if a new file is selected
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        const data = await res.json();
        if (data.url) {
          finalImageUrl = data.url;
        } else {
          alert('Image upload failed. Proceeding without new image.');
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert('Image upload failed.');
      }
    }

    const projectData = {
      ...formData,
      image: finalImageUrl,
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
      setFormData({ title: '', type: '', description: '', outcome: '', image: '', aspectRatio: '16 / 9', tags: [], featured: false });
      setTagsInput('');
      setImageFile(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert('Error saving project. Make sure Firestore rules are set to allow writes for authenticated users.');
    } finally {
      setUploading(false);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-heading font-bold text-slate-950">Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
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
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Image</label>
                {formData.image && !imageFile && (
                  <div className="mb-2">
                    <img src={formData.image} alt="Preview" className="h-20 rounded-md object-cover border border-slate-200" />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }} 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-cyan-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" 
                />
                <p className="text-xs text-slate-400 mt-1">Leave empty to keep existing image</p>
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
                  <button type="button" disabled={uploading} onClick={() => { setIsEditing(false); setEditingId(null); setFormData({ title: '', type: '', description: '', outcome: '', image: '', aspectRatio: '16 / 9', tags: [], featured: false }); setTagsInput(''); setImageFile(null); }} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
          <p className="text-slate-500 mb-4">Experience management interface would go here.</p>
          <p className="text-sm text-slate-400">Once Firebase is configured, we can set up the same CRUD flow for experiences and build a frontend component for it.</p>
        </div>
      )}
    </div>
  );
}
