'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { Sparkles, Mail, Lock, LogIn, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin, betterAuthSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try Better Auth Sign In first
      const baRes = await betterAuthSignIn(email, password);
      if (baRes.success) {
        router.push('/dashboard');
        return;
      }

      // Fallback to custom backend auth endpoint
      const res = await fetchApi('/custom-auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (res.success) {
        login(res.user, res.token);
        router.push('/dashboard');
      } else {
        setError(baRes.message || res.message || 'Invalid login credentials.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudent = async () => {
    setLoading(true);
    await demoLogin('student');
    router.push('/dashboard');
  };

  const handleDemoAdmin = async () => {
    setLoading(true);
    await demoLogin('admin');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12 relative">
        <div className="w-full max-w-md glass-card p-8 space-y-6 relative z-10 border border-slate-200 dark:border-slate-800">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-0.5 mx-auto">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-xs text-slate-500">Sign in with Better Auth & MongoDB</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-xs font-bold gradient-btn rounded-xl flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> {loading ? 'Authenticating...' : 'Sign In with Better Auth'}
            </button>
          </form>

          {/* Social / Demo One-Click Login Buttons */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[11px] font-bold text-center text-slate-400 uppercase tracking-wider">
              Or Instant Demo One-Click Access
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoStudent}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-semibold border border-blue-500/30 flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Student Demo
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold border border-purple-500/30 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Demo
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-blue-600 dark:text-cyan-400 hover:underline">
              Register Free
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
