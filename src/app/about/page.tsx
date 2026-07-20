'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, Users, Sparkles, Award, HeartHandshake } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Chief AI Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bio: "Former Google AI Research Scientist specializing in LLM application architecture."
  },
  {
    name: "Marcus Vance",
    role: "Head of Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Full Stack veteran passionate about developer tooling, Next.js, and scaling APIs."
  },
  {
    name: "Elena Rostova",
    role: "Lead Product Designer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Crafts ultra-modern SaaS design systems and glassmorphic user interfaces."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      {/* Hero */}
      <section className="py-16 bg-slate-900 text-white text-center space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          Our Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold max-w-3xl mx-auto">
          Democratizing Tech Education with <span className="gradient-text">Gemini AI</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          SkillForge AI was built to replace outdated rigid learning courses with dynamic, hyper-personalized career roadmaps.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-16">
        
        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 space-y-4 border border-blue-500/30">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              To empower developers, students, and career changers worldwide with instant access to personalized learning schedules, ATS resume feedback, and AI mock interview practice.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 border border-purple-500/30">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              To become the world standard career development platform where every engineer lands their dream job through tailored AI guidance.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Leadership</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">Meet Our Core Team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="glass-card p-6 text-center space-y-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-purple-500/30"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-cyan-500">{member.role}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
