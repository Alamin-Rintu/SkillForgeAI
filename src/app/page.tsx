'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoadmapCard from '@/components/RoadmapCard';
import StatCard from '@/components/StatCard';
import {
  Sparkles,
  Search,
  ArrowRight,
  Target,
  FileCheck,
  Bot,
  Code2,
  Users,
  Compass,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  Star,
  Zap,
  Briefcase,
  GraduationCap,
  ShieldAlert,
  Server,
  Layers,
  Cpu,
  BrainCircuit
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const statsChartData = [
  { month: 'Jan', students: 3200, roadmaps: 850, hires: 410 },
  { month: 'Feb', students: 5400, roadmaps: 1400, hires: 680 },
  { month: 'Mar', students: 8100, roadmaps: 2100, hires: 1050 },
  { month: 'Apr', students: 11500, roadmaps: 3100, hires: 1620 },
  { month: 'May', students: 14200, roadmaps: 4200, hires: 2210 },
  { month: 'Jun', students: 18500, roadmaps: 5600, hires: 3100 }
];

const featuredRoadmaps = [
  {
    _id: '1',
    title: 'Full-Stack Modern Web Developer 2026',
    shortDescription: 'Master React 19, Next.js App Router, Express 5, TypeScript, and MongoDB with AI API integrations.',
    difficulty: 'Intermediate' as const,
    duration: '12 Weeks',
    category: 'Full Stack',
    skills: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    ratingCount: 342
  },
  {
    _id: '2',
    title: 'AI Engineer & LLM Application Mastery',
    shortDescription: 'Build production AI applications using Gemini API, Vector Databases, RAG pipelines, and LangChain.',
    difficulty: 'Advanced' as const,
    duration: '10 Weeks',
    category: 'AI',
    skills: ['Gemini API', 'Python', 'Vector DB', 'RAG', 'Prompt Eng'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    rating: 4.95,
    ratingCount: 289
  },
  {
    _id: '3',
    title: 'Frontend Engineering & Ultra SaaS UI/UX',
    shortDescription: 'Craft jaw-dropping SaaS web applications using Tailwind CSS v4, HeroUI, and Framer Motion.',
    difficulty: 'Beginner' as const,
    duration: '8 Weeks',
    category: 'Frontend',
    skills: ['React', 'Tailwind CSS', 'Framer Motion', 'HeroUI'],
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    rating: 4.88,
    ratingCount: 198
  }
];

const faqItems = [
  {
    q: "How does SkillForge AI generate personalized roadmaps?",
    a: "Our engine powered by Google Gemini API analyzes your current skill level, target job role, available weekly hours, and programming background to construct a step-by-step weekly schedule complete with curated resources and capstone projects."
  },
  {
    q: "How accurate is the AI Resume Analyzer for ATS systems?",
    a: "Our ATS parser tests your resume against modern Applicant Tracking System standards (like Greenhouse and Lever). It scores formatting, identifies missing keywords for target roles, and suggests actionable bullet point revisions."
  },
  {
    q: "Can I practice coding and behavioral interviews in real-time?",
    a: "Yes! The AI Interview Coach acts as a Senior Technical Interviewer. It asks targeted questions, evaluates your answers, provides code snippets, and suggests follow-up edge cases to sharpen your interviewing skills."
  },
  {
    q: "Is SkillForge AI free for students and job seekers?",
    a: "Yes, you can generate roadmaps, analyze resumes, and practice interviews using our demo and free tiers immediately with no credit card required."
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-blue-500/30 text-xs font-semibold text-blue-600 dark:text-cyan-400 shadow-sm animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Gemini 2.5 AI & Modern SaaS Architecture</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-none">
            Forge Your Tech Career with <br />
            <span className="gradient-text">Intelligent AI Roadmaps</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop guessing your learning path. Get personalized roadmaps, instant ATS resume scoring, project ideas, and interactive interview coaching tailored to your dream job.
          </p>

          {/* Hero Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 opacity-30 group-hover:opacity-60 transition duration-300 blur-md" />
            <form
              action="/explore"
              className="relative flex items-center bg-white dark:bg-[#0f172a] rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roadmaps (e.g. Full Stack, AI Engineer, React...)"
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none pr-2"
              />
              <Link
                href={`/explore?search=${encodeURIComponent(searchQuery)}`}
                className="gradient-btn px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-1.5 shrink-0"
              >
                Search <ArrowRight className="w-4 h-4" />
              </Link>
            </form>
          </div>

          {/* Popular Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Trending Paths:</span>
            <Link href="/explore?category=Full+Stack" className="hover:text-blue-500 bg-slate-200/60 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">Full Stack</Link>
            <Link href="/explore?category=AI" className="hover:text-purple-500 bg-slate-200/60 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">AI & Machine Learning</Link>
            <Link href="/explore?category=Frontend" className="hover:text-cyan-500 bg-slate-200/60 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">Frontend UI</Link>
            <Link href="/explore?category=Cyber+Security" className="hover:text-emerald-500 bg-slate-200/60 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">Cyber Security</Link>
          </div>
        </div>
      </section>

      {/* 2. Core Features Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-[#070b12] border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">Everything You Need</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Accelerate Your Engineering Career</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Career Roadmaps</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step weekly guides from beginner to senior engineer with hands-on documentation and resources.
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Resume Review</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Instant ATS score checking, strengths & weaknesses breakdown, and downloadable improvement reports.
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interview Practice</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Conversational mock interviews testing coding skills, system design, and behavioral questions with instant feedback.
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Project Suggestions</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Curated portfolio capstone projects matching active job specifications to build real proof of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Learning Paths Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Popular Paths</h2>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Explore High-Demand Specialized Tracks</p>
            </div>
            <Link href="/explore" className="text-sm font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1 hover:gap-2 transition-all">
              View All Roadmaps <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/explore?category=Frontend" className="glass-card p-6 flex items-start gap-4 group">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">Frontend Engineering</h3>
                <p className="text-xs text-slate-500 mt-1">React 19, Next.js, Tailwind CSS, TypeScript, Web Vitals.</p>
              </div>
            </Link>

            <Link href="/explore?category=Backend" className="glass-card p-6 flex items-start gap-4 group">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">Backend Engineering</h3>
                <p className="text-xs text-slate-500 mt-1">Node.js Express 5, Microservices, Redis, PostgreSQL.</p>
              </div>
            </Link>

            <Link href="/explore?category=Full+Stack" className="glass-card p-6 flex items-start gap-4 group">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">Full Stack Web Dev</h3>
                <p className="text-xs text-slate-500 mt-1">End-to-End MERN Stack, Next.js App Router, JWT Auth.</p>
              </div>
            </Link>

            <Link href="/explore?category=AI" className="glass-card p-6 flex items-start gap-4 group">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">AI & Machine Learning</h3>
                <p className="text-xs text-slate-500 mt-1">Gemini API, LangChain, Vector Databases, Python.</p>
              </div>
            </Link>

            <Link href="/explore?category=Data+Science" className="glass-card p-6 flex items-start gap-4 group">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">Data Science & Analytics</h3>
                <p className="text-xs text-slate-500 mt-1">Pandas, Scikit-learn, Statistics, Dashboards.</p>
              </div>
            </Link>

            <Link href="/explore?category=Cyber+Security" className="glass-card p-6 flex items-start gap-4 group">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">Cyber Security</h3>
                <p className="text-xs text-slate-500 mt-1">OWASP Top 10, Ethical Hacking, Web Security Audits.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. AI Features Interactive Suite Showcase */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              AI Tools Suite
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold">Supercharge Your Career Prep</h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Four specialized AI modules engineered to guide you from initial skill assessment to landing high-paying software engineering offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* AI Resume Analyzer Card */}
            <div className="glass-card bg-slate-800/80 p-8 border border-slate-700 space-y-5 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">AI Resume Analyzer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upload your resume in TXT, DOCX, or PDF text format. Get instant ATS compatibility score, strength analysis, missing skills identification, and downloadable PDF reports.
              </p>
              <Link
                href="/ai-resume-analyzer"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                Analyze Your Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* AI Career Advisor */}
            <div className="glass-card bg-slate-800/80 p-8 border border-slate-700 space-y-5 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">AI Career Recommendation Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluates your current technical skills, github history, and target role to match high-pay job titles, essential certification programs, and capstone projects.
              </p>
              <Link
                href="/ai-career-advisor"
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300"
              >
                Get Career Recommendations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* AI Learning Planner */}
            <div className="glass-card bg-slate-800/80 p-8 border border-slate-700 space-y-5 hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">AI Learning Roadmap Generator</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Input your experience level and weekly available hours to instantly build a personalized multi-week learning schedule with verified documentation links.
              </p>
              <Link
                href="/ai-roadmap-generator"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                Generate Personalized Roadmap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* AI Interview Coach */}
            <div className="glass-card bg-slate-800/80 p-8 border border-slate-700 space-y-5 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">AI Interview Assistant</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Practice live technical and behavioral interview questions with typing responses, follow-up suggestions, code review feedback, and conversation history.
              </p>
              <Link
                href="/ai-interview-coach"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                Start Interview Session <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Success Statistics (Recharts Data Visualization) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">Platform Impact</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">Empowering 18,500+ Engineers Worldwide</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Active Students" value="18,500+" subtitle="+42% this quarter" icon={Users} color="blue" />
            <StatCard title="Roadmaps Generated" value="5,600+" subtitle="Custom learning paths" icon={Target} color="purple" />
            <StatCard title="Interview Success" value="94.2%" subtitle="Offered tech roles" icon={CheckCircle} color="emerald" />
            <StatCard title="Projects Completed" value="12,400+" subtitle="Portfolio capstones" icon={Code2} color="cyan" />
          </div>

          {/* Recharts Area Chart */}
          <div className="glass-card p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Growth & Learner Success Trends</h3>
                <p className="text-xs text-slate-500">Monthly breakdown of active students, roadmaps created, and job offers.</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Live Analytics
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="students" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" name="Active Learners" />
                  <Area type="monotone" dataKey="hires" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#colorHires)" name="Career Hires" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Roadmaps Grid */}
      <section className="py-20 bg-slate-100/50 dark:bg-[#070b12] border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">Featured Curriculums</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">Top Rated Learning Roadmaps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRoadmaps.map((rm) => (
              <RoadmapCard key={rm._id} {...rm} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Got Questions?</h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Forge Your Technical Future?</h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
            Join thousands of developers using SkillForge AI to craft personalized roadmaps and crack tech interviews.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all">
              Create Free Account
            </Link>
            <Link href="/ai-roadmap-generator" className="px-8 py-3.5 rounded-full bg-slate-900/50 backdrop-blur-md text-white border border-white/20 font-bold text-sm hover:bg-slate-900 transition-all">
              Try AI Generator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
