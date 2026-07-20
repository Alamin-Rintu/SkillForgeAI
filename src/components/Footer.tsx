'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, Mail, Shield, CheckCircle2, Globe, Share2, Code2 } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-xl text-white">
                SkillForge <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering students, software developers, and job seekers with Gemini AI-powered learning roadmaps, ATS resume optimization, and real-time interview coaching.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all" aria-label="GitHub">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 text-slate-400 hover:text-white transition-all" aria-label="Twitter">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-400 hover:text-white transition-all" aria-label="LinkedIn">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/explore" className="hover:text-cyan-400 transition-colors">Career Roadmaps</Link></li>
              <li><Link href="/ai-roadmap-generator" className="hover:text-cyan-400 transition-colors">AI Roadmap Generator</Link></li>
              <li><Link href="/ai-resume-analyzer" className="hover:text-cyan-400 transition-colors">AI Resume Analyzer</Link></li>
              <li><Link href="/ai-interview-coach" className="hover:text-cyan-400 transition-colors">AI Interview Coach</Link></li>
              <li><Link href="/ai-career-advisor" className="hover:text-cyan-400 transition-colors">Career Recommendation</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Latest Articles</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">User Dashboard</Link></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">Newsletter</h4>
            <p className="text-xs text-slate-400">Get weekly AI learning trends and resume tips.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800">
                <CheckCircle2 className="w-4 h-4" /> Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold gradient-btn rounded-xl flex items-center justify-center gap-1.5"
                >
                  Subscribe <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SkillForge AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-400">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
