'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { Sparkles, Mail, Lock, User, UserPlus, Briefcase } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login, betterAuthSignUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try Better Auth Sign Up first
      const baRes = await betterAuthSignUp(name, email, password, targetRole);
      if (baRes.success) {
        router.push('/dashboard');
        return;
      }

      // Fallback to custom registration endpoint
      const res = await fetchApi('/custom-auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, targetRole, role: 'student' })
      });

      if (res.success) {
        login(res.user, res.token);
        router.push('/dashboard');
      } else {
        setError(baRes.message || res.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md glass-card p-8 space-y-6 border border-slate-200 dark:border-slate-800">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-0.5 mx-auto">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h1>
            <p className="text-xs text-slate-500">Sign up with Better Auth & MongoDB</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Tech Job Role</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Full Stack Developer, AI Engineer"
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
              <UserPlus className="w-4 h-4" /> {loading ? 'Creating Account...' : 'Register with Better Auth'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-blue-600 dark:text-cyan-400 hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
