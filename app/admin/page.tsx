'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin/dashboard');
      } else {
        setInitializing(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
          <ShieldCheck className="w-8 h-8" />
        </div>
      </div>
      <h1 className="text-2xl font-heading font-bold text-center text-slate-950 mb-2">Admin Login</h1>
      <p className="text-center text-slate-500 mb-8 text-sm">Secure access to portfolio management</p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-semibold border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all bg-slate-50"
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all bg-slate-50"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex justify-center items-center gap-2 mt-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
        </button>
      </form>
    </div>
  );
}
