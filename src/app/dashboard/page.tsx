'use client';

import React from 'react';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import { useAuth } from '@/context/AuthContext';
import { Target, Bookmark, Sparkles, FileCheck, Bot, ArrowRight, Clock } from 'lucide-react';

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-slate-900 border border-blue-500/30 text-white">
        <div className="max-w-xl space-y-3 relative z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Developer Workspace
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold">Welcome back, {user?.name || 'Developer'}!</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track your roadmaps, practice interviews with Gemini AI, and prepare your resume for top engineering roles.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Roadmaps" value="4" subtitle="In progress" icon={Target} color="blue" />
        <StatCard title="Saved Resources" value="12" subtitle="Bookmarked items" icon={Bookmark} color="purple" />
        <StatCard title="Resume ATS Score" value="88%" subtitle="High match" icon={FileCheck} color="cyan" />
        <StatCard title="Interview Sessions" value="7" subtitle="Completed" icon={Bot} color="emerald" />
      </div>

      {/* Quick Access AI Tools */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Access AI Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/ai-roadmap-generator" className="glass-card p-6 space-y-3 hover:border-blue-500/50 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500">AI Learning Generator</h3>
            <p className="text-xs text-slate-500">Generate a custom schedule based on your available weekly hours.</p>
          </Link>

          <Link href="/ai-resume-analyzer" className="glass-card p-6 space-y-3 hover:border-cyan-500/50 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-500">AI Resume Audit</h3>
            <p className="text-xs text-slate-500">Score your ATS compatibility and get bullet revisions.</p>
          </Link>

          <Link href="/ai-interview-coach" className="glass-card p-6 space-y-3 hover:border-purple-500/50 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-500">AI Mock Interview</h3>
            <p className="text-xs text-slate-500">Practice coding and system design with conversational feedback.</p>
          </Link>
        </div>
      </div>

    </div>
  );
}
